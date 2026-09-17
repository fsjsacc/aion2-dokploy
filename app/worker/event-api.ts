import {
  isAnalyticsLocale,
  isAnalyticsService,
  isAnalyticsSurface,
  isAnalyticsTargetKind,
  isMirroredAnalyticsEvent,
  type MirroredAnalyticsPayload,
} from "../app/analytics-events";

type EventDatabaseStatement = {
  bind(...values: unknown[]): EventDatabaseStatement;
  run(): Promise<{ success: boolean; meta?: { changes?: number } }>;
};

export type EventDatabase = {
  prepare(query: string): EventDatabaseStatement;
};

export type EventApiEnvironment = {
  ANALYTICS_PSEUDONYM_KEY?: string;
  DB?: EventDatabase;
  SITE_URL?: string;
};

export const eventRateLimit = {
  maximum: 120,
  windowMs: 10 * 60 * 1_000,
  retentionMs: 24 * 60 * 60 * 1_000,
} as const;

const EVENT_PATH = "/api/events";
const CONSENT_COOKIE = "aion2_analytics_consent";
const MAX_REQUEST_BYTES = 2_048;
const INPUT_KEYS = new Set([
  "event",
  "locale",
  "service",
  "surface",
  "targetKind",
  "targetKey",
]);
const TOOL_TARGETS = new Set([
  "class-finder",
  "code-center",
  "daily-checklist",
  "event-timer",
  "interactive-map",
  "material-calculator",
  "site-contact",
]);
const SLUG = "[a-z0-9]+(?:-[a-z0-9]+)*";
const CONTENT_TARGET_PATTERN = new RegExp(
  `^(?:guides|classes|news|database)/${SLUG}$`,
  "u",
);
const MAP_TARGET_PATTERN = new RegExp(`^${SLUG}(?:/${SLUG})?$`, "u");

class EventRequestError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "EventRequestError";
    this.status = status;
  }
}

function responseHeaders(extra: HeadersInit = {}) {
  const headers = new Headers(extra);
  headers.set("cache-control", "private, no-store");
  headers.set("cdn-cache-control", "no-store");
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cross-origin-resource-policy", "same-origin");
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

function targetKey(value: unknown, kind: MirroredAnalyticsPayload["targetKind"]) {
  if (typeof value !== "string" || value.length < 1 || value.length > 160) {
    throw new EventRequestError("targetKey is invalid");
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
  if (!valid) throw new EventRequestError("targetKey is invalid");
  return value;
}

function parseInput(value: unknown): MirroredAnalyticsPayload {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new EventRequestError("Request body must be a JSON object");
  }
  const input = value as Record<string, unknown>;
  const unknownKey = Object.keys(input).find((key) => !INPUT_KEYS.has(key));
  if (unknownKey || Object.keys(input).length !== INPUT_KEYS.size) {
    throw new EventRequestError("Request body has invalid fields");
  }
  if (!isMirroredAnalyticsEvent(input.event)) {
    throw new EventRequestError("event is invalid");
  }
  if (!isAnalyticsLocale(input.locale)) {
    throw new EventRequestError("locale is invalid");
  }
  if (!isAnalyticsService(input.service)) {
    throw new EventRequestError("service is invalid");
  }
  if (!isAnalyticsSurface(input.surface)) {
    throw new EventRequestError("surface is invalid");
  }
  if (!isAnalyticsTargetKind(input.targetKind)) {
    throw new EventRequestError("targetKind is invalid");
  }
  return {
    event: input.event,
    locale: input.locale,
    service: input.service,
    surface: input.surface,
    targetKind: input.targetKind,
    targetKey: targetKey(input.targetKey, input.targetKind),
  };
}

async function readBoundedBody(request: Request) {
  const lengthHeader = request.headers.get("content-length");
  if (lengthHeader && !/^\d+$/u.test(lengthHeader)) {
    throw new EventRequestError("Content-Length is invalid");
  }
  if (lengthHeader && Number(lengthHeader) > MAX_REQUEST_BYTES) {
    throw new EventRequestError("Request body is too large", 413);
  }
  if (!request.body) throw new EventRequestError("Request body is required");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_REQUEST_BYTES) {
      await reader.cancel();
      throw new EventRequestError("Request body is too large", 413);
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
    throw new EventRequestError("Request body must be valid UTF-8");
  }
}

