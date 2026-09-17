import bootstrapReleasePlan from "./map-release-bootstrap-plan.ts";

const ADMIN_BASE_PATH = "/__atlas-release";
const BOOTSTRAP_BROWSER_PATH = "/zh-hant/tools/map/release-bootstrap";
const VERSION_KEY_PATTERN = /^sha256-[0-9a-f]{64}$/u;
const SHA256_PATTERN = /^[0-9a-f]{64}$/u;
const RELEASE_MANIFEST_KEY_PATTERN =
  /^releases\/(sha256-[0-9a-f]{64})\/manifest\.json$/u;
const RELEASE_ASSET_KEY_PATTERN =
  /^releases\/(sha256-[0-9a-f]{64})\/((?:icons\/[A-Za-z0-9][A-Za-z0-9._-]*|maps\/[A-Za-z0-9][A-Za-z0-9._/-]*)\.webp)$/u;
const BUNDLE_KEY_PATTERN =
  /^bundles\/(sha256-[0-9a-f]{64})\/(zh-Hant|en|ko)\/([a-z0-9]+(?:-[a-z0-9]+)*)\.json$/u;
const MAX_RELEASE_OBJECT_BYTES = 25 * 1024 * 1024;
const BASE64_PATTERN = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u;
const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable";
const POINTER_CACHE_CONTROL = "no-cache, no-store, must-revalidate";
// The 8 MiB byte ceiling remains the primary memory guard. 128 descriptors
// keeps each invocation below the Workers subrequest ceiling while avoiding
// hundreds of browser navigations on temporary Sites domains.
const MAX_BOOTSTRAP_BATCH_OBJECTS = 128;

interface MapReleaseHttpMetadata {
  contentType?: string;
  cacheControl?: string;
}

export interface MapReleaseObjectMetadata {
  key?: string;
  size: number;
  etag?: string;
  httpEtag?: string;
  httpMetadata?: MapReleaseHttpMetadata;
  customMetadata?: Record<string, string>;
}

export interface MapReleaseObject extends MapReleaseObjectMetadata {
  body: ReadableStream;
  text(): Promise<string>;
  writeHttpMetadata?(headers: Headers): void;
}

interface MapReleasePutOptions {
  onlyIf?: { etagMatches?: string; etagDoesNotMatch?: string };
  httpMetadata?: MapReleaseHttpMetadata;
  customMetadata?: Record<string, string>;
  sha256?: string;
}

export interface MapReleaseBucket {
  get(key: string): Promise<MapReleaseObject | null>;
  head(key: string): Promise<MapReleaseObjectMetadata | null>;
  list(options: {
    cursor?: string;
    include?: string[];
    limit?: number;
    prefix?: string;
  }): Promise<{
    cursor?: string;
    objects: MapReleaseObjectMetadata[];
    truncated: boolean;
  }>;
  put(
    key: string,
    value: ReadableStream | ArrayBuffer | ArrayBufferView | string | null,
    options?: MapReleasePutOptions,
  ): Promise<MapReleaseObjectMetadata | null>;
}

export interface MapReleaseAdminEnv {
  ASSETS?: { fetch(request: Request): Promise<Response> };
  MAP_ASSETS?: MapReleaseBucket;
  MAP_RELEASE_BOOTSTRAP_RETIRED?: string;
  MAP_RELEASE_BOOTSTRAP_TOKEN?: string;
  MAP_RELEASE_BOOTSTRAP_VERSION?: string;
  MAP_RELEASE_UPLOAD_TOKEN?: string;
}

interface ImmutableExpectation {
  bytes: number;
  cacheControl: string;
  contentType: string;
  key: string;
  metadata: Record<string, string>;
  sha256: string;
  versionKey: string;
}

interface ReleasePlanObjectDescriptor {
  bytes: number;
  cacheControl: string;
  key: string;
  sha256: string;
  source: string;
}

interface ImmutableStoreResult {
  differences?: string[];
  error?: string;
  object?: MapReleaseObjectMetadata;
  outcome?: "uploaded" | "skipped";
  status: number;
}

function adminHeaders(extra: HeadersInit = {}) {
  const headers = new Headers(extra);
  headers.set("cache-control", "no-store");
  headers.set("cross-origin-resource-policy", "same-origin");
  headers.set("referrer-policy", "no-referrer");
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-robots-tag", "noindex, nofollow, noarchive");
  return headers;
}

