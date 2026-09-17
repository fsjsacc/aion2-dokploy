import { siteLocales, type SiteLocale } from "../app/site-config";

type ReportDatabaseStatement = {
  bind(...values: unknown[]): ReportDatabaseStatement;
  run(): Promise<{ success: boolean; meta?: { changes?: number } }>;
};

export type ReportDatabase = {
  prepare(query: string): ReportDatabaseStatement;
};

export type ReportApiEnvironment = {
  DB?: ReportDatabase;
  SITE_URL?: string;
};

export const reportRateLimit = {
  maximum: 5,
  windowMs: 10 * 60 * 1_000,
} as const;

const REPORT_PATH = "/api/reports";
const MAX_REQUEST_BYTES = 8_192;
const TARGET_KINDS = new Set(["content", "item", "map", "tool"]);
const LOCALES = new Set<string>(siteLocales);
const SERVICES = new Set(["kr-tw-live", "global", "unknown", "other"]);
const CATEGORIES = new Set([
  "outdated",
  "incorrect",
  "translation",
  "missing",
  "broken-link",
  "other",
]);
const INPUT_KEYS = new Set([
  "targetKind",
  "targetKey",
  "locale",
  "service",
  "version",
  "category",
  "message",
  "evidenceUrl",
  "contact",
  "website",
]);
const INVALID_SINGLE_LINE = /[\u0000-\u001f\u007f]/u;
const INVALID_MESSAGE_CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u;

type ReportInput = {
  targetKind: "content" | "item" | "map" | "tool";
  targetKey: string;
  locale: SiteLocale;
  service: "kr-tw-live" | "global" | "unknown" | "other";
  version: string | null;
  category:
    | "outdated"
    | "incorrect"
    | "translation"
    | "missing"
    | "broken-link"
    | "other";
  message: string;
  evidenceUrl: string | null;
  contact: string | null;
};

class ReportRequestError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "ReportRequestError";
    this.status = status;
  }
}

function responseHeaders(extra: HeadersInit = {}) {
  const headers = new Headers(extra);
  headers.set("cache-control", "private, no-store");
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("x-content-type-options", "nosniff");
  return headers;
}

function jsonResponse(value: unknown, status: number, extraHeaders?: HeadersInit) {
  return new Response(JSON.stringify(value), {
    status,
    headers: responseHeaders(extraHeaders),
  });
}

function errorResponse(message: string, status: number, extraHeaders?: HeadersInit) {
  return jsonResponse({ error: message }, status, extraHeaders);
}

function codePointLength(value: string) {
  return [...value].length;
}

function requiredSingleLine(
  value: unknown,
  field: string,
  minimum: number,
  maximum: number,
) {
  if (typeof value !== "string") {
    throw new ReportRequestError(`${field} must be a string`);
  }
  const normalized = value.trim().replace(/\s+/gu, " ");
  const length = codePointLength(normalized);
  if (
    length < minimum ||
    length > maximum ||
    INVALID_SINGLE_LINE.test(normalized)
  ) {
    throw new ReportRequestError(`${field} is invalid`);
  }
  return normalized;
}

function optionalSingleLine(value: unknown, field: string, maximum: number) {
  if (value === undefined || value === null || value === "") return null;
  return requiredSingleLine(value, field, 1, maximum);
}

function enumValue<T extends string>(
  value: unknown,
  field: string,
  allowed: ReadonlySet<string>,
) {
  if (typeof value !== "string" || !allowed.has(value)) {
    throw new ReportRequestError(`${field} is invalid`);
  }
  return value as T;
}

