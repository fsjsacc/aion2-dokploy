import bootstrapJson from "../app/item-catalog-bootstrap.json";
import { curatedItemSlug } from "../app/curated-item-links";
import { databaseClassDefinitions } from "../app/database-type-registry";
import type {
  ItemCatalogFacets,
  ItemCatalogLocalizationMetadata,
  ItemCatalogRow,
  ItemCatalogSearchRequest,
  ItemCatalogSearchResponse,
} from "../app/item-catalog-types";
import {
  fetchOfficialItemDetail,
  officialItemPageUrl,
  officialItemSourceUrl,
  type OfficialItemDetail,
} from "../app/official-item-detail";
import {
  isSiteLocale,
  resolveContentLocale,
  type ContentLocale,
  type SiteLocale,
} from "../app/site-config";

export type ItemCatalogEnvironment = {
  SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
};

type BootstrapDocument = {
  facetsByLocale: Record<ContentLocale, ItemCatalogFacets>;
};

const bootstrap = bootstrapJson as unknown as BootstrapDocument;
const classIds = new Set([
  "gladiator",
  "templar",
  "assassin",
  "ranger",
  "sorcerer",
  "spiritmaster",
  "cleric",
  "chanter",
  "brawler",
]);
const filterCodePattern = /^[A-Za-z0-9_:-]{1,80}$/u;
const itemIdPattern = /^\d{1,18}$/u;
const detailItemIdPattern = /^[1-9]\d{0,17}$/u;
const detailPathPattern = /^\/api\/items\/([1-9]\d{0,17})\/?$/u;

type SupabaseItemCatalogResponse = Pick<
  ItemCatalogSearchResponse,
  "release" | "items" | "pagination"
>;

export function itemCatalogLocalization(
  requestedLocale: SiteLocale,
): ItemCatalogLocalizationMetadata {
  const contentLocale = resolveContentLocale(requestedLocale);
  const isFallback = requestedLocale !== contentLocale;
  return {
    requestedLocale,
    contentLocale,
    isFallback,
    status: isFallback ? "fallback" : "localized",
  };
}

export class ItemCatalogRequestError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "ItemCatalogRequestError";
    this.status = status;
  }
}

function stringArray(
  value: unknown,
  label: string,
  maximum: number,
  validate: (candidate: string) => boolean,
) {
  if (!Array.isArray(value) || value.length > maximum) {
    throw new ItemCatalogRequestError(`${label} is invalid`);
  }
  const result = value.map((candidate) => {
    if (typeof candidate !== "string" || !validate(candidate)) {
      throw new ItemCatalogRequestError(`${label} is invalid`);
    }
    return candidate;
  });
  return [...new Set(result)];
}

export function parseItemCatalogRequest(
  value: unknown,
): ItemCatalogSearchRequest {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ItemCatalogRequestError("Request body is invalid");
  }
  const input = value as Record<string, unknown>;
  if (typeof input.locale !== "string" || !isSiteLocale(input.locale)) {
    throw new ItemCatalogRequestError("Locale is invalid");
  }
  if (typeof input.query !== "string" || input.query.length > 100) {
    throw new ItemCatalogRequestError("Query is invalid");
  }
  const category =
    input.category === null || input.category === ""
      ? null
      : typeof input.category === "string" &&
          filterCodePattern.test(input.category)
        ? input.category
        : undefined;
  if (category === undefined) {
    throw new ItemCatalogRequestError("Category is invalid");
  }
  const grades = stringArray(
    input.grades,
    "Grades",
    10,
    (candidate) => filterCodePattern.test(candidate),
  );
  const classes = stringArray(
    input.classes,
    "Classes",
    9,
    (candidate) => classIds.has(candidate),
  );
  let itemIds: string[] | null;
  if (input.itemIds === null) {
    itemIds = null;
  } else {
    itemIds = stringArray(
      input.itemIds,
      "Item IDs",
      500,
      (candidate) => itemIdPattern.test(candidate),
    );
  }
  if (!Number.isInteger(input.page) || Number(input.page) < 1) {
    throw new ItemCatalogRequestError("Page is invalid");
  }
  if (input.pageSize !== 20) {
    throw new ItemCatalogRequestError("Page size is invalid");
  }

  return {
    locale: input.locale as SiteLocale,
    query: input.query.normalize("NFKC").trim(),
    category,
    grades,
    classes: classes as ItemCatalogSearchRequest["classes"],
    itemIds,
    page: Math.min(Number(input.page), 100_000),
    pageSize: 20,
  };
}

