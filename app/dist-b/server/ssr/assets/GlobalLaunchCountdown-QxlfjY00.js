import { D as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { d as siteLocaleConfig } from "./site-config-EbYJfejA.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
//#region app/global-launch-countdown.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var DAY_IN_MS = 864e5;
var globalLaunchCountdownConfig = {
	earlyAccessDate: "2026-09-30",
	earlyAccessDurationDays: 5
};
function parseDateOnly(date) {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(date);
	if (!match) throw new Error(`Expected an ISO date without a time: ${date}`);
	return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}
function localCalendarDay(now) {
	return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
}
function formatGlobalLaunchDate(date, locale) {
	return new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "long",
		timeZone: "UTC",
		year: "numeric"
	}).format(new Date(parseDateOnly(date)));
}
function getGlobalLaunchCountdownState(now, config = globalLaunchCountdownConfig) {
	const today = localCalendarDay(now);
	const earlyAccessDay = parseDateOnly(config.earlyAccessDate);
	const publicLaunchDay = config.publicLaunchDate ? parseDateOnly(config.publicLaunchDate) : null;
	if (today < earlyAccessDay) return {
		days: Math.ceil((earlyAccessDay - today) / DAY_IN_MS),
		phase: "early-access-countdown"
	};
	if (publicLaunchDay !== null) {
		if (today < publicLaunchDay) return {
			days: Math.ceil((publicLaunchDay - today) / DAY_IN_MS),
			phase: "public-launch-countdown"
		};
		return {
			days: 0,
			phase: "launched"
		};
	}
	if (today < earlyAccessDay + config.earlyAccessDurationDays * DAY_IN_MS) return {
		days: 0,
		phase: "early-access-live"
	};
	return {
		days: null,
		phase: "launch-date-pending"
	};
}
var GlobalLaunchCountdown_module_default = {
	section: "_section_hcwtn_1",
	shell: "_shell_hcwtn_22",
	intro: "_intro_hcwtn_32",
	eyebrow: "_eyebrow_hcwtn_36",
	actions: "_actions_hcwtn_63",
	primaryAction: "_primaryAction_hcwtn_70",
	secondaryAction: "_secondaryAction_hcwtn_71",
	tertiaryAction: "_tertiaryAction_hcwtn_72",
	countdownPanel: "_countdownPanel_hcwtn_125",
	counter: "_counter_hcwtn_141",
	milestones: "_milestones_hcwtn_173",
	milestoneColumn: "_milestoneColumn_hcwtn_183",
	currentStatus: "_currentStatus_hcwtn_189",
	marker: "_marker_hcwtn_223",
	timeNote: "_timeNote_hcwtn_268"
};
//#endregion
//#region app/_components/home/GlobalLaunchCountdown.tsx
var import_jsx_runtime = require_jsx_runtime();
var countdownCopy = {
	"zh-hans": {
		eyebrow: "AION2 全球服",
		title: "全球服抢先体验倒计时",
		earlyAccess: "创始人礼包抢先体验",
		earlyAccessNote: "Steam 目前标注“抢先体验将于 9 月 30 日开始”。所有创始人礼包均包含 5 天抢先体验，具体开放时间仍待官方公告。",
		publicLaunch: "正式上线",
		publicLaunchWindow: "Steam 礼包页面目前将 2026 年 10 月 5 日列为发售日；NC 较早的全球服宣传仍写明 2026 年 9 月。正式上线日期及开服时间尚未由 NC 最终确认。",
		configuredLaunchWindow: "这是当前设置的正式上线日期；具体开服时间仍以 NC 官方公告为准。",
		days: "天",
		day: "天",
		untilEarlyAccess: "后进入抢先体验日期",
		untilPublicLaunch: "后到达所列正式上线日期",
		loading: "正在加载倒计时",
		live: "已到抢先体验日期，请确认官方服务状态",
		pending: "等待正式上线日期与时间公告",
		launched: "已到所列上线日期，请确认官方服务状态",
		news: "查看全球服上线新闻",
		guide: "打开新手上线准备清单",
		earlyAccessGuide: "比较创始人礼包与抢先体验",
		timeNote: "倒计时按访客所在地的日历日期计算，不代表官方服务器的具体开放时间。"
	},
	en: {
		eyebrow: "AION2 GLOBAL",
		title: "Global Early Access Countdown",
		earlyAccess: "Founder’s Pack Early Access",
		earlyAccessNote: "Steam currently lists “Advance Access Starts 30 Sep.” Every Founder’s Pack tier includes five days of Early Access; the exact opening time is still to be announced.",
		publicLaunch: "Full launch",
		publicLaunchWindow: "Steam’s pack pages currently list October 5, 2026 as the release date; earlier NC global promotion still says September 2026. NC has not confirmed the full-launch date or opening time.",
		configuredLaunchWindow: "This is the configured full-launch date; the exact server-opening time still depends on an NC notice.",
		days: "days",
		day: "day",
		untilEarlyAccess: "until the Early Access date",
		untilPublicLaunch: "until the listed full-launch date",
		loading: "Loading countdown",
		live: "The Early Access date has arrived — check the official service status",
		pending: "Waiting for the full launch date and time",
		launched: "The listed launch date has arrived — check the official service status",
		news: "Read the global launch news",
		guide: "Open the beginner launch checklist",
		earlyAccessGuide: "Compare Founder’s Packs and Early Access",
		timeNote: "This date countdown uses the visitor’s local calendar and is not an official server-opening time."
	},
	fr: {
		eyebrow: "AION2 MONDIAL",
		title: "Compte à rebours de l’accès anticipé mondial",
		earlyAccess: "Accès anticipé du pack Fondateur",
		earlyAccessNote: "Steam indique actuellement « Début de l’accès anticipé le 30 sept. ». Chaque pack Fondateur inclut cinq jours d’accès anticipé ; l’heure exacte d’ouverture reste à annoncer.",
		publicLaunch: "Lancement officiel",
		publicLaunchWindow: "Les pages des packs Steam indiquent actuellement le 5 octobre 2026 comme date de sortie, tandis qu’une communication mondiale antérieure de NC mentionne encore septembre 2026. NC n’a pas confirmé la date ni l’heure du lancement officiel.",
		configuredLaunchWindow: "Il s’agit de la date de lancement actuellement configurée ; l’heure exacte d’ouverture des serveurs dépend toujours d’une annonce de NC.",
		days: "jours",
		day: "jour",
		untilEarlyAccess: "avant la date de l’accès anticipé",
		untilPublicLaunch: "avant la date de lancement indiquée",
		loading: "Chargement du compte à rebours",
		live: "La date de l’accès anticipé est arrivée — vérifiez l’état officiel du service",
		pending: "En attente de la date et de l’heure du lancement officiel",
		launched: "La date de lancement indiquée est arrivée — vérifiez l’état officiel du service",
		news: "Lire l’actualité du lancement mondial",
		guide: "Ouvrir la liste de préparation des débutants",
		earlyAccessGuide: "Comparer les packs Fondateur et l’accès anticipé",
		timeNote: "Ce compte à rebours utilise la date locale du visiteur et ne correspond pas à une heure officielle d’ouverture des serveurs."
	},
	de: {
		eyebrow: "AION2 GLOBAL",
		title: "Countdown zum globalen Vorabzugang",
		earlyAccess: "Vorabzugang mit dem Gründerpaket",
		earlyAccessNote: "Steam nennt derzeit den Hinweis „Vorabzugang ab 30. Sept.“. Jede Stufe des Gründerpakets enthält fünf Tage Vorabzugang; die genaue Startzeit wurde noch nicht bekannt gegeben.",
		publicLaunch: "Offizieller Start",
		publicLaunchWindow: "Auf den Steam-Paketseiten ist derzeit der 5. Oktober 2026 als Veröffentlichungstermin angegeben; in einer früheren globalen Ankündigung von NC steht weiterhin September 2026. NC hat weder das endgültige Startdatum noch die Startzeit bestätigt.",
		configuredLaunchWindow: "Dies ist das aktuell eingestellte Startdatum; die genaue Serveröffnung hängt weiterhin von einer Ankündigung von NC ab.",
		days: "Tage",
		day: "Tag",
		untilEarlyAccess: "bis zum Vorabzugang",
		untilPublicLaunch: "bis zum angegebenen Veröffentlichungstermin",
		loading: "Countdown wird geladen",
		live: "Der Vorabzugangstermin ist erreicht — prüfe den offiziellen Servicestatus",
		pending: "Warten auf Datum und Uhrzeit des offiziellen Starts",
		launched: "Der angegebene Starttermin ist erreicht — prüfe den offiziellen Servicestatus",
		news: "Neuigkeiten zum globalen Start lesen",
		guide: "Start-Checkliste für Einsteiger öffnen",
		earlyAccessGuide: "Gründerpakete und Vorabzugang vergleichen",
		timeNote: "Dieser Countdown richtet sich nach dem lokalen Kalender des Besuchers und zeigt keine offizielle Serveröffnungszeit an."
	},
	es: {
		eyebrow: "AION2 GLOBAL",
		title: "Cuenta atrás del acceso anticipado global",
		earlyAccess: "Acceso anticipado del Pack de Fundador",
		earlyAccessNote: "Steam muestra actualmente «El acceso anticipado comienza el 30 de sep.». Todos los niveles del Pack de Fundador incluyen cinco días de acceso anticipado; la hora exacta de apertura aún no se ha anunciado.",
		publicLaunch: "Lanzamiento oficial",
		publicLaunchWindow: "Las páginas de los packs de Steam indican actualmente el 5 de octubre de 2026 como fecha de lanzamiento, mientras que una promoción global anterior de NC todavía señala septiembre de 2026. NC no ha confirmado la fecha ni la hora del lanzamiento oficial.",
		configuredLaunchWindow: "Esta es la fecha de lanzamiento configurada actualmente; la hora exacta de apertura del servidor sigue dependiendo de un anuncio de NC.",
		days: "días",
		day: "día",
		untilEarlyAccess: "para la fecha de acceso anticipado",
		untilPublicLaunch: "para la fecha de lanzamiento indicada",
		loading: "Cargando la cuenta atrás",
		live: "Ha llegado la fecha de acceso anticipado — consulta el estado oficial del servicio",
		pending: "A la espera de la fecha y hora del lanzamiento oficial",
		launched: "Ha llegado la fecha de lanzamiento indicada — consulta el estado oficial del servicio",
		news: "Leer las noticias del lanzamiento global",
		guide: "Abrir la lista de preparación para principiantes",
		earlyAccessGuide: "Comparar los Packs de Fundador y el acceso anticipado",
		timeNote: "Esta cuenta atrás usa el calendario local del visitante y no representa una hora oficial de apertura de servidores."
	},
	ja: {
		eyebrow: "AION2 グローバル",
		title: "グローバル先行アクセス カウントダウン",
		earlyAccess: "ファウンダーズパック先行アクセス",
		earlyAccessNote: "Steam では現在「先行アクセスは 9 月 30 日開始」と表示されています。すべてのファウンダーズパックに 5 日間の先行アクセスが含まれますが、正確な開始時刻はまだ発表されていません。",
		publicLaunch: "正式サービス開始",
		publicLaunchWindow: "Steam のパックページでは現在 2026 年 10 月 5 日が発売日として表示されていますが、NC の以前のグローバル向け告知には 2026 年 9 月と記載されています。正式サービスの開始日と開始時刻は、まだ NC から確定発表されていません。",
		configuredLaunchWindow: "これは現在設定されている正式サービス開始日です。正確なサーバー開始時刻は、引き続き NC の公式発表をご確認ください。",
		days: "日",
		day: "日",
		untilEarlyAccess: "で先行アクセス開始日",
		untilPublicLaunch: "で表示中の正式サービス開始日",
		loading: "カウントダウンを読み込み中",
		live: "先行アクセス開始日です。公式のサービス状況をご確認ください",
		pending: "正式サービスの開始日と開始時刻の発表待ち",
		launched: "表示中の開始日です。公式のサービス状況をご確認ください",
		news: "グローバルサービス開始ニュースを見る",
		guide: "初心者向けサービス開始準備リストを開く",
		earlyAccessGuide: "ファウンダーズパックと先行アクセスを比較",
		timeNote: "このカウントダウンは閲覧者の現地日付を基準にしており、公式のサーバー開始時刻を示すものではありません。"
	},
	"pt-br": {
		eyebrow: "AION2 GLOBAL",
		title: "Contagem regressiva do acesso antecipado global",
		earlyAccess: "Acesso antecipado do Pacote de Fundador",
		earlyAccessNote: "A Steam exibe atualmente “Acesso antecipado começa em 30 de set.”. Todos os níveis do Pacote de Fundador incluem cinco dias de acesso antecipado; o horário exato de abertura ainda será anunciado.",
		publicLaunch: "Lançamento oficial",
		publicLaunchWindow: "As páginas dos pacotes na Steam indicam atualmente 5 de outubro de 2026 como data de lançamento, enquanto uma divulgação global anterior da NC ainda menciona setembro de 2026. A NC não confirmou a data nem o horário do lançamento oficial.",
		configuredLaunchWindow: "Esta é a data de lançamento configurada atualmente; o horário exato de abertura dos servidores ainda depende de um anúncio da NC.",
		days: "dias",
		day: "dia",
		untilEarlyAccess: "até a data do acesso antecipado",
		untilPublicLaunch: "até a data de lançamento indicada",
		loading: "Carregando a contagem regressiva",
		live: "A data do acesso antecipado chegou — confira o status oficial do serviço",
		pending: "Aguardando a data e o horário do lançamento oficial",
		launched: "A data de lançamento indicada chegou — confira o status oficial do serviço",
		news: "Ler as notícias do lançamento global",
		guide: "Abrir a lista de preparação para iniciantes",
		earlyAccessGuide: "Comparar os Pacotes de Fundador e o acesso antecipado",
		timeNote: "Esta contagem regressiva usa o calendário local do visitante e não representa um horário oficial de abertura dos servidores."
	},
	ru: {
		eyebrow: "AION2: ГЛОБАЛЬНАЯ ВЕРСИЯ",
		title: "Отсчёт до глобального раннего доступа",
		earlyAccess: "Ранний доступ с набором основателя",
		earlyAccessNote: "Сейчас в Steam указано: «Ранний доступ начнётся 30 сент.». Каждый вариант набора основателя включает пять дней раннего доступа; точное время открытия пока не объявлено.",
		publicLaunch: "Официальный запуск",
		publicLaunchWindow: "На страницах наборов в Steam сейчас указана дата выхода 5 октября 2026 года, а в более ранней глобальной рекламе NC всё ещё упоминается сентябрь 2026 года. NC пока не подтвердила дату и время официального запуска.",
		configuredLaunchWindow: "Это установленная на данный момент дата запуска; точное время открытия серверов по-прежнему зависит от объявления NC.",
		days: "дней",
		day: "день",
		untilEarlyAccess: "до даты раннего доступа",
		untilPublicLaunch: "до указанной даты запуска",
		loading: "Загрузка обратного отсчёта",
		live: "Дата раннего доступа наступила — проверьте официальный статус сервиса",
		pending: "Ожидается объявление даты и времени официального запуска",
		launched: "Указанная дата запуска наступила — проверьте официальный статус сервиса",
		news: "Читать новости о глобальном запуске",
		guide: "Открыть стартовый список для новичка",
		earlyAccessGuide: "Сравнить наборы основателя и ранний доступ",
		timeNote: "Обратный отсчёт использует местную календарную дату посетителя и не является официальным временем открытия серверов."
	},
	"zh-hant": {
		eyebrow: "AION2 全球服",
		title: "全球服搶先遊玩倒數",
		earlyAccess: "Founder’s Pack 搶先遊玩",
		earlyAccessNote: "Steam 目前標示「搶先遊玩於 9 月 30 日開始」；所有 Founder’s Pack 版本均提供 5 天搶先遊玩，具體開放時刻待官方公告。",
		publicLaunch: "正式上線",
		publicLaunchWindow: "Steam 套裝頁目前標示 2026 年 10 月 5 日為發售日；NC 較早的全球宣傳仍寫 2026 年 9 月，正式開服日期與時刻待 NC 公告。",
		configuredLaunchWindow: "此為目前設定的正式上線日期；具體開服時刻仍以 NC 公告為準。",
		days: "天",
		day: "天",
		untilEarlyAccess: "後進入搶先遊玩日期",
		untilPublicLaunch: "後到達正式上線日期",
		loading: "正在載入倒數",
		live: "已到搶先遊玩日期，請確認官方服務狀態",
		pending: "等待正式上線日期與時間公告",
		launched: "已到正式上線日期，請確認官方服務狀態",
		news: "查看全球服上線新聞",
		guide: "閱讀新手上線準備清單",
		earlyAccessGuide: "比較 Founder’s Pack 與搶先遊玩",
		timeNote: "倒數按訪客所在地的日曆日期計算，不代表伺服器開放時刻。"
	},
	ko: {
		eyebrow: "아이온2 글로벌",
		title: "글로벌 얼리 액세스 카운트다운",
		earlyAccess: "파운더스 팩 얼리 액세스",
		earlyAccessNote: "Steam에는 현재 “얼리 액세스 9월 30일 시작”으로 표시됩니다. 모든 파운더스 팩에는 5일 얼리 액세스가 포함되며, 정확한 오픈 시각은 추후 공식 공지를 확인해 주세요.",
		publicLaunch: "정식 출시",
		publicLaunchWindow: "Steam 패키지 페이지에는 현재 2026년 10월 5일로 표시되지만, 앞선 NC 글로벌 홍보는 2026년 9월로 안내했습니다. NC는 정식 출시 날짜와 정확한 오픈 시각을 아직 확정 발표하지 않았습니다.",
		configuredLaunchWindow: "현재 설정된 정식 출시 날짜이며, 정확한 서버 오픈 시각은 NC 공지를 확인해야 합니다.",
		days: "일",
		day: "일",
		untilEarlyAccess: "후 얼리 액세스 날짜 도달",
		untilPublicLaunch: "후 정식 출시 예정일 도달",
		loading: "카운트다운 불러오는 중",
		live: "얼리 액세스 날짜입니다. 공식 서비스 상태를 확인해 주세요",
		pending: "정식 출시 날짜와 시각 발표 대기 중",
		launched: "표시된 출시일입니다. 공식 서비스 상태를 확인해 주세요",
		news: "글로벌 출시 뉴스 보기",
		guide: "초보자 출시 준비 체크리스트",
		earlyAccessGuide: "파운더스 팩과 얼리 액세스 비교",
		timeNote: "이 카운트다운은 방문자의 현지 날짜를 기준으로 하며 공식 서버 오픈 시각을 의미하지 않습니다."
	}
};
function getMillisecondsUntilNextLocalDay(now) {
	const nextDay = new Date(now);
	nextDay.setHours(24, 0, 1, 0);
	return Math.max(nextDay.getTime() - now.getTime(), 1e3);
}
function GlobalLaunchCountdown({ locale, newsHref, guideHref, earlyAccessHref, config = globalLaunchCountdownConfig }) {
	const copy = countdownCopy[locale];
	const dateLocale = siteLocaleConfig[locale].htmlLang;
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let timeoutId;
		const updateAtLocalMidnight = () => {
			const current = /* @__PURE__ */ new Date();
			setNow(current);
			timeoutId = setTimeout(updateAtLocalMidnight, getMillisecondsUntilNextLocalDay(current));
		};
		updateAtLocalMidnight();
		return () => clearTimeout(timeoutId);
	}, []);
	const countdown = (0, import_react.useMemo)(() => now ? getGlobalLaunchCountdownState(now, config) : null, [config, now]);
	const phase = countdown?.phase ?? "early-access-countdown";
	const isEarlyAccessCountdown = phase === "early-access-countdown";
	const isPublicLaunchCountdown = phase === "public-launch-countdown";
	const counterText = countdown?.days === null || countdown === null ? "—" : String(countdown.days).padStart(2, "0");
	const dayUnit = countdown?.days === 1 ? copy.day : copy.days;
	let statusText = copy.loading;
	if (countdown) if (isEarlyAccessCountdown) statusText = `${countdown.days} ${dayUnit} ${copy.untilEarlyAccess}`;
	else if (isPublicLaunchCountdown) statusText = `${countdown.days} ${dayUnit} ${copy.untilPublicLaunch}`;
	else if (phase === "early-access-live") statusText = copy.live;
	else if (phase === "launched") statusText = copy.launched;
	else statusText = copy.pending;
	const activeMilestone = isPublicLaunchCountdown || phase === "launch-date-pending" || phase === "launched" ? "public-launch" : "early-access";
	const earlyAccessDateLabel = formatGlobalLaunchDate(config.earlyAccessDate, dateLocale);
	const publicLaunchDateLabel = config.publicLaunchDate ? formatGlobalLaunchDate(config.publicLaunchDate, dateLocale) : null;
	const trackContentLink = (section, slug, action) => {
		trackEvent("content_card_click", {
			action,
			content_slug: slug,
			locale,
			section,
			service: "global",
			surface: "home",
			target_key: `${section}/${slug}`,
			target_kind: "content"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: GlobalLaunchCountdown_module_default.section,
		"aria-labelledby": "global-launch-countdown-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `shell ${GlobalLaunchCountdown_module_default.shell}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: GlobalLaunchCountdown_module_default.intro,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: GlobalLaunchCountdown_module_default.eyebrow,
							children: copy.eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "global-launch-countdown-title",
							children: copy.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.earlyAccessNote }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: GlobalLaunchCountdown_module_default.actions,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: GlobalLaunchCountdown_module_default.primaryAction,
									href: newsHref,
									onClick: () => trackContentLink("news", "global-release-september-2026", "launch-news"),
									children: [copy.news, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "→"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: GlobalLaunchCountdown_module_default.secondaryAction,
									href: guideHref,
									onClick: () => trackContentLink("guides", "beginner-launch-checklist", "launch-guide"),
									children: [copy.guide, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "↗"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: GlobalLaunchCountdown_module_default.tertiaryAction,
									href: earlyAccessHref,
									onClick: () => trackContentLink("guides", "early-access", "early-access-guide"),
									children: [copy.earlyAccessGuide, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "↗"
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: GlobalLaunchCountdown_module_default.countdownPanel,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: GlobalLaunchCountdown_module_default.counter,
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: counterText }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isEarlyAccessCountdown || isPublicLaunchCountdown ? dayUnit : "AION2" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: GlobalLaunchCountdown_module_default.milestoneColumn,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: GlobalLaunchCountdown_module_default.currentStatus,
							"aria-live": "polite",
							"aria-atomic": "true",
							children: statusText
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: GlobalLaunchCountdown_module_default.milestones,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-active": activeMilestone === "early-access",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: GlobalLaunchCountdown_module_default.marker,
									"aria-hidden": "true",
									children: "01"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: copy.earlyAccess }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									dateTime: config.earlyAccessDate,
									children: earlyAccessDateLabel
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-active": activeMilestone === "public-launch",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: GlobalLaunchCountdown_module_default.marker,
									"aria-hidden": "true",
									children: "02"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: copy.publicLaunch }),
									config.publicLaunchDate && publicLaunchDateLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
										dateTime: config.publicLaunchDate,
										children: publicLaunchDateLabel
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: config.publicLaunchDate ? copy.configuredLaunchWindow : copy.publicLaunchWindow })
								] })]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: GlobalLaunchCountdown_module_default.timeNote,
					children: copy.timeNote
				})
			]
		})
	});
}
//#endregion
export { GlobalLaunchCountdown };