function targetKey(value: unknown, kind: ReportInput["targetKind"]) {
  const key = requiredSingleLine(value, "targetKey", 1, 300);
  const valid =
    kind === "content"
      ? /^(?:guides|classes|news|database)\/[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(key)
      : kind === "item"
        ? /^[1-9]\d{0,17}$/u.test(key)
        : kind === "map"
          ? /^[A-Za-z0-9_.-]{1,128}\/[A-Za-z0-9_.:-]{1,160}$/u.test(key)
          : /^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(key);
  if (!valid) throw new ReportRequestError("targetKey is invalid");
  return key;
}

function messageValue(value: unknown) {
  if (typeof value !== "string") {
    throw new ReportRequestError("message must be a string");
  }
  const normalized = value.replace(/\r\n?/gu, "\n").trim();
  const length = codePointLength(normalized);
  if (
    length < 10 ||
    length > 2_000 ||
    INVALID_MESSAGE_CONTROL.test(normalized)
  ) {
    throw new ReportRequestError("message is invalid");
  }
  return normalized;
}

function evidenceUrlValue(value: unknown) {
  const candidate = optionalSingleLine(value, "evidenceUrl", 2_048);
  if (!candidate) return null;
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new ReportRequestError("evidenceUrl must be a valid HTTPS URL");
  }
  if (
    url.protocol !== "https:" ||
    !url.hostname ||
    url.username ||
    url.password
  ) {
    throw new ReportRequestError("evidenceUrl must be a valid HTTPS URL");
  }
  const normalized = url.toString();
  if (codePointLength(normalized) > 2_048) {
    throw new ReportRequestError("evidenceUrl is too long");
  }
  return normalized;
}

function parseInput(value: unknown): { honeypot: boolean; report?: ReportInput } {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ReportRequestError("Request body must be a JSON object");
  }
  const input = value as Record<string, unknown>;
  const unknownKey = Object.keys(input).find((key) => !INPUT_KEYS.has(key));
  if (unknownKey) {
    throw new ReportRequestError(`Unknown field: ${unknownKey}`);
  }
  if (
    input.website !== undefined &&
    input.website !== null &&
    typeof input.website !== "string"
  ) {
    throw new ReportRequestError("website must be a string");
  }
  if (typeof input.website === "string" && input.website.trim()) {
    return { honeypot: true };
  }

  const targetKind = enumValue<ReportInput["targetKind"]>(
    input.targetKind,
    "targetKind",
    TARGET_KINDS,
  );
  return {
    honeypot: false,
    report: {
      targetKind,
      targetKey: targetKey(input.targetKey, targetKind),
      locale: enumValue<ReportInput["locale"]>(input.locale, "locale", LOCALES),
      service: enumValue<ReportInput["service"]>(
        input.service,
        "service",
        SERVICES,
      ),
      version: optionalSingleLine(input.version, "version", 80),
      category: enumValue<ReportInput["category"]>(
        input.category,
        "category",
        CATEGORIES,
      ),
      message: messageValue(input.message),
      evidenceUrl: evidenceUrlValue(input.evidenceUrl),
      contact: optionalSingleLine(input.contact, "contact", 254),
    },
  };
}

async function readBoundedBody(request: Request) {
  const lengthHeader = request.headers.get("content-length");
  if (lengthHeader && !/^\d+$/u.test(lengthHeader)) {
    throw new ReportRequestError("Content-Length is invalid");
  }
  if (lengthHeader && Number(lengthHeader) > MAX_REQUEST_BYTES) {
    throw new ReportRequestError("Request body is too large", 413);
  }
  if (!request.body) throw new ReportRequestError("Request body is required");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_REQUEST_BYTES) {
      await reader.cancel();
      throw new ReportRequestError("Request body is too large", 413);
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new ReportRequestError("Request body must be valid UTF-8");
  }
}

function configuredOrigin(request: Request, env: ReportApiEnvironment) {
  if (env.SITE_URL?.trim()) {
    try {
      const siteUrl = new URL(env.SITE_URL);
      if (!siteUrl.username && !siteUrl.password) return siteUrl.origin;
    } catch {
      // Fall through to the request origin when SITE_URL is unavailable locally.
    }
  }
  return new URL(request.url).origin;
}

