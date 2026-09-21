/**
* Checklist cycle model for AION2's live Taiwan/Hong Kong/Macao and Korea
* services. Wednesday 05:00 has direct official reset evidence; daily 05:00
* follows the official operating-day boundary plus the current routine
* reference. Individual in-game timers still take priority. Neither timezone
* observes daylight saving time, so fixed offsets keep boundaries deterministic.
*/
var CHECKLIST_SERVER_PROFILES = {
	tw: {
		region: "tw",
		timeZone: "Asia/Taipei",
		utcOffsetMinutes: 480,
		dailyResetHour: 5,
		weeklyResetDay: 3
	},
	kr: {
		region: "kr",
		timeZone: "Asia/Seoul",
		utcOffsetMinutes: 540,
		dailyResetHour: 5,
		weeklyResetDay: 3
	}
};
var MINUTE_MS = 6e4;
var DAY_MS = 1440 * MINUTE_MS;
var WEEK_MS = 7 * DAY_MS;
function isChecklistRegion(value) {
	return value === "tw" || value === "kr";
}
function asValidDate(value) {
	const date = value === void 0 ? /* @__PURE__ */ new Date() : new Date(value);
	return Number.isFinite(date.getTime()) ? date : /* @__PURE__ */ new Date();
}
function formatUtcDate(value) {
	return `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, "0")}-${String(value.getUTCDate()).padStart(2, "0")}`;
}
function localBoundaryToUtc(localBoundaryMs, profile) {
	return new Date(localBoundaryMs - profile.utcOffsetMinutes * MINUTE_MS);
}
function getChecklistCycleState(region = "tw", now) {
	const profile = CHECKLIST_SERVER_PROFILES[region];
	const instant = asValidDate(now);
	const localNowMs = instant.getTime() + profile.utcOffsetMinutes * MINUTE_MS;
	const localNow = new Date(localNowMs);
	const localDayStartMs = Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate());
	const todayResetMs = localDayStartMs + profile.dailyResetHour * 60 * MINUTE_MS;
	const dailyStartMs = localNowMs >= todayResetMs ? todayResetMs : todayResetMs - DAY_MS;
	const nextDailyResetMs = dailyStartMs + DAY_MS;
	let weeklyStartMs = localDayStartMs - (localNow.getUTCDay() - profile.weeklyResetDay + 7) % 7 * DAY_MS + profile.dailyResetHour * 60 * MINUTE_MS;
	if (weeklyStartMs > localNowMs) weeklyStartMs -= WEEK_MS;
	const nextWeeklyResetMs = weeklyStartMs + WEEK_MS;
	const dailyDate = new Date(dailyStartMs);
	const weeklyDate = new Date(weeklyStartMs);
	return {
		region,
		serverTimeZone: profile.timeZone,
		serverNow: new Date(instant.getTime()),
		dailyCycleKey: `${region}:daily:${formatUtcDate(dailyDate)}`,
		weeklyCycleKey: `${region}:weekly:${formatUtcDate(weeklyDate)}`,
		nextDailyResetAt: localBoundaryToUtc(nextDailyResetMs, profile),
		nextWeeklyResetAt: localBoundaryToUtc(nextWeeklyResetMs, profile)
	};
}
var CHECKLIST_STORAGE_KEY = "aion2-atlas:daily-checklist:v3";
var STORAGE_UNAVAILABLE_PREFIX = "__aion2_atlas_storage_unavailable__:";
var MAX_LABEL_LENGTH = 80;
var MAX_REFERENCE_LENGTH = 160;
var MAX_TIMER_DELAY = 2147e6;
function boundedString(value, maxLength = MAX_REFERENCE_LENGTH) {
	if (typeof value !== "string") return null;
	const normalized = value.trim();
	return normalized && normalized.length <= maxLength ? normalized : null;
}
function normalizeLabel(value) {
	if (typeof value !== "string") return null;
	const normalized = value.trim().replace(/\s+/gu, " ");
	return normalized ? normalized.slice(0, MAX_LABEL_LENGTH) : null;
}
function normalizeBuiltinId(value) {
	const id = boundedString(value, 100);
	return id && /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/u.test(id) ? id : null;
}
function normalizeCompletedAt(value) {
	const timestamp = boundedString(value, 64);
	if (!timestamp) return null;
	const parsed = Date.parse(timestamp);
	return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
}
function normalizeMapRef(value) {
	if (!value || typeof value !== "object") return null;
	const candidate = value;
	const mapName = boundedString(candidate.mapName);
	const mapSlug = boundedString(candidate.mapSlug, 100);
	const markerId = boundedString(candidate.markerId);
	if (!mapName || !mapSlug || !markerId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(mapSlug)) return null;
	const markerNameSnapshot = boundedString(candidate.markerNameSnapshot);
	const sourceVersion = boundedString(candidate.sourceVersion);
	return {
		mapName,
		mapSlug,
		markerId,
		...markerNameSnapshot ? { markerNameSnapshot } : {},
		...sourceVersion ? { sourceVersion } : {}
	};
}
function normalizeItem(value, allowOnce) {
	if (!value || typeof value !== "object") return null;
	const candidate = value;
	const originalId = boundedString(candidate.id);
	const label = normalizeLabel(candidate.label);
	const validFrequency = candidate.frequency === "daily" || candidate.frequency === "weekly" || allowOnce && candidate.frequency === "once";
	if (!originalId || !label || !validFrequency || typeof candidate.done !== "boolean") return null;
	const mapRef = candidate.mapRef === void 0 ? void 0 : normalizeMapRef(candidate.mapRef);
	if (candidate.mapRef !== void 0 && !mapRef) return null;
	let id = originalId;
	let source = mapRef ? "map" : "custom";
	let builtinId;
	if (candidate.source === "builtin") {
		const normalizedBuiltinId = normalizeBuiltinId(candidate.builtinId);
		if (!normalizedBuiltinId || mapRef || candidate.frequency === "once") return null;
		builtinId = normalizedBuiltinId;
		id = `builtin:${normalizedBuiltinId}`;
		source = "builtin";
	} else if (candidate.source === "map" && !mapRef) return null;
	const completedAt = candidate.done ? normalizeCompletedAt(candidate.completedAt) : null;
	return {
		id,
		label,
		frequency: candidate.frequency,
		done: candidate.done,
		source,
		...builtinId ? { builtinId } : {},
		...completedAt ? { completedAt } : {},
		...mapRef ? { mapRef } : {}
	};
}
function normalizeItems(values, allowOnce = true) {
	const items = [];
	const seenIds = /* @__PURE__ */ new Set();
	let builtinCount = 0;
	let userItemCount = 0;
	for (const value of values) {
		const item = normalizeItem(value, allowOnce);
		if (!item || seenIds.has(item.id)) continue;
		if (item.source === "builtin") {
			if (builtinCount >= 64) continue;
			builtinCount += 1;
		} else {
			if (userItemCount >= 100) continue;
			userItemCount += 1;
		}
		seenIds.add(item.id);
		items.push(item);
	}
	return items;
}
function reopenChecklistItem(item) {
	const openItem = {
		...item,
		done: false
	};
	delete openItem.completedAt;
	return openItem;
}
function currentPeriods(cycleState) {
	return {
		daily: cycleState.dailyCycleKey,
		weekly: cycleState.weeklyCycleKey
	};
}
function normalizePeriod(value, cadence) {
	const period = boundedString(value, 40);
	if (!period) return null;
	return (cadence === "daily" ? /^(?:tw|kr):daily:\d{4}-\d{2}-\d{2}$/u : /^(?:tw|kr):weekly:\d{4}-\d{2}-\d{2}$/u).test(period) ? period : null;
}
function parseRawChecklist(raw, defaultRegion) {
	const empty = {
		items: [],
		region: defaultRegion,
		periods: {},
		sourceVersion: null,
		needsPersistence: false
	};
	if (!raw) return empty;
	try {
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return {
			items: normalizeItems(parsed, false),
			region: defaultRegion,
			periods: {},
			sourceVersion: 1,
			needsPersistence: true
		};
		if (!parsed || typeof parsed !== "object") return empty;
		const document = parsed;
		if (document.schemaVersion === 2 && Array.isArray(document.items)) return {
			items: normalizeItems(document.items),
			region: defaultRegion,
			periods: {},
			sourceVersion: 2,
			needsPersistence: true
		};
		if (document.schemaVersion !== 3 || !Array.isArray(document.items)) return empty;
		const region = isChecklistRegion(document.settings?.region) ? document.settings.region : defaultRegion;
		const daily = normalizePeriod(document.periods?.daily, "daily");
		const weekly = normalizePeriod(document.periods?.weekly, "weekly");
		return {
			items: normalizeItems(document.items),
			region,
			periods: {
				...daily ? { daily } : {},
				...weekly ? { weekly } : {}
			},
			sourceVersion: 3,
			needsPersistence: !isChecklistRegion(document.settings?.region) || !daily || !weekly
		};
	} catch {
		return empty;
	}
}
function readChecklistSnapshot(value, options = {}) {
	const storageUnavailable = value?.startsWith(STORAGE_UNAVAILABLE_PREFIX) ?? false;
	const parsed = parseRawChecklist(storageUnavailable ? value?.slice(36) || null : value, options.defaultRegion ?? "tw");
	const cycleState = getChecklistCycleState(parsed.region, options.now);
	const periods = currentPeriods(cycleState);
	const dailyMismatch = Boolean(parsed.periods.daily && parsed.periods.daily !== periods.daily);
	const weeklyMismatch = Boolean(parsed.periods.weekly && parsed.periods.weekly !== periods.weekly);
	const resetApplied = dailyMismatch || weeklyMismatch;
	return {
		items: resetApplied ? parsed.items.map((item) => {
			if (!(item.frequency === "daily" && dailyMismatch || item.frequency === "weekly" && weeklyMismatch) || !item.done) return item;
			return reopenChecklistItem(item);
		}) : parsed.items,
		settings: { region: parsed.region },
		periods,
		cycleState,
		storageUnavailable,
		sourceVersion: parsed.sourceVersion,
		resetApplied,
		needsPersistence: parsed.needsPersistence || resetApplied
	};
}
function prepareItemsForWrite(items, now) {
	return normalizeItems(items).map((item) => {
		if (!item.done) return reopenChecklistItem(item);
		return item.completedAt ? item : {
			...item,
			completedAt: now.toISOString()
		};
	});
}
function serializeChecklistDocument(items, options = {}) {
	const region = options.region ?? "tw";
	const now = options.now === void 0 ? /* @__PURE__ */ new Date() : new Date(options.now);
	const safeNow = Number.isFinite(now.getTime()) ? now : /* @__PURE__ */ new Date();
	const cycleState = getChecklistCycleState(region, safeNow);
	const document = {
		schemaVersion: 3,
		settings: { region },
		periods: currentPeriods(cycleState),
		items: prepareItemsForWrite(items, safeNow)
	};
	return JSON.stringify(document);
}
function createChecklistStore() {
	const subscribers = /* @__PURE__ */ new Set();
	let volatileValue = null;
	let fallbackActive = false;
	let resetTimer = null;
	function getSnapshot() {
		if (fallbackActive) return `${STORAGE_UNAVAILABLE_PREFIX}${volatileValue ?? ""}`;
		try {
			return window.localStorage.getItem("aion2-atlas:daily-checklist:v3") ?? window.localStorage.getItem("aion2-atlas:daily-checklist:v2") ?? window.localStorage.getItem("aion2-atlas:daily-checklist:v1");
		} catch {
			fallbackActive = true;
			return `${STORAGE_UNAVAILABLE_PREFIX}${volatileValue ?? ""}`;
		}
	}
	function getServerSnapshot() {
		return null;
	}
	function notify() {
		for (const callback of subscribers) callback();
	}
	function scheduleReset() {
		if (resetTimer !== null) window.clearTimeout(resetTimer);
		resetTimer = null;
		if (!subscribers.size) return;
		const now = /* @__PURE__ */ new Date();
		const snapshot = readChecklistSnapshot(getSnapshot(), { now });
		const nextResetAt = Math.min(snapshot.cycleState.nextDailyResetAt.getTime(), snapshot.cycleState.nextWeeklyResetAt.getTime());
		const delay = Math.min(MAX_TIMER_DELAY, Math.max(0, nextResetAt - now.getTime()) + 250);
		resetTimer = window.setTimeout(() => {
			synchronize(/* @__PURE__ */ new Date());
			scheduleReset();
		}, delay);
	}
	function write(items, options = {}) {
		const now = options.now === void 0 ? /* @__PURE__ */ new Date() : new Date(options.now);
		const safeNow = Number.isFinite(now.getTime()) ? now : /* @__PURE__ */ new Date();
		const current = readChecklistSnapshot(getSnapshot(), { now: safeNow });
		const value = serializeChecklistDocument(items, {
			now: safeNow,
			region: options.region ?? current.settings.region
		});
		volatileValue = value;
		let persisted = true;
		try {
			if (fallbackActive) throw new Error("Local storage unavailable");
			window.localStorage.setItem(CHECKLIST_STORAGE_KEY, value);
		} catch {
			fallbackActive = true;
			persisted = false;
		}
		notify();
		scheduleReset();
		return persisted;
	}
	function synchronize(now = /* @__PURE__ */ new Date()) {
		const snapshot = readChecklistSnapshot(getSnapshot(), { now });
		if (!snapshot.needsPersistence) {
			scheduleReset();
			return false;
		}
		write(snapshot.items, {
			region: snapshot.settings.region,
			now
		});
		return true;
	}
	function handleStorage(event) {
		if (event.key !== "aion2-atlas:daily-checklist:v3" && event.key !== "aion2-atlas:daily-checklist:v2" && event.key !== "aion2-atlas:daily-checklist:v1" && event.key !== null) return;
		if (!synchronize(/* @__PURE__ */ new Date())) notify();
		scheduleReset();
	}
	function handleVisibilityOrFocus() {
		if (document.visibilityState === "hidden") return;
		if (!synchronize(/* @__PURE__ */ new Date())) notify();
		scheduleReset();
	}
	function subscribe(callback) {
		subscribers.add(callback);
		if (subscribers.size === 1) {
			window.addEventListener("storage", handleStorage);
			window.addEventListener("focus", handleVisibilityOrFocus);
			document.addEventListener("visibilitychange", handleVisibilityOrFocus);
			queueMicrotask(() => {
				if (!subscribers.size) return;
				synchronize(/* @__PURE__ */ new Date());
				scheduleReset();
			});
		}
		return () => {
			subscribers.delete(callback);
			if (subscribers.size) return;
			window.removeEventListener("storage", handleStorage);
			window.removeEventListener("focus", handleVisibilityOrFocus);
			document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
			if (resetTimer !== null) window.clearTimeout(resetTimer);
			resetTimer = null;
		};
	}
	return {
		getServerSnapshot,
		getSnapshot,
		subscribe,
		synchronize,
		write
	};
}
var checklistStore = createChecklistStore();
function syncChecklistResets(now = /* @__PURE__ */ new Date()) {
	return checklistStore.synchronize(now);
}
function updateChecklistItems(update) {
	const snapshot = readChecklistSnapshot(checklistStore.getSnapshot());
	const next = normalizeItems(update(snapshot.items));
	checklistStore.write(next, { region: snapshot.settings.region });
	return readChecklistSnapshot(checklistStore.getSnapshot()).items;
}
function createId() {
	return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}
