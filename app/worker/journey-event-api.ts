import {
  analyticsSurfaces,
  isAnalyticsLocale,
  isAnalyticsService,
  isAnalyticsSurface,
  isAnalyticsTargetKind,
  mirroredAnalyticsEvents,
  type AnalyticsLocale,
  type AnalyticsTargetKind,
} from "../app/analytics-events";
import { encryptAnalyticsIp } from "./analytics-ip";

type JourneyDatabaseStatement = {
  bind(...values: unknown[]): JourneyDatabaseStatement;
  run(): Promise<{ success: boolean; meta?: { changes?: number } }>;
};

export type JourneyDatabase = {
  prepare(query: string): JourneyDatabaseStatement;
};

export type JourneyEventEnvironment = {
  ANALYTICS_IP_ENCRYPTION_KEY?: string;
  ANALYTICS_PSEUDONYM_KEY?: string;
  DB?: JourneyDatabase;
  SITE_URL?: string;
};

const COLLECT_PATH = "/api/journey-events/collect";
const DELETE_PATH = "/api/journey-events/delete";
const CONSENT_COOKIE = "aion2_analytics_consent";
const CONSENT_VERSION = 2;
const MAX_COLLECT_BYTES = 4_096;
const MAX_DELETE_BYTES = 512;
const JOURNEY_RETENTION_MS = 30 * 24 * 60 * 60 * 1_000;
const RATE_WINDOW_MS = 10 * 60 * 1_000;
const RATE_WINDOW_RETENTION_MS = 24 * 60 * 60 * 1_000;
const COLLECT_RATE_MAXIMUM = 120;
const DELETE_RATE_MAXIMUM = 10;
const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const PATH_PATTERN =
  /^\/(?:[a-z0-9][a-z0-9._:-]*(?:\/[a-z0-9][a-z0-9._:-]*)*\/?)?$/u;
const MARKETING_VALUE_PATTERN = /^[a-z0-9][a-z0-9._-]*$/iu;
const SLUG = "[a-z0-9]+(?:-[a-z0-9]+)*";
const CONTENT_TARGET_PATTERN = new RegExp(
  `^(?:guides|classes|news|database)/${SLUG}$`,
  "u",
);
const MAP_TARGET_PATTERN = new RegExp(`^${SLUG}(?:/${SLUG})?$`, "u");
const TOOL_TARGETS = new Set([
  "class-finder",
  "code-center",
  "daily-checklist",
  "event-timer",
  "interactive-map",
  "material-calculator",
  "site-contact",
]);
const JOURNEY_EVENTS = new Set<string>([
  ...mirroredAnalyticsEvents,
  "page_view",
]);
const SURFACES = new Set<string>(analyticsSurfaces);
const COLLECT_KEYS = new Set([
  "consentVersion",
  "visitorId",
  "sessionId",
  "event",
  "locale",
  "service",
  "surface",
  "targetKind",
  "targetKey",
  "path",
  "marketing",
]);
const DELETE_KEYS = new Set(["consentVersion", "visitorId"]);
const MARKETING_KEYS = new Set(["utmSource", "utmMedium", "utmCampaign"]);

type JourneyEventInput = {
  consentVersion: 2;
  visitorId: string;
  sessionId: string;
  event: string;
  locale: AnalyticsLocale;
  service: "kr-tw-live" | "global" | "unknown" | "other";
  surface: (typeof analyticsSurfaces)[number];
  targetKind: AnalyticsTargetKind;
  targetKey: string;
  path: string;
  marketing: {
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
  };
};

type DeleteJourneyInput = {
  consentVersion: 2;
  visitorId: string;
};

class JourneyRequestError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "JourneyRequestError";
    this.status = status;
  }
}

