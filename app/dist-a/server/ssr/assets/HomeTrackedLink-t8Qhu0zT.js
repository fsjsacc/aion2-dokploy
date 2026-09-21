import { n as require_jsx_runtime } from "../index.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
//#region app/_components/home/HomeTrackedLink.tsx
var import_jsx_runtime = require_jsx_runtime();
function HomeTrackedLink({ children, eventName, eventParams, ...anchorProps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		...anchorProps,
		onClick: () => trackEvent(eventName, eventParams),
		children
	});
}
//#endregion
export { HomeTrackedLink };
