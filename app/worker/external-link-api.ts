import {
  DEFAULT_EXTERNAL_LINK_SCALE_PERCENT,
  decodeHtmlAttribute,
  externalLinkScalePercentFromValue,
  externalLinkRecordFromRow,
  isExternalLinkScalePercent,
  safeExternalHttpsUrl,
} from "../app/external-link-values";

type ExternalLinkDatabaseResult<T = Record<string, unknown>> = {
  success: boolean;
  results?: T[];
  meta?: { changes?: number };
};

type ExternalLinkDatabaseStatement = {
  bind(...values: unknown[]): ExternalLinkDatabaseStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<ExternalLinkDatabaseResult<T>>;
  run(): Promise<ExternalLinkDatabaseResult>;
};

export type ExternalLinkDatabase = {
  prepare(query: string): ExternalLinkDatabaseStatement;
};

export type ExternalLinkEnvironment = {
  DB?: ExternalLinkDatabase;
  SITE_URL?: string;
  [key: string]: unknown;
};

export type ExternalLinkAdmin = {
  email: string;
  displayName: string;
};

const PUBLIC_PATH = "/api/external-links";
const ADMIN_PATH = "/api/admin/external-links";
const ADMIN_DETAIL_PATTERN =
  /^\/api\/admin\/external-links\/([0-9a-f-]{36})$/u;
const MAX_REQUEST_BYTES = 8_192;
const MAX_CODE_LENGTH = 4_096;

type ParsedExternalLink = {
  href: string;
  badgeType: "image" | "text";
  imageSrc: string | null;
  alt: string;
  height: number;
};

export type ExternalLinkSettings = {
  scalePercent: number;
};

function configuredOrigin(request: Request, env: ExternalLinkEnvironment) {
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

function hasSameOrigin(request: Request, env: ExternalLinkEnvironment) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    if (
      new URL(origin).origin !== origin ||
      origin !== configuredOrigin(request, env)
    ) {
      return false;
    }
  } catch {
    return false;
  }
  const fetchSite = request.headers.get("sec-fetch-site");
  return !fetchSite || fetchSite === "same-origin";
}

function json(
  value: unknown,
  status = 200,
  headers: HeadersInit = {},
) {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("content-type", "application/json; charset=utf-8");
  responseHeaders.set("x-content-type-options", "nosniff");
  return new Response(JSON.stringify(value), {
    status,
    headers: responseHeaders,
  });
}

function adminJson(value: unknown, status = 200, headers: HeadersInit = {}) {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("cache-control", "private, no-store");
  responseHeaders.set("cdn-cache-control", "no-store");
  responseHeaders.set("cross-origin-resource-policy", "same-origin");
  responseHeaders.set("referrer-policy", "no-referrer");
  responseHeaders.set("x-robots-tag", "noindex, nofollow, noarchive, nosnippet");
  return json(value, status, responseHeaders);
}

function attributes(source: string) {
  const parsed = new Map<string, string>();
  const pattern =
    /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/gu;
  for (const match of source.matchAll(pattern)) {
    parsed.set(match[1].toLowerCase(), match[2] ?? match[3] ?? "");
  }
  return parsed;
}