function responseHeaders(extra: HeadersInit = {}) {
  const headers = new Headers(extra);
  headers.set("cache-control", "private, no-store");
  headers.set("cdn-cache-control", "no-store");
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cross-origin-resource-policy", "same-origin");
  headers.set("referrer-policy", "no-referrer");
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-robots-tag", "noindex, nofollow, noarchive");
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

function configuredOrigin(request: Request, env: JourneyEventEnvironment) {
  if (env.SITE_URL?.trim()) {
    try {
      const siteUrl = new URL(env.SITE_URL);
      if (!siteUrl.username && !siteUrl.password) return siteUrl.origin;
    } catch {
      // Local development falls back to the request origin.
    }
  }
  return new URL(request.url).origin;
}

function hasSameOrigin(request: Request, env: JourneyEventEnvironment) {
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

function hasJourneyConsent(request: Request) {
  const values = (request.headers.get("cookie") ?? "")
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part.startsWith(`${CONSENT_COOKIE}=`))
    .map((part) => part.slice(CONSENT_COOKIE.length + 1));
  return values.length === 1 && values[0] === "granted-v2";
}

function assertExactKeys(value: Record<string, unknown>, allowed: ReadonlySet<string>) {
  const keys = Object.keys(value);
  if (keys.length !== allowed.size || keys.some((key) => !allowed.has(key))) {
    throw new JourneyRequestError("Request body has invalid fields");
  }
}

function consentVersion(value: unknown): 2 {
  if (value !== CONSENT_VERSION) {
    throw new JourneyRequestError("consentVersion is invalid");
  }
  return CONSENT_VERSION;
}

function pseudonymousId(value: unknown, field: string) {
  if (typeof value !== "string" || !UUID_V4_PATTERN.test(value)) {
    throw new JourneyRequestError(`${field} is invalid`);
  }
  return value.toLowerCase();
}

function targetKey(value: unknown, kind: AnalyticsTargetKind) {
  if (typeof value !== "string" || value.length < 1 || value.length > 160) {
    throw new JourneyRequestError("targetKey is invalid");
  }
  const valid =
    kind === "none"
      ? value === "none"
      : kind === "content"
        ? CONTENT_TARGET_PATTERN.test(value)
        : kind === "item"
          ? /^[1-9]\d{0,17}$/u.test(value)
          : kind === "map"
            ? MAP_TARGET_PATTERN.test(value)
            : TOOL_TARGETS.has(value);
  if (!valid) throw new JourneyRequestError("targetKey is invalid");
  return value;
}

function marketingValue(value: unknown, field: string, maximum: number) {
  if (value === undefined || value === null || value === "") return null;
  if (
    typeof value !== "string" ||
    value.length > maximum ||
    !MARKETING_VALUE_PATTERN.test(value)
  ) {
    throw new JourneyRequestError(`${field} is invalid`);
  }
  return value.toLowerCase();
}

function parseMarketing(value: unknown): JourneyEventInput["marketing"] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new JourneyRequestError("marketing is invalid");
  }
  const marketing = value as Record<string, unknown>;
  const keys = Object.keys(marketing);
  if (keys.some((key) => !MARKETING_KEYS.has(key))) {
    throw new JourneyRequestError("marketing has invalid fields");
  }
  return {
    utmSource: marketingValue(marketing.utmSource, "utmSource", 80),
    utmMedium: marketingValue(marketing.utmMedium, "utmMedium", 80),
    utmCampaign: marketingValue(marketing.utmCampaign, "utmCampaign", 120),
  };
}

function parseCollectInput(value: unknown): JourneyEventInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new JourneyRequestError("Request body must be a JSON object");
  }
  const input = value as Record<string, unknown>;
  assertExactKeys(input, COLLECT_KEYS);
  const targetKind = input.targetKind;
  if (!isAnalyticsTargetKind(targetKind)) {
    throw new JourneyRequestError("targetKind is invalid");
  }
  if (typeof input.event !== "string" || !JOURNEY_EVENTS.has(input.event)) {
    throw new JourneyRequestError("event is invalid");
  }
  if (!isAnalyticsLocale(input.locale)) {
    throw new JourneyRequestError("locale is invalid");
  }
  if (!isAnalyticsService(input.service)) {
    throw new JourneyRequestError("service is invalid");
  }
  if (!isAnalyticsSurface(input.surface) || !SURFACES.has(input.surface)) {
    throw new JourneyRequestError("surface is invalid");
  }
  if (
    typeof input.path !== "string" ||
    input.path.length > 300 ||
    !PATH_PATTERN.test(input.path)
  ) {
    throw new JourneyRequestError("path is invalid");
  }
  return {
    consentVersion: consentVersion(input.consentVersion),
    visitorId: pseudonymousId(input.visitorId, "visitorId"),
    sessionId: pseudonymousId(input.sessionId, "sessionId"),
    event: input.event,
    locale: input.locale,
    service: input.service,
    surface: input.surface,
    targetKind,
    targetKey: targetKey(input.targetKey, targetKind),
    path: input.path,
    marketing: parseMarketing(input.marketing),
  };
}

