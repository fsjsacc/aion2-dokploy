import { decryptAnalyticsIp } from "./analytics-ip";
import { handleAdminExternalLinkApi } from "./external-link-api";
import { contentRegistry } from "../app/content-registry";

type AdminDatabaseResult<T = Record<string, unknown>> = {
  success: boolean;
  results?: T[];
  meta?: { changes?: number };
};

type AdminDatabaseStatement = {
  bind(...values: unknown[]): AdminDatabaseStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<AdminDatabaseResult<T>>;
  run(): Promise<AdminDatabaseResult>;
};

export type AdminDatabase = {
  prepare(query: string): AdminDatabaseStatement;
};

export type AdminApiEnvironment = {
  DB?: AdminDatabase;
  SITE_URL?: string;
  [key: string]: unknown;
};

export type AuthorizedAdmin = {
  email: string;
  displayName: string;
  subject?: string;
};

export type AdminAuthorization =
  | { ok: true; admin: AuthorizedAdmin }
  | { ok: false; response: Response };

export type AdminAuthorizer = (
  request: Request,
  env: AdminApiEnvironment,
) => Promise<AdminAuthorization>;

type ReportStatus = "new" | "triaged" | "accepted" | "rejected" | "resolved";

const ADMIN_API_PREFIX = "/api/admin/";
const REPORT_DETAIL_PATTERN = /^\/api\/admin\/reports\/([0-9a-f-]{36})$/u;
const REPORT_STATUSES = new Set<ReportStatus>([
  "new",
  "triaged",
  "accepted",
  "rejected",
  "resolved",
]);
const ALLOWED_DAYS = new Set([7, 30, 90]);
const MAX_PATCH_BYTES = 2_048;
const JOURNEY_RETENTION_DAYS = 30;
const JOURNEY_SAMPLE_THRESHOLD = 3;
const JOURNEY_RECENT_SESSION_LIMIT = 12;
const JOURNEY_RECENT_EVENT_LIMIT = 96;

function adminHeaders(extra: HeadersInit = {}) {
  const headers = new Headers(extra);
  headers.set("cache-control", "private, no-store");
  headers.set("cdn-cache-control", "no-store");
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cross-origin-resource-policy", "same-origin");
  headers.set("referrer-policy", "no-referrer");
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-robots-tag", "noindex, nofollow, noarchive, nosnippet");
  return headers;
}

function json(value: unknown, status = 200, extra?: HeadersInit) {
  return new Response(JSON.stringify(value), {
    status,
    headers: adminHeaders(extra),
  });
}

function error(message: string, status: number, extra?: HeadersInit) {
  return json({ error: message }, status, extra);
}

function configuredOrigin(request: Request, env: AdminApiEnvironment) {
  if (typeof env.SITE_URL === "string" && env.SITE_URL.trim()) {
    try {
      const configured = new URL(env.SITE_URL);
      if (
        configured.protocol === "https:" &&
        !configured.username &&
        !configured.password &&
        configured.pathname === "/" &&
        !configured.search &&
        !configured.hash
      ) {
        return configured.origin;
      }
    } catch {
      // Local development falls back to the request origin.
    }
  }
  return new URL(request.url).origin;
}

function hasSameOrigin(request: Request, env: AdminApiEnvironment) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    if (new URL(origin).origin !== origin || origin !== configuredOrigin(request, env)) {
      return false;
    }
  } catch {
    return false;
  }
  const fetchSite = request.headers.get("sec-fetch-site");
  return !fetchSite || fetchSite === "same-origin";
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : Number(value ?? 0) || 0;
}

function reportSummary(row: Record<string, unknown>) {
  return {
    id: String(row.id ?? ""),
    targetKind: String(row.target_kind ?? ""),
    targetKey: String(row.target_key ?? ""),
    locale: String(row.locale ?? ""),
    service: String(row.service ?? ""),
    version: typeof row.version === "string" ? row.version : null,
    category: String(row.category ?? ""),
    message: String(row.message ?? ""),
    evidenceUrl: typeof row.evidence_url === "string" ? row.evidence_url : null,
    status: String(row.status ?? "new") as ReportStatus,
    createdAt: numberValue(row.created_at),
    updatedAt: row.updated_at === null || row.updated_at === undefined
      ? null
      : numberValue(row.updated_at),
    resolvedAt: row.resolved_at === null || row.resolved_at === undefined
      ? null
      : numberValue(row.resolved_at),
  };
}