export function parseExternalLinkCode(value: unknown): ParsedExternalLink {
  if (typeof value !== "string") throw new Error("请输入一行外链 HTML。");
  const code = value.trim();
  if (!code || code.length > MAX_CODE_LENGTH || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(code)) {
    throw new Error("外链代码长度或内容无效。");
  }
  const imageMatch = code.match(
    /^<a\b([^>]*)>\s*<img\b([^>]*)\/?>\s*<\/a>$/iu,
  );
  if (imageMatch) {
    const anchor = attributes(imageMatch[1]);
    const image = attributes(imageMatch[2]);
    const href = safeExternalHttpsUrl(anchor.get("href") ?? "");
    const imageSrc = safeExternalHttpsUrl(image.get("src") ?? "");
    const alt = decodeHtmlAttribute(image.get("alt") ?? "")
      .trim()
      .replace(/\s+/gu, " ");
    const heightValue = image.get("height");
    const styleHeight = (image.get("style") ?? "").match(
      /(?:^|;)\s*height\s*:\s*(\d+)px\s*(?:;|$)/iu,
    )?.[1];
    const height = Number(heightValue ?? styleHeight ?? 54);

    if (!href) throw new Error("外链地址必须是有效的 HTTPS URL。");
    if (!imageSrc) throw new Error("徽章图片必须是有效的 HTTPS URL。");
    if (!alt || [...alt].length > 120) {
      throw new Error("图片徽章必须包含 1–120 个字符的 alt 说明。");
    }
    if (!Number.isInteger(height) || height < 20 || height > 120) {
      throw new Error("徽章高度必须是 20–120 的整数。");
    }

    return { href, badgeType: "image", imageSrc, alt, height };
  }

  const textMatch = code.match(/^<a\b([^>]*)>\s*([^<>]+?)\s*<\/a>$/iu);
  if (!textMatch) {
    throw new Error(
      "只支持 <a><img></a> 图片徽章或 <a>文字</a> 纯文字徽章格式。",
    );
  }
  const anchor = attributes(textMatch[1]);
  const href = safeExternalHttpsUrl(anchor.get("href") ?? "");
  const alt = decodeHtmlAttribute(textMatch[2])
    .trim()
    .replace(/\s+/gu, " ");
  if (!href) throw new Error("外链地址必须是有效的 HTTPS URL。");
  if (!alt || [...alt].length > 120) {
    throw new Error("文字徽章必须包含 1–120 个字符。");
  }
  return {
    href,
    badgeType: "text",
    imageSrc: null,
    alt,
    height: 36,
  };
}

export function parseCustomExternalLink(
  value: Record<string, unknown>,
): ParsedExternalLink {
  const href = safeExternalHttpsUrl(String(value.href ?? ""));
  const alt = decodeHtmlAttribute(String(value.alt ?? ""))
    .trim()
    .replace(/\s+/gu, " ");
  const rawImageSrc = String(value.imageSrc ?? "").trim();
  const imageSrc = rawImageSrc
    ? safeExternalHttpsUrl(rawImageSrc)
    : null;
  const badgeType = imageSrc ? "image" : "text";
  const height = Number(
    value.height ?? (badgeType === "image" ? 54 : 36),
  );
  if (!href) throw new Error("跳转网址必须是有效的 HTTPS URL。");
  if (!alt || [...alt].length > 120) {
    throw new Error("徽章名称必须包含 1–120 个字符。");
  }
  if (rawImageSrc && !imageSrc) {
    throw new Error("徽章图片网址必须是有效的 HTTPS URL。");
  }
  if (!Number.isInteger(height) || height < 20 || height > 120) {
    throw new Error("徽章高度必须是 20–120 的整数。");
  }
  return { href, badgeType, imageSrc, alt, height };
}

async function readJson(request: Request) {
  const declaredLength = request.headers.get("content-length");
  if (
    declaredLength &&
    (!/^\d+$/u.test(declaredLength) ||
      Number(declaredLength) > MAX_REQUEST_BYTES)
  ) {
    throw new Error("请求内容过长。");
  }
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_REQUEST_BYTES) {
    throw new Error("请求内容过长。");
  }
  return JSON.parse(text) as unknown;
}

export async function readExternalLinksFromDatabase(
  database: ExternalLinkDatabase,
) {
  const result = await database
    .prepare(
      `select id, href, badge_type, image_src, alt, height, created_at
      from external_links
      where active = 1
      order by created_at asc`,
    )
    .all<Record<string, unknown>>();
  if (!result.success) throw new Error("Database query failed");
  return (result.results ?? [])
    .map(externalLinkRecordFromRow)
    .filter((link) => link !== null);
}

export async function readExternalLinkSettingsFromDatabase(
  database: ExternalLinkDatabase,
): Promise<ExternalLinkSettings> {
  try {
    const row = await database
      .prepare(
        `select scale_percent
        from external_link_settings
        where scope = 'footer'
        limit 1`,
      )
      .first<Record<string, unknown>>();
    return {
      scalePercent: externalLinkScalePercentFromValue(
        row?.scale_percent,
      ),
    };
  } catch {
    return { scalePercent: DEFAULT_EXTERNAL_LINK_SCALE_PERCENT };
  }
}