function addChecklistItem(input) {
	const label = normalizeLabel(input.label);
	const frequency = input.frequency ?? "daily";
	const mapRef = input.mapRef === void 0 ? void 0 : normalizeMapRef(input.mapRef);
	if (!label || frequency !== "daily" && frequency !== "weekly" && frequency !== "once" || input.mapRef !== void 0 && !mapRef) return null;
	const snapshot = readChecklistSnapshot(checklistStore.getSnapshot());
	const current = snapshot.items;
	if (mapRef) {
		const existing = current.find((candidate) => candidate.mapRef?.mapName === mapRef.mapName && candidate.mapRef.markerId === mapRef.markerId);
		if (existing) return {
			item: existing,
			added: false,
			outcome: "duplicate",
			persisted: !snapshot.storageUnavailable
		};
	}
	if (current.filter((item) => item.source !== "builtin").length >= 100) return {
		item: null,
		added: false,
		outcome: "limit",
		persisted: !snapshot.storageUnavailable
	};
	const item = {
		id: createId(),
		label,
		frequency,
		done: false,
		source: mapRef ? "map" : "custom",
		...mapRef ? { mapRef } : {}
	};
	return {
		item,
		added: true,
		outcome: "added",
		persisted: checklistStore.write([...current, item], { region: snapshot.settings.region })
	};
}
function ensureBuiltinChecklistItems(definitions) {
	const normalizedDefinitions = [];
	const seen = /* @__PURE__ */ new Set();
	for (const definition of definitions) {
		const id = normalizeBuiltinId(definition.id);
		const label = normalizeLabel(definition.label ?? definition.id);
		if (!id || !label || seen.has(id)) continue;
		if (definition.frequency !== "daily" && definition.frequency !== "weekly") continue;
		seen.add(id);
		normalizedDefinitions.push({
			id,
			frequency: definition.frequency,
			label
		});
		if (normalizedDefinitions.length >= 64) break;
	}
	const snapshot = readChecklistSnapshot(checklistStore.getSnapshot());
	const currentBuiltins = new Map(snapshot.items.filter((item) => item.source === "builtin" && Boolean(item.builtinId)).map((item) => [item.builtinId, item]));
	let added = 0;
	const ensured = normalizedDefinitions.map((definition) => {
		const existing = currentBuiltins.get(definition.id);
		if (!existing) {
			added += 1;
			return {
				id: `builtin:${definition.id}`,
				builtinId: definition.id,
				label: definition.label,
				frequency: definition.frequency,
				done: false,
				source: "builtin"
			};
		}
		return {
			...existing,
			id: `builtin:${definition.id}`,
			builtinId: definition.id,
			label: definition.label,
			frequency: definition.frequency,
			source: "builtin"
		};
	});
	const knownIds = new Set(normalizedDefinitions.map((definition) => definition.id));
	const retained = snapshot.items.filter((item) => item.source !== "builtin" || !item.builtinId || !knownIds.has(item.builtinId));
	const next = normalizeItems([...ensured, ...retained]);
	const changed = snapshot.needsPersistence || JSON.stringify(next) !== JSON.stringify(snapshot.items);
	const persisted = changed ? checklistStore.write(next, { region: snapshot.settings.region }) : !snapshot.storageUnavailable;
	return {
		items: next,
		added,
		changed,
		persisted
	};
}
function setChecklistRegion(region) {
	const snapshot = readChecklistSnapshot(checklistStore.getSnapshot());
	if (region === snapshot.settings.region) {
		if (snapshot.needsPersistence) {
			const persisted = checklistStore.write(snapshot.items, { region });
			return {
				items: snapshot.items,
				region,
				changed: false,
				persisted
			};
		}
		return {
			items: snapshot.items,
			region,
			changed: false,
			persisted: !snapshot.storageUnavailable
		};
	}
	const items = snapshot.items;
	return {
		items,
		region,
		changed: true,
		persisted: checklistStore.write(items, { region })
	};
}
//#endregion
export { setChecklistRegion as a, getChecklistCycleState as c, readChecklistSnapshot as i, checklistStore as n, syncChecklistResets as o, ensureBuiltinChecklistItems as r, updateChecklistItems as s, addChecklistItem as t };
