import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import { n as CHECKLIST_BUILTIN_DEFINITIONS, o as getChecklistItemLabel } from "./checklist-activities-DCN9enQR.js";
import { i as readChecklistSnapshot, n as checklistStore, r as ensureBuiltinChecklistItems, s as updateChecklistItems } from "./checklist-store-Pmpy4L7d.js";
//#region app/_components/home/HomeChecklistCard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function HomeChecklistCard({ locale, checklistHref, copy }) {
	const t = (value) => copy[value] ?? value;
	const storedChecklist = (0, import_react.useSyncExternalStore)(checklistStore.subscribe, checklistStore.getSnapshot, checklistStore.getServerSnapshot);
	const checklistSnapshot = (0, import_react.useMemo)(() => readChecklistSnapshot(storedChecklist), [storedChecklist]);
	const checklistItems = checklistSnapshot.items;
	const checklistSummary = (0, import_react.useMemo)(() => [...checklistItems].sort((left, right) => {
		if (left.done !== right.done) return left.done ? 1 : -1;
		if (left.frequency !== right.frequency) {
			if (left.frequency === "daily") return -1;
			if (right.frequency === "daily") return 1;
			if (left.frequency === "weekly") return -1;
			if (right.frequency === "weekly") return 1;
		}
		return left.source === "builtin" && right.source !== "builtin" ? -1 : 0;
	}).slice(0, 3), [checklistItems]);
	const completedCount = checklistItems.filter((item) => item.done).length;
	(0, import_react.useEffect)(() => {
		ensureBuiltinChecklistItems(CHECKLIST_BUILTIN_DEFINITIONS);
	}, []);
	const toggleChecklistItem = (id) => {
		const currentItem = checklistItems.find((item) => item.id === id);
		if (!currentItem) return;
		const done = !currentItem.done;
		updateChecklistItems((current) => current.map((item) => item.id === id ? {
			...item,
			done,
			...done ? { completedAt: (/* @__PURE__ */ new Date()).toISOString() } : { completedAt: void 0 }
		} : item));
		trackEvent(done ? "checklist_item_complete" : "checklist_item_reopen", {
			frequency: currentItem.frequency,
			has_map_ref: Boolean(currentItem.mapRef),
			surface: "home"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "expedition-card hero-checklist-card",
		"aria-labelledby": "hero-checklist-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-topline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("MY CHECKLIST / THIS DEVICE") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					String(completedCount).padStart(2, "0"),
					" /",
					" ",
					String(checklistItems.length).padStart(2, "0")
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "hero-checklist-title",
				children: t("My checklist")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "progress-track",
				role: "progressbar",
				"aria-label": t("Checklist progress"),
				"aria-valuemin": 0,
				"aria-valuemax": Math.max(checklistItems.length, 1),
				"aria-valuenow": completedCount,
				"aria-valuetext": checklistItems.length ? `${completedCount} / ${checklistItems.length}` : t("No checklist items yet."),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${checklistItems.length ? completedCount / checklistItems.length * 100 : 0}%` } })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "checklist",
				children: checklistSummary.length ? checklistSummary.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "check-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: item.done,
							onChange: () => toggleChecklistItem(item.id)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "custom-check",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "check-row-copy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getChecklistItemLabel(item, locale) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: t(item.frequency === "daily" ? "Daily" : item.frequency === "weekly" ? "Weekly" : "One-time") })]
						})
					]
				}, item.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "checklist-empty",
					children: t("No checklist items yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "checklist-card-footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: checklistSnapshot.storageUnavailable ? t("Local storage is unavailable; changes may not persist.") : t("Saved on this device. Daily and weekly cycles reset automatically.") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: checklistHref,
					onClick: () => trackEvent("home_checklist_open", {
						item_count: checklistItems.length,
						surface: "home-hero"
					}),
					children: [
						t("Open full checklist"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "→"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { HomeChecklistCard };
