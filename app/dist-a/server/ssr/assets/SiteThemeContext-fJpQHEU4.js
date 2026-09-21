import { D as __toESM, x as require_react } from "../index.js";
//#region app/_components/site/SiteThemeContext.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var SiteThemeContext = (0, import_react.createContext)(null);
function useSiteTheme() {
	const context = (0, import_react.useContext)(SiteThemeContext);
	if (!context) throw new Error("useSiteTheme must be used inside SiteShell");
	return context;
}
//#endregion
export { useSiteTheme as n, SiteThemeContext as t };
