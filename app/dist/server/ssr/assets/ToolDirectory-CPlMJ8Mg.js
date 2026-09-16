import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { a as localizedHref } from "./site-config-EbYJfejA.js";
//#region app/tool-registry.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var toolCategories = [
	"world",
	"planning",
	"progression",
	"routine"
];
function defineToolLocales(copy) {
	return copy;
}
function defineToolRegistry(tools) {
	const slugs = /* @__PURE__ */ new Set();
	for (const tool of tools) {
		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(tool.slug)) throw new Error(`Invalid tool slug: ${tool.slug}`);
		if (slugs.has(tool.slug)) throw new Error(`Duplicate tool slug: ${tool.slug}`);
		slugs.add(tool.slug);
		if (tool.status === "live") {
			const expectedHref = `/tools/${tool.slug}/`;
			if (tool.route.href !== expectedHref) throw new Error(`Live tool ${tool.slug} must use ${expectedHref}`);
			if (!/^\d{4}-\d{2}-\d{2}$/u.test(tool.updatedAt)) throw new Error(`Live tool ${tool.slug} must declare an ISO updatedAt date`);
		}
	}
	return tools;
}
var toolHubCopy = defineToolLocales({
	"zh-hant": {
		breadcrumb: "工具",
		kicker: "玩家工具",
		title: "AION2 工具：互動地圖與玩家規劃",
		description: "用職業推薦器找到適合的玩法，以互動地圖查找點位，並透過製作材料計算器與每日清單安排成長進度。",
		availability: "工具中心提供十種介面語言，可在手機與桌面裝置上使用。",
		directoryKicker: "工具目錄",
		directoryTitle: "選擇需要的工具",
		directoryDescription: "可依世界探索、職業規劃、成長計算或日常追蹤，快速找到需要的功能。",
		searchLabel: "搜尋工具",
		searchPlaceholder: "搜尋名稱、用途或功能",
		clearSearch: "清除搜尋",
		filterLabel: "依用途篩選工具",
		allTools: "全部",
		live: "可用",
		categories: {
			world: "世界探索",
			planning: "Build 規劃",
			progression: "成長計算",
			routine: "日常追蹤"
		},
		openTool: "開啟工具",
		noResults: "沒有符合目前搜尋或篩選條件的工具。",
		resultCount: (count) => `${count} 個工具`,
		liveCount: (count) => `${count} 項工具`,
		detailOverview: "工具說明",
		detailFeatures: "主要功能",
		detailLanguages: "其他語言",
		backToTools: "返回工具中心"
	},
	"zh-hans": {
		breadcrumb: "工具",
		kicker: "PLAYER TOOLS / 工具中心",
		title: "AION2 工具：互动地图与玩家规划",
		description: "使用职业推荐器找到适合的玩法，在互动地图查询点位，并通过制作材料计算器与每日清单规划成长进度。",
		availability: "工具中心提供十种界面语言，可在手机和桌面设备上使用。",
		directoryKicker: "工具目录",
		directoryTitle: "选择需要的工具",
		directoryDescription: "按世界探索、职业规划、成长计算或日常追踪筛选，快速找到需要的功能。",
		searchLabel: "搜索工具",
		searchPlaceholder: "按名称、用途或功能搜索",
		clearSearch: "清除搜索",
		filterLabel: "按用途筛选工具",
		allTools: "全部",
		live: "可用",
		categories: {
			world: "世界探索",
			planning: "Build 规划",
			progression: "成长计算",
			routine: "日常追踪"
		},
		openTool: "打开工具",
		noResults: "没有符合当前搜索或筛选条件的工具。",
		resultCount: (count) => `${count} 个工具`,
		liveCount: (count) => `${count} 个可用工具`,
		detailOverview: "工具说明",
		detailFeatures: "主要功能",
		detailLanguages: "其他语言",
		backToTools: "返回工具中心"
	},
	en: {
		breadcrumb: "Tools",
		kicker: "PLAYER TOOLS",
		title: "AION2 Tools: Interactive Map & Player Planners",
		description: "Find a class that fits your playstyle, locate points on the interactive map, calculate crafting materials, and organize daily or weekly activities.",
		availability: "The tool center is available in ten interface languages on mobile and desktop.",
		directoryKicker: "TOOL DIRECTORY",
		directoryTitle: "Choose the tool you need",
		directoryDescription: "Filter by world exploration, class planning, progression, or daily tracking to reach the right tool quickly.",
		searchLabel: "Search tools",
		searchPlaceholder: "Search by name, purpose, or feature",
		clearSearch: "Clear search",
		filterLabel: "Filter tools by purpose",
		allTools: "All",
		live: "Live",
		categories: {
			world: "World",
			planning: "Build planning",
			progression: "Progression",
			routine: "Daily tracking"
		},
		openTool: "Open tool",
		noResults: "No tools match the current search and filters.",
		resultCount: (count) => `${count} ${count === 1 ? "tool" : "tools"}`,
		liveCount: (count) => `${count} tools`,
		detailOverview: "About this tool",
		detailFeatures: "Key features",
		detailLanguages: "Other languages",
		backToTools: "Back to tools"
	},
	fr: {
		breadcrumb: "Outils",
		kicker: "OUTILS POUR JOUEURS",
		title: "Outils AION2 : carte et planificateurs",
		description: "Trouvez la classe adaptée à votre style, repérez les points d’intérêt sur la carte interactive, calculez vos matériaux et organisez vos activités.",
		availability: "Le centre d’outils propose dix langues d’interface sur mobile comme sur ordinateur.",
		directoryKicker: "RÉPERTOIRE DES OUTILS",
		directoryTitle: "Choisissez l’outil dont vous avez besoin",
		directoryDescription: "Filtrez par exploration, préparation de classe, progression ou suivi quotidien pour accéder rapidement au bon outil.",
		searchLabel: "Rechercher un outil",
		searchPlaceholder: "Rechercher par nom, usage ou fonctionnalité",
		clearSearch: "Effacer la recherche",
		filterLabel: "Filtrer les outils par usage",
		allTools: "Tous",
		live: "Disponible",
		categories: {
			world: "Exploration",
			planning: "Préparation de build",
			progression: "Progression",
			routine: "Suivi quotidien"
		},
		openTool: "Ouvrir l’outil",
		noResults: "Aucun outil ne correspond à la recherche et aux filtres actuels.",
		resultCount: (count) => `${count} ${count === 1 ? "outil" : "outils"}`,
		liveCount: (count) => `${count} ${count === 1 ? "outil disponible" : "outils disponibles"}`,
		detailOverview: "À propos de cet outil",
		detailFeatures: "Fonctionnalités principales",
		detailLanguages: "Autres langues",
		backToTools: "Retour aux outils"
	},
	de: {
		breadcrumb: "Tools",
		kicker: "SPIELER-TOOLS",
		title: "AION2-Tools: Interaktive Karte und Planer",
		description: "Finde die passende Klasse, suche Orte auf der interaktiven Karte, berechne Herstellungsmaterialien und plane tägliche oder wöchentliche Aktivitäten.",
		availability: "Das Tool-Center bietet zehn Oberflächensprachen auf Mobilgeräten und Desktop-PCs.",
		directoryKicker: "TOOL-VERZEICHNIS",
		directoryTitle: "Wähle das passende Tool",
		directoryDescription: "Filtere nach Welterkundung, Klassenplanung, Fortschritt oder Tagesaufgaben und gelange schnell zur richtigen Funktion.",
		searchLabel: "Tools durchsuchen",
		searchPlaceholder: "Nach Name, Zweck oder Funktion suchen",
		clearSearch: "Suche löschen",
		filterLabel: "Tools nach Zweck filtern",
		allTools: "Alle",
		live: "Verfügbar",
		categories: {
			world: "Welterkundung",
			planning: "Build-Planung",
			progression: "Fortschritt",
			routine: "Tagesaufgaben"
		},
		openTool: "Tool öffnen",
		noResults: "Keine Tools entsprechen der aktuellen Suche und den Filtern.",
		resultCount: (count) => `${count} ${count === 1 ? "Tool" : "Tools"}`,
		liveCount: (count) => `${count} ${count === 1 ? "verfügbares Tool" : "verfügbare Tools"}`,
		detailOverview: "Über dieses Tool",
		detailFeatures: "Wichtige Funktionen",
		detailLanguages: "Weitere Sprachen",
		backToTools: "Zurück zu den Tools"
	},
	es: {
		breadcrumb: "Herramientas",
		kicker: "HERRAMIENTAS PARA JUGADORES",
		title: "Herramientas AION2: mapa y planificadores",
		description: "Encuentra una clase acorde a tu estilo, localiza puntos en el mapa interactivo, calcula materiales y organiza tus actividades diarias o semanales.",
		availability: "El centro de herramientas ofrece diez idiomas de interfaz tanto en móvil como en escritorio.",
		directoryKicker: "DIRECTORIO DE HERRAMIENTAS",
		directoryTitle: "Elige la herramienta que necesitas",
		directoryDescription: "Filtra por exploración, planificación de clase, progreso o seguimiento diario para llegar rápido a la función adecuada.",
		searchLabel: "Buscar herramientas",
		searchPlaceholder: "Buscar por nombre, uso o función",
		clearSearch: "Borrar búsqueda",
		filterLabel: "Filtrar herramientas por uso",
		allTools: "Todas",
		live: "Disponible",
		categories: {
			world: "Exploración",
			planning: "Planificación de build",
			progression: "Progreso",
			routine: "Seguimiento diario"
		},
		openTool: "Abrir herramienta",
		noResults: "Ninguna herramienta coincide con la búsqueda y los filtros actuales.",
		resultCount: (count) => `${count} ${count === 1 ? "herramienta" : "herramientas"}`,
		liveCount: (count) => `${count} ${count === 1 ? "herramienta disponible" : "herramientas disponibles"}`,
		detailOverview: "Acerca de esta herramienta",
		detailFeatures: "Funciones principales",
		detailLanguages: "Otros idiomas",
		backToTools: "Volver a herramientas"
	},
	ja: {
		breadcrumb: "ツール",
		kicker: "プレイヤーツール",
		title: "AION2 ツール：インタラクティブマップと各種プランナー",
		description: "プレイスタイルに合うクラスを探し、インタラクティブマップで地点を確認しながら、製作素材やデイリー・ウィークリー活動を管理できます。",
		availability: "ツールセンターは10言語のインターフェースに対応し、スマートフォンとPCの両方で利用できます。",
		directoryKicker: "ツール一覧",
		directoryTitle: "必要なツールを選択",
		directoryDescription: "ワールド探索、クラス計画、育成計算、日課管理から絞り込み、必要な機能へすぐにアクセスできます。",
		searchLabel: "ツールを検索",
		searchPlaceholder: "名前・用途・機能で検索",
		clearSearch: "検索をクリア",
		filterLabel: "用途でツールを絞り込む",
		allTools: "すべて",
		live: "利用可能",
		categories: {
			world: "ワールド探索",
			planning: "ビルド計画",
			progression: "育成",
			routine: "日課管理"
		},
		openTool: "ツールを開く",
		noResults: "現在の検索条件に一致するツールはありません。",
		resultCount: (count) => `${count}件のツール`,
		liveCount: (count) => `${count}件の利用可能なツール`,
		detailOverview: "このツールについて",
		detailFeatures: "主な機能",
		detailLanguages: "他の言語",
		backToTools: "ツール一覧へ戻る"
	},
	"pt-br": {
		breadcrumb: "Ferramentas",
		kicker: "FERRAMENTAS PARA JOGADORES",
		title: "Ferramentas AION2: mapa e planejadores",
		description: "Encontre uma classe que combine com seu estilo, localize pontos no mapa interativo, calcule materiais e organize atividades diárias ou semanais.",
		availability: "A central de ferramentas oferece dez idiomas de interface no celular e no computador.",
		directoryKicker: "DIRETÓRIO DE FERRAMENTAS",
		directoryTitle: "Escolha a ferramenta de que você precisa",
		directoryDescription: "Filtre por exploração, planejamento de classe, progressão ou rotina para chegar rapidamente à função certa.",
		searchLabel: "Buscar ferramentas",
		searchPlaceholder: "Buscar por nome, objetivo ou recurso",
		clearSearch: "Limpar busca",
		filterLabel: "Filtrar ferramentas por objetivo",
		allTools: "Todas",
		live: "Disponível",
		categories: {
			world: "Exploração",
			planning: "Planejamento de build",
			progression: "Progressão",
			routine: "Rotina diária"
		},
		openTool: "Abrir ferramenta",
		noResults: "Nenhuma ferramenta corresponde à busca e aos filtros atuais.",
		resultCount: (count) => `${count} ${count === 1 ? "ferramenta" : "ferramentas"}`,
		liveCount: (count) => `${count} ${count === 1 ? "ferramenta disponível" : "ferramentas disponíveis"}`,
		detailOverview: "Sobre esta ferramenta",
		detailFeatures: "Principais recursos",
		detailLanguages: "Outros idiomas",
		backToTools: "Voltar às ferramentas"
	},
	ru: {
		breadcrumb: "Инструменты",
		kicker: "ИНСТРУМЕНТЫ ДЛЯ ИГРОКОВ",
		title: "Инструменты AION2: карта и планировщики",
		description: "Подберите класс под свой стиль игры, найдите точки на интерактивной карте, рассчитайте материалы и спланируйте ежедневные или еженедельные занятия.",
		availability: "Центр инструментов доступен на десяти языках интерфейса с телефона и компьютера.",
		directoryKicker: "КАТАЛОГ ИНСТРУМЕНТОВ",
		directoryTitle: "Выберите нужный инструмент",
		directoryDescription: "Фильтруйте инструменты по исследованию мира, планированию класса, развитию или ежедневным задачам.",
		searchLabel: "Поиск инструментов",
		searchPlaceholder: "Искать по названию, назначению или функции",
		clearSearch: "Очистить поиск",
		filterLabel: "Фильтр по назначению",
		allTools: "Все",
		live: "Доступно",
		categories: {
			world: "Исследование мира",
			planning: "Планирование билда",
			progression: "Развитие",
			routine: "Ежедневные задачи"
		},
		openTool: "Открыть инструмент",
		noResults: "По текущему запросу и фильтрам инструменты не найдены.",
		resultCount: (count) => `${count} ${count === 1 ? "инструмент" : "инструментов"}`,
		liveCount: (count) => `${count} ${count === 1 ? "доступный инструмент" : "доступных инструментов"}`,
		detailOverview: "Об инструменте",
		detailFeatures: "Основные возможности",
		detailLanguages: "Другие языки",
		backToTools: "Назад к инструментам"
	},
	ko: {
		breadcrumb: "도구",
		kicker: "플레이어 도구",
		title: "AION2 도구: 인터랙티브 지도와 플래너",
		description: "직업 추천기로 플레이 성향에 맞는 직업을 찾고, 인터랙티브 지도와 제작 재료 계산기, 일일·주간 체크리스트로 성장 계획을 정리하세요.",
		availability: "도구 센터는 모바일과 데스크톱에서 10개 인터페이스 언어를 지원합니다.",
		directoryKicker: "도구 목록",
		directoryTitle: "필요한 도구를 선택하세요",
		directoryDescription: "월드 탐험, 직업 계획, 성장 계산, 일일 추적 중 필요한 용도를 선택해 도구를 빠르게 찾으세요.",
		searchLabel: "도구 검색",
		searchPlaceholder: "이름, 용도 또는 기능 검색",
		clearSearch: "검색 지우기",
		filterLabel: "용도별 도구 필터",
		allTools: "전체",
		live: "사용 가능",
		categories: {
			world: "월드 탐험",
			planning: "빌드 계획",
			progression: "성장 계산",
			routine: "일일 추적"
		},
		openTool: "도구 열기",
		noResults: "현재 검색 및 필터 조건과 일치하는 도구가 없습니다.",
		resultCount: (count) => `${count}개 도구`,
		liveCount: (count) => `${count}개 도구`,
		detailOverview: "도구 소개",
		detailFeatures: "주요 기능",
		detailLanguages: "다른 언어",
		backToTools: "도구 목록으로"
	}
});
var toolRegistry = defineToolRegistry([
	{
		slug: "map",
		category: "world",
		status: "live",
		updatedAt: "2026-07-23",
		route: {
			kind: "custom",
			href: "/tools/map/"
		},
		icon: "⌖",
		featured: true,
		copy: defineToolLocales({
			"zh-hant": {
				eyebrow: "世界探索",
				name: "AION2 互動地圖",
				description: "搜尋地區、世界首領、採集點、收集品與數千個地圖點位。",
				action: "開啟互動地圖",
				highlights: [
					"三語地圖資料",
					"地區與類型篩選",
					"行動版觸控操作"
				]
			},
			en: {
				eyebrow: "WORLD EXPLORATION",
				name: "AION2 Interactive Map",
				description: "Search regions, world bosses, gathering nodes, collectables, and thousands of map points.",
				action: "Open interactive map",
				highlights: [
					"Three-language map data",
					"Region and type filters",
					"Touch-friendly mobile controls"
				]
			},
			"zh-hans": {
				eyebrow: "世界探索",
				name: "AION2 互动地图",
				description: "搜索区域、世界首领、采集点、收集品及数千个 AION2 地图点位。",
				action: "打开互动地图",
				highlights: [
					"多语言地图导航",
					"区域与类型筛选",
					"适配手机触控操作"
				]
			},
			fr: {
				eyebrow: "EXPLORATION",
				name: "Carte interactive AION2",
				description: "Recherchez des régions, boss mondiaux, points de récolte, objets à collectionner et des milliers de points sur la carte AION2.",
				action: "Ouvrir la carte interactive",
				highlights: [
					"Navigation multilingue",
					"Filtres par région et type",
					"Commandes tactiles adaptées au mobile"
				]
			},
			de: {
				eyebrow: "WELTERKUNDUNG",
				name: "Interaktive AION2-Karte",
				description: "Durchsuche Regionen, Weltbosse, Sammelpunkte, Sammlerstücke und Tausende Orte auf der AION2-Karte.",
				action: "Interaktive Karte öffnen",
				highlights: [
					"Mehrsprachige Kartennavigation",
					"Regions- und Typfilter",
					"Touch-optimierte Mobilsteuerung"
				]
			},
			es: {
				eyebrow: "EXPLORACIÓN",
				name: "Mapa interactivo de AION2",
				description: "Busca regiones, jefes de mundo, nodos de recolección, coleccionables y miles de puntos del mapa de AION2.",
				action: "Abrir mapa interactivo",
				highlights: [
					"Navegación multilingüe",
					"Filtros por región y tipo",
					"Controles táctiles para móvil"
				]
			},
			ja: {
				eyebrow: "ワールド探索",
				name: "AION2 インタラクティブマップ",
				description: "地域、ワールドボス、採集ポイント、収集品など、AION2の数千件のマップ地点を検索できます。",
				action: "インタラクティブマップを開く",
				highlights: [
					"多言語マップナビゲーション",
					"地域・種類フィルター",
					"スマートフォン向けタッチ操作"
				]
			},
			"pt-br": {
				eyebrow: "EXPLORAÇÃO",
				name: "Mapa interativo de AION2",
				description: "Busque regiões, chefes mundiais, pontos de coleta, colecionáveis e milhares de locais no mapa de AION2.",
				action: "Abrir mapa interativo",
				highlights: [
					"Navegação em vários idiomas",
					"Filtros por região e tipo",
					"Controles de toque para celular"
				]
			},
			ru: {
				eyebrow: "ИССЛЕДОВАНИЕ МИРА",
				name: "Интерактивная карта AION2",
				description: "Ищите регионы, мировых боссов, точки сбора, коллекционные предметы и тысячи отметок на карте AION2.",
				action: "Открыть интерактивную карту",
				highlights: [
					"Многоязычная навигация",
					"Фильтры по региону и типу",
					"Удобное сенсорное управление"
				]
			},
			ko: {
				eyebrow: "월드 탐험",
				name: "AION2 인터랙티브 지도",
				description: "지역, 월드 보스, 채집 지점, 수집 요소와 수천 개의 지도 포인트를 검색하세요.",
				action: "인터랙티브 지도 열기",
				highlights: [
					"3개 언어 지도 데이터",
					"지역 및 유형 필터",
					"모바일 터치 조작"
				]
			}
		})
	},
	{
		slug: "class-finder",
		category: "planning",
		status: "live",
		updatedAt: "2026-07-23",
		route: {
			kind: "custom",
			href: "/tools/class-finder/"
		},
		icon: "◎",
		featured: true,
		copy: defineToolLocales({
			"zh-hant": {
				eyebrow: "職業配對",
				name: "AION2 職業推薦器",
				description: "回答遊玩偏好問題，依操作難度、隊伍定位與 PvE／PvP 取向找到適合你的 AION2 職業。",
				action: "開始職業測驗",
				highlights: [
					"約 2 分鐘完成",
					"顯示前三名匹配職業",
					"連結職業攻略與難度比較"
				]
			},
			en: {
				eyebrow: "CLASS MATCHING",
				name: "AION2 Class Finder",
				description: "Answer a few playstyle questions to match AION2 classes by difficulty, party role, and PvE or PvP preference.",
				action: "Start the class quiz",
				highlights: [
					"Takes about 2 minutes",
					"Shows your top three matches",
					"Links to class guides and comparisons"
				]
			},
			"zh-hans": {
				eyebrow: "职业匹配",
				name: "AION2 职业推荐器",
				description: "回答几个关于游玩偏好的问题，根据操作难度、队伍定位以及 PvE 或 PvP 取向匹配适合你的 AION2 职业。",
				action: "开始职业测试",
				highlights: [
					"约 2 分钟完成",
					"显示匹配度最高的三个职业",
					"连接职业攻略与难度对比"
				]
			},
			fr: {
				eyebrow: "CHOIX DE CLASSE",
				name: "Sélecteur de classe AION2",
				description: "Répondez à quelques questions pour trouver les classes AION2 adaptées à la difficulté souhaitée, au rôle en groupe et à vos préférences PvE ou PvP.",
				action: "Commencer le questionnaire",
				highlights: [
					"Environ 2 minutes",
					"Vos trois meilleures correspondances",
					"Liens vers les guides et comparatifs"
				]
			},
			de: {
				eyebrow: "KLASSENWAHL",
				name: "AION2-Klassenfinder",
				description: "Beantworte einige Fragen zu deinem Spielstil und finde AION2-Klassen nach Schwierigkeit, Gruppenrolle sowie PvE- oder PvP-Vorliebe.",
				action: "Klassenquiz starten",
				highlights: [
					"Dauert etwa 2 Minuten",
					"Zeigt deine drei besten Treffer",
					"Links zu Klassenguides und Vergleichen"
				]
			},
			es: {
				eyebrow: "ELECCIÓN DE CLASE",
				name: "Selector de clase de AION2",
				description: "Responde unas preguntas sobre tu estilo para encontrar clases de AION2 según dificultad, función en grupo y preferencia por PvE o PvP.",
				action: "Iniciar el cuestionario",
				highlights: [
					"Se completa en unos 2 minutos",
					"Muestra tus tres mejores opciones",
					"Enlaces a guías y comparaciones"
				]
			},
			ja: {
				eyebrow: "クラス診断",
				name: "AION2 クラス診断",
				description: "プレイスタイルに関する質問に答えると、操作難度、パーティーでの役割、PvE・PvPの好みに合うAION2クラスを診断します。",
				action: "クラス診断を始める",
				highlights: [
					"所要時間は約2分",
					"上位3クラスを表示",
					"クラス攻略・比較ページへ案内"
				]
			},
			"pt-br": {
				eyebrow: "ESCOLHA DE CLASSE",
				name: "Seletor de classe de AION2",
				description: "Responda a algumas perguntas sobre seu estilo para encontrar classes de AION2 por dificuldade, função no grupo e preferência entre PvE e PvP.",
				action: "Iniciar o questionário",
				highlights: [
					"Leva cerca de 2 minutos",
					"Mostra as três melhores combinações",
					"Links para guias e comparações"
				]
			},
			ru: {
				eyebrow: "ПОДБОР КЛАССА",
				name: "Подбор класса AION2",
				description: "Ответьте на несколько вопросов и подберите классы AION2 по сложности, роли в группе и предпочтениям в PvE или PvP.",
				action: "Начать тест",
				highlights: [
					"Займёт около 2 минут",
					"Покажет три лучших варианта",
					"Ссылки на гайды и сравнения классов"
				]
			},
			ko: {
				eyebrow: "직업 매칭",
				name: "AION2 직업 추천기",
				description: "플레이 성향에 답하고 조작 난이도, 파티 역할, PvE·PvP 선호도에 맞는 AION2 직업을 찾아보세요.",
				action: "직업 테스트 시작",
				highlights: [
					"약 2분 소요",
					"상위 3개 추천 직업",
					"직업 공략과 난이도 비교 연결"
				]
			}
		})
	},
	{
		slug: "build-planner",
		category: "planning",
		status: "coming-soon",
		route: {
			kind: "unavailable",
			href: null
		},
		icon: "◇",
		copy: defineToolLocales({
			"zh-hant": {
				eyebrow: "BUILD 規劃",
				name: "職業 Build 規劃器",
				description: "比較技能、屬性與裝備方案，並在裝置上保存個人規劃。",
				action: "即將上線",
				highlights: []
			},
			en: {
				eyebrow: "BUILD PLANNER",
				name: "Class build planner",
				description: "Compare skills, stats, and equipment, then save personal plans on your device.",
				action: "Coming soon",
				highlights: []
			},
			"zh-hans": {
				eyebrow: "BUILD 规划",
				name: "职业 Build 规划器",
				description: "对比技能、属性和装备方案，并在当前设备保存个人 Build 规划。",
				action: "即将上线",
				highlights: []
			},
			fr: {
				eyebrow: "PLANIFICATEUR DE BUILD",
				name: "Planificateur de build de classe",
				description: "Comparez compétences, caractéristiques et équipement, puis enregistrez vos builds sur votre appareil.",
				action: "Bientôt disponible",
				highlights: []
			},
			de: {
				eyebrow: "BUILD-PLANER",
				name: "Klassen-Build-Planer",
				description: "Vergleiche Fertigkeiten, Werte und Ausrüstung und speichere eigene Builds auf deinem Gerät.",
				action: "Demnächst verfügbar",
				highlights: []
			},
			es: {
				eyebrow: "PLANIFICADOR DE BUILD",
				name: "Planificador de builds de clase",
				description: "Compara habilidades, atributos y equipo, y guarda tus builds personales en el dispositivo.",
				action: "Próximamente",
				highlights: []
			},
			ja: {
				eyebrow: "ビルドプランナー",
				name: "クラスビルドプランナー",
				description: "スキル、能力値、装備を比較し、自分のビルド案を端末に保存できます。",
				action: "近日公開",
				highlights: []
			},
			"pt-br": {
				eyebrow: "PLANEJADOR DE BUILD",
				name: "Planejador de builds de classe",
				description: "Compare habilidades, atributos e equipamentos e salve seus builds no dispositivo.",
				action: "Em breve",
				highlights: []
			},
			ru: {
				eyebrow: "ПЛАНИРОВЩИК БИЛДА",
				name: "Планировщик классовых билдов",
				description: "Сравнивайте умения, характеристики и снаряжение и сохраняйте свои билды на устройстве.",
				action: "Скоро",
				highlights: []
			},
			ko: {
				eyebrow: "빌드 플래너",
				name: "직업 빌드 플래너",
				description: "스킬, 능력치와 장비 조합을 비교하고 개인 계획을 기기에 저장합니다.",
				action: "출시 예정",
				highlights: []
			}
		})
	},
	{
		slug: "material-calculator",
		category: "progression",
		status: "live",
		updatedAt: "2026-07-23",
		route: {
			kind: "custom",
			href: "/tools/material-calculator/"
		},
		icon: "∑",
		copy: defineToolLocales({
			"zh-hant": {
				eyebrow: "製作",
				name: "製作配方與材料計算器",
				description: "搜尋 AION2 製作配方，按製作次數計算直接材料或基礎材料的需求、庫存缺口與預估成本。",
				action: "搜尋製作配方",
				highlights: [
					"配方目錄與條件篩選",
					"直接／基礎材料切換",
					"庫存缺口與成本計算"
				]
			},
			en: {
				eyebrow: "CRAFTING",
				name: "Crafting recipe & material calculator",
				description: "Search AION2 crafting recipes, then calculate direct or base-material requirements, inventory shortages, and estimated cost by craft count.",
				action: "Search crafting recipes",
				highlights: [
					"Searchable recipe directory",
					"Direct or base materials",
					"Inventory and cost totals"
				]
			},
			"zh-hans": {
				eyebrow: "制作",
				name: "制作配方与材料计算器",
				description: "搜索 AION2 制作配方，并按制作次数计算直接材料或基础材料的需求、库存缺口与预估成本。",
				action: "搜索制作配方",
				highlights: [
					"可搜索的配方目录",
					"直接／基础材料切换",
					"库存与成本汇总"
				]
			},
			fr: {
				eyebrow: "ARTISANAT",
				name: "Calculateur de recettes et matériaux",
				description: "Recherchez les recettes d’artisanat d’AION2 et calculez les matériaux directs ou de base, les manques en inventaire et le coût estimé selon la quantité.",
				action: "Rechercher des recettes",
				highlights: [
					"Répertoire de recettes consultable",
					"Matériaux directs ou de base",
					"Totaux de stock et de coût"
				]
			},
			de: {
				eyebrow: "HERSTELLUNG",
				name: "Rezept- und Materialrechner",
				description: "Durchsuche AION2-Herstellungsrezepte und berechne direkte oder grundlegende Materialien, Fehlmengen im Inventar und geschätzte Kosten.",
				action: "Herstellungsrezepte suchen",
				highlights: [
					"Durchsuchbares Rezeptverzeichnis",
					"Direkte oder Grundmaterialien",
					"Inventar- und Kostensummen"
				]
			},
			es: {
				eyebrow: "FABRICACIÓN",
				name: "Calculadora de recetas y materiales",
				description: "Busca recetas de fabricación de AION2 y calcula materiales directos o básicos, faltantes de inventario y coste estimado según la cantidad.",
				action: "Buscar recetas de fabricación",
				highlights: [
					"Directorio de recetas con búsqueda",
					"Materiales directos o básicos",
					"Totales de inventario y coste"
				]
			},
			ja: {
				eyebrow: "製作",
				name: "製作レシピ・素材計算機",
				description: "AION2の製作レシピを検索し、製作回数に応じた直接素材・基礎素材の必要数、所持数の不足分、推定費用を計算できます。",
				action: "製作レシピを検索",
				highlights: [
					"検索できるレシピ一覧",
					"直接素材・基礎素材の切り替え",
					"所持数と費用の集計"
				]
			},
			"pt-br": {
				eyebrow: "CRIAÇÃO",
				name: "Calculadora de receitas e materiais",
				description: "Busque receitas de criação de AION2 e calcule materiais diretos ou básicos, itens que faltam no inventário e custo estimado por quantidade.",
				action: "Buscar receitas de criação",
				highlights: [
					"Diretório de receitas pesquisável",
					"Materiais diretos ou básicos",
					"Totais de inventário e custo"
				]
			},
			ru: {
				eyebrow: "КРАФТ",
				name: "Калькулятор рецептов и материалов",
				description: "Ищите рецепты крафта AION2 и рассчитывайте прямые или базовые материалы, нехватку в инвентаре и примерную стоимость для нужного количества.",
				action: "Найти рецепты крафта",
				highlights: [
					"Каталог рецептов с поиском",
					"Прямые или базовые материалы",
					"Итоги по инвентарю и стоимости"
				]
			},
			ko: {
				eyebrow: "제작",
				name: "제작 레시피 및 재료 계산기",
				description: "AION2 제작 레시피를 검색하고 제작 횟수에 따라 직접 재료 또는 기본 재료의 필요량, 보유량 부족분과 예상 비용을 계산합니다.",
				action: "제작 레시피 검색",
				highlights: [
					"레시피 목록과 필터",
					"직접／기본 재료 전환",
					"보유량과 비용 계산"
				]
			}
		})
	},
	{
		slug: "daily-checklist",
		category: "routine",
		status: "live",
		updatedAt: "2026-07-22",
		route: {
			kind: "registry",
			href: "/tools/daily-checklist/"
		},
		icon: "✓",
		featured: true,
		copy: defineToolLocales({
			"zh-hant": {
				eyebrow: "日常活動",
				name: "AION2 每日與每週活動清單",
				description: "追蹤已核對來源的每日與每週遊戲活動，並依台港澳或韓國伺服器時間自動開啟新週期；也可加入自訂任務。",
				action: "開啟檢查清單",
				highlights: [
					"每日／每週活動詳情",
					"05:00 伺服器週期",
					"自訂任務與本機保存"
				]
			},
			en: {
				eyebrow: "DAILY ROUTINE",
				name: "AION2 daily and weekly activity checklist",
				description: "Track sourced daily and weekly activities with automatic Taiwan/Hong Kong/Macau or Korea server cycles, and add your own tasks.",
				action: "Open checklist",
				highlights: [
					"Detailed daily/weekly activities",
					"05:00 server cycles",
					"Custom tasks saved on-device"
				]
			},
			"zh-hans": {
				eyebrow: "日常活动",
				name: "AION2 每日与每周活动清单",
				description: "追踪有来源依据的每日与每周活动，按台港澳服或韩服周期自动重置，也可添加自定义任务。",
				action: "打开检查清单",
				highlights: [
					"详细的每日／每周活动",
					"05:00 服务器重置周期",
					"自定义任务保存在当前设备"
				]
			},
			fr: {
				eyebrow: "ACTIVITÉS RÉCURRENTES",
				name: "Checklist quotidienne et hebdomadaire AION2",
				description: "Suivez les activités quotidiennes et hebdomadaires vérifiées, avec réinitialisation automatique selon le service choisi, et ajoutez vos propres tâches.",
				action: "Ouvrir la liste",
				highlights: [
					"Activités quotidiennes et hebdomadaires détaillées",
					"Réinitialisation serveur à 05 h 00",
					"Tâches personnalisées enregistrées sur l’appareil"
				]
			},
			de: {
				eyebrow: "TÄGLICHE ROUTINE",
				name: "AION2-Checkliste: täglich und wöchentlich",
				description: "Verfolge belegte tägliche und wöchentliche Aktivitäten mit automatischer Zurücksetzung für den gewählten Service und füge eigene Aufgaben hinzu.",
				action: "Checkliste öffnen",
				highlights: [
					"Detaillierte Tages- und Wochenaktivitäten",
					"Server-Zyklus um 05:00 Uhr",
					"Eigene Aufgaben lokal gespeichert"
				]
			},
			es: {
				eyebrow: "RUTINA DIARIA",
				name: "Lista diaria y semanal de AION2",
				description: "Controla actividades diarias y semanales verificadas, con reinicio automático según el servicio elegido, y añade tus propias tareas.",
				action: "Abrir lista",
				highlights: [
					"Actividades diarias y semanales detalladas",
					"Ciclo del servidor a las 05:00",
					"Tareas personalizadas guardadas en el dispositivo"
				]
			},
			ja: {
				eyebrow: "デイリー管理",
				name: "AION2 デイリー・ウィークリー活動チェックリスト",
				description: "出典を確認したデイリー・ウィークリー活動を、選択したサービスの周期に合わせて自動リセットし、独自のタスクも追加できます。",
				action: "チェックリストを開く",
				highlights: [
					"デイリー・ウィークリー活動の詳細",
					"05:00のサーバー周期",
					"カスタムタスクを端末に保存"
				]
			},
			"pt-br": {
				eyebrow: "ROTINA DIÁRIA",
				name: "Lista de atividades diárias e semanais de AION2",
				description: "Acompanhe atividades diárias e semanais verificadas, com reinício automático conforme o serviço escolhido, e adicione suas próprias tarefas.",
				action: "Abrir lista",
				highlights: [
					"Atividades diárias e semanais detalhadas",
					"Ciclo do servidor às 05:00",
					"Tarefas personalizadas salvas no dispositivo"
				]
			},
			ru: {
				eyebrow: "ЕЖЕДНЕВНЫЕ ЗАДАЧИ",
				name: "AION2: ежедневные и еженедельные задачи",
				description: "Отмечайте проверенные ежедневные и еженедельные активности с автоматическим сбросом по циклу выбранного сервиса и добавляйте свои задачи.",
				action: "Открыть список",
				highlights: [
					"Подробные ежедневные и недельные активности",
					"Сброс сервера в 05:00",
					"Пользовательские задачи хранятся на устройстве"
				]
			},
			ko: {
				eyebrow: "일일 루틴",
				name: "AION2 일일·주간 활동 체크리스트",
				description: "출처가 표시된 일일·주간 활동을 대만·홍콩·마카오 또는 한국 서버 주기에 맞춰 관리하고 사용자 작업도 추가하세요.",
				action: "체크리스트 열기",
				highlights: [
					"일일·주간 활동 상세",
					"05:00 서버 주기",
					"사용자 작업·기기 내 저장"
				]
			}
		})
	},
	{
		slug: "event-timer",
		category: "routine",
		status: "live",
		updatedAt: "2026-08-03",
		route: {
			kind: "registry",
			href: "/tools/event-timer/"
		},
		icon: "◷",
		featured: true,
		copy: defineToolLocales({
			"zh-hant": {
				eyebrow: "即時活動時程",
				name: "AION2 活動、Boss 與裂隙倒計時",
				description: "依台港澳服或韓服伺服器時間，查看下一場活動、深淵 Boss 與裂隙的即時倒計時、當地時間及地圖入口。",
				action: "查看活動倒計時",
				highlights: [
					"活動／Boss／裂隙分類",
					"伺服器時間與本地換算",
					"官方來源與地圖入口"
				]
			},
			"zh-hans": {
				eyebrow: "实时活动时间",
				name: "AION2 活动、Boss 与裂隙倒计时",
				description: "按台港澳服或韩服服务器时间查看下一场活动、深渊 Boss 与裂隙的实时倒计时、本地时间及地图入口。",
				action: "查看活动倒计时",
				highlights: [
					"活动／Boss／裂隙分类",
					"服务器时间与本地换算",
					"官方来源与地图入口"
				]
			},
			en: {
				eyebrow: "LIVE EVENT SCHEDULE",
				name: "AION2 event, boss & Rift timer",
				description: "See live countdowns for the next activity, Abyss boss, and Rift in Taiwan or Korea service time, with local-time conversion and map links.",
				action: "Open event timer",
				highlights: [
					"Activity, boss, and Rift filters",
					"Server and local time",
					"Official sources and map links"
				]
			},
			fr: {
				eyebrow: "CALENDRIER EN DIRECT",
				name: "Minuteur AION2 : événements, boss et failles",
				description: "Suivez le prochain événement, boss des Abysses ou faille des services taïwanais et coréen, avec conversion locale et liens vers la carte.",
				action: "Ouvrir le minuteur",
				highlights: [
					"Filtres événements, boss et failles",
					"Heure serveur et locale",
					"Sources officielles et cartes"
				]
			},
			de: {
				eyebrow: "LIVE-EVENTPLAN",
				name: "AION2-Timer für Events, Bosse und Risse",
				description: "Sieh Countdown, Server- und Ortszeit für das nächste Event, den nächsten Abyss-Boss oder Riss in Taiwan und Korea samt Kartenlinks.",
				action: "Event-Timer öffnen",
				highlights: [
					"Filter für Events, Bosse und Risse",
					"Server- und Ortszeit",
					"Offizielle Quellen und Karten"
				]
			},
			es: {
				eyebrow: "HORARIO EN DIRECTO",
				name: "Cronómetro AION2 de eventos, jefes y fisuras",
				description: "Consulta la cuenta atrás del próximo evento, jefe del Abismo o fisura de los servicios de Taiwán y Corea, con hora local y mapas.",
				action: "Abrir temporizador",
				highlights: [
					"Filtros de eventos, jefes y fisuras",
					"Hora del servidor y local",
					"Fuentes oficiales y mapas"
				]
			},
			ja: {
				eyebrow: "ライブイベント日程",
				name: "AION2 イベント・ボス・亀裂タイマー",
				description: "台湾・韓国サービスの次回イベント、アビスボス、亀裂までの時間を、現地時刻への換算とマップリンク付きで確認できます。",
				action: "イベントタイマーを開く",
				highlights: [
					"イベント・ボス・亀裂フィルター",
					"サーバー時刻と現地時刻",
					"公式出典とマップ"
				]
			},
			"pt-br": {
				eyebrow: "AGENDA AO VIVO",
				name: "Timer AION2 de eventos, chefes e Fendas",
				description: "Veja a contagem para o próximo evento, chefe do Abismo ou Fenda dos serviços de Taiwan e Coreia, com horário local e mapas.",
				action: "Abrir temporizador",
				highlights: [
					"Filtros de eventos, chefes e Fendas",
					"Horário do servidor e local",
					"Fontes oficiais e mapas"
				]
			},
			ru: {
				eyebrow: "РАСПИСАНИЕ СОБЫТИЙ",
				name: "Таймер событий, боссов и разломов AION2",
				description: "Следите за временем до следующего события, босса Бездны или разлома на Тайване и в Корее с местным временем и ссылками на карту.",
				action: "Открыть таймер",
				highlights: [
					"Фильтры событий, боссов и разломов",
					"Серверное и местное время",
					"Официальные источники и карты"
				]
			},
			ko: {
				eyebrow: "실시간 콘텐츠 일정",
				name: "AION2 이벤트·보스·균열 타이머",
				description: "한국 또는 대만 서비스의 다음 이벤트, 어비스 보스와 균열까지 남은 시간, 내 현지 시각과 지도 위치를 확인하세요.",
				action: "이벤트 타이머 열기",
				highlights: [
					"이벤트·보스·균열 필터",
					"서버 시각과 현지 시각",
					"공식 출처와 지도 링크"
				]
			}
		})
	}
]);
function isLiveTool(tool) {
	return tool.status === "live";
}
function getLiveTools() {
	return toolRegistry.filter(isLiveTool);
}
function getToolHref(locale, tool) {
	if (!isLiveTool(tool)) return null;
	return localizedHref(locale, tool.route.href);
}
//#endregion
//#region app/tool-directory-state.ts
var defaultToolDirectoryState = {
	category: "all",
	status: "all",
	query: ""
};
var fragmentKeys = {
	category: "tool-category",
	status: "tool-status",
	query: "tool-query"
};
var toolStatuses = ["live", "coming-soon"];
var MAX_FRAGMENT_QUERY_LENGTH = 120;
function fragmentParams(fragment) {
	return new URLSearchParams(fragment.replace(/^#/u, ""));
}
function parseToolDirectoryFragment(fragment, categories) {
	const params = fragmentParams(fragment);
	const category = params.get(fragmentKeys.category);
	const status = params.get(fragmentKeys.status);
	return {
		category: categories.includes(category) ? category : "all",
		status: toolStatuses.includes(status) ? status : "all",
		query: (params.get(fragmentKeys.query) ?? "").slice(0, MAX_FRAGMENT_QUERY_LENGTH)
	};
}
function buildToolDirectoryFragment(currentFragment, state) {
	const params = fragmentParams(currentFragment);
	if (state.category === "all") params.delete(fragmentKeys.category);
	else params.set(fragmentKeys.category, state.category);
	if (state.status === "all") params.delete(fragmentKeys.status);
	else params.set(fragmentKeys.status, state.status);
	const query = state.query.trim().slice(0, MAX_FRAGMENT_QUERY_LENGTH);
	if (query) params.set(fragmentKeys.query, query);
	else params.delete(fragmentKeys.query);
	const serialized = params.toString();
	return serialized ? `#${serialized}` : "";
}
function filterToolDirectoryTools(tools, locale, state) {
	const query = state.query.trim().toLocaleLowerCase(locale);
	return tools.filter((tool) => {
		if (state.category !== "all" && tool.category !== state.category) return false;
		if (state.status !== "all" && tool.status !== state.status) return false;
		if (!query) return true;
		const content = tool.copy[locale];
		return [
			tool.slug,
			tool.category,
			tool.status,
			content.eyebrow,
			content.name,
			content.description,
			...content.highlights
		].join(" ").toLocaleLowerCase(locale).includes(query);
	});
}
var tools_module_default = {
	main: "_main_hc6j6_1",
	shell: "_shell_hc6j6_10",
	hero: "_hero_hc6j6_14",
	breadcrumbs: "_breadcrumbs_hc6j6_19",
	heroGrid: "_heroGrid_hc6j6_38",
	kicker: "_kicker_hc6j6_45",
	heroAside: "_heroAside_hc6j6_65",
	sectionHeading: "_sectionHeading_hc6j6_66",
	counts: "_counts_hc6j6_73",
	status: "_status_hc6j6_94",
	availability: "_availability_hc6j6_108",
	directory: "_directory_hc6j6_129",
	detailBody: "_detailBody_hc6j6_142",
	directoryControls: "_directoryControls_hc6j6_149",
	searchControl: "_searchControl_hc6j6_156",
	statusControl: "_statusControl_hc6j6_157",
	categoryControl: "_categoryControl_hc6j6_158",
	controlLabel: "_controlLabel_hc6j6_169",
	searchField: "_searchField_hc6j6_176",
	statusFilters: "_statusFilters_hc6j6_227",
	filterScroller: "_filterScroller_hc6j6_233",
	resultCount: "_resultCount_hc6j6_242",
	filters: "_filters_hc6j6_250",
	filterButton: "_filterButton_hc6j6_257",
	grid: "_grid_hc6j6_276",
	card: "_card_hc6j6_282",
	liveCard: "_liveCard_hc6j6_296",
	plannedCard: "_plannedCard_hc6j6_313",
	cardHeader: "_cardHeader_hc6j6_318",
	icon: "_icon_hc6j6_326",
	detailIcon: "_detailIcon_hc6j6_327",
	eyebrow: "_eyebrow_hc6j6_354",
	cardDescription: "_cardDescription_hc6j6_372",
	highlights: "_highlights_hc6j6_382",
	plannedRule: "_plannedRule_hc6j6_399",
	cardAction: "_cardAction_hc6j6_406",
	empty: "_empty_hc6j6_428",
	related: "_related_hc6j6_436",
	relatedInner: "_relatedInner_hc6j6_441",
	languageLinks: "_languageLinks_hc6j6_464",
	detailHero: "_detailHero_hc6j6_478",
	detailTitle: "_detailTitle_hc6j6_482",
	detailGrid: "_detailGrid_hc6j6_507",
	detailDescription: "_detailDescription_hc6j6_513",
	detailPanel: "_detailPanel_hc6j6_520",
	backLink: "_backLink_hc6j6_571"
};
//#endregion
//#region app/_components/tools/ToolDirectory.tsx
var import_jsx_runtime = require_jsx_runtime();
var toolDirectoryStateEvent = "tool-directory-statechange";
function subscribeToToolDirectoryFragment(onStoreChange) {
	window.addEventListener("hashchange", onStoreChange);
	window.addEventListener("popstate", onStoreChange);
	window.addEventListener(toolDirectoryStateEvent, onStoreChange);
	return () => {
		window.removeEventListener("hashchange", onStoreChange);
		window.removeEventListener("popstate", onStoreChange);
		window.removeEventListener(toolDirectoryStateEvent, onStoreChange);
	};
}
function getToolDirectoryFragment() {
	return window.location.hash;
}
function ToolDirectory({ locale }) {
	const fragment = (0, import_react.useSyncExternalStore)(subscribeToToolDirectoryFragment, getToolDirectoryFragment, () => "");
	const directoryState = (0, import_react.useMemo)(() => fragment ? parseToolDirectoryFragment(fragment, toolCategories) : defaultToolDirectoryState, [fragment]);
	const copy = toolHubCopy[locale];
	const tools = (0, import_react.useMemo)(() => filterToolDirectoryTools(getLiveTools(), locale, {
		...directoryState,
		status: "all"
	}), [directoryState, locale]);
	const filters = [{
		id: "all",
		label: copy.allTools
	}, ...toolCategories.map((category) => ({
		id: category,
		label: copy.categories[category]
	}))];
	const updateDirectoryState = (updates, historyMode = "push") => {
		const nextState = {
			...directoryState,
			...updates
		};
		const nextHash = buildToolDirectoryFragment(window.location.hash, nextState);
		if (nextHash === window.location.hash) return;
		window.history[historyMode === "push" ? "pushState" : "replaceState"](window.history.state, "", `${window.location.pathname}${window.location.search}${nextHash}`);
		window.dispatchEvent(new Event(toolDirectoryStateEvent));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: tools_module_default.directoryControls,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: tools_module_default.searchControl,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: tools_module_default.controlLabel,
					htmlFor: "tool-directory-search",
					children: copy.searchLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: tools_module_default.searchField,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"aria-controls": "tool-directory-results",
						autoComplete: "off",
						id: "tool-directory-search",
						maxLength: 120,
						onChange: (event) => updateDirectoryState({ query: event.target.value }, "replace"),
						placeholder: copy.searchPlaceholder,
						type: "search",
						value: directoryState.query
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": copy.clearSearch,
						disabled: !directoryState.query,
						onClick: () => updateDirectoryState({ query: "" }, "replace"),
						type: "button",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "×"
						})
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: tools_module_default.categoryControl,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: tools_module_default.controlLabel,
				id: "tool-category-filter-label",
				children: copy.filterLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: tools_module_default.filterScroller,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-labelledby": "tool-category-filter-label",
					className: tools_module_default.filters,
					role: "group",
					children: filters.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-controls": "tool-directory-results",
						"aria-pressed": directoryState.category === item.id,
						className: tools_module_default.filterButton,
						onClick: () => updateDirectoryState({ category: item.id }),
						type: "button",
						children: item.label
					}, item.id))
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", {
			"aria-atomic": "true",
			"aria-live": "polite",
			className: tools_module_default.resultCount,
			id: "tool-directory-result-count",
			children: copy.resultCount(tools.length)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-labelledby": "tool-directory-result-count",
			className: tools_module_default.grid,
			id: "tool-directory-results",
			children: tools.map((tool) => {
				const content = tool.copy[locale];
				const href = getToolHref(locale, tool);
				const cardContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: tools_module_default.cardHeader,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: tools_module_default.icon,
							"aria-hidden": "true",
							children: tool.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: tools_module_default.status,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), copy.categories[tool.category]]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: tools_module_default.eyebrow,
						children: content.eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: content.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: tools_module_default.cardDescription,
						children: content.description
					}),
					content.highlights.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: tools_module_default.highlights,
						"aria-label": copy.detailFeatures,
						children: content.highlights.map((highlight) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: highlight }, highlight))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: tools_module_default.cardAction,
						children: [content.action || copy.openTool, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							"aria-hidden": "true",
							children: "↗"
						})]
					})
				] });
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: `${tools_module_default.card} ${tools_module_default.liveCard}`,
					"data-featured": tool.featured ? "true" : "false",
					"data-tool-status": tool.status,
					href,
					children: cardContent
				}, tool.slug);
			})
		}),
		tools.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: tools_module_default.empty,
			children: copy.noResults
		})
	] });
}
//#endregion
export { ToolDirectory };
