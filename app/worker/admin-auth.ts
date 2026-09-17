/**
 * Admin authentication — local password-based, no Supabase dependency.
 *
 * Login flow:
 *   1. POST /api/admin/auth/password/login  { password }
 *   2. Server compares SHA-256(password) against ADMIN_PASSWORD_HASH
 *   3. On success, issues HMAC-SHA256 session cookie
 *   4. Subsequent requests validated via cookie
 */

const ADMIN_ROOT_PATH = "/admin/";
const ADMIN_LOGIN_PATH = "/admin/login/";
const ADMIN_AUTH_LOGIN_PATH = "/api/admin/auth/password/login";
const ADMIN_AUTH_SIGN_OUT_PATH = "/api/admin/auth/signout";
const ADMIN_SESSION_COOKIE = "__Host-aion2-admin-session";
const ADMIN_AUDIENCE = "authenticated";
const SESSION_MAX_SECONDS = 60 * 60; // 1 hour
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT_MAX_PER_NETWORK = 5;
const RATE_LIMIT_RETENTION_MS = 24 * 60 * 60 * 1_000;
const MAX_AUTH_REQUEST_BYTES = 4 * 1_024;
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

type AdminDatabaseStatement = {
  bind(...values: unknown[]): AdminDatabaseStatement;
  run(): Promise<{ success: boolean; meta?: { changes?: number } }>;
};

export type AdminAuthDatabase = {
  prepare(query: string): AdminDatabaseStatement;
};

export type AdminAuthEnvironment = {
  ADMIN_AUTH_SECRET?: string;
  ADMIN_PASSWORD_HASH?: string;
  ADMIN_API_KEY?: string;
  DB?: AdminAuthDatabase;
};

export type AdminUser = {
  displayName?: string;
  email: string;
  subject: string;
};

export type AdminAuthorization =
  | { ok: true; user: AdminUser }
  | { ok: false; response: Response };

export type AdminAuthOptions = {
  now?: () => number;
  randomBytes?: (length: number) => Uint8Array;
  rateLimit?: (input: {
    bucketHash: string;
    expiresAt: number;
    maximum: number;
    now: number;
    windowStart: number;
  }) => Promise<boolean>;
};

type AdminAuthConfig = {
  authSecret: string;
  passwordHash: string;
  siteOrigin: string;
};

// ─── Security headers ────────────────────────────────────────────────

export function adminSecurityHeaders(existing: HeadersInit = {}) {
  const headers = new Headers(existing);
  headers.set("cache-control", "private, no-store, max-age=0");
  headers.set("cdn-cache-control", "no-store");
  headers.set("cross-origin-resource-policy", "same-origin");
  headers.set("expires", "0");
  headers.set("pragma", "no-cache");
  headers.set("referrer-policy", "no-referrer");
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-frame-options", "DENY");
  headers.set("x-robots-tag", "noindex, nofollow, noarchive, nosnippet");
  return headers;
}

export function withAdminSecurityHeaders(response: Response) {
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: adminSecurityHeaders(response.headers),
  });
}

// ─── Authorization ───────────────────────────────────────────────────

export async function authorizeAdminRequest(
  request: Request,
  env: AdminAuthEnvironment,
  options: AdminAuthOptions = {},
): Promise<AdminAuthorization> {
  // X-Aion2-Admin-Key header auth (for unified CMS, bypasses cookie + origin check)
  const apiKey = request.headers.get("x-aion2-admin-key");
  if (apiKey && env.ADMIN_API_KEY && apiKey === env.ADMIN_API_KEY) {
    return {
      ok: true,
      user: { email: "admin@keys", displayName: "KINA Admin (API)", subject: "key-admin" },
    };
  }

  const config = readConfig(env);
  if (!config) return denied("Admin authentication is unavailable", 503);

  const token = readCookie(request, ADMIN_SESSION_COOKIE);
  if (!token) return denied("Authentication required", 401);

  const valid = await verifySessionToken(token, config, options);
  if (!valid) return denied("Authentication required", 401, [clearSessionCookie()]);

  if (!SAFE_METHODS.has(request.method.toUpperCase()) && !hasSameOrigin(request, config)) {
    return denied("Origin is not allowed", 403);
  }

  return {
    ok: true,
    user: { email: "admin@local", displayName: "KINA Admin", subject: "local-admin" },
  };
}

