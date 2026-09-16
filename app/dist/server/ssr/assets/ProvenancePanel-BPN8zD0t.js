import { n as require_jsx_runtime } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-CQDoC5ep.js";
import { t as ShieldCheck } from "./shield-check-6cClLcCv.js";
import { c as resolveLocalizedCopy, d as siteLocaleConfig } from "./site-config-EbYJfejA.js";
import { n as ExternalLink, t as Clock3 } from "./clock-3-DQ3nA-Ix.js";
import { t as AnalyticsLink } from "./AnalyticsLink-CONQM7-6.js";
import { r as ProvenancePanel_module_default, t as FeedbackReportDialog } from "./FeedbackReportDialog-B2O3C-_-.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Database = createLucideIcon("database", [
	["ellipse", {
		cx: "12",
		cy: "5",
		rx: "9",
		ry: "3",
		key: "msslwz"
	}],
	["path", {
		d: "M3 5V19A9 3 0 0 0 21 19V5",
		key: "1wlel7"
	}],
	["path", {
		d: "M3 12A9 3 0 0 0 21 12",
		key: "mv7ke4"
	}]
]);
//#endregion
//#region app/_components/trust/ProvenancePanel.tsx
var import_jsx_runtime = require_jsx_runtime();
var provenanceCopy = {
	"zh-hans": {
		eyebrow: "数据来源",
		title: "适用范围与更新日期",
		description: "查看资料适用的游戏服务、最后核实日期与原始来源；实时数值和状态请以游戏内为准。",
		service: "适用服务／地区",
		verified: "最后核实",
		sources: "来源",
		kinds: {
			official: "官方来源",
			platform: "官方平台",
			"third-party": "第三方来源"
		}
	},
	"zh-hant": {
		eyebrow: "資料來源",
		title: "適用範圍與更新日期",
		description: "查看這項資料適用的遊戲服務、最後核對日期與原始來源；即時數值和狀態請以遊戲內為準。",
		service: "適用服務／地區",
		verified: "最後核對",
		sources: "來源",
		kinds: {
			official: "官方來源",
			platform: "官方平台",
			"third-party": "第三方來源"
		}
	},
	en: {
		eyebrow: "DATA SOURCES",
		title: "Scope and update date",
		description: "Check the applicable game service, last verification date, and original sources. Confirm live values and availability in game.",
		service: "Applicable service / region",
		verified: "Last verified",
		sources: "Sources",
		kinds: {
			official: "Official source",
			platform: "Official platform",
			"third-party": "Third-party source"
		}
	},
	fr: {
		eyebrow: "SOURCES DES DONNÉES",
		title: "Périmètre et date de mise à jour",
		description: "Consultez le service de jeu concerné, la date de la dernière vérification et les sources d’origine. Confirmez les valeurs en temps réel dans le jeu.",
		service: "Service / région concernés",
		verified: "Dernière vérification",
		sources: "Sources",
		kinds: {
			official: "Source officielle",
			platform: "Plateforme officielle",
			"third-party": "Source tierce"
		}
	},
	de: {
		eyebrow: "DATENQUELLEN",
		title: "Geltungsbereich und Aktualisierungsdatum",
		description: "Prüfe den betroffenen Spielservice, das letzte Prüfdatum und die Originalquellen. Live-Werte und Verfügbarkeit bitte im Spiel bestätigen.",
		service: "Spielservice / Region",
		verified: "Zuletzt geprüft",
		sources: "Quellen",
		kinds: {
			official: "Offizielle Quelle",
			platform: "Offizielle Plattform",
			"third-party": "Drittanbieterquelle"
		}
	},
	es: {
		eyebrow: "FUENTES DE DATOS",
		title: "Ámbito y fecha de actualización",
		description: "Consulta el servicio de juego aplicable, la última fecha de verificación y las fuentes originales. Confirma los valores actuales dentro del juego.",
		service: "Servicio / región aplicable",
		verified: "Última verificación",
		sources: "Fuentes",
		kinds: {
			official: "Fuente oficial",
			platform: "Plataforma oficial",
			"third-party": "Fuente de terceros"
		}
	},
	ja: {
		eyebrow: "データ出典",
		title: "対象範囲と更新日",
		description: "対象のゲームサービス、最終確認日、原文の出典を確認できます。最新の数値や利用状況はゲーム内でも確認してください。",
		service: "対象サービス／地域",
		verified: "最終確認",
		sources: "出典",
		kinds: {
			official: "公式情報",
			platform: "公式プラットフォーム",
			"third-party": "第三者情報"
		}
	},
	"pt-br": {
		eyebrow: "FONTES DOS DADOS",
		title: "Escopo e data de atualização",
		description: "Confira o serviço de jogo aplicável, a última data de verificação e as fontes originais. Confirme valores e disponibilidade atuais no jogo.",
		service: "Serviço / região aplicável",
		verified: "Última verificação",
		sources: "Fontes",
		kinds: {
			official: "Fonte oficial",
			platform: "Plataforma oficial",
			"third-party": "Fonte de terceiros"
		}
	},
	ru: {
		eyebrow: "ИСТОЧНИКИ ДАННЫХ",
		title: "Область применения и дата обновления",
		description: "Проверьте применимый игровой сервис, дату последней проверки и исходные источники. Актуальные значения и доступность уточняйте в игре.",
		service: "Игровой сервис / регион",
		verified: "Последняя проверка",
		sources: "Источники",
		kinds: {
			official: "Официальный источник",
			platform: "Официальная платформа",
			"third-party": "Сторонний источник"
		}
	},
	ko: {
		eyebrow: "데이터 출처",
		title: "적용 범위와 업데이트 날짜",
		description: "적용 게임 서비스, 마지막 확인 날짜와 원문 출처를 확인하세요. 실시간 수치와 이용 가능 여부는 게임에서 다시 확인하세요.",
		service: "적용 서비스 / 지역",
		verified: "마지막 확인",
		sources: "출처",
		kinds: {
			official: "공식 출처",
			platform: "공식 플랫폼",
			"third-party": "서드파티 출처"
		}
	}
};
function validTimestamp(value) {
	if (!value) return null;
	const timestamp = Date.parse(value);
	return Number.isFinite(timestamp) ? timestamp : null;
}
function latestDate(values) {
	return values.reduce((latest, value) => {
		const timestamp = validTimestamp(value);
		if (timestamp === null) return latest;
		const latestTimestamp = validTimestamp(latest);
		return latestTimestamp === null || timestamp > latestTimestamp ? value ?? null : latest;
	}, null);
}
function formatDate(locale, value) {
	const timestamp = validTimestamp(value);
	if (timestamp === null) return null;
	return new Intl.DateTimeFormat(siteLocaleConfig[locale].htmlLang, {
		dateStyle: "medium",
		timeZone: "UTC"
	}).format(new Date(timestamp));
}
function sourceHost(url) {
	try {
		return new URL(url, "https://aion2kina.com").hostname;
	} catch {
		return "unknown";
	}
}
function ProvenancePanel({ locale, note, reportService = "unknown", service, sources = [], targetKey, targetKind, targetLabel, verifiedAt, version }) {
	const copy = resolveLocalizedCopy(provenanceCopy, locale);
	const lastVerified = verifiedAt ?? latestDate(sources.map((source) => source.verifiedAt));
	const formattedVerified = formatDate(locale, lastVerified);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: ProvenancePanel_module_default.panel,
		"aria-labelledby": `provenance-${targetKind}-${targetKey}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: ProvenancePanel_module_default.panelHeader,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: ProvenancePanel_module_default.panelTitle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: ProvenancePanel_module_default.panelIcon,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
							"aria-hidden": "true",
							size: 20
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: `provenance-${targetKind}-${targetKey}`,
						children: copy.title
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.description })]
			}),
			service || formattedVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: ProvenancePanel_module_default.provenanceGrid,
				children: [service ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: copy.service }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: service })] }) : null, formattedVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: copy.verified }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					dateTime: lastVerified ?? void 0,
					children: formattedVerified
				}) })] }) : null]
			}) : null,
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: ProvenancePanel_module_default.provenanceNote,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
					"aria-hidden": "true",
					size: 15
				}), note]
			}) : null,
			sources.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ProvenancePanel_module_default.sourceSection,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: ProvenancePanel_module_default.sourceHeading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
						"aria-hidden": "true",
						size: 16
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: copy.sources })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: sources.map((source) => {
					const sourceDate = formatDate(locale, source.publishedAt);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnalyticsLink, {
						eventName: "content_source_click",
						href: source.url,
						payload: {
							locale,
							link_location: "provenance",
							service: reportService,
							source_host: sourceHost(source.url),
							source_kind: source.kind ?? "unknown",
							surface: "content-detail",
							target_key: targetKey,
							target_kind: targetKind
						},
						rel: "noopener noreferrer",
						target: "_blank",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: source.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: [
							source.publisher,
							source.kind ? copy.kinds[source.kind] : null,
							sourceDate
						].filter(Boolean).join(" · ") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							"aria-hidden": "true",
							size: 15
						})]
					}) }, `${source.url}:${source.label}`);
				}) })]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: ProvenancePanel_module_default.panelFooter,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackReportDialog, {
					locale,
					service: reportService,
					targetKey,
					targetKind,
					targetLabel,
					version
				})
			})
		]
	});
}
//#endregion
export { ProvenancePanel, ProvenancePanel as default };
