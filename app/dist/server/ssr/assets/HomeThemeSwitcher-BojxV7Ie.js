import { n as require_jsx_runtime } from "../index.js";
import { n as useSiteTheme } from "./SiteThemeContext-fJpQHEU4.js";
//#region app/_components/home/HomeThemeSwitcher.tsx
var import_jsx_runtime = require_jsx_runtime();
function HomeThemeSwitcher({ ariaLabel, asmodianLabel, elyosLabel }) {
	const { theme, isThemeTransitioning, changeTheme } = useSiteTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "banner-theme-switch",
		role: "group",
		"aria-label": ariaLabel,
		"aria-busy": isThemeTransitioning,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-pressed": theme === "elyos",
			disabled: isThemeTransitioning,
			onClick: (event) => changeTheme("elyos", event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }),
				" ",
				elyosLabel
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-pressed": theme === "asmodian",
			disabled: isThemeTransitioning,
			onClick: (event) => changeTheme("asmodian", event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }),
				" ",
				asmodianLabel
			]
		})]
	});
}
//#endregion
export { HomeThemeSwitcher };