function reportDetail(row: Record<string, unknown>) {
  return {
    ...reportSummary(row),
    contact: typeof row.contact === "string" ? row.contact : null,
    resolutionNote: typeof row.resolution_note === "string" ? row.resolution_note : null,
  };
}

async function queryAll<T = Record<string, unknown>>(
  database: AdminDatabase,
  query: string,
  bindings: unknown[] = [],
) {
  const result = await database.prepare(query).bind(...bindings).all<T>();
  if (!result.success) throw new Error("Database query failed");
  return result.results ?? [];
}

async function queryFirst<T = Record<string, unknown>>(
  database: AdminDatabase,
  query: string,
  bindings: unknown[] = [],
) {
  return database.prepare(query).bind(...bindings).first<T>();
}

function startDay(days: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - (days - 1));
  return date.toISOString().slice(0, 10);
}

function journeyStartTimestamp(days: number) {
  return Date.parse(`${startDay(Math.min(days, JOURNEY_RETENTION_DAYS))}T00:00:00.000Z`);
}

function journeyDimensionRows(rows: Record<string, unknown>[]) {
  return rows.map((row) => ({
    label: String(row.label ?? "unknown"),
    count: numberValue(row.count),
    visitors: numberValue(row.visitors),
  }));
}

function shortSessionIdentifier(value: unknown) {
  const normalized = String(value ?? "").toLowerCase();
  return /^[0-9a-f]{8}$/u.test(normalized) ? normalized : "anonymous";
}