function adminJson(body: unknown, status = 200, extra: HeadersInit = {}) {
  const headers = adminHeaders(extra);
  headers.set("content-type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body), { status, headers });
}

function escapeBootstrapHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function bootstrapHtml(
  response: Response,
  request?: Request,
  action?: "copy" | "promote",
) {
  const payloadText = await response.text();
  let refresh = "";
  let complete = false;
  if (request && response.ok && new URL(request.url).searchParams.get("auto") === "1") {
    const url = new URL(request.url);
    const remaining = Number(url.searchParams.get("remaining"));
    const payload = JSON.parse(payloadText) as Record<string, unknown>;
    const confirmedVersion = url.searchParams.get("confirmVersion");
    const identityMatches = action === "promote"
      ? payload.activeVersionKey === confirmedVersion
      : payload.versionKey === confirmedVersion;
    if (
      Number.isSafeInteger(remaining) &&
      remaining >= 1 &&
      remaining <= 64 &&
      identityMatches
    ) {
      if (action === "copy" && remaining > 1) {
        let advances = false;
        if (payload.done === true) {
          url.searchParams.set("action", "promote");
          url.searchParams.delete("start");
          url.searchParams.delete("limit");
          advances = true;
        } else if (
          Number.isSafeInteger(payload.next) &&
          Number.isSafeInteger(payload.total) &&
          Number.isSafeInteger(Number(url.searchParams.get("start"))) &&
          Number(payload.next) > Number(url.searchParams.get("start")) &&
          Number(payload.next) <= Number(payload.total)
        ) {
          url.searchParams.set("start", String(payload.next));
          advances = true;
        }
        if (advances) {
          url.searchParams.set("remaining", String(remaining - 1));
          const nextPath = `${url.pathname}?${url.searchParams.toString()}`;
          refresh = `<meta http-equiv="refresh" content="0;url=${escapeBootstrapHtml(nextPath)}">`;
        }
      }
      complete = action === "promote" && payload.outcome === "promoted";
    }
  }
  const payload = escapeBootstrapHtml(payloadText);
  const headers = adminHeaders({
    "content-security-policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    "content-type": "text/html; charset=utf-8",
  });
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow,noarchive">${refresh}<title>${complete ? "AION2 map release bootstrap complete" : "AION2 map release bootstrap"}</title></head><body><pre id="atlas-bootstrap-result">${payload}</pre></body></html>`,
    { headers, status: response.status },
  );
}

function isSafeKey(key: string) {
  return (
    key.length > 0 &&
    !key.startsWith("/") &&
    !key.endsWith("/") &&
    !key.includes("\\") &&
    !key.split("/").some((segment) => !segment || segment === "." || segment === "..")
  );
}

