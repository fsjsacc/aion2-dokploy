import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { a as localizedHref } from "./site-config-EbYJfejA.js";
import { t as RotateCcw } from "./rotate-ccw-CkEJYLzG.js";
import { n as ExternalLink } from "./clock-3-DLQpWMdH.js";
import { ProvenancePanel } from "./ProvenancePanel-CsMAzC6s.js";
//#region app/curated-item-links.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var curatedItemSlugById = {
	"110130039": "brutalscourge-110130039",
	"513830001": "theostone-fregions-schemes-513830001",
	"513830003": "theostone-beritras-conspiracy-513830003",
	"513830004": "theostone-nezekans-march-513830004",
	"511351001": "lesser-abyssal-manastone-511351001",
	"511351002": "intermediate-abyssal-manastone-511351002",
	"610610016": "radiant-odyle-610610016",
	"610620016": "radiant-orichalcum-ore-610620016",
	"610650017": "radiant-yggdrasil-log-610650017",
	"610511019": "maddened-wrathful-curse-610511019",
	"610511036": "rampaging-fearsome-aura-weapon-610511036",
	"512400003": "ancient-aullaeu-wings-512400003"
};
function curatedItemSlug(itemId) {
	return curatedItemSlugById[itemId] ?? null;
}
//#endregion
//#region app/item-detail-copy.ts
var itemDetailCopy = {
	"zh-hans": {
		eyebrow: "官方物品详情",
		back: "返回物品数据库",
		itemId: "物品 ID",
		grade: "品级",
		category: "分类",
		itemLevel: "物品等级",
		equipLevel: "装备等级",
		race: "种族限制",
		classes: "职业限制",
		type: "物品类型",
		description: "官方说明",
		systemStates: "系统状态",
		storable: "可存放",
		tradable: "可交易",
		personalTradable: "可个人交易",
		enchantable: "可强化",
		decomposable: "可分解",
		yes: "是",
		no: "否",
		unknown: "官方资料未提供",
		none: "无限制",
		enhancement: "强化预览",
		enhancementLevel: "强化等级",
		updating: "正在更新强化属性…",
		updateError: "暂时无法更新强化属性，仍显示上一笔官方资料。",
		retry: "重试",
		maxEnchant: "一般强化上限",
		maxExceed: "突破强化",
		safeEnchant: "安全强化",
		magicSlots: "魔石栏位",
		godSlots: "神石栏位",
		mainStats: "官方主要属性",
		candidateStats: "灵魂刻印候选属性",
		candidateHelp: (count) => count ? `以下为官方候选池；首次刻印会从中获得 ${count} 项，并非全部同时生效。` : "以下为官方候选池；实际取得内容以游戏内刻印结果为准。",
		stat: "属性",
		baseValue: "基础值",
		enchantBonus: "强化增量",
		sources: "官方取得来源",
		costumes: "相关外观",
		duration: "持续时间",
		cooldown: "冷却时间",
		imprintSkillLimit: "刻印技能上限",
		randomImprint: "随机刻印属性",
		retrievedAt: "资料抓取时间",
		minutes: "分钟",
		seconds: "秒",
		official: "查看官方来源",
		curated: "阅读 KINA 完整攻略",
		sourceNote: "本页按需读取 NC 当前公开的物品记录；官方未提供的字段不会自行推测。",
		imageAlt: (name, category) => `${name} ${category} AION2 官方物品图标`,
		summaryTitle: "物品资料摘要",
		summaryNotice: "部分详细资料暂时无法载入，以下显示目前可用的物品资料摘要。",
		snapshot: "官方物品资料",
		officialDataLabel: "NCSOFT 官方物品资料",
		officialPageLabel: "NCSOFT 官方物品页面",
		seoDescription: (name, id, grade, category) => `${name}（物品 ID ${id}）官方详情：${grade}、${category}、装备限制、主要属性、强化与取得来源。`,
		typeLabels: {
			Equip: "装备",
			Accessory: "饰品",
			Usable: "可使用物品",
			Misc: "其他物品"
		}
	},
	en: {
		eyebrow: "Official item detail",
		back: "Back to item database",
		itemId: "Item ID",
		grade: "Grade",
		category: "Category",
		itemLevel: "Item level",
		equipLevel: "Equip level",
		race: "Race restriction",
		classes: "Class restriction",
		type: "Item type",
		description: "Official description",
		systemStates: "System states",
		storable: "Storable",
		tradable: "Tradable",
		personalTradable: "Personal trade",
		enchantable: "Enchantable",
		decomposable: "Decomposable",
		yes: "Yes",
		no: "No",
		unknown: "Not supplied by the official record",
		none: "No restriction",
		enhancement: "Enhancement preview",
		enhancementLevel: "Enhancement level",
		updating: "Updating enhanced stats…",
		updateError: "Enhanced stats are temporarily unavailable. The previous official record remains visible.",
		retry: "Retry",
		maxEnchant: "Normal enhancement cap",
		maxExceed: "Exceed enhancement",
		safeEnchant: "Safe enhancement",
		magicSlots: "Manastone slots",
		godSlots: "Theostone slots",
		mainStats: "Official main stats",
		candidateStats: "Soul Imprint candidate stats",
		candidateHelp: (count) => count ? `This is the official candidate pool. The first imprint grants ${count} of these stats; they do not all apply at once.` : "This is the official candidate pool. Actual results are determined in game.",
		stat: "Stat",
		baseValue: "Base value",
		enchantBonus: "Enhancement bonus",
		sources: "Official acquisition sources",
		costumes: "Related appearances",
		duration: "Duration",
		cooldown: "Cooldown",
		imprintSkillLimit: "Imprint skill limit",
		randomImprint: "Random imprint stats",
		retrievedAt: "Data retrieved",
		minutes: "minutes",
		seconds: "seconds",
		official: "Open official source",
		curated: "Read the full KINA guide",
		sourceNote: "This page reads NC's currently published item record on demand. Fields absent from the official source are not inferred.",
		imageAlt: (name, category) => `Official AION2 ${name} ${category} item icon`,
		summaryTitle: "Item overview",
		summaryNotice: "Some details could not be loaded. The latest available item overview is shown below.",
		snapshot: "Official item data",
		officialDataLabel: "NCSOFT official item data",
		officialPageLabel: "NCSOFT official item page",
		seoDescription: (name, id, grade, category) => `Official details for ${name} (item ID ${id}), including ${grade} grade, ${category}, restrictions, stats, enhancement, and sources.`,
		typeLabels: {
			Equip: "Equipment",
			Accessory: "Accessory",
			Usable: "Usable item",
			Misc: "Miscellaneous"
		}
	},
	fr: {
		eyebrow: "Détails officiels de l’objet",
		back: "Retour à la base de données d’objets",
		itemId: "ID de l’objet",
		grade: "Qualité",
		category: "Catégorie",
		itemLevel: "Niveau de l’objet",
		equipLevel: "Niveau d’équipement",
		race: "Restriction de faction",
		classes: "Restriction de classe",
		type: "Type d’objet",
		description: "Description officielle",
		systemStates: "États système",
		storable: "Stockable",
		tradable: "Échangeable",
		personalTradable: "Échange personnel",
		enchantable: "Améliorable",
		decomposable: "Décomposable",
		yes: "Oui",
		no: "Non",
		unknown: "Non indiqué dans la fiche officielle",
		none: "Aucune restriction",
		enhancement: "Aperçu de l’amélioration",
		enhancementLevel: "Niveau d’amélioration",
		updating: "Mise à jour des caractéristiques améliorées…",
		updateError: "Les caractéristiques améliorées sont temporairement indisponibles. La fiche précédente reste affichée.",
		retry: "Réessayer",
		maxEnchant: "Limite d’amélioration normale",
		maxExceed: "Amélioration avancée",
		safeEnchant: "Amélioration sûre",
		magicSlots: "Emplacements de pierre de mana",
		godSlots: "Emplacements de pierre divine",
		mainStats: "Caractéristiques principales officielles",
		candidateStats: "Caractéristiques candidates de l’Empreinte d’âme",
		candidateHelp: (count) => count ? `Voici la liste officielle des possibilités. La première empreinte accorde ${count} caractéristiques ; elles ne s’appliquent pas toutes à la fois.` : "Voici la liste officielle des possibilités. Le résultat réel est déterminé en jeu.",
		stat: "Caractéristique",
		baseValue: "Valeur de base",
		enchantBonus: "Bonus d’amélioration",
		sources: "Sources d’obtention officielles",
		costumes: "Apparences associées",
		duration: "Durée",
		cooldown: "Temps de recharge",
		imprintSkillLimit: "Limite de compétence d’empreinte",
		randomImprint: "Caractéristiques d’empreinte aléatoires",
		retrievedAt: "Données récupérées le",
		minutes: "minutes",
		seconds: "secondes",
		official: "Ouvrir la source officielle",
		curated: "Lire le guide KINA complet",
		sourceNote: "Cette page consulte à la demande la fiche d’objet actuellement publiée par NC. Les champs absents de la source officielle ne sont pas déduits.",
		imageAlt: (name, category) => `Icône officielle AION2 de ${name}, catégorie ${category}`,
		summaryTitle: "Aperçu de l’objet",
		summaryNotice: "Certains détails n’ont pas pu être chargés. Le dernier aperçu disponible est affiché ci-dessous.",
		snapshot: "Données officielles de l’objet",
		officialDataLabel: "Données d’objet officielles NCSOFT",
		officialPageLabel: "Page d’objet officielle NCSOFT",
		seoDescription: (name, id, grade, category) => `Détails officiels de ${name} (ID ${id}) : qualité ${grade}, ${category}, restrictions, caractéristiques, amélioration et sources.`,
		typeLabels: {
			Equip: "Équipement",
			Accessory: "Accessoire",
			Usable: "Objet utilisable",
			Misc: "Divers"
		}
	},
	de: {
		eyebrow: "Offizielle Gegenstandsdetails",
		back: "Zurück zur Gegenstandsdatenbank",
		itemId: "Gegenstands-ID",
		grade: "Qualität",
		category: "Kategorie",
		itemLevel: "Gegenstandsstufe",
		equipLevel: "Ausrüstungsstufe",
		race: "Fraktionsbeschränkung",
		classes: "Klassenbeschränkung",
		type: "Gegenstandstyp",
		description: "Offizielle Beschreibung",
		systemStates: "Systemstatus",
		storable: "Lagerfähig",
		tradable: "Handelbar",
		personalTradable: "Persönlicher Handel",
		enchantable: "Verbesserbar",
		decomposable: "Zerlegbar",
		yes: "Ja",
		no: "Nein",
		unknown: "Im offiziellen Datensatz nicht angegeben",
		none: "Keine Beschränkung",
		enhancement: "Verbesserungsvorschau",
		enhancementLevel: "Verbesserungsstufe",
		updating: "Verbesserte Werte werden aktualisiert…",
		updateError: "Verbesserte Werte sind vorübergehend nicht verfügbar. Der vorherige offizielle Datensatz bleibt sichtbar.",
		retry: "Erneut versuchen",
		maxEnchant: "Normales Verbesserungslimit",
		maxExceed: "Erweiterte Verbesserung",
		safeEnchant: "Sichere Verbesserung",
		magicSlots: "Manasteinplätze",
		godSlots: "Göttersteinplätze",
		mainStats: "Offizielle Hauptwerte",
		candidateStats: "Mögliche Seelenprägungswerte",
		candidateHelp: (count) => count ? `Dies ist der offizielle Wertepool. Die erste Prägung gewährt ${count} dieser Werte; sie gelten nicht alle gleichzeitig.` : "Dies ist der offizielle Wertepool. Das tatsächliche Ergebnis wird im Spiel bestimmt.",
		stat: "Wert",
		baseValue: "Grundwert",
		enchantBonus: "Verbesserungsbonus",
		sources: "Offizielle Bezugsquellen",
		costumes: "Zugehörige Erscheinungsbilder",
		duration: "Dauer",
		cooldown: "Abklingzeit",
		imprintSkillLimit: "Limit der Prägungsfertigkeit",
		randomImprint: "Zufällige Prägungswerte",
		retrievedAt: "Daten abgerufen",
		minutes: "Minuten",
		seconds: "Sekunden",
		official: "Offizielle Quelle öffnen",
		curated: "Vollständigen KINA-Guide lesen",
		sourceNote: "Diese Seite lädt den aktuell von NC veröffentlichten Gegenstandsdatensatz bei Bedarf. Fehlende Felder werden nicht abgeleitet.",
		imageAlt: (name, category) => `Offizielles AION2-Gegenstandssymbol für ${name}, Kategorie ${category}`,
		summaryTitle: "Gegenstandsübersicht",
		summaryNotice: "Einige Details konnten nicht geladen werden. Die zuletzt verfügbare Übersicht wird angezeigt.",
		snapshot: "Offizielle Gegenstandsdaten",
		officialDataLabel: "Offizielle NCSOFT-Gegenstandsdaten",
		officialPageLabel: "Offizielle NCSOFT-Gegenstandsseite",
		seoDescription: (name, id, grade, category) => `Offizielle Details zu ${name} (Gegenstands-ID ${id}): ${grade}, ${category}, Beschränkungen, Werte, Verbesserung und Quellen.`,
		typeLabels: {
			Equip: "Ausrüstung",
			Accessory: "Accessoire",
			Usable: "Verbrauchsgegenstand",
			Misc: "Sonstiges"
		}
	},
	es: {
		eyebrow: "Detalles oficiales del objeto",
		back: "Volver a la base de datos de objetos",
		itemId: "ID del objeto",
		grade: "Calidad",
		category: "Categoría",
		itemLevel: "Nivel del objeto",
		equipLevel: "Nivel de equipo",
		race: "Restricción de facción",
		classes: "Restricción de clase",
		type: "Tipo de objeto",
		description: "Descripción oficial",
		systemStates: "Estados del sistema",
		storable: "Almacenable",
		tradable: "Intercambiable",
		personalTradable: "Intercambio personal",
		enchantable: "Mejorable",
		decomposable: "Desmontable",
		yes: "Sí",
		no: "No",
		unknown: "No indicado en el registro oficial",
		none: "Sin restricción",
		enhancement: "Vista previa de mejora",
		enhancementLevel: "Nivel de mejora",
		updating: "Actualizando atributos mejorados…",
		updateError: "Los atributos mejorados no están disponibles temporalmente. Se mantiene el registro oficial anterior.",
		retry: "Reintentar",
		maxEnchant: "Límite de mejora normal",
		maxExceed: "Mejora avanzada",
		safeEnchant: "Mejora segura",
		magicSlots: "Ranuras de piedra de maná",
		godSlots: "Ranuras de piedra divina",
		mainStats: "Atributos principales oficiales",
		candidateStats: "Atributos posibles de Impronta del alma",
		candidateHelp: (count) => count ? `Esta es la lista oficial de posibilidades. La primera impronta concede ${count} atributos; no se aplican todos a la vez.` : "Esta es la lista oficial de posibilidades. El resultado real se determina en el juego.",
		stat: "Atributo",
		baseValue: "Valor base",
		enchantBonus: "Bonificación de mejora",
		sources: "Fuentes oficiales de obtención",
		costumes: "Apariencias relacionadas",
		duration: "Duración",
		cooldown: "Tiempo de reutilización",
		imprintSkillLimit: "Límite de habilidad de impronta",
		randomImprint: "Atributos de impronta aleatorios",
		retrievedAt: "Datos obtenidos",
		minutes: "minutos",
		seconds: "segundos",
		official: "Abrir fuente oficial",
		curated: "Leer la guía completa de KINA",
		sourceNote: "Esta página consulta bajo demanda el registro de objeto publicado actualmente por NC. Los campos ausentes no se deducen.",
		imageAlt: (name, category) => `Icono oficial de AION2 para ${name}, categoría ${category}`,
		summaryTitle: "Resumen del objeto",
		summaryNotice: "No se pudieron cargar algunos detalles. Se muestra el último resumen disponible.",
		snapshot: "Datos oficiales del objeto",
		officialDataLabel: "Datos oficiales de objetos de NCSOFT",
		officialPageLabel: "Página oficial del objeto de NCSOFT",
		seoDescription: (name, id, grade, category) => `Detalles oficiales de ${name} (ID ${id}): calidad ${grade}, ${category}, restricciones, atributos, mejora y fuentes.`,
		typeLabels: {
			Equip: "Equipo",
			Accessory: "Accesorio",
			Usable: "Objeto utilizable",
			Misc: "Varios"
		}
	},
	ja: {
		eyebrow: "公式アイテム詳細",
		back: "アイテムデータベースへ戻る",
		itemId: "アイテム ID",
		grade: "グレード",
		category: "カテゴリー",
		itemLevel: "アイテムレベル",
		equipLevel: "装備レベル",
		race: "種族制限",
		classes: "クラス制限",
		type: "アイテムタイプ",
		description: "公式説明",
		systemStates: "システム状態",
		storable: "保管可能",
		tradable: "取引可能",
		personalTradable: "個人取引",
		enchantable: "強化可能",
		decomposable: "分解可能",
		yes: "はい",
		no: "いいえ",
		unknown: "公式データに記載なし",
		none: "制限なし",
		enhancement: "強化プレビュー",
		enhancementLevel: "強化レベル",
		updating: "強化後の能力値を更新しています…",
		updateError: "強化後の能力値を取得できません。直前の公式データを表示しています。",
		retry: "再試行",
		maxEnchant: "通常強化上限",
		maxExceed: "上限突破強化",
		safeEnchant: "安全強化",
		magicSlots: "魔石スロット",
		godSlots: "神石スロット",
		mainStats: "公式の主要能力値",
		candidateStats: "ソウル刻印の候補能力値",
		candidateHelp: (count) => count ? `公式の候補一覧です。初回の刻印ではこの中から ${count} 項目を獲得し、すべてが同時に適用されるわけではありません。` : "公式の候補一覧です。実際の結果はゲーム内で決まります。",
		stat: "能力値",
		baseValue: "基本値",
		enchantBonus: "強化ボーナス",
		sources: "公式の入手先",
		costumes: "関連外見",
		duration: "持続時間",
		cooldown: "クールタイム",
		imprintSkillLimit: "刻印スキル上限",
		randomImprint: "ランダム刻印能力値",
		retrievedAt: "データ取得日時",
		minutes: "分",
		seconds: "秒",
		official: "公式ソースを開く",
		curated: "KINA の完全ガイドを読む",
		sourceNote: "このページは NC が現在公開しているアイテムデータを必要に応じて取得します。公式ソースにない項目は推測しません。",
		imageAlt: (name, category) => `AION2 ${name}（${category}）の公式アイテムアイコン`,
		summaryTitle: "アイテム概要",
		summaryNotice: "一部の詳細を取得できませんでした。利用可能な最新の概要を表示します。",
		snapshot: "公式アイテムデータ",
		officialDataLabel: "NCSOFT 公式アイテムデータ",
		officialPageLabel: "NCSOFT 公式アイテムページ",
		seoDescription: (name, id, grade, category) => `${name}（アイテム ID ${id}）の公式詳細：${grade}、${category}、装備制限、能力値、強化、入手先。`,
		typeLabels: {
			Equip: "装備",
			Accessory: "アクセサリー",
			Usable: "使用アイテム",
			Misc: "その他"
		}
	},
	"pt-br": {
		eyebrow: "Detalhes oficiais do item",
		back: "Voltar ao banco de dados de itens",
		itemId: "ID do item",
		grade: "Qualidade",
		category: "Categoria",
		itemLevel: "Nível do item",
		equipLevel: "Nível de equipamento",
		race: "Restrição de facção",
		classes: "Restrição de classe",
		type: "Tipo de item",
		description: "Descrição oficial",
		systemStates: "Estados do sistema",
		storable: "Armazenável",
		tradable: "Negociável",
		personalTradable: "Troca pessoal",
		enchantable: "Aprimorável",
		decomposable: "Desmontável",
		yes: "Sim",
		no: "Não",
		unknown: "Não informado no registro oficial",
		none: "Sem restrição",
		enhancement: "Prévia de aprimoramento",
		enhancementLevel: "Nível de aprimoramento",
		updating: "Atualizando atributos aprimorados…",
		updateError: "Os atributos aprimorados estão temporariamente indisponíveis. O registro oficial anterior continua visível.",
		retry: "Tentar novamente",
		maxEnchant: "Limite de aprimoramento normal",
		maxExceed: "Aprimoramento avançado",
		safeEnchant: "Aprimoramento seguro",
		magicSlots: "Espaços de pedra de mana",
		godSlots: "Espaços de pedra divina",
		mainStats: "Atributos principais oficiais",
		candidateStats: "Atributos possíveis da Marca da Alma",
		candidateHelp: (count) => count ? `Esta é a lista oficial de possibilidades. A primeira marca concede ${count} atributos; eles não se aplicam todos de uma vez.` : "Esta é a lista oficial de possibilidades. O resultado real é determinado no jogo.",
		stat: "Atributo",
		baseValue: "Valor base",
		enchantBonus: "Bônus de aprimoramento",
		sources: "Fontes oficiais de obtenção",
		costumes: "Visuais relacionados",
		duration: "Duração",
		cooldown: "Tempo de recarga",
		imprintSkillLimit: "Limite de habilidade da marca",
		randomImprint: "Atributos aleatórios da marca",
		retrievedAt: "Dados obtidos em",
		minutes: "minutos",
		seconds: "segundos",
		official: "Abrir fonte oficial",
		curated: "Ler o guia completo da KINA",
		sourceNote: "Esta página consulta sob demanda o registro de item publicado atualmente pela NC. Campos ausentes não são inferidos.",
		imageAlt: (name, category) => `Ícone oficial do item ${name} de AION2, categoria ${category}`,
		summaryTitle: "Resumo do item",
		summaryNotice: "Alguns detalhes não puderam ser carregados. O resumo mais recente disponível é exibido abaixo.",
		snapshot: "Dados oficiais do item",
		officialDataLabel: "Dados oficiais de itens da NCSOFT",
		officialPageLabel: "Página oficial do item da NCSOFT",
		seoDescription: (name, id, grade, category) => `Detalhes oficiais de ${name} (ID ${id}): qualidade ${grade}, ${category}, restrições, atributos, aprimoramento e fontes.`,
		typeLabels: {
			Equip: "Equipamento",
			Accessory: "Acessório",
			Usable: "Item utilizável",
			Misc: "Diversos"
		}
	},
	ru: {
		eyebrow: "Официальные данные предмета",
		back: "Вернуться к базе предметов",
		itemId: "ID предмета",
		grade: "Качество",
		category: "Категория",
		itemLevel: "Уровень предмета",
		equipLevel: "Уровень экипировки",
		race: "Ограничение по фракции",
		classes: "Ограничение по классу",
		type: "Тип предмета",
		description: "Официальное описание",
		systemStates: "Системные свойства",
		storable: "Можно хранить",
		tradable: "Можно передать",
		personalTradable: "Личная передача",
		enchantable: "Можно улучшить",
		decomposable: "Можно разобрать",
		yes: "Да",
		no: "Нет",
		unknown: "Не указано в официальной записи",
		none: "Без ограничений",
		enhancement: "Предпросмотр улучшения",
		enhancementLevel: "Уровень улучшения",
		updating: "Обновляем улучшенные характеристики…",
		updateError: "Улучшенные характеристики временно недоступны. Показана предыдущая официальная запись.",
		retry: "Повторить",
		maxEnchant: "Обычный предел улучшения",
		maxExceed: "Предельное улучшение",
		safeEnchant: "Безопасное улучшение",
		magicSlots: "Ячейки камней маны",
		godSlots: "Ячейки божественных камней",
		mainStats: "Официальные основные характеристики",
		candidateStats: "Возможные характеристики Отпечатка души",
		candidateHelp: (count) => count ? `Это официальный список возможных характеристик. Первая печать даёт ${count} из них; одновременно действуют не все.` : "Это официальный список возможных характеристик. Фактический результат определяется в игре.",
		stat: "Характеристика",
		baseValue: "Базовое значение",
		enchantBonus: "Бонус улучшения",
		sources: "Официальные способы получения",
		costumes: "Связанные облики",
		duration: "Длительность",
		cooldown: "Время восстановления",
		imprintSkillLimit: "Лимит умения отпечатка",
		randomImprint: "Случайные характеристики отпечатка",
		retrievedAt: "Данные получены",
		minutes: "мин.",
		seconds: "сек.",
		official: "Открыть официальный источник",
		curated: "Читать полный гайд KINA",
		sourceNote: "Страница по запросу загружает опубликованную NC запись предмета. Поля, которых нет в официальном источнике, не дополняются догадками.",
		imageAlt: (name, category) => `Официальный значок предмета AION2 ${name}, категория ${category}`,
		summaryTitle: "Обзор предмета",
		summaryNotice: "Некоторые подробности не загрузились. Ниже показан последний доступный обзор.",
		snapshot: "Официальные данные предмета",
		officialDataLabel: "Официальные данные предметов NCSOFT",
		officialPageLabel: "Официальная страница предмета NCSOFT",
		seoDescription: (name, id, grade, category) => `Официальные данные ${name} (ID ${id}): качество ${grade}, ${category}, ограничения, характеристики, улучшение и источники.`,
		typeLabels: {
			Equip: "Экипировка",
			Accessory: "Аксессуар",
			Usable: "Расходуемый предмет",
			Misc: "Прочее"
		}
	},
	ko: {
		eyebrow: "공식 아이템 상세 정보",
		back: "아이템 데이터베이스로 돌아가기",
		itemId: "아이템 ID",
		grade: "등급",
		category: "분류",
		itemLevel: "아이템 레벨",
		equipLevel: "장착 레벨",
		race: "종족 제한",
		classes: "직업 제한",
		type: "아이템 유형",
		description: "공식 설명",
		systemStates: "시스템 상태",
		storable: "보관 가능",
		tradable: "거래 가능",
		personalTradable: "개인 거래",
		enchantable: "강화 가능",
		decomposable: "분해 가능",
		yes: "예",
		no: "아니요",
		unknown: "공식 자료에 없음",
		none: "제한 없음",
		enhancement: "강화 미리보기",
		enhancementLevel: "강화 단계",
		updating: "강화 능력치를 불러오는 중…",
		updateError: "강화 능력치를 갱신하지 못해 이전 공식 자료를 유지합니다.",
		retry: "다시 시도",
		maxEnchant: "일반 강화 상한",
		maxExceed: "초월 강화",
		safeEnchant: "안전 강화",
		magicSlots: "마석 슬롯",
		godSlots: "신석 슬롯",
		mainStats: "공식 주요 능력치",
		candidateStats: "영혼 각인 후보 능력치",
		candidateHelp: (count) => count ? `공식 후보 목록입니다. 첫 각인 시 이 중 ${count}개를 얻으며 모두 동시에 적용되지는 않습니다.` : "공식 후보 목록입니다. 실제 결과는 게임에서 결정됩니다.",
		stat: "능력치",
		baseValue: "기본값",
		enchantBonus: "강화 증가량",
		sources: "공식 획득처",
		costumes: "관련 외형",
		duration: "지속 시간",
		cooldown: "재사용 시간",
		imprintSkillLimit: "각인 스킬 상한",
		randomImprint: "무작위 각인 능력치",
		retrievedAt: "자료 수집 시각",
		minutes: "분",
		seconds: "초",
		official: "공식 출처 보기",
		curated: "KINA 전체 공략 보기",
		sourceNote: "이 페이지는 NC가 현재 공개한 아이템 자료를 필요할 때 불러옵니다. 공식 출처에 없는 값은 추정하지 않습니다.",
		imageAlt: (name, category) => `${name} ${category} AION2 공식 아이템 아이콘`,
		summaryTitle: "아이템 개요",
		summaryNotice: "일부 상세 정보를 불러오지 못해 현재 사용 가능한 개요를 표시합니다.",
		snapshot: "공식 아이템 자료",
		officialDataLabel: "NCSOFT 공식 아이템 데이터",
		officialPageLabel: "NCSOFT 공식 아이템 페이지",
		seoDescription: (name, id, grade, category) => `${name}(아이템 ID ${id}) 공식 상세 정보: ${grade}, ${category}, 착용 제한, 주요 능력치, 강화와 획득처.`,
		typeLabels: {
			Equip: "장비",
			Accessory: "장신구",
			Usable: "사용 아이템",
			Misc: "기타"
		}
	},
	"zh-hant": {
		eyebrow: "官方道具詳情",
		back: "返回物品資料庫",
		itemId: "道具 ID",
		grade: "品級",
		category: "分類",
		itemLevel: "道具等級",
		equipLevel: "裝備等級",
		race: "種族限制",
		classes: "職業限制",
		type: "道具類型",
		description: "官方說明",
		systemStates: "系統狀態",
		storable: "可存放",
		tradable: "可交易",
		personalTradable: "可個人交易",
		enchantable: "可強化",
		decomposable: "可分解",
		yes: "是",
		no: "否",
		unknown: "官方未提供",
		none: "無限制",
		enhancement: "強化預覽",
		enhancementLevel: "強化等級",
		updating: "正在更新強化屬性…",
		updateError: "暫時無法更新強化屬性，仍顯示上一筆官方資料。",
		retry: "重試",
		maxEnchant: "一般強化上限",
		maxExceed: "突破強化",
		safeEnchant: "安全強化",
		magicSlots: "魔石欄",
		godSlots: "神石欄",
		mainStats: "官方主要屬性",
		candidateStats: "靈魂刻印候選屬性",
		candidateHelp: (count) => count ? `官方候選池如下；首次刻印會從中獲得 ${count} 項，並非全部同時生效。` : "官方候選池如下；實際取得內容以遊戲內刻印結果為準。",
		stat: "屬性",
		baseValue: "基礎值",
		enchantBonus: "強化增量",
		sources: "官方取得來源",
		costumes: "關聯外觀",
		duration: "持續時間",
		cooldown: "冷卻時間",
		imprintSkillLimit: "刻印技能上限",
		randomImprint: "隨機刻印屬性",
		retrievedAt: "資料擷取時間",
		minutes: "分鐘",
		seconds: "秒",
		official: "查看官方來源",
		curated: "查看本站完整攻略",
		sourceNote: "本頁按需讀取 NC 官方目前公開的道具記錄；官方未提供的欄位不會自行推測。",
		imageAlt: (name, category) => `${name} ${category} AION2 官方物品圖示`,
		summaryTitle: "物品資料摘要",
		summaryNotice: "部分詳細資料暫時無法載入，以下顯示目前可用的物品資料摘要。",
		snapshot: "官方物品資料",
		officialDataLabel: "NCSOFT 官方物品資料",
		officialPageLabel: "NCSOFT 官方物品頁",
		seoDescription: (name, id, grade, category) => `${name}（道具 ID ${id}）官方詳情：${grade}、${category}、裝備限制、主要屬性、強化與取得來源。`,
		typeLabels: {
			Equip: "裝備",
			Accessory: "飾品",
			Usable: "可使用道具",
			Misc: "其他道具"
		}
	}
};
//#endregion
//#region app/official-item-detail.ts
function isOfficialItemDetail(value, expectedId) {
	const record = recordValue(value);
	return Boolean(record && (record.detailStatus === "full" || record.detailStatus === "summary") && typeof record.id === "string" && (!expectedId || record.id === expectedId) && typeof record.name === "string" && typeof record.gradeName === "string" && typeof record.categoryName === "string" && Number.isInteger(record.enchantLevel) && Number(record.enchantLevel) >= 0 && Number(record.enchantLevel) <= 50 && typeof record.iconUrl === "string" && isTrustedOfficialMediaUrl(record.iconUrl) && stringArrayValue(record.classNames) && stringArrayValue(record.summaryLines) && statArrayValue(record.mainStats) && statArrayValue(record.subStats));
}
function recordValue(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}
function stringArrayValue(value) {
	return Array.isArray(value) && value.length <= 100 && value.every((entry) => typeof entry === "string");
}
function statArrayValue(value) {
	return Array.isArray(value) && value.length <= 100 && value.every((entry) => {
		const record = recordValue(entry);
		return Boolean(record && typeof record.id === "string" && typeof record.name === "string" && (record.minValue === null || typeof record.minValue === "string") && (record.value === null || typeof record.value === "string") && (record.extra === null || typeof record.extra === "string") && typeof record.exceed === "boolean");
	});
}
function isTrustedOfficialMediaUrl(value) {
	try {
		const url = new URL(value);
		const hostname = url.hostname.toLowerCase();
		return url.protocol === "https:" && (hostname === "playnccdn.com" || hostname.endsWith(".playnccdn.com") || hostname === "ncsoft.com" || hostname.endsWith(".ncsoft.com") || hostname === "plaync.com" || hostname.endsWith(".plaync.com"));
	} catch {
		return false;
	}
}
var OfficialItemDetail_module_default = {
	detail: "_detail_m6u9c_1",
	backLink: "_backLink_m6u9c_5",
	identityCard: "_identityCard_m6u9c_17",
	iconFrame: "_iconFrame_m6u9c_31",
	identityCopy: "_identityCopy_m6u9c_58",
	enhancement: "_enhancement_m6u9c_59",
	identityTags: "_identityTags_m6u9c_80",
	sourceNote: "_sourceNote_m6u9c_96",
	provenance: "_provenance_m6u9c_104",
	summaryNotice: "_summaryNotice_m6u9c_106",
	enhancementStatus: "_enhancementStatus_m6u9c_158",
	contentGrid: "_contentGrid_m6u9c_181",
	primaryColumn: "_primaryColumn_m6u9c_189",
	sideColumn: "_sideColumn_m6u9c_190",
	panel: "_panel_m6u9c_200",
	tagGroup: "_tagGroup_m6u9c_209",
	description: "_description_m6u9c_215",
	tableScroller: "_tableScroller_m6u9c_223",
	helper: "_helper_m6u9c_260",
	summaryLines: "_summaryLines_m6u9c_267",
	candidateGrid: "_candidateGrid_m6u9c_284",
	factList: "_factList_m6u9c_330",
	flags: "_flags_m6u9c_357",
	actions: "_actions_m6u9c_380"
};
//#endregion
//#region app/_components/database/OfficialItemDetail.tsx
var import_jsx_runtime = require_jsx_runtime();
function displayValue(value, fallback) {
	return value === null || value === "" ? fallback : String(value);
}
function statValue(stat, fallback) {
	if (stat.minValue && stat.value && stat.minValue !== stat.value) return `${stat.minValue}–${stat.value}`;
	return stat.value ?? stat.minValue ?? fallback;
}
function hasBonus(value) {
	return Boolean(value && !/^0(?:\.0+)?%?$/u.test(value));
}
function measuredRange(minimum, maximum, unit) {
	if (minimum === null && maximum === null) return null;
	return `${minimum !== null && maximum !== null && minimum !== maximum ? `${minimum}–${maximum}` : String(minimum ?? maximum)} ${unit}`;
}
function retrievalTimestamp(value) {
	if (!value) return null;
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) return null;
	return `${new Date(timestamp).toISOString().slice(0, 16).replace("T", " ")} UTC`;
}
function OfficialItemDetail({ databaseHref, initialItem, locale }) {
	const copy = itemDetailCopy[locale];
	const [item, setItem] = (0, import_react.useState)(initialItem);
	const [pendingEnchant, setPendingEnchant] = (0, import_react.useState)(null);
	const [failedEnchant, setFailedEnchant] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(false);
	const requestController = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => requestController.current?.abort(), []);
	(0, import_react.useEffect)(() => {
		if (initialItem.detailStatus !== "summary") return;
		const controller = new AbortController();
		requestController.current = controller;
		fetch(`/api/items/${initialItem.id}?locale=${locale}&enchant=0`, {
			headers: { accept: "application/json" },
			signal: controller.signal
		}).then(async (response) => {
			if (!response.ok) return null;
			const next = await response.json();
			return isOfficialItemDetail(next, initialItem.id) && next.enchantLevel === 0 ? next : null;
		}).then((next) => {
			if (!controller.signal.aborted && next) setItem(next);
		}).catch(() => {}).finally(() => {
			if (requestController.current === controller) requestController.current = null;
		});
		return () => controller.abort();
	}, [
		initialItem.detailStatus,
		initialItem.id,
		locale
	]);
	const maximumEnhancement = Math.min(50, Math.max(0, (item.maxEnchantLevel ?? 0) + (item.maxExceedEnchantLevel ?? 0)));
	const curatedSlug = curatedItemSlug(item.id);
	const curatedHref = curatedSlug ? localizedHref(locale, `/database/${curatedSlug}/`) : null;
	const typeLabel = item.typeCode && item.typeCode in copy.typeLabels ? copy.typeLabels[item.typeCode] : item.typeCode ?? copy.unknown;
	const loadEnhancement = async (level) => {
		requestController.current?.abort();
		const controller = new AbortController();
		requestController.current = controller;
		setPendingEnchant(level);
		setFailedEnchant(null);
		setLoading(true);
		setError(false);
		try {
			const response = await fetch(`/api/items/${item.id}?locale=${locale}&enchant=${level}`, {
				headers: { accept: "application/json" },
				signal: controller.signal
			});
			if (!response.ok) throw new Error("Official item request failed");
			const next = await response.json();
			if (!isOfficialItemDetail(next, item.id) || next.enchantLevel !== level) throw new Error("Official item response mismatch");
			setItem(next);
		} catch {
			if (!controller.signal.aborted) {
				setFailedEnchant(level);
				setError(true);
			}
		} finally {
			if (!controller.signal.aborted) {
				setPendingEnchant(null);
				setLoading(false);
			}
		}
	};
	const facts = [
		[copy.itemId, item.id],
		[copy.grade, item.gradeName],
		[copy.category, item.categoryName],
		[copy.type, typeLabel],
		[copy.itemLevel, displayValue(item.itemLevel, copy.unknown)],
		[copy.equipLevel, displayValue(item.equipLevel, copy.unknown)],
		[copy.race, item.raceName || copy.none],
		[copy.classes, item.classNames.length ? item.classNames.join(" / ") : copy.none]
	];
	const limits = [
		[copy.maxEnchant, item.maxEnchantLevel],
		[copy.maxExceed, item.maxExceedEnchantLevel],
		[copy.safeEnchant, item.safeEnchantLevel],
		[copy.magicSlots, item.magicStoneSlots],
		[copy.godSlots, item.godStoneSlots]
	].filter((entry) => entry[1] !== null);
	const duration = measuredRange(item.durationMin, item.durationMax, copy.minutes);
	const retrievedAt = retrievalTimestamp(item.sourceRetrievedAt);
	const provenanceSources = [{
		kind: "official",
		label: copy.officialDataLabel,
		publisher: "NCSOFT",
		retrievedAt: item.sourceRetrievedAt,
		url: item.officialSourceUrl
	}, ...item.officialPageUrl !== item.officialSourceUrl ? [{
		kind: "official",
		label: copy.officialPageLabel,
		publisher: "NCSOFT",
		url: item.officialPageUrl
	}] : []];
	const usageFacts = [
		...duration ? [[copy.duration, duration]] : [],
		...item.coolTime !== null && item.coolTime > 0 ? [[copy.cooldown, `${item.coolTime} ${copy.seconds}`]] : [],
		...item.subSkillCountMax !== null ? [[copy.imprintSkillLimit, item.subSkillCountMax]] : [],
		...item.subStatRandom !== null ? [[copy.randomImprint, item.subStatRandom ? copy.yes : copy.no]] : [],
		...retrievedAt ? [[copy.retrievedAt, retrievedAt]] : []
	];
	const flags = [
		[copy.storable, item.storable],
		[copy.tradable, item.tradable],
		[copy.personalTradable, item.personalTradable],
		[copy.enchantable, item.enchantable],
		[copy.decomposable, item.decomposable]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: OfficialItemDetail_module_default.detail,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				className: OfficialItemDetail_module_default.backLink,
				href: databaseHref,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "←"
					}),
					" ",
					copy.back
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: OfficialItemDetail_module_default.identityCard,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: OfficialItemDetail_module_default.iconFrame,
					"data-grade": item.gradeCode?.toLowerCase(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						alt: copy.imageAlt(item.name, item.categoryName),
						fetchPriority: "high",
						height: "168",
						referrerPolicy: "no-referrer",
						src: item.iconUrl,
						width: "168"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: OfficialItemDetail_module_default.identityCopy,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.snapshot }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: item.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: OfficialItemDetail_module_default.identityTags,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.gradeName }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.categoryName }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["ID ", item.id] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: OfficialItemDetail_module_default.sourceNote,
							children: copy.sourceNote
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: OfficialItemDetail_module_default.provenance,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvenancePanel, {
					locale,
					note: copy.sourceNote,
					reportService: "unknown",
					retrievedAt: item.sourceRetrievedAt,
					sources: provenanceSources,
					status: item.detailStatus === "full" ? "official-detail" : "catalog-summary",
					targetKey: item.id,
					targetKind: "item",
					targetLabel: item.name,
					version: item.releaseVersion
				})
			}),
			item.detailStatus === "summary" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: OfficialItemDetail_module_default.summaryNotice,
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: copy.summaryTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.summaryNotice })]
			}) : null,
			maximumEnhancement > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: OfficialItemDetail_module_default.enhancement,
				"aria-labelledby": "item-enhancement-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.enhancement }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						id: "item-enhancement-title",
						children: [
							copy.enhancementLevel,
							" +",
							item.enchantLevel
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.enhancementLevel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						disabled: loading,
						onChange: (event) => void loadEnhancement(Number(event.target.value)),
						value: pendingEnchant ?? item.enchantLevel,
						children: Array.from({ length: maximumEnhancement + 1 }, (_, level) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: level,
							children: ["+", level]
						}, level))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"aria-live": "polite",
						className: OfficialItemDetail_module_default.enhancementStatus,
						"data-error": error || void 0,
						children: [loading ? copy.updating : error ? copy.updateError : null, error && failedEnchant !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => void loadEnhancement(failedEnchant),
							type: "button",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
								"aria-hidden": "true",
								size: 14
							}), copy.retry]
						}) : null]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: OfficialItemDetail_module_default.contentGrid,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: OfficialItemDetail_module_default.primaryColumn,
					children: [
						item.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: OfficialItemDetail_module_default.panel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: copy.description }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: OfficialItemDetail_module_default.description,
								children: item.description
							})]
						}) : null,
						item.summaryLines.length && (item.detailStatus === "summary" || !item.mainStats.length) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: OfficialItemDetail_module_default.panel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: copy.summaryTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: OfficialItemDetail_module_default.summaryLines,
								children: item.summaryLines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
							})]
						}) : null,
						item.mainStats.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: OfficialItemDetail_module_default.panel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: copy.mainStats }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: OfficialItemDetail_module_default.tableScroller,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: copy.stat
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: copy.baseValue
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: copy.enchantBonus
									})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: item.mainStats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "row",
										children: stat.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: statValue(stat, copy.unknown) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: hasBonus(stat.extra) ? `+${stat.extra}` : "—" })
								] }, `${stat.id}:${stat.exceed ? "exceed" : "base"}`)) })] })
							})]
						}) : null,
						item.subStats.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: OfficialItemDetail_module_default.panel,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: copy.candidateStats }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: OfficialItemDetail_module_default.helper,
									children: copy.candidateHelp(item.subStatCount)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: OfficialItemDetail_module_default.candidateGrid,
									children: item.subStats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stat.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: statValue(stat, copy.unknown) })] }, stat.id))
								})
							]
						}) : null,
						item.sources.length || item.costumes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: OfficialItemDetail_module_default.panel,
							children: [item.sources.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: OfficialItemDetail_module_default.tagGroup,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: copy.sources }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: item.sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: source }, source)) })]
							}) : null, item.costumes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: OfficialItemDetail_module_default.tagGroup,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: copy.costumes }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: item.costumes.map((costume) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: costume }, costume)) })]
							}) : null]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: OfficialItemDetail_module_default.sideColumn,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: OfficialItemDetail_module_default.panel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: copy.eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: OfficialItemDetail_module_default.factList,
								children: [
									facts.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value })] }, label)),
									limits.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value })] }, label)),
									usageFacts.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value })] }, label))
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: OfficialItemDetail_module_default.panel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: copy.systemStates }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: OfficialItemDetail_module_default.flags,
								children: flags.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									"data-state": value === null ? "unknown" : value ? "yes" : "no",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: value === null ? copy.unknown : value ? copy.yes : copy.no })]
								}, label))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: OfficialItemDetail_module_default.actions,
							children: [curatedHref ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: curatedHref,
								children: [copy.curated, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: " →"
								})]
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: item.officialPageUrl,
								rel: "noopener noreferrer",
								target: "_blank",
								children: [copy.official, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									"aria-hidden": "true",
									size: 15
								})]
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { OfficialItemDetail, OfficialItemDetail as default };