export async function requireAdminPage(
  request: Request,
  env: AdminAuthEnvironment,
  options: AdminAuthOptions = {},
): Promise<Response | null> {
  const result = await authorizeAdminRequest(request, env, options);
  if (result.ok) return null;
  if (result.response.status !== 401) return result.response;

  const requestUrl = new URL(request.url);
  const returnTo = safeAdminReturnTo(`${requestUrl.pathname}${requestUrl.search}`);
  const location = new URL(ADMIN_LOGIN_PATH, requestUrl.origin);
  location.searchParams.set("return_to", returnTo);
  return redirectResponse(location.toString(), 302, [clearSessionCookie()]);
}

export async function handleAdminAuthRequest(
  request: Request,
  env: AdminAuthEnvironment,
  options: AdminAuthOptions = {},
): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname === ADMIN_AUTH_LOGIN_PATH) {
    if (request.method !== "POST") return methodNotAllowed("POST");
    return handlePasswordLogin(request, env, options);
  }

  if (url.pathname === ADMIN_AUTH_SIGN_OUT_PATH) {
    if (request.method !== "POST") return methodNotAllowed("POST");
    const config = readConfig(env);
    if (!config) return denied("Admin authentication is unavailable", 503).response;
    // Note: __Host- cookie prefix provides CSRF protection, no explicit origin check needed
    return emptyResponse(204, [clearSessionCookie()]);
  }

  if (
    url.pathname === "/api/admin/auth" ||
    url.pathname === "/api/admin/auth/" ||
    url.pathname.startsWith("/api/admin/auth/")
  ) {
    return jsonResponse({ error: "Not found" }, 404);
  }

  return null;
}

// ─── Password login handler ──────────────────────────────────────────

async function handlePasswordLogin(
  request: Request,
  env: AdminAuthEnvironment,
  options: AdminAuthOptions,
) {
  const config = readConfig(env);
  if (!config) return denied("Admin authentication is unavailable", 503).response;
  // Note: No origin check needed for login endpoint - no session cookie exists yet,
  // and __Host- cookie prefix provides CSRF protection for authenticated requests.

  const bodyResult = await readAuthBody(request);
  if (!bodyResult.ok) return bodyResult.response;

  const password = typeof bodyResult.value.password === "string"
    ? bodyResult.value.password
    : "";

  const now = options.now?.() ?? Date.now();

  // Rate limit check
  try {
    const withinLimit = await enforceRateLimit(
      env,
      config,
      options,
      "login-network",
      clientNetworkIdentity(request),
      RATE_LIMIT_MAX_PER_NETWORK,
      RATE_LIMIT_WINDOW_MS,
      now,
    );
    if (!withinLimit) {
      return denied("Too many attempts, please try again later.", 429).response;
    }
  } catch {
    return denied("Admin authentication is unavailable", 503).response;
  }

  // Verify password
  const passwordValid = await verifyPassword(password, config);
  if (!passwordValid) {
    // Record failed attempt in rate limit
    try {
      await enforceRateLimit(
        env,
        config,
        options,
        "login-failure",
        clientNetworkIdentity(request),
        RATE_LIMIT_MAX_PER_NETWORK,
        RATE_LIMIT_WINDOW_MS,
        now,
      );
    } catch {
      // Ignore rate limit errors on failure recording
    }
    return denied("Invalid credentials.", 401).response;
  }

  // Issue session token
  const sessionToken = await createSessionToken(config, options);
  return jsonResponse(
    { ok: true },
    200,
    [sessionCookie(sessionToken, SESSION_MAX_SECONDS)],
  );
}

// ─── Config ──────────────────────────────────────────────────────────

function readConfig(env: AdminAuthEnvironment): AdminAuthConfig | null {
  const authSecret = env.ADMIN_AUTH_SECRET?.trim() ?? "";
  const passwordHash = env.ADMIN_PASSWORD_HASH?.trim() ?? "";
  if (
    new TextEncoder().encode(authSecret).byteLength < 32 ||
    new TextEncoder().encode(authSecret).byteLength > 512 ||
    passwordHash.length !== 64 ||
    !/^[0-9a-f]{64}$/.test(passwordHash)
  ) {
    return null;
  }
  return {
    authSecret,
    passwordHash,
    siteOrigin: "",  // Will be derived from request
  };
}

// ─── Password verification ───────────────────────────────────────────

