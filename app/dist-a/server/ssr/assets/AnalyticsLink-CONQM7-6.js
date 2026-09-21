import { E as __exportAll, n as require_jsx_runtime } from "../index.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
//#region app/map-app/AnalyticsLink.tsx
var AnalyticsLink_exports = /* @__PURE__ */ __exportAll({ AnalyticsLink: () => AnalyticsLink });
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsLink({ eventName, payload = {}, onClick, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		...props,
		onClick: (event) => {
			trackEvent(eventName, payload);
			onClick?.(event);
		}
	});
}
//#endregion
export { AnalyticsLink_exports as n, AnalyticsLink as t };
