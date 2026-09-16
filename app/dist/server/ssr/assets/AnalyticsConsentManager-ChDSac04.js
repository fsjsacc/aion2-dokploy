import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-CU8j443B.js";
import { t as ShieldCheck } from "./shield-check-DpcKBlNS.js";
import { t as X } from "./x-Cgr92E5e.js";
import { t as usePathname } from "./navigation-C44awX2X.js";
import { i as isSiteLocale, n as getLocaleFromPathname } from "./site-config-EbYJfejA.js";
import { a as collectJourneyEvent, c as updateGoogleAnalyticsConsent, i as clearJourneyIdentity, l as writeAnalyticsConsent, n as trackEvent, o as deleteStoredJourney, r as trackPageView, s as readAnalyticsConsent, t as isProductionAnalyticsHost } from "./analytics-D_3EN7IN.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Settings2 = createLucideIcon("settings-2", [
	["path", {
		d: "M14 17H5",
		key: "gfn3mx"
	}],
	["path", {
		d: "M19 7h-9",
		key: "6i9tg"
	}],
	["circle", {
		cx: "17",
		cy: "17",
		r: "3",
		key: "18b49y"
	}],
	["circle", {
		cx: "7",
		cy: "7",
		r: "3",
		key: "dfmy0x"
	}]
]);
//#endregion
//#region app/_components/analytics/AnalyticsConsentManager.module.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var AnalyticsConsentManager_module_default = {
	backdrop: "_backdrop_150a4_1",
	panel: "_panel_150a4_12",
	icon: "_icon_150a4_24",
	closeButton: "_closeButton_150a4_38",
	eyebrow: "_eyebrow_150a4_53",
	body: "_body_150a4_55",
	current: "_current_150a4_56",
	actions: "_actions_150a4_58",
	primary: "_primary_150a4_60",
	secondary: "_secondary_150a4_61",
	privacyLink: "_privacyLink_150a4_62",
	settingsButton: "_settingsButton_150a4_64"
};
//#endregion
//#region app/_components/analytics/AnalyticsConsentManager.tsx
var import_jsx_runtime = require_jsx_runtime();
var copy = {
	"zh-hans": {
		eyebrow: "Cookie 与分析",
		title: "本网站使用 Cookie",
		body: "我们使用必要 Cookie 维持网站功能，并通过 GA4 分析 Cookie 了解使用情况、改进内容与体验。分析 Cookie 默认开启；你可以选择关闭，并随时在“分析偏好”中更改选择。",
		accept: "保留分析 Cookie",
		decline: "拒绝分析 Cookie",
		privacy: "查看隐私政策",
		settings: "分析偏好",
		saved: "当前选择",
		basic: "分析 Cookie（默认开启）",
		granted: "分析 Cookie 已开启",
		denied: "分析 Cookie 已关闭",
		close: "完成"
	},
	"zh-hant": {
		eyebrow: "Cookie 與分析",
		title: "本網站使用 Cookie",
		body: "我們使用必要 Cookie 維持網站功能，並透過 GA4 分析 Cookie 了解使用情況、改善內容與體驗。分析 Cookie 預設開啟，你可以選擇關閉，並隨時在「分析偏好」中更改。",
		accept: "保留分析 Cookie",
		decline: "拒絕分析 Cookie",
		privacy: "查看隱私權政策",
		settings: "分析偏好",
		saved: "目前選擇",
		basic: "分析 Cookie（預設開啟）",
		granted: "分析 Cookie 已開啟",
		denied: "分析 Cookie 已關閉",
		close: "完成"
	},
	en: {
		eyebrow: "Cookies & analytics",
		title: "This site uses cookies",
		body: "We use essential cookies to keep the site working and GA4 analytics cookies to understand usage and improve the experience. Analytics cookies are on by default; you can turn them off and change your choice anytime in Analytics choices.",
		accept: "Keep analytics cookies",
		decline: "Reject analytics cookies",
		privacy: "Read Privacy Policy",
		settings: "Analytics choices",
		saved: "Current choice",
		basic: "Analytics cookies (on by default)",
		granted: "Analytics cookies on",
		denied: "Analytics cookies off",
		close: "Done"
	},
	fr: {
		eyebrow: "Cookies et analyse",
		title: "Ce site utilise des cookies",
		body: "Nous utilisons des cookies essentiels au fonctionnement du site et des cookies d’analyse GA4 pour comprendre son utilisation et améliorer l’expérience. Les cookies d’analyse sont activés par défaut ; vous pouvez les refuser et modifier votre choix à tout moment dans les préférences d’analyse.",
		accept: "Conserver les cookies d’analyse",
		decline: "Refuser les cookies d’analyse",
		privacy: "Consulter la politique de confidentialité",
		settings: "Préférences d’analyse",
		saved: "Choix actuel",
		basic: "Cookies d’analyse (activés par défaut)",
		granted: "Cookies d’analyse activés",
		denied: "Cookies d’analyse désactivés",
		close: "Terminé"
	},
	de: {
		eyebrow: "Cookies und Analyse",
		title: "Diese Website verwendet Cookies",
		body: "Wir verwenden notwendige Cookies für den Betrieb der Website und GA4-Analyse-Cookies, um die Nutzung zu verstehen und das Erlebnis zu verbessern. Analyse-Cookies sind standardmäßig aktiviert; du kannst sie ablehnen und deine Auswahl jederzeit in den Analyse-Einstellungen ändern.",
		accept: "Analyse-Cookies beibehalten",
		decline: "Analyse-Cookies ablehnen",
		privacy: "Datenschutzerklärung lesen",
		settings: "Analyse-Einstellungen",
		saved: "Aktuelle Auswahl",
		basic: "Analyse-Cookies (standardmäßig aktiviert)",
		granted: "Analyse-Cookies aktiviert",
		denied: "Analyse-Cookies deaktiviert",
		close: "Fertig"
	},
	es: {
		eyebrow: "Cookies y analítica",
		title: "Este sitio utiliza cookies",
		body: "Utilizamos cookies esenciales para que el sitio funcione y cookies de analítica de GA4 para conocer su uso y mejorar la experiencia. Las cookies de analítica están activadas de forma predeterminada; puedes rechazarlas y cambiar tu elección en cualquier momento en Preferencias de analítica.",
		accept: "Mantener cookies de analítica",
		decline: "Rechazar cookies de analítica",
		privacy: "Leer la Política de privacidad",
		settings: "Preferencias de analítica",
		saved: "Elección actual",
		basic: "Cookies de analítica (activadas por defecto)",
		granted: "Cookies de analítica activadas",
		denied: "Cookies de analítica desactivadas",
		close: "Listo"
	},
	ja: {
		eyebrow: "Cookie とアクセス解析",
		title: "当サイトでは Cookie を使用します",
		body: "サイトの機能を維持するための必須 Cookie と、利用状況を把握して体験を改善するための GA4 アクセス解析 Cookie を使用します。解析 Cookie は初期設定で有効ですが、拒否したり、「解析設定」からいつでも選択を変更したりできます。",
		accept: "解析 Cookie を有効にする",
		decline: "解析 Cookie を拒否する",
		privacy: "プライバシーポリシーを見る",
		settings: "解析設定",
		saved: "現在の選択",
		basic: "解析 Cookie（初期設定で有効）",
		granted: "解析 Cookie は有効です",
		denied: "解析 Cookie は無効です",
		close: "完了"
	},
	"pt-br": {
		eyebrow: "Cookies e análise",
		title: "Este site usa cookies",
		body: "Usamos cookies essenciais para manter o site funcionando e cookies de análise do GA4 para entender o uso e melhorar a experiência. Os cookies de análise ficam ativados por padrão; você pode recusá-los e alterar sua escolha a qualquer momento em Preferências de análise.",
		accept: "Manter cookies de análise",
		decline: "Recusar cookies de análise",
		privacy: "Ler a Política de Privacidade",
		settings: "Preferências de análise",
		saved: "Escolha atual",
		basic: "Cookies de análise (ativados por padrão)",
		granted: "Cookies de análise ativados",
		denied: "Cookies de análise desativados",
		close: "Concluir"
	},
	ru: {
		eyebrow: "Файлы cookie и аналитика",
		title: "Этот сайт использует файлы cookie",
		body: "Мы используем необходимые файлы cookie для работы сайта и аналитические файлы cookie GA4, чтобы понимать, как используется сайт, и улучшать его. Аналитические файлы cookie включены по умолчанию; их можно отклонить и в любое время изменить выбор в настройках аналитики.",
		accept: "Оставить аналитические cookie",
		decline: "Отклонить аналитические cookie",
		privacy: "Открыть Политику конфиденциальности",
		settings: "Настройки аналитики",
		saved: "Текущий выбор",
		basic: "Аналитические cookie (включены по умолчанию)",
		granted: "Аналитические cookie включены",
		denied: "Аналитические cookie отключены",
		close: "Готово"
	},
	ko: {
		eyebrow: "쿠키 및 분석",
		title: "이 사이트는 쿠키를 사용합니다",
		body: "사이트 기능을 위한 필수 쿠키와 이용 현황을 파악하고 콘텐츠를 개선하기 위한 GA4 분석 쿠키를 사용합니다. 분석 쿠키는 기본으로 켜져 있으며 언제든지 분석 설정에서 끌 수 있습니다.",
		accept: "분석 쿠키 유지",
		decline: "분석 쿠키 거부",
		privacy: "개인정보 처리방침",
		settings: "분석 설정",
		saved: "현재 선택",
		basic: "분석 쿠키(기본 사용)",
		granted: "분석 쿠키 사용 중",
		denied: "분석 쿠키 사용 안 함",
		close: "완료"
	}
};
function routeLocale(pathname) {
	const value = pathname?.split("/")[1]?.toLowerCase();
	return isSiteLocale(value) ? value : "en";
}
function pageViewSurface(pathname) {
	const locale = getLocaleFromPathname(pathname);
	if (locale && (pathname === `/${locale}` || pathname === `/${locale}/`)) return "home";
	if (pathname.includes("/tools/map/")) return "interactive-map";
	if (pathname.includes("/tools/daily-checklist/")) return "daily-checklist";
	if (pathname.includes("/tools/class-finder/")) return "class-finder";
	if (pathname.includes("/tools/material-calculator/")) return "material-calculator";
	if (pathname.includes("/tools/event-timer/")) return "event-timer";
	if (/\/(?:guides|classes|news|database)\//u.test(pathname)) return "content-hub";
	return "unknown";
}
function pageTarget(pathname) {
	const segments = pathname.split("/").filter(Boolean);
	const localeOffset = isSiteLocale(segments[0]) ? 1 : 0;
	const section = segments[localeOffset];
	const slug = segments[localeOffset + 1];
	if (section === "database" && slug === "item" && /^[1-9]\d{0,17}$/u.test(segments[localeOffset + 2] ?? "")) return {
		targetKind: "item",
		targetKey: segments[localeOffset + 2]
	};
	if (section && slug && [
		"guides",
		"classes",
		"news",
		"database"
	].includes(section)) return {
		targetKind: "content",
		targetKey: `${section}/${slug}`
	};
	if (section === "tools" && slug) return {
		targetKind: "tool",
		targetKey: slug === "map" ? "interactive-map" : slug
	};
	return {
		targetKind: "none",
		targetKey: "none"
	};
}
function isAdminPath(pathname) {
	const segments = pathname?.split("/").filter(Boolean) ?? [];
	return segments[isSiteLocale(segments[0]) ? 1 : 0] === "admin";
}
function AnalyticsConsentManager() {
	const pathname = usePathname();
	const locale = routeLocale(pathname);
	const text = copy[locale];
	const [choice, setChoice] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const initialized = (0, import_react.useRef)(false);
	const lastPageViewKey = (0, import_react.useRef)(null);
	const previousPageLocation = (0, import_react.useRef)(null);
	const isAdmin = isAdminPath(pathname);
	(0, import_react.useEffect)(() => {
		const initialize = window.setTimeout(() => {
			setChoice(readAnalyticsConsent());
			setOpen(false);
			setReady(true);
			initialized.current = true;
		}, 0);
		return () => window.clearTimeout(initialize);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!initialized.current || choice !== "granted" || !pathname || isAdmin || !isProductionAnalyticsHost(window.location.hostname)) return;
		const pageLocation = `${window.location.origin}${pathname}${window.location.search}`;
		if (lastPageViewKey.current === pageLocation) return;
		const pageReferrer = previousPageLocation.current ?? document.referrer;
		lastPageViewKey.current = pageLocation;
		previousPageLocation.current = pageLocation;
		const target = pageTarget(pathname);
		collectJourneyEvent({
			event: "page_view",
			locale,
			service: "unknown",
			surface: pageViewSurface(pathname),
			...target
		});
		trackPageView({
			page_location: pageLocation,
			page_referrer: pageReferrer,
			page_title: document.title
		});
	}, [
		choice,
		isAdmin,
		locale,
		pathname
	]);
	const choose = (next) => {
		const previous = readAnalyticsConsent();
		if (next === "denied") {
			deleteStoredJourney();
			clearJourneyIdentity();
		}
		writeAnalyticsConsent(next);
		updateGoogleAnalyticsConsent(next);
		setChoice(next);
		setOpen(false);
		trackEvent("analytics_consent_update", {
			consent_state: next,
			previous_state: previous ?? "unset",
			surface: "privacy-consent"
		});
	};
	if (isAdmin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: AnalyticsConsentManager_module_default.backdrop,
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: AnalyticsConsentManager_module_default.panel,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "analytics-consent-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: AnalyticsConsentManager_module_default.closeButton,
					onClick: () => setOpen(false),
					type: "button",
					"aria-label": text.close,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: AnalyticsConsentManager_module_default.icon,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 24 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: AnalyticsConsentManager_module_default.eyebrow,
					children: text.eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "analytics-consent-title",
					children: text.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: AnalyticsConsentManager_module_default.body,
					children: text.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: AnalyticsConsentManager_module_default.current,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.saved }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: choice === "granted" ? text.granted : choice === "denied" ? text.denied : text.basic })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: AnalyticsConsentManager_module_default.actions,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: AnalyticsConsentManager_module_default.primary,
						onClick: () => choose("granted"),
						type: "button",
						children: text.accept
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: AnalyticsConsentManager_module_default.secondary,
						onClick: () => choose("denied"),
						type: "button",
						children: text.decline
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: AnalyticsConsentManager_module_default.privacyLink,
					href: `/${locale}/privacy/`,
					children: text.privacy
				})
			]
		})
	}) : ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		"aria-label": text.settings,
		className: AnalyticsConsentManager_module_default.settingsButton,
		onClick: () => {
			setOpen(true);
			trackEvent("analytics_preferences_open", { surface: "privacy-consent" });
		},
		type: "button",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.settings })]
	}) : null });
}
//#endregion
export { AnalyticsConsentManager };
