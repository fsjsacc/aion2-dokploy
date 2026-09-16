import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-CU8j443B.js";
import { a as localizedHref, d as siteLocaleConfig } from "./site-config-EbYJfejA.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import { n as ExternalLink, t as Clock3 } from "./clock-3-DLQpWMdH.js";
import { n as CalendarDays, t as Server } from "./server-CrRzWXHo.js";
import { t as Earth } from "./earth-D16pSjR0.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MapPin = createLucideIcon("map-pin", [["path", {
	d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	key: "1r0f0z"
}], ["circle", {
	cx: "12",
	cy: "10",
	r: "3",
	key: "ilqhr7"
}]]);
//#endregion
//#region app/event-timer.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var eventTimerServices = [
	"global",
	"tw",
	"kr"
];
var eventTimerKoreaGroups = [
	"a",
	"b",
	"c"
];
var EVENT_TIMER_KOREA_GROUP_OFFSETS = {
	a: 0,
	b: 5,
	c: 10
};
var EVENT_TIMER_KOREA_GROUP_SERVERS = {
	a: [
		"시엘–이스라펠",
		"루미엘–에레슈키갈",
		"아리엘–아스펠",
		"네몬–콰이링",
		"타하바타–카사카",
		"페르노스–오다르",
		"이슈타르–파프니르"
	],
	b: [
		"지켈–트리니엘",
		"카이시넬–유스티엘",
		"프레기온–무닌",
		"나니아–브리트라",
		"울고른–인드나흐",
		"크로메데–바바룽",
		"티아마트–챈가룽"
	],
	c: [
		"바이젤–네자칸",
		"마르쿠탄–루드라",
		"메스람타에다–바카르마",
		"하달–젠카카",
		"루터스–히타니에",
		"코치룽–다미누",
		"포에타–이스할겐"
	]
};
var EVENT_TIMER_SERVICE_PROFILES = {
	global: {
		service: "global",
		timeZone: "UTC",
		utcOffsetMinutes: 0
	},
	tw: {
		service: "tw",
		timeZone: "Asia/Taipei",
		utcOffsetMinutes: 480
	},
	kr: {
		service: "kr",
		timeZone: "Asia/Seoul",
		utcOffsetMinutes: 540
	}
};
var EVENT_TIMER_SOURCES = {
	twSpacetimeRift: {
		id: "tw-spacetime-rift",
		label: "AION2 Taiwan update — Spacetime Rift schedule",
		publisher: "NC Taiwan",
		url: "https://tw.ncsoft.com/aion2/board/update/view?articleId=692f4c48e81e402e6da16915",
		verifiedAt: "2026-09-16"
	},
	krSpacetimeRift: {
		id: "kr-spacetime-rift",
		label: "아이온2 업데이트 — 시공의 균열 일정",
		publisher: "NCSOFT",
		url: "https://aion2.plaync.com/ko-kr/board/update/view?articleId=692f3e3834e7dd2024fd53a4",
		verifiedAt: "2026-09-16"
	},
	krSpacetimeRiftWindow: {
		id: "kr-spacetime-rift-window",
		label: "아이온2 업데이트 — 시공의 균열 포탈 10분 유지",
		publisher: "NCSOFT",
		url: "https://aion2.plaync.com/ko-kr/board/update/view?articleId=692603b8d60365665a2fdaa9",
		verifiedAt: "2026-09-16"
	},
	twAbyssSchedule: {
		id: "tw-abyss-schedule",
		label: "AION2 Taiwan update — Abyss schedules",
		publisher: "NC Taiwan",
		url: "https://tw.ncsoft.com/aion2/board/update/view?articleId=6a31a438754f8e55c506f818",
		verifiedAt: "2026-09-16"
	},
	krAbyssSchedule: {
		id: "kr-abyss-schedule",
		label: "아이온2 업데이트 — 어비스 그룹별 일정",
		publisher: "NCSOFT",
		url: "https://aion2.plaync.com/ko-kr/board/update/view?articleId=6a31a438acb6f821e1a76c27",
		verifiedAt: "2026-09-16"
	},
	twAbyssBosses: {
		id: "tw-abyss-bosses",
		label: "AION2 Taiwan update — Abyss bosses and Shugo Festa",
		publisher: "NC Taiwan",
		url: "https://tw.ncsoft.com/aion2/board/update/view?articleId=69e7d24d6bea861b7fd195aa",
		verifiedAt: "2026-09-16"
	},
	krAbyssBosses: {
		id: "kr-abyss-bosses",
		label: "아이온2 업데이트 — 어비스 보스와 슈고 페스타",
		publisher: "NCSOFT",
		url: "https://aion2.plaync.com/ko-kr/board/update/view?articleId=69e7d0384b054450af1110c4",
		verifiedAt: "2026-09-16"
	},
	twAbyssGuide: {
		id: "tw-abyss-guide",
		label: "AION2 official guide — Abyss content",
		publisher: "NC Taiwan",
		url: "https://tw.ncsoft.com/aion2/guidebook/view?title=%E6%B7%B1%E6%B7%B5%E5%85%A7%E5%AE%B9",
		verifiedAt: "2026-09-16"
	},
	krAbyssGuide: {
		id: "kr-abyss-guide",
		label: "아이온2 공식 가이드 — 어비스",
		publisher: "NCSOFT",
		url: "https://aion2.plaync.com/ko-kr/guidebook/view?title=%EC%96%B4%EB%B9%84%EC%8A%A4",
		verifiedAt: "2026-09-16"
	},
	twLiveActivities: {
		id: "tw-live-activities",
		label: "AION2 Taiwan 4/8 update — live activity schedules",
		publisher: "NC Taiwan",
		url: "https://tw.ncsoft.com/aion2/board/update/view?articleId=69d55b385428ae5b4ea04aa3",
		verifiedAt: "2026-09-16"
	},
	krLiveActivities: {
		id: "kr-live-activities",
		label: "아이온2 4/8 업데이트 — 라이브 이벤트 시간표",
		publisher: "NCSOFT",
		url: "https://aion2.plaync.com/ko-kr/board/update/view?articleId=69d55b381e8a8c5fcd9b44a7",
		verifiedAt: "2026-09-16"
	}
};
var SPACETIME_RIFT_TIMES = [
	120,
	300,
	480,
	660,
	840,
	1020,
	1200,
	1380
];
var HOURLY_ON_THE_HOUR = Array.from({ length: 24 }, (_, hour) => hour * 60);
var HOURLY_HALF_PAST = Array.from({ length: 24 }, (_, hour) => hour * 60 + 30);
var EVENT_TIMER_ENTRIES = [
	{
		id: "spacetime-rift",
		kind: "rift",
		schedules: {
			tw: {
				type: "daily-times",
				minutesOfDay: SPACETIME_RIFT_TIMES
			},
			kr: {
				type: "daily-times",
				minutesOfDay: SPACETIME_RIFT_TIMES
			}
		},
		sourceIds: [
			"twSpacetimeRift",
			"krSpacetimeRift",
			"krSpacetimeRiftWindow"
		],
		verifiedAt: "2026-09-16",
		mapLinks: [{
			mapSlug: "verteron",
			filterSubtype: "rift"
		}, {
			mapSlug: "altgard",
			filterSubtype: "rift"
		}],
		hasDerivedSlots: true,
		activeMinutes: {
			tw: 10,
			kr: 10
		}
	},
	{
		id: "abyss-rift-zone",
		kind: "rift",
		schedules: {
			tw: {
				type: "weekly-times",
				slots: [{
					weekday: 2,
					minuteOfDay: 1320
				}, {
					weekday: 4,
					minuteOfDay: 1320
				}]
			},
			kr: {
				type: "weekly-times",
				slots: [{
					weekday: 2,
					minuteOfDay: 1320
				}, {
					weekday: 4,
					minuteOfDay: 1320
				}]
			}
		},
		sourceIds: [
			"twAbyssSchedule",
			"krAbyssSchedule",
			"twAbyssGuide",
			"krAbyssGuide"
		],
		verifiedAt: "2026-09-16",
		mapLinks: [{ mapSlug: "abyss-rift-zone" }],
		usesKoreaAbyssGroupOffset: true
	},
	{
		id: "shugo-festa",
		kind: "activity",
		schedules: {
			tw: {
				type: "daily-times",
				minutesOfDay: HOURLY_ON_THE_HOUR
			},
			kr: {
				type: "daily-times",
				minutesOfDay: HOURLY_ON_THE_HOUR
			}
		},
		sourceIds: ["twAbyssBosses", "krAbyssBosses"],
		verifiedAt: "2026-09-16",
		hasDerivedSlots: true
	},
	{
		id: "dimensional-invasion",
		kind: "activity",
		schedules: {
			tw: {
				type: "daily-times",
				minutesOfDay: HOURLY_HALF_PAST
			},
			kr: {
				type: "daily-times",
				minutesOfDay: HOURLY_HALF_PAST
			}
		},
		sourceIds: ["twLiveActivities", "krLiveActivities"],
		verifiedAt: "2026-09-16",
		hasDerivedSlots: true
	},
	{
		id: "battlefield",
		kind: "activity",
		schedules: {
			tw: {
				type: "daily-times",
				minutesOfDay: [660, 1200]
			},
			kr: {
				type: "daily-times",
				minutesOfDay: [660, 1200]
			}
		},
		sourceIds: ["twLiveActivities", "krLiveActivities"],
		verifiedAt: "2026-09-16",
		activeWindowMinutesByStart: {
			tw: {
				660: 180,
				1200: 120
			},
			kr: {
				660: 180,
				1200: 120
			}
		}
	},
	{
		id: "artifact-occupation",
		kind: "activity",
		schedules: {
			tw: {
				type: "weekly-times",
				slots: [{
					weekday: 3,
					minuteOfDay: 1320
				}, {
					weekday: 6,
					minuteOfDay: 1320
				}]
			},
			kr: {
				type: "weekly-times",
				slots: [{
					weekday: 3,
					minuteOfDay: 1320
				}, {
					weekday: 6,
					minuteOfDay: 1320
				}]
			}
		},
		sourceIds: [
			"twAbyssBosses",
			"krAbyssBosses",
			"twAbyssGuide",
			"krAbyssGuide"
		],
		verifiedAt: "2026-09-16",
		mapLinks: [{ mapSlug: "chaotic-lower-reshanta" }, { mapSlug: "chaotic-middle-reshanta" }],
		usesKoreaAbyssGroupOffset: true
	},
	{
		id: "abyss-bosses",
		kind: "boss",
		schedules: {
			tw: {
				type: "weekly-times",
				slots: [{
					weekday: 3,
					minuteOfDay: 1350
				}, {
					weekday: 6,
					minuteOfDay: 1350
				}]
			},
			kr: {
				type: "weekly-times",
				slots: [{
					weekday: 3,
					minuteOfDay: 1350
				}, {
					weekday: 6,
					minuteOfDay: 1350
				}]
			}
		},
		sourceIds: [
			"twAbyssSchedule",
			"krAbyssSchedule",
			"twAbyssBosses",
			"krAbyssBosses"
		],
		verifiedAt: "2026-09-16",
		mapLinks: [{
			mapSlug: "chaotic-lower-reshanta",
			filterSubtype: "boss"
		}, {
			mapSlug: "chaotic-middle-reshanta",
			filterSubtype: "boss"
		}],
		usesKoreaAbyssGroupOffset: true,
		activeMinutes: {
			tw: 30,
			kr: 30
		}
	},
	{
		id: "nahma",
		kind: "boss",
		schedules: {
			tw: {
				type: "weekly-times",
				slots: [{
					weekday: 5,
					minuteOfDay: 1320
				}, {
					weekday: 0,
					minuteOfDay: 1320
				}]
			},
			kr: {
				type: "weekly-times",
				slots: [{
					weekday: 5,
					minuteOfDay: 1320
				}, {
					weekday: 0,
					minuteOfDay: 1320
				}]
			}
		},
		sourceIds: [
			"twAbyssSchedule",
			"krAbyssSchedule",
			"twAbyssBosses",
			"krAbyssBosses"
		],
		verifiedAt: "2026-09-16",
		mapLinks: [{
			mapSlug: "chaotic-lower-reshanta",
			filterSubtype: "boss"
		}, {
			mapSlug: "chaotic-middle-reshanta",
			filterSubtype: "boss"
		}],
		usesKoreaAbyssGroupOffset: true,
		activeMinutes: {
			tw: 30,
			kr: 30
		}
	}
];
var MINUTE_MS = 6e4;
var MINUTES_PER_DAY = 1440;
var DAY_MS = 1440 * MINUTE_MS;
function asValidDate(value) {
	const date = value === void 0 ? /* @__PURE__ */ new Date() : new Date(value);
	return Number.isFinite(date.getTime()) ? date : /* @__PURE__ */ new Date();
}
function candidateUtcTime(localDayStartMs, dayOffset, minuteOfDay, utcOffsetMinutes) {
	return localDayStartMs + dayOffset * DAY_MS + minuteOfDay * MINUTE_MS - utcOffsetMinutes * MINUTE_MS;
}
function getNextRuleOccurrence(rule, service, now) {
	const instant = asValidDate(now);
	const profile = EVENT_TIMER_SERVICE_PROFILES[service];
	const localNowMs = instant.getTime() + profile.utcOffsetMinutes * MINUTE_MS;
	const localNow = new Date(localNowMs);
	const localDayStartMs = Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate());
	let nextMs = Number.POSITIVE_INFINITY;
	if (rule.type === "daily-times") for (let dayOffset = 0; dayOffset <= 1; dayOffset += 1) for (const minuteOfDay of rule.minutesOfDay) {
		const candidate = candidateUtcTime(localDayStartMs, dayOffset, minuteOfDay, profile.utcOffsetMinutes);
		if (candidate >= instant.getTime() && candidate < nextMs) nextMs = candidate;
	}
	else {
		const todayWeekday = localNow.getUTCDay();
		for (const slot of rule.slots) {
			let candidate = candidateUtcTime(localDayStartMs, (slot.weekday - todayWeekday + 7) % 7, slot.minuteOfDay, profile.utcOffsetMinutes);
			if (candidate < instant.getTime()) candidate += 7 * DAY_MS;
			if (candidate < nextMs) nextMs = candidate;
		}
	}
	return Number.isFinite(nextMs) ? new Date(nextMs) : null;
}
function getNextEntryOccurrence(entry, service, now, koreaGroup = "a") {
	if (service === "global") return null;
	const rule = entry.schedules[service];
	if (!rule) return null;
	const offset = service === "kr" && entry.usesKoreaAbyssGroupOffset ? EVENT_TIMER_KOREA_GROUP_OFFSETS[koreaGroup] : 0;
	return getNextRuleOccurrence(rule.type === "daily-times" ? {
		...rule,
		minutesOfDay: rule.minutesOfDay.map((minute) => minute + offset)
	} : {
		...rule,
		slots: rule.slots.map((slot) => ({
			...slot,
			minuteOfDay: slot.minuteOfDay + offset
		}))
	}, service, now);
}
function getEventTimerEntryState(entry, service, now, koreaGroup = "a") {
	if (service === "global") return null;
	const instant = asValidDate(now);
	const fixedActiveMinutes = entry.activeMinutes?.[service];
	const windowMinutesByStart = entry.activeWindowMinutesByStart?.[service];
	const maximumActiveMinutes = Math.max(fixedActiveMinutes ?? 0, ...Object.values(windowMinutesByStart ?? {}));
	if (maximumActiveMinutes > 0) {
		const maximumDurationMs = maximumActiveMinutes * MINUTE_MS;
		const possibleStart = getNextEntryOccurrence(entry, service, instant.getTime() - maximumDurationMs + 1, koreaGroup);
		if (possibleStart && possibleStart.getTime() <= instant.getTime()) {
			const profile = EVENT_TIMER_SERVICE_PROFILES[service];
			const localStart = new Date(possibleStart.getTime() + profile.utcOffsetMinutes * MINUTE_MS);
			const baseStartMinute = (localStart.getUTCHours() * 60 + localStart.getUTCMinutes() - (service === "kr" && entry.usesKoreaAbyssGroupOffset ? EVENT_TIMER_KOREA_GROUP_OFFSETS[koreaGroup] : 0) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
			const activeMinutes = windowMinutesByStart?.[baseStartMinute] ?? fixedActiveMinutes;
			if (!activeMinutes || activeMinutes <= 0) {
				const nextAt = getNextEntryOccurrence(entry, service, instant, koreaGroup);
				return nextAt ? {
					entry,
					nextAt,
					countdownAt: nextAt,
					status: "upcoming"
				} : null;
			}
			const durationMs = activeMinutes * MINUTE_MS;
			const endsAt = new Date(possibleStart.getTime() + durationMs);
			if (endsAt.getTime() > instant.getTime()) return {
				entry,
				nextAt: possibleStart,
				countdownAt: endsAt,
				status: "active",
				endsAt
			};
		}
	}
	const nextAt = getNextEntryOccurrence(entry, service, instant, koreaGroup);
	return nextAt ? {
		entry,
		nextAt,
		countdownAt: nextAt,
		status: "upcoming"
	} : null;
}
function getUpcomingEventTimerEntries(service, now, koreaGroup = "a") {
	return EVENT_TIMER_ENTRIES.flatMap((entry) => {
		const state = getEventTimerEntryState(entry, service, now, koreaGroup);
		return state ? [state] : [];
	}).sort((left, right) => Number(left.status !== "active") - Number(right.status !== "active") || left.countdownAt.getTime() - right.countdownAt.getTime() || left.entry.id.localeCompare(right.entry.id));
}
function getNextEventTimerByKind(kind, service, now, koreaGroup = "a") {
	return getUpcomingEventTimerEntries(service, now, koreaGroup).find((candidate) => candidate.entry.kind === kind) ?? null;
}
//#endregion
//#region app/event-timer-localization.ts
var eventTimerLocalization = {
	"zh-hans": {
		title: "AION2 事件倒计时",
		serviceLabel: "选择服务",
		services: {
			global: "全球服",
			tw: "台服",
			kr: "韩服"
		},
		krGroupLabel: "韩服服务器组",
		krGroups: {
			a: "Group A",
			b: "Group B",
			c: "Group C"
		},
		krServerGroupHint: "请按游戏内显示的服务器组合选择对应分组。",
		krGroupOffsetHint: "Group A 为基准；Group B 延后 5 分钟，Group C 延后 10 分钟。偏移仅适用于深渊活动与 Boss，不适用于时空裂缝。",
		globalScheduleUnannounced: "全球服排程尚未公布。请等待官方公告。",
		serverTime: "服务器时间",
		localTime: "本地时间",
		nextActivity: "下一活动",
		nextBoss: "下一 Boss",
		nextRift: "下一裂隙",
		filterLabel: "筛选即将开始的活动",
		filters: {
			all: "全部",
			activity: "活动",
			boss: "Boss",
			rift: "裂隙"
		},
		nextStart: "下次开始",
		countdown: "倒计时",
		liveNow: "进行中",
		activeSectionTitle: "当前可确认进行中的活动",
		activeScopeNote: "仅将官方已公布持续时间的活动标为进行中；未公布持续时间的活动只显示下一次开场倒计时。",
		noActiveEvents: "当前没有可由官方持续时间确认的进行中活动。",
		endsAt: "结束时间",
		portalClosesAt: "裂隙入口关闭时间",
		mapLink: "查看地图",
		source: "来源",
		checkedAt: "核对日期",
		sourceStatus: {
			official: "官方",
			projected: "按周期推算"
		},
		maintenanceTakesPriority: "临时维护、官方改期与游戏内提示优先于本页倒计时。",
		emptyState: "当前筛选条件下没有即将开始的事件。",
		faqTitle: "事件倒计时常见问题",
		faq: [
			{
				question: "服务器时间和本地时间有什么区别？",
				answer: "排程以所选服务的服务器时间计算；本地时间会自动换算为你设备所在时区。"
			},
			{
				question: "为什么全球服没有倒计时？",
				answer: "全球服排程尚未由官方公布。本站不会把台服或韩服时间直接当作全球服排程。"
			},
			{
				question: "维护期间倒计时仍然准确吗？",
				answer: "不一定。临时维护、活动改期与游戏内通知始终优先，请在参加前再次核对官方公告。"
			}
		],
		events: {
			"spacetime-rift": {
				name: "时空裂缝",
				description: "时空裂缝传送门开放 10 分钟；进入后最多可停留 1 小时。",
				repeatRule: "每日 02:00、05:00、08:00、11:00、14:00、17:00、20:00、23:00（服务器时间）"
			},
			"abyss-rift-zone": {
				name: "深渊裂缝地带",
				description: "在指定时段进入深渊裂缝地带并参与区域目标。",
				repeatRule: "每周二、周四 22:00（服务器时间）"
			},
			"artifact-occupation": {
				name: "Artifact 占领战",
				description: "争夺 Artifact 控制权的定时阵营活动。",
				repeatRule: "每周三、周六 22:00（服务器时间）"
			},
			"abyss-bosses": {
				name: "深渊 Boss",
				description: "在深渊挑战按排程登场的首领。",
				repeatRule: "每周三、周六 22:30（服务器时间）"
			},
			nahma: {
				name: "纳赫玛",
				description: "按周末排程登场的世界首领纳赫玛。",
				repeatRule: "每周五、周日 22:00（服务器时间）"
			},
			battlefield: {
				name: "战场匹配",
				description: "官方 Guidebook 与 4 月 8 日更新确认每日战场匹配开放时段；当前模式名称可能调整，维护及临时变更以游戏内为准。",
				repeatRule: "每日 11:00–14:00、20:00–22:00（服务器时间）"
			},
			"dimensional-invasion": {
				name: "次元进攻",
				description: "官方 4 月 8 日更新将发生时间从整点调整为每小时 30 分；实际参与条件与临时调整以游戏内为准。",
				repeatRule: "每小时 30 分开始（服务器时间）"
			},
			"shugo-festa": {
				name: "树古庆典",
				description: "官方 4 月 22 日更新确认所有树古庆典每小时整点启用；实际参与条件与临时调整以游戏内为准。",
				repeatRule: "下一个整点场次（服务器时间；持续时间未由该更新确认）"
			}
		}
	},
	en: {
		title: "AION2 Event Countdown",
		serviceLabel: "Select service",
		services: {
			global: "Global",
			tw: "TW",
			kr: "KR"
		},
		krGroupLabel: "KR server group",
		krGroups: {
			a: "Group A",
			b: "Group B",
			c: "Group C"
		},
		krServerGroupHint: "Choose the group that matches the server combination shown in game.",
		krGroupOffsetHint: "Group A is the baseline; Group B starts 5 minutes later and Group C 10 minutes later. Offsets apply only to Abyss activities and bosses, not Spacetime Rift.",
		globalScheduleUnannounced: "The Global service schedule has not been announced. Check back after an official update.",
		serverTime: "Server time",
		localTime: "Local time",
		nextActivity: "Next activity",
		nextBoss: "Next boss",
		nextRift: "Next rift",
		filterLabel: "Filter upcoming events",
		filters: {
			all: "All",
			activity: "Activity",
			boss: "Boss",
			rift: "Rift"
		},
		nextStart: "Next start",
		countdown: "Countdown",
		liveNow: "Live now",
		activeSectionTitle: "Confirmed live now",
		activeScopeNote: "Only events with an officially published duration are marked live. Events without one show their next start only.",
		noActiveEvents: "No event with an official duration is confirmed live right now.",
		endsAt: "Ends at",
		portalClosesAt: "Portal closes at",
		mapLink: "View map",
		source: "Source",
		checkedAt: "Checked",
		sourceStatus: {
			official: "Official",
			projected: "Projected from cycle"
		},
		maintenanceTakesPriority: "Emergency maintenance, official rescheduling, and in-game notices take priority over this countdown.",
		emptyState: "No upcoming events match the current filter.",
		faqTitle: "Event countdown FAQ",
		faq: [
			{
				question: "What is the difference between server time and local time?",
				answer: "Schedules are calculated in the selected service's server time. Local time is converted automatically to your device's time zone."
			},
			{
				question: "Why is there no Global countdown?",
				answer: "The Global schedule has not been officially published. TW or KR times are not presented as the Global schedule."
			},
			{
				question: "Is the countdown reliable during maintenance?",
				answer: "Not always. Emergency maintenance, event changes, and in-game notices take priority, so recheck the official notice before joining."
			}
		],
		events: {
			"spacetime-rift": {
				name: "Spacetime Rift",
				description: "The Spacetime Rift portal remains open for 10 minutes; after entering, you can stay for up to 1 hour.",
				repeatRule: "Daily at 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00, and 23:00 server time"
			},
			"abyss-rift-zone": {
				name: "Abyss Rift Zone",
				description: "Enter the Abyss Rift Zone during its scheduled window and complete area objectives.",
				repeatRule: "Tuesday and Thursday at 22:00 server time"
			},
			"artifact-occupation": {
				name: "Artifact Occupation",
				description: "A scheduled faction event to contest control of Artifacts.",
				repeatRule: "Wednesday and Saturday at 22:00 server time"
			},
			"abyss-bosses": {
				name: "Abyss Bosses",
				description: "Challenge bosses that appear in the Abyss on a fixed schedule.",
				repeatRule: "Wednesday and Saturday at 22:30 server time"
			},
			nahma: {
				name: "Nahma",
				description: "The world boss Nahma appears on its weekend schedule.",
				repeatRule: "Friday and Sunday at 22:00 server time"
			},
			battlefield: {
				name: "Battlefield matchmaking",
				description: "The official Guidebook and April 8 update confirm the daily Battlefield matchmaking windows. Mode names may change; check in game for maintenance and temporary adjustments.",
				repeatRule: "Daily from 11:00–14:00 and 20:00–22:00 (server time)"
			},
			"dimensional-invasion": {
				name: "Dimensional Invasion",
				description: "The official April 8 update moved its occurrence from the top of the hour to :30 every hour; check in game for participation requirements and temporary changes.",
				repeatRule: "Starts at :30 every hour (server time)"
			},
			"shugo-festa": {
				name: "Shugo Festa",
				description: "The official April 22 update confirms that all Shugo Festa activities activate on the hour, every hour; check in game for participation requirements and temporary changes.",
				repeatRule: "Next session on the hour (server time; the update does not confirm a duration)"
			}
		}
	},
	fr: {
		title: "Compte à rebours des événements AION2",
		serviceLabel: "Choisir le service",
		services: {
			global: "Global",
			tw: "TW",
			kr: "KR"
		},
		krGroupLabel: "Groupe de serveurs KR",
		krGroups: {
			a: "Groupe A",
			b: "Groupe B",
			c: "Groupe C"
		},
		krServerGroupHint: "Choisissez le groupe correspondant à la combinaison de serveurs affichée en jeu.",
		krGroupOffsetHint: "Le groupe A sert de référence ; le groupe B commence 5 minutes plus tard et le groupe C 10 minutes plus tard. Ces décalages concernent uniquement les activités et boss des Abysses, pas la Faille spatio-temporelle.",
		globalScheduleUnannounced: "Le calendrier du service Global n’a pas encore été annoncé. Consultez les prochaines communications officielles.",
		serverTime: "Heure du serveur",
		localTime: "Heure locale",
		nextActivity: "Prochaine activité",
		nextBoss: "Prochain boss",
		nextRift: "Prochaine faille",
		filterLabel: "Filtrer les prochains événements",
		filters: {
			all: "Tous",
			activity: "Activité",
			boss: "Boss",
			rift: "Faille"
		},
		nextStart: "Prochain début",
		countdown: "Compte à rebours",
		liveNow: "En cours",
		activeSectionTitle: "Événements en cours confirmés",
		activeScopeNote: "Seuls les événements dont la durée est publiée officiellement sont marqués en cours. Les autres indiquent uniquement leur prochain départ.",
		noActiveEvents: "Aucun événement avec une durée officielle n’est confirmé en cours actuellement.",
		endsAt: "Se termine à",
		portalClosesAt: "Fermeture du portail à",
		mapLink: "Voir la carte",
		source: "Source",
		checkedAt: "Vérifié le",
		sourceStatus: {
			official: "Officiel",
			projected: "Projection selon le cycle"
		},
		maintenanceTakesPriority: "Les maintenances d’urgence, reports officiels et avis en jeu priment sur ce compte à rebours.",
		emptyState: "Aucun événement à venir ne correspond au filtre actuel.",
		faqTitle: "FAQ du compte à rebours",
		faq: [
			{
				question: "Quelle différence entre l’heure du serveur et l’heure locale ?",
				answer: "Le calendrier utilise l’heure du service sélectionné. L’heure locale est automatiquement convertie selon le fuseau de votre appareil."
			},
			{
				question: "Pourquoi n’y a-t-il pas de compte à rebours Global ?",
				answer: "Le calendrier Global n’est pas encore officiel. Les horaires TW ou KR ne sont pas présentés comme ceux du service Global."
			},
			{
				question: "Le compte à rebours reste-t-il fiable pendant une maintenance ?",
				answer: "Pas toujours. Les maintenances, changements d’événement et avis en jeu priment ; vérifiez l’annonce officielle avant de participer."
			}
		],
		events: {
			"spacetime-rift": {
				name: "Faille spatio-temporelle",
				description: "Le portail de la Faille spatio-temporelle reste ouvert pendant 10 minutes ; une fois entré, vous pouvez rester jusqu’à 1 heure.",
				repeatRule: "Tous les jours à 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00 et 23:00 (heure du serveur)"
			},
			"abyss-rift-zone": {
				name: "Zone de Faille abyssale",
				description: "Entrez dans la zone de Faille abyssale pendant son créneau et accomplissez les objectifs de zone.",
				repeatRule: "Mardi et jeudi à 22:00 (heure du serveur)"
			},
			"artifact-occupation": {
				name: "Bataille d’occupation d’artefact",
				description: "Un événement de faction programmé pour disputer le contrôle des artefacts.",
				repeatRule: "Mercredi et samedi à 22:00 (heure du serveur)"
			},
			"abyss-bosses": {
				name: "Boss des Abysses",
				description: "Affrontez les boss qui apparaissent dans les Abysses selon un calendrier fixe.",
				repeatRule: "Mercredi et samedi à 22:30 (heure du serveur)"
			},
			nahma: {
				name: "Nahma",
				description: "Le boss mondial Nahma apparaît selon son calendrier du week-end.",
				repeatRule: "Vendredi et dimanche à 22:00 (heure du serveur)"
			},
			battlefield: {
				name: "Recherche de groupe du champ de bataille",
				description: "Le Guidebook officiel et la mise à jour du 8 avril confirment les créneaux quotidiens de recherche du champ de bataille. Les noms des modes peuvent changer ; vérifiez en jeu les maintenances et ajustements temporaires.",
				repeatRule: "Tous les jours de 11:00 à 14:00 et de 20:00 à 22:00 (heure du serveur)"
			},
			"dimensional-invasion": {
				name: "Invasion dimensionnelle",
				description: "La mise à jour officielle du 8 avril a déplacé l’apparition de l’heure pile à la 30e minute de chaque heure ; vérifiez en jeu les conditions de participation et les changements temporaires.",
				repeatRule: "Commence à la 30e minute de chaque heure (heure du serveur)"
			},
			"shugo-festa": {
				name: "Festival Shugo",
				description: "La mise à jour officielle du 22 avril confirme que toutes les activités du Festival Shugo s’activent à chaque heure pile ; vérifiez en jeu les conditions de participation et les changements temporaires.",
				repeatRule: "Prochaine session à l’heure pile (heure du serveur ; aucune durée n’est confirmée par cette mise à jour)"
			}
		}
	},
	de: {
		title: "AION2-Event-Countdown",
		serviceLabel: "Dienst auswählen",
		services: {
			global: "Global",
			tw: "TW",
			kr: "KR"
		},
		krGroupLabel: "KR-Servergruppe",
		krGroups: {
			a: "Gruppe A",
			b: "Gruppe B",
			c: "Gruppe C"
		},
		krServerGroupHint: "Wähle die Gruppe, die der im Spiel angezeigten Serverkombination entspricht.",
		krGroupOffsetHint: "Gruppe A ist die Basis; Gruppe B beginnt 5 Minuten und Gruppe C 10 Minuten später. Die Verschiebung gilt nur für Abyss-Aktivitäten und -Bosse, nicht für Raumzeitriss.",
		globalScheduleUnannounced: "Der Zeitplan für den Global-Dienst wurde noch nicht angekündigt. Bitte warte auf eine offizielle Mitteilung.",
		serverTime: "Serverzeit",
		localTime: "Ortszeit",
		nextActivity: "Nächste Aktivität",
		nextBoss: "Nächster Boss",
		nextRift: "Nächster Riss",
		filterLabel: "Kommende Events filtern",
		filters: {
			all: "Alle",
			activity: "Aktivität",
			boss: "Boss",
			rift: "Riss"
		},
		nextStart: "Nächster Start",
		countdown: "Countdown",
		liveNow: "Läuft jetzt",
		activeSectionTitle: "Bestätigte laufende Events",
		activeScopeNote: "Nur Events mit offiziell veröffentlichter Dauer werden als laufend markiert. Sonst wird nur der nächste Start angezeigt.",
		noActiveEvents: "Derzeit ist kein Event mit offizieller Dauer als laufend bestätigt.",
		endsAt: "Endet um",
		portalClosesAt: "Portal schließt um",
		mapLink: "Karte ansehen",
		source: "Quelle",
		checkedAt: "Geprüft am",
		sourceStatus: {
			official: "Offiziell",
			projected: "Aus dem Zyklus berechnet"
		},
		maintenanceTakesPriority: "Notfallwartungen, offizielle Verschiebungen und Hinweise im Spiel haben Vorrang vor diesem Countdown.",
		emptyState: "Keine bevorstehenden Events entsprechen dem aktuellen Filter.",
		faqTitle: "FAQ zum Event-Countdown",
		faq: [
			{
				question: "Was ist der Unterschied zwischen Serverzeit und Ortszeit?",
				answer: "Der Zeitplan wird in der Serverzeit des gewählten Dienstes berechnet. Die Ortszeit wird automatisch in die Zeitzone deines Geräts umgerechnet."
			},
			{
				question: "Warum gibt es keinen Global-Countdown?",
				answer: "Der Global-Zeitplan wurde noch nicht offiziell veröffentlicht. TW- oder KR-Zeiten werden nicht als Global-Zeitplan ausgegeben."
			},
			{
				question: "Ist der Countdown während Wartungsarbeiten zuverlässig?",
				answer: "Nicht immer. Wartungen, Eventänderungen und Hinweise im Spiel haben Vorrang. Prüfe vor der Teilnahme die offizielle Mitteilung."
			}
		],
		events: {
			"spacetime-rift": {
				name: "Raumzeitriss",
				description: "Das Portal zum Raumzeitriss bleibt 10 Minuten geöffnet; nach dem Betreten kannst du bis zu 1 Stunde bleiben.",
				repeatRule: "Täglich um 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00 und 23:00 Uhr Serverzeit"
			},
			"abyss-rift-zone": {
				name: "Abyss-Risszone",
				description: "Betritt die Abyss-Risszone im vorgesehenen Zeitfenster und erfülle die Gebietsziele.",
				repeatRule: "Dienstag und Donnerstag um 22:00 Uhr Serverzeit"
			},
			"artifact-occupation": {
				name: "Artefakt-Besetzungskampf",
				description: "Ein angesetztes Fraktionsevent um die Kontrolle über Artefakte.",
				repeatRule: "Mittwoch und Samstag um 22:00 Uhr Serverzeit"
			},
			"abyss-bosses": {
				name: "Abyss-Bosse",
				description: "Fordere Bosse heraus, die nach festem Zeitplan im Abyss erscheinen.",
				repeatRule: "Mittwoch und Samstag um 22:30 Uhr Serverzeit"
			},
			nahma: {
				name: "Nahma",
				description: "Der Weltboss Nahma erscheint nach seinem Wochenendzeitplan.",
				repeatRule: "Freitag und Sonntag um 22:00 Uhr Serverzeit"
			},
			battlefield: {
				name: "Schlachtfeld-Spielersuche",
				description: "Das offizielle Guidebook und das Update vom 8. April bestätigen die täglichen Zeitfenster der Schlachtfeld-Spielersuche. Modusnamen können sich ändern; Wartungen und vorübergehende Anpassungen stehen im Spiel.",
				repeatRule: "Täglich von 11:00–14:00 und 20:00–22:00 Uhr (Serverzeit)"
			},
			"dimensional-invasion": {
				name: "Dimensionsinvasion",
				description: "Das offizielle Update vom 8. April verlegte den Beginn von der vollen Stunde auf jede Stunde um :30; Teilnahmebedingungen und vorübergehende Änderungen stehen im Spiel.",
				repeatRule: "Beginnt jede Stunde um :30 (Serverzeit)"
			},
			"shugo-festa": {
				name: "Shugo-Fest",
				description: "Das offizielle Update vom 22. April bestätigt, dass alle Shugo-Festa-Aktivitäten zu jeder vollen Stunde aktiviert werden; Teilnahmebedingungen und vorübergehende Änderungen stehen im Spiel.",
				repeatRule: "Nächste Runde zur vollen Stunde (Serverzeit; das Update bestätigt keine Dauer)"
			}
		}
	},
	es: {
		title: "Cuenta atrás de eventos de AION2",
		serviceLabel: "Seleccionar servicio",
		services: {
			global: "Global",
			tw: "TW",
			kr: "KR"
		},
		krGroupLabel: "Grupo de servidores KR",
		krGroups: {
			a: "Grupo A",
			b: "Grupo B",
			c: "Grupo C"
		},
		krServerGroupHint: "Elige el grupo que coincida con la combinación de servidores mostrada en el juego.",
		krGroupOffsetHint: "El Grupo A es la referencia; el Grupo B empieza 5 minutos después y el Grupo C, 10 minutos después. El desfase solo se aplica a actividades y jefes del Abismo, no a la Fisura espacio-temporal.",
		globalScheduleUnannounced: "El calendario del servicio Global aún no se ha anunciado. Espera una actualización oficial.",
		serverTime: "Hora del servidor",
		localTime: "Hora local",
		nextActivity: "Próxima actividad",
		nextBoss: "Próximo jefe",
		nextRift: "Próxima fisura",
		filterLabel: "Filtrar próximos eventos",
		filters: {
			all: "Todos",
			activity: "Actividad",
			boss: "Jefe",
			rift: "Fisura"
		},
		nextStart: "Próximo inicio",
		countdown: "Cuenta atrás",
		liveNow: "En curso",
		activeSectionTitle: "Eventos en curso confirmados",
		activeScopeNote: "Solo se marcan como activos los eventos con duración oficial publicada. Los demás muestran únicamente su próximo inicio.",
		noActiveEvents: "Ahora mismo no hay eventos con duración oficial confirmados como activos.",
		endsAt: "Termina a las",
		portalClosesAt: "El portal se cierra a las",
		mapLink: "Ver mapa",
		source: "Fuente",
		checkedAt: "Comprobado el",
		sourceStatus: {
			official: "Oficial",
			projected: "Proyección según el ciclo"
		},
		maintenanceTakesPriority: "Los mantenimientos de emergencia, cambios oficiales y avisos del juego tienen prioridad sobre esta cuenta atrás.",
		emptyState: "No hay próximos eventos que coincidan con el filtro actual.",
		faqTitle: "Preguntas sobre la cuenta atrás",
		faq: [
			{
				question: "¿Qué diferencia hay entre la hora del servidor y la hora local?",
				answer: "El calendario se calcula con la hora del servicio elegido. La hora local se convierte automáticamente a la zona horaria de tu dispositivo."
			},
			{
				question: "¿Por qué no hay cuenta atrás para Global?",
				answer: "El calendario Global aún no se ha publicado oficialmente. Los horarios de TW o KR no se muestran como si fueran los de Global."
			},
			{
				question: "¿La cuenta atrás es fiable durante un mantenimiento?",
				answer: "No siempre. Los mantenimientos, cambios de eventos y avisos del juego tienen prioridad; comprueba el anuncio oficial antes de participar."
			}
		],
		events: {
			"spacetime-rift": {
				name: "Fisura espacio-temporal",
				description: "El portal de la Fisura espacio-temporal permanece abierto 10 minutos; tras entrar, puedes quedarte hasta 1 hora.",
				repeatRule: "Todos los días a las 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00 y 23:00 (hora del servidor)"
			},
			"abyss-rift-zone": {
				name: "Zona de Fisura del Abismo",
				description: "Entra en la Zona de Fisura del Abismo durante su horario y completa los objetivos de la zona.",
				repeatRule: "Martes y jueves a las 22:00 (hora del servidor)"
			},
			"artifact-occupation": {
				name: "Batalla de ocupación de artefactos",
				description: "Un evento de facciones programado para disputar el control de los artefactos.",
				repeatRule: "Miércoles y sábados a las 22:00 (hora del servidor)"
			},
			"abyss-bosses": {
				name: "Jefes del Abismo",
				description: "Desafía a los jefes que aparecen en el Abismo según un horario fijo.",
				repeatRule: "Miércoles y sábados a las 22:30 (hora del servidor)"
			},
			nahma: {
				name: "Nahma",
				description: "El jefe de mundo Nahma aparece según su horario de fin de semana.",
				repeatRule: "Viernes y domingos a las 22:00 (hora del servidor)"
			},
			battlefield: {
				name: "Emparejamiento de campo de batalla",
				description: "El Guidebook oficial y la actualización del 8 de abril confirman las franjas diarias de emparejamiento del campo de batalla. Los nombres de los modos pueden cambiar; consulta en el juego los mantenimientos y ajustes temporales.",
				repeatRule: "Todos los días de 11:00–14:00 y 20:00–22:00 (hora del servidor)"
			},
			"dimensional-invasion": {
				name: "Invasión dimensional",
				description: "La actualización oficial del 8 de abril trasladó el inicio de la hora en punto al minuto 30 de cada hora; consulta en el juego los requisitos de participación y los cambios temporales.",
				repeatRule: "Empieza en el minuto 30 de cada hora (hora del servidor)"
			},
			"shugo-festa": {
				name: "Festival Shugo",
				description: "La actualización oficial del 22 de abril confirma que todas las actividades del Festival Shugo se activan cada hora en punto; consulta en el juego los requisitos de participación y los cambios temporales.",
				repeatRule: "Próxima sesión a la hora en punto (hora del servidor; la actualización no confirma su duración)"
			}
		}
	},
	ja: {
		title: "AION2 イベントカウントダウン",
		serviceLabel: "サービスを選択",
		services: {
			global: "グローバル",
			tw: "台湾",
			kr: "韓国"
		},
		krGroupLabel: "韓国サーバーグループ",
		krGroups: {
			a: "グループ A",
			b: "グループ B",
			c: "グループ C"
		},
		krServerGroupHint: "ゲーム内に表示されるサーバー構成に合うグループを選択してください。",
		krGroupOffsetHint: "グループ A が基準で、B は 5 分後、C は 10 分後に開始します。時差はアビスの活動とボスだけに適用され、時空の亀裂には適用されません。",
		globalScheduleUnannounced: "グローバルサービスの日程はまだ発表されていません。公式発表をお待ちください。",
		serverTime: "サーバー時間",
		localTime: "現地時間",
		nextActivity: "次のアクティビティ",
		nextBoss: "次のボス",
		nextRift: "次の亀裂",
		filterLabel: "次のイベントを絞り込む",
		filters: {
			all: "すべて",
			activity: "アクティビティ",
			boss: "ボス",
			rift: "亀裂"
		},
		nextStart: "次回開始",
		countdown: "カウントダウン",
		liveNow: "開催中",
		activeSectionTitle: "開催中と確認できるイベント",
		activeScopeNote: "公式に開催時間が公開されたイベントのみ開催中と表示します。終了時刻が未公開のイベントは次回開始時刻のみ表示します。",
		noActiveEvents: "公式の開催時間から現在開催中と確認できるイベントはありません。",
		endsAt: "終了時刻",
		portalClosesAt: "ポータル終了時刻",
		mapLink: "マップを見る",
		source: "出典",
		checkedAt: "確認日",
		sourceStatus: {
			official: "公式",
			projected: "周期から推算"
		},
		maintenanceTakesPriority: "臨時メンテナンス、公式の日時変更、ゲーム内のお知らせがこのカウントダウンより優先されます。",
		emptyState: "現在の絞り込み条件に一致する開催予定のイベントはありません。",
		faqTitle: "イベントカウントダウン FAQ",
		faq: [
			{
				question: "サーバー時間と現地時間の違いは？",
				answer: "日程は選択したサービスのサーバー時間で計算されます。現地時間は端末のタイムゾーンに自動変換されます。"
			},
			{
				question: "グローバル版にカウントダウンがないのはなぜ？",
				answer: "グローバル版の日程が公式発表されていないためです。台湾版や韓国版の時刻をグローバル版の日程としては表示しません。"
			},
			{
				question: "メンテナンス中もカウントダウンは正確ですか？",
				answer: "常に正確とは限りません。メンテナンス、イベント変更、ゲーム内のお知らせを優先し、参加前に公式情報を再確認してください。"
			}
		],
		events: {
			"spacetime-rift": {
				name: "時空の亀裂",
				description: "時空の亀裂のポータルは 10 分間開放され、入場後は最大 1 時間滞在できます。",
				repeatRule: "毎日 02:00、05:00、08:00、11:00、14:00、17:00、20:00、23:00（サーバー時間）"
			},
			"abyss-rift-zone": {
				name: "アビス亀裂地帯",
				description: "開催時間中にアビス亀裂地帯へ入り、エリア目標を達成します。",
				repeatRule: "毎週火曜・木曜 22:00（サーバー時間）"
			},
			"artifact-occupation": {
				name: "アーティファクト占領戦",
				description: "アーティファクトの支配権を争う定時の陣営イベントです。",
				repeatRule: "毎週水曜・土曜 22:00（サーバー時間）"
			},
			"abyss-bosses": {
				name: "アビスボス",
				description: "決まった日程でアビスに出現するボスに挑みます。",
				repeatRule: "毎週水曜・土曜 22:30（サーバー時間）"
			},
			nahma: {
				name: "ナフマ",
				description: "週末の日程で出現するワールドボス、ナフマです。",
				repeatRule: "毎週金曜・日曜 22:00（サーバー時間）"
			},
			battlefield: {
				name: "戦場マッチング",
				description: "公式Guidebookと4月8日のアップデートで、毎日の戦場マッチング開放時間が確認されています。モード名は変更される場合があるため、メンテナンスや臨時調整はゲーム内で確認してください。",
				repeatRule: "毎日 11:00～14:00、20:00～22:00（サーバー時間）"
			},
			"dimensional-invasion": {
				name: "次元侵攻",
				description: "4月8日の公式アップデートで発生時刻が毎正時から毎時30分に変更されました。参加条件や臨時変更はゲーム内で確認してください。",
				repeatRule: "毎時30分開始（サーバー時間）"
			},
			"shugo-festa": {
				name: "シュゴフェスタ",
				description: "4月22日の公式アップデートで、すべてのシュゴフェスタが毎正時に有効化されることが確認されました。参加条件や臨時変更はゲーム内で確認してください。",
				repeatRule: "次の整時開催（サーバー時間。継続時間はこのアップデートで確認されていません）"
			}
		}
	},
	"pt-br": {
		title: "Contagem regressiva de eventos do AION2",
		serviceLabel: "Selecionar serviço",
		services: {
			global: "Global",
			tw: "TW",
			kr: "KR"
		},
		krGroupLabel: "Grupo de servidores KR",
		krGroups: {
			a: "Grupo A",
			b: "Grupo B",
			c: "Grupo C"
		},
		krServerGroupHint: "Escolha o grupo correspondente à combinação de servidores exibida no jogo.",
		krGroupOffsetHint: "O Grupo A é a referência; o Grupo B começa 5 minutos depois e o Grupo C, 10 minutos depois. O deslocamento vale apenas para atividades e chefes do Abismo, não para a Fenda espaço-temporal.",
		globalScheduleUnannounced: "A programação do serviço Global ainda não foi anunciada. Aguarde uma atualização oficial.",
		serverTime: "Hora do servidor",
		localTime: "Hora local",
		nextActivity: "Próxima atividade",
		nextBoss: "Próximo chefe",
		nextRift: "Próxima fenda",
		filterLabel: "Filtrar próximos eventos",
		filters: {
			all: "Todos",
			activity: "Atividade",
			boss: "Chefe",
			rift: "Fenda"
		},
		nextStart: "Próximo início",
		countdown: "Contagem regressiva",
		liveNow: "Ao vivo agora",
		activeSectionTitle: "Eventos ativos confirmados",
		activeScopeNote: "Somente eventos com duração oficial publicada são marcados como ativos. Os demais mostram apenas o próximo início.",
		noActiveEvents: "Nenhum evento com duração oficial está confirmado como ativo agora.",
		endsAt: "Termina às",
		portalClosesAt: "O portal fecha às",
		mapLink: "Ver mapa",
		source: "Fonte",
		checkedAt: "Verificado em",
		sourceStatus: {
			official: "Oficial",
			projected: "Projeção pelo ciclo"
		},
		maintenanceTakesPriority: "Manutenções emergenciais, alterações oficiais e avisos no jogo têm prioridade sobre esta contagem regressiva.",
		emptyState: "Nenhum evento futuro corresponde ao filtro atual.",
		faqTitle: "Perguntas sobre a contagem regressiva",
		faq: [
			{
				question: "Qual é a diferença entre a hora do servidor e a hora local?",
				answer: "A programação é calculada na hora do serviço selecionado. A hora local é convertida automaticamente para o fuso do seu dispositivo."
			},
			{
				question: "Por que não há contagem regressiva para o Global?",
				answer: "A programação Global ainda não foi publicada oficialmente. Os horários de TW ou KR não são apresentados como a programação Global."
			},
			{
				question: "A contagem regressiva é confiável durante a manutenção?",
				answer: "Nem sempre. Manutenções, alterações de eventos e avisos no jogo têm prioridade; confira o anúncio oficial antes de participar."
			}
		],
		events: {
			"spacetime-rift": {
				name: "Fenda espaço-temporal",
				description: "O portal da Fenda espaço-temporal fica aberto por 10 minutos; depois de entrar, você pode permanecer por até 1 hora.",
				repeatRule: "Diariamente às 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00 e 23:00 (hora do servidor)"
			},
			"abyss-rift-zone": {
				name: "Zona da Fenda do Abismo",
				description: "Entre na Zona da Fenda do Abismo durante o horário marcado e conclua os objetivos da área.",
				repeatRule: "Terças e quintas às 22:00 (hora do servidor)"
			},
			"artifact-occupation": {
				name: "Batalha de ocupação de artefatos",
				description: "Um evento de facções programado para disputar o controle dos artefatos.",
				repeatRule: "Quartas e sábados às 22:00 (hora do servidor)"
			},
			"abyss-bosses": {
				name: "Chefes do Abismo",
				description: "Enfrente os chefes que aparecem no Abismo em horários fixos.",
				repeatRule: "Quartas e sábados às 22:30 (hora do servidor)"
			},
			nahma: {
				name: "Nahma",
				description: "O chefe mundial Nahma aparece conforme sua programação de fim de semana.",
				repeatRule: "Sextas e domingos às 22:00 (hora do servidor)"
			},
			battlefield: {
				name: "Pareamento de Campo de batalha",
				description: "O Guidebook oficial e a atualização de 8 de abril confirmam os horários diários de pareamento do Campo de batalha. Os nomes dos modos podem mudar; confira no jogo as manutenções e alterações temporárias.",
				repeatRule: "Diariamente das 11:00–14:00 e 20:00–22:00 (hora do servidor)"
			},
			"dimensional-invasion": {
				name: "Invasão dimensional",
				description: "A atualização oficial de 8 de abril mudou o início da hora cheia para o minuto 30 de cada hora; confira no jogo os requisitos de participação e as alterações temporárias.",
				repeatRule: "Começa no minuto 30 de cada hora (hora do servidor)"
			},
			"shugo-festa": {
				name: "Festival Shugo",
				description: "A atualização oficial de 22 de abril confirma que todas as atividades do Festival Shugo são ativadas a cada hora cheia; confira no jogo os requisitos de participação e as alterações temporárias.",
				repeatRule: "Próxima sessão na hora cheia (hora do servidor; a atualização não confirma a duração)"
			}
		}
	},
	ru: {
		title: "Таймер событий AION2",
		serviceLabel: "Выберите сервер",
		services: {
			global: "Глобальный",
			tw: "Тайвань",
			kr: "Корея"
		},
		krGroupLabel: "Группа серверов KR",
		krGroups: {
			a: "Группа A",
			b: "Группа B",
			c: "Группа C"
		},
		krServerGroupHint: "Выберите группу, соответствующую комбинации серверов, указанной в игре.",
		krGroupOffsetHint: "Группа A — базовая; группа B начинает на 5 минут позже, а группа C — на 10 минут позже. Сдвиг применяется только к событиям и боссам Бездны, но не к Пространственно-временному разлому.",
		globalScheduleUnannounced: "Расписание глобального сервиса пока не объявлено. Дождитесь официальной информации.",
		serverTime: "Время сервера",
		localTime: "Местное время",
		nextActivity: "Следующее событие",
		nextBoss: "Следующий босс",
		nextRift: "Следующий разлом",
		filterLabel: "Фильтр предстоящих событий",
		filters: {
			all: "Все",
			activity: "События",
			boss: "Боссы",
			rift: "Разломы"
		},
		nextStart: "Следующее начало",
		countdown: "До начала",
		liveNow: "Идёт сейчас",
		activeSectionTitle: "Подтверждённые активные события",
		activeScopeNote: "Активными отмечаются только события с официально опубликованной длительностью. Для остальных показан лишь следующий старт.",
		noActiveEvents: "Сейчас нет событий с официальной длительностью, подтверждённых как активные.",
		endsAt: "Окончание",
		portalClosesAt: "Портал закроется в",
		mapLink: "Открыть карту",
		source: "Источник",
		checkedAt: "Дата проверки",
		sourceStatus: {
			official: "Официально",
			projected: "Расчёт по циклу"
		},
		maintenanceTakesPriority: "Экстренные техработы, официальные переносы и уведомления в игре имеют приоритет над этим таймером.",
		emptyState: "Нет предстоящих событий, соответствующих выбранному фильтру.",
		faqTitle: "Вопросы о таймере событий",
		faq: [
			{
				question: "Чем время сервера отличается от местного времени?",
				answer: "Расписание рассчитывается по времени выбранного сервиса. Местное время автоматически переводится в часовой пояс вашего устройства."
			},
			{
				question: "Почему нет таймера для глобального сервиса?",
				answer: "Официальное глобальное расписание ещё не опубликовано. Время TW или KR не выдаётся за глобальное расписание."
			},
			{
				question: "Точен ли таймер во время техработ?",
				answer: "Не всегда. Техработы, изменения событий и уведомления в игре имеют приоритет — перед участием проверьте официальное объявление."
			}
		],
		events: {
			"spacetime-rift": {
				name: "Пространственно-временной разлом",
				description: "Портал Пространственно-временного разлома открыт 10 минут; после входа можно оставаться внутри до 1 часа.",
				repeatRule: "Ежедневно в 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00 и 23:00 по времени сервера"
			},
			"abyss-rift-zone": {
				name: "Зона разлома Бездны",
				description: "Войдите в зону разлома Бездны в назначенное время и выполните цели области.",
				repeatRule: "По вторникам и четвергам в 22:00 по времени сервера"
			},
			"artifact-occupation": {
				name: "Битва за артефакт",
				description: "Запланированное фракционное событие за контроль над артефактами.",
				repeatRule: "По средам и субботам в 22:00 по времени сервера"
			},
			"abyss-bosses": {
				name: "Боссы Бездны",
				description: "Сразитесь с боссами, которые появляются в Бездне по расписанию.",
				repeatRule: "По средам и субботам в 22:30 по времени сервера"
			},
			nahma: {
				name: "Нахма",
				description: "Мировой босс Нахма появляется по расписанию выходных дней.",
				repeatRule: "По пятницам и воскресеньям в 22:00 по времени сервера"
			},
			battlefield: {
				name: "Подбор на поле боя",
				description: "Официальный Guidebook и обновление от 8 апреля подтверждают ежедневные окна подбора на поле боя. Названия режимов могут меняться; техработы и временные изменения проверяйте в игре.",
				repeatRule: "Ежедневно с 11:00 до 14:00 и с 20:00 до 22:00 (время сервера)"
			},
			"dimensional-invasion": {
				name: "Вторжение измерений",
				description: "Официальное обновление от 8 апреля перенесло начало с начала часа на 30-ю минуту каждого часа; условия участия и временные изменения проверяйте в игре.",
				repeatRule: "Начинается на 30-й минуте каждого часа (время сервера)"
			},
			"shugo-festa": {
				name: "Фестиваль шуго",
				description: "Официальное обновление от 22 апреля подтверждает, что все события Фестиваля шуго активируются в начале каждого часа; условия участия и временные изменения проверяйте в игре.",
				repeatRule: "Следующая сессия в начале часа (время сервера; обновление не подтверждает длительность)"
			}
		}
	},
	ko: {
		title: "AION2 이벤트 카운트다운",
		serviceLabel: "서비스 선택",
		services: {
			global: "글로벌",
			tw: "대만",
			kr: "한국"
		},
		krGroupLabel: "한국 서버 그룹",
		krGroups: {
			a: "그룹 A",
			b: "그룹 B",
			c: "그룹 C"
		},
		krServerGroupHint: "게임에 표시된 서버 조합에 맞는 그룹을 선택하세요.",
		krGroupOffsetHint: "그룹 A가 기준이며 그룹 B는 5분, 그룹 C는 10분 늦게 시작합니다. 이 차이는 어비스 활동과 보스에만 적용되며 시공의 균열에는 적용되지 않습니다.",
		globalScheduleUnannounced: "글로벌 서비스 일정은 아직 발표되지 않았습니다. 공식 안내를 기다려 주세요.",
		serverTime: "서버 시간",
		localTime: "현지 시간",
		nextActivity: "다음 활동",
		nextBoss: "다음 보스",
		nextRift: "다음 균열",
		filterLabel: "다음 이벤트 필터",
		filters: {
			all: "전체",
			activity: "활동",
			boss: "보스",
			rift: "균열"
		},
		nextStart: "다음 시작",
		countdown: "남은 시간",
		liveNow: "진행 중",
		activeSectionTitle: "현재 진행 중으로 확인된 이벤트",
		activeScopeNote: "공식 진행 시간이 공개된 이벤트만 진행 중으로 표시합니다. 종료 시간이 없는 이벤트는 다음 시작 시각만 표시합니다.",
		noActiveEvents: "공식 진행 시간을 기준으로 현재 진행 중임을 확인할 수 있는 이벤트가 없습니다.",
		endsAt: "종료 시간",
		portalClosesAt: "포털 종료 시간",
		mapLink: "지도 보기",
		source: "출처",
		checkedAt: "확인일",
		sourceStatus: {
			official: "공식",
			projected: "주기 기준 추산"
		},
		maintenanceTakesPriority: "긴급 점검, 공식 일정 변경 및 게임 내 안내가 이 카운트다운보다 우선합니다.",
		emptyState: "현재 필터에 맞는 예정 이벤트가 없습니다.",
		faqTitle: "이벤트 카운트다운 FAQ",
		faq: [
			{
				question: "서버 시간과 현지 시간은 어떻게 다른가요?",
				answer: "일정은 선택한 서비스의 서버 시간을 기준으로 계산됩니다. 현지 시간은 기기의 시간대로 자동 변환됩니다."
			},
			{
				question: "글로벌 카운트다운이 없는 이유는 무엇인가요?",
				answer: "글로벌 일정이 아직 공식 발표되지 않았기 때문입니다. 대만 또는 한국 시간을 글로벌 일정으로 표시하지 않습니다."
			},
			{
				question: "점검 중에도 카운트다운이 정확한가요?",
				answer: "항상 정확하지는 않습니다. 점검, 이벤트 변경 및 게임 내 안내가 우선하므로 참여 전에 공식 공지를 다시 확인하세요."
			}
		],
		events: {
			"spacetime-rift": {
				name: "시공의 균열",
				description: "시공의 균열 포털은 10분 동안 열리며, 입장 후 최대 1시간 동안 머물 수 있습니다.",
				repeatRule: "매일 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00, 23:00 (서버 시간)"
			},
			"abyss-rift-zone": {
				name: "어비스 균열 지대",
				description: "정해진 시간에 어비스 균열 지대에 입장해 지역 목표를 수행합니다.",
				repeatRule: "매주 화요일·목요일 22:00 (서버 시간)"
			},
			"artifact-occupation": {
				name: "아티팩트 점령전",
				description: "아티팩트 지배권을 두고 벌이는 정기 종족 이벤트입니다.",
				repeatRule: "매주 수요일·토요일 22:00 (서버 시간)"
			},
			"abyss-bosses": {
				name: "어비스 보스",
				description: "정해진 일정에 어비스에 등장하는 보스를 공략합니다.",
				repeatRule: "매주 수요일·토요일 22:30 (서버 시간)"
			},
			nahma: {
				name: "나흐마",
				description: "주말 일정에 등장하는 월드 보스 나흐마입니다.",
				repeatRule: "매주 금요일·일요일 22:00 (서버 시간)"
			},
			battlefield: {
				name: "전장 매칭",
				description: "공식 Guidebook과 4월 8일 업데이트에서 매일 전장 매칭 이용 시간을 확인했습니다. 모드 이름은 변경될 수 있으므로 점검 및 임시 조정은 게임 내 안내를 확인하세요.",
				repeatRule: "매일 11:00–14:00, 20:00–22:00 (서버 시간)"
			},
			"dimensional-invasion": {
				name: "차원 침공",
				description: "4월 8일 공식 업데이트로 발생 시간이 매시 정각에서 매시 30분으로 변경되었습니다. 실제 참여 조건과 임시 변경 사항은 게임 내 안내를 확인하세요.",
				repeatRule: "매시 30분 시작 (서버 시간)"
			},
			"shugo-festa": {
				name: "슈고 페스타",
				description: "4월 22일 공식 업데이트에서 모든 슈고 페스타가 매시 정각 활성화된다고 확인했습니다. 실제 참여 조건과 임시 변경 사항은 게임 내 안내를 확인하세요.",
				repeatRule: "다음 정각 회차 (서버 시간; 해당 업데이트에서 지속 시간은 확인되지 않음)"
			}
		}
	},
	"zh-hant": {
		title: "AION2 活動倒數",
		serviceLabel: "選擇服務",
		services: {
			global: "全球服",
			tw: "台服",
			kr: "韓服"
		},
		krGroupLabel: "韓服伺服器組別",
		krGroups: {
			a: "Group A",
			b: "Group B",
			c: "Group C"
		},
		krServerGroupHint: "請依遊戲內顯示的伺服器組合選擇對應組別。",
		krGroupOffsetHint: "Group A 為基準；Group B 延後 5 分鐘，Group C 延後 10 分鐘。偏移僅適用於深淵活動與 Boss，不適用於時空裂隙。",
		globalScheduleUnannounced: "全球服排程尚未公布，請等待官方公告。",
		serverTime: "伺服器時間",
		localTime: "本地時間",
		nextActivity: "下一個活動",
		nextBoss: "下一個 Boss",
		nextRift: "下一個裂隙",
		filterLabel: "篩選即將開始的活動",
		filters: {
			all: "全部",
			activity: "活動",
			boss: "Boss",
			rift: "裂隙"
		},
		nextStart: "下次開始",
		countdown: "倒數",
		liveNow: "進行中",
		activeSectionTitle: "目前可確認進行中的活動",
		activeScopeNote: "僅將官方已公布持續時間的活動標為進行中；未公布持續時間的活動只顯示下一次開場倒數。",
		noActiveEvents: "目前沒有可由官方持續時間確認的進行中活動。",
		endsAt: "結束時間",
		portalClosesAt: "裂隙入口關閉時間",
		mapLink: "查看地圖",
		source: "來源",
		checkedAt: "核對日期",
		sourceStatus: {
			official: "官方",
			projected: "依週期推算"
		},
		maintenanceTakesPriority: "臨時維護、官方改期與遊戲內提示優先於本頁倒數。",
		emptyState: "目前篩選條件下沒有即將開始的活動。",
		faqTitle: "活動倒數常見問題",
		faq: [
			{
				question: "伺服器時間和本地時間有什麼不同？",
				answer: "排程依所選服務的伺服器時間計算；本地時間會自動換算成你裝置所在的時區。"
			},
			{
				question: "為什麼全球服沒有倒數？",
				answer: "全球服排程尚未由官方公布。本站不會把台服或韓服時間直接當成全球服排程。"
			},
			{
				question: "維護期間倒數仍然準確嗎？",
				answer: "不一定。臨時維護、活動改期與遊戲內通知一律優先，參加前請再次核對官方公告。"
			}
		],
		events: {
			"spacetime-rift": {
				name: "時空裂隙",
				description: "時空裂隙傳送門開放 10 分鐘；進入後最多可停留 1 小時。",
				repeatRule: "每日 02:00、05:00、08:00、11:00、14:00、17:00、20:00、23:00（伺服器時間）"
			},
			"abyss-rift-zone": {
				name: "深淵裂隙地帶",
				description: "在指定時段進入深淵裂隙地帶並參與區域目標。",
				repeatRule: "每週二、週四 22:00（伺服器時間）"
			},
			"artifact-occupation": {
				name: "Artifact 佔領戰",
				description: "爭奪 Artifact 控制權的定時陣營活動。",
				repeatRule: "每週三、週六 22:00（伺服器時間）"
			},
			"abyss-bosses": {
				name: "深淵 Boss",
				description: "在深淵挑戰依排程登場的首領。",
				repeatRule: "每週三、週六 22:30（伺服器時間）"
			},
			nahma: {
				name: "納赫瑪",
				description: "依週末排程登場的世界首領納赫瑪。",
				repeatRule: "每週五、週日 22:00（伺服器時間）"
			},
			battlefield: {
				name: "戰場配對",
				description: "官方 Guidebook 與 4 月 8 日更新確認每日戰場配對開放時段；目前模式名稱可能調整，維護及臨時變更以遊戲內為準。",
				repeatRule: "每日 11:00–14:00、20:00–22:00（伺服器時間）"
			},
			"dimensional-invasion": {
				name: "次元進攻",
				description: "官方 4 月 8 日更新將發生時間從整點調整為每小時 30 分；實際參與條件與臨時調整以遊戲內為準。",
				repeatRule: "每小時 30 分開始（伺服器時間）"
			},
			"shugo-festa": {
				name: "樹古慶典",
				description: "官方 4 月 22 日更新確認所有樹古慶典每小時整點啟用；實際參與條件與臨時調整以遊戲內為準。",
				repeatRule: "下一個整點場次（伺服器時間；該更新未確認持續時間）"
			}
		}
	}
};
var EventTimer_module_default = {
	timer: "_timer_15l2m_1",
	heading: "_heading_15l2m_14",
	controlRow: "_controlRow_15l2m_15",
	clockRow: "_clockRow_15l2m_16",
	cardHeader: "_cardHeader_15l2m_17",
	cardFooter: "_cardFooter_15l2m_18",
	sourceHeading: "_sourceHeading_15l2m_19",
	summaryTop: "_summaryTop_15l2m_20",
	kicker: "_kicker_15l2m_38",
	label: "_label_15l2m_39",
	kind: "_kind_15l2m_40",
	verified: "_verified_15l2m_41",
	sourceMeta: "_sourceMeta_15l2m_42",
	intro: "_intro_15l2m_55",
	maintenance: "_maintenance_15l2m_56",
	groupNote: "_groupNote_15l2m_57",
	eventDescription: "_eventDescription_15l2m_58",
	emptyState: "_emptyState_15l2m_59",
	sourceIntro: "_sourceIntro_15l2m_60",
	faqItem: "_faqItem_15l2m_61",
	controls: "_controls_15l2m_71",
	controlIcon: "_controlIcon_15l2m_95",
	select: "_select_15l2m_112",
	groupControl: "_groupControl_15l2m_123",
	serverPairs: "_serverPairs_15l2m_136",
	clock: "_clock_15l2m_16",
	summaryGrid: "_summaryGrid_15l2m_171",
	summaryCard: "_summaryCard_15l2m_178",
	countdown: "_countdown_15l2m_216",
	nextTime: "_nextTime_15l2m_225",
	filterBlock: "_filterBlock_15l2m_233",
	filterCaption: "_filterCaption_15l2m_237",
	filters: "_filters_15l2m_245",
	eventList: "_eventList_15l2m_273",
	activeSection: "_activeSection_15l2m_281",
	activeHeading: "_activeHeading_15l2m_291",
	activeCount: "_activeCount_15l2m_304",
	activeScopeNote: "_activeScopeNote_15l2m_318",
	activeEventList: "_activeEventList_15l2m_326",
	eventCard: "_eventCard_15l2m_326",
	kindBadge: "_kindBadge_15l2m_357",
	derivedBadge: "_derivedBadge_15l2m_364",
	recurrence: "_recurrence_15l2m_378",
	mapLink: "_mapLink_15l2m_388",
	sourceLink: "_sourceLink_15l2m_389",
	timing: "_timing_15l2m_405",
	timePair: "_timePair_15l2m_417",
	compactEmptyState: "_compactEmptyState_15l2m_450",
	sources: "_sources_15l2m_466",
	faq: "_faq_15l2m_61",
	referenceSchedule: "_referenceSchedule_15l2m_468",
	referenceGrid: "_referenceGrid_15l2m_479",
	sourceList: "_sourceList_15l2m_526",
	faqList: "_faqList_15l2m_560"
};
//#endregion
//#region app/_components/tools/EventTimer.tsx
var import_jsx_runtime = require_jsx_runtime();
var SERVICE_STORAGE_KEY = "aion2-kina:event-timer-service:v2";
var KOREA_GROUP_STORAGE_KEY = "aion2-kina:event-timer-korea-group:v1";
var MAP_NAMES = {
	altgard: "Altgard",
	"abyss-rift-zone": "Abyss Rift Zone",
	"chaotic-lower-reshanta": "Lower Reshanta",
	"chaotic-middle-reshanta": "Middle Reshanta",
	verteron: "Verteron"
};
function defaultService(locale) {
	if (locale === "ko") return "kr";
	if (locale === "zh-hans" || locale === "zh-hant") return "tw";
	return "global";
}
function isEventTimerService(value) {
	return eventTimerServices.some((candidate) => candidate === value);
}
function isKoreaGroup(value) {
	return eventTimerKoreaGroups.some((candidate) => candidate === value);
}
function analyticsService(service) {
	return service === "global" ? "global" : "kr-tw-live";
}
function kindIcon(kind) {
	if (kind === "boss") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
		"aria-hidden": "true",
		size: 15
	});
	if (kind === "rift") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {
		"aria-hidden": "true",
		size: 15
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
		"aria-hidden": "true",
		size: 15
	});
}
function countdownLabel(target, now, locale) {
	const totalSeconds = Math.max(0, Math.ceil((target.getTime() - now) / 1e3));
	const days = Math.floor(totalSeconds / 86400);
	const clock = [
		Math.floor(totalSeconds % 86400 / 3600),
		Math.floor(totalSeconds % 3600 / 60),
		totalSeconds % 60
	].map((value) => String(value).padStart(2, "0")).join(":");
	if (!days) return clock;
	return `${new Intl.NumberFormat(siteLocaleConfig[locale].code, {
		style: "unit",
		unit: "day",
		unitDisplay: "narrow"
	}).format(days)} ${clock}`;
}
function mapHref(locale, mapSlug, filterSubtype) {
	const path = localizedHref(locale, `/tools/map/${mapSlug}/`);
	return filterSubtype ? `${path}#type=${filterSubtype}` : path;
}
function EventTimer({ initialNow, locale }) {
	const text = eventTimerLocalization[locale];
	const [now, setNow] = (0, import_react.useState)(initialNow);
	const [service, setService] = (0, import_react.useState)(() => defaultService(locale));
	const [koreaGroup, setKoreaGroup] = (0, import_react.useState)("a");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [clientReady, setClientReady] = (0, import_react.useState)(false);
	const profile = EVENT_TIMER_SERVICE_PROFILES[service];
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		window.queueMicrotask(() => {
			if (cancelled) return;
			let activeService = defaultService(locale);
			setClientReady(true);
			try {
				const storedService = window.localStorage.getItem(SERVICE_STORAGE_KEY);
				const storedGroup = window.localStorage.getItem(KOREA_GROUP_STORAGE_KEY);
				if (isEventTimerService(storedService)) {
					activeService = storedService;
					setService(storedService);
				}
				if (isKoreaGroup(storedGroup)) setKoreaGroup(storedGroup);
			} catch {}
			trackEvent("tool_open", {
				locale,
				service: analyticsService(activeService),
				surface: "event_timer",
				tool_name: "event_timer"
			});
			trackEvent("event_timer_open", {
				locale,
				service: analyticsService(activeService),
				surface: "event_timer",
				tool_name: "event_timer"
			});
		});
		return () => {
			cancelled = true;
		};
	}, [locale]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		let serverAnchor = initialNow;
		let performanceAnchor = window.performance.now();
		const updateClock = () => {
			if (cancelled) return;
			setNow(serverAnchor + window.performance.now() - performanceAnchor);
		};
		const synchronize = async () => {
			if (document.visibilityState === "hidden") return;
			const startedAt = window.performance.now();
			try {
				const response = await window.fetch("/api/time", {
					cache: "no-store",
					headers: { accept: "application/json" }
				});
				if (!response.ok) throw new Error("time-sync-failed");
				const payload = await response.json();
				if (typeof payload.now !== "number" || !Number.isFinite(payload.now)) throw new Error("invalid-time-response");
				const completedAt = window.performance.now();
				serverAnchor = payload.now + (completedAt - startedAt) / 2;
				performanceAnchor = completedAt;
			} catch {}
			updateClock();
		};
		updateClock();
		synchronize();
		const timer = window.setInterval(updateClock, 1e3);
		const resynchronize = () => void synchronize();
		window.addEventListener("focus", resynchronize);
		document.addEventListener("visibilitychange", resynchronize);
		return () => {
			cancelled = true;
			window.clearInterval(timer);
			window.removeEventListener("focus", resynchronize);
			document.removeEventListener("visibilitychange", resynchronize);
		};
	}, [initialNow]);
	const upcoming = (0, import_react.useMemo)(() => getUpcomingEventTimerEntries(service, now, koreaGroup), [
		koreaGroup,
		now,
		service
	]);
	const filteredUpcoming = (0, import_react.useMemo)(() => filter === "all" ? upcoming : upcoming.filter(({ entry }) => entry.kind === filter), [filter, upcoming]);
	const activeEntries = (0, import_react.useMemo)(() => upcoming.filter(({ status }) => status === "active"), [upcoming]);
	const scheduledEntries = (0, import_react.useMemo)(() => filteredUpcoming.filter(({ status }) => status === "upcoming"), [filteredUpcoming]);
	const summaries = (0, import_react.useMemo)(() => [
		{
			kind: "activity",
			label: text.nextActivity
		},
		{
			kind: "boss",
			label: text.nextBoss
		},
		{
			kind: "rift",
			label: text.nextRift
		}
	].map((summary) => ({
		...summary,
		occurrence: getNextEventTimerByKind(summary.kind, service, now, koreaGroup)
	})), [
		koreaGroup,
		now,
		service,
		text.nextActivity,
		text.nextBoss,
		text.nextRift
	]);
	const serverClock = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
		dateStyle: "medium",
		timeStyle: "medium",
		timeZone: profile.timeZone
	}), [locale, profile.timeZone]);
	const serverDateTime = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: profile.timeZone
	}), [locale, profile.timeZone]);
	const localClock = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
		dateStyle: "medium",
		timeStyle: "medium"
	}), [locale]);
	const localDateTime = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
		dateStyle: "medium",
		timeStyle: "short"
	}), [locale]);
	const checkedFormatter = (0, import_react.useMemo)(() => new Intl.DateTimeFormat(siteLocaleConfig[locale].code, {
		dateStyle: "medium",
		timeZone: "UTC"
	}), [locale]);
	const visibleSources = (0, import_react.useMemo)(() => {
		const relevantIds = new Set(EVENT_TIMER_ENTRIES.filter((entry) => filter === "all" || entry.kind === filter).flatMap((entry) => entry.sourceIds));
		return Object.entries(EVENT_TIMER_SOURCES).flatMap(([sourceKey, source]) => relevantIds.has(sourceKey) && (service === "global" || source.id.startsWith(`${service}-`) || source.id === "kr-spacetime-rift-window") ? [source] : []);
	}, [filter, service]);
	const latestSourceVerification = (0, import_react.useMemo)(() => visibleSources.reduce((latest, source) => source.verifiedAt > latest ? source.verifiedAt : latest, ""), [visibleSources]);
	function changeService(value) {
		if (value === service) return;
		setService(value);
		try {
			window.localStorage.setItem(SERVICE_STORAGE_KEY, value);
		} catch {}
		trackEvent("event_timer_service_change", {
			locale,
			service: analyticsService(value),
			surface: "event_timer",
			timer_service: value,
			tool_name: "event_timer"
		});
	}
	function changeKoreaGroup(value) {
		if (value === koreaGroup) return;
		setKoreaGroup(value);
		try {
			window.localStorage.setItem(KOREA_GROUP_STORAGE_KEY, value);
		} catch {}
		trackEvent("event_timer_service_change", {
			korea_group: value,
			locale,
			service: "kr-tw-live",
			surface: "event_timer",
			timer_service: "kr",
			tool_name: "event_timer"
		});
	}
	function changeFilter(value) {
		if (value === filter) return;
		setFilter(value);
		trackEvent("event_timer_filter_change", {
			filter: value,
			locale,
			service: analyticsService(service),
			surface: "event_timer",
			tool_name: "event_timer"
		});
	}
	function trackMapOpen(mapSlug, kind) {
		trackEvent("event_timer_map_open", {
			event_kind: kind,
			locale,
			map_name: mapSlug,
			service: analyticsService(service),
			surface: "event_timer",
			target_key: mapSlug,
			target_kind: "map",
			tool_name: "event_timer"
		});
	}
	function sourceDisplayLabel(sourceId) {
		if (sourceId.endsWith("live-activities")) return `AION2 · ${text.events["shugo-festa"].name} / ${text.events["dimensional-invasion"].name} / ${text.events.battlefield.name}`;
		if (sourceId.endsWith("spacetime-rift-window")) return `AION2 · ${text.events["spacetime-rift"].name} · ${text.portalClosesAt}`;
		if (sourceId.endsWith("spacetime-rift")) return `AION2 · ${text.events["spacetime-rift"].name}`;
		if (sourceId.endsWith("abyss-schedule")) return `AION2 · ${text.events["abyss-rift-zone"].name} / ${text.events["artifact-occupation"].name}`;
		if (sourceId.endsWith("abyss-bosses")) return `AION2 · ${text.events["abyss-bosses"].name} / ${text.events.nahma.name}`;
		if (sourceId.endsWith("abyss-guide")) return `AION2 · ${text.events["abyss-rift-zone"].name} / ${text.events["abyss-bosses"].name}`;
		return `AION2 · ${text.source}`;
	}
	function renderEventList(entries, className = EventTimer_module_default.eventList, headingLevel = 3) {
		const CardHeading = headingLevel === 4 ? "h4" : "h3";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className,
			children: entries.map(({ countdownAt, endsAt, entry, nextAt, status }) => {
				const eventCopy = text.events[entry.id];
				const koreaOffset = service === "kr" && entry.usesKoreaAbyssGroupOffset ? EVENT_TIMER_KOREA_GROUP_OFFSETS[koreaGroup] : 0;
				const displayAt = status === "active" && endsAt ? endsAt : nextAt;
				const timeLabel = status === "active" ? entry.id === "spacetime-rift" ? text.portalClosesAt : text.endsAt : text.nextStart;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: EventTimer_module_default.eventCard,
					"data-kind": entry.kind,
					"data-status": status,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: EventTimer_module_default.cardHeader,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: EventTimer_module_default.kindBadge,
								children: [kindIcon(entry.kind), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: EventTimer_module_default.kind,
									children: text.filters[entry.kind]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeading, { children: eventCopy.name })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: EventTimer_module_default.derivedBadge,
								children: entry.hasDerivedSlots ? text.sourceStatus.projected : text.sourceStatus.official
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: EventTimer_module_default.eventDescription,
							children: eventCopy.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: EventTimer_module_default.recurrence,
							children: [eventCopy.repeatRule, koreaOffset ? ` · ${text.krGroups[koreaGroup]} +${koreaOffset}` : ""]
						}),
						entry.mapLinks?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: EventTimer_module_default.cardFooter,
							children: entry.mapLinks.map((map) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: EventTimer_module_default.mapLink,
								href: mapHref(locale, map.mapSlug, map.filterSubtype),
								onClick: () => trackMapOpen(map.mapSlug, entry.kind),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
										"aria-hidden": "true",
										size: 15
									}),
									text.mapLink,
									" · ",
									MAP_NAMES[map.mapSlug] ?? map.mapSlug
								]
							}, `${entry.id}:${map.mapSlug}`))
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: EventTimer_module_default.timing,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: EventTimer_module_default.label,
								children: [status === "active" ? `${text.liveNow} · ` : "", text.countdown]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: EventTimer_module_default.countdown,
								children: countdownLabel(countdownAt, now, locale)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: EventTimer_module_default.timePair,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									timeLabel,
									" · ",
									text.serverTime
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									dateTime: displayAt.toISOString(),
									children: serverDateTime.format(displayAt)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: EventTimer_module_default.timePair,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									timeLabel,
									" · ",
									text.localTime
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									dateTime: displayAt.toISOString(),
									children: clientReady ? localDateTime.format(displayAt) : "—"
								})]
							})
						]
					})]
				}, entry.id);
			})
		});
	}
	const filterControls = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: EventTimer_module_default.filterBlock,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: EventTimer_module_default.filterCaption,
			children: text.filterLabel
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-label": text.filterLabel,
			className: EventTimer_module_default.filters,
			role: "group",
			children: [
				"all",
				"activity",
				"boss",
				"rift"
			].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-pressed": filter === value,
				onClick: () => changeFilter(value),
				type: "button",
				children: text.filters[value]
			}, value))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: EventTimer_module_default.timer,
		"aria-labelledby": "event-timer-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: EventTimer_module_default.heading,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: EventTimer_module_default.kicker,
					children: "AION2 LIVE SCHEDULE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "event-timer-title",
					children: text.title
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: EventTimer_module_default.controls,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: text.serviceLabel }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: EventTimer_module_default.controlRow,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: EventTimer_module_default.controlIcon,
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 18 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: EventTimer_module_default.label,
								htmlFor: "event-timer-service",
								children: text.serviceLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: EventTimer_module_default.select,
								id: "event-timer-service",
								onChange: (event) => changeService(event.target.value),
								value: service,
								children: eventTimerServices.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value,
									children: text.services[value]
								}, value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: EventTimer_module_default.clockRow,
								children: [service !== "global" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: EventTimer_module_default.clock,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										text.serverTime,
										" · ",
										profile.timeZone
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: serverClock.format(now) })]
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: EventTimer_module_default.clock,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: text.localTime }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: clientReady ? localClock.format(now) : "—" })]
								})]
							})
						]
					}),
					service === "kr" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: EventTimer_module_default.groupControl,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: EventTimer_module_default.label,
								htmlFor: "event-timer-kr-group",
								children: text.krGroupLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: EventTimer_module_default.select,
								id: "event-timer-kr-group",
								onChange: (event) => changeKoreaGroup(event.target.value),
								value: koreaGroup,
								children: eventTimerKoreaGroups.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value,
									children: text.krGroups[value]
								}, value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: EventTimer_module_default.groupNote,
								children: [
									text.krServerGroupHint,
									" ",
									text.krGroupOffsetHint,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: EventTimer_module_default.serverPairs,
										children: [
											text.krGroups[koreaGroup],
											" · ",
											EVENT_TIMER_KOREA_GROUP_SERVERS[koreaGroup].join(" · ")
										]
									})
								]
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: EventTimer_module_default.summaryGrid,
				children: summaries.map(({ kind, label, occurrence }) => {
					const eventCopy = occurrence ? text.events[occurrence.entry.id] : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: EventTimer_module_default.summaryCard,
						"data-kind": kind,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: EventTimer_module_default.summaryTop,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [kindIcon(kind), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: EventTimer_module_default.kind,
									children: occurrence?.status === "active" ? text.liveNow : label
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
									"aria-hidden": "true",
									size: 16
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: eventCopy?.name ?? text.services.global }),
							occurrence ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: EventTimer_module_default.countdown,
								children: [occurrence.status === "active" ? `${text.liveNow} · ` : "", countdownLabel(occurrence.countdownAt, now, locale)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
								className: EventTimer_module_default.nextTime,
								dateTime: occurrence.countdownAt.toISOString(),
								children: [occurrence.status === "active" ? `${occurrence.entry.id === "spacetime-rift" ? text.portalClosesAt : text.endsAt} · ` : "", serverDateTime.format(occurrence.countdownAt)]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: EventTimer_module_default.nextTime,
								children: text.globalScheduleUnannounced
							})
						]
					}, kind);
				})
			}),
			service === "global" ? filterControls : null,
			service === "global" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: EventTimer_module_default.emptyState,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: text.services.global }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text.globalScheduleUnannounced })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: EventTimer_module_default.referenceSchedule,
				"aria-labelledby": "regional-schedule-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: EventTimer_module_default.kicker,
						children: text.sourceStatus.official
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						id: "regional-schedule-title",
						children: [
							text.services.tw,
							" / ",
							text.services.kr
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: EventTimer_module_default.referenceGrid,
						children: EVENT_TIMER_ENTRIES.filter((entry) => filter === "all" || entry.kind === filter).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: EventTimer_module_default.kindBadge,
								children: [kindIcon(entry.kind), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: EventTimer_module_default.kind,
									children: text.filters[entry.kind]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: text.events[entry.id].name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text.events[entry.id].repeatRule })
						] }, entry.id))
					})
				]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: EventTimer_module_default.activeSection,
					"aria-labelledby": "event-timer-active-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: EventTimer_module_default.activeHeading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: EventTimer_module_default.kicker,
								children: text.liveNow
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "event-timer-active-title",
								children: text.activeSectionTitle
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-atomic": "true",
								"aria-label": `${text.activeSectionTitle}: ${activeEntries.length}`,
								"aria-live": "polite",
								className: EventTimer_module_default.activeCount,
								role: "status",
								children: activeEntries.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: EventTimer_module_default.activeScopeNote,
							children: text.activeScopeNote
						}),
						activeEntries.length > 0 ? renderEventList(activeEntries, `${EventTimer_module_default.eventList} ${EventTimer_module_default.activeEventList}`, 4) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${EventTimer_module_default.emptyState} ${EventTimer_module_default.compactEmptyState}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text.noActiveEvents })
						})
					]
				}),
				filterControls,
				scheduledEntries.length > 0 ? renderEventList(scheduledEntries) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: EventTimer_module_default.emptyState,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text.emptyState })
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: EventTimer_module_default.sources,
				"aria-labelledby": "event-timer-sources",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: EventTimer_module_default.sourceHeading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: EventTimer_module_default.kicker,
							children: text.sourceStatus.official
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "event-timer-sources",
							children: text.source
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: EventTimer_module_default.verified,
							children: [
								text.checkedAt,
								" · ",
								latestSourceVerification ? checkedFormatter.format(/* @__PURE__ */ new Date(`${latestSourceVerification}T00:00:00Z`)) : "—"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: EventTimer_module_default.sourceIntro,
						children: text.maintenanceTakesPriority
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: EventTimer_module_default.sourceList,
						children: visibleSources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: EventTimer_module_default.sourceLink,
							href: source.url,
							onClick: () => trackEvent("event_timer_source_open", {
								locale,
								service: analyticsService(service),
								source_id: source.id,
								surface: "event_timer",
								tool_name: "event_timer"
							}),
							rel: "noreferrer",
							target: "_blank",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: sourceDisplayLabel(source.id) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: EventTimer_module_default.sourceMeta,
								children: [
									source.publisher,
									" · ",
									text.checkedAt,
									" ",
									checkedFormatter.format(/* @__PURE__ */ new Date(`${source.verifiedAt}T00:00:00Z`))
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								"aria-hidden": "true",
								size: 15
							})]
						}) }, source.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: EventTimer_module_default.faq,
				"aria-labelledby": "event-timer-faq",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: EventTimer_module_default.kicker,
						children: "FAQ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "event-timer-faq",
						children: text.faqTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: EventTimer_module_default.faqList,
						children: text.faq.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: EventTimer_module_default.faqItem,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: item.question }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.answer })]
						}, item.question))
					})
				]
			})
		]
	});
}
//#endregion
export { EventTimer };
