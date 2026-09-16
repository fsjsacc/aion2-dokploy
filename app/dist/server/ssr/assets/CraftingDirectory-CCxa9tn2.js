import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { d as siteLocaleConfig } from "./site-config-EbYJfejA.js";
import { t as ChevronLeft } from "./chevron-left-C4SvgscM.js";
import { t as ChevronRight } from "./chevron-right-DJtAFs5y.js";
import { t as RotateCcw } from "./rotate-ccw-CkEJYLzG.js";
import { n as Search, t as SlidersHorizontal } from "./sliders-horizontal-D1Zy5v40.js";
import { t as PackageSearch } from "./package-search-le2u6vZu.js";
//#region app/_components/tools/CraftingDirectory.module.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var CraftingDirectory_module_default = {
	directory: "_directory_iihc9_1",
	summaryRail: "_summaryRail_iihc9_24",
	searchField: "_searchField_iihc9_48",
	filters: "_filters_iihc9_49",
	filterHeading: "_filterHeading_iihc9_50",
	resultHeader: "_resultHeader_iihc9_51",
	controlPanel: "_controlPanel_iihc9_64",
	searchInput: "_searchInput_iihc9_79",
	emptyState: "_emptyState_iihc9_133",
	desktopTable: "_desktopTable_iihc9_209",
	recipeIdentity: "_recipeIdentity_iihc9_261",
	mobileCardBody: "_mobileCardBody_iihc9_285",
	itemIcon: "_itemIcon_iihc9_290",
	grade: "_grade_iihc9_316",
	mobileMeta: "_mobileMeta_iihc9_317",
	idLink: "_idLink_iihc9_334",
	mobileCards: "_mobileCards_iihc9_351",
	pagination: "_pagination_iihc9_380",
	pageArrow: "_pageArrow_iihc9_388",
	pageNumbers: "_pageNumbers_iihc9_389",
	ellipsis: "_ellipsis_iihc9_429",
	mobilePageLabel: "_mobilePageLabel_iihc9_435",
	mobileCard: "_mobileCard_iihc9_285",
	mobileCardTitle: "_mobileCardTitle_iihc9_475"
};
//#endregion
//#region app/_components/tools/CraftingDirectory.tsx
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 24;
var craftingDirectoryCopy = {
	"zh-hant": {
		searchLabel: "搜尋製作配方",
		searchPlaceholder: "搜尋成品、專業、分類或物品 ID",
		filtersTitle: "篩選配方",
		allProfessions: "全部專業",
		allGrades: "全部品級",
		allCategories: "全部分類",
		allMastery: "全部熟練度",
		profession: "製作專業",
		grade: "成品品級",
		category: "成品分類",
		mastery: "熟練度",
		reset: "清除篩選",
		total: "全部配方",
		filtered: "目前結果",
		professions: "製作專業",
		results: (count) => `${count.toLocaleString("zh-Hant")} 個配方`,
		resultRange: (start, end, total) => `顯示第 ${start.toLocaleString("zh-Hant")}–${end.toLocaleString("zh-Hant")} 個，共 ${total.toLocaleString("zh-Hant")} 個`,
		recipe: "配方",
		itemId: "物品 ID",
		openRecipe: (name) => `開啟「${name}」材料計算器`,
		emptyTitle: "找不到符合條件的配方",
		emptyBody: "請縮短搜尋文字，或清除一項篩選條件後再試。",
		previous: "上一頁",
		next: "下一頁",
		pageLabel: (page, total) => `第 ${page} 頁，共 ${total} 頁`,
		goToPage: (page) => `前往第 ${page} 頁`,
		imageAlt: (name) => `${name} 圖示`,
		level: (value) => `Lv. ${value}`,
		unknown: "未分類"
	},
	en: {
		searchLabel: "Search crafting recipes",
		searchPlaceholder: "Search output, profession, category, or item ID",
		filtersTitle: "Filter recipes",
		allProfessions: "All professions",
		allGrades: "All grades",
		allCategories: "All categories",
		allMastery: "All mastery levels",
		profession: "Profession",
		grade: "Output grade",
		category: "Output category",
		mastery: "Mastery",
		reset: "Clear filters",
		total: "All recipes",
		filtered: "Current results",
		professions: "Professions",
		results: (count) => `${count.toLocaleString("en")} recipes`,
		resultRange: (start, end, total) => `Showing ${start.toLocaleString("en")}–${end.toLocaleString("en")} of ${total.toLocaleString("en")}`,
		recipe: "Recipe",
		itemId: "Item ID",
		openRecipe: (name) => `Open the material calculator for ${name}`,
		emptyTitle: "No matching recipes",
		emptyBody: "Try a shorter search or clear one of the filters.",
		previous: "Previous",
		next: "Next",
		pageLabel: (page, total) => `Page ${page} of ${total}`,
		goToPage: (page) => `Go to page ${page}`,
		imageAlt: (name) => `${name} icon`,
		level: (value) => `Lv. ${value}`,
		unknown: "Uncategorized"
	},
	"zh-hans": {
		searchLabel: "搜索制作配方",
		searchPlaceholder: "搜索成品、专业、分类或物品 ID",
		filtersTitle: "筛选配方",
		allProfessions: "全部专业",
		allGrades: "全部品级",
		allCategories: "全部分类",
		allMastery: "全部熟练度",
		profession: "制作专业",
		grade: "成品品级",
		category: "成品分类",
		mastery: "熟练度",
		reset: "清除筛选",
		total: "全部配方",
		filtered: "当前结果",
		professions: "制作专业",
		results: (count) => `${count.toLocaleString("zh-Hans")} 个配方`,
		resultRange: (start, end, total) => `显示第 ${start.toLocaleString("zh-Hans")}–${end.toLocaleString("zh-Hans")} 个，共 ${total.toLocaleString("zh-Hans")} 个`,
		recipe: "配方",
		itemId: "物品 ID",
		openRecipe: (name) => `打开「${name}」材料计算器`,
		emptyTitle: "找不到符合条件的配方",
		emptyBody: "请缩短搜索文字，或清除一项筛选条件后再试。",
		previous: "上一页",
		next: "下一页",
		pageLabel: (page, total) => `第 ${page} 页，共 ${total} 页`,
		goToPage: (page) => `前往第 ${page} 页`,
		imageAlt: (name) => `${name} 图标`,
		level: (value) => `Lv. ${value}`,
		unknown: "未分类"
	},
	"de": {
		searchLabel: "Herstellungsrezepte suchen",
		searchPlaceholder: "Erzeugnis, Beruf, Kategorie oder Gegenstands-ID",
		filtersTitle: "Rezepte filtern",
		allProfessions: "Alle Berufe",
		allGrades: "Alle Qualitätsstufen",
		allCategories: "Alle Kategorien",
		allMastery: "Alle Fertigkeitsstufen",
		profession: "Beruf",
		grade: "Qualität des Erzeugnisses",
		category: "Kategorie des Erzeugnisses",
		mastery: "Fertigkeitsstufe",
		reset: "Filter löschen",
		total: "Alle Rezepte",
		filtered: "Aktuelle Ergebnisse",
		professions: "Berufe",
		results: (count) => `${count.toLocaleString("de-DE")} Rezepte`,
		resultRange: (start, end, total) => `${start.toLocaleString("de-DE")}–${end.toLocaleString("de-DE")} von ${total.toLocaleString("de-DE")} werden angezeigt`,
		recipe: "Rezept",
		itemId: "Gegenstands-ID",
		openRecipe: (name) => `Materialrechner für ${name} öffnen`,
		emptyTitle: "Keine passenden Rezepte",
		emptyBody: "Versuchen Sie eine kürzere Suche oder löschen Sie einen der Filter.",
		previous: "Zurück",
		next: "Weiter",
		pageLabel: (page, total) => `Seite ${page} von ${total}`,
		goToPage: (page) => `Zu Seite ${page} wechseln`,
		imageAlt: (name) => `Symbol für ${name}`,
		level: (value) => `Lv. ${value}`,
		unknown: "Nicht kategorisiert"
	},
	"fr": {
		searchLabel: "Rechercher des recettes de fabrication",
		searchPlaceholder: "Rechercher un produit, un métier, une catégorie ou un ID d’objet",
		filtersTitle: "Filtrer les recettes",
		allProfessions: "Toutes les professions",
		allGrades: "Tous les grades",
		allCategories: "Toutes catégories",
		allMastery: "Tous niveaux de maîtrise",
		profession: "Profession",
		grade: "Qualité du produit",
		category: "Catégorie du produit",
		mastery: "Maîtrise",
		reset: "Effacer les filtres",
		total: "Toutes les recettes",
		filtered: "Résultats actuels",
		professions: "Professions",
		results: (count) => `${count.toLocaleString("fr-FR")} recettes`,
		resultRange: (start, end, total) => `Affichage de ${start.toLocaleString("fr-FR")}–${end.toLocaleString("fr-FR")} de ${total.toLocaleString("fr-FR")}`,
		recipe: "Recette",
		itemId: "ID d’objet",
		openRecipe: (name) => `Ouvrir la calculatrice de matériaux pour ${name}`,
		emptyTitle: "Pas de recettes correspondantes",
		emptyBody: "Essayez une recherche plus courte ou videz l'un des filtres.",
		previous: "Précédent",
		next: "Suivant",
		pageLabel: (page, total) => `Page ${page} de ${total}`,
		goToPage: (page) => `Aller à la page ${page}`,
		imageAlt: (name) => `icône ${name}`,
		level: (value) => `Lv. ${value}`,
		unknown: "Non classé"
	},
	"es": {
		searchLabel: "Buscar recetas de fabricación",
		searchPlaceholder: "Buscar producto, profesión, categoría o ID de objeto",
		filtersTitle: "Filtrar recetas",
		allProfessions: "Todas las profesiones",
		allGrades: "Todas las calificaciones",
		allCategories: "Todas las categorías",
		allMastery: "Todos los niveles de maestría",
		profession: "Profesión",
		grade: "Grado del producto",
		category: "Categoría del producto",
		mastery: "Maestría",
		reset: "Borrar filtros",
		total: "Todas las recetas",
		filtered: "Resultados actuales",
		professions: "Profesiones",
		results: (count) => `${count.toLocaleString("es-ES")} recetas`,
		resultRange: (start, end, total) => `Mostrando ${start.toLocaleString("es-ES")}–${end.toLocaleString("es-ES")} de ${total.toLocaleString("es-ES")}`,
		recipe: "Receta",
		itemId: "ID del objeto",
		openRecipe: (name) => `Abrir la calculadora de materiales de ${name}`,
		emptyTitle: "No hay recetas que coincidan",
		emptyBody: "Pruebe una búsqueda más corta o despeje uno de los filtros.",
		previous: "Anterior",
		next: "Siguiente",
		pageLabel: (page, total) => `Página ${page} de ${total}`,
		goToPage: (page) => `Ir a la página ${page}`,
		imageAlt: (name) => `Icono de ${name}`,
		level: (value) => `Lv. ${value}`,
		unknown: "Sin categorizar"
	},
	"ja": {
		searchLabel: "製作レシピを検索",
		searchPlaceholder: "完成品、製作職、カテゴリ、アイテムIDを検索",
		filtersTitle: "レシピを絞り込む",
		allProfessions: "すべての製作職",
		allGrades: "すべてのグレード",
		allCategories: "すべてのカテゴリ",
		allMastery: "すべての熟練度",
		profession: "製作職",
		grade: "完成品グレード",
		category: "完成品カテゴリ",
		mastery: "熟練度",
		reset: "絞り込みを解除",
		total: "全レシピ",
		filtered: "現在の結果",
		professions: "製作職",
		results: (count) => `${count.toLocaleString("ja-JP")}件のレシピ`,
		resultRange: (start, end, total) => `全${total.toLocaleString("ja-JP")}件中${start.toLocaleString("ja-JP")}～${end.toLocaleString("ja-JP")}件を表示`,
		recipe: "レシピ",
		itemId: "アイテムID",
		openRecipe: (name) => `${name}の材料計算機を開く`,
		emptyTitle: "条件に一致するレシピはありません",
		emptyBody: "検索語を短くするか、絞り込み条件を解除してください。",
		previous: "前へ",
		next: "次へ",
		pageLabel: (page, total) => `${total}ページ中${page}ページ`,
		goToPage: (page) => `${page}ページへ移動`,
		imageAlt: (name) => `${name}のアイコン`,
		level: (value) => `Lv. ${value}`,
		unknown: "未分類"
	},
	"pt-br": {
		searchLabel: "Buscar receitas de fabricação",
		searchPlaceholder: "Buscar produto, profissão, categoria ou ID do item",
		filtersTitle: "Filtrar receitas",
		allProfessions: "Todas as profissões",
		allGrades: "Todos os graus de qualidade",
		allCategories: "Todas as categorias",
		allMastery: "Todos os níveis de proficiência",
		profession: "Profissão",
		grade: "Grau do produto",
		category: "Categoria do produto",
		mastery: "Proficiência",
		reset: "Limpar os filtros",
		total: "Todas as receitas",
		filtered: "Resultados atuais",
		professions: "Profissões",
		results: (count) => `${count.toLocaleString("pt-BR")} receitas`,
		resultRange: (start, end, total) => `Mostrando ${start.toLocaleString("pt-BR")}–${end.toLocaleString("pt-BR")} de ${total.toLocaleString("pt-BR")}`,
		recipe: "Receita",
		itemId: "Item ID",
		openRecipe: (name) => `Abrir a calculadora de materiais de ${name}`,
		emptyTitle: "Sem receitas correspondentes",
		emptyBody: "Tente uma pesquisa mais curta ou limpe um dos filtros.",
		previous: "Anterior",
		next: "Próximo",
		pageLabel: (page, total) => `Página ${page} de ${total}`,
		goToPage: (page) => `Ir para a página ${page}`,
		imageAlt: (name) => `Ícone de ${name}`,
		level: (value) => `Lv. ${value}`,
		unknown: "Sem categoria"
	},
	"ru": {
		searchLabel: "Поиск рецептов изготовления",
		searchPlaceholder: "Название, профессия, категория или ID предмета",
		filtersTitle: "Фильтры рецептов",
		allProfessions: "Все профессии",
		allGrades: "Все категории качества",
		allCategories: "Все категории",
		allMastery: "Все уровни мастерства",
		profession: "Профессия",
		grade: "Качество результата",
		category: "Категория результата",
		mastery: "Мастерство",
		reset: "Сбросить фильтры",
		total: "Все рецепты",
		filtered: "Текущие результаты",
		professions: "Профессии",
		results: (count) => `${count.toLocaleString("ru-RU")} рецептов`,
		resultRange: (start, end, total) => `Показаны ${start.toLocaleString("ru-RU")}–${end.toLocaleString("ru-RU")} из ${total.toLocaleString("ru-RU")}`,
		recipe: "Рецепт",
		itemId: "ID предмета",
		openRecipe: (name) => `Открыть калькулятор материалов для ${name}`,
		emptyTitle: "Подходящих рецептов нет",
		emptyBody: "Сократите поисковый запрос или сбросьте один из фильтров.",
		previous: "Назад",
		next: "Далее",
		pageLabel: (page, total) => `Страница ${page} из ${total}`,
		goToPage: (page) => `Перейти на страницу ${page}`,
		imageAlt: (name) => `Значок ${name}`,
		level: (value) => `Lv. ${value}`,
		unknown: "Без категории"
	},
	ko: {
		searchLabel: "제작 레시피 검색",
		searchPlaceholder: "결과물, 전문 기술, 분류 또는 아이템 ID 검색",
		filtersTitle: "레시피 필터",
		allProfessions: "모든 전문 기술",
		allGrades: "모든 등급",
		allCategories: "모든 분류",
		allMastery: "모든 숙련도",
		profession: "전문 기술",
		grade: "결과물 등급",
		category: "결과물 분류",
		mastery: "숙련도",
		reset: "필터 초기화",
		total: "전체 레시피",
		filtered: "현재 결과",
		professions: "전문 기술",
		results: (count) => `레시피 ${count.toLocaleString("ko-KR")}개`,
		resultRange: (start, end, total) => `${total.toLocaleString("ko-KR")}개 중 ${start.toLocaleString("ko-KR")}–${end.toLocaleString("ko-KR")}개 표시`,
		recipe: "레시피",
		itemId: "아이템 ID",
		openRecipe: (name) => `${name} 재료 계산기 열기`,
		emptyTitle: "조건에 맞는 레시피가 없습니다",
		emptyBody: "검색어를 줄이거나 필터를 하나 해제해 보세요.",
		previous: "이전",
		next: "다음",
		pageLabel: (page, total) => `${total}페이지 중 ${page}페이지`,
		goToPage: (page) => `${page}페이지로 이동`,
		imageAlt: (name) => `${name} 아이콘`,
		level: (value) => `Lv. ${value}`,
		unknown: "미분류"
	}
};
function normalizeSearch(value) {
	return value.normalize("NFKC").trim().toLocaleLowerCase();
}
function compareLabels(locale, left, right) {
	return left.localeCompare(right, siteLocaleConfig[locale].code, {
		numeric: true,
		sensitivity: "base"
	});
}
function uniqueLabels(entries, select, locale) {
	const values = entries.map(select).filter((value) => Boolean(value));
	return [...new Set(values)].sort((left, right) => compareLabels(locale, left, right));
}
function gradeTone(value) {
	const normalized = normalizeSearch(value);
	if (/myth|신화|神話|神话/u.test(normalized)) return "mythic";
	if (/legend|전설|傳說|传说/u.test(normalized)) return "legendary";
	if (/unique|유일|유니크|獨特|独特/u.test(normalized)) return "unique";
	if (/epic|영웅|史詩|史诗/u.test(normalized)) return "epic";
	if (/rare|희귀|稀有/u.test(normalized)) return "rare";
	return "normal";
}
function recipeHref(locale, recipeId) {
	return `/${locale}/tools/material-calculator/recipe/${encodeURIComponent(recipeId)}/`;
}
function pageHref(page) {
	return page > 1 ? `?page=${page}` : "?";
}
function paginationItems(page, pageCount) {
	const visible = [...new Set([
		1,
		pageCount,
		page - 1,
		page,
		page + 1
	])].filter((value) => value >= 1 && value <= pageCount).sort((left, right) => left - right);
	const result = [];
	visible.forEach((value, index) => {
		if (index > 0 && value - visible[index - 1] > 1) result.push("ellipsis");
		result.push(value);
	});
	return result;
}
function CraftingDirectory({ entries, locale, initialPage = 1 }) {
	const text = craftingDirectoryCopy[locale];
	const resultsId = (0, import_react.useId)();
	const resultsRef = (0, import_react.useRef)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [profession, setProfession] = (0, import_react.useState)("");
	const [grade, setGrade] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [mastery, setMastery] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(Math.max(1, Math.trunc(initialPage) || 1));
	const professions = (0, import_react.useMemo)(() => uniqueLabels(entries, (entry) => entry.profession, locale), [entries, locale]);
	const grades = (0, import_react.useMemo)(() => uniqueLabels(entries, (entry) => entry.gradeName, locale), [entries, locale]);
	const categories = (0, import_react.useMemo)(() => uniqueLabels(entries, (entry) => entry.categoryName, locale), [entries, locale]);
	const masteryLevels = (0, import_react.useMemo)(() => [...new Set(entries.map((entry) => entry.masteryLevel).filter((value) => value !== null))].sort((left, right) => left - right), [entries]);
	const normalizedQuery = normalizeSearch(query);
	const filteredEntries = (0, import_react.useMemo)(() => entries.filter((entry) => {
		if (profession && entry.profession !== profession) return false;
		if (grade && entry.gradeName !== grade) return false;
		if (category && entry.categoryName !== category) return false;
		if (mastery && String(entry.masteryLevel ?? "") !== mastery) return false;
		if (!normalizedQuery) return true;
		return normalizeSearch([
			entry.name,
			entry.outputItemId,
			entry.profession,
			entry.gradeName,
			entry.categoryName,
			entry.masteryLevel === null ? "" : String(entry.masteryLevel)
		].join(" ")).includes(normalizedQuery);
	}), [
		category,
		entries,
		grade,
		mastery,
		normalizedQuery,
		profession
	]);
	const pageCount = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
	const safePage = Math.min(page, pageCount);
	const pageEntries = filteredEntries.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
	const rangeStart = filteredEntries.length ? (safePage - 1) * PAGE_SIZE + 1 : 0;
	const rangeEnd = Math.min(safePage * PAGE_SIZE, filteredEntries.length);
	const hasFilters = Boolean(query || profession || grade || category || mastery);
	(0, import_react.useEffect)(() => {
		const onPopState = () => {
			const value = Number.parseInt(new URL(window.location.href).searchParams.get("page") ?? "1", 10);
			setPage(Number.isFinite(value) && value > 0 ? value : 1);
		};
		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, []);
	const resetToFirstPage = () => {
		setPage(1);
		if (window.location.search) window.history.replaceState({
			...window.history.state,
			craftingPage: 1
		}, "", pageHref(1));
	};
	const resetFilters = () => {
		setQuery("");
		setProfession("");
		setGrade("");
		setCategory("");
		setMastery("");
		resetToFirstPage();
	};
	const changePage = (nextPage, event) => {
		event?.preventDefault();
		const clamped = Math.max(1, Math.min(nextPage, pageCount));
		if (clamped === safePage) return;
		setPage(clamped);
		const href = pageHref(clamped);
		window.history.pushState({
			...window.history.state,
			craftingPage: clamped
		}, "", href);
		window.requestAnimationFrame(() => {
			resultsRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: CraftingDirectory_module_default.directory,
		"aria-labelledby": `${resultsId}-title`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: CraftingDirectory_module_default.summaryRail,
				"aria-label": text.filtersTitle,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.total }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: entries.length.toLocaleString(locale) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.filtered }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: filteredEntries.length.toLocaleString(locale) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.professions }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: professions.length.toLocaleString(locale) })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: CraftingDirectory_module_default.controlPanel,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: CraftingDirectory_module_default.searchField,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.searchLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: CraftingDirectory_module_default.searchInput,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"aria-hidden": "true",
								size: 19,
								strokeWidth: 1.7
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								autoComplete: "off",
								maxLength: 120,
								onChange: (event) => {
									setQuery(event.target.value);
									resetToFirstPage();
								},
								placeholder: text.searchPlaceholder,
								type: "search",
								value: query
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: CraftingDirectory_module_default.filterHeading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
							"aria-hidden": "true",
							size: 15
						}), text.filtersTitle] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: !hasFilters,
							onClick: resetFilters,
							type: "button",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
								"aria-hidden": "true",
								size: 14
							}), text.reset]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: CraftingDirectory_module_default.filters,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.profession }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								onChange: (event) => {
									setProfession(event.target.value);
									resetToFirstPage();
								},
								value: profession,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: text.allProfessions
								}), professions.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: value }, value))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.grade }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								onChange: (event) => {
									setGrade(event.target.value);
									resetToFirstPage();
								},
								value: grade,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: text.allGrades
								}), grades.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: value }, value))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.category }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								onChange: (event) => {
									setCategory(event.target.value);
									resetToFirstPage();
								},
								value: category,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: text.allCategories
								}), categories.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: value }, value))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.mastery }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								onChange: (event) => {
									setMastery(event.target.value);
									resetToFirstPage();
								},
								value: mastery,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: text.allMastery
								}), masteryLevels.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value,
									children: text.level(value)
								}, value))]
							})] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: CraftingDirectory_module_default.resultHeader,
				ref: resultsRef,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text.filtered }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: `${resultsId}-title`,
					children: text.results(filteredEntries.length)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", {
					"aria-live": "polite",
					children: text.resultRange(rangeStart, rangeEnd, filteredEntries.length)
				})]
			}),
			pageEntries.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: CraftingDirectory_module_default.desktopTable,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: text.recipe }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: text.profession }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: text.category }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: text.grade }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: text.mastery }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: text.itemId })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: pageEntries.map((entry) => {
					const href = recipeHref(locale, entry.recipeId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "row",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: CraftingDirectory_module_default.recipeIdentity,
								href,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: CraftingDirectory_module_default.itemIcon,
									"data-grade": gradeTone(entry.gradeName),
									children: entry.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										alt: text.imageAlt(entry.name),
										height: "52",
										loading: "lazy",
										referrerPolicy: "no-referrer",
										src: entry.imageUrl,
										width: "52"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageSearch, {
										"aria-hidden": "true",
										size: 22
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: entry.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: entry.gradeName || text.unknown })] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: entry.profession || text.unknown }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: entry.categoryName || text.unknown }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: CraftingDirectory_module_default.grade,
							"data-grade": gradeTone(entry.gradeName),
							children: entry.gradeName || text.unknown
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: entry.masteryLevel === null ? text.unknown : text.level(entry.masteryLevel) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							"aria-label": text.openRecipe(entry.name),
							className: CraftingDirectory_module_default.idLink,
							href,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.outputItemId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								"aria-hidden": "true",
								size: 16
							})]
						}) })
					] }, entry.recipeId);
				}) })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: CraftingDirectory_module_default.mobileCards,
				children: pageEntries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					"aria-label": text.openRecipe(entry.name),
					className: CraftingDirectory_module_default.mobileCard,
					href: recipeHref(locale, entry.recipeId),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: CraftingDirectory_module_default.itemIcon,
						"data-grade": gradeTone(entry.gradeName),
						children: entry.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							alt: text.imageAlt(entry.name),
							height: "56",
							loading: "lazy",
							referrerPolicy: "no-referrer",
							src: entry.imageUrl,
							width: "56"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageSearch, {
							"aria-hidden": "true",
							size: 23
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: CraftingDirectory_module_default.mobileCardBody,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: CraftingDirectory_module_default.mobileCardTitle,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: entry.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
									"aria-hidden": "true",
									size: 18
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: CraftingDirectory_module_default.mobileMeta,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										"data-grade": gradeTone(entry.gradeName),
										children: entry.gradeName || text.unknown
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.profession || text.unknown }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.categoryName || text.unknown }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.masteryLevel === null ? text.unknown : text.level(entry.masteryLevel) })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								text.itemId,
								" ",
								entry.outputItemId
							] })
						]
					})]
				}, entry.recipeId))
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: CraftingDirectory_module_default.emptyState,
				role: "status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageSearch, {
						"aria-hidden": "true",
						size: 30
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: text.emptyTitle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text.emptyBody }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: !hasFilters,
						onClick: resetFilters,
						type: "button",
						children: text.reset
					})
				]
			}),
			filteredEntries.length > PAGE_SIZE ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: CraftingDirectory_module_default.pagination,
				"aria-label": text.pageLabel(safePage, pageCount),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						"aria-disabled": safePage === 1,
						className: CraftingDirectory_module_default.pageArrow,
						href: pageHref(Math.max(1, safePage - 1)),
						onClick: (event) => safePage > 1 && changePage(safePage - 1, event),
						tabIndex: safePage === 1 ? -1 : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"aria-hidden": "true",
							size: 17
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.previous })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: CraftingDirectory_module_default.pageNumbers,
						children: paginationItems(safePage, pageCount).map((item, index) => item === "ellipsis" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							className: CraftingDirectory_module_default.ellipsis,
							children: "…"
						}, `ellipsis-${index}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							"aria-current": item === safePage ? "page" : void 0,
							"aria-label": text.goToPage(item),
							href: pageHref(item),
							onClick: (event) => changePage(item, event),
							children: item
						}, item))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: CraftingDirectory_module_default.mobilePageLabel,
						children: text.pageLabel(safePage, pageCount)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						"aria-disabled": safePage === pageCount,
						className: CraftingDirectory_module_default.pageArrow,
						href: pageHref(Math.min(pageCount, safePage + 1)),
						onClick: (event) => safePage < pageCount && changePage(safePage + 1, event),
						tabIndex: safePage === pageCount ? -1 : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.next }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
							"aria-hidden": "true",
							size: 17
						})]
					})
				]
			}) : null
		]
	});
}
//#endregion
export { CraftingDirectory };