function jsonResponse(
  value: unknown,
  status = 200,
  cacheControl = "private, no-store",
  head = false,
) {
  return new Response(head ? null : JSON.stringify(value), {
    status,
    headers: {
      "cache-control": cacheControl,
      "cdn-cache-control": cacheControl,
      "content-type": "application/json; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
}

function validSupabaseResponse(
  value: unknown,
): value is SupabaseItemCatalogResponse {
  if (!value || typeof value !== "object") return false;
  const response = value as Record<string, unknown>;
  const pagination = response.pagination as Record<string, unknown> | undefined;
  return (
    Array.isArray(response.items) &&
    pagination !== null &&
    typeof pagination === "object" &&
    Number.isInteger(pagination.page) &&
    Number.isInteger(pagination.pageSize) &&
    Number.isInteger(pagination.total) &&
    Number.isInteger(pagination.lastPage)
  );
}

function supabaseConfiguration(env: ItemCatalogEnvironment) {
  const processEnvironment =
    typeof process === "undefined" ? undefined : process.env;
  const supabaseUrl =
    env.SUPABASE_URL?.trim() || processEnvironment?.SUPABASE_URL?.trim();
  const publishableKey =
    env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    processEnvironment?.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!supabaseUrl || !publishableKey) return null;
  try {
    const rpcUrl = new URL("/rest/v1/rpc/search_aion2_items", supabaseUrl);
    if (rpcUrl.protocol !== "https:") return null;
    return { publishableKey, rpcUrl };
  } catch {
    return null;
  }
}

async function queryItemSummary(
  id: string,
  locale: ContentLocale,
  env: ItemCatalogEnvironment,
) {
  const configuration = supabaseConfiguration(env);
  if (!configuration) return { available: false, row: null, release: null };
  try {
    const response = await fetch(configuration.rpcUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        apikey: configuration.publishableKey,
        authorization: `Bearer ${configuration.publishableKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        p_locale: locale,
        p_query: id,
        p_category: null,
        p_grades: null,
        p_classes: null,
        p_item_ids: [id],
        p_page: 1,
        p_page_size: 1,
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return { available: false, row: null, release: null };
    const result: unknown = await response.json();
    if (!validSupabaseResponse(result)) {
      return { available: false, row: null, release: null };
    }
    const typed = result as SupabaseItemCatalogResponse;
    return {
      available: true,
      row: (typed.items[0] as ItemCatalogRow | undefined) ?? null,
      release: typed.release,
    };
  } catch {
    return { available: false, row: null, release: null };
  }
}

function summaryDetail(
  row: ItemCatalogRow,
  locale: ContentLocale,
  release: ItemCatalogSearchResponse["release"],
): OfficialItemDetail {
  return {
    detailStatus: "summary",
    id: row.id,
    name: row.name,
    description: null,
    gradeCode: row.gradeCode,
    gradeName: row.gradeName,
    iconUrl: row.imageUrl,
    itemLevel: null,
    levelValue: null,
    enchantLevel: 0,
    equipLevel: null,
    typeCode: null,
    categoryName: row.categoryName,
    raceName: "",
    classNames: row.classIds.map((classId) =>
      databaseClassDefinitions.find((entry) => entry.id === classId)
        ?.labels[locale] ?? classId
    ),
    storable: null,
    tradable: row.tradable,
    personalTradable: null,
    enchantable: null,
    decomposable: null,
    safeEnchantLevel: null,
    maxEnchantLevel: null,
    maxExceedEnchantLevel: null,
    magicStoneSlots: null,
    godStoneSlots: null,
    subStatCount: null,
    subSkillCountMax: null,
    subStatRandom: null,
    durationMin: null,
    durationMax: null,
    coolTime: null,
    costumes: [],
    sources: [],
    summaryLines: [...row.optionLines],
    mainStats: [],
    subStats: [],
    releaseVersion: release?.versionKey ?? null,
    sourceRetrievedAt: release?.retrievedAt ?? null,
    officialPageUrl: officialItemPageUrl(row.id, locale),
    officialSourceUrl: officialItemSourceUrl(row.id, locale),
  };
}

async function handleItemDetailApi(
  request: Request,
  env: ItemCatalogEnvironment,
  id: string,
) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }
  const url = new URL(request.url);
  const queryKeys = [...url.searchParams.keys()];
  if (
    queryKeys.some((key) => key !== "locale" && key !== "enchant") ||
    url.searchParams.getAll("locale").length !== 1 ||
    url.searchParams.getAll("enchant").length > 1
  ) {
    return jsonResponse({ error: "Query parameters are invalid" }, 400);
  }
  const localeValue = url.searchParams.get("locale");
  if (!localeValue || !isSiteLocale(localeValue)) {
    return jsonResponse({ error: "Locale is invalid" }, 400);
  }
  const requestedLocale = localeValue;
  const localization = itemCatalogLocalization(requestedLocale);
  const enchantValue = url.searchParams.get("enchant") ?? "0";
  if (!/^\d{1,2}$/u.test(enchantValue)) {
    return jsonResponse({ error: "Enhancement level is invalid" }, 400);
  }
  const enchantLevel = Number(enchantValue);
  if (!Number.isInteger(enchantLevel) || enchantLevel < 0 || enchantLevel > 50) {
    return jsonResponse({ error: "Enhancement level is invalid" }, 400);
  }

  const [summary, detail] = await Promise.all([
    queryItemSummary(id, localization.contentLocale, env),
    fetchOfficialItemDetail(
      id,
      localization.contentLocale,
      enchantLevel,
    ).catch(() => null),
  ]);
  if (summary.available && !summary.row) {
    return jsonResponse(
      { error: "Item not found", ...localization },
      404,
      "public, max-age=60, s-maxage=60",
      request.method === "HEAD",
    );
  }

  if (detail) {
    return jsonResponse(
      {
        ...detail,
        summaryLines: summary.row?.optionLines ?? detail.summaryLines,
        releaseVersion: summary.release?.versionKey ?? null,
        ...localization,
      },
      200,
      "public, max-age=300, s-maxage=21600, stale-while-revalidate=86400",
      request.method === "HEAD",
    );
  }

  if (summary.row) {
    return jsonResponse(
      {
        ...summaryDetail(
          summary.row,
          localization.contentLocale,
          summary.release,
        ),
        ...localization,
      },
      200,
      "public, max-age=60, s-maxage=300, stale-while-revalidate=3600",
      request.method === "HEAD",
    );
  }
  return jsonResponse(
    {
      error: "Item detail is temporarily unavailable",
      ...localization,
    },
    503,
    "private, no-store",
    request.method === "HEAD",
  );
}

export async function handleItemCatalogApi(
  request: Request,
  env: ItemCatalogEnvironment,
): Promise<Response | null> {
  const url = new URL(request.url);
  const detailMatch = url.pathname.match(detailPathPattern);
  if (detailMatch && detailItemIdPattern.test(detailMatch[1])) {
    return handleItemDetailApi(request, env, detailMatch[1]);
  }
  if (url.pathname !== "/api/items") return null;
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let input: ItemCatalogSearchRequest;
  try {
    input = parseItemCatalogRequest(await request.json());
  } catch (error) {
    if (error instanceof ItemCatalogRequestError) {
      return jsonResponse({ error: error.message }, error.status);
    }
    return jsonResponse({ error: "Request body is invalid" }, 400);
  }

  const configuration = supabaseConfiguration(env);
  const localization = itemCatalogLocalization(input.locale);
  if (!configuration) {
    return jsonResponse(
      {
        error: "Item database is temporarily unavailable",
        ...localization,
      },
      503,
    );
  }

  try {
    const response = await fetch(configuration.rpcUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        apikey: configuration.publishableKey,
        authorization: `Bearer ${configuration.publishableKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        p_locale: localization.contentLocale,
        p_query: input.query,
        p_category: input.category,
        p_grades: input.grades.length ? input.grades : null,
        p_classes: input.classes.length ? input.classes : null,
        // Keep bigint identifiers as strings so future official IDs cannot lose
        // precision before PostgREST coerces them to the RPC's bigint[] type.
        p_item_ids: input.itemIds ?? null,
        p_page: input.page,
        p_page_size: input.pageSize,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      return jsonResponse(
        {
          error: "Item database is temporarily unavailable",
          ...localization,
        },
        503,
      );
    }
    const result: unknown = await response.json();
    if (!validSupabaseResponse(result)) {
      return jsonResponse(
        {
          error: "Item database is temporarily unavailable",
          ...localization,
        },
        503,
      );
    }
    const output: ItemCatalogSearchResponse = {
      ...result,
      items: (result.items as ItemCatalogRow[]).map((item) => ({
        ...item,
        detailSlug: curatedItemSlug(item.id),
      })),
      facets: bootstrap.facetsByLocale[localization.contentLocale],
      ...localization,
    };
    return jsonResponse(output);
  } catch {
    return jsonResponse(
      {
        error: "Item database is temporarily unavailable",
        ...localization,
      },
      503,
    );
  }
}
