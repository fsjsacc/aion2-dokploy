import { f as siteLocales } from "./site-config-EbYJfejA.js";
//#region app/analytics-journey.ts
var ANALYTICS_CONSENT_STORAGE_KEY = "aion2-analytics-consent-v2";
var ANALYTICS_VISITOR_STORAGE_KEY = "aion2-analytics-visitor-v1";
var ANALYTICS_SESSION_STORAGE_KEY = "aion2-analytics-session-v1";
var ANALYTICS_CONSENT_COOKIE = "aion2_analytics_consent";
var ADMIN_PATH_PATTERN$1 = new RegExp(`^/(?:(?:${siteLocales.join("|")})/)?admin(?:/|$)`, "u");
function validUuid(value) {
	return value && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(value) ? value.toLowerCase() : null;
}
function randomId() {
	return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : null;
}
function storedId(storage, key) {
	try {
		const current = validUuid(storage.getItem(key));
		if (current) return current;
		const next = randomId();
		if (next) storage.setItem(key, next);
		return next;
	} catch {
		return null;
	}
}
function safeMarketingValue(value, maximum) {
	if (!value) return void 0;
	return value.normalize("NFKD").toLowerCase().replace(/[^a-z0-9._-]+/gu, "-").replace(/^[^a-z0-9]+|[^a-z0-9]+$/gu, "").slice(0, maximum).replace(/[^a-z0-9]+$/gu, "") || void 0;
}
function marketingParameters() {
	const params = new URLSearchParams(window.location.search);
	const utmSource = safeMarketingValue(params.get("utm_source"), 80);
	const utmMedium = safeMarketingValue(params.get("utm_medium"), 80);
	const utmCampaign = safeMarketingValue(params.get("utm_campaign"), 120);
	return {
		...utmSource ? { utmSource } : {},
		...utmMedium ? { utmMedium } : {},
		...utmCampaign ? { utmCampaign } : {}
	};
}
function send(path, value) {
	try {
		const body = JSON.stringify(value);
		if (typeof navigator.sendBeacon === "function") {
			const blob = new Blob([body], { type: "application/json" });
			if (navigator.sendBeacon(path, blob)) return;
		}
		fetch(path, {
			method: "POST",
			body,
			credentials: "same-origin",
			headers: {
				"content-type": "application/json",
				accept: "application/json"
			},
			keepalive: true
		}).catch(() => void 0);
	} catch {}
}
function readAnalyticsConsent() {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage.getItem("aion2-analytics-consent-v2") === "denied" ? "denied" : "granted";
	} catch {
		return null;
	}
}
function writeAnalyticsConsent(value) {
	try {
		window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
		window.localStorage.removeItem("aion2-analytics-consent-v1");
	} catch {}
	const secure = window.location.protocol === "https:" ? "; Secure" : "";
	document.cookie = `${ANALYTICS_CONSENT_COOKIE}=${value}-v2; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}
function updateGoogleAnalyticsConsent(value) {
	const analyticsWindow = window;
	analyticsWindow.gtag?.("consent", "update", {
		analytics_storage: value === "denied" ? "denied" : "granted",
		ad_storage: "denied",
		ad_user_data: "denied",
		ad_personalization: "denied"
	});
	if (value === "granted") analyticsWindow.aion2LoadGtm?.(true);
	else analyticsWindow.aion2ResetAnalyticsAfterDenial?.();
}
function clearJourneyIdentity() {
	try {
		window.localStorage.removeItem(ANALYTICS_VISITOR_STORAGE_KEY);
		window.sessionStorage.removeItem(ANALYTICS_SESSION_STORAGE_KEY);
	} catch {}
}
function deleteStoredJourney() {
	let visitorId = null;
	try {
		visitorId = validUuid(window.localStorage.getItem(ANALYTICS_VISITOR_STORAGE_KEY));
	} catch {
		visitorId = null;
	}
	if (visitorId) send("/api/journey-events/delete", {
		consentVersion: 2,
		visitorId
	});
}
function collectJourneyEvent(event) {
	if (typeof window === "undefined" || readAnalyticsConsent() !== "granted" || ADMIN_PATH_PATTERN$1.test(window.location.pathname)) return;
	const visitorId = storedId(window.localStorage, ANALYTICS_VISITOR_STORAGE_KEY);
	const sessionId = storedId(window.sessionStorage, ANALYTICS_SESSION_STORAGE_KEY);
	if (!visitorId || !sessionId) return;
	send("/api/journey-events/collect", {
		consentVersion: 2,
		visitorId,
		sessionId,
		...event,
		path: window.location.pathname,
		marketing: marketingParameters()
	});
}
//#endregion
//#region app/analytics-events.ts
var mirroredAnalyticsEvents = [
	"checklist_clear_completed",
	"checklist_item_complete",
	"checklist_item_create",
	"checklist_item_reopen",
	"checklist_region_change",
	"checklist_reset",
	"checklist_to_map_open",
	"code_copy_confirm_open",
	"code_copy_failure",
	"code_copy_success",
	"code_redeem_official_click",
	"code_reveal_complete",
	"code_reveal_start",
	"content_card_click",
	"content_faq_toggle",
	"content_primary_action_click",
	"content_source_click",
	"event_timer_filter_change",
	"event_timer_map_open",
	"event_timer_open",
	"event_timer_service_change",
	"event_timer_source_open",
	"guide_click",
	"guide_to_map_click",
	"home_checklist_open",
	"language_change",
	"map_activate",
	"map_fullscreen_change",
	"map_marker_found_toggle",
	"map_point_share",
	"map_progress_share",
	"map_ready",
	"map_route_share",
	"map_site_navigation_click",
	"map_type_filter_open",
	"map_to_checklist_add",
	"map_to_guide_click",
	"marker_open",
	"material_calculator_add_material",
	"material_calculator_add_stage",
	"material_calculator_copy_shortage",
	"material_calculator_remove_material",
	"material_calculator_remove_stage",
	"material_calculator_reset",
	"material_calculator_save",
	"material_calculator_share",
	"material_calculator_start",
	"material_calculator_template_select",
	"not_found_recovery_click",
	"marker_found",
	"poster_open",
	"question_answer",
	"report_outdated_start",
	"report_outdated_submit",
	"result_view",
	"save_local",
	"tool_open",
	"tool_start"
];
var analyticsLocales = [...siteLocales, "unknown"];
var analyticsServices = [
	"kr-tw-live",
	"global",
	"unknown",
	"other"
];
var analyticsSurfaces = [
	"unknown",
	"home",
	"home-hero",
	"home-core-entry",
	"home-directory",
	"faction-gate",
	"content-hub",
	"content-detail",
	"map-seo",
	"interactive-map",
	"daily-checklist",
	"event-timer",
	"class-finder",
	"material-calculator",
	"correction-report",
	"not-found"
];
var analyticsTargetKinds = [
	"none",
	"content",
	"item",
	"map",
	"tool"
];
var mirroredEventSet = new Set(mirroredAnalyticsEvents);
var localeSet = new Set(analyticsLocales);
var serviceSet = new Set(analyticsServices);
var surfaceSet = new Set(analyticsSurfaces);
var targetKindSet = new Set(analyticsTargetKinds);
function isMirroredAnalyticsEvent(value) {
	return typeof value === "string" && mirroredEventSet.has(value);
}
function isAnalyticsLocale(value) {
	return typeof value === "string" && localeSet.has(value);
}
function isAnalyticsService(value) {
	return typeof value === "string" && serviceSet.has(value);
}
function isAnalyticsSurface(value) {
	return typeof value === "string" && surfaceSet.has(value);
}
function isAnalyticsTargetKind(value) {
	return typeof value === "string" && targetKindSet.has(value);
}
//#endregion
//#region app/analytics.ts
var ADMIN_PATH_PATTERN = new RegExp(`^/(?:(?:${siteLocales.join("|")})/)?admin(?:/|$)`, "u");
var CONTENT_SECTIONS = new Set([
	"guides",
	"classes",
	"news",
	"database"
]);
var TOOL_KEYS = new Set([
	"class-finder",
	"code-center",
	"daily-checklist",
	"event-timer",
	"interactive-map",
	"material-calculator",
	"site-contact"
]);
var PRODUCTION_ANALYTICS_HOSTS = new Set(["aion2kina.com", "www.aion2kina.com"]);
var lastTrackedPageViewLocation = null;
function isProductionAnalyticsHost(hostname) {
	return PRODUCTION_ANALYTICS_HOSTS.has(hostname.toLowerCase());
}
function mayDispatchAnalytics() {
	return typeof window !== "undefined" && isProductionAnalyticsHost(window.location.hostname) && !ADMIN_PATH_PATTERN.test(window.location.pathname);
}
function slugSegment(value) {
	if (typeof value !== "string") return null;
	return value.normalize("NFKD").toLowerCase().replace(/[\u0300-\u036f]/gu, "").replace(/[^a-z0-9]+/gu, "-").replace(/^-+|-+$/gu, "").slice(0, 80) || null;
}
function normalizedPathKey(value) {
	if (typeof value !== "string") return null;
	const segments = value.split("/").map(slugSegment).filter(Boolean);
	if (segments.length < 1 || segments.length > 2) return null;
	const normalized = segments.join("/");
	return normalized.length <= 160 ? normalized : null;
}
function normalizedLocale(payload) {
	if (isAnalyticsLocale(payload.locale)) return payload.locale;
	const routeLocale = window.location.pathname.split("/")[1]?.toLowerCase();
	return isAnalyticsLocale(routeLocale) ? routeLocale : "unknown";
}
function normalizedService(payload) {
	return isAnalyticsService(payload.service) ? payload.service : "unknown";
}
function normalizedSurface(event, payload) {
	const candidate = typeof payload.surface === "string" ? payload.surface.replaceAll("_", "-") : typeof payload.source === "string" ? payload.source.replaceAll("_", "-") : "";
	if (/^directory-[0-9]+$/u.test(candidate)) return "home-directory";
	if (candidate === "hub-published-card") return "content-hub";
	if (isAnalyticsSurface(candidate)) return candidate;
	const toolName = slugSegment(payload.tool_name);
	if (toolName && isAnalyticsSurface(toolName)) return toolName;
	if (event === "content_card_click") return "content-hub";
	if (event === "map_to_guide_click") return "map-seo";
	if (event.startsWith("map_")) return "interactive-map";
	if (event.startsWith("material_calculator_")) return "material-calculator";
	if (event.startsWith("event_timer_")) return "event-timer";
	if (event.startsWith("report_outdated_")) return "correction-report";
	if (event === "language_change") return "faction-gate";
	return "unknown";
}
function explicitTarget(payload) {
	if (!isAnalyticsTargetKind(payload.target_kind)) return null;
	if (payload.target_kind === "none") return {
		targetKind: "none",
		targetKey: "none"
	};
	if (payload.target_kind === "item") {
		const itemId = typeof payload.target_key === "string" && /^[1-9]\d{0,17}$/u.test(payload.target_key) ? payload.target_key : null;
		return itemId ? {
			targetKind: "item",
			targetKey: itemId
		} : null;
	}
	const key = normalizedPathKey(payload.target_key);
	if (!key) return null;
	if (payload.target_kind === "tool" && !TOOL_KEYS.has(key)) return null;
	return {
		targetKind: payload.target_kind,
		targetKey: key
	};
}
function normalizedTarget(event, payload) {
	const explicit = explicitTarget(payload);
	if (explicit) return explicit;
	const contentSlug = slugSegment(payload.content_slug);
	const contentSection = slugSegment(payload.section);
	if (contentSlug && contentSection && CONTENT_SECTIONS.has(contentSection)) return {
		targetKind: "content",
		targetKey: `${contentSection}/${contentSlug}`
	};
	const mapName = slugSegment(payload.map_name);
	if (mapName) return {
		targetKind: "map",
		targetKey: mapName
	};
	const toolName = slugSegment(payload.tool_name);
	if (toolName && TOOL_KEYS.has(toolName)) return {
		targetKind: "tool",
		targetKey: toolName
	};
	if (event.startsWith("material_calculator_")) return {
		targetKind: "tool",
		targetKey: "material-calculator"
	};
	if (event.startsWith("event_timer_")) return {
		targetKind: "tool",
		targetKey: "event-timer"
	};
	if (event.startsWith("code_")) return {
		targetKind: "tool",
		targetKey: "code-center"
	};
	if (event.startsWith("checklist_") || event === "home_checklist_open") return {
		targetKind: "tool",
		targetKey: "daily-checklist"
	};
	if (event.startsWith("map_") || event === "guide_to_map_click") return {
		targetKind: "tool",
		targetKey: "interactive-map"
	};
	if (event === "guide_click" || event === "poster_open" || event === "question_answer" || event === "result_view" || event === "save_local" || event === "tool_start") return {
		targetKind: "tool",
		targetKey: "class-finder"
	};
	return {
		targetKind: "none",
		targetKey: "none"
	};
}
function createMirroredAnalyticsPayload(event, payload) {
	if (!isMirroredAnalyticsEvent(event)) return null;
	const target = normalizedTarget(event, payload);
	return {
		event,
		locale: normalizedLocale(payload),
		service: normalizedService(payload),
		surface: normalizedSurface(event, payload),
		...target
	};
}
function mirrorEvent(event, payload) {
	if (!mayDispatchAnalytics() || readAnalyticsConsent() !== "granted" || ADMIN_PATH_PATTERN.test(window.location.pathname)) return;
	const mirrored = createMirroredAnalyticsPayload(event, payload);
	if (!mirrored) return;
	collectJourneyEvent(mirrored);
	try {
		const body = JSON.stringify(mirrored);
		if (typeof window.navigator.sendBeacon === "function") {
			const blob = new Blob([body], { type: "application/json" });
			if (window.navigator.sendBeacon("/api/events", blob)) return;
		}
		window.fetch("/api/events", {
			method: "POST",
			body,
			credentials: "same-origin",
			headers: {
				accept: "application/json",
				"content-type": "application/json"
			},
			keepalive: true
		}).catch(() => void 0);
	} catch {}
}
/**
* Sends one product event to the site's internal event bridge and the active
* Google Analytics transport (direct gtag when present, otherwise GTM).
* Keeping this in one place prevents tools from drifting into incompatible
* event shapes as more planning workflows are connected.
*/
function trackEvent(event, payload = {}) {
	if (!mayDispatchAnalytics()) return;
	const detail = {
		event,
		...payload
	};
	window.dispatchEvent(new CustomEvent("aion2:analytics", { detail }));
	const analyticsWindow = window;
	analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
	const maySendGoogleAnalytics = readAnalyticsConsent() === "granted" && !ADMIN_PATH_PATTERN.test(window.location.pathname);
	if (maySendGoogleAnalytics && typeof analyticsWindow.gtag === "function") analyticsWindow.gtag("event", event, payload);
	else if (maySendGoogleAnalytics) analyticsWindow.dataLayer.push(detail);
	mirrorEvent(event, payload);
}
/**
* Sends a manually controlled GA4 page view. The direct GA4 config disables
* automatic page views, so the consent manager can emit exactly one initial
* view and one view for each client-side route change.
*/
function trackPageView(payload) {
	if (!mayDispatchAnalytics() || readAnalyticsConsent() !== "granted" || lastTrackedPageViewLocation === payload.page_location) return;
	lastTrackedPageViewLocation = payload.page_location;
	const analyticsWindow = window;
	analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
	if (typeof analyticsWindow.gtag === "function") analyticsWindow.gtag("event", "page_view", payload);
	else analyticsWindow.dataLayer.push({
		event: "page_view",
		...payload
	});
}
//#endregion
export { collectJourneyEvent as a, updateGoogleAnalyticsConsent as c, clearJourneyIdentity as i, writeAnalyticsConsent as l, trackEvent as n, deleteStoredJourney as o, trackPageView as r, readAnalyticsConsent as s, isProductionAnalyticsHost as t };