export async function handleExternalLinkApi(
  request: Request,
  env: ExternalLinkEnvironment,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== PUBLIC_PATH) return null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return json(
      { error: "Method not allowed" },
      405,
      { allow: "GET, HEAD", "cache-control": "no-store" },
    );
  }
  if (!env.DB) {
    return json(
      {
        links: [],
        settings: {
          scalePercent: DEFAULT_EXTERNAL_LINK_SCALE_PERCENT,
        },
      },
      200,
      { "cache-control": "public, max-age=30" },
    );
  }

  try {
    const [links, settings] = await Promise.all([
      readExternalLinksFromDatabase(env.DB),
      readExternalLinkSettingsFromDatabase(env.DB),
    ]);
    const body = JSON.stringify({
      links,
      settings,
    });
    const headers = {
      "cache-control": "public, max-age=60, stale-while-revalidate=300",
      "content-type": "application/json; charset=utf-8",
      "x-content-type-options": "nosniff",
    };
    return new Response(request.method === "HEAD" ? null : body, { headers });
  } catch {
    return json(
      {
        links: [],
        settings: {
          scalePercent: DEFAULT_EXTERNAL_LINK_SCALE_PERCENT,
        },
      },
      200,
      { "cache-control": "public, max-age=30" },
    );
  }
}