function configuredOrigin(request: Request, env: EventApiEnvironment) {
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

function hasSameOrigin(request: Request, env: EventApiEnvironment) {
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

function hasAnalyticsConsent(request: Request) {
  const values = (request.headers.get("cookie") ?? "")
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part.startsWith(`${CONSENT_COOKIE}=`))
    .map((part) => part.slice(CONSENT_COOKIE.length + 1));
  return values.length === 1 && values[0] === "granted-v2";
}

async function ingestBucketHash(
  request: Request,
  origin: string,
  windowStart: number,
  secret: string | undefined,
) {
  const secretBytes = new TextEncoder().encode(secret?.trim() ?? "");
  if (secretBytes.byteLength < 32) {
    throw new EventRequestError("Event service is temporarily unavailable", 503);
  }
  const key = await crypto.subtle.importKey(
    "raw",
    secretBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const input = new TextEncoder().encode(
    `aion2kina-event-rate-v1\n${origin}\n${windowStart}\n${clientIdentity(request)}`,
  );
  const digest = new Uint8Array(await crypto.subtle.sign("HMAC", key, input));
  return [...digest].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

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

const UPSERT_DAILY_EVENT_SQL = `
  insert into analytics_daily (
    day,
    event_name,
    locale,
    service,
    surface,
    target_kind,
    target_key,
    count,
    updated_at
  ) values (?, ?, ?, ?, ?, ?, ?, 1, ?)
  on conflict (
    day,
    event_name,
    locale,
    service,
    surface,
    target_kind,
    target_key
  ) do update set
    count = analytics_daily.count + 1,
    updated_at = excluded.updated_at
`;

export async function handleEventApi(
  request: Request,
  env: EventApiEnvironment,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== EVENT_PATH) return null;
  if (request.method !== "POST") {
    return errorResponse("Method not allowed", 405, { allow: "POST" });
  }
  if (url.search) return errorResponse("Query parameters are not allowed", 400);
  if (!hasSameOrigin(request, env)) {
    return errorResponse("Origin is not allowed", 403);
  }
  if (!hasAnalyticsConsent(request)) {
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
    return errorResponse("Event service is temporarily unavailable", 503);
  }

  let event: MirroredAnalyticsPayload;
  try {
    const text = await readBoundedBody(request);
    let value: unknown;
    try {
      value = JSON.parse(text);
    } catch {
      throw new EventRequestError("Request body must be valid JSON");
    }
    event = parseInput(value);
  } catch (error) {
    if (error instanceof EventRequestError) {
      return errorResponse(error.message, error.status);
    }
    return errorResponse("Request body is invalid", 400);
  }

  const now = Date.now();
  const windowStart =
    Math.floor(now / eventRateLimit.windowMs) * eventRateLimit.windowMs;
  const expiresAt = windowStart + eventRateLimit.retentionMs;
  const origin = configuredOrigin(request, env);
  let bucketHash: string;
  try {
    bucketHash = await ingestBucketHash(
      request,
      origin,
      windowStart,
      env.ANALYTICS_PSEUDONYM_KEY,
    );
  } catch (error) {
    if (error instanceof EventRequestError) {
      return errorResponse(error.message, error.status);
    }
    return errorResponse("Event service is temporarily unavailable", 503);
  }

  try {
    await env.DB.prepare(DELETE_EXPIRED_WINDOWS_SQL).bind(now).run();
    const rateResult = await env.DB.prepare(UPSERT_RATE_WINDOW_SQL)
      .bind(
        bucketHash,
        windowStart,
        expiresAt,
        now,
        eventRateLimit.maximum,
      )
      .run();
    if (!rateResult.success) {
      return errorResponse("Event service is temporarily unavailable", 503);
    }
    if (Number(rateResult.meta?.changes ?? 0) < 1) {
      const retryAfter = Math.max(
        1,
        Math.ceil((windowStart + eventRateLimit.windowMs - now) / 1_000),
      );
      return errorResponse("Too many events. Please try again later", 429, {
        "retry-after": String(retryAfter),
      });
    }

    const day = new Date(now).toISOString().slice(0, 10);
    const eventResult = await env.DB.prepare(UPSERT_DAILY_EVENT_SQL)
      .bind(
        day,
        event.event,
        event.locale,
        event.service,
        event.surface,
        event.targetKind,
        event.targetKey,
        now,
      )
      .run();
    if (!eventResult.success) {
      return errorResponse("Event service is temporarily unavailable", 503);
    }
  } catch {
    return errorResponse("Event service is temporarily unavailable", 503);
  }

  return new Response(null, {
    status: 204,
    headers: responseHeaders(),
  });
}