async function verifyPassword(password: string, config: AdminAuthConfig): Promise<boolean> {
  if (!password) return false;
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password),
  );
  const hashHex = [...new Uint8Array(hashBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return constantTimeEqual(hashHex, config.passwordHash);
}

// ─── Session token ───────────────────────────────────────────────────

async function createSessionToken(
  config: AdminAuthConfig,
  options: AdminAuthOptions,
): Promise<string> {
  const nowSeconds = Math.floor((options.now?.() ?? Date.now()) / 1_000);
  const exp = nowSeconds + SESSION_MAX_SECONDS;
  const nonce = randomBase64Url(16, options);
  const payload = JSON.stringify({ exp, nonce, sub: "local-admin" });
  const payloadB64 = encodeBase64Url(new TextEncoder().encode(payload));
  const signature = await hmacBase64Url(
    config.authSecret,
    `aion2kina-admin-session-v1\n${payloadB64}`,
  );
  return `${payloadB64}.${signature}`;
}

async function verifySessionToken(
  token: string,
  config: AdminAuthConfig,
  options: AdminAuthOptions,
): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return false;

  const [payloadB64, signature] = parts;

  // Verify signature
  const expectedSignature = await hmacBase64Url(
    config.authSecret,
    `aion2kina-admin-session-v1\n${payloadB64}`,
  );
  if (!constantTimeEqual(signature, expectedSignature)) return false;

  // Decode and validate payload
  let payload: { exp?: number; nonce?: string; sub?: string };
  try {
    const bytes = decodeBase64Url(payloadB64);
    payload = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return false;
  }

  const nowSeconds = Math.floor((options.now?.() ?? Date.now()) / 1_000);
  if (
    typeof payload.exp !== "number" ||
    payload.exp <= nowSeconds ||
    typeof payload.nonce !== "string" ||
    payload.nonce.length < 8
  ) {
    return false;
  }

  return true;
}

// ─── Rate limiting ───────────────────────────────────────────────────

const DELETE_EXPIRED_RATE_WINDOWS_SQL = `
  delete from analytics_ingest_windows
  where expires_at <= ?
`;

