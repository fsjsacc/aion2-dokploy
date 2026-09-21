import { n as require_jsx_runtime } from "../index.js";
import { s as resolveContentLocale } from "./site-config-EbYJfejA.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import { t as ContentDetail_module_default } from "./ContentDetail.module-UYFzSqlg.js";
//#region app/_components/content/ContentPrimaryAction.tsx
var import_jsx_runtime = require_jsx_runtime();
function ContentPrimaryAction({ action, locale, section, service, slug }) {
	const copy = action.translations[locale] ?? action.translations[resolveContentLocale(locale)] ?? action.translations.en;
	const href = action.hrefs?.[locale] ?? action.href;
	const headingId = `content-action-${action.id}`;
	const destinationHost = new URL(href).hostname;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: ContentDetail_module_default.primaryAction,
		"aria-labelledby": headingId,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: ContentDetail_module_default.primaryActionEyebrow,
				children: copy.eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: headingId,
				children: copy.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: ContentDetail_module_default.primaryActionDescription,
				children: copy.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: ContentDetail_module_default.primaryActionFacts,
				children: copy.facts.map((fact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: fact.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fact.value })] }, `${fact.label}-${fact.value}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ContentDetail_module_default.primaryActionFooter,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: ContentDetail_module_default.primaryActionLink,
					href,
					onClick: () => {
						trackEvent("content_primary_action_click", {
							action_id: action.id,
							content_slug: slug,
							destination_host: destinationHost,
							locale,
							section,
							service,
							surface: "content-detail",
							target_key: `${section}/${slug}`,
							target_kind: "content"
						});
					},
					rel: "noopener noreferrer external",
					target: "_blank",
					children: [copy.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "↗"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.note })]
			})
		]
	});
}
//#endregion
export { ContentPrimaryAction };