export async function handleAdminExternalLinkApi(
  request: Request,
  env: ExternalLinkEnvironment,
  admin: ExternalLinkAdmin,
  isKeyAuth = false,
): Promise<Response | null> {
  const url = new URL(request.url);
  const detailMatch = url.pathname.match(ADMIN_DETAIL_PATTERN);
  if (url.pathname !== ADMIN_PATH && !detailMatch) return null;
  if (!env.DB) {
    return adminJson({ error: "外链资料库暂时无法使用。" }, 503);
  }

  if (url.pathname === ADMIN_PATH && request.method === "GET") {
    try {
      const [links, settings] = await Promise.all([
        readExternalLinksFromDatabase(env.DB),
        readExternalLinkSettingsFromDatabase(env.DB),
      ]);
      return adminJson({
        links,
        settings,
      });
    } catch {
      return adminJson({ error: "外链资料暂时无法读取。" }, 503);
    }
  }

  if (url.pathname === ADMIN_PATH && request.method === "PATCH") {
    if (!isKeyAuth && !hasSameOrigin(request, env)) {
      return adminJson({ error: "请求来源无效。" }, 403);
    }
    if (
      request.headers
        .get("content-type")
        ?.split(";", 1)[0]
        .trim()
        .toLowerCase() !== "application/json"
    ) {
      return adminJson({ error: "请使用 JSON 格式送出。" }, 415);
    }

    let scalePercent: number;
    try {
      const payload = await readJson(request);
      if (
        !payload ||
        typeof payload !== "object" ||
        Array.isArray(payload) ||
        Object.keys(payload).length !== 1 ||
        !Object.hasOwn(payload, "scalePercent") ||
        !isExternalLinkScalePercent(
          (payload as Record<string, unknown>).scalePercent,
        )
      ) {
        throw new Error("徽章比例必须是 40–100 的整数。");
      }
      scalePercent = (payload as { scalePercent: number }).scalePercent;
    } catch (caught) {
      return adminJson(
        {
          error:
            caught instanceof Error
              ? caught.message
              : "徽章比例格式无效。",
        },
        400,
      );
    }

    try {
      const result = await env.DB
        .prepare(
          `insert into external_link_settings
            (scope, scale_percent, updated_at, updated_by)
          values ('footer', ?, ?, ?)
          on conflict(scope) do update set
            scale_percent = excluded.scale_percent,
            updated_at = excluded.updated_at,
            updated_by = excluded.updated_by`,
        )
        .bind(scalePercent, Date.now(), admin.email)
        .run();
      if (!result.success) throw new Error("Settings update failed");
      return adminJson({ settings: { scalePercent } });
    } catch {
      return adminJson({ error: "徽章比例未能保存，请稍后再试。" }, 503);
    }
  }

  if (url.pathname === ADMIN_PATH && request.method === "POST") {
    if (!isKeyAuth && !hasSameOrigin(request, env)) {
      return adminJson({ error: "请求来源无效。" }, 403);
    }
    if (
      request.headers
        .get("content-type")
        ?.split(";", 1)[0]
        .trim()
        .toLowerCase() !== "application/json"
    ) {
      return adminJson({ error: "请使用 JSON 格式送出。" }, 415);
    }

    let link: ParsedExternalLink;
    try {
      const payload = await readJson(request);
      if (
        !payload ||
        typeof payload !== "object" ||
        Array.isArray(payload)
      ) {
        throw new Error("外链内容格式无效。");
      }
      const fields = payload as Record<string, unknown>;
      if (Object.hasOwn(fields, "code")) {
        if (Object.keys(fields).some((key) => key !== "code")) {
          throw new Error("代码模式只能提交一行徽章代码。");
        }
        link = parseExternalLinkCode(fields.code);
      } else {
        const allowedFields = new Set([
          "href",
          "imageSrc",
          "alt",
          "height",
        ]);
        if (Object.keys(fields).some((key) => !allowedFields.has(key))) {
          throw new Error("自定义徽章字段无效。");
        }
        link = parseCustomExternalLink(fields);
      }
    } catch (caught) {
      return adminJson(
        {
          error:
            caught instanceof Error
              ? caught.message
              : "外链代码格式无效。",
        },
        400,
      );
    }

    try {
      const existing = await env.DB
        .prepare(
          "select id, created_at from external_links where href = ? limit 1",
        )
        .bind(link.href)
        .first<Record<string, unknown>>();
      if (existing) {
        const id = String(existing.id ?? "");
        const createdAt = Number(existing.created_at);
        if (
          !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/iu.test(
            id,
          ) ||
          !Number.isSafeInteger(createdAt) ||
          createdAt < 1
        ) {
          throw new Error("Invalid existing external link");
        }
        const result = await env.DB
          .prepare(
            `update external_links
            set badge_type = ?, image_src = ?, alt = ?, height = ?,
              active = 1, created_by = ?
            where id = ?`,
          )
          .bind(
            link.badgeType,
            link.imageSrc,
            link.alt,
            link.height,
            admin.email,
            id,
          )
          .run();
        if (
          !result.success ||
          Number(result.meta?.changes ?? 0) !== 1
        ) {
          throw new Error("Update failed");
        }
        return adminJson({
          link: {
            id,
            ...link,
            createdAt,
          },
          operation: "updated",
        });
      }

      const id = crypto.randomUUID();
      const createdAt = Date.now();
      const result = await env.DB
        .prepare(
          `insert into external_links
            (id, href, badge_type, image_src, alt, height, active, created_at,
              created_by)
          values (?, ?, ?, ?, ?, ?, 1, ?, ?)`,
        )
        .bind(
          id,
          link.href,
          link.badgeType,
          link.imageSrc,
          link.alt,
          link.height,
          createdAt,
          admin.email,
        )
        .run();
      if (!result.success) throw new Error("Insert failed");
      return adminJson(
        {
          link: {
            id,
            ...link,
            createdAt,
          },
          operation: "created",
        },
        201,
      );
    } catch {
      return adminJson({ error: "外链未能保存，请稍后再试。" }, 503);
    }
  }

  if (detailMatch && request.method === "DELETE") {
    if (!isKeyAuth && !hasSameOrigin(request, env)) {
      return adminJson({ error: "请求来源无效。" }, 403);
    }
    try {
      const result = await env.DB
        .prepare("delete from external_links where id = ?")
        .bind(detailMatch[1])
        .run();
      const changes = Number(result.meta?.changes ?? 0);
      if (!result.success) throw new Error("Delete failed");
      if (changes !== 1) return adminJson({ error: "找不到这个外链。" }, 404);
      return adminJson({ deleted: true });
    } catch {
      return adminJson({ error: "外链未能删除，请稍后再试。" }, 503);
    }
  }

  return adminJson(
    { error: "Method not allowed" },
    405,
    {
      allow: detailMatch ? "DELETE" : "GET, POST, PATCH",
    },
  );
}
