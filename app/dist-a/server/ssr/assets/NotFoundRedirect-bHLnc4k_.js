import { D as __toESM, x as require_react } from "../index.js";
//#region app/_components/site/NotFoundRedirect.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function NotFoundRedirect({ href }) {
	(0, import_react.useEffect)(() => {
		window.location.replace(href);
	}, [href]);
	return null;
}
//#endregion
export { NotFoundRedirect };