function parseDeleteInput(value: unknown): DeleteJourneyInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new JourneyRequestError("Request body must be a JSON object");
  }
  const input = value as Record<string, unknown>;
  assertExactKeys(input, DELETE_KEYS);
  return {
    consentVersion: consentVersion(input.consentVersion),
    visitorId: pseudonymousId(input.visitorId, "visitorId"),
  };
}

async function readBoundedBody(request: Request, maximum: number) {
  const lengthHeader = request.headers.get("content-length");
  if (lengthHeader && !/^\d+$/u.test(lengthHeader)) {
    throw new JourneyRequestError("Content-Length is invalid");
  }
  if (lengthHeader && Number(lengthHeader) > maximum) {
    throw new JourneyRequestError("Request body is too large", 413);
  }
  if (!request.body) throw new JourneyRequestError("Request body is required");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maximum) {
      await reader.cancel();
      throw new JourneyRequestError("Request body is too large", 413);
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
    throw new JourneyRequestError("Request body must be valid UTF-8");
  }
}

async function parseJsonBody(request: Request, maximum: number) {
  const text = await readBoundedBody(request, maximum);
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new JourneyRequestError("Request body must be valid JSON");
  }
}

function clientIpAddress(request: Request) {
  const candidate = request.headers.get("cf-connecting-ip")?.trim() ?? "";
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/u.test(candidate)) {
    const parts = candidate.split(".");
    if (parts.every((part) => String(Number(part)) === part && Number(part) <= 255)) {
      return parts.join(".");
    }
    return null;
  }
  if (
    candidate.length >= 2 &&
    candidate.length <= 45 &&
    candidate.includes(":") &&
    /^[0-9a-f:.]+$/iu.test(candidate)
  ) {
    try {
      const hostname = new URL(`http://[${candidate}]/`).hostname;
      const normalized = hostname.startsWith("[") && hostname.endsWith("]")
        ? hostname.slice(1, -1)
        : hostname;
      return normalized.toLowerCase();
    } catch {
      return null;
    }
  }
  return null;
}

function clientNetworkIdentity(request: Request) {
  return clientIpAddress(request) ?? "unavailable";
}

async function createHmacSigner(secret: string | undefined) {
  const normalized = secret?.trim() ?? "";
  const bytes = new TextEncoder().encode(normalized);
  if (bytes.byteLength < 32) {
    throw new JourneyRequestError("Journey service is temporarily unavailable", 503);
  }
  const key = await crypto.subtle.importKey(
    "raw",
    bytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return async (purpose: string, value: string) => {
    const message = new TextEncoder().encode(
      `aion2kina-journey-v1\n${purpose}\n${value}`,
    );
    const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, message));
    return [...signature]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };
}

function countryForRequest(request: Request) {
  const country = (request.headers.get("cf-ipcountry") ?? "").trim().toUpperCase();
  return /^[A-Z]{2}$/u.test(country) && country !== "XX" ? country : "unknown";
}

