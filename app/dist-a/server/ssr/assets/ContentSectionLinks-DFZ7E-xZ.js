import { n as require_jsx_runtime } from "../index.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import { t as ContentDetail_module_default } from "./ContentDetail.module-UYFzSqlg.js";
//#region app/_components/content/ContentSectionLinks.tsx
var import_jsx_runtime = require_jsx_runtime();
function ContentSectionLinks({ links, locale, section, service, slug }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ContentDetail_module_default.sectionLinks,
		children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: link.href,
			onClick: () => {
				trackEvent("guide_to_map_click", {
					content_slug: slug,
					filter_type: link.filterSubtype,
					locale,
					map_name: link.mapSlug,
					section,
					service,
					entry_source: "content-detail-rift-map",
					surface: "content-detail",
					target_key: link.mapSlug,
					target_kind: "map"
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: link.label }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: link.description }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
					"aria-hidden": "true",
					children: "→"
				})
			]
		}, link.id))
	});
}
//#endregion
export { ContentSectionLinks };
