import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-CU8j443B.js";
import { t as X } from "./x-Cgr92E5e.js";
import { d as siteLocaleConfig } from "./site-config-EbYJfejA.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import { n as ExternalLink, t as Clock3 } from "./clock-3-DLQpWMdH.js";
import { a as getChecklistActivityCopy, c as checklist_editorial_locales_generated_default, i as getChecklistActivity, n as CHECKLIST_BUILTIN_DEFINITIONS, o as getChecklistItemLabel, r as CHECKLIST_SOURCES, s as getChecklistSourceCopy, t as CHECKLIST_ACTIVITIES } from "./checklist-activities-DCN9enQR.js";
import { a as setChecklistRegion, c as getChecklistCycleState, i as readChecklistSnapshot, n as checklistStore, o as syncChecklistResets, r as ensureBuiltinChecklistItems, s as updateChecklistItems, t as addChecklistItem } from "./checklist-store-Pmpy4L7d.js";
import { n as CalendarDays, t as Server } from "./server-CrRzWXHo.js";
import { t as ChevronDown } from "./chevron-down-B5Ec6fJR.js";
import { t as Trash2 } from "./trash-2-COIzMATA.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Plus = createLucideIcon("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]);
//#endregion
//#region app/_components/tools/DailyChecklist.module.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var DailyChecklist_module_default = {
	checklist: "_checklist_58fcj_1",
	heading: "_heading_58fcj_12",
	toolbar: "_toolbar_58fcj_13",
	footerRow: "_footerRow_58fcj_14",
	actions: "_actions_58fcj_15",
	dialogHeading: "_dialogHeading_58fcj_16",
	dialogActions: "_dialogActions_58fcj_17",
	progressSummary: "_progressSummary_58fcj_33",
	kicker: "_kicker_58fcj_50",
	privacy: "_privacy_58fcj_58",
	resetPanel: "_resetPanel_58fcj_65",
	serverPicker: "_serverPicker_58fcj_85",
	resetIcon: "_resetIcon_58fcj_92",
	form: "_form_58fcj_109",
	serverClock: "_serverClock_58fcj_125",
	resetCards: "_resetCards_58fcj_149",
	maintenanceNote: "_maintenanceNote_58fcj_193",
	resetEvidence: "_resetEvidence_58fcj_200",
	filters: "_filters_58fcj_228",
	addTaskButton: "_addTaskButton_58fcj_236",
	detailButton: "_detailButton_58fcj_240",
	"delete": "_delete_58fcj_241",
	groupHeading: "_groupHeading_58fcj_287",
	groupDescription: "_groupDescription_58fcj_315",
	items: "_items_58fcj_322",
	itemMain: "_itemMain_58fcj_337",
	checkControl: "_checkControl_58fcj_346",
	itemCopy: "_itemCopy_58fcj_361",
	itemTitleLine: "_itemTitleLine_58fcj_367",
	itemMeta: "_itemMeta_58fcj_381",
	sources: "_sources_58fcj_382",
	itemActions: "_itemActions_58fcj_431",
	mapLink: "_mapLink_58fcj_467",
	done: "_done_58fcj_486",
	itemDetails: "_itemDetails_58fcj_495",
	empty: "_empty_58fcj_573",
	saved: "_saved_58fcj_587",
	error: "_error_58fcj_588",
	taskDialog: "_taskDialog_58fcj_618"
};
//#endregion
//#region app/_components/tools/DailyChecklist.tsx
var import_jsx_runtime = require_jsx_runtime();
var coreChecklistUiCopy = {
	"zh-hant": {
		title: "我的檢查清單",
		privacy: "完成狀態只保存在這個瀏覽器，不會上傳到 KINA。每日與每週項目會依所選遊戲服務的週期自動更新。",
		recommendationNote: "「核心／推薦／情境性」是 KINA 的路線建議，不是官方強制清單。特殊時段、次數與獎勵在改版後請以遊戲內顯示為準。",
		serverLegend: "遊戲服務與重置時間",
		region: "遊戲服務",
		tw: "台灣／香港／澳門",
		kr: "韓國",
		serverTime: "目前伺服器時間",
		dailyReset: "每日重置",
		weeklyReset: "每週重置",
		dailyRule: "每日 05:00",
		weeklyRule: "每週三 05:00",
		resetIn: "剩餘",
		maintenanceNote: "重置時間會依所選遊戲服務顯示；維護或活動期間個別內容可能調整，請以遊戲內倒數與官方公告為準。",
		filtersLabel: "查看清單",
		daily: "今日",
		weekly: "本週",
		once: "一次性",
		custom: "自訂",
		completed: "已完成",
		dailyGroup: "每日活動",
		weeklyGroup: "每週活動",
		customGroup: "自訂任務",
		dailyDescription: "在下一次每日重置前完成；票券型內容接近上限時優先消耗。",
		weeklyDescription: "分散到整週處理，不要全部留到週三重置前。",
		customDescription: "你建立的每日、每週與一次性任務。每日與每週會跟隨目前服務刷新。",
		customAction: "新增自訂任務",
		taskLabel: "任務名稱",
		taskPlaceholder: "例如：領取角色獎勵",
		frequencyLabel: "週期",
		add: "加入清單",
		cancel: "取消",
		formTitle: "新增自訂任務",
		formDescription: "每日與每週任務會跟隨目前遊戲服務的 05:00 週期；一次性任務不會自動重置。",
		progressDaily: (done, total) => `每日 ${done} / ${total}`,
		progressWeekly: (done, total) => `每週 ${done} / ${total}`,
		empty: "這個分類目前沒有項目。",
		delete: (label) => `刪除「${label}」`,
		reset: "清除本週期勾選",
		clear: "刪除已完成的一次性任務",
		saved: "已保存在目前裝置",
		storageError: "瀏覽器封鎖了本機儲存；本次變更可能不會保留。",
		limit: `自訂與地圖任務最多可加入 100 項，請先刪除一些項目。`,
		viewOnMap: "在地圖查看",
		mapLinkLabel: (marker) => `在地圖查看「${marker}」`,
		details: "查看詳情",
		closeDetails: "收起詳情",
		cadence: "次數與時段",
		entry: "如何進行",
		reward: "主要用途／獎勵",
		tip: "KINA 建議",
		sources: "官方指南與參考資料",
		sourceOfficial: "官方",
		sourceReference: "參考資料",
		checked: "核對",
		customItem: "自訂任務",
		mapItem: "地圖任務",
		core: "核心",
		recommended: "推薦",
		situational: "情境性",
		server: "伺服器",
		account: "帳號",
		character: "角色",
		trackerKicker: "AION2 例行清單",
		dailyKicker: "每日",
		weeklyKicker: "每週",
		customKicker: "自訂",
		completedKicker: "已完成",
		customTaskKicker: "自訂任務",
		daysRemaining: (days, clock) => `${days} 天 ${clock}`
	},
	en: {
		title: "My checklist",
		privacy: "Completion stays in this browser and is never uploaded to KINA. Daily and weekly items move to a new cycle automatically for the selected game service.",
		recommendationNote: "Core, recommended, and situational are KINA route suggestions—not an official mandatory list. After an update, trust the in-game panel for special windows, counts, and rewards.",
		serverLegend: "Game service and reset time",
		region: "Game service",
		tw: "Taiwan / Hong Kong / Macau",
		kr: "Korea",
		serverTime: "Current server time",
		dailyReset: "Daily reset",
		weeklyReset: "Weekly reset",
		dailyRule: "Daily at 05:00",
		weeklyRule: "Wednesday at 05:00",
		resetIn: "in",
		maintenanceNote: "Reset times follow the selected service. During maintenance or event periods, check the in-game timer because individual activities may differ.",
		filtersLabel: "Checklist view",
		daily: "Today",
		weekly: "This week",
		once: "One-time",
		custom: "Custom",
		completed: "Completed",
		dailyGroup: "Daily activities",
		weeklyGroup: "Weekly activities",
		customGroup: "Custom tasks",
		dailyDescription: "Finish before the next daily reset; spend charge-based entries first when close to the cap.",
		weeklyDescription: "Spread these across the week instead of leaving everything until Wednesday reset.",
		customDescription: "Your daily, weekly, and one-time tasks. Daily and weekly tasks follow the selected service.",
		customAction: "Add custom task",
		taskLabel: "Task name",
		taskPlaceholder: "For example: claim a character reward",
		frequencyLabel: "Frequency",
		add: "Add to checklist",
		cancel: "Cancel",
		formTitle: "Add a custom task",
		formDescription: "Daily and weekly tasks follow the selected service's 05:00 cycle. One-time tasks never reset automatically.",
		progressDaily: (done, total) => `Daily ${done} / ${total}`,
		progressWeekly: (done, total) => `Weekly ${done} / ${total}`,
		empty: "There are no items in this view yet.",
		delete: (label) => `Delete “${label}”`,
		reset: "Clear current-cycle checks",
		clear: "Delete completed one-time tasks",
		saved: "Saved on this device",
		storageError: "This browser blocked local storage, so changes may not persist.",
		limit: `Custom and map tasks can hold up to 100 items. Delete one before adding another.`,
		viewOnMap: "View on map",
		mapLinkLabel: (marker) => `View “${marker}” on the map`,
		details: "View details",
		closeDetails: "Hide details",
		cadence: "Count and schedule",
		entry: "How to enter",
		reward: "Main use / rewards",
		tip: "KINA tip",
		sources: "Official guides and references",
		sourceOfficial: "Official",
		sourceReference: "Reference",
		checked: "checked",
		customItem: "Custom task",
		mapItem: "Map task",
		core: "Core",
		recommended: "Recommended",
		situational: "Situational",
		server: "Server",
		account: "Account",
		character: "Character",
		trackerKicker: "AION2 ROUTINE TRACKER",
		dailyKicker: "DAILY",
		weeklyKicker: "WEEKLY",
		customKicker: "CUSTOM",
		completedKicker: "COMPLETE",
		customTaskKicker: "CUSTOM TASK",
		daysRemaining: (days, clock) => `${days}d ${clock}`
	},
	ko: {
		title: "내 체크리스트",
		privacy: "완료 상태는 이 브라우저에만 저장되며 KINA로 전송되지 않습니다. 일일·주간 항목은 선택한 게임 서비스 주기에 맞춰 자동으로 새 주기로 전환됩니다.",
		recommendationNote: "핵심·추천·상황별 표시는 KINA의 루트 제안이며 공식 필수 목록이 아닙니다. 업데이트 후 특수 시간, 횟수, 보상은 게임 내 표시를 우선하세요.",
		serverLegend: "게임 서비스와 초기화 시간",
		region: "게임 서비스",
		tw: "대만 / 홍콩 / 마카오",
		kr: "한국",
		serverTime: "현재 서버 시간",
		dailyReset: "일일 초기화",
		weeklyReset: "주간 초기화",
		dailyRule: "매일 05:00",
		weeklyRule: "수요일 05:00",
		resetIn: "남음",
		maintenanceNote: "초기화 시간은 선택한 서비스를 따릅니다. 점검 또는 이벤트 기간에는 개별 활동 시간이 달라질 수 있으므로 게임 내 타이머를 확인하세요.",
		filtersLabel: "체크리스트 보기",
		daily: "오늘",
		weekly: "이번 주",
		once: "한 번",
		custom: "사용자",
		completed: "완료",
		dailyGroup: "일일 활동",
		weeklyGroup: "주간 활동",
		customGroup: "사용자 작업",
		dailyDescription: "다음 일일 초기화 전에 완료하고 입장권이 상한에 가까운 콘텐츠를 먼저 소모하세요.",
		weeklyDescription: "수요일 초기화 직전에 몰리지 않도록 한 주 동안 나눠 진행하세요.",
		customDescription: "직접 만든 일일·주간·일회성 작업입니다. 일일·주간 작업은 현재 서비스를 따릅니다.",
		customAction: "사용자 작업 추가",
		taskLabel: "작업 이름",
		taskPlaceholder: "예: 캐릭터 보상 받기",
		frequencyLabel: "주기",
		add: "체크리스트에 추가",
		cancel: "취소",
		formTitle: "사용자 작업 추가",
		formDescription: "일일·주간 작업은 현재 게임 서비스의 05:00 주기를 따르며 일회성 작업은 자동 초기화되지 않습니다.",
		progressDaily: (done, total) => `일일 ${done} / ${total}`,
		progressWeekly: (done, total) => `주간 ${done} / ${total}`,
		empty: "이 보기에 아직 항목이 없습니다.",
		delete: (label) => `“${label}” 삭제`,
		reset: "현재 주기 체크 해제",
		clear: "완료한 일회성 작업 삭제",
		saved: "현재 기기에 저장됨",
		storageError: "브라우저가 로컬 저장소를 차단해 변경 사항이 유지되지 않을 수 있습니다.",
		limit: `사용자·지도 작업은 최대 100개까지 추가할 수 있습니다. 일부 항목을 먼저 삭제해 주세요.`,
		viewOnMap: "지도에서 보기",
		mapLinkLabel: (marker) => `지도에서 “${marker}” 보기`,
		details: "상세 보기",
		closeDetails: "상세 닫기",
		cadence: "횟수와 시간",
		entry: "진행 방법",
		reward: "주요 용도·보상",
		tip: "KINA 제안",
		sources: "공식 안내 및 참고 자료",
		sourceOfficial: "공식",
		sourceReference: "참고",
		checked: "확인",
		customItem: "사용자 작업",
		mapItem: "지도 작업",
		core: "핵심",
		recommended: "추천",
		situational: "상황별",
		server: "서버",
		account: "계정",
		character: "캐릭터",
		trackerKicker: "AION2 루틴 체크리스트",
		dailyKicker: "일일",
		weeklyKicker: "주간",
		customKicker: "사용자",
		completedKicker: "완료",
		customTaskKicker: "사용자 작업",
		daysRemaining: (days, clock) => `${days}일 ${clock}`
	}
};
var editorialChecklistLocales = [
	"zh-hans",
	"fr",
	"de",
	"es",
	"ja",
	"pt-br",
	"ru"
];
var generatedChecklistUi = checklist_editorial_locales_generated_default.translations;
var editorialChecklistUiOverrides = {
	"zh-hans": {
		title: "我的检查清单",
		serverLegend: "游戏服务与重置时间",
		region: "游戏服务",
		tw: "台湾／香港／澳门",
		kr: "韩国",
		trackerKicker: "AION2 日常清单",
		dailyKicker: "每日",
		weeklyKicker: "每周",
		customKicker: "自定义",
		completedKicker: "已完成",
		customTaskKicker: "自定义任务",
		progressDaily: "每日 {done} / {total}",
		progressWeekly: "每周 {done} / {total}",
		delete: "删除“{label}”",
		limit: "自定义与地图任务最多可添加 {limit} 项，请先删除一些项目。",
		mapLinkLabel: "在地图上查看“{marker}”",
		daysRemaining: "{days} 天 {clock}"
	},
	fr: {
		title: "Ma liste de suivi",
		serverLegend: "Service de jeu et heure de réinitialisation",
		region: "Service de jeu",
		tw: "Taïwan / Hong Kong / Macao",
		kr: "Corée",
		trackerKicker: "SUIVI DES ROUTINES AION2",
		dailyKicker: "QUOTIDIEN",
		weeklyKicker: "HEBDOMADAIRE",
		customKicker: "PERSONNALISÉ",
		completedKicker: "TERMINÉ",
		customTaskKicker: "TÂCHE PERSONNALISÉE",
		progressDaily: "Quotidien {done} / {total}",
		progressWeekly: "Hebdomadaire {done} / {total}",
		delete: "Supprimer « {label} »",
		limit: "Les tâches personnalisées et de carte sont limitées à {limit}. Supprimez-en une avant d'en ajouter une autre.",
		mapLinkLabel: "Voir « {marker} » sur la carte",
		daysRemaining: "{days} j {clock}"
	},
	de: {
		title: "Meine Checkliste",
		serverLegend: "Spielservice und Rücksetzzeit",
		region: "Spielservice",
		tw: "Taiwan / Hongkong / Macau",
		kr: "Korea",
		trackerKicker: "AION2-ROUTINENPLANER",
		dailyKicker: "TÄGLICH",
		weeklyKicker: "WÖCHENTLICH",
		customKicker: "EIGENE",
		completedKicker: "ERLEDIGT",
		customTaskKicker: "EIGENE AUFGABE",
		progressDaily: "Täglich {done} / {total}",
		progressWeekly: "Wöchentlich {done} / {total}",
		delete: "„{label}“ löschen",
		limit: "Eigene und Kartenaufgaben sind auf {limit} Einträge begrenzt. Lösche vor dem Hinzufügen einen Eintrag.",
		mapLinkLabel: "„{marker}“ auf der Karte anzeigen",
		daysRemaining: "{days} T {clock}"
	},
	es: {
		title: "Mi lista de seguimiento",
		serverLegend: "Servicio de juego y hora de reinicio",
		region: "Servicio de juego",
		tw: "Taiwán / Hong Kong / Macao",
		kr: "Corea",
		trackerKicker: "SEGUIMIENTO DE RUTINAS DE AION2",
		dailyKicker: "DIARIO",
		weeklyKicker: "SEMANAL",
		customKicker: "PERSONALIZADO",
		completedKicker: "COMPLETADO",
		customTaskKicker: "TAREA PERSONALIZADA",
		progressDaily: "Diario {done} / {total}",
		progressWeekly: "Semanal {done} / {total}",
		delete: "Eliminar «{label}»",
		limit: "Las tareas personalizadas y del mapa admiten hasta {limit} elementos. Elimina uno antes de añadir otro.",
		mapLinkLabel: "Ver «{marker}» en el mapa",
		daysRemaining: "{days} d {clock}"
	},
	ja: {
		title: "マイチェックリスト",
		serverLegend: "ゲームサービスとリセット時刻",
		region: "ゲームサービス",
		tw: "台湾／香港／マカオ",
		kr: "韓国",
		trackerKicker: "AION2 ルーティンチェック",
		dailyKicker: "デイリー",
		weeklyKicker: "ウィークリー",
		customKicker: "カスタム",
		completedKicker: "完了",
		customTaskKicker: "カスタムタスク",
		progressDaily: "デイリー {done} / {total}",
		progressWeekly: "ウィークリー {done} / {total}",
		delete: "「{label}」を削除",
		limit: "カスタムタスクとマップタスクは最大 {limit} 件です。追加する前に項目を削除してください。",
		mapLinkLabel: "マップで「{marker}」を見る",
		daysRemaining: "{days}日 {clock}"
	},
	"pt-br": {
		title: "Minha lista de atividades",
		serverLegend: "Serviço de jogo e horário de redefinição",
		region: "Serviço de jogo",
		tw: "Taiwan / Hong Kong / Macau",
		kr: "Coreia",
		trackerKicker: "ROTINA AION2",
		dailyKicker: "DIÁRIO",
		weeklyKicker: "SEMANAL",
		customKicker: "PERSONALIZADO",
		completedKicker: "CONCLUÍDO",
		customTaskKicker: "TAREFA PERSONALIZADA",
		progressDaily: "Diário {done} / {total}",
		progressWeekly: "Semanal {done} / {total}",
		delete: "Excluir “{label}”",
		limit: "As tarefas personalizadas e do mapa comportam até {limit} itens. Exclua um antes de adicionar outro.",
		mapLinkLabel: "Ver “{marker}” no mapa",
		daysRemaining: "{days} d {clock}"
	},
	ru: {
		title: "Мой список дел",
		serverLegend: "Игровой сервис и время сброса",
		region: "Игровой сервис",
		tw: "Тайвань / Гонконг / Макао",
		kr: "Корея",
		trackerKicker: "ТРЕКЕР РУТИН AION2",
		dailyKicker: "ЕЖЕДНЕВНО",
		weeklyKicker: "ЕЖЕНЕДЕЛЬНО",
		customKicker: "СВОИ",
		completedKicker: "ВЫПОЛНЕНО",
		customTaskKicker: "СВОЯ ЗАДАЧА",
		progressDaily: "Ежедневно {done} / {total}",
		progressWeekly: "Еженедельно {done} / {total}",
		delete: "Удалить «{label}»",
		limit: "Можно сохранить не более {limit} своих задач и задач с карты. Перед добавлением удалите одну.",
		mapLinkLabel: "Показать «{marker}» на карте",
		daysRemaining: "{days} д. {clock}"
	}
};
function applyTemplate(template, values) {
	return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, String(value)), template);
}
function hydrateChecklistUiCopy(template) {
	return {
		...template,
		progressDaily: (done, total) => applyTemplate(template.progressDaily, {
			done,
			total
		}),
		progressWeekly: (done, total) => applyTemplate(template.progressWeekly, {
			done,
			total
		}),
		delete: (label) => applyTemplate(template.delete, { label }),
		limit: applyTemplate(template.limit, { limit: 100 }),
		mapLinkLabel: (marker) => applyTemplate(template.mapLinkLabel, { marker }),
		daysRemaining: (days, clock) => applyTemplate(template.daysRemaining, {
			days,
			clock
		})
	};
}
var checklistUiCopy = {
	"zh-hant": coreChecklistUiCopy["zh-hant"],
	en: coreChecklistUiCopy.en,
	ko: coreChecklistUiCopy.ko,
	...Object.fromEntries(editorialChecklistLocales.map((locale) => [locale, hydrateChecklistUiCopy({
		...generatedChecklistUi[locale].ui,
		...editorialChecklistUiOverrides[locale]
	})]))
};
function getMapHref(locale, mapRef) {
	return `/${locale}/tools/map/${encodeURIComponent(mapRef.mapSlug)}/#poi=${encodeURIComponent(mapRef.markerId)}`;
}
function durationLabel(milliseconds, text) {
	const totalSeconds = Math.max(0, Math.floor(milliseconds / 1e3));
	const days = Math.floor(totalSeconds / 86400);
	const clock = [
		Math.floor(totalSeconds % 86400 / 3600),
		Math.floor(totalSeconds % 3600 / 60),
		totalSeconds % 60
	].map((value) => String(value).padStart(2, "0")).join(":");
	if (!days) return clock;
	return text.daysRemaining(days, clock);
}
function virtualBuiltinItem(activity) {
	return {
		id: `builtin:${activity.id}`,
		builtinId: activity.id,
		label: activity.copy.en.name,
		frequency: activity.frequency,
		done: false,
		source: "builtin"
	};
}
function DailyChecklist({ initialNow, locale }) {
	const text = checklistUiCopy[locale];
	const labelId = (0, import_react.useId)();
	const frequencyId = (0, import_react.useId)();
	const dialogTitleId = (0, import_react.useId)();
	const dialogRef = (0, import_react.useRef)(null);
	const [label, setLabel] = (0, import_react.useState)("");
	const [frequency, setFrequency] = (0, import_react.useState)("daily");
	const [filter, setFilter] = (0, import_react.useState)("daily");
	const [expandedId, setExpandedId] = (0, import_react.useState)(null);
	const [customOpen, setCustomOpen] = (0, import_react.useState)(false);
	const [addLimitReached, setAddLimitReached] = (0, import_react.useState)(false);
	const [now, setNow] = (0, import_react.useState)(initialNow);
	const storedValue = (0, import_react.useSyncExternalStore)(checklistStore.subscribe, checklistStore.getSnapshot, checklistStore.getServerSnapshot);
	const snapshot = (0, import_react.useMemo)(() => readChecklistSnapshot(storedValue, { now }), [now, storedValue]);
	const items = (0, import_react.useMemo)(() => {
		const storedBuiltins = new Map(snapshot.items.filter((item) => item.source === "builtin" && item.builtinId).map((item) => [item.builtinId, item]));
		const catalogItems = CHECKLIST_ACTIVITIES.map((activity) => storedBuiltins.get(activity.id) ?? virtualBuiltinItem(activity));
		const customItems = snapshot.items.filter((item) => item.source !== "builtin");
		return [...catalogItems, ...customItems];
	}, [snapshot.items]);
	const cycleState = (0, import_react.useMemo)(() => getChecklistCycleState(snapshot.settings.region, now), [now, snapshot.settings.region]);
	const visibleItems = (0, import_react.useMemo)(() => {
		if (filter === "custom") return items.filter((item) => item.source !== "builtin");
		if (filter === "completed") return items.filter((item) => item.done);
		return items.filter((item) => item.frequency === filter);
	}, [filter, items]);
	const dailyItems = items.filter((item) => item.frequency === "daily");
	const weeklyItems = items.filter((item) => item.frequency === "weekly");
	const dailyDone = dailyItems.filter((item) => item.done).length;
	const weeklyDone = weeklyItems.filter((item) => item.done).length;
	const userItemCount = items.filter((item) => item.source !== "builtin").length;
	const resetDateFormatter = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: cycleState.serverTimeZone
	}), [cycleState.serverTimeZone, locale]);
	const serverTimeFormatter = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
		dateStyle: "medium",
		timeStyle: "medium",
		timeZone: cycleState.serverTimeZone
	}), [cycleState.serverTimeZone, locale]);
	(0, import_react.useEffect)(() => {
		ensureBuiltinChecklistItems(CHECKLIST_BUILTIN_DEFINITIONS);
		syncChecklistResets();
		trackEvent("tool_open", {
			locale,
			tool_name: "daily_checklist"
		});
	}, [locale]);
	(0, import_react.useEffect)(() => {
		const updateClock = () => setNow(Date.now());
		const timer = window.setInterval(updateClock, 1e3);
		const synchronize = () => {
			if (document.visibilityState === "hidden") return;
			syncChecklistResets();
			updateClock();
		};
		window.addEventListener("focus", synchronize);
		document.addEventListener("visibilitychange", synchronize);
		return () => {
			window.clearInterval(timer);
			window.removeEventListener("focus", synchronize);
			document.removeEventListener("visibilitychange", synchronize);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (customOpen && !dialog.open) dialog.showModal();
		if (!customOpen && dialog.open) dialog.close();
	}, [customOpen]);
	function addItem(event) {
		event.preventDefault();
		const result = addChecklistItem({
			label,
			frequency
		});
		if (result?.outcome === "limit") {
			setAddLimitReached(true);
			return;
		}
		if (!result?.added) return;
		setAddLimitReached(false);
		trackEvent("checklist_item_create", {
			frequency,
			surface: "daily_checklist"
		});
		setLabel("");
		setFilter("custom");
		setCustomOpen(false);
	}
	function toggleItem(item) {
		ensureBuiltinChecklistItems(CHECKLIST_BUILTIN_DEFINITIONS);
		const done = !item.done;
		updateChecklistItems((current) => current.map((candidate) => candidate.id === item.id ? {
			...candidate,
			done,
			...done ? { completedAt: (/* @__PURE__ */ new Date()).toISOString() } : { completedAt: void 0 }
		} : candidate));
		trackEvent(done ? "checklist_item_complete" : "checklist_item_reopen", {
			frequency: item.frequency,
			has_map_ref: Boolean(item.mapRef),
			is_builtin: item.source === "builtin",
			surface: "daily_checklist"
		});
	}
	function deleteItem(id) {
		updateChecklistItems((current) => current.filter((item) => item.id !== id));
		setAddLimitReached(false);
	}
	function changeRegion(region) {
		if (region === snapshot.settings.region) return;
		setChecklistRegion(region);
		setNow(Date.now());
		trackEvent("checklist_region_change", {
			region,
			surface: "daily_checklist"
		});
	}
	const groupTitle = filter === "daily" ? text.dailyGroup : filter === "weekly" ? text.weeklyGroup : filter === "custom" ? text.customGroup : text.completed;
	const groupDescription = filter === "daily" ? text.dailyDescription : filter === "weekly" ? text.weeklyDescription : filter === "custom" ? text.customDescription : text.recommendationNote;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: DailyChecklist_module_default.checklist,
		"aria-labelledby": "daily-checklist-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: DailyChecklist_module_default.heading,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: DailyChecklist_module_default.kicker,
					children: text.trackerKicker
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "daily-checklist-title",
					children: text.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: DailyChecklist_module_default.progressSummary,
					"aria-label": `${text.progressDaily(dailyDone, dailyItems.length)}; ${text.progressWeekly(weeklyDone, weeklyItems.length)}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.progressDaily(dailyDone, dailyItems.length) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.progressWeekly(weeklyDone, weeklyItems.length) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: DailyChecklist_module_default.privacy,
				children: text.privacy
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: DailyChecklist_module_default.resetPanel,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: text.serverLegend }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: DailyChecklist_module_default.serverPicker,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: DailyChecklist_module_default.resetIcon,
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 18 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "checklist-region",
								children: text.region
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "checklist-region",
								onChange: (event) => changeRegion(event.target.value),
								value: snapshot.settings.region,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "tw",
									children: text.tw
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "kr",
									children: text.kr
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: DailyChecklist_module_default.serverClock,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: text.serverTime }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: serverTimeFormatter.format(now) })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: DailyChecklist_module_default.resetCards,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								text.dailyReset,
								" · ",
								text.dailyRule
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								text.resetIn,
								" ",
								durationLabel(cycleState.nextDailyResetAt.getTime() - now, text)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								dateTime: cycleState.nextDailyResetAt.toISOString(),
								children: resetDateFormatter.format(cycleState.nextDailyResetAt)
							})
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								text.weeklyReset,
								" · ",
								text.weeklyRule
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								text.resetIn,
								" ",
								durationLabel(cycleState.nextWeeklyResetAt.getTime() - now, text)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								dateTime: cycleState.nextWeeklyResetAt.toISOString(),
								children: resetDateFormatter.format(cycleState.nextWeeklyResetAt)
							})
						] })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: DailyChecklist_module_default.maintenanceNote,
						children: text.maintenanceNote
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: DailyChecklist_module_default.resetEvidence,
						children: ["dailyBoundary", "weeklyReset"].map((sourceId) => {
							const source = CHECKLIST_SOURCES[sourceId];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: source.url,
								rel: "noreferrer",
								target: "_blank",
								children: [getChecklistSourceCopy(sourceId, locale).label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									"aria-hidden": "true",
									size: 13
								})]
							}, sourceId);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: DailyChecklist_module_default.toolbar,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-label": text.filtersLabel,
					className: DailyChecklist_module_default.filters,
					role: "group",
					children: [
						"daily",
						"weekly",
						"custom",
						"completed"
					].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"aria-pressed": filter === value,
						onClick: () => setFilter(value),
						type: "button",
						children: [text[value], /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value === "daily" ? dailyItems.length : value === "weekly" ? weeklyItems.length : value === "custom" ? userItemCount : items.filter((item) => item.done).length })]
					}, value))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: DailyChecklist_module_default.addTaskButton,
					onClick: () => setCustomOpen(true),
					type: "button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						size: 17,
						"aria-hidden": "true"
					}), text.customAction]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: DailyChecklist_module_default.groupHeading,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: filter === "daily" ? text.dailyKicker : filter === "weekly" ? text.weeklyKicker : filter === "custom" ? text.customKicker : text.completedKicker }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: groupTitle })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					visibleItems.filter((item) => item.done).length,
					" / ",
					visibleItems.length
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: DailyChecklist_module_default.groupDescription,
				children: groupDescription
			}),
			visibleItems.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: DailyChecklist_module_default.items,
				children: visibleItems.map((item) => {
					const activity = getChecklistActivity(item.builtinId);
					const activityCopy = activity ? getChecklistActivityCopy(activity, locale) : void 0;
					const itemLabel = getChecklistItemLabel(item, locale);
					const isExpanded = expandedId === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: item.done ? DailyChecklist_module_default.done : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: DailyChecklist_module_default.itemMain,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: DailyChecklist_module_default.checkControl,
									"aria-label": `${item.done ? text.completed : ""} ${itemLabel}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										checked: item.done,
										onChange: () => toggleItem(item),
										type: "checkbox"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: DailyChecklist_module_default.itemCopy,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: DailyChecklist_module_default.itemTitleLine,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: itemLabel }), activity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-priority": activity.priority,
												children: text[activity.priority]
											}) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: activityCopy?.summary ?? (item.mapRef ? text.mapItem : text.customItem) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: DailyChecklist_module_default.itemMeta,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activity ? text[activity.scope] : text[item.frequency] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activityCopy?.cadence ?? text[item.frequency] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: DailyChecklist_module_default.itemActions,
									children: [
										activity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											"aria-controls": `checklist-detail-${activity.id}`,
											"aria-expanded": isExpanded,
											"aria-label": isExpanded ? text.closeDetails : text.details,
											className: DailyChecklist_module_default.detailButton,
											onClick: () => setExpandedId(isExpanded ? null : item.id),
											title: isExpanded ? text.closeDetails : text.details,
											type: "button",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
												"aria-hidden": "true",
												size: 18
											})
										}) : null,
										item.mapRef ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											"aria-label": text.mapLinkLabel(item.mapRef.markerNameSnapshot ?? itemLabel),
											className: DailyChecklist_module_default.mapLink,
											href: getMapHref(locale, item.mapRef),
											onClick: () => trackEvent("checklist_to_map_open", {
												map_name: item.mapRef?.mapName,
												marker_id: item.mapRef?.markerId,
												surface: "daily_checklist"
											}),
											children: text.viewOnMap
										}) : null,
										item.source !== "builtin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											"aria-label": text.delete(itemLabel),
											className: DailyChecklist_module_default.delete,
											onClick: () => deleteItem(item.id),
											title: text.delete(itemLabel),
											type: "button",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												"aria-hidden": "true",
												size: 17
											})
										}) : null
									]
								})
							]
						}), activity && isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: DailyChecklist_module_default.itemDetails,
							id: `checklist-detail-${activity.id}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: text.cadence }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: activityCopy?.cadence })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: text.entry }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: activityCopy?.entry })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: text.reward }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: activityCopy?.reward })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: text.tip }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: activityCopy?.tip })] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: DailyChecklist_module_default.sources,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: text.sources }), activity.sourceIds.map((sourceId) => {
									const source = CHECKLIST_SOURCES[sourceId];
									const sourceCopy = getChecklistSourceCopy(sourceId, locale);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: source.url,
										rel: "noreferrer",
										target: "_blank",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: source.status === "official" ? text.sourceOfficial : text.sourceReference }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sourceCopy.label }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
												sourceCopy.note,
												" · ",
												text.checked,
												" ",
												source.checkedAt
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
												"aria-hidden": "true",
												size: 14
											})
										]
									}, sourceId);
								})]
							})]
						}) : null]
					}, item.id);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: DailyChecklist_module_default.empty,
				children: text.empty
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: DailyChecklist_module_default.footerRow,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-live": "polite",
					className: snapshot.storageUnavailable ? DailyChecklist_module_default.error : DailyChecklist_module_default.saved,
					children: snapshot.storageUnavailable ? text.storageError : text.saved
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: DailyChecklist_module_default.actions,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: !items.some((item) => item.done && item.frequency !== "once"),
						onClick: () => {
							updateChecklistItems((current) => current.map((item) => item.frequency === "once" ? item : {
								...item,
								done: false,
								completedAt: void 0
							}));
							trackEvent("checklist_reset", { surface: "daily_checklist" });
						},
						type: "button",
						children: text.reset
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: !items.some((item) => item.source !== "builtin" && item.frequency === "once" && item.done),
						onClick: () => {
							updateChecklistItems((current) => current.filter((item) => !(item.source !== "builtin" && item.frequency === "once" && item.done)));
							trackEvent("checklist_clear_completed", { surface: "daily_checklist" });
						},
						type: "button",
						children: text.clear
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dialog", {
				"aria-labelledby": dialogTitleId,
				className: DailyChecklist_module_default.taskDialog,
				onCancel: () => setCustomOpen(false),
				onClose: () => setCustomOpen(false),
				ref: dialogRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: DailyChecklist_module_default.form,
					onSubmit: addItem,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: DailyChecklist_module_default.dialogHeading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: DailyChecklist_module_default.kicker,
								children: text.customTaskKicker
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: dialogTitleId,
								children: text.formTitle
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": text.cancel,
								onClick: () => setCustomOpen(false),
								type: "button",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									"aria-hidden": "true",
									size: 19
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text.formDescription }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: labelId,
							children: text.taskLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoComplete: "off",
							id: labelId,
							maxLength: 80,
							onChange: (event) => setLabel(event.target.value),
							placeholder: text.taskPlaceholder,
							required: true,
							value: label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: frequencyId,
							children: text.frequencyLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: frequencyId,
							onChange: (event) => setFrequency(event.target.value),
							value: frequency,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "daily",
									children: text.daily
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "weekly",
									children: text.weekly
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "once",
									children: text.once
								})
							]
						}),
						addLimitReached ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: DailyChecklist_module_default.error,
							role: "alert",
							children: text.limit
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: DailyChecklist_module_default.dialogActions,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCustomOpen(false),
								type: "button",
								children: text.cancel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: userItemCount >= 100,
								type: "submit",
								children: text.add
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { DailyChecklist };