function hasSameOrigin(request: Request, env: ReportApiEnvironment) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const parsed = new URL(origin);
    if (parsed.origin !== origin || parsed.origin !== configuredOrigin(request, env)) {
      return false;
    }
  } catch {
    return false;
  }
  const fetchSite = request.headers.get("sec-fetch-site");
  return !fetchSite || fetchSite === "same-origin";
}

function clientIdentity(request: Request) {
  const candidate = request.headers.get("cf-connecting-ip")?.trim() ?? "";
  return /^[0-9a-f:.]{2,64}$/iu.test(candidate) ? candidate : "unavailable";
}

async function requesterHash(
  request: Request,
  origin: string,
  windowStart: number,
) {
  const input = new TextEncoder().encode(
    `aion2kina-report-rate-v1\n${origin}\n${windowStart}\n${clientIdentity(request)}`,
  );
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", input));
  return [...digest].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

const INSERT_REPORT_SQL = `
  insert into content_reports (
    id,
    target_kind,
    target_key,
    locale,
    service,
    version,
    category,
    message,
    evidence_url,
    contact,
    status,
    created_at,
    resolved_at,
    requester_hash
  )
  select ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  where (
    select count(*)
    from content_reports
    where requester_hash = ? and created_at >= ?
  ) < ?
`;

export async function handleReportApi(
  request: Request,
  env: ReportApiEnvironment,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== REPORT_PATH) return null;
  if (request.method !== "POST") {
    return errorResponse("Method not allowed", 405, { allow: "POST" });
  }
  if (!hasSameOrigin(request, env)) {
    return errorResponse("Origin is not allowed", 403);
  }
  const contentType = request.headers.get("content-type")?.split(";", 1)[0]
    ?.trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return errorResponse("Content-Type must be application/json", 415);
  }
  const contentEncoding = request.headers.get("content-encoding");
  if (contentEncoding && contentEncoding.toLowerCase() !== "identity") {
    return errorResponse("Content-Encoding is not supported", 415);
  }
  if (!env.DB) {
    return errorResponse("Report service is temporarily unavailable", 503);
  }

  let parsed: { honeypot: boolean; report?: ReportInput };
  try {
    const text = await readBoundedBody(request);
    let value: unknown;
    try {
      value = JSON.parse(text);
    } catch {
      throw new ReportRequestError("Request body must be valid JSON");
    }
    parsed = parseInput(value);
  } catch (error) {
    if (error instanceof ReportRequestError) {
      return errorResponse(error.message, error.status);
    }
    return errorResponse("Request body is invalid", 400);
  }

  // Return a normal-looking empty success without writing anything. This keeps
  // the hidden field useful without teaching automated submitters how it works.
  if (parsed.honeypot) {
    return new Response(null, {
      status: 204,
      headers: responseHeaders(),
    });
  }
  const report = parsed.report;
  if (!report) return errorResponse("Request body is invalid", 400);

  const now = Date.now();
  const windowStart =
    Math.floor(now / reportRateLimit.windowMs) * reportRateLimit.windowMs;
  const origin = configuredOrigin(request, env);
  const hash = await requesterHash(request, origin, windowStart);
  const id = crypto.randomUUID();

  try {
    const result = await env.DB.prepare(INSERT_REPORT_SQL)
      .bind(
        id,
        report.targetKind,
        report.targetKey,
        report.locale,
        report.service,
        report.version,
        report.category,
        report.message,
        report.evidenceUrl,
        report.contact,
        "new",
        now,
        null,
        hash,
        hash,
        windowStart,
        reportRateLimit.maximum,
      )
      .run();
    if (!result.success) {
      return errorResponse("Report service is temporarily unavailable", 503);
    }
    if (Number(result.meta?.changes ?? 0) < 1) {
      const retryAfter = Math.max(
        1,
        Math.ceil((windowStart + reportRateLimit.windowMs - now) / 1_000),
      );
      return errorResponse("Too many reports. Please try again later", 429, {
        "retry-after": String(retryAfter),
      });
    }
  } catch {
    return errorResponse("Report service is temporarily unavailable", 503);
  }

  return jsonResponse({ ok: true, id }, 201);
}