function coarseClient(request: Request) {
  const userAgent = (request.headers.get("user-agent") ?? "").slice(0, 512);
  const deviceClass = !userAgent
    ? "unknown"
    : /ipad|tablet|kindle|silk|playbook/iu.test(userAgent)
      ? "tablet"
      : /mobile|iphone|ipod|android/iu.test(userAgent)
        ? "mobile"
        : /mozilla|chrome|safari|firefox|edg/iu.test(userAgent)
          ? "desktop"
          : "other";
  const browserFamily = !userAgent
    ? "unknown"
    : /samsungbrowser/iu.test(userAgent)
      ? "samsung"
      : /edg(?:e|a|ios)?\//iu.test(userAgent)
        ? "edge"
        : /firefox|fxios/iu.test(userAgent)
          ? "firefox"
          : /chrome|crios/iu.test(userAgent)
            ? "chrome"
            : /safari/iu.test(userAgent)
              ? "safari"
              : "other";
  const osFamily = !userAgent
    ? "unknown"
    : /windows/iu.test(userAgent)
      ? "windows"
      : /iphone|ipad|ipod/iu.test(userAgent)
        ? "ios"
        : /android/iu.test(userAgent)
          ? "android"
          : /cros/iu.test(userAgent)
            ? "chromeos"
            : /mac os|macintosh/iu.test(userAgent)
              ? "macos"
              : /linux/iu.test(userAgent)
                ? "linux"
                : "other";
  return { browserFamily, deviceClass, osFamily } as const;
}

const DELETE_EXPIRED_JOURNEYS_SQL = `
  delete from analytics_journey_events
  where expires_at <= ?
`;

const DELETE_EXPIRED_WINDOWS_SQL = `
  delete from analytics_ingest_windows
  where expires_at <= ?
`;

const UPSERT_RATE_WINDOW_SQL = `
  insert into analytics_ingest_windows (
    bucket_hash,
    window_start,
    request_count,
    expires_at,
    updated_at
  ) values (?, ?, 1, ?, ?)
  on conflict (bucket_hash) do update set
    request_count = analytics_ingest_windows.request_count + 1,
    updated_at = excluded.updated_at
  where analytics_ingest_windows.window_start = excluded.window_start
    and analytics_ingest_windows.request_count < ?
`;

const INSERT_JOURNEY_SQL = `
  insert into analytics_journey_events (
    id,
    consent_version,
    visitor_hash,
    session_hash,
    network_hash,
    ip_ciphertext,
    ip_iv,
    ip_key_version,
    country,
    device_class,
    browser_family,
    os_family,
    path,
    utm_source,
    utm_medium,
    utm_campaign,
    event_name,
    locale,
    service,
    surface,
    target_kind,
    target_key,
    occurred_at,
    expires_at
  ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const DELETE_VISITOR_JOURNEYS_SQL = `
  delete from analytics_journey_events
  where visitor_hash = ?
