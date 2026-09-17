/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import mapSeoData from "../app/map-seo-data.json";
import {
  createIndexableMapRouteRegistry,
} from "../app/map-seo-publication";
import { codeRegistryUpdatedAt } from "../app/code-registry";
import {
  getContentEntries,
  getIndexableContentLocales,
} from "../app/content-registry";
import {
  getContentCanonicalRedirectPath,
  getContentCanonicalSuffix,
} from "../app/content-routes";
import { createSitemapEntryRegistry } from "../app/sitemap-publication.mjs";
import { getLiveTools } from "../app/tool-registry";
import {
  TRUSTED_SITE_ORIGIN_HEADER,
  validateSiteOrigin,
} from "../app/site-origin";
import mapManifest from "../public/map-assets/manifest.json";
import {
  handleMapReleaseAdmin,
  isMapAssetsBootstrapFallbackEnabled,
  type MapReleaseObject,
  type MapReleaseBucket,
} from "./map-release-admin";
import {
  handleItemCatalogApi,
  type ItemCatalogEnvironment,
} from "./item-catalog-api";
import {
  handleReportApi,
  type ReportApiEnvironment,
} from "./report-api";
import {
  handleEventApi,
  type EventApiEnvironment,
} from "./event-api";
import {
  handleJourneyEventApi,
  type JourneyEventEnvironment,
} from "./journey-event-api";
import {
  authorizeAdminRequest,
  handleAdminAuthRequest,
  requireAdminPage,
  withAdminSecurityHeaders,
  type AdminAuthEnvironment,
} from "./admin-auth";
import {
  handleAdminApi,
  type AdminApiEnvironment,
} from "./admin-api";
import {
  handleExternalLinkApi,
  readExternalLinkSettingsFromDatabase,
  readExternalLinksFromDatabase,
  type ExternalLinkDatabase,
  type ExternalLinkEnvironment,
} from "./external-link-api";
import {
  encodeExternalLinkRecords,
  TRUSTED_EXTERNAL_LINK_SCALE_HEADER,
  TRUSTED_EXTERNAL_LINKS_HEADER,
} from "../app/external-link-values";
import {
  TRUSTED_CONTENT_OVERRIDES_HEADER,
  type ContentOverrideRow,
} from "../app/content-override-values";
import { preferredSiteLocale } from "../app/locale-preference";
import {
  siteLocaleConfig,
  siteLocales,
  type SiteLocale,
} from "../app/site-config";

interface AssetFetcher {
  fetch(request: Request): Promise<Response>;
}

