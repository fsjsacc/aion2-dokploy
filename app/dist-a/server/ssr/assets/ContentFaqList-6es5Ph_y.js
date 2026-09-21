import { n as require_jsx_runtime } from "../index.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import { t as ContentDetail_module_default } from "./ContentDetail.module-UYFzSqlg.js";
//#region app/_components/content/ContentFaqList.tsx
var import_jsx_runtime = require_jsx_runtime();
function ContentFaqList({ items, locale, section, service, slug }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ContentDetail_module_default.faqList,
		children: items.map((item, faqIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: ContentDetail_module_default.faqItem,
			onToggle: (event) => {
				trackEvent("content_faq_toggle", {
					content_slug: slug,
					faq_index: faqIndex + 1,
					faq_state: event.currentTarget.open ? "open" : "closed",
					locale,
					section,
					service,
					surface: "content-detail",
					target_key: `${section}/${slug}`,
					target_kind: "content"
				});
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: item.question }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.answer })]
		}, `${item.question}-${faqIndex}`))
	});
}
//#endregion
export { ContentFaqList };