`;

async function enforceRateLimit(
  request: Request,
  env: JourneyEventEnvironment,
  sign: (purpose: string, value: string) => Promise<string>,
  operation: "collect" | "delete",
  now: number,
) {
  const windowStart = Math.floor(now / RATE_WINDOW_MS) * RATE_WINDOW_MS;
  const bucketHash = await sign(
    `rate-${operation}-${windowStart}`,
    clientNetworkIdentity(request),
  );
  const maximum = operation === "collect"
    ? COLLECT_RATE_MAXIMUM
    : DELETE_RATE_MAXIMUM;
  const result = await env.DB!.prepare(UPSERT_RATE_WINDOW_SQL)
    .bind(
      bucketHash,
      windowStart,
      windowStart + RATE_WINDOW_RETENTION_MS,
      now,
      maximum,
    )
    .run();
  if (!result.success) {
    throw new JourneyRequestError("Journey service is temporarily unavailable", 503);
  }
  if (Number(result.meta?.changes ?? 0) < 1) {
    throw new JourneyRequestError("Too many requests. Please try again later", 429);
  }
}

export async function handleJourneyEventApi(
  request: Request,
  env: JourneyEventEnvironment,
): Promise<Response | null> {
  const url = new URL(request.url);
  const operation = url.pathname === COLLECT_PATH
    ? "collect"
    : url.pathname === DELETE_PATH
      ? "delete"
      : null;
  if (!operation) return null;
  if (request.method !== "POST") {
    return errorResponse("Method not allowed", 405, { allow: "POST" });
  }
  if (url.search) return errorResponse("Query parameters are not allowed", 400);
  if (!hasSameOrigin(request, env)) {
    return errorResponse("Origin is not allowed", 403);
  }
  if (operation === "collect" && !hasJourneyConsent(request)) {
    return errorResponse("Analytics consent is required", 403);
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
    return errorResponse("Journey service is temporarily unavailable", 503);
  }

  let sign: (purpose: string, value: string) => Promise<string>;
  try {
    sign = await createHmacSigner(env.ANALYTICS_PSEUDONYM_KEY);
  } catch (error) {
    if (error instanceof JourneyRequestError) {
      return errorResponse(error.message, error.status);
    }
    return errorResponse("Journey service is temporarily unavailable", 503);
  }

  let input: JourneyEventInput | DeleteJourneyInput;
  try {
    const body = await parseJsonBody(
      request,
      operation === "collect" ? MAX_COLLECT_BYTES : MAX_DELETE_BYTES,
    );
    input = operation === "collect"
      ? parseCollectInput(body)
      : parseDeleteInput(body);
  } catch (error) {
    if (error instanceof JourneyRequestError) {
      return errorResponse(error.message, error.status);
    }
    return errorResponse("Request body is invalid", 400);
  }

  const now = Date.now();
  try {
    await env.DB.prepare(DELETE_EXPIRED_JOURNEYS_SQL).bind(now).run();
    await env.DB.prepare(DELETE_EXPIRED_WINDOWS_SQL).bind(now).run();
    await enforceRateLimit(request, env, sign, operation, now);

    const visitorHash = await sign("visitor", input.visitorId);
    if (operation === "delete") {
      const result = await env.DB.prepare(DELETE_VISITOR_JOURNEYS_SQL)
        .bind(visitorHash)
        .run();
      if (!result.success) {
        return errorResponse("Journey service is temporarily unavailable", 503);
      }
    } else {
      const collectInput = input as JourneyEventInput;
      const ipAddress = clientIpAddress(request);
      if (!ipAddress) {
        throw new JourneyRequestError("Journey service is temporarily unavailable", 503);
      }
      const [sessionHash, networkHash] = await Promise.all([
        sign("session", `${collectInput.visitorId}\n${collectInput.sessionId}`),
        sign(
          `network-${new Date(now).toISOString().slice(0, 10)}`,
          clientNetworkIdentity(request),
        ),
      ]);
      const client = coarseClient(request);
      const rowId = crypto.randomUUID();
      const encryptedIp = await encryptAnalyticsIp(
        ipAddress,
        {
          rowId,
          visitorHash,
          sessionHash,
          occurredAt: now,
        },
        env.ANALYTICS_IP_ENCRYPTION_KEY,
      );
      const result = await env.DB.prepare(INSERT_JOURNEY_SQL)
        .bind(
          rowId,
          collectInput.consentVersion,
          visitorHash,
          sessionHash,
          networkHash,
          encryptedIp.ciphertext,
          encryptedIp.iv,
          encryptedIp.keyVersion,
          countryForRequest(request),
          client.deviceClass,
          client.browserFamily,
          client.osFamily,
          collectInput.path,
          collectInput.marketing.utmSource,
          collectInput.marketing.utmMedium,
          collectInput.marketing.utmCampaign,
          collectInput.event,
          collectInput.locale,
          collectInput.service,
          collectInput.surface,
          collectInput.targetKind,
          collectInput.targetKey,
          now,
          now + JOURNEY_RETENTION_MS,
        )
        .run();
      if (!result.success) {
        return errorResponse("Journey service is temporarily unavailable", 503);
      }
    }
  } catch (error) {
    if (error instanceof JourneyRequestError) {
      return errorResponse(error.message, error.status);
    }
    return errorResponse("Journey service is temporarily unavailable", 503);
  }

  return new Response(null, {
    status: 204,
    headers: responseHeaders(),
  });
}