async function dashboardResponse(
  database: AdminDatabase,
  admin: AuthorizedAdmin,
  days: number,
  ipEncryptionKey: string | undefined,
) {
  const since = startDay(days);
  const today = new Date().toISOString().slice(0, 10);
  const now = Date.now();
  const journeyDays = Math.min(days, JOURNEY_RETENTION_DAYS);
  const journeySince = journeyStartTimestamp(journeyDays);
  const journeyWhere = "consent_version in (1, 2) and occurred_at >= ? and occurred_at <= ? and expires_at > ?";
  const [
    reportMetrics,
    eventMetrics,
    reportRows,
    series,
    events,
    surfaces,
    targets,
    journeyMetrics,
    journeyCountries,
    journeyDevices,
    journeyBrowsers,
    journeySources,
    journeyCampaigns,
    journeyMediums,
    journeyPaths,
    journeySessions,
    journeySessionEvents,
  ] =
    await Promise.all([
      queryFirst<Record<string, unknown>>(
        database,
        `select
          count(*) as reports_total,
          coalesce(sum(case when status in ('new', 'triaged', 'accepted') then 1 else 0 end), 0) as reports_open
        from content_reports`,
      ),
      queryFirst<Record<string, unknown>>(
        database,
        `select
          coalesce(sum(case when day = ? then count else 0 end), 0) as events_today,
          coalesce(sum(count), 0) as events_period
        from analytics_daily
        where day >= ?`,
        [today, since],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select
          id, target_kind, target_key, locale, service, version, category,
          message, evidence_url, status, created_at, updated_at, resolved_at
        from content_reports
        order by created_at desc
        limit 200`,
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select day, sum(count) as count
        from analytics_daily
        where day >= ?
        group by day
        order by day asc`,
        [since],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select event_name as label, sum(count) as count
        from analytics_daily
        where day >= ?
        group by event_name
        order by count desc, event_name asc
        limit 8`,
        [since],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select surface as label, sum(count) as count
        from analytics_daily
        where day >= ? and surface <> 'unknown'
        group by surface
        order by count desc, surface asc
        limit 8`,
        [since],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select target_key as label, sum(count) as count
        from analytics_daily
        where day >= ? and target_kind <> 'none'
        group by target_kind, target_key
        order by count desc, target_key asc
        limit 8`,
        [since],
      ),
      queryFirst<Record<string, unknown>>(
        database,
        `select
          count(*) as journey_events,
          count(distinct visitor_hash) as journey_visitors,
          count(distinct session_hash) as journey_sessions
        from analytics_journey_events
        where ${journeyWhere}`,
        [journeySince, now, now],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select country as label, count(*) as count,
          count(distinct visitor_hash) as visitors
        from analytics_journey_events
        where ${journeyWhere}
        group by country
        having count(distinct visitor_hash) >= ?
        order by count desc, country asc
        limit 10`,
        [journeySince, now, now, JOURNEY_SAMPLE_THRESHOLD],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select device_class as label, count(*) as count,
          count(distinct visitor_hash) as visitors
        from analytics_journey_events
        where ${journeyWhere}
        group by device_class
        having count(distinct visitor_hash) >= ?
        order by count desc, device_class asc
        limit 10`,
        [journeySince, now, now, JOURNEY_SAMPLE_THRESHOLD],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select browser_family as label, count(*) as count,
          count(distinct visitor_hash) as visitors
        from analytics_journey_events
        where ${journeyWhere}
        group by browser_family
        having count(distinct visitor_hash) >= ?
        order by count desc, browser_family asc
        limit 10`,
        [journeySince, now, now, JOURNEY_SAMPLE_THRESHOLD],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select utm_source as label, count(*) as count,
          count(distinct visitor_hash) as visitors
        from analytics_journey_events
        where ${journeyWhere} and utm_source is not null
        group by utm_source
        having count(distinct visitor_hash) >= ?
        order by count desc, utm_source asc
        limit 10`,
        [journeySince, now, now, JOURNEY_SAMPLE_THRESHOLD],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select utm_campaign as label, count(*) as count,
          count(distinct visitor_hash) as visitors
        from analytics_journey_events
        where ${journeyWhere} and utm_campaign is not null
        group by utm_campaign
        having count(distinct visitor_hash) >= ?
        order by count desc, utm_campaign asc
        limit 10`,
        [journeySince, now, now, JOURNEY_SAMPLE_THRESHOLD],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select utm_medium as label, count(*) as count,
          count(distinct visitor_hash) as visitors
        from analytics_journey_events
        where ${journeyWhere} and utm_medium is not null
        group by utm_medium
        having count(distinct visitor_hash) >= ?
        order by count desc, utm_medium asc
        limit 10`,
        [journeySince, now, now, JOURNEY_SAMPLE_THRESHOLD],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select path as label, count(*) as count,
          count(distinct visitor_hash) as visitors
        from analytics_journey_events
        where ${journeyWhere}
        group by path
        having count(distinct visitor_hash) >= ?
        order by count desc, path asc
        limit 12`,
        [journeySince, now, now, JOURNEY_SAMPLE_THRESHOLD],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select
          substr(session_hash, 1, 8) as session_short,
          min(occurred_at) as started_at,
          max(occurred_at) as last_at,
          count(*) as event_count,
          count(distinct path) as path_count
        from analytics_journey_events
        where ${journeyWhere}
        group by session_hash
        having count(*) >= 2
        order by last_at desc
        limit ?`,
        [journeySince, now, now, JOURNEY_RECENT_SESSION_LIMIT],
      ),
      queryAll<Record<string, unknown>>(
        database,
        `select
          id as row_id,
          substr(session_hash, 1, 8) as session_short,
          consent_version,
          visitor_hash,
          session_hash,
          ip_ciphertext,
          ip_iv,
          ip_key_version,
          event_name,
          path,
          surface,
          occurred_at
        from analytics_journey_events
        where ${journeyWhere}
          and session_hash in (
            select session_hash
            from analytics_journey_events
            where ${journeyWhere}
            group by session_hash
            having count(*) >= 2
            order by max(occurred_at) desc
            limit ?
          )
        order by occurred_at desc
        limit ?`,
        [
          journeySince,
          now,
          now,
          journeySince,
          now,
          now,
          JOURNEY_RECENT_SESSION_LIMIT,
          JOURNEY_RECENT_EVENT_LIMIT,
        ],
      ),
    ]);

  const byDay = new Map(series.map((row) => [String(row.day), numberValue(row.count)]));
  const completeSeries: Array<{ day: string; count: number }> = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - offset);
    const day = date.toISOString().slice(0, 10);
    completeSeries.push({ day, count: byDay.get(day) ?? 0 });
  }
  const labelRows = (rows: Record<string, unknown>[]) => rows.map((row) => ({
    label: String(row.label ?? "unknown"),
    count: numberValue(row.count),
  }));
  const recentJourneyEvents = await Promise.all(journeySessionEvents.map(async (row) => {
    const rowId = String(row.row_id ?? "");
    const visitorHash = String(row.visitor_hash ?? "");
    const sessionHash = String(row.session_hash ?? "");
    const ciphertext = String(row.ip_ciphertext ?? "");
    const iv = String(row.ip_iv ?? "");
    const keyVersion = numberValue(row.ip_key_version);
    const occurredAt = numberValue(row.occurred_at);
    const mayDecrypt =
      numberValue(row.consent_version) === 2 &&
      rowId.length > 0 &&
      /^[0-9a-f]{64}$/u.test(visitorHash) &&
      /^[0-9a-f]{64}$/u.test(sessionHash) &&
      ciphertext.length > 0 &&
      iv.length > 0;
    const ipAddress = mayDecrypt
      ? await decryptAnalyticsIp(
          { ciphertext, iv, keyVersion },
          { rowId, visitorHash, sessionHash, occurredAt },
          ipEncryptionKey,
        )
      : null;
    return {
      sessionId: shortSessionIdentifier(row.session_short),
      eventName: String(row.event_name ?? "unknown"),
      path: String(row.path ?? "/"),
      surface: String(row.surface ?? "unknown"),
      occurredAt,
      ipAddress,
    };
  }));
  const recentSessions = journeySessions.map((row) => {
    const sessionId = shortSessionIdentifier(row.session_short);
    const sessionEvents = recentJourneyEvents
      .filter((event) => event.sessionId === sessionId);
    return {
      sessionId,
      ipAddress: sessionEvents.find((event) => event.ipAddress)?.ipAddress ?? null,
      startedAt: numberValue(row.started_at),
      lastAt: numberValue(row.last_at),
      eventCount: numberValue(row.event_count),
      pathCount: numberValue(row.path_count),
      events: sessionEvents
        .slice(0, 8)
        .reverse()
        .map((event) => ({
          sessionId: event.sessionId,
          eventName: event.eventName,
          path: event.path,
          surface: event.surface,
          occurredAt: event.occurredAt,
        })),
    };
  });

  return json({
    generatedAt: Date.now(),
    admin: { displayName: admin.displayName },
    metrics: {
      reportsTotal: numberValue(reportMetrics?.reports_total),
      reportsOpen: numberValue(reportMetrics?.reports_open),
      eventsToday: numberValue(eventMetrics?.events_today),
      eventsPeriod: numberValue(eventMetrics?.events_period),
    },
    reports: reportRows.map(reportSummary),
    analytics: {
      days,
      series: completeSeries,
      events: labelRows(events),
      surfaces: labelRows(surfaces),
      targets: labelRows(targets),
    },
    journeys: {
      days: journeyDays,
      retentionDays: JOURNEY_RETENTION_DAYS,
      sampleThreshold: JOURNEY_SAMPLE_THRESHOLD,
      eventCount: numberValue(journeyMetrics?.journey_events),
      uniqueVisitors: numberValue(journeyMetrics?.journey_visitors),
      sessionCount: numberValue(journeyMetrics?.journey_sessions),
      countries: journeyDimensionRows(journeyCountries),
      devices: journeyDimensionRows(journeyDevices),
      browsers: journeyDimensionRows(journeyBrowsers),
      utmSources: journeyDimensionRows(journeySources),
      utmMediums: journeyDimensionRows(journeyMediums),
      utmCampaigns: journeyDimensionRows(journeyCampaigns),
      paths: journeyDimensionRows(journeyPaths),
      recentSessions,
    },
  });
}

async function readBoundedJson(request: Request) {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && (!/^\d+$/u.test(declaredLength) || Number(declaredLength) > MAX_PATCH_BYTES)) {
    throw new Error("Request body is too large");
  }
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_PATCH_BYTES) {
    throw new Error("Request body is too large");
  }
  return JSON.parse(text) as unknown;
}

function parseReportPatch(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid patch");
  }
  const input = value as Record<string, unknown>;
  if (Object.keys(input).some((key) => key !== "status" && key !== "resolutionNote")) {
    throw new Error("Invalid patch");
  }
  if (typeof input.status !== "string" || !REPORT_STATUSES.has(input.status as ReportStatus)) {
    throw new Error("Invalid status");
  }
  if (typeof input.resolutionNote !== "string") throw new Error("Invalid note");
  const note = input.resolutionNote.trim().replace(/\r\n?/gu, "\n");
  if ([...note].length > 1_000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(note)) {
    throw new Error("Invalid note");
  }
  return { status: input.status as ReportStatus, resolutionNote: note || null };
}

async function reportDetailResponse(
  request: Request,
  env: AdminApiEnvironment,
  database: AdminDatabase,
  admin: AuthorizedAdmin,
  id: string,
) {
  if (request.method === "GET") {
    const row = await queryFirst<Record<string, unknown>>(
      database,
      `select
        id, target_kind, target_key, locale, service, version, category,
        message, evidence_url, contact, status, created_at, updated_at,
        resolved_at, resolution_note
      from content_reports
      where id = ?
      limit 1`,
      [id],
    );
    return row ? json(reportDetail(row)) : error("Report not found", 404);
  }
  if (request.method !== "PATCH") {
    return error("Method not allowed", 405, { allow: "GET, PATCH" });
  }
  if (!hasSameOrigin(request, env)) return error("Origin is not allowed", 403);
  if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
    return error("Content-Type must be application/json", 415);
  }

  let patch: ReturnType<typeof parseReportPatch>;
  try {
    patch = parseReportPatch(await readBoundedJson(request));
  } catch {
    return error("Request body is invalid", 400);
  }
  const existing = await queryFirst<Record<string, unknown>>(
    database,
    "select status from content_reports where id = ? limit 1",
    [id],
  );
  if (!existing) return error("Report not found", 404);

  const now = Date.now();
  const resolvedAt = patch.status === "resolved" ? now : null;
  const update = await database.prepare(
    `update content_reports
    set status = ?, updated_at = ?, resolved_at = ?, resolution_note = ?, resolved_by = ?
    where id = ?`,
  ).bind(
    patch.status,
    now,
    resolvedAt,
    patch.resolutionNote,
    admin.email,
    id,
  ).run();
  if (!update.success || numberValue(update.meta?.changes) !== 1) {
    return error("Report could not be updated", 503);
  }

  const row = await queryFirst<Record<string, unknown>>(
    database,
    `select
      id, target_kind, target_key, locale, service, version, category,
      message, evidence_url, contact, status, created_at, updated_at,
      resolved_at, resolution_note
    from content_reports
    where id = ?
    limit 1`,
    [id],
  );
  return row ? json(reportDetail(row)) : error("Report not found", 404);
}

async function handleAdminReportsList(
  request: Request,
  database: AdminDatabase,
  _admin: AuthorizedAdmin,
): Promise<Response> {
  if (request.method !== "GET") {
    return error("Method not allowed", 405, { allow: "GET" });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const locale = url.searchParams.get("locale");
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? 20)));

  const conditions: string[] = [];
  const bindings: unknown[] = [];

  if (status && REPORT_STATUSES.has(status as ReportStatus)) {
    conditions.push("status = ?");
    bindings.push(status);
  }
  if (locale && typeof locale === "string" && locale.trim()) {
    conditions.push("locale = ?");
    bindings.push(locale.trim());
  }

  const whereClause = conditions.length > 0 ? ` where ${conditions.join(" and ")}` : "";

  try {
    const countRow = await queryFirst<{ total: number }>(
      database,
      `select count(*) as total from content_reports${whereClause}`,
      bindings,
    );
    const total = numberValue(countRow?.total);

    const offset = (page - 1) * limit;
    const rows = await queryAll<Record<string, unknown>>(
      database,
      `select
        id, target_kind, target_key, locale, service, version, category,
        message, evidence_url, status, created_at, updated_at, resolved_at
      from content_reports${whereClause}
      order by created_at desc
      limit ? offset ?`,
      [...bindings, limit, offset],
    );

    return json({
      data: rows.map(reportSummary),
      total,
      page,
      limit,
    });
  } catch {
    return error("Reports data is temporarily unavailable", 503);
  }
}

const CONTENT_LIST_PATTERN = /^\/api\/admin\/content$/u;
const CONTENT_DETAIL_PATTERN = /^\/api\/admin\/content\/([0-9a-f-]{36})$/u;

export async function handleAdminContentApi(
  request: Request,
  env: AdminApiEnvironment,
  admin: AuthorizedAdmin,
  isKeyAuth: boolean,
): Promise<Response | null> {
  const url = new URL(request.url);
  const detailMatch = url.pathname.match(CONTENT_DETAIL_PATTERN);
  if (
    !CONTENT_LIST_PATTERN.test(url.pathname) &&
    !detailMatch
  ) {
    return null;
  }
  if (!env.DB) return error("Admin data service is temporarily unavailable", 503);
  if (!isKeyAuth && !hasSameOrigin(request, env)) {
    return json({ error: "请求来源无效。" }, 403);
  }

  // GET list (section filter)
  if (url.pathname === "/api/admin/content" && request.method === "GET") {
    const section = url.searchParams.get("section");
    const rowSql = section
      ? `SELECT * FROM content_entries WHERE section = ? ORDER BY updated_at DESC`
      : `SELECT * FROM content_entries ORDER BY updated_at DESC`;
    const result = section
      ? await env.DB.prepare(rowSql).bind(section).all()
      : await env.DB.prepare(rowSql).all();
    return json({ entries: result.results ?? [] });
  }

  // POST create
  if (url.pathname === "/api/admin/content" && request.method === "POST") {
    const payload = (await request.json()) as Record<string, unknown>;
    const section = typeof payload.section === "string" && payload.section ? payload.section : null;
    const slug = typeof payload.slug === "string" && payload.slug ? payload.slug : null;
    if (!section || !slug) {
      return json({ error: "section 与 slug 为必填项。" }, 400);
    }
    const fill = (value: unknown, fallback: unknown) =>
      value === undefined || value === null ? fallback : value;
    const today = new Date().toISOString().slice(0, 10);
    const id = crypto.randomUUID();
    const publication = fill(
      payload.publication,
      { status: "draft", indexable: false, localeReview: {}, sourceReview: "unverified" },
    );
    const related = fill(payload.related, []);
    const translations = fill(payload.translations, {});
    try {
      await env.DB.prepare(
        `INSERT INTO content_entries (id, section, slug, schema_type, published_at, updated_at,
          reading_minutes, publication_json, sources_json, hero_image_json, primary_action_json,
          properties_json, related_json, translations_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(
          id,
          section,
          slug,
          fill(payload.schemaType, "Article"),
          fill(payload.publishedAt, today),
          fill(payload.updatedAt, today),
          fill(payload.readingMinutes, 0),
          JSON.stringify(publication),
          payload.sources ? JSON.stringify(payload.sources) : null,
          payload.heroImage ? JSON.stringify(payload.heroImage) : null,
          payload.primaryAction ? JSON.stringify(payload.primaryAction) : null,
          payload.properties ? JSON.stringify(payload.properties) : null,
          JSON.stringify(related),
          JSON.stringify(translations),
        )
        .run();
    } catch (e) {
      if (String(e).includes("UNIQUE")) {
        return json({ error: `已存在相同 section+slug 的内容条目（${section}/${slug}）。` }, 409);
      }
      throw e;
    }
    return json({ id, ...payload, publishedAt: fill(payload.publishedAt, today), updatedAt: fill(payload.updatedAt, today) }, 201);
  }

  if (detailMatch) {
    const id = detailMatch[1];
    if (request.method === "GET") {
      const result = await env.DB.prepare(
        "SELECT * FROM content_entries WHERE id = ?",
      )
        .bind(id)
        .all();
      return json((result.results?.[0] as Record<string, unknown>) ?? null);
    }
    if (request.method === "PUT") {
      const payload = (await request.json()) as Record<string, unknown>;
      await env.DB.prepare(
        `UPDATE content_entries SET section=?, slug=?, schema_type=?, published_at=?, updated_at=?,
          reading_minutes=?, publication_json=?, sources_json=?, hero_image_json=?,
          primary_action_json=?, properties_json=?, related_json=?, translations_json=?
         WHERE id = ?`,
      )
        .bind(
          payload.section,
          payload.slug,
          payload.schemaType,
          payload.publishedAt,
          payload.updatedAt,
          payload.readingMinutes,
          JSON.stringify(payload.publication),
          payload.sources ? JSON.stringify(payload.sources) : null,
          payload.heroImage ? JSON.stringify(payload.heroImage) : null,
          payload.primaryAction ? JSON.stringify(payload.primaryAction) : null,
          payload.properties ? JSON.stringify(payload.properties) : null,
          JSON.stringify(payload.related),
          JSON.stringify(payload.translations),
          id,
        )
        .run();
      return json({ id, ...payload });
    }
    if (request.method === "DELETE") {
      await env.DB.prepare(
        "DELETE FROM content_entries WHERE id = ?",
      )
        .bind(id)
        .run();
      return json({ deleted: true });
    }
  }
  return error("Method not allowed", 405, { allow: "GET,POST,PUT,DELETE" });
}

export async function handleAdminApi(
  request: Request,
  env: AdminApiEnvironment,
  authorize: AdminAuthorizer,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith(ADMIN_API_PREFIX)) return null;
  // Email-code authentication and sign-out routes are handled by the
  // authentication module before this data API is reached.
  if (url.pathname.startsWith(`${ADMIN_API_PREFIX}auth/`)) return null;

  const authorization = await authorize(request, env);
  if (!authorization.ok) return authorization.response;
  if (!env.DB) return error("Admin data service is temporarily unavailable", 503);

  try {
    const externalLinkResponse = await handleAdminExternalLinkApi(
      request,
      env,
      authorization.admin,
      authorization.admin.subject === "key-admin",
    );
    if (externalLinkResponse) return externalLinkResponse;

    const contentResponse = await handleAdminContentApi(
      request,
      env,
      authorization.admin,
      authorization.admin.subject === "key-admin",
    );
    if (contentResponse) return contentResponse;

    if (url.pathname === "/api/admin/dashboard") {
      if (request.method !== "GET") return error("Method not allowed", 405, { allow: "GET" });
      const parsedDays = Number(url.searchParams.get("days") ?? 30);
      const days = ALLOWED_DAYS.has(parsedDays) ? parsedDays : 30;
      return await dashboardResponse(
        env.DB,
        authorization.admin,
        days,
        typeof env.ANALYTICS_IP_ENCRYPTION_KEY === "string"
          ? env.ANALYTICS_IP_ENCRYPTION_KEY
          : undefined,
      );
    }

    if (url.pathname === "/api/admin/reports") {
      return await handleAdminReportsList(request, env.DB, authorization.admin);
    }

    const reportMatch = url.pathname.match(REPORT_DETAIL_PATTERN);
    if (reportMatch) {
      return await reportDetailResponse(
        request,
        env,
        env.DB,
        authorization.admin,
        reportMatch[1],
      );
    }

    // ── 内容全量导出（POST /api/admin/content/export，Key Auth 专有）──
    if (
      url.pathname === "/api/admin/content/export" &&
      request.method === "POST"
    ) {
      if (authorization.admin.subject !== "key-admin") {
        return error("Unauthorized", 401);
      }
      const section = url.searchParams.get("section") || undefined;
      const entries = section
        ? contentRegistry.filter((e) => e.section === section)
        : [...contentRegistry];
      let inserted = 0;
      for (const entry of entries) {
        const id = crypto.randomUUID();
        await env.DB.prepare(
          `INSERT INTO content_entries
            (id, section, slug, schema_type, published_at, updated_at, reading_minutes,
             publication_json, sources_json, hero_image_json, primary_action_json,
             properties_json, related_json, translations_json)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
          .bind(
            id,
            entry.section,
            entry.slug,
            entry.schemaType,
            entry.publishedAt,
            entry.updatedAt,
            entry.readingMinutes,
            JSON.stringify(entry.publication),
            entry.sources ? JSON.stringify(entry.sources) : null,
            entry.heroImage ? JSON.stringify(entry.heroImage) : null,
            entry.primaryAction ? JSON.stringify(entry.primaryAction) : null,
            entry.properties ? JSON.stringify(entry.properties) : null,
            JSON.stringify(entry.related),
            JSON.stringify(entry.translations),
          )
          .run();
        inserted++;
      }
      return json({ total: entries.length, inserted });
    }

    return error("Not found", 404);
  } catch {
    return error("Admin data service is temporarily unavailable", 503);
  }
}