interface Env extends
  ItemCatalogEnvironment,
  ReportApiEnvironment,
  EventApiEnvironment,
  AdminAuthEnvironment {
  ASSETS: AssetFetcher;
  MAP_ASSETS?: MapReleaseBucket;
  MAP_RELEASE_BOOTSTRAP_RETIRED?: string;
  MAP_RELEASE_BOOTSTRAP_TOKEN?: string;
  MAP_RELEASE_BOOTSTRAP_VERSION?: string;
  MAP_RELEASE_UPLOAD_TOKEN?: string;
  MAP_ORIGIN?: string;
  SITE_URL?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type ContentOverrideDatabase = {
  prepare(query: string): {
    bind(...values: unknown[]): { all(): Promise<{ results: unknown[] }> };
    all(): Promise<{ results: unknown[] }>;
  };
};

async function readContentFromDatabase(
  db: ContentOverrideDatabase,
): Promise<readonly ContentOverrideRow[]> {
  const { results } = await db
    .prepare(
      `SELECT section, slug, schema_type, published_at, updated_at, reading_minutes,
              publication_json, sources_json, hero_image_json, primary_action_json,
              properties_json, related_json, translations_json
       FROM content_entries`,
    )
    .all();
  return results as ContentOverrideRow[];
}

const localeSlugs = siteLocales;
const localeCodes = Object.fromEntries(
  localeSlugs.map((locale) => [locale, siteLocaleConfig[locale].code]),
) as Record<SiteLocale, string>;
const localeSlugPattern = localeSlugs.join("|");
const localizedItemDetailPattern = new RegExp(
  `^/(?:${localeSlugPattern})/database/item/[1-9]\\d*/$`,
  "u",
);
const localizedMapPoiPattern = new RegExp(
  `^/(?:${localeSlugPattern})/tools/map/[a-z0-9-]+/poi/[a-z0-9-]+/$`,
  "u",
);
const localizedSitemapPattern = new RegExp(
  `^/sitemaps/(pages|content|maps)-(${localeSlugPattern})\\.xml/?$`,
  "u",
);
const PRODUCTION_SITE_ORIGIN = "https://www.aion2kina.com";
const PRODUCTION_SITE_HOSTS = new Set(["aion2kina.com", "www.aion2kina.com"]);
const VERSION_KEY_PATTERN = /^sha256-[0-9a-f]{64}$/u;
const VERSIONED_MAP_ASSET_PATH =
  /^\/releases\/(sha256-[0-9a-f]{64})\/(icons|maps)\/(.+)$/u;
const VERSIONED_MAP_BUNDLE_PATH =
  /^\/bundles\/(sha256-[0-9a-f]{64})\/(zh-Hant|en|ko)\/[a-z0-9-]+\.json$/u;
const LEGACY_MAP_ASSET_PATH = /^\/(icons|maps)\/(.+)$/u;
const STATIC_ASSET_PATH =
  /\.(?:avif|css|gif|ico|jpe?g|js|json|map|mjs|otf|png|svg|ttf|txt|webmanifest|webp|woff2?|xml)$/iu;
const PUBLIC_HTML_PERMISSIONS_POLICY =
  "camera=(), microphone=(), geolocation=(), payment=(), usb=()";
const PUBLIC_HTML_HSTS =
  "max-age=31536000; includeSubDomains";

function isStaticAssetPath(pathname: string) {
  const normalizedPathname =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  const finalSegment = normalizedPathname.slice(
    normalizedPathname.lastIndexOf("/") + 1,
  );
  return (
    normalizedPathname.startsWith("/assets/") ||
    STATIC_ASSET_PATH.test(finalSegment)
  );
}

function isLocalizedDocumentPath(pathname: string) {
  return localeSlugs.some((locale) =>
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function canonicalSiteOrigin(url: URL, configuredSiteUrl: string | undefined) {
  // Skip canonical redirect in dev mode (HTTP protocol)
  if (url.protocol === "http:") return null;

  const configuredOrigin = validateSiteOrigin(configuredSiteUrl);
  if (configuredOrigin) return configuredOrigin;

  return PRODUCTION_SITE_HOSTS.has(url.hostname.toLowerCase())
    ? PRODUCTION_SITE_ORIGIN
    : null;
}

function permanentCanonicalRedirect(url: URL, primaryOrigin: string | null) {
  if (!primaryOrigin || url.origin === primaryOrigin) return null;

  const location = new URL(`${url.pathname}${url.search}`, primaryOrigin);
  return new Response(null, {
    status: 308,
    headers: {
      location: location.toString(),
      "cache-control": "public, max-age=3600",
    },
  });
}

function htmlCdnCacheControl(pathname: string) {
  const stableDataDetail =
    localizedItemDetailPattern.test(pathname) ||
    localizedMapPoiPattern.test(pathname);
  return stableDataDetail
    ? "public, s-maxage=86400, stale-while-revalidate=604800"
    : "public, s-maxage=600, stale-while-revalidate=86400";
}

function withPublicHtmlSecurityHeaders(response: Response, requestUrl: URL) {
  const contentType = response.headers.get("content-type")?.toLowerCase();
  if (!contentType?.includes("text/html")) return response;

  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-frame-options", "DENY");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("permissions-policy", PUBLIC_HTML_PERMISSIONS_POLICY);
  if (requestUrl.protocol === "https:") {
    headers.set("strict-transport-security", PUBLIC_HTML_HSTS);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function withoutDocumentTrailingSlash(url: URL) {
  if (url.pathname.length <= 1 || !url.pathname.endsWith("/")) return url;
  const internalUrl = new URL(url);
  internalUrl.pathname = internalUrl.pathname.slice(0, -1);
  return internalUrl;
}

function isSafeMapAssetRelativePath(value: string) {
  return (
    value.length > 0 &&
    /^[A-Za-z0-9._/-]+$/u.test(value) &&
    !value.startsWith("/") &&
    !value.endsWith("/") &&
    !value.includes("\\") &&
    !/%(?:2e|2f|5c)/iu.test(value) &&
    !value.split("/").some((segment) => !segment || segment === "." || segment === "..")
  );
}

function isAllowedMapRuntimeAssetPath(value: string) {
  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /%(?:2e|2f|5c)/iu.test(value) ||
    value.split("/").some((segment) => segment === "." || segment === "..")
  ) {
    return false;
  }
  if (value === "/manifest.json") return true;
  const versionedBundle = value.match(VERSIONED_MAP_BUNDLE_PATH);
  if (versionedBundle) return versionedBundle[1] === mapManifest.versionKey;
  const versionedAsset = value.match(VERSIONED_MAP_ASSET_PATH);
  if (versionedAsset) return isSafeMapAssetRelativePath(versionedAsset[3]);
  const legacyAsset = value.match(LEGACY_MAP_ASSET_PATH);
  return Boolean(legacyAsset && isSafeMapAssetRelativePath(legacyAsset[2]));
}

function mapUpstreamUrl(mapOrigin: string, assetPath: string, search: string) {
  try {
    const configuredOrigin = new URL(mapOrigin);
    if (
      configuredOrigin.protocol !== "https:" ||
      configuredOrigin.username ||
      configuredOrigin.password
    ) {
      return null;
    }
    const upstreamUrl = new URL(configuredOrigin.origin);
    upstreamUrl.pathname = assetPath;
    upstreamUrl.search = search;
    return upstreamUrl.origin === configuredOrigin.origin ? upstreamUrl : null;
  } catch {
    return null;
  }
}

function mapAssetContentType(key: string) {
  if (key.endsWith(".json")) return "application/json; charset=utf-8";
  if (key.endsWith(".webp")) return "image/webp";
  if (key.endsWith(".png")) return "image/png";
  if (key.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

function mapAssetObjectResponse(
  object: MapReleaseObject,
  key: string,
  method: string,
  cacheControl: string,
) {
  const headers = new Headers();
  object.writeHttpMetadata?.(headers);
  if (!headers.has("content-type")) headers.set("content-type", mapAssetContentType(key));
  if (object.httpEtag) headers.set("etag", object.httpEtag);
  headers.set("cache-control", cacheControl);
  headers.set("cross-origin-resource-policy", "same-origin");
  headers.set("x-content-type-options", "nosniff");
  return new Response(method === "HEAD" ? null : object.body, { headers });
}

async function mapAssetFromR2(
  bucket: MapReleaseBucket,
  assetPath: string,
  method: string,
  cacheControl: string,
) {
  if (assetPath === "/manifest.json") {
    let pointerObject: MapReleaseObject | null;
    try {
      pointerObject = await bucket.get("channels/stable.json");
    } catch {
      return new Response("Stable map release is unavailable", {
        status: 503,
        headers: { "cache-control": "no-store", "x-atlas-r2-state": "read-error" },
      });
    }
    if (!pointerObject) {
      return new Response("Stable map release is unavailable", {
        status: 503,
        headers: { "cache-control": "no-store", "x-atlas-r2-state": "missing-pointer" },
      });
    }
    let pointer: { versionKey?: unknown; manifestKey?: unknown };
    try {
      pointer = JSON.parse(await pointerObject.text()) as typeof pointer;
    } catch {
      return new Response("Stable map release is unavailable", {
        status: 503,
        headers: { "cache-control": "no-store", "x-atlas-r2-state": "invalid-pointer" },
      });
    }
    if (
      typeof pointer.versionKey !== "string" ||
      !VERSION_KEY_PATTERN.test(pointer.versionKey) ||
      pointer.manifestKey !== `releases/${pointer.versionKey}/manifest.json`
    ) {
      return new Response("Stable map release is unavailable", {
        status: 503,
        headers: { "cache-control": "no-store", "x-atlas-r2-state": "invalid-pointer" },
      });
    }
    try {
      const manifestObject = await bucket.get(pointer.manifestKey);
      if (!manifestObject) {
        return new Response("Stable map release is unavailable", {
          status: 503,
          headers: { "cache-control": "no-store", "x-atlas-r2-state": "missing-manifest" },
        });
      }
      return mapAssetObjectResponse(
        manifestObject,
        pointer.manifestKey,
        method,
        cacheControl,
      );
    } catch {
      return new Response("Stable map release is unavailable", {
        status: 503,
        headers: { "cache-control": "no-store", "x-atlas-r2-state": "read-error" },
      });
    }
  }

  if (!assetPath.startsWith("/bundles/") && !assetPath.startsWith("/releases/")) {
    return null;
  }
  const key = assetPath.slice(1);
  try {
    const object = await bucket.get(key);
    return object ? mapAssetObjectResponse(object, key, method, cacheControl) : null;
  } catch {
    return null;
  }
}

function localMapAssetPath(assetPath: string) {
  if (!assetPath.startsWith("/releases/")) return `/map-assets${assetPath}`;
  const versionedAsset = assetPath.match(VERSIONED_MAP_ASSET_PATH);
  if (
    !versionedAsset ||
    versionedAsset[1] !== mapManifest.versionKey ||
    !isSafeMapAssetRelativePath(versionedAsset[3])
  ) {
    return null;
  }
  return `/map-assets/${versionedAsset[2]}/${versionedAsset[3]}`;
}

function xmlEscape(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  })[character] ?? character);
}

type SitemapKind = "pages" | "content" | "maps";
type SitemapEntry = { suffix: string; lastModified?: string };

const sitemapKinds = ["pages", "content", "maps"] as const satisfies readonly SitemapKind[];
const pageSitemapEntries: readonly SitemapEntry[] = [
  { suffix: "/", lastModified: "2026-07-25" },
  { suffix: "/guides/", lastModified: "2026-07-23" },
  { suffix: "/classes/", lastModified: "2026-07-23" },
  { suffix: "/database/", lastModified: "2026-07-25" },
  { suffix: "/tools/", lastModified: "2026-07-23" },
  { suffix: "/codes/", lastModified: codeRegistryUpdatedAt },
  { suffix: "/news/", lastModified: "2026-07-23" },
  { suffix: "/about/", lastModified: "2026-07-24" },
  { suffix: "/contact/", lastModified: "2026-07-24" },
  { suffix: "/privacy/", lastModified: "2026-07-24" },
  { suffix: "/terms/", lastModified: "2026-07-24" },
];
const indexableContentEntries = getContentEntries();
const contentSitemapEntries: readonly SitemapEntry[] = indexableContentEntries.map((entry) => ({
  suffix: getContentCanonicalSuffix(entry),
  lastModified: entry.updatedAt,
}));
const contentEntryBySuffix = new Map(
  indexableContentEntries.map((entry) => [
    getContentCanonicalSuffix(entry),
    entry,
  ]),
);
const contentSitemapLocales = localeSlugs.filter((locale) =>
  indexableContentEntries.some((entry) =>
    getIndexableContentLocales(entry).includes(locale),
  ),
);

// ── 运行时合并：编译期 contentRegistry + DB 内容（globalThis.__dbContent）──
function getMergedContentData() {
  const db = (globalThis as any).__dbContent as ContentEntry[] | undefined;
  if (!db || db.length === 0) {
    return {
      entries: indexableContentEntries,
      bySuffix: contentEntryBySuffix,
      locales: contentSitemapLocales,
      sitemapEntries: contentSitemapEntries,
    };
  }
  const bySlug = new Map<string, ContentEntry>();
  for (const entry of indexableContentEntries) bySlug.set(entry.slug, entry);
  for (const entry of db) bySlug.set(entry.slug, entry);
  const merged = Array.from(bySlug.values()).sort(
    (a, b) =>
      b.updatedAt.localeCompare(a.updatedAt) ||
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.slug.localeCompare(b.slug),
  );
  const newBySuffix = new Map(
    merged.map((e) => [getContentCanonicalSuffix(e), e]),
  );
  const newLocales = localeSlugs.filter((locale) =>
    merged.some((e) => getIndexableContentLocales(e).includes(locale)),
  );
  const newSitemapEntries: readonly SitemapEntry[] = merged.map((entry) => ({
    suffix: getContentCanonicalSuffix(entry),
    lastModified: entry.updatedAt,
  }));
  return {
    entries: merged,
    bySuffix: newBySuffix,
    locales: newLocales,
    sitemapEntries: newSitemapEntries,
  };
}
const mapDataLastModified = mapSeoData.source.generatedAt.slice(0, 10);
const indexableMapRoutes = createIndexableMapRouteRegistry(mapSeoData.maps);
const mapLastModified = indexableMapRoutes.reduce(
  (latest, route) => route.updatedAt > latest ? route.updatedAt : latest,
  mapDataLastModified,
);
const mapSitemapEntries: readonly SitemapEntry[] = [
  { suffix: "/tools/map/", lastModified: mapDataLastModified },
  ...indexableMapRoutes.map(({ suffix, updatedAt }) => ({
    suffix,
    lastModified: updatedAt,
  })),
];

const sitemapEntriesByKind: Record<SitemapKind, readonly SitemapEntry[]> = createSitemapEntryRegistry({
  pages: pageSitemapEntries,
  content: contentSitemapEntries,
  maps: mapSitemapEntries,
  liveTools: getLiveTools(),
});

function sitemapLocalesForKind(kind: SitemapKind) {
  return kind === "content" ? getMergedContentData().locales : localeSlugs;
}

function languageLinks(siteUrl: string, suffix: string, kind: SitemapKind) {
  const contentEntry = kind === "content"
    ? getMergedContentData().bySuffix.get(suffix)
    : undefined;
  const alternateLocales = contentEntry
    ? getIndexableContentLocales(contentEntry)
    : sitemapLocalesForKind(kind);
  const alternates = alternateLocales.map((locale) =>
    `<xhtml:link rel="alternate" hreflang="${localeCodes[locale]}" href="${xmlEscape(`${siteUrl}/${locale}${suffix}`)}"/>`,
  ).join("");
  const xDefaultHref = `${siteUrl}/en${suffix}`;
  return `${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(xDefaultHref)}"/>`;
}

function sitemapIndexXml(siteUrl: string) {
  const pagesLastModified = sitemapEntriesByKind.pages.reduce(
    (latest, entry) =>
      entry.lastModified && entry.lastModified > latest
        ? entry.lastModified
        : latest,
    "",
  );
  const contentLastModified = getMergedContentData().entries.reduce(
    (latest, entry) => entry.updatedAt > latest ? entry.updatedAt : latest,
    "",
  );
  const lastModifiedByKind: Partial<Record<SitemapKind, string>> = {
    pages: pagesLastModified,
    content: contentLastModified,
    maps: mapLastModified,
  };
  const sitemaps = [
    ...sitemapKinds.flatMap((kind) =>
      sitemapLocalesForKind(kind).map(
        (locale) => `${siteUrl}/sitemaps/${kind}-${locale}.xml`,
      ),
    ),
  ];
  const entries = sitemaps.map((location) => {
    const kind = sitemapKinds.find((candidate) => location.includes(`/sitemaps/${candidate}-`));
    const lastModified = kind ? lastModifiedByKind[kind] : undefined;
    return `<sitemap><loc>${xmlEscape(location)}</loc>${lastModified ? `<lastmod>${lastModified}</lastmod>` : ""}</sitemap>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</sitemapindex>`;
}

function localeSitemapXml(siteUrl: string, locale: (typeof localeSlugs)[number], kind: SitemapKind) {
  if (!sitemapLocalesForKind(kind).includes(locale as never)) return null;
  const entries = kind === "content"
    ? getMergedContentData().sitemapEntries.filter(({ suffix }) => {
        const entry = getMergedContentData().bySuffix.get(suffix);
        return entry
          ? getIndexableContentLocales(entry).includes(locale)
          : false;
      })
    : sitemapEntriesByKind[kind];
  const urls = entries.map(({ suffix, lastModified }) => {
    const path = `/${locale}${suffix}`;
    const lastmod = lastModified ? `<lastmod>${lastModified}</lastmod>` : "";
    return `<url><loc>${xmlEscape(`${siteUrl}${path}`)}</loc>${lastmod}${languageLinks(siteUrl, suffix, kind)}</url>`;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
}

function sitemapDocument(pathname: string, siteUrl: string) {
  if (pathname === "/sitemap.xml" || pathname === "/sitemap.xml/") {
    return sitemapIndexXml(siteUrl);
  }
  const match = pathname.match(localizedSitemapPattern);
  if (!match) return null;
  return localeSitemapXml(
    siteUrl,
    match[2] as (typeof localeSlugs)[number],
    match[1] as SitemapKind,
  );
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env | undefined, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response("ok", { status: 200, headers: { "content-type": "text/plain" } });
    }

    const releaseAdminResponse = await handleMapReleaseAdmin(request, env ?? {});
    if (releaseAdminResponse) return releaseAdminResponse;

    const primaryOrigin = canonicalSiteOrigin(url, env?.SITE_URL);
    const canonicalRedirect = permanentCanonicalRedirect(url, primaryOrigin);
    if (canonicalRedirect) return canonicalRedirect;

    if (request.method === "GET" || request.method === "HEAD") {
      const contentRedirectPath = getContentCanonicalRedirectPath(url.pathname);
      if (contentRedirectPath) {
        return new Response(null, {
          status: 301,
          headers: {
            location: `${contentRedirectPath}${url.search}`,
            "cache-control": "public, max-age=3600",
          },
        });
      }
    }

    const adminAuthResponse = await handleAdminAuthRequest(request, env ?? {});
    if (adminAuthResponse) return adminAuthResponse;

    const adminApiResponse = await handleAdminApi(
      request,
      (env ?? {}) as AdminApiEnvironment,
      async (adminRequest, adminEnv) => {
        const result = await authorizeAdminRequest(
          adminRequest,
          adminEnv as AdminAuthEnvironment,
        );
        if (!result.ok) return result;
        return {
          ok: true as const,
          admin: {
            email: result.user.email,
            displayName: result.user.displayName ?? "KINA Admin",
            subject: result.user.subject,
          },
        };
      },
    );
    if (adminApiResponse) return adminApiResponse;

    if (url.pathname === "/api/admin" || url.pathname === "/api/admin/") {
      return withAdminSecurityHeaders(new Response(
        JSON.stringify({ error: "Not found" }),
        {
          status: 404,
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      ));
    }

    const isAdminDocument =
      url.pathname === "/admin" || url.pathname.startsWith("/admin/");
    const isAdminLoginDocument =
      url.pathname === "/admin/login" || url.pathname === "/admin/login/";
    if (isAdminDocument) {
      if (url.pathname === "/admin") {
        const location = new URL(url);
        location.pathname = "/admin/";
        return withAdminSecurityHeaders(new Response(null, {
          status: 308,
          headers: { location: `${location.pathname}${location.search}` },
        }));
      }
      if (url.pathname === "/admin/login") {
        const location = new URL(url);
        location.pathname = "/admin/login/";
        return withAdminSecurityHeaders(new Response(null, {
          status: 308,
          headers: { location: `${location.pathname}${location.search}` },
        }));
      }
      if (!isAdminLoginDocument) {
        const adminPageGuard = await requireAdminPage(request, env ?? {});
        if (adminPageGuard) return adminPageGuard;
      }
    }

    const reportApiResponse = await handleReportApi(request, env ?? {});
    if (reportApiResponse) return reportApiResponse;

    const externalLinkResponse = await handleExternalLinkApi(
      request,
      (env ?? {}) as ExternalLinkEnvironment,
    );
    if (externalLinkResponse) return externalLinkResponse;

    const journeyEventApiResponse = await handleJourneyEventApi(
      request,
      (env ?? {}) as JourneyEventEnvironment,
    );
    if (journeyEventApiResponse) return journeyEventApiResponse;

    const eventApiResponse = await handleEventApi(request, env ?? {});
    if (eventApiResponse) return eventApiResponse;

    const itemCatalogResponse = await handleItemCatalogApi(request, env ?? {});
    if (itemCatalogResponse) return itemCatalogResponse;

    if (url.pathname === "/api/time" || url.pathname === "/api/time/") {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response(JSON.stringify({ error: "method-not-allowed" }), {
          status: 405,
          headers: {
            allow: "GET, HEAD",
            "cache-control": "private, no-store",
            "content-type": "application/json; charset=utf-8",
            "x-content-type-options": "nosniff",
          },
        });
      }
      const now = Date.now();
      return new Response(
        request.method === "HEAD" ? null : JSON.stringify({ now }),
        {
          headers: {
            "cache-control": "private, no-store",
            "content-type": "application/json; charset=utf-8",
            date: new Date(now).toUTCString(),
            "x-content-type-options": "nosniff",
          },
        },
      );
    }

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ error: "not-found" }), {
        status: 404,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "private, no-store",
          "x-content-type-options": "nosniff",
        },
      });
    }

    if (url.pathname === "/robots.txt" || url.pathname === "/robots.txt/") {
      const siteUrl = primaryOrigin ?? url.origin;
      return new Response(
        `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/admin/\nDisallow: /api/journey-events/\nSitemap: ${siteUrl}/sitemap.xml\n`,
        { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } },
      );
    }

    const sitemap = sitemapDocument(url.pathname, primaryOrigin ?? url.origin);
    if (sitemap) {
      return new Response(sitemap, {
        headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" },
      });
    }

    const isLegacyRootMapAssetRequest = LEGACY_MAP_ASSET_PATH.test(url.pathname);
    if (url.pathname.startsWith("/map-runtime/") || isLegacyRootMapAssetRequest) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", { status: 405 });
      }

      const assetPath = isLegacyRootMapAssetRequest
        ? url.pathname
        : url.pathname.slice("/map-runtime".length);
      const retiredAssetPath =
        assetPath.startsWith("/data/") ||
        assetPath.startsWith("/sprites/") ||
        assetPath.startsWith("/landmarks/") ||
        assetPath === "/maps/tiles/manifest.json";
      if (retiredAssetPath) {
        return new Response("Not found", {
          status: 404,
          headers: { "cache-control": "public, max-age=300" },
        });
      }
      if (!isAllowedMapRuntimeAssetPath(assetPath)) {
        return new Response("Not found", {
          status: 404,
          headers: { "cache-control": "public, max-age=300" },
        });
      }

      const cacheControl = assetPath === "/manifest.json"
        ? "public, max-age=300, stale-while-revalidate=3600"
        : assetPath.startsWith("/bundles/") || assetPath.startsWith("/releases/")
          ? "public, max-age=31536000, immutable"
          : "public, max-age=86400, stale-while-revalidate=604800";
      const allowBootstrapFallback = isMapAssetsBootstrapFallbackEnabled(
        env?.MAP_RELEASE_BOOTSTRAP_VERSION,
        mapManifest.versionKey,
      );
      let bootstrapFallbackActive = false;
      if (env?.MAP_ASSETS) {
        const r2AssetPath = isLegacyRootMapAssetRequest
          ? `/releases/${mapManifest.versionKey}${assetPath}`
          : assetPath;
        const r2Asset = await mapAssetFromR2(
          env.MAP_ASSETS,
          r2AssetPath,
          request.method,
          cacheControl,
        );
        if (r2Asset) {
          const missingPointer =
            assetPath === "/manifest.json" &&
            r2Asset.headers.get("x-atlas-r2-state") === "missing-pointer";
          if (allowBootstrapFallback && missingPointer) bootstrapFallbackActive = true;
          else return r2Asset;
        }
        if (
          assetPath.startsWith("/bundles/") || assetPath.startsWith("/releases/")
        ) {
          if (allowBootstrapFallback) {
            try {
              bootstrapFallbackActive = !(await env.MAP_ASSETS.head("channels/stable.json"));
            } catch {
              bootstrapFallbackActive = false;
            }
          }
          if (!bootstrapFallbackActive) {
            return new Response("Map release object not found", {
              status: 404,
              headers: { "cache-control": "no-store" },
            });
          }
        }
      }
      const localAssetPathname = localMapAssetPath(assetPath);
      if (localAssetPathname) {
        const localAssetUrl = new URL(request.url);
        localAssetUrl.pathname = localAssetPathname;
        const localAsset = env?.ASSETS
          ? await env.ASSETS.fetch(new Request(localAssetUrl, request))
          : new Response(null, { status: 404 });
        if (localAsset.status !== 404) {
          const localHeaders = new Headers(localAsset.headers);
          localHeaders.set("cache-control", localAsset.ok
            ? bootstrapFallbackActive ? "no-store" : cacheControl
            : "public, max-age=300");
          localHeaders.set("cross-origin-resource-policy", "same-origin");
          localHeaders.set("x-content-type-options", "nosniff");
          return new Response(request.method === "HEAD" ? null : localAsset.body, {
            status: localAsset.status,
            statusText: localAsset.statusText,
            headers: localHeaders,
          });
        }
      }

      if (bootstrapFallbackActive) {
        return new Response("Bundled bootstrap map object is unavailable", {
          status: 503,
          headers: { "cache-control": "no-store" },
        });
      }

      const mapOrigin = env?.MAP_ORIGIN;
      if (!mapOrigin) {
        return new Response("Map asset not found and upstream is not configured", {
          status: 404,
          headers: { "cache-control": "public, max-age=300" },
        });
      }
      const upstreamUrl = mapUpstreamUrl(mapOrigin, assetPath, url.search);
      if (!upstreamUrl) return new Response("Map upstream is unavailable", { status: 502 });
      let upstream: Response;
      try {
        upstream = await fetch(new Request(upstreamUrl, {
          method: request.method,
          headers: { accept: request.headers.get("accept") ?? "*/*" },
          redirect: "manual",
        }));
      } catch {
        return new Response("Map upstream is unavailable", { status: 502 });
      }
      if (upstream.status >= 300 && upstream.status < 400) {
        return new Response("Map upstream redirect rejected", {
          status: 502,
          headers: { "cache-control": "public, max-age=300" },
        });
      }
      const responseHeaders = new Headers(upstream.headers);
      responseHeaders.delete("set-cookie");
      responseHeaders.set("cache-control", upstream.ok
        ? cacheControl
        : "public, max-age=300");
      responseHeaders.set("cross-origin-resource-policy", "same-origin");
      return new Response(request.method === "HEAD" ? null : upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: responseHeaders,
      });
    }

    if (url.pathname === "/_vinext/image") {
      if (!env?.ASSETS || !env.IMAGES) {
        return new Response("Image optimization is unavailable", { status: 503 });
      }
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    // Sprite assets need security headers for MapLibre GL JS marker rendering.
    // Handle explicitly before the generic static asset handler to ensure
    // cross-origin-resource-policy is always present.
    if (
      env?.ASSETS &&
      (request.method === "GET" || request.method === "HEAD") &&
      url.pathname.startsWith("/sprites/")
    ) {
      const asset = await env.ASSETS.fetch(request);
      if (!asset.ok) return asset;
      const assetHeaders = new Headers(asset.headers);
      assetHeaders.set("cache-control", "public, max-age=86400, stale-while-revalidate=604800");
      assetHeaders.set("cross-origin-resource-policy", "same-origin");
      assetHeaders.set("x-content-type-options", "nosniff");
      return new Response(request.method === "HEAD" ? null : asset.body, {
        status: asset.status,
        statusText: asset.statusText,
        headers: assetHeaders,
      });
    }

    // vinext currently applies Next's trailingSlash redirect to file requests as
    // well as document routes. Serve immutable build assets and public files
    // through the binding first so `/assets/app.js` never becomes
    // `/assets/app.js/` and 404s before hydration.
    if (
      env?.ASSETS &&
      (request.method === "GET" || request.method === "HEAD") &&
      isStaticAssetPath(url.pathname)
    ) {
      const asset = await env.ASSETS.fetch(request);
      if (!asset.ok) return asset;
      const assetHeaders = new Headers(asset.headers);
      if (url.pathname.toLowerCase().endsWith(".webp")) {
        assetHeaders.set("content-type", "image/webp");
      }
      assetHeaders.set(
        "cache-control",
        url.pathname.startsWith("/assets/")
          ? "public, max-age=31536000, immutable"
          : "public, max-age=86400, stale-while-revalidate=604800",
      );
      assetHeaders.set("x-content-type-options", "nosniff");
      return new Response(request.method === "HEAD" ? null : asset.body, {
        status: asset.status,
        statusText: asset.statusText,
        headers: assetHeaders,
      });
    }

    if (url.pathname.startsWith("/_")) {
      return new Response("Not found", {
        status: 404,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "private, no-store",
          "x-content-type-options": "nosniff",
        },
      });
    }

    // Invalid-locale / unknown document paths (e.g. /zh/, /zh-CN/, /zh-TW/,
    // typos) must return a clean 404 instead of the framework's trailing-slash
    // redirect loop, which GSC flags as a redirect/server error. Root "/" and
    // file-style paths (favicons, static public assets) fall through unchanged.
    // Admin document paths (/admin/, /admin/login/) also fall through — they
    // are handled by the vinext handler downstream.
    const firstSegment = url.pathname.split("/").filter(Boolean)[0] ?? "";
    const firstSegmentIsFile = firstSegment.includes(".");
    const isAdminDocumentPath = url.pathname === "/admin" || url.pathname.startsWith("/admin/");
    if (firstSegment && !localeSlugs.includes(firstSegment) && !firstSegmentIsFile && !isAdminDocumentPath) {
      return new Response("Not found", {
        status: 404,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "private, no-store",
          "x-content-type-options": "nosniff",
        },
      });
    }

    const localizedDocumentPath = isLocalizedDocumentPath(url.pathname);
    const isRscRequest =
      request.headers.get("rsc") === "1" ||
      request.headers.get("accept")?.includes("text/x-component");
    if (
      localizedDocumentPath &&
      (request.method === "GET" || request.method === "HEAD") &&
      !isRscRequest &&
      !url.pathname.endsWith("/")
    ) {
      const location = new URL(url);
      location.pathname = `${location.pathname}/`;
      return new Response(null, {
        status: 308,
        headers: {
          location: `${location.pathname}${location.search}`,
          "cache-control": "public, max-age=3600",
        },
      });
    }

    const routeLocale =
      localeSlugs.find(
        (locale) =>
          url.pathname === `/${locale}` ||
          url.pathname.startsWith(`/${locale}/`),
      ) ??
      preferredSiteLocale(
        request.headers.get("cookie"),
        request.headers.get("accept-language"),
      );
    const requestHeaders = new Headers(request.headers);
    requestHeaders.delete(TRUSTED_SITE_ORIGIN_HEADER);
    requestHeaders.delete(TRUSTED_EXTERNAL_LINKS_HEADER);
    requestHeaders.delete(TRUSTED_EXTERNAL_LINK_SCALE_HEADER);
    requestHeaders.delete(TRUSTED_CONTENT_OVERRIDES_HEADER);
    if (primaryOrigin) {
      requestHeaders.set(TRUSTED_SITE_ORIGIN_HEADER, primaryOrigin);
    }
    if (localizedDocumentPath && env?.DB) {
      try {
        const externalLinkDatabase =
          env.DB as unknown as ExternalLinkDatabase;
        const [externalLinks, externalLinkSettings] = await Promise.all([
          readExternalLinksFromDatabase(externalLinkDatabase),
          readExternalLinkSettingsFromDatabase(externalLinkDatabase),
        ]);
        const encodedExternalLinks = encodeExternalLinkRecords(externalLinks);
        if (encodedExternalLinks) {
          requestHeaders.set(
            TRUSTED_EXTERNAL_LINKS_HEADER,
            encodedExternalLinks,
          );
        }
        requestHeaders.set(
          TRUSTED_EXTERNAL_LINK_SCALE_HEADER,
          String(externalLinkSettings.scalePercent),
        );

        // ── 新增：读取全量内容并写入 globalThis ──
        const contentRows = await readContentFromDatabase(
          env.DB as unknown as ContentOverrideDatabase,
        );
        if (contentRows.length > 0) {
          // 解析 JSON 字段为对象，以匹配 ContentEntry 结构
          (globalThis as any).__dbContent = contentRows.map((row: any) => ({
            section: row.section,
            slug: row.slug,
            schemaType: row.schema_type,
            publishedAt: row.published_at,
            updatedAt: row.updated_at,
            readingMinutes: row.reading_minutes,
            publication: JSON.parse(row.publication_json),
            sources: row.sources_json ? JSON.parse(row.sources_json) : undefined,
            heroImage: row.hero_image_json ? JSON.parse(row.hero_image_json) : undefined,
            primaryAction: row.primary_action_json ? JSON.parse(row.primary_action_json) : undefined,
            properties: row.properties_json ? JSON.parse(row.properties_json) : undefined,
            related: JSON.parse(row.related_json),
            translations: JSON.parse(row.translations_json),
          }));
        }
      } catch {
        // Public pages remain available if footer-link storage is unavailable.
      }
    }
    requestHeaders.set("x-aion2-locale", routeLocale);
    const isHtmlDocumentRequest =
      !isRscRequest &&
      (request.method === "GET" || request.method === "HEAD") &&
      request.headers.get("accept")?.includes("text/html") === true;
    const stripsFrameworkTrailingSlash =
      localizedDocumentPath ||
      isHtmlDocumentRequest ||
      url.pathname === "/admin/login/" ||
      url.pathname === "/admin/";
    const internalUrl = stripsFrameworkTrailingSlash
      ? withoutDocumentTrailingSlash(url)
      : url;
    const response = await handler.fetch(
      new Request(internalUrl, new Request(request, { headers: requestHeaders })),
      env ?? ({} as Env),
      ctx,
    );
    const responseHeaders = new Headers(response.headers);

    if (url.pathname === "/") {
      responseHeaders.set("cache-control", "private, no-store");
      responseHeaders.append("vary", "Accept-Language");
      responseHeaders.append("vary", "Cookie");
    }

    if (localizedDocumentPath && !isRscRequest) {
      responseHeaders.set("content-language", localeCodes[routeLocale]);
      if (
        response.ok &&
        url.search === "" &&
        responseHeaders.get("content-type")?.includes("text/html")
      ) {
        responseHeaders.set("cache-control", "public, max-age=0, must-revalidate");
        responseHeaders.set(
          "cdn-cache-control",
          htmlCdnCacheControl(url.pathname),
        );
      }
    }
    if (
      !localizedDocumentPath &&
      !isRscRequest &&
      response.status === 404 &&
      responseHeaders.get("content-type")?.includes("text/html")
    ) {
      responseHeaders.set("content-language", localeCodes[routeLocale]);
    }

    const finalResponse = new Response(request.method === "HEAD" ? null : response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
    const securedResponse = withPublicHtmlSecurityHeaders(finalResponse, url);
    return isAdminDocument
      ? withAdminSecurityHeaders(securedResponse)
      : securedResponse;
  },
};

export default worker;
