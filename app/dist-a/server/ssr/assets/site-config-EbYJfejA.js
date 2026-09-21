//#region app/site-config.ts
var siteLocales = [
	"zh-hans",
	"en",
	"fr",
	"de",
	"es",
	"ja",
	"pt-br",
	"ru",
	"ko",
	"zh-hant"
];
var siteLocaleConfig = {
	"zh-hans": {
		code: "zh-Hans",
		htmlLang: "zh-Hans",
		hrefLang: "zh-Hans",
		hreflang: "zh-Hans",
		openGraphLocale: "zh_CN",
		contentFallbackLocale: "en",
		mapDataLocale: "en",
		label: "简体中文",
		shortLabel: "简"
	},
	en: {
		code: "en",
		htmlLang: "en",
		hrefLang: "en",
		hreflang: "en",
		openGraphLocale: "en_US",
		contentFallbackLocale: "en",
		mapDataLocale: "en",
		label: "English",
		shortLabel: "EN"
	},
	fr: {
		code: "fr",
		htmlLang: "fr",
		hrefLang: "fr",
		hreflang: "fr",
		openGraphLocale: "fr_FR",
		contentFallbackLocale: "en",
		mapDataLocale: "en",
		label: "Français",
		shortLabel: "FR"
	},
	de: {
		code: "de",
		htmlLang: "de",
		hrefLang: "de",
		hreflang: "de",
		openGraphLocale: "de_DE",
		contentFallbackLocale: "en",
		mapDataLocale: "en",
		label: "Deutsch",
		shortLabel: "DE"
	},
	es: {
		code: "es-ES",
		htmlLang: "es-ES",
		hrefLang: "es-ES",
		hreflang: "es-ES",
		openGraphLocale: "es_ES",
		contentFallbackLocale: "en",
		mapDataLocale: "en",
		label: "Español (España)",
		shortLabel: "ES"
	},
	ja: {
		code: "ja",
		htmlLang: "ja",
		hrefLang: "ja",
		hreflang: "ja",
		openGraphLocale: "ja_JP",
		contentFallbackLocale: "en",
		mapDataLocale: "en",
		label: "日本語",
		shortLabel: "日"
	},
	"pt-br": {
		code: "pt-BR",
		htmlLang: "pt-BR",
		hrefLang: "pt-BR",
		hreflang: "pt-BR",
		openGraphLocale: "pt_BR",
		contentFallbackLocale: "en",
		mapDataLocale: "en",
		label: "Português (Brasil)",
		shortLabel: "PT"
	},
	ru: {
		code: "ru",
		htmlLang: "ru",
		hrefLang: "ru",
		hreflang: "ru",
		openGraphLocale: "ru_RU",
		contentFallbackLocale: "en",
		mapDataLocale: "en",
		label: "Русский",
		shortLabel: "RU"
	},
	ko: {
		code: "ko",
		htmlLang: "ko",
		hrefLang: "ko",
		hreflang: "ko",
		openGraphLocale: "ko_KR",
		contentFallbackLocale: "ko",
		mapDataLocale: "ko",
		label: "한국어",
		shortLabel: "한"
	},
	"zh-hant": {
		code: "zh-Hant",
		htmlLang: "zh-Hant",
		hrefLang: "zh-Hant",
		hreflang: "zh-Hant",
		openGraphLocale: "zh_TW",
		contentFallbackLocale: "zh-hant",
		mapDataLocale: "zh-Hant",
		label: "繁體中文",
		shortLabel: "繁"
	}
};
var siteNavigation = [
	{
		section: "home",
		labelKey: "Home",
		path: "/"
	},
	{
		section: "guides",
		labelKey: "Guides",
		path: "/guides/"
	},
	{
		section: "classes",
		labelKey: "Classes",
		path: "/classes/"
	},
	{
		section: "database",
		labelKey: "Database",
		path: "/database/"
	},
	{
		section: "tools",
		labelKey: "Tools",
		path: "/tools/"
	},
	{
		section: "codes",
		labelKey: "Codes",
		path: "/codes/"
	},
	{
		section: "news",
		labelKey: "News",
		path: "/news/"
	}
];
var siteFooterNavigation = [
	{
		key: "about",
		path: "/about/"
	},
	{
		key: "contact",
		path: "/contact/"
	},
	{
		key: "privacy",
		path: "/privacy/"
	},
	{
		key: "terms",
		path: "/terms/"
	}
];
var siteFooterNavigationCopy = {
	"zh-hans": {
		about: "关于本站",
		contact: "联系与更正",
		privacy: "隐私政策",
		terms: "使用条款"
	},
	en: {
		about: "About",
		contact: "Contact",
		privacy: "Privacy Policy",
		terms: "Terms of Use"
	},
	fr: {
		about: "À propos",
		contact: "Contact et corrections",
		privacy: "Politique de confidentialité",
		terms: "Conditions d’utilisation"
	},
	de: {
		about: "Über uns",
		contact: "Kontakt und Korrekturen",
		privacy: "Datenschutzerklärung",
		terms: "Nutzungsbedingungen"
	},
	es: {
		about: "Acerca de",
		contact: "Contacto y correcciones",
		privacy: "Política de privacidad",
		terms: "Condiciones de uso"
	},
	ja: {
		about: "このサイトについて",
		contact: "お問い合わせ・訂正",
		privacy: "プライバシーポリシー",
		terms: "利用規約"
	},
	"pt-br": {
		about: "Sobre",
		contact: "Contato e correções",
		privacy: "Política de Privacidade",
		terms: "Termos de Uso"
	},
	ru: {
		about: "О сайте",
		contact: "Связаться и сообщить об ошибке",
		privacy: "Политика конфиденциальности",
		terms: "Условия использования"
	},
	ko: {
		about: "사이트 소개",
		contact: "문의 및 정정",
		privacy: "개인정보처리방침",
		terms: "이용약관"
	},
	"zh-hant": {
		about: "關於本站",
		contact: "聯絡與更正",
		privacy: "隱私權政策",
		terms: "使用條款"
	}
};
var siteShellCopy = {
	"zh-hans": {
		navigation: {
			home: "首页",
			guides: "攻略",
			classes: "职业",
			database: "数据库",
			tools: "工具",
			codes: "兑换码",
			news: "新闻"
		},
		navigationLabel: "主导航",
		languageLabel: "语言",
		openMenu: "打开菜单",
		closeMenu: "关闭菜单",
		searchLabel: "搜索攻略、职业、资料和工具",
		searchPlaceholder: "搜索 AION2 KINA",
		searchButtonLabel: "搜索",
		skipToContent: "跳到主要内容",
		siteInformationLabel: "站点信息与政策",
		themeLabel: "选择界面主题",
		elyosTheme: "天族界面",
		asmodianTheme: "魔族界面",
		footerTagline: "在两个世界之间，找到你的路。",
		legalCopy: "面向全球玩家的独立粉丝资料站。AION2 及相关标志归 NC Corporation 所有；本站与 NC Corporation 无隶属或背书关系。",
		moreLabel: "更多"
	},
	en: {
		navigation: {
			home: "Home",
			guides: "Guides",
			classes: "Classes",
			database: "Database",
			tools: "Tools",
			codes: "Codes",
			news: "News"
		},
		navigationLabel: "Primary navigation",
		languageLabel: "Language",
		openMenu: "Open menu",
		closeMenu: "Close menu",
		searchLabel: "Search guides, classes, data, and tools",
		searchPlaceholder: "Search AION2 KINA",
		searchButtonLabel: "Search",
		skipToContent: "Skip to content",
		siteInformationLabel: "Site information and policies",
		themeLabel: "Choose interface theme",
		elyosTheme: "Elyos interface",
		asmodianTheme: "Asmodian interface",
		footerTagline: "Find your path between worlds.",
		legalCopy: "Independent fan resource for global players. AION2 and related marks belong to NC Corporation. Not affiliated with or endorsed by NC Corporation.",
		moreLabel: "More"
	},
	fr: {
		navigation: {
			home: "Accueil",
			guides: "Guides",
			classes: "Classes",
			database: "Base de données",
			tools: "Outils",
			codes: "Codes",
			news: "Actualités"
		},
		navigationLabel: "Navigation principale",
		languageLabel: "Langue",
		openMenu: "Ouvrir le menu",
		closeMenu: "Fermer le menu",
		searchLabel: "Rechercher des guides, classes, données et outils",
		searchPlaceholder: "Rechercher sur AION2 KINA",
		searchButtonLabel: "Rechercher",
		skipToContent: "Aller au contenu principal",
		siteInformationLabel: "Informations et politiques du site",
		themeLabel: "Choisir le thème de l’interface",
		elyosTheme: "Interface élyséenne",
		asmodianTheme: "Interface asmodienne",
		footerTagline: "Trouvez votre voie entre deux mondes.",
		legalCopy: "Ressource indépendante créée par des fans pour les joueurs du monde entier. AION2 et les marques associées appartiennent à NC Corporation. Ce site n’est ni affilié à ni approuvé par NC Corporation.",
		moreLabel: "Plus"
	},
	de: {
		navigation: {
			home: "Startseite",
			guides: "Guides",
			classes: "Klassen",
			database: "Datenbank",
			tools: "Tools",
			codes: "Codes",
			news: "Neuigkeiten"
		},
		navigationLabel: "Hauptnavigation",
		languageLabel: "Sprache",
		openMenu: "Menü öffnen",
		closeMenu: "Menü schließen",
		searchLabel: "Guides, Klassen, Daten und Tools durchsuchen",
		searchPlaceholder: "AION2 KINA durchsuchen",
		searchButtonLabel: "Suchen",
		skipToContent: "Zum Hauptinhalt springen",
		siteInformationLabel: "Website-Informationen und Richtlinien",
		themeLabel: "Oberflächendesign wählen",
		elyosTheme: "Elyos-Oberfläche",
		asmodianTheme: "Asmodier-Oberfläche",
		footerTagline: "Finde deinen Weg zwischen den Welten.",
		legalCopy: "Unabhängige Fan-Ressource für Spieler weltweit. AION2 und zugehörige Marken gehören NC Corporation. Diese Website ist weder mit NC Corporation verbunden noch wird sie von NC Corporation unterstützt.",
		moreLabel: "Mehr"
	},
	es: {
		navigation: {
			home: "Inicio",
			guides: "Guías",
			classes: "Clases",
			database: "Base de datos",
			tools: "Herramientas",
			codes: "Códigos",
			news: "Noticias"
		},
		navigationLabel: "Navegación principal",
		languageLabel: "Idioma",
		openMenu: "Abrir menú",
		closeMenu: "Cerrar menú",
		searchLabel: "Buscar guías, clases, datos y herramientas",
		searchPlaceholder: "Buscar en AION2 KINA",
		searchButtonLabel: "Buscar",
		skipToContent: "Ir al contenido principal",
		siteInformationLabel: "Información y políticas del sitio",
		themeLabel: "Elegir el tema de la interfaz",
		elyosTheme: "Interfaz elyos",
		asmodianTheme: "Interfaz asmodiana",
		footerTagline: "Encuentra tu camino entre dos mundos.",
		legalCopy: "Recurso independiente creado por fans para jugadores de todo el mundo. AION2 y las marcas relacionadas pertenecen a NC Corporation. Este sitio no está afiliado ni respaldado por NC Corporation.",
		moreLabel: "Más"
	},
	ja: {
		navigation: {
			home: "ホーム",
			guides: "攻略",
			classes: "クラス",
			database: "データベース",
			tools: "ツール",
			codes: "クーポンコード",
			news: "ニュース"
		},
		navigationLabel: "メインナビゲーション",
		languageLabel: "言語",
		openMenu: "メニューを開く",
		closeMenu: "メニューを閉じる",
		searchLabel: "攻略、クラス、データ、ツールを検索",
		searchPlaceholder: "AION2 KINA を検索",
		searchButtonLabel: "検索",
		skipToContent: "メインコンテンツへ移動",
		siteInformationLabel: "サイト情報とポリシー",
		themeLabel: "インターフェーステーマを選択",
		elyosTheme: "天族インターフェース",
		asmodianTheme: "魔族インターフェース",
		footerTagline: "二つの世界の間で、自分の道を見つけよう。",
		legalCopy: "世界中のプレイヤーに向けた独立系ファン情報サイトです。AION2 および関連する商標は NC Corporation に帰属します。当サイトは NC Corporation との提携・承認関係にありません。",
		moreLabel: "その他"
	},
	"pt-br": {
		navigation: {
			home: "Início",
			guides: "Guias",
			classes: "Classes",
			database: "Banco de dados",
			tools: "Ferramentas",
			codes: "Códigos",
			news: "Notícias"
		},
		navigationLabel: "Navegação principal",
		languageLabel: "Idioma",
		openMenu: "Abrir menu",
		closeMenu: "Fechar menu",
		searchLabel: "Pesquisar guias, classes, dados e ferramentas",
		searchPlaceholder: "Pesquisar no AION2 KINA",
		searchButtonLabel: "Pesquisar",
		skipToContent: "Ir para o conteúdo principal",
		siteInformationLabel: "Informações e políticas do site",
		themeLabel: "Escolher o tema da interface",
		elyosTheme: "Interface Elyos",
		asmodianTheme: "Interface Asmodian",
		footerTagline: "Encontre seu caminho entre dois mundos.",
		legalCopy: "Recurso independente criado por fãs para jogadores do mundo todo. AION2 e as marcas relacionadas pertencem à NC Corporation. Este site não é afiliado nem endossado pela NC Corporation.",
		moreLabel: "Mais"
	},
	ru: {
		navigation: {
			home: "Главная",
			guides: "Гайды",
			classes: "Классы",
			database: "База данных",
			tools: "Инструменты",
			codes: "Коды",
			news: "Новости"
		},
		navigationLabel: "Основная навигация",
		languageLabel: "Язык",
		openMenu: "Открыть меню",
		closeMenu: "Закрыть меню",
		searchLabel: "Поиск гайдов, классов, данных и инструментов",
		searchPlaceholder: "Поиск по AION2 KINA",
		searchButtonLabel: "Найти",
		skipToContent: "Перейти к основному содержанию",
		siteInformationLabel: "Информация о сайте и правила",
		themeLabel: "Выбрать тему интерфейса",
		elyosTheme: "Интерфейс элийцев",
		asmodianTheme: "Интерфейс асмодиан",
		footerTagline: "Найдите свой путь между двумя мирами.",
		legalCopy: "Независимый фанатский ресурс для игроков со всего мира. AION2 и связанные с ней товарные знаки принадлежат NC Corporation. Сайт не связан с NC Corporation и не поддерживается ею.",
		moreLabel: "Ещё"
	},
	ko: {
		navigation: {
			home: "홈",
			guides: "공략",
			classes: "직업",
			database: "데이터베이스",
			tools: "도구",
			codes: "쿠폰",
			news: "뉴스"
		},
		navigationLabel: "주요 내비게이션",
		languageLabel: "언어",
		openMenu: "메뉴 열기",
		closeMenu: "메뉴 닫기",
		searchLabel: "공략, 직업, 데이터와 도구 검색",
		searchPlaceholder: "AION2 KINA 검색",
		searchButtonLabel: "검색",
		skipToContent: "본문으로 이동",
		siteInformationLabel: "사이트 정보 및 정책",
		themeLabel: "인터페이스 테마 선택",
		elyosTheme: "천족 인터페이스",
		asmodianTheme: "마족 인터페이스",
		footerTagline: "두 세계 사이에서 나만의 길을 찾으세요.",
		legalCopy: "글로벌 플레이어를 위한 독립 팬 자료입니다. AION2와 관련 표시는 NC Corporation의 자산이며, 본 사이트는 NC Corporation과 제휴하거나 보증을 받지 않습니다.",
		moreLabel: "더보기"
	},
	"zh-hant": {
		navigation: {
			home: "首頁",
			guides: "攻略",
			classes: "職業",
			database: "資料庫",
			tools: "工具",
			codes: "兌換碼",
			news: "新聞"
		},
		navigationLabel: "主要導覽",
		languageLabel: "語言",
		openMenu: "開啟選單",
		closeMenu: "關閉選單",
		searchLabel: "搜尋攻略、職業、資料與工具",
		searchPlaceholder: "搜尋 AION2 KINA",
		searchButtonLabel: "搜尋",
		skipToContent: "跳至主要內容",
		siteInformationLabel: "站務資訊與政策",
		themeLabel: "選擇介面主題",
		elyosTheme: "天族介面",
		asmodianTheme: "魔族介面",
		footerTagline: "在兩個世界之間找到你的路。",
		legalCopy: "面向全球玩家的獨立粉絲資料站。AION2 與相關標誌屬於 NC Corporation；本站與 NC Corporation 無隸屬或背書關係。",
		moreLabel: "更多"
	}
};
var EXTERNAL_HREF = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;
function splitHref(href) {
	const tailIndex = [href.indexOf("?"), href.indexOf("#")].filter((index) => index >= 0).reduce((first, index) => Math.min(first, index), Number.POSITIVE_INFINITY);
	if (!Number.isFinite(tailIndex)) return {
		pathname: href,
		tail: ""
	};
	return {
		pathname: href.slice(0, tailIndex),
		tail: href.slice(tailIndex)
	};
}
function normalizePathname(pathname) {
	return (pathname.startsWith("/") ? pathname : `/${pathname}`).replace(/\/{2,}/g, "/") || "/";
}
function withoutLocalePrefix(pathname) {
	const normalized = normalizePathname(pathname);
	const segments = normalized.split("/");
	if (!isSiteLocale(segments[1])) return normalized;
	const remainder = `/${segments.slice(2).join("/")}`;
	return remainder === "/" ? "/" : remainder;
}
function withCanonicalTrailingSlash(pathname) {
	if (pathname === "/" || pathname.endsWith("/")) return pathname;
	return pathname.slice(pathname.lastIndexOf("/") + 1).includes(".") ? pathname : `${pathname}/`;
}
function isSiteLocale(value) {
	return siteLocales.includes(value);
}
/** Resolve which fully maintained content language a public locale should use. */
function resolveContentLocale(locale) {
	return siteLocaleConfig[locale].contentFallbackLocale;
}
/**
* Resolve localized content without requiring every record to duplicate placeholder
* translations. Public locale copy wins, followed by its maintained content fallback
* and then English.
*/
function resolveLocalizedCopy(record, locale) {
	const localized = record[locale];
	if (localized !== void 0) return localized;
	const fallback = record[resolveContentLocale(locale)];
	if (fallback !== void 0) return fallback;
	const english = record.en;
	if (english !== void 0) return english;
	throw new Error(`No localized copy or fallback is available for "${locale}".`);
}
/** Add or replace the locale prefix on an internal site URL. */
function localizedHref(locale, href = "/") {
	if (EXTERNAL_HREF.test(href) || href.startsWith("#")) return href;
	const { pathname, tail } = splitHref(href.trim());
	return `/${locale}${withCanonicalTrailingSlash(withoutLocalePrefix(pathname || "/"))}${tail}`;
}
function getSectionHref(locale, section) {
	return localizedHref(locale, siteNavigation.find((entry) => entry.section === section)?.path ?? "/");
}
function replaceLocaleInPath(pathname, locale) {
	return localizedHref(locale, pathname);
}
function getLocaleFromPathname(pathname) {
	const value = splitHref(pathname).pathname;
	if (EXTERNAL_HREF.test(value)) try {
		return getLocaleFromPathname(new URL(value).pathname);
	} catch {
		return null;
	}
	const segment = normalizePathname(value).split("/")[1];
	return isSiteLocale(segment) ? segment : null;
}
function getActiveSection(pathname) {
	const value = splitHref(pathname).pathname;
	const firstSegment = withoutLocalePrefix(value || "/").split("/").filter(Boolean)[0];
	if (!firstSegment) return "home";
	return siteNavigation.find((entry) => entry.section !== "home" && entry.section === firstSegment)?.section ?? null;
}
//#endregion
export { localizedHref as a, resolveLocalizedCopy as c, siteLocaleConfig as d, siteLocales as f, isSiteLocale as i, siteFooterNavigation as l, siteShellCopy as m, getLocaleFromPathname as n, replaceLocaleInPath as o, siteNavigation as p, getSectionHref as r, resolveContentLocale as s, getActiveSection as t, siteFooterNavigationCopy as u };