function immutableKeyVersion(key: string) {
  if (!isSafeKey(key)) return null;
  for (const pattern of [
    RELEASE_MANIFEST_KEY_PATTERN,
    RELEASE_ASSET_KEY_PATTERN,
    BUNDLE_KEY_PATTERN,
  ]) {
    const match = key.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function canonicalSourceForKey(key: string, versionKey: string) {
  const manifestMatch = key.match(RELEASE_MANIFEST_KEY_PATTERN);
  if (manifestMatch?.[1] === versionKey) return "public/map-assets/manifest.json";
  const assetMatch = key.match(RELEASE_ASSET_KEY_PATTERN);
  if (assetMatch?.[1] === versionKey && isSafeKey(assetMatch[2])) {
    return `public/map-assets/${assetMatch[2]}`;
  }
  const bundleMatch = key.match(BUNDLE_KEY_PATTERN);
  if (bundleMatch?.[1] === versionKey) return `public/map-assets/${key}`;
  return null;
}

function parseIntegerHeader(value: string | null) {
  if (!value || !/^\d+$/u.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function readImmutableExpectation(request: Request): ImmutableExpectation | null {
  const key = request.headers.get("x-atlas-object-key") ?? "";
  const keyVersion = immutableKeyVersion(key);
  const versionKey = request.headers.get("x-atlas-version-key") ?? "";
  const sha256 = request.headers.get("x-atlas-sha256") ?? "";
  const bytes = parseIntegerHeader(request.headers.get("x-atlas-bytes"));
  const requestContentType = request.headers.get("content-type") ?? "";
  const contentType = contentTypeForSource(key);
  const cacheControl = request.headers.get("cache-control") ?? "";
  if (
    !keyVersion ||
    versionKey !== keyVersion ||
    !VERSION_KEY_PATTERN.test(versionKey) ||
    !SHA256_PATTERN.test(sha256) ||
    bytes === null ||
    bytes < 0 ||
    bytes > MAX_RELEASE_OBJECT_BYTES ||
    requestContentType !== "application/octet-stream" ||
    request.headers.get("x-atlas-transfer-encoding") !== "base64" ||
    cacheControl !== IMMUTABLE_CACHE_CONTROL
  ) {
    return null;
  }
  return {
    bytes,
    cacheControl,
    contentType,
    key,
    sha256,
    versionKey,
    metadata: {
      "atlas-sha256": sha256,
      "atlas-version-key": versionKey,
      "atlas-bytes": String(bytes),
      "atlas-kind": "immutable-release-object",
    },
  };
}

function objectDifferences(object: MapReleaseObjectMetadata, expectation: ImmutableExpectation) {
  const differences: string[] = [];
  if (object.size !== expectation.bytes) differences.push("content-length");
  if (object.httpMetadata?.contentType !== expectation.contentType) differences.push("content-type");
  if (object.httpMetadata?.cacheControl !== expectation.cacheControl) differences.push("cache-control");
  for (const [key, value] of Object.entries(expectation.metadata)) {
    if (object.customMetadata?.[key] !== value) differences.push(`metadata:${key}`);
  }
  return differences;
}

function objectMetadataHeaders(object: MapReleaseObjectMetadata) {
  const headers: Record<string, string> = {
    "x-atlas-bytes": String(object.size),
  };
  if (object.httpEtag) headers.etag = object.httpEtag;
  if (object.httpMetadata?.contentType) {
    headers["x-atlas-content-type"] = object.httpMetadata.contentType;
  }
  if (object.httpMetadata?.cacheControl) headers["x-atlas-cache-control"] = object.httpMetadata.cacheControl;
  for (const key of ["atlas-sha256", "atlas-version-key", "atlas-kind"] as const) {
    const value = object.customMetadata?.[key];
    if (value) headers[`x-${key}`] = value;
  }
  return headers;
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sha256BufferHex(value: ArrayBuffer) {
  const digest = await crypto.subtle.digest("SHA-256", value);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function tokensMatch(actual: string, expected: string) {
  if (actual.length < 32 || expected.length < 32) return false;
  const [actualDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(actual)),
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(expected)),
  ]);
  const left = new Uint8Array(actualDigest);
  const right = new Uint8Array(expectedDigest);
  let difference = left.length ^ right.length;
  for (let index = 0; index < Math.min(left.length, right.length); index += 1) {
    difference |= left[index] ^ right[index];
  }
  return difference === 0;
}

async function isAuthorized(request: Request, expectedToken: string) {
  const authorization = request.headers.get("authorization") ?? "";
  const match = authorization.match(/^Bearer ([A-Za-z0-9._~-]+)$/u);
  return Boolean(match && await tokensMatch(match[1], expectedToken));
}

async function isBootstrapAuthorized(request: Request, expectedToken: string) {
  if (request.headers.has("authorization")) {
    return isAuthorized(request, expectedToken);
  }
  if (request.method !== "GET") return false;
  const queryToken = new URL(request.url).searchParams.get("bootstrapToken") ?? "";
  return tokensMatch(queryToken, expectedToken);
}

async function handleObjectHead(request: Request, bucket: MapReleaseBucket) {
  const key = request.headers.get("x-atlas-object-key") ?? "";
  if (!immutableKeyVersion(key)) return adminJson({ error: "invalid-object-key" }, 400);
  const object = await bucket.head(key);
  if (!object) return new Response(null, { status: 404, headers: adminHeaders() });
  return new Response(null, { status: 200, headers: adminHeaders(objectMetadataHeaders(object)) });
}

function immutableExpectationForDescriptor(
  descriptor: ReleasePlanObjectDescriptor,
  versionKey: string,
): ImmutableExpectation {
  return {
    bytes: descriptor.bytes,
    cacheControl: descriptor.cacheControl,
    contentType: contentTypeForSource(descriptor.source),
    key: descriptor.key,
    sha256: descriptor.sha256,
    versionKey,
    metadata: {
      "atlas-sha256": descriptor.sha256,
      "atlas-version-key": versionKey,
      "atlas-bytes": String(descriptor.bytes),
      "atlas-kind": "immutable-release-object",
    },
  };
}

async function storeImmutableObject(
  bucket: MapReleaseBucket,
  expectation: ImmutableExpectation,
  body: ArrayBuffer | ArrayBufferView,
): Promise<ImmutableStoreResult> {
  const existing = await bucket.head(expectation.key);
  if (existing) {
    const differences = objectDifferences(existing, expectation);
    if (differences.length > 0) {
      return { error: "immutable-object-conflict", differences, status: 409 };
    }
    return { object: existing, outcome: "skipped", status: 200 };
  }

  const stored = await bucket.put(expectation.key, body, {
    onlyIf: { etagDoesNotMatch: "*" },
    httpMetadata: {
      contentType: expectation.contentType,
      cacheControl: expectation.cacheControl,
    },
    customMetadata: expectation.metadata,
    sha256: expectation.sha256,
  });
  const verified = await bucket.head(expectation.key);
  if (!verified) return { error: "concurrent-object-conflict", status: 409 };
  const differences = objectDifferences(verified, expectation);
  if (differences.length > 0) {
    return { error: "object-verification-failed", differences, status: 409 };
  }
  return {
    object: verified,
    outcome: stored ? "uploaded" : "skipped",
    status: stored ? 201 : 200,
  };
}

async function handleObjectPut(request: Request, bucket: MapReleaseBucket) {
  const expectation = readImmutableExpectation(request);
  if (!expectation) return adminJson({ error: "invalid-object-metadata" }, 400);
  const encodedBytes = 4 * Math.ceil(expectation.bytes / 3);
  if (request.headers.get("content-length")) {
    const contentLength = parseIntegerHeader(request.headers.get("content-length"));
    if (contentLength !== encodedBytes) {
      return adminJson({ error: "content-length-mismatch" }, 400);
    }
  }
  if (encodedBytes > 0 && !request.body) {
    return adminJson({ error: "missing-object-body" }, 400);
  }

  let encodedBody: string;
  try {
    encodedBody = await request.text();
  } catch {
    return adminJson({ error: "invalid-base64-body" }, 400);
  }
  if (encodedBody.length !== encodedBytes || !BASE64_PATTERN.test(encodedBody)) {
    return adminJson({ error: "invalid-base64-body" }, 400);
  }
  let decodedBody: Uint8Array;
  try {
    const binary = atob(encodedBody);
    decodedBody = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    return adminJson({ error: "invalid-base64-body" }, 400);
  }
  if (decodedBody.byteLength !== expectation.bytes) {
    return adminJson({ error: "decoded-content-length-mismatch" }, 400);
  }

  const result = await storeImmutableObject(bucket, expectation, decodedBody);
  if (result.error) {
    return adminJson({ error: result.error, differences: result.differences }, result.status);
  }
  return adminJson(
    { outcome: result.outcome, key: expectation.key },
    result.status,
    objectMetadataHeaders(result.object!),
  );
}

function contentTypeForSource(source: string) {
  const extension = source.slice(source.lastIndexOf(".")).toLowerCase();
  if (extension === ".json") return "application/json; charset=utf-8";
  if (extension === ".webp") return "image/webp";
  if (extension === ".png") return "image/png";
  if (extension === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

function validatePromotionPlan(plan: unknown) {
  if (!plan || typeof plan !== "object" || Array.isArray(plan)) return null;
  const candidate = plan as {
    schemaVersion?: unknown;
    versionKey?: unknown;
    objectCount?: unknown;
    totalBytes?: unknown;
    objects?: unknown;
    channelPointer?: {
      key?: unknown;
      cacheControl?: unknown;
      body?: { schemaVersion?: unknown; versionKey?: unknown; manifestKey?: unknown };
    };
    safety?: { deletesPreviousVersions?: unknown; promotionIsPointerOnly?: unknown };
  };
  if (
    candidate.schemaVersion !== 1 ||
    typeof candidate.versionKey !== "string" ||
    !VERSION_KEY_PATTERN.test(candidate.versionKey) ||
    !Array.isArray(candidate.objects) ||
    candidate.objects.length === 0 ||
    candidate.objectCount !== candidate.objects.length
  ) {
    return null;
  }
  const expectations = new Map<string, ImmutableExpectation>();
  let totalBytes = 0;
  for (const rawObject of candidate.objects) {
    if (!rawObject || typeof rawObject !== "object" || Array.isArray(rawObject)) return null;
    const object = rawObject as {
      key?: unknown;
      source?: unknown;
      bytes?: unknown;
      sha256?: unknown;
      cacheControl?: unknown;
    };
    if (
      typeof object.key !== "string" ||
      immutableKeyVersion(object.key) !== candidate.versionKey ||
      typeof object.source !== "string" ||
      object.source !== canonicalSourceForKey(object.key, candidate.versionKey) ||
      typeof object.bytes !== "number" ||
      !Number.isSafeInteger(object.bytes) ||
      object.bytes < 0 ||
      object.bytes > MAX_RELEASE_OBJECT_BYTES ||
      typeof object.sha256 !== "string" ||
      !SHA256_PATTERN.test(object.sha256) ||
      object.cacheControl !== IMMUTABLE_CACHE_CONTROL ||
      expectations.has(object.key)
    ) {
      return null;
    }
    totalBytes += object.bytes;
    if (!Number.isSafeInteger(totalBytes)) return null;
    expectations.set(
      object.key,
      immutableExpectationForDescriptor(
        object as ReleasePlanObjectDescriptor,
        candidate.versionKey,
      ),
    );
  }
  const pointer = candidate.channelPointer;
  const expectedManifestKey = `releases/${candidate.versionKey}/manifest.json`;
  if (
    candidate.totalBytes !== totalBytes ||
    !expectations.has(expectedManifestKey) ||
    pointer?.key !== "channels/stable.json" ||
    pointer.cacheControl !== POINTER_CACHE_CONTROL ||
    pointer.body?.schemaVersion !== 1 ||
    pointer.body.versionKey !== candidate.versionKey ||
    pointer.body.manifestKey !== expectedManifestKey ||
    candidate.safety?.deletesPreviousVersions !== false ||
    candidate.safety?.promotionIsPointerOnly !== true
  ) {
    return null;
  }
  return {
    expectations,
    pointer: pointer.body as { schemaVersion: 1; versionKey: string; manifestKey: string },
    versionKey: candidate.versionKey,
  };
}

const embeddedBootstrapPlan = bootstrapReleasePlan as unknown as {
  objects: ReleasePlanObjectDescriptor[];
  versionKey: string;
};
let cachedBootstrapPlan: ReturnType<typeof validatePromotionPlan> | undefined;

function validatedBootstrapPlan() {
  if (cachedBootstrapPlan === undefined) {
    cachedBootstrapPlan = validatePromotionPlan(bootstrapReleasePlan);
  }
  if (!cachedBootstrapPlan) throw new Error("Embedded bootstrap release plan is invalid.");
  return cachedBootstrapPlan;
}

function bootstrapConfirmed(request: Request, versionKey: string) {
  return (
    request.headers.get("x-atlas-confirm-version") === versionKey ||
    new URL(request.url).searchParams.get("confirmVersion") === versionKey
  );
}

async function handleBootstrapCopy(
  request: Request,
  env: MapReleaseAdminEnv,
  bucket: MapReleaseBucket,
) {
  const plan = validatedBootstrapPlan();
  if (
    request.method !== "GET" ||
    !env.ASSETS ||
    env.MAP_RELEASE_BOOTSTRAP_VERSION !== plan.versionKey ||
    !bootstrapConfirmed(request, plan.versionKey)
  ) {
    return adminJson({ error: "bootstrap-unavailable" }, 404);
  }
  if (await bucket.head("channels/stable.json")) {
    return adminJson({ error: "bootstrap-retired" }, 410);
  }

  const url = new URL(request.url);
  const startValue = url.searchParams.get("start") ?? "";
  const limitValue = url.searchParams.get("limit") ?? "";
  if (!/^\d+$/u.test(startValue) || !/^\d+$/u.test(limitValue)) {
    return adminJson({ error: "invalid-bootstrap-cursor" }, 400);
  }
  const start = Number(startValue);
  const limit = Number(limitValue);
  const objects = embeddedBootstrapPlan.objects;
  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(limit) ||
    start < 0 ||
    start > objects.length ||
    limit < 1 ||
    limit > MAX_BOOTSTRAP_BATCH_OBJECTS
  ) {
    return adminJson({ error: "invalid-bootstrap-cursor" }, 400);
  }

  const descriptors: ReleasePlanObjectDescriptor[] = [];
  let batchBytes = 0;
  for (const descriptor of objects.slice(start, start + limit)) {
    if (descriptor.bytes > 8 * 1024 * 1024) {
      return adminJson({ error: "bootstrap-object-too-large", key: descriptor.key }, 500);
    }
    if (descriptors.length > 0 && batchBytes + descriptor.bytes > 8 * 1024 * 1024) break;
    descriptors.push(descriptor);
    batchBytes += descriptor.bytes;
  }

  let uploaded = 0;
  let skipped = 0;
  for (const descriptor of descriptors) {
    const expectation = plan.expectations.get(descriptor.key);
    if (!expectation) return adminJson({ error: "bootstrap-plan-drift" }, 500);
    const assetPath = descriptor.source.slice("public".length);
    const assetUrl = new URL(assetPath, "https://assets.local");
    const assetResponse = await env.ASSETS.fetch(new Request(assetUrl, {
      headers: { "accept-encoding": "identity" },
      method: "GET",
    }));
    if (
      assetResponse.status !== 200 ||
      assetResponse.redirected ||
      assetResponse.headers.has("content-encoding")
    ) {
      return adminJson({ error: "bundled-asset-unavailable", key: descriptor.key }, 500);
    }
    const body = await assetResponse.arrayBuffer();
    if (body.byteLength !== descriptor.bytes || await sha256BufferHex(body) !== descriptor.sha256) {
      return adminJson({ error: "bundled-asset-verification-failed", key: descriptor.key }, 500);
    }
    const stored = await storeImmutableObject(bucket, expectation, body);
    if (stored.error) {
      return adminJson({
        error: stored.error,
        differences: stored.differences,
        key: descriptor.key,
      }, stored.status);
    }
    if (stored.outcome === "uploaded") uploaded += 1;
    else skipped += 1;
  }

  const next = start + descriptors.length;
  return adminJson({
    batchBytes,
    done: next === objects.length,
    manifestSha256: bootstrapReleasePlan.manifestSha256,
    next,
    objectCount: descriptors.length,
    skipped,
    start,
    total: objects.length,
    uploaded,
    versionKey: plan.versionKey,
  });
}

async function handleBootstrapPromotion(
  request: Request,
  env: MapReleaseAdminEnv,
  bucket: MapReleaseBucket,
) {
  const plan = validatedBootstrapPlan();
  if (
    request.method !== "GET" ||
    env.MAP_RELEASE_BOOTSTRAP_VERSION !== plan.versionKey ||
    !bootstrapConfirmed(request, plan.versionKey)
  ) {
    return adminJson({ error: "bootstrap-unavailable" }, 404);
  }
  if (await bucket.head("channels/stable.json")) {
    return adminJson({ error: "bootstrap-retired" }, 410);
  }
  const internalRequest = new Request("https://bootstrap.internal/promote", {
    body: JSON.stringify({
      confirmVersion: plan.versionKey,
      expectedCurrent: "none",
      plan: bootstrapReleasePlan,
    }),
    headers: { "content-type": "application/json" },
    method: "POST",
  });
  return handlePromotion(internalRequest, bucket);
}

async function listReleaseVersionObjects(bucket: MapReleaseBucket, versionKey: string) {
  const objects: MapReleaseObjectMetadata[] = [];
  for (const prefix of [`releases/${versionKey}/`, `bundles/${versionKey}/`]) {
    let cursor: string | undefined;
    do {
      const page = await bucket.list({
        prefix,
        cursor,
        limit: 1000,
        include: ["httpMetadata", "customMetadata"],
      });
      objects.push(...page.objects);
      if (page.truncated && !page.cursor) throw new Error("R2 list cursor is missing.");
      cursor = page.truncated ? page.cursor : undefined;
    } while (cursor);
  }
  return objects;
}

async function handlePromotion(request: Request, bucket: MapReleaseBucket) {
  const requestLength = parseIntegerHeader(request.headers.get("content-length"));
  if (requestLength !== null && requestLength > 5 * 1024 * 1024) {
    return adminJson({ error: "promotion-plan-too-large" }, 413);
  }
  let payload: {
    confirmVersion?: unknown;
    expectedCurrent?: unknown;
    plan?: unknown;
  };
  try {
    payload = await request.json();
  } catch {
    return adminJson({ error: "invalid-json" }, 400);
  }
  const expectedCurrent = payload.expectedCurrent;
  const validatedPlan = validatePromotionPlan(payload.plan);
  if (
    (expectedCurrent !== "none" &&
      (typeof expectedCurrent !== "string" || !VERSION_KEY_PATTERN.test(expectedCurrent))) ||
    !validatedPlan ||
    payload.confirmVersion !== validatedPlan.versionKey
  ) {
    return adminJson({ error: "invalid-promotion" }, 400);
  }

  const listedObjects = await listReleaseVersionObjects(bucket, validatedPlan.versionKey);
  if (listedObjects.length !== validatedPlan.expectations.size) {
    return adminJson({ error: "release-object-set-mismatch" }, 409);
  }
  const listedKeys = new Set<string>();
  for (const object of listedObjects) {
    if (!object.key || listedKeys.has(object.key)) {
      return adminJson({ error: "release-object-set-mismatch" }, 409);
    }
    listedKeys.add(object.key);
    const expectation = validatedPlan.expectations.get(object.key);
    if (!expectation || objectDifferences(object, expectation).length > 0) {
      return adminJson({ error: "release-object-verification-failed", key: object.key }, 409);
    }
  }
  if ([...validatedPlan.expectations.keys()].some((key) => !listedKeys.has(key))) {
    return adminJson({ error: "release-object-set-mismatch" }, 409);
  }

  const manifest = await bucket.head(validatedPlan.pointer.manifestKey);
  if (
    !manifest ||
    manifest.customMetadata?.["atlas-version-key"] !== validatedPlan.versionKey ||
    manifest.customMetadata?.["atlas-kind"] !== "immutable-release-object"
  ) {
    return adminJson({ error: "manifest-not-published" }, 409);
  }

  const body = `${JSON.stringify(validatedPlan.pointer)}\n`;
  const bodyBytes = new TextEncoder().encode(body).byteLength;
  const metadata = {
    "atlas-sha256": await sha256Hex(body),
    "atlas-version-key": validatedPlan.versionKey,
    "atlas-bytes": String(bodyBytes),
    "atlas-kind": "channel-pointer",
  };

  async function pointerMatchesTarget(object: MapReleaseObjectMetadata | null) {
    if (
      !object ||
      object.size !== bodyBytes ||
      object.customMetadata?.["atlas-sha256"] !== metadata["atlas-sha256"] ||
      object.customMetadata?.["atlas-version-key"] !== metadata["atlas-version-key"] ||
      object.customMetadata?.["atlas-bytes"] !== String(bodyBytes) ||
      object.customMetadata?.["atlas-kind"] !== "channel-pointer" ||
      object.httpMetadata?.contentType !== "application/json; charset=utf-8" ||
      object.httpMetadata?.cacheControl !== POINTER_CACHE_CONTROL
    ) {
      return false;
    }
    const storedPointer = await bucket.get("channels/stable.json");
    return Boolean(storedPointer && await storedPointer.text() === body);
  }

  const current = await bucket.head("channels/stable.json");
  if (await pointerMatchesTarget(current)) {
    return adminJson({
      activeVersionKey: validatedPlan.versionKey,
      outcome: "already-promoted",
    });
  }
  let onlyIf: { etagMatches?: string; etagDoesNotMatch?: string };
  if (expectedCurrent === "none") {
    if (current) return adminJson({ error: "stable-channel-conflict" }, 409);
    onlyIf = { etagDoesNotMatch: "*" };
  } else {
    if (
      !current ||
      !current.etag ||
      current.customMetadata?.["atlas-version-key"] !== expectedCurrent
    ) {
      return adminJson({ error: "stable-channel-conflict" }, 409);
    }
    onlyIf = { etagMatches: current.etag };
  }

  const stored = await bucket.put("channels/stable.json", body, {
    onlyIf,
    httpMetadata: {
      contentType: "application/json; charset=utf-8",
      cacheControl: POINTER_CACHE_CONTROL,
    },
    customMetadata: metadata,
    sha256: metadata["atlas-sha256"],
  });
  if (!stored) return adminJson({ error: "stable-channel-changed" }, 409);
  const verified = await bucket.head("channels/stable.json");
  if (!await pointerMatchesTarget(verified)) {
    return adminJson({ error: "stable-channel-verification-failed" }, 500);
  }
  return adminJson({ activeVersionKey: validatedPlan.versionKey, outcome: "promoted" });
}

export function isMapAssetsBootstrapFallbackEnabled(
  value: string | undefined,
  bundledVersionKey: string,
) {
  return value === bundledVersionKey;
}

export async function handleMapReleaseAdmin(
  request: Request,
  env: MapReleaseAdminEnv,
): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const bootstrapPath = `${ADMIN_BASE_PATH}/bootstrap`;
  const bootstrapPromotePath = `${ADMIN_BASE_PATH}/bootstrap/promote`;
  const isBootstrapBrowserOperation = pathname === BOOTSTRAP_BROWSER_PATH;
  const isBootstrapOperation =
    pathname === bootstrapPath ||
    pathname === bootstrapPromotePath ||
    isBootstrapBrowserOperation;
  if (pathname !== `${ADMIN_BASE_PATH}/object` &&
      pathname !== `${ADMIN_BASE_PATH}/promote` &&
      pathname !== `${ADMIN_BASE_PATH}/status` &&
      !isBootstrapOperation) {
    return null;
  }
  if (isBootstrapOperation && env.MAP_RELEASE_BOOTSTRAP_RETIRED === "1") {
    return adminJson({ error: "not-found" }, 404);
  }
  const token = isBootstrapOperation
    ? env.MAP_RELEASE_BOOTSTRAP_TOKEN
    : env.MAP_RELEASE_UPLOAD_TOKEN;
  if (!env.MAP_ASSETS || !token || token.length < 32) {
    return adminJson({ error: "not-found" }, 404);
  }
  const authorized = isBootstrapOperation
    ? await isBootstrapAuthorized(request, token)
    : await isAuthorized(request, token);
  if (!authorized) {
    return adminJson(
      { error: "unauthorized" },
      401,
      { "www-authenticate": 'Bearer realm="atlas-release"' },
    );
  }

  try {
    if (isBootstrapBrowserOperation) {
      const action = url.searchParams.get("action");
      if (action === "copy") {
        return bootstrapHtml(
          await handleBootstrapCopy(request, env, env.MAP_ASSETS),
          request,
          "copy",
        );
      }
      if (action === "promote") {
        return bootstrapHtml(
          await handleBootstrapPromotion(request, env, env.MAP_ASSETS),
          request,
          "promote",
        );
      }
      return bootstrapHtml(adminJson({ error: "invalid-bootstrap-action" }, 400));
    }
    if (pathname === bootstrapPath) {
      return handleBootstrapCopy(request, env, env.MAP_ASSETS);
    }
    if (pathname === bootstrapPromotePath) {
      return handleBootstrapPromotion(request, env, env.MAP_ASSETS);
    }
    if (pathname === `${ADMIN_BASE_PATH}/object`) {
      if (request.method === "HEAD") return handleObjectHead(request, env.MAP_ASSETS);
      if (request.method === "PUT") return handleObjectPut(request, env.MAP_ASSETS);
      return adminJson({ error: "method-not-allowed" }, 405, { allow: "HEAD, PUT" });
    }
    if (pathname === `${ADMIN_BASE_PATH}/promote`) {
      if (request.method !== "POST") {
        return adminJson({ error: "method-not-allowed" }, 405, { allow: "POST" });
      }
      return handlePromotion(request, env.MAP_ASSETS);
    }
    if (request.method !== "GET") {
      return adminJson({ error: "method-not-allowed" }, 405, { allow: "GET" });
    }
    const pointer = await env.MAP_ASSETS.head("channels/stable.json");
    return adminJson({
      activeVersionKey: pointer?.customMetadata?.["atlas-version-key"] ?? null,
      bootstrapFallbackConfigured: VERSION_KEY_PATTERN.test(
        env.MAP_RELEASE_BOOTSTRAP_VERSION ?? "",
      ),
      bindingReady: true,
    });
  } catch {
    return adminJson({ error: "release-operation-failed" }, 500);
  }
}
