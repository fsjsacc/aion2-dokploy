import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
//#region app/_components/analytics/DeferredAnalyticsConsentManager.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var LazyAnalyticsConsentManager = (0, import_react.lazy)(() => import("./AnalyticsConsentManager-ChDSac04.js").then((module) => ({ default: module.AnalyticsConsentManager })));
function DeferredAnalyticsConsentManager() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => setReady(true), 4e3);
		return () => window.clearTimeout(timer);
	}, []);
	if (!ready) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyAnalyticsConsentManager, {})
	});
}
//#endregion
export { DeferredAnalyticsConsentManager };
