import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-CU8j443B.js";
import { t as X } from "./x-Cgr92E5e.js";
import { a as localizedHref } from "./site-config-EbYJfejA.js";
import { t as ChevronLeft } from "./chevron-left-C4SvgscM.js";
import { t as ChevronRight } from "./chevron-right-DJtAFs5y.js";
import { t as RotateCcw } from "./rotate-ccw-CkEJYLzG.js";
import { n as Search, t as SlidersHorizontal } from "./sliders-horizontal-D1Zy5v40.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Star = createLucideIcon("star", [["path", {
	d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	key: "r04s7s"
}]]);
//#endregion
//#region app/database-type-registry.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var databaseClassDefinitions = [
	{
		id: "gladiator",
		labels: {
			"zh-hans": "剑星",
			en: "Gladiator",
			fr: "Gladiateur",
			de: "Gladiator",
			es: "Gladiador",
			ja: "グラディエーター",
			"pt-br": "Gladiador",
			ru: "Гладиатор",
			ko: "검성",
			"zh-hant": "劍星"
		}
	},
	{
		id: "templar",
		labels: {
			"zh-hans": "守护星",
			en: "Templar",
			fr: "Templier",
			de: "Templer",
			es: "Templario",
			ja: "テンプラー",
			"pt-br": "Templário",
			ru: "Страж",
			ko: "수호성",
			"zh-hant": "守護星"
		}
	},
	{
		id: "assassin",
		labels: {
			"zh-hans": "杀星",
			en: "Assassin",
			fr: "Assassin",
			de: "Assassine",
			es: "Asesino",
			ja: "アサシン",
			"pt-br": "Assassino",
			ru: "Убийца",
			ko: "살성",
			"zh-hant": "殺星"
		}
	},
	{
		id: "ranger",
		labels: {
			"zh-hans": "弓星",
			en: "Ranger",
			fr: "Rôdeur",
			de: "Jäger",
			es: "Arquero",
			ja: "レンジャー",
			"pt-br": "Patrulheiro",
			ru: "Стрелок",
			ko: "궁성",
			"zh-hant": "弓星"
		}
	},
	{
		id: "sorcerer",
		labels: {
			"zh-hans": "魔道星",
			en: "Sorcerer",
			fr: "Sorcier",
			de: "Zauberer",
			es: "Hechicero",
			ja: "ソーサラー",
			"pt-br": "Feiticeiro",
			ru: "Волшебник",
			ko: "마도성",
			"zh-hant": "魔道星"
		}
	},
	{
		id: "spiritmaster",
		labels: {
			"zh-hans": "精灵星",
			en: "Spiritmaster",
			fr: "Spiritualiste",
			de: "Beschwörer",
			es: "Maestro espiritual",
			ja: "スピリットマスター",
			"pt-br": "Mestre espiritual",
			ru: "Заклинатель",
			ko: "정령성",
			"zh-hant": "精靈星"
		}
	},
	{
		id: "cleric",
		labels: {
			"zh-hans": "治愈星",
			en: "Cleric",
			fr: "Clerc",
			de: "Kleriker",
			es: "Clérigo",
			ja: "クレリック",
			"pt-br": "Clérigo",
			ru: "Целитель",
			ko: "치유성",
			"zh-hant": "治癒星"
		}
	},
	{
		id: "chanter",
		labels: {
			"zh-hans": "护法星",
			en: "Chanter",
			fr: "Aède",
			de: "Kantor",
			es: "Cantor",
			ja: "チャンター",
			"pt-br": "Cantor",
			ru: "Чародей",
			ko: "호법성",
			"zh-hant": "護法星"
		}
	},
	{
		id: "brawler",
		labels: {
			"zh-hans": "拳星",
			en: "Brawler",
			fr: "Combattant",
			de: "Kämpfer",
			es: "Luchador",
			ja: "ブロウラー",
			"pt-br": "Lutador",
			ru: "Боец",
			ko: "권성",
			"zh-hant": "拳星"
		}
	}
];
//#endregion
//#region app/item-database-copy.ts
var itemDatabaseCatalogCopy = {
	"zh-hans": {
		seoTitle: "AION2 物品数据库：装备、材料与道具 ID 查询 | KINA",
		seoKeywords: [
			"AION2 物品数据库",
			"AION2 装备",
			"AION2 材料",
			"AION2 道具 ID"
		],
		breadcrumbLabel: "面包屑导航",
		eyebrow: "AION2 物品资料",
		title: "AION2 物品数据库",
		description: "搜索 10,910 件官方道具的 ID、名称、品级、分类、属性摘要与可交易状态。",
		sourceNote: "物品名称、图标、品级与详情依据 NC 公开的台湾、韩国及 en-US 物品资料整理，更新于 2026-07-19。",
		searchLabel: "搜索物品",
		searchPlaceholder: "输入物品名称或官方 ID",
		categoryLabel: "物品分类",
		allCategories: "全部分类",
		resultsLabel: (count) => `共 ${count} 件物品`,
		emptyTitle: "没有符合条件的物品",
		emptyDescription: "请尝试其他物品名称、官方 ID 或分类。",
		itemIdLabel: "物品 ID",
		levelLabel: "所需等级",
		restrictionLabel: "职业限制",
		officialSourceLabel: "查看官方资料",
		detailsLabel: "查看物品详情",
		clearLabel: "清除筛选",
		filterTitle: "搜索条件",
		filterOpenLabel: "打开筛选",
		filterCloseLabel: "关闭筛选",
		classFilterLabel: "职业",
		gradeFilterLabel: "品级",
		categoryFilterLabel: "分类",
		allLabel: "全部",
		resultsTitle: "搜索结果",
		bookmarksLabel: "查看收藏",
		showBookmarksLabel: "只看收藏",
		showAllItemsLabel: "显示全部物品",
		addBookmarkLabel: (name) => `收藏 ${name}`,
		removeBookmarkLabel: (name) => `取消收藏 ${name}`,
		columnNameLabel: "物品名称",
		columnCategoryLabel: "分类",
		columnDescriptionLabel: "说明",
		noBookmarksTitle: "尚未收藏任何物品",
		noBookmarksDescription: "点击物品前的星标，即可将常用物品保存在本机收藏中。",
		previousPageLabel: "上一页",
		nextPageLabel: "下一页",
		pageLabel: (page, total) => `第 ${page} / ${total} 页`,
		requestLoadingLabel: "正在更新官方搜索结果…",
		requestErrorLabel: "暂时无法更新结果，已保留上一批资料。",
		retryLabel: "重试",
		noClassRestrictionLabel: "无职业限制",
		itemImageAlt: (name, category) => `${name} ${category} AION2 物品图标`,
		featuredEyebrow: "精选物品资料",
		featuredTitle: "精选 AION2 物品详情",
		featuredDescription: "浏览 12 个已核对的物品页面，查看官方物品 ID、品级、分类、属性与资料来源。",
		featuredDetailsLabel: "查看完整物品资料",
		featuredIdLabel: "物品 ID"
	},
	en: {
		seoTitle: "AION2 Item Database: Equipment, Materials & IDs | KINA",
		seoKeywords: [
			"AION2 item database",
			"AION2 equipment",
			"AION2 materials",
			"AION2 item IDs"
		],
		breadcrumbLabel: "Breadcrumb",
		eyebrow: "ITEM DATABASE",
		title: "AION2 item database",
		description: "Search all 10,910 official items by ID, localized name, grade, category, stat summary, and trade status.",
		sourceNote: "Item names, icons, grades, and details follow NC's published Taiwan, Korea, and en-US item data, updated July 19, 2026.",
		searchLabel: "Search items",
		searchPlaceholder: "Enter an item name or official ID",
		categoryLabel: "Item category",
		allCategories: "All categories",
		resultsLabel: (count) => `${count} item${count === 1 ? "" : "s"}`,
		emptyTitle: "No matching items",
		emptyDescription: "Try another item name, official ID, or category.",
		itemIdLabel: "Item ID",
		levelLabel: "Required level",
		restrictionLabel: "Class restriction",
		officialSourceLabel: "Open official record",
		detailsLabel: "View item details",
		clearLabel: "Clear filters",
		filterTitle: "Search filters",
		filterOpenLabel: "Open filters",
		filterCloseLabel: "Close filters",
		classFilterLabel: "Class",
		gradeFilterLabel: "Grade",
		categoryFilterLabel: "Category",
		allLabel: "All",
		resultsTitle: "Search results",
		bookmarksLabel: "View bookmarks",
		showBookmarksLabel: "Bookmarks only",
		showAllItemsLabel: "Show all items",
		addBookmarkLabel: (name) => `Bookmark ${name}`,
		removeBookmarkLabel: (name) => `Remove ${name} from bookmarks`,
		columnNameLabel: "Item name",
		columnCategoryLabel: "Category",
		columnDescriptionLabel: "Description",
		noBookmarksTitle: "No bookmarked items yet",
		noBookmarksDescription: "Select the star beside an item to keep it in your local bookmarks.",
		previousPageLabel: "Previous page",
		nextPageLabel: "Next page",
		pageLabel: (page, total) => `Page ${page} of ${total}`,
		requestLoadingLabel: "Updating official search results…",
		requestErrorLabel: "Results could not be refreshed. The previous data is still shown.",
		retryLabel: "Retry",
		noClassRestrictionLabel: "No class restriction",
		itemImageAlt: (name, category) => `${name} ${category} AION2 item icon`,
		featuredEyebrow: "CURATED ITEM RECORDS",
		featuredTitle: "Featured AION2 item details",
		featuredDescription: "Browse 12 verified item pages with official IDs, grades, categories, stats, and source records.",
		featuredDetailsLabel: "View full item record",
		featuredIdLabel: "Item ID"
	},
	fr: {
		seoTitle: "Base d’objets AION2 : équipement, matériaux et ID | KINA",
		seoKeywords: [
			"base de données objets AION2",
			"équipement AION2",
			"matériaux AION2",
			"ID objet AION2"
		],
		breadcrumbLabel: "Fil d’Ariane",
		eyebrow: "BASE DE DONNÉES D’OBJETS",
		title: "Base de données d’objets AION2",
		description: "Recherchez 10 910 objets officiels par ID, nom, qualité, catégorie, résumé des caractéristiques et possibilité d’échange.",
		sourceNote: "Les noms, icônes, qualités et détails proviennent des données publiées par NC à Taïwan, en Corée et en anglais (États-Unis), mises à jour le 19 juillet 2026.",
		searchLabel: "Rechercher des objets",
		searchPlaceholder: "Saisissez un nom d’objet ou un ID officiel",
		categoryLabel: "Catégorie d’objet",
		allCategories: "Toutes les catégories",
		resultsLabel: (count) => `${count} objet${count > 1 ? "s" : ""}`,
		emptyTitle: "Aucun objet correspondant",
		emptyDescription: "Essayez un autre nom, ID officiel ou une autre catégorie.",
		itemIdLabel: "ID de l’objet",
		levelLabel: "Niveau requis",
		restrictionLabel: "Restriction de classe",
		officialSourceLabel: "Ouvrir la fiche officielle",
		detailsLabel: "Voir les détails de l’objet",
		clearLabel: "Effacer les filtres",
		filterTitle: "Filtres de recherche",
		filterOpenLabel: "Ouvrir les filtres",
		filterCloseLabel: "Fermer les filtres",
		classFilterLabel: "Classe",
		gradeFilterLabel: "Qualité",
		categoryFilterLabel: "Catégorie",
		allLabel: "Tout",
		resultsTitle: "Résultats",
		bookmarksLabel: "Voir les favoris",
		showBookmarksLabel: "Favoris uniquement",
		showAllItemsLabel: "Afficher tous les objets",
		addBookmarkLabel: (name) => `Ajouter ${name} aux favoris`,
		removeBookmarkLabel: (name) => `Retirer ${name} des favoris`,
		columnNameLabel: "Nom de l’objet",
		columnCategoryLabel: "Catégorie",
		columnDescriptionLabel: "Description",
		noBookmarksTitle: "Aucun objet dans les favoris",
		noBookmarksDescription: "Sélectionnez l’étoile d’un objet pour l’enregistrer localement.",
		previousPageLabel: "Page précédente",
		nextPageLabel: "Page suivante",
		pageLabel: (page, total) => `Page ${page} sur ${total}`,
		requestLoadingLabel: "Mise à jour des résultats officiels…",
		requestErrorLabel: "Impossible d’actualiser les résultats. Les données précédentes restent affichées.",
		retryLabel: "Réessayer",
		noClassRestrictionLabel: "Aucune restriction de classe",
		itemImageAlt: (name, category) => `Icône d’objet AION2 ${name}, catégorie ${category}`,
		featuredEyebrow: "FICHES D’OBJETS SÉLECTIONNÉES",
		featuredTitle: "Détails d’objets AION2 sélectionnés",
		featuredDescription: "Consultez 12 fiches vérifiées avec ID officiel, qualité, catégorie, caractéristiques et sources.",
		featuredDetailsLabel: "Voir la fiche complète",
		featuredIdLabel: "ID de l’objet"
	},
	de: {
		seoTitle: "AION2-Itemdatenbank: Ausrüstung, Materialien & IDs | KINA",
		seoKeywords: [
			"AION2 Gegenstandsdatenbank",
			"AION2 Ausrüstung",
			"AION2 Materialien",
			"AION2 Gegenstands-ID"
		],
		breadcrumbLabel: "Brotkrümelnavigation",
		eyebrow: "GEGENSTANDSDATENBANK",
		title: "AION2-Gegenstandsdatenbank",
		description: "Durchsuche 10.910 offizielle Gegenstände nach ID, Name, Qualität, Kategorie, Werteübersicht und Handelbarkeit.",
		sourceNote: "Namen, Symbole, Qualitäten und Details basieren auf den von NC veröffentlichten Daten für Taiwan, Korea und en-US; Stand: 19. Juli 2026.",
		searchLabel: "Gegenstände suchen",
		searchPlaceholder: "Gegenstandsname oder offizielle ID eingeben",
		categoryLabel: "Gegenstandskategorie",
		allCategories: "Alle Kategorien",
		resultsLabel: (count) => count === 1 ? "1 Gegenstand" : `${count} Gegenstände`,
		emptyTitle: "Keine passenden Gegenstände",
		emptyDescription: "Versuche einen anderen Namen, eine offizielle ID oder Kategorie.",
		itemIdLabel: "Gegenstands-ID",
		levelLabel: "Benötigte Stufe",
		restrictionLabel: "Klassenbeschränkung",
		officialSourceLabel: "Offiziellen Datensatz öffnen",
		detailsLabel: "Gegenstandsdetails anzeigen",
		clearLabel: "Filter zurücksetzen",
		filterTitle: "Suchfilter",
		filterOpenLabel: "Filter öffnen",
		filterCloseLabel: "Filter schließen",
		classFilterLabel: "Klasse",
		gradeFilterLabel: "Qualität",
		categoryFilterLabel: "Kategorie",
		allLabel: "Alle",
		resultsTitle: "Suchergebnisse",
		bookmarksLabel: "Lesezeichen anzeigen",
		showBookmarksLabel: "Nur Lesezeichen",
		showAllItemsLabel: "Alle Gegenstände anzeigen",
		addBookmarkLabel: (name) => `${name} als Lesezeichen speichern`,
		removeBookmarkLabel: (name) => `${name} aus den Lesezeichen entfernen`,
		columnNameLabel: "Gegenstandsname",
		columnCategoryLabel: "Kategorie",
		columnDescriptionLabel: "Beschreibung",
		noBookmarksTitle: "Noch keine Lesezeichen",
		noBookmarksDescription: "Wähle den Stern neben einem Gegenstand, um ihn lokal zu speichern.",
		previousPageLabel: "Vorherige Seite",
		nextPageLabel: "Nächste Seite",
		pageLabel: (page, total) => `Seite ${page} von ${total}`,
		requestLoadingLabel: "Offizielle Suchergebnisse werden aktualisiert…",
		requestErrorLabel: "Die Ergebnisse konnten nicht aktualisiert werden. Die vorherigen Daten bleiben sichtbar.",
		retryLabel: "Erneut versuchen",
		noClassRestrictionLabel: "Keine Klassenbeschränkung",
		itemImageAlt: (name, category) => `AION2-Gegenstandssymbol für ${name}, Kategorie ${category}`,
		featuredEyebrow: "AUSGEWÄHLTE GEGENSTÄNDE",
		featuredTitle: "Ausgewählte AION2-Gegenstandsdetails",
		featuredDescription: "Öffne 12 geprüfte Gegenstandsseiten mit offiziellen IDs, Qualitäten, Kategorien, Werten und Quellen.",
		featuredDetailsLabel: "Vollständigen Datensatz anzeigen",
		featuredIdLabel: "Gegenstands-ID"
	},
	es: {
		seoTitle: "Base de objetos AION2: equipo, materiales e ID | KINA",
		seoKeywords: [
			"base de datos objetos AION2",
			"equipo AION2",
			"materiales AION2",
			"ID de objeto AION2"
		],
		breadcrumbLabel: "Ruta de navegación",
		eyebrow: "BASE DE DATOS DE OBJETOS",
		title: "Base de datos de objetos de AION2",
		description: "Busca 10.910 objetos oficiales por ID, nombre, calidad, categoría, resumen de atributos y posibilidad de intercambio.",
		sourceNote: "Los nombres, iconos, calidades y detalles proceden de los datos publicados por NC para Taiwán, Corea y en-US, actualizados el 19 de julio de 2026.",
		searchLabel: "Buscar objetos",
		searchPlaceholder: "Introduce un nombre de objeto o un ID oficial",
		categoryLabel: "Categoría de objeto",
		allCategories: "Todas las categorías",
		resultsLabel: (count) => `${count} objeto${count === 1 ? "" : "s"}`,
		emptyTitle: "No hay objetos coincidentes",
		emptyDescription: "Prueba con otro nombre, ID oficial o categoría.",
		itemIdLabel: "ID del objeto",
		levelLabel: "Nivel requerido",
		restrictionLabel: "Restricción de clase",
		officialSourceLabel: "Abrir registro oficial",
		detailsLabel: "Ver detalles del objeto",
		clearLabel: "Borrar filtros",
		filterTitle: "Filtros de búsqueda",
		filterOpenLabel: "Abrir filtros",
		filterCloseLabel: "Cerrar filtros",
		classFilterLabel: "Clase",
		gradeFilterLabel: "Calidad",
		categoryFilterLabel: "Categoría",
		allLabel: "Todo",
		resultsTitle: "Resultados",
		bookmarksLabel: "Ver favoritos",
		showBookmarksLabel: "Solo favoritos",
		showAllItemsLabel: "Mostrar todos los objetos",
		addBookmarkLabel: (name) => `Añadir ${name} a favoritos`,
		removeBookmarkLabel: (name) => `Quitar ${name} de favoritos`,
		columnNameLabel: "Nombre del objeto",
		columnCategoryLabel: "Categoría",
		columnDescriptionLabel: "Descripción",
		noBookmarksTitle: "Aún no hay objetos favoritos",
		noBookmarksDescription: "Selecciona la estrella de un objeto para guardarlo localmente.",
		previousPageLabel: "Página anterior",
		nextPageLabel: "Página siguiente",
		pageLabel: (page, total) => `Página ${page} de ${total}`,
		requestLoadingLabel: "Actualizando los resultados oficiales…",
		requestErrorLabel: "No se pudieron actualizar los resultados. Se mantienen los datos anteriores.",
		retryLabel: "Reintentar",
		noClassRestrictionLabel: "Sin restricción de clase",
		itemImageAlt: (name, category) => `Icono del objeto ${name} de AION2, categoría ${category}`,
		featuredEyebrow: "FICHAS DE OBJETOS DESTACADAS",
		featuredTitle: "Detalles de objetos destacados de AION2",
		featuredDescription: "Consulta 12 fichas verificadas con ID oficiales, calidades, categorías, atributos y fuentes.",
		featuredDetailsLabel: "Ver ficha completa",
		featuredIdLabel: "ID del objeto"
	},
	ja: {
		seoTitle: "AION2 アイテムデータベース：装備・素材・アイテム ID | KINA",
		seoKeywords: [
			"AION2 アイテムデータベース",
			"AION2 装備",
			"AION2 素材",
			"AION2 アイテム ID"
		],
		breadcrumbLabel: "パンくずリスト",
		eyebrow: "アイテムデータベース",
		title: "AION2 アイテムデータベース",
		description: "公式アイテム 10,910 件を ID、名称、グレード、カテゴリー、能力概要、取引可否から検索できます。",
		sourceNote: "名称、アイコン、グレード、詳細は NC が公開した台湾・韓国・en-US のデータに基づき、2026年7月19日に更新しました。",
		searchLabel: "アイテムを検索",
		searchPlaceholder: "アイテム名または公式 ID を入力",
		categoryLabel: "アイテムカテゴリー",
		allCategories: "すべてのカテゴリー",
		resultsLabel: (count) => `${count} 件のアイテム`,
		emptyTitle: "該当するアイテムがありません",
		emptyDescription: "別の名称、公式 ID、カテゴリーをお試しください。",
		itemIdLabel: "アイテム ID",
		levelLabel: "必要レベル",
		restrictionLabel: "クラス制限",
		officialSourceLabel: "公式データを開く",
		detailsLabel: "アイテム詳細を見る",
		clearLabel: "フィルターを解除",
		filterTitle: "検索フィルター",
		filterOpenLabel: "フィルターを開く",
		filterCloseLabel: "フィルターを閉じる",
		classFilterLabel: "クラス",
		gradeFilterLabel: "グレード",
		categoryFilterLabel: "カテゴリー",
		allLabel: "すべて",
		resultsTitle: "検索結果",
		bookmarksLabel: "お気に入りを見る",
		showBookmarksLabel: "お気に入りのみ",
		showAllItemsLabel: "すべてのアイテムを表示",
		addBookmarkLabel: (name) => `${name}をお気に入りに追加`,
		removeBookmarkLabel: (name) => `${name}をお気に入りから削除`,
		columnNameLabel: "アイテム名",
		columnCategoryLabel: "カテゴリー",
		columnDescriptionLabel: "説明",
		noBookmarksTitle: "お気に入りはまだありません",
		noBookmarksDescription: "アイテム横の星を選ぶと、この端末に保存できます。",
		previousPageLabel: "前のページ",
		nextPageLabel: "次のページ",
		pageLabel: (page, total) => `${page} / ${total} ページ`,
		requestLoadingLabel: "公式検索結果を更新しています…",
		requestErrorLabel: "結果を更新できませんでした。前回のデータを表示しています。",
		retryLabel: "再試行",
		noClassRestrictionLabel: "クラス制限なし",
		itemImageAlt: (name, category) => `AION2 ${name}（${category}）のアイテムアイコン`,
		featuredEyebrow: "注目のアイテムデータ",
		featuredTitle: "注目の AION2 アイテム詳細",
		featuredDescription: "公式 ID、グレード、カテゴリー、能力値、出典を確認できる検証済みの 12 ページです。",
		featuredDetailsLabel: "アイテム情報をすべて見る",
		featuredIdLabel: "アイテム ID"
	},
	"pt-br": {
		seoTitle: "Itens AION2: equipamentos, materiais e IDs | KINA",
		seoKeywords: [
			"banco de dados de itens AION2",
			"equipamentos AION2",
			"materiais AION2",
			"ID de item AION2"
		],
		breadcrumbLabel: "Trilha de navegação",
		eyebrow: "BANCO DE DADOS DE ITENS",
		title: "Banco de dados de itens do AION2",
		description: "Pesquise 10.910 itens oficiais por ID, nome, qualidade, categoria, resumo de atributos e possibilidade de troca.",
		sourceNote: "Nomes, ícones, qualidades e detalhes seguem os dados publicados pela NC para Taiwan, Coreia e en-US, atualizados em 19 de julho de 2026.",
		searchLabel: "Pesquisar itens",
		searchPlaceholder: "Digite o nome do item ou o ID oficial",
		categoryLabel: "Categoria do item",
		allCategories: "Todas as categorias",
		resultsLabel: (count) => `${count} ite${count === 1 ? "m" : "ns"}`,
		emptyTitle: "Nenhum item encontrado",
		emptyDescription: "Tente outro nome, ID oficial ou categoria.",
		itemIdLabel: "ID do item",
		levelLabel: "Nível necessário",
		restrictionLabel: "Restrição de classe",
		officialSourceLabel: "Abrir registro oficial",
		detailsLabel: "Ver detalhes do item",
		clearLabel: "Limpar filtros",
		filterTitle: "Filtros de pesquisa",
		filterOpenLabel: "Abrir filtros",
		filterCloseLabel: "Fechar filtros",
		classFilterLabel: "Classe",
		gradeFilterLabel: "Qualidade",
		categoryFilterLabel: "Categoria",
		allLabel: "Todos",
		resultsTitle: "Resultados",
		bookmarksLabel: "Ver favoritos",
		showBookmarksLabel: "Somente favoritos",
		showAllItemsLabel: "Mostrar todos os itens",
		addBookmarkLabel: (name) => `Adicionar ${name} aos favoritos`,
		removeBookmarkLabel: (name) => `Remover ${name} dos favoritos`,
		columnNameLabel: "Nome do item",
		columnCategoryLabel: "Categoria",
		columnDescriptionLabel: "Descrição",
		noBookmarksTitle: "Nenhum item favorito ainda",
		noBookmarksDescription: "Selecione a estrela ao lado de um item para salvá-lo neste dispositivo.",
		previousPageLabel: "Página anterior",
		nextPageLabel: "Próxima página",
		pageLabel: (page, total) => `Página ${page} de ${total}`,
		requestLoadingLabel: "Atualizando os resultados oficiais…",
		requestErrorLabel: "Não foi possível atualizar os resultados. Os dados anteriores continuam visíveis.",
		retryLabel: "Tentar novamente",
		noClassRestrictionLabel: "Sem restrição de classe",
		itemImageAlt: (name, category) => `Ícone do item ${name} de AION2, categoria ${category}`,
		featuredEyebrow: "REGISTROS DE ITENS EM DESTAQUE",
		featuredTitle: "Detalhes de itens em destaque do AION2",
		featuredDescription: "Consulte 12 páginas verificadas com IDs oficiais, qualidades, categorias, atributos e fontes.",
		featuredDetailsLabel: "Ver registro completo",
		featuredIdLabel: "ID do item"
	},
	ru: {
		seoTitle: "База предметов AION2: снаряжение, материалы и ID | KINA",
		seoKeywords: [
			"база предметов AION2",
			"снаряжение AION2",
			"материалы AION2",
			"ID предмета AION2"
		],
		breadcrumbLabel: "Навигационная цепочка",
		eyebrow: "БАЗА ПРЕДМЕТОВ",
		title: "База предметов AION2",
		description: "Ищите среди 10 910 официальных предметов по ID, названию, качеству, категории, характеристикам и возможности обмена.",
		sourceNote: "Названия, значки, качество и подробности основаны на данных NC для Тайваня, Кореи и en-US; обновлено 19 июля 2026 года.",
		searchLabel: "Поиск предметов",
		searchPlaceholder: "Введите название предмета или официальный ID",
		categoryLabel: "Категория предмета",
		allCategories: "Все категории",
		resultsLabel: (count) => `${count} предметов`,
		emptyTitle: "Подходящие предметы не найдены",
		emptyDescription: "Попробуйте другое название, официальный ID или категорию.",
		itemIdLabel: "ID предмета",
		levelLabel: "Требуемый уровень",
		restrictionLabel: "Ограничение по классу",
		officialSourceLabel: "Открыть официальную запись",
		detailsLabel: "Подробнее о предмете",
		clearLabel: "Сбросить фильтры",
		filterTitle: "Фильтры поиска",
		filterOpenLabel: "Открыть фильтры",
		filterCloseLabel: "Закрыть фильтры",
		classFilterLabel: "Класс",
		gradeFilterLabel: "Качество",
		categoryFilterLabel: "Категория",
		allLabel: "Все",
		resultsTitle: "Результаты поиска",
		bookmarksLabel: "Открыть избранное",
		showBookmarksLabel: "Только избранное",
		showAllItemsLabel: "Показать все предметы",
		addBookmarkLabel: (name) => `Добавить ${name} в избранное`,
		removeBookmarkLabel: (name) => `Удалить ${name} из избранного`,
		columnNameLabel: "Название предмета",
		columnCategoryLabel: "Категория",
		columnDescriptionLabel: "Описание",
		noBookmarksTitle: "В избранном пока ничего нет",
		noBookmarksDescription: "Нажмите звезду рядом с предметом, чтобы сохранить его на этом устройстве.",
		previousPageLabel: "Предыдущая страница",
		nextPageLabel: "Следующая страница",
		pageLabel: (page, total) => `Страница ${page} из ${total}`,
		requestLoadingLabel: "Обновляем официальные результаты поиска…",
		requestErrorLabel: "Не удалось обновить результаты. Показаны предыдущие данные.",
		retryLabel: "Повторить",
		noClassRestrictionLabel: "Без ограничения по классу",
		itemImageAlt: (name, category) => `Значок предмета AION2 ${name}, категория ${category}`,
		featuredEyebrow: "ИЗБРАННЫЕ ЗАПИСИ",
		featuredTitle: "Подробности об избранных предметах AION2",
		featuredDescription: "Откройте 12 проверенных страниц с официальными ID, качеством, категориями, характеристиками и источниками.",
		featuredDetailsLabel: "Открыть полную запись",
		featuredIdLabel: "ID предмета"
	},
	ko: {
		seoTitle: "AION2 아이템 데이터베이스: 장비·재료·아이템 ID | KINA",
		seoKeywords: [
			"AION2 아이템 데이터베이스",
			"AION2 장비",
			"AION2 재료",
			"AION2 아이템 ID"
		],
		breadcrumbLabel: "경로 탐색",
		eyebrow: "아이템 데이터베이스",
		title: "AION2 아이템 데이터베이스",
		description: "공식 아이템 10,910개를 ID, 이름, 등급, 분류, 능력치 요약과 거래 가능 여부로 검색할 수 있습니다.",
		sourceNote: "아이템 이름, 아이콘, 등급과 상세 정보는 NC가 공개한 대만·한국·en-US 데이터를 바탕으로 하며 2026-07-19에 갱신했습니다.",
		searchLabel: "아이템 검색",
		searchPlaceholder: "아이템 이름 또는 공식 ID 입력",
		categoryLabel: "아이템 분류",
		allCategories: "전체 분류",
		resultsLabel: (count) => `아이템 ${count}개`,
		emptyTitle: "조건에 맞는 아이템이 없습니다",
		emptyDescription: "다른 이름, 공식 ID 또는 분류로 검색해 보세요.",
		itemIdLabel: "아이템 ID",
		levelLabel: "요구 레벨",
		restrictionLabel: "직업 제한",
		officialSourceLabel: "공식 자료 보기",
		detailsLabel: "아이템 상세 보기",
		clearLabel: "필터 초기화",
		filterTitle: "검색 조건",
		filterOpenLabel: "필터 열기",
		filterCloseLabel: "필터 닫기",
		classFilterLabel: "직업",
		gradeFilterLabel: "등급",
		categoryFilterLabel: "분류",
		allLabel: "전체",
		resultsTitle: "검색 결과",
		bookmarksLabel: "즐겨찾기 보기",
		showBookmarksLabel: "즐겨찾기만",
		showAllItemsLabel: "전체 아이템 보기",
		addBookmarkLabel: (name) => `${name} 즐겨찾기에 추가`,
		removeBookmarkLabel: (name) => `${name} 즐겨찾기에서 삭제`,
		columnNameLabel: "아이템 이름",
		columnCategoryLabel: "분류",
		columnDescriptionLabel: "설명",
		noBookmarksTitle: "즐겨찾기한 아이템이 없습니다",
		noBookmarksDescription: "아이템 옆의 별표를 선택하면 이 기기에 저장됩니다.",
		previousPageLabel: "이전 페이지",
		nextPageLabel: "다음 페이지",
		pageLabel: (page, total) => `${total}페이지 중 ${page}페이지`,
		requestLoadingLabel: "공식 검색 결과를 불러오는 중…",
		requestErrorLabel: "결과를 갱신할 수 없어 이전 데이터를 유지했습니다.",
		retryLabel: "다시 시도",
		noClassRestrictionLabel: "직업 제한 없음",
		itemImageAlt: (name, category) => `${name} ${category} AION2 아이템 아이콘`,
		featuredEyebrow: "추천 아이템 데이터",
		featuredTitle: "추천 AION2 아이템 상세 정보",
		featuredDescription: "공식 아이템 ID, 등급, 분류, 능력치와 출처를 확인할 수 있는 12개의 검증된 상세 페이지입니다.",
		featuredDetailsLabel: "전체 아이템 정보 보기",
		featuredIdLabel: "아이템 ID"
	},
	"zh-hant": {
		seoTitle: "AION2 物品資料庫：裝備、材料與道具 ID 查詢 | KINA",
		seoKeywords: [
			"AION2 物品資料庫",
			"AION2 裝備",
			"AION2 材料",
			"AION2 道具 ID"
		],
		breadcrumbLabel: "麵包屑導覽",
		eyebrow: "AION2 物品資料",
		title: "AION2 物品資料庫",
		description: "搜尋 10,910 件官方道具的 ID、三語名稱、品級、分類、屬性摘要與可交易狀態。",
		sourceNote: "物品名稱、圖示、品級與詳情依 NC 公開的台灣、韓國及 en-US 物品資料整理，更新於 2026-07-19。",
		searchLabel: "搜尋物品",
		searchPlaceholder: "輸入物品名稱或官方 ID",
		categoryLabel: "物品分類",
		allCategories: "全部分類",
		resultsLabel: (count) => `顯示 ${count} 件物品`,
		emptyTitle: "找不到符合條件的物品",
		emptyDescription: "請嘗試其他名稱、官方 ID 或分類。",
		itemIdLabel: "物品 ID",
		levelLabel: "需求等級",
		restrictionLabel: "職業限制",
		officialSourceLabel: "查看官方資料",
		detailsLabel: "查看物品詳情",
		clearLabel: "清除篩選",
		filterTitle: "查詢條件",
		filterOpenLabel: "開啟篩選",
		filterCloseLabel: "關閉篩選",
		classFilterLabel: "職業",
		gradeFilterLabel: "品級",
		categoryFilterLabel: "分類",
		allLabel: "全部",
		resultsTitle: "搜尋結果",
		bookmarksLabel: "查看書籤",
		showBookmarksLabel: "只看書籤",
		showAllItemsLabel: "顯示全部物品",
		addBookmarkLabel: (name) => `將 ${name} 加入書籤`,
		removeBookmarkLabel: (name) => `從書籤移除 ${name}`,
		columnNameLabel: "物品名稱",
		columnCategoryLabel: "分類",
		columnDescriptionLabel: "說明",
		noBookmarksTitle: "尚未收藏任何物品",
		noBookmarksDescription: "點選物品列前方的星號，即可將常用物品加入書籤。",
		previousPageLabel: "上一頁",
		nextPageLabel: "下一頁",
		pageLabel: (page, total) => `第 ${page} / ${total} 頁`,
		requestLoadingLabel: "正在更新官方搜尋結果…",
		requestErrorLabel: "暫時無法更新結果，已保留上一批資料。",
		retryLabel: "重試",
		noClassRestrictionLabel: "無職業限制",
		itemImageAlt: (name, category) => `${name} ${category} AION2 物品圖示`,
		featuredEyebrow: "精選物品資料",
		featuredTitle: "精選 AION2 物品詳情",
		featuredDescription: "瀏覽 12 筆已核對的三語物品頁，查看官方物品 ID、品級、分類、能力值與資料來源。",
		featuredDetailsLabel: "查看完整物品資料",
		featuredIdLabel: "物品 ID"
	}
};
var ItemCatalog_module_default = {
	catalog: "_catalog_y5lko_1",
	visuallyHidden: "_visuallyHidden_y5lko_5",
	searchBand: "_searchBand_y5lko_16",
	searchField: "_searchField_y5lko_28",
	searchClear: "_searchClear_y5lko_64",
	workspace: "_workspace_y5lko_81",
	filters: "_filters_y5lko_88",
	filterHeader: "_filterHeader_y5lko_94",
	resetButton: "_resetButton_y5lko_112",
	drawerClose: "_drawerClose_y5lko_133",
	filterGroup: "_filterGroup_y5lko_137",
	allOption: "_allOption_y5lko_158",
	checkboxGrid: "_checkboxGrid_y5lko_178",
	categoryList: "_categoryList_y5lko_207",
	results: "_results_y5lko_245",
	requestStatus: "_requestStatus_y5lko_249",
	resultHeader: "_resultHeader_y5lko_278",
	bookmarkView: "_bookmarkView_y5lko_301",
	tableScroll: "_tableScroll_y5lko_330",
	table: "_table_y5lko_330",
	bookmarkCell: "_bookmarkCell_y5lko_381",
	nameCell: "_nameCell_y5lko_406",
	iconFrame: "_iconFrame_y5lko_413",
	itemIdentity: "_itemIdentity_y5lko_433",
	categoryCell: "_categoryCell_y5lko_474",
	descriptionCell: "_descriptionCell_y5lko_479",
	empty: "_empty_y5lko_501",
	pagination: "_pagination_y5lko_536",
	mobileActions: "_mobileActions_y5lko_563",
	backdrop: "_backdrop_y5lko_564",
	mobileFilterButton: "_mobileFilterButton_y5lko_606",
	mobileBookmarkButton: "_mobileBookmarkButton_y5lko_607"
};
//#endregion
//#region app/_components/database/ItemCatalog.tsx
var import_jsx_runtime = require_jsx_runtime();
var BOOKMARK_STORAGE_KEY = "aion2kina:database:item-bookmarks:v1";
var PAGE_SIZE = 20;
function displayRestriction(locale, classIds, fallback) {
	if (classIds.length) return classIds.map((classId) => databaseClassDefinitions.find((entry) => entry.id === classId)?.labels[locale] ?? classId).join(" / ");
	return fallback;
}
function itemSummary(item) {
	return item.optionLines.length ? item.optionLines.join(" · ") : "—";
}
function parseFragment() {
	const params = new URLSearchParams(window.location.hash.slice(1));
	const knownClasses = new Set(databaseClassDefinitions.map(({ id }) => id));
	const selectedClasses = (params.get("class")?.split(",") ?? []).filter((value) => knownClasses.has(value));
	const pageValue = Number.parseInt(params.get("page") ?? "1", 10);
	return {
		query: params.get("q") ?? "",
		category: params.get("category") ?? "all",
		selectedClasses,
		selectedGrades: (params.get("grade")?.split(",") ?? []).filter(Boolean),
		bookmarkedOnly: params.get("bookmarks") === "1",
		page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1
	};
}
function readBookmarks() {
	try {
		const parsed = JSON.parse(window.localStorage.getItem(BOOKMARK_STORAGE_KEY) ?? "[]");
		return new Set(Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : []);
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
function ItemCatalog({ locale, initialResponse }) {
	const copy = itemDatabaseCatalogCopy[locale];
	const filterTitleId = (0, import_react.useId)();
	const filterButtonRef = (0, import_react.useRef)(null);
	const filterDrawerRef = (0, import_react.useRef)(null);
	const filterCloseButtonRef = (0, import_react.useRef)(null);
	const drawerWasOpen = (0, import_react.useRef)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const [selectedClasses, setSelectedClasses] = (0, import_react.useState)([]);
	const [selectedGrades, setSelectedGrades] = (0, import_react.useState)([]);
	const [bookmarkedOnly, setBookmarkedOnly] = (0, import_react.useState)(false);
	const [bookmarks, setBookmarks] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [filterOpen, setFilterOpen] = (0, import_react.useState)(false);
	const [page, setPage] = (0, import_react.useState)(1);
	const [fragmentReady, setFragmentReady] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(initialResponse);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [requestError, setRequestError] = (0, import_react.useState)(false);
	const [requestRevision, setRequestRevision] = (0, import_react.useState)(0);
	const categories = result.facets.categories.map((facet) => ({
		key: facet.code,
		label: facet.label,
		count: facet.count
	}));
	const grades = result.facets.grades;
	(0, import_react.useEffect)(() => {
		const frame = window.requestAnimationFrame(() => {
			setResult(initialResponse);
			setLoading(false);
			setRequestError(false);
		});
		return () => window.cancelAnimationFrame(frame);
	}, [initialResponse, locale]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const restoreFragment = () => {
			if (cancelled) return;
			const state = parseFragment();
			setQuery(state.query);
			setSelectedCategory(state.category);
			setSelectedClasses(state.selectedClasses);
			setSelectedGrades(state.selectedGrades);
			setBookmarkedOnly(state.bookmarkedOnly);
			setPage(state.page);
		};
		queueMicrotask(() => {
			restoreFragment();
			if (cancelled) return;
			setBookmarks(readBookmarks());
			setFragmentReady(true);
		});
		const onHashChange = () => restoreFragment();
		window.addEventListener("hashchange", onHashChange);
		return () => {
			cancelled = true;
			window.removeEventListener("hashchange", onHashChange);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!fragmentReady) return;
		const params = new URLSearchParams();
		if (query) params.set("q", query);
		if (selectedCategory !== "all") params.set("category", selectedCategory);
		if (selectedClasses.length) params.set("class", selectedClasses.join(","));
		if (selectedGrades.length) params.set("grade", selectedGrades.join(","));
		if (bookmarkedOnly) params.set("bookmarks", "1");
		if (page > 1) params.set("page", String(page));
		const fragment = params.toString();
		const nextUrl = `${window.location.pathname}${fragment ? `#${fragment}` : ""}`;
		window.history.replaceState(null, "", nextUrl);
	}, [
		bookmarkedOnly,
		fragmentReady,
		page,
		query,
		selectedCategory,
		selectedClasses,
		selectedGrades
	]);
	(0, import_react.useEffect)(() => {
		if (!filterOpen) {
			document.body.style.removeProperty("overflow");
			if (drawerWasOpen.current) {
				drawerWasOpen.current = false;
				filterButtonRef.current?.focus();
			}
			return;
		}
		drawerWasOpen.current = true;
		document.body.style.overflow = "hidden";
		const focusFrame = window.requestAnimationFrame(() => {
			filterCloseButtonRef.current?.focus();
		});
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				setFilterOpen(false);
				return;
			}
			if (event.key !== "Tab") return;
			const drawer = filterDrawerRef.current;
			if (!drawer) return;
			const focusable = Array.from(drawer.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])")).filter((element) => {
				const style = window.getComputedStyle(element);
				return style.display !== "none" && style.visibility !== "hidden";
			});
			if (!focusable.length) {
				event.preventDefault();
				return;
			}
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement;
			if (event.shiftKey && (active === first || !drawer.contains(active))) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && (active === last || !drawer.contains(active))) {
				event.preventDefault();
				first.focus();
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => {
			window.cancelAnimationFrame(focusFrame);
			document.body.style.removeProperty("overflow");
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [filterOpen]);
	(0, import_react.useEffect)(() => {
		if (!fragmentReady) return;
		const controller = new AbortController();
		const timer = window.setTimeout(async () => {
			setLoading(true);
			setRequestError(false);
			try {
				const response = await fetch("/api/items", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						locale,
						query,
						category: selectedCategory === "all" ? null : selectedCategory,
						grades: selectedGrades,
						classes: selectedClasses,
						itemIds: bookmarkedOnly ? [...bookmarks] : null,
						page,
						pageSize: PAGE_SIZE
					}),
					cache: "no-store",
					signal: controller.signal
				});
				if (!response.ok) throw new Error("Item catalog request failed");
				const next = await response.json();
				if (!Array.isArray(next.items) || !next.pagination || typeof next.pagination.total !== "number") throw new Error("Item catalog response is invalid");
				setResult(next);
				if (page > next.pagination.lastPage) setPage(next.pagination.lastPage);
			} catch {
				if (!controller.signal.aborted) setRequestError(true);
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}, query ? 280 : 80);
		return () => {
			window.clearTimeout(timer);
			controller.abort();
		};
	}, [
		bookmarkedOnly,
		bookmarks,
		fragmentReady,
		locale,
		page,
		query,
		requestRevision,
		selectedCategory,
		selectedClasses,
		selectedGrades
	]);
	const pageCount = Math.max(1, result.pagination.lastPage);
	const safePage = Math.min(page, pageCount);
	const pageItems = result.items;
	const hasFilters = Boolean(query) || selectedCategory !== "all" || selectedClasses.length > 0 || selectedGrades.length > 0 || bookmarkedOnly;
	const resetFilters = () => {
		setQuery("");
		setSelectedCategory("all");
		setSelectedClasses([]);
		setSelectedGrades([]);
		setBookmarkedOnly(false);
		setPage(1);
	};
	const toggleClass = (classId) => {
		setSelectedClasses((current) => current.includes(classId) ? current.filter((value) => value !== classId) : [...current, classId]);
		setPage(1);
	};
	const toggleGrade = (gradeCode) => {
		setSelectedGrades((current) => current.includes(gradeCode) ? current.filter((value) => value !== gradeCode) : [...current, gradeCode]);
		setPage(1);
	};
	const toggleBookmark = (itemId) => {
		setBookmarks((current) => {
			const next = new Set(current);
			if (next.has(itemId)) next.delete(itemId);
			else next.add(itemId);
			try {
				window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify([...next]));
			} catch {}
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: ItemCatalog_module_default.catalog,
		"aria-labelledby": "item-catalog-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: ItemCatalog_module_default.searchBand,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: ItemCatalog_module_default.searchField,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: ItemCatalog_module_default.visuallyHidden,
							children: copy.searchLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"aria-hidden": "true",
							size: 20,
							strokeWidth: 1.6
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							onChange: (event) => {
								setQuery(event.target.value);
								setPage(1);
							},
							placeholder: copy.searchPlaceholder,
							type: "search",
							value: query
						}),
						query ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": copy.clearLabel,
							className: ItemCatalog_module_default.searchClear,
							onClick: () => {
								setQuery("");
								setPage(1);
							},
							type: "button",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								"aria-hidden": "true",
								size: 17
							})
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ItemCatalog_module_default.mobileActions,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"aria-controls": "item-database-filters",
					"aria-expanded": filterOpen,
					className: ItemCatalog_module_default.mobileFilterButton,
					onClick: () => setFilterOpen(true),
					ref: filterButtonRef,
					type: "button",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
							"aria-hidden": "true",
							size: 17
						}),
						copy.filterOpenLabel,
						hasFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" }) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"aria-pressed": bookmarkedOnly,
					className: ItemCatalog_module_default.mobileBookmarkButton,
					onClick: () => {
						setBookmarkedOnly((current) => !current);
						setPage(1);
					},
					type: "button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
						"aria-hidden": "true",
						fill: bookmarkedOnly ? "currentColor" : "none",
						size: 17
					}), bookmarkedOnly ? copy.showAllItemsLabel : copy.showBookmarksLabel]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ItemCatalog_module_default.workspace,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-hidden": !filterOpen,
						className: ItemCatalog_module_default.backdrop,
						onClick: () => setFilterOpen(false),
						tabIndex: filterOpen ? 0 : -1,
						type: "button"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						"aria-labelledby": filterTitleId,
						"aria-modal": filterOpen || void 0,
						className: ItemCatalog_module_default.filters,
						"data-open": filterOpen,
						id: "item-database-filters",
						ref: filterDrawerRef,
						role: "dialog",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: ItemCatalog_module_default.filterHeader,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										id: filterTitleId,
										children: copy.filterTitle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: ItemCatalog_module_default.resetButton,
										disabled: !hasFilters,
										onClick: resetFilters,
										type: "button",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
											"aria-hidden": "true",
											size: 13
										}), copy.clearLabel]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": copy.filterCloseLabel,
										className: ItemCatalog_module_default.drawerClose,
										onClick: () => setFilterOpen(false),
										ref: filterCloseButtonRef,
										type: "button",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											"aria-hidden": "true",
											size: 19
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
								className: ItemCatalog_module_default.filterGroup,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: copy.classFilterLabel }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: ItemCatalog_module_default.allOption,
										"data-selected": !selectedClasses.length,
										onClick: () => {
											setSelectedClasses([]);
											setPage(1);
										},
										type: "button",
										children: copy.allLabel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: ItemCatalog_module_default.checkboxGrid,
										children: databaseClassDefinitions.map((definition) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											checked: selectedClasses.includes(definition.id),
											onChange: () => toggleClass(definition.id),
											type: "checkbox"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: definition.labels[locale] })] }, definition.id))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
								className: ItemCatalog_module_default.filterGroup,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: copy.gradeFilterLabel }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: ItemCatalog_module_default.allOption,
										"data-selected": !selectedGrades.length,
										onClick: () => {
											setSelectedGrades([]);
											setPage(1);
										},
										type: "button",
										children: copy.allLabel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: ItemCatalog_module_default.checkboxGrid,
										children: grades.map((grade) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												checked: selectedGrades.includes(grade.code),
												onChange: () => toggleGrade(grade.code),
												type: "checkbox"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: grade.label }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: grade.count })
										] }, grade.code))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
								className: ItemCatalog_module_default.filterGroup,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: copy.categoryFilterLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: ItemCatalog_module_default.categoryList,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										"data-selected": selectedCategory === "all",
										onClick: () => {
											setSelectedCategory("all");
											setPage(1);
										},
										type: "button",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.allCategories }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: initialResponse.pagination.total })]
									}), categories.map((itemCategory) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										"data-selected": selectedCategory === itemCategory.key,
										onClick: () => {
											setSelectedCategory(itemCategory.key);
											setPage(1);
										},
										type: "button",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: itemCategory.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: itemCategory.count })]
									}, itemCategory.key))]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: ItemCatalog_module_default.results,
						"aria-busy": loading,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: ItemCatalog_module_default.resultHeader,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.resultsTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "item-catalog-title",
									"aria-live": "polite",
									children: copy.resultsLabel(result.pagination.total)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									"aria-pressed": bookmarkedOnly,
									className: ItemCatalog_module_default.bookmarkView,
									onClick: () => {
										setBookmarkedOnly((current) => !current);
										setPage(1);
									},
									type: "button",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											"aria-hidden": "true",
											fill: bookmarkedOnly ? "currentColor" : "none",
											size: 15
										}),
										bookmarkedOnly ? copy.showAllItemsLabel : copy.bookmarksLabel,
										bookmarks.size ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: bookmarks.size }) : null
									]
								})]
							}),
							loading || requestError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: ItemCatalog_module_default.requestStatus,
								"data-error": requestError || void 0,
								role: requestError ? "alert" : "status",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: requestError ? copy.requestErrorLabel : copy.requestLoadingLabel }), requestError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setRequestRevision((current) => current + 1),
									type: "button",
									children: copy.retryLabel
								}) : null]
							}) : null,
							pageItems.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: ItemCatalog_module_default.tableScroll,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: ItemCatalog_module_default.table,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { "aria-label": copy.bookmarksLabel }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: copy.columnNameLabel }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: copy.columnCategoryLabel }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: copy.columnDescriptionLabel })
									] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: pageItems.map((item) => {
										const isBookmarked = bookmarks.has(item.id);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											"data-grade": item.gradeCode?.toLowerCase() ?? "unknown",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: ItemCatalog_module_default.bookmarkCell,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														"aria-label": isBookmarked ? copy.removeBookmarkLabel(item.name) : copy.addBookmarkLabel(item.name),
														"aria-pressed": isBookmarked,
														onClick: () => toggleBookmark(item.id),
														type: "button",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
															"aria-hidden": "true",
															fill: isBookmarked ? "currentColor" : "none",
															size: 17
														})
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: ItemCatalog_module_default.nameCell,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: ItemCatalog_module_default.iconFrame,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															alt: copy.itemImageAlt(item.name, item.categoryName),
															height: "58",
															loading: "lazy",
															referrerPolicy: "no-referrer",
															src: item.imageUrl,
															width: "58"
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: ItemCatalog_module_default.itemIdentity,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
															href: item.detailSlug ? localizedHref(locale, `/database/${item.detailSlug}/`) : localizedHref(locale, `/database/item/${item.id}/`),
															children: item.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
															item.gradeName,
															" · ",
															copy.itemIdLabel,
															" ",
															item.id
														] })]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: ItemCatalog_module_default.categoryCell,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.columnCategoryLabel }), item.categoryName]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: ItemCatalog_module_default.descriptionCell,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.columnDescriptionLabel }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: itemSummary(item) }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: displayRestriction(locale, item.classIds, copy.noClassRestrictionLabel) })
													]
												})
											]
										}, item.id);
									}) })]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: ItemCatalog_module_default.empty,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
										"aria-hidden": "true",
										size: 24,
										strokeWidth: 1.4
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: bookmarkedOnly ? copy.noBookmarksTitle : copy.emptyTitle }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: bookmarkedOnly ? copy.noBookmarksDescription : copy.emptyDescription }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: resetFilters,
										type: "button",
										children: copy.clearLabel
									})
								]
							}),
							pageCount > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: ItemCatalog_module_default.pagination,
								"aria-label": copy.pageLabel(safePage, pageCount),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": copy.previousPageLabel,
										disabled: safePage === 1,
										onClick: () => setPage((current) => Math.max(1, current - 1)),
										type: "button",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
											"aria-hidden": "true",
											size: 17
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.pageLabel(safePage, pageCount) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": copy.nextPageLabel,
										disabled: safePage === pageCount,
										onClick: () => setPage((current) => Math.min(pageCount, current + 1)),
										type: "button",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
											"aria-hidden": "true",
											size: 17
										})
									})
								]
							}) : null
						]
					})
				]
			})
		]
	});
}
//#endregion
export { ItemCatalog, ItemCatalog as default };