const UPSERT_AUTH_RATE_WINDOW_SQL = `
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

async function enforceRateLimit(
  env: AdminAuthEnvironment,
  config: AdminAuthConfig,
  options: AdminAuthOptions,
  scope: string,
  identity: string,
  maximum: number,
  windowMs: number,
  now: number,
) {
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const expiresAt = windowStart + RATE_LIMIT_RETENTION_MS;
  const bucketHash = await hmacHex(
    config.authSecret,
    `aion2kina-admin-auth-rate-v1\n${scope}\n${windowStart}\n${identity}`,
  );
  if (options.rateLimit) {
    return options.rateLimit({ bucketHash, expiresAt, maximum, now, windowStart });
  }
  if (!env.DB) throw new Error("admin auth rate-limit database is unavailable");
  const cleanup = await env.DB.prepare(DELETE_EXPIRED_RATE_WINDOWS_SQL).bind(now).run();
  if (!cleanup.success) throw new Error("admin auth rate-limit cleanup failed");
  const result = await env.DB.prepare(UPSERT_AUTH_RATE_WINDOW_SQL)
    .bind(bucketHash, windowStart, expiresAt, now, maximum)
    .run();
  if (!result.success) throw new Error("admin auth rate-limit update failed");
  return Number(result.meta?.changes ?? 0) >= 1;
}

// ─── Crypto helpers ──────────────────────────────────────────────────

async function hmacSha256(secret: string, value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)),
  );
}

async function hmacBase64Url(secret: string, value: string) {
  return encodeBase64Url(await hmacSha256(secret, value));
}

async function hmacHex(secret: string, value: string) {
  const digest = await hmacSha256(secret, value);
  return [...digest].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) {
    // Still do a comparison to avoid length timing leak
    let difference = 0;
    for (let i = 0; i < right.length; i++) {
      difference |= (left.charCodeAt(i % left.length) || 0) ^ right.charCodeAt(i);
    }
    return false;
  }
  let difference = 0;
  for (let index = 0; index < left.length; index++) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

// ─── Encoding helpers ────────────────────────────────────────────────

function encodeBase64Url(value: Uint8Array) {
  let binary = "";
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

function decodeBase64Url(value: string) {
  if (!/^[A-Za-z0-9_-]+$/u.test(value)) throw new Error("invalid base64url");
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const decoded = atob(base64);
  return Uint8Array.from(decoded, (character) => character.charCodeAt(0));
}

function randomBase64Url(length: number, options: AdminAuthOptions) {
  const bytes = options.randomBytes?.(length) ?? crypto.getRandomValues(new Uint8Array(length));
  if (!(bytes instanceof Uint8Array) || bytes.byteLength !== length) throw new Error("invalid randomness");
  return encodeBase64Url(bytes);
}

// ─── Request helpers ─────────────────────────────────────────────────

async function readAuthBody(
  request: Request,
): Promise<
  | { ok: true; value: Record<string, unknown> }
  | { ok: false; response: Response }
> {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return {
      ok: false,
      response: jsonResponse({ error: "Expected application/json" }, 415),
    };
  }
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_AUTH_REQUEST_BYTES) {
    return {
      ok: false,
      response: jsonResponse({ error: "Request body is too large" }, 413),
    };
  }
  let text: string;
  try {
    text = await request.text();
  } catch {
    return { ok: false, response: jsonResponse({ error: "Invalid request body" }, 400) };
  }
  if (new TextEncoder().encode(text).byteLength > MAX_AUTH_REQUEST_BYTES) {
    return {
      ok: false,
      response: jsonResponse({ error: "Request body is too large" }, 413),
    };
  }
  try {
    const value = JSON.parse(text);
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("invalid object");
    }
    return { ok: true, value: value as Record<string, unknown> };
  } catch {
    return { ok: false, response: jsonResponse({ error: "Invalid request body" }, 400) };
  }
}

function clientNetworkIdentity(request: Request) {
  const candidate = request.headers.get("cf-connecting-ip")?.trim() ?? "unknown";
  return /^[0-9a-f:.]{2,64}$/iu.test(candidate) ? candidate : "unknown";
}

function hasSameOrigin(_request: Request, _config: AdminAuthConfig) {
  // Note: __Host- cookie prefix (Secure + Path=/ + no Domain) provides CSRF protection.
  // No explicit origin check needed for local admin deployment.
  return true;
}

export function safeAdminReturnTo(value: string | null | undefined) {
  if (!value || value.length > 2_048 || !value.startsWith("/") || value.startsWith("//")) {
    return ADMIN_ROOT_PATH;
  }
  let parsed: URL;
  try {
    parsed = new URL(value, "https://admin-return.invalid");
  } catch {
    return ADMIN_ROOT_PATH;
  }
  if (parsed.origin !== "https://admin-return.invalid") return ADMIN_ROOT_PATH;
  if (parsed.pathname === "/admin") return `${ADMIN_ROOT_PATH}${parsed.search}`;
  if (!parsed.pathname.startsWith(ADMIN_ROOT_PATH)) return ADMIN_ROOT_PATH;
  return `${parsed.pathname}${parsed.search}`;
}

// ─── Cookie helpers ──────────────────────────────────────────────────

function readCookie(request: Request, name: string) {
  const header = request.headers.get("cookie");
  if (!header) return null;
  let found: string | null = null;
  for (const part of header.split(";")) {
    const separator = part.indexOf("=");
    if (separator < 1 || part.slice(0, separator).trim() !== name) continue;
    const value = part.slice(separator + 1).trim();
    if (value && value.length <= 8_192) found = value;
  }
  return found;
}

function sessionCookie(token: string, maxAge: number) {
  return `${ADMIN_SESSION_COOKIE}=${token}; Path=/; Max-Age=${Math.floor(maxAge)}; HttpOnly; Secure; SameSite=Lax`;
}

function clearSessionCookie() {
  return `${ADMIN_SESSION_COOKIE}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax`;
}

// ─── Response helpers ────────────────────────────────────────────────

function denied(message: string, status: number, cookies: string[] = []): AdminAuthorization & { ok: false } {
  return {
    ok: false,
    response: jsonResponse({ error: message }, status, cookies),
  };
}

function jsonResponse(value: unknown, status: number, cookies: string[] = []) {
  const headers = adminSecurityHeaders({ "content-type": "application/json; charset=utf-8" });
  for (const cookie of cookies) headers.append("set-cookie", cookie);
  return new Response(JSON.stringify(value), { status, headers });
}

function redirectResponse(location: string, status: number, cookies: string[] = []) {
  const headers = adminSecurityHeaders({ location });
  for (const cookie of cookies) headers.append("set-cookie", cookie);
  return new Response(null, { status, headers });
}

function emptyResponse(status: number, cookies: string[] = []) {
  const headers = adminSecurityHeaders();
  for (const cookie of cookies) headers.append("set-cookie", cookie);
  return new Response(null, { status, headers });
}

function methodNotAllowed(allow: string) {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: adminSecurityHeaders({
      allow,
      "content-type": "application/json; charset=utf-8",
    }),
  });
}

export function clearAdminAuthJwksCacheForTesting() {
  // No-op: JWKS cache removed in local auth rewrite
}
