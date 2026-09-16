import { E as __toESM, T as __exportAll, n as require_jsx_runtime, x as require_react } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-CU8j443B.js";
import { t as X } from "./x-Cgr92E5e.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import { t as CircleCheck } from "./circle-check-uPFpNdHM.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageSquareWarning = createLucideIcon("message-square-warning", [
	["path", {
		d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
		key: "18887p"
	}],
	["path", {
		d: "M12 15h.01",
		key: "q59x07"
	}],
	["path", {
		d: "M12 7v4",
		key: "xawao1"
	}]
]);
//#endregion
//#region app/_components/trust/ProvenancePanel.module.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var ProvenancePanel_module_default = {
	panel: "_panel_u34j1_1",
	panelHeader: "_panelHeader_u34j1_11",
	panelTitle: "_panelTitle_u34j1_27",
	panelIcon: "_panelIcon_u34j1_33",
	provenanceGrid: "_provenanceGrid_u34j1_62",
	statusBadge: "_statusBadge_u34j1_95",
	provenanceNote: "_provenanceNote_u34j1_115",
	sourceSection: "_sourceSection_u34j1_127",
	sourceHeading: "_sourceHeading_u34j1_133",
	noSource: "_noSource_u34j1_175",
	panelFooter: "_panelFooter_u34j1_177",
	reportTrigger: "_reportTrigger_u34j1_182",
	dialogClose: "_dialogClose_u34j1_200",
	field: "_field_u34j1_201",
	formActions: "_formActions_u34j1_204",
	successState: "_successState_u34j1_205",
	feedbackDialog: "_feedbackDialog_u34j1_210",
	dialogPanel: "_dialogPanel_u34j1_228",
	dialogHeader: "_dialogHeader_u34j1_235",
	reportContext: "_reportContext_u34j1_277",
	honeypot: "_honeypot_u34j1_310",
	formError: "_formError_u34j1_319"
};
//#endregion
//#region app/_components/trust/FeedbackReportDialog.tsx
var FeedbackReportDialog_exports = /* @__PURE__ */ __exportAll({
	FeedbackReportDialog: () => FeedbackReportDialog,
	default: () => FeedbackReportDialog
});
var import_jsx_runtime = require_jsx_runtime();
var feedbackCopy = {
	"zh-hans": {
		trigger: "报告过期信息／提交更正",
		title: "报告资料问题",
		description: "告诉我们哪些内容已经过期、缺失或需要更正；当前页面会自动附在报告中。",
		context: "本次报告",
		category: "问题类型",
		categories: {
			outdated: "资料已过期",
			incorrect: "内容不正确",
			missing: "缺少重要资料",
			translation: "翻译问题",
			"broken-link": "来源链接无法打开",
			other: "其他"
		},
		message: "问题说明",
		messagePlaceholder: "例如：这项数值已在最近一次更新后发生变化……",
		evidence: "证据链接（选填）",
		evidencePlaceholder: "官方公告、游戏截图或其他可核实页面",
		contact: "联系方式（选填）",
		contactPlaceholder: "Email、Discord 或其他方便联系的方式",
		privacy: "联系方式仅用于核实本次报告，不会显示在公开页面。",
		submit: "提交报告",
		submitting: "正在提交……",
		cancel: "取消",
		close: "关闭",
		successTitle: "已收到，谢谢。",
		successBody: "我们会先核对来源再更新页面；未经证实的信息不会直接作为事实发布。",
		failure: "暂时无法提交，请稍后重试。已填写的内容仍保留在表单中。",
		tooLarge: "报告内容过长，请缩短说明、证据链接或联系方式后重试。"
	},
	"zh-hant": {
		trigger: "回報過期／提交更正",
		title: "回報資料問題",
		description: "告訴我們哪裡已過期、缺少內容或需要更正；目前頁面會自動附在回報中。",
		context: "本次回報",
		category: "問題類型",
		categories: {
			outdated: "資料已過期",
			incorrect: "內容不正確",
			missing: "缺少重要資料",
			translation: "翻譯問題",
			"broken-link": "來源連結無法開啟",
			other: "其他"
		},
		message: "問題說明",
		messagePlaceholder: "例如：這項數值已在最近一次更新後改變……",
		evidence: "證據連結（選填）",
		evidencePlaceholder: "官方公告、遊戲截圖或可核對的頁面",
		contact: "聯絡方式（選填）",
		contactPlaceholder: "Email、Discord 或其他方便聯絡的方式",
		privacy: "聯絡方式只供核對這次回報，不會顯示在公開頁面。",
		submit: "送出回報",
		submitting: "正在送出……",
		cancel: "取消",
		close: "關閉",
		successTitle: "已收到，謝謝你。",
		successBody: "我們會先核對來源，再更新頁面；不會把尚未證實的內容直接公開。",
		failure: "暫時無法送出，請稍後再試。你填寫的內容仍保留在表單中。",
		tooLarge: "回報內容太長，請縮短說明、證據連結或聯絡方式後再送出。"
	},
	en: {
		trigger: "Report outdated info / submit a correction",
		title: "Report a data issue",
		description: "Tell us what is outdated, missing, or incorrect. The current page is attached automatically.",
		context: "This report",
		category: "Issue type",
		categories: {
			outdated: "Outdated information",
			incorrect: "Incorrect information",
			missing: "Important information is missing",
			translation: "Translation issue",
			"broken-link": "Broken source link",
			other: "Other"
		},
		message: "What needs attention?",
		messagePlaceholder: "For example: this value changed after the latest update…",
		evidence: "Evidence link (optional)",
		evidencePlaceholder: "Official notice, screenshot, or another verifiable page",
		contact: "Contact (optional)",
		contactPlaceholder: "Email, Discord, or another way to reach you",
		privacy: "Contact details are used only to verify this report and are never shown publicly.",
		submit: "Send report",
		submitting: "Sending…",
		cancel: "Cancel",
		close: "Close",
		successTitle: "Received — thank you.",
		successBody: "We will check the source before updating the page. Unverified information is not published as fact.",
		failure: "The report could not be sent right now. Please try again; your form entries have been kept.",
		tooLarge: "This report is too long. Shorten the message, evidence link, or contact details and try again."
	},
	fr: {
		trigger: "Signaler une information obsolète / proposer une correction",
		title: "Signaler un problème de données",
		description: "Indiquez-nous ce qui est obsolète, manquant ou incorrect. La page actuelle sera jointe automatiquement.",
		context: "Ce signalement",
		category: "Type de problème",
		categories: {
			outdated: "Information obsolète",
			incorrect: "Information incorrecte",
			missing: "Information importante manquante",
			translation: "Problème de traduction",
			"broken-link": "Lien source inaccessible",
			other: "Autre"
		},
		message: "Que faut-il corriger ?",
		messagePlaceholder: "Par exemple : cette valeur a changé après la dernière mise à jour…",
		evidence: "Lien justificatif (facultatif)",
		evidencePlaceholder: "Annonce officielle, capture d’écran ou autre page vérifiable",
		contact: "Coordonnées (facultatif)",
		contactPlaceholder: "E-mail, Discord ou autre moyen de vous contacter",
		privacy: "Vos coordonnées servent uniquement à vérifier ce signalement et ne sont jamais affichées publiquement.",
		submit: "Envoyer le signalement",
		submitting: "Envoi en cours…",
		cancel: "Annuler",
		close: "Fermer",
		successTitle: "Signalement reçu, merci.",
		successBody: "Nous vérifierons la source avant de mettre la page à jour. Une information non vérifiée n’est pas publiée comme un fait.",
		failure: "Impossible d’envoyer le signalement pour le moment. Réessayez plus tard ; les informations saisies ont été conservées.",
		tooLarge: "Ce signalement est trop long. Raccourcissez le message, le lien justificatif ou les coordonnées, puis réessayez."
	},
	de: {
		trigger: "Veraltete Information melden / Korrektur einreichen",
		title: "Datenproblem melden",
		description: "Teile uns mit, was veraltet, unvollständig oder falsch ist. Die aktuelle Seite wird automatisch angehängt.",
		context: "Diese Meldung",
		category: "Art des Problems",
		categories: {
			outdated: "Veraltete Information",
			incorrect: "Falsche Information",
			missing: "Wichtige Information fehlt",
			translation: "Übersetzungsfehler",
			"broken-link": "Defekter Quellenlink",
			other: "Sonstiges"
		},
		message: "Was muss korrigiert werden?",
		messagePlaceholder: "Beispiel: Dieser Wert wurde mit dem letzten Update geändert…",
		evidence: "Beleglink (optional)",
		evidencePlaceholder: "Offizielle Mitteilung, Screenshot oder eine andere überprüfbare Seite",
		contact: "Kontakt (optional)",
		contactPlaceholder: "E-Mail, Discord oder eine andere Kontaktmöglichkeit",
		privacy: "Kontaktdaten werden nur zur Prüfung dieser Meldung verwendet und niemals öffentlich angezeigt.",
		submit: "Meldung senden",
		submitting: "Wird gesendet…",
		cancel: "Abbrechen",
		close: "Schließen",
		successTitle: "Meldung erhalten, vielen Dank.",
		successBody: "Wir prüfen die Quelle, bevor wir die Seite aktualisieren. Unbestätigte Informationen werden nicht als Tatsachen veröffentlicht.",
		failure: "Die Meldung konnte gerade nicht gesendet werden. Versuche es später erneut; deine Eingaben bleiben erhalten.",
		tooLarge: "Diese Meldung ist zu lang. Kürze die Beschreibung, den Beleglink oder die Kontaktdaten und versuche es erneut."
	},
	es: {
		trigger: "Informar de datos obsoletos / enviar una corrección",
		title: "Informar de un problema con los datos",
		description: "Cuéntanos qué información está obsoleta, incompleta o es incorrecta. La página actual se adjuntará automáticamente.",
		context: "Este informe",
		category: "Tipo de problema",
		categories: {
			outdated: "Información obsoleta",
			incorrect: "Información incorrecta",
			missing: "Falta información importante",
			translation: "Problema de traducción",
			"broken-link": "Enlace de la fuente roto",
			other: "Otro"
		},
		message: "¿Qué debemos corregir?",
		messagePlaceholder: "Por ejemplo: este valor cambió después de la última actualización…",
		evidence: "Enlace de prueba (opcional)",
		evidencePlaceholder: "Aviso oficial, captura del juego u otra página verificable",
		contact: "Contacto (opcional)",
		contactPlaceholder: "Correo electrónico, Discord u otra forma de contacto",
		privacy: "Los datos de contacto se usan únicamente para verificar este informe y nunca se muestran públicamente.",
		submit: "Enviar informe",
		submitting: "Enviando…",
		cancel: "Cancelar",
		close: "Cerrar",
		successTitle: "Informe recibido. Gracias.",
		successBody: "Comprobaremos la fuente antes de actualizar la página. La información sin verificar no se publica como un hecho.",
		failure: "No se ha podido enviar el informe ahora. Inténtalo de nuevo más tarde; los datos introducidos se han conservado.",
		tooLarge: "El informe es demasiado largo. Acorta el mensaje, el enlace de prueba o los datos de contacto y vuelve a intentarlo."
	},
	ja: {
		trigger: "古い情報を報告／修正を送信",
		title: "データの問題を報告",
		description: "古い情報、不足している情報、誤っている情報をお知らせください。現在のページは自動的に添付されます。",
		context: "今回の報告",
		category: "問題の種類",
		categories: {
			outdated: "情報が古い",
			incorrect: "情報が正しくない",
			missing: "重要な情報が不足している",
			translation: "翻訳の問題",
			"broken-link": "出典リンクが開かない",
			other: "その他"
		},
		message: "修正が必要な内容",
		messagePlaceholder: "例：最新アップデート後にこの数値が変更されました…",
		evidence: "根拠となるリンク（任意）",
		evidencePlaceholder: "公式のお知らせ、ゲーム画面の画像、その他の確認可能なページ",
		contact: "連絡先（任意）",
		contactPlaceholder: "メール、Discord、その他の連絡方法",
		privacy: "連絡先はこの報告の確認にのみ使用し、公開ページには表示しません。",
		submit: "報告を送信",
		submitting: "送信中…",
		cancel: "キャンセル",
		close: "閉じる",
		successTitle: "報告を受け付けました。ありがとうございます。",
		successBody: "出典を確認してからページを更新します。未確認の情報を事実として掲載することはありません。",
		failure: "現在、報告を送信できません。しばらくしてからもう一度お試しください。入力内容は保持されています。",
		tooLarge: "報告内容が長すぎます。説明、根拠リンク、または連絡先を短くして、もう一度送信してください。"
	},
	"pt-br": {
		trigger: "Informar conteúdo desatualizado / enviar correção",
		title: "Informar um problema nos dados",
		description: "Conte o que está desatualizado, ausente ou incorreto. A página atual será anexada automaticamente.",
		context: "Este relato",
		category: "Tipo de problema",
		categories: {
			outdated: "Informação desatualizada",
			incorrect: "Informação incorreta",
			missing: "Falta uma informação importante",
			translation: "Problema de tradução",
			"broken-link": "Link da fonte indisponível",
			other: "Outro"
		},
		message: "O que precisa ser corrigido?",
		messagePlaceholder: "Por exemplo: este valor mudou após a atualização mais recente…",
		evidence: "Link de comprovação (opcional)",
		evidencePlaceholder: "Comunicado oficial, captura do jogo ou outra página verificável",
		contact: "Contato (opcional)",
		contactPlaceholder: "E-mail, Discord ou outra forma de contato",
		privacy: "Os dados de contato são usados apenas para verificar este relato e nunca são exibidos publicamente.",
		submit: "Enviar relato",
		submitting: "Enviando…",
		cancel: "Cancelar",
		close: "Fechar",
		successTitle: "Relato recebido. Obrigado.",
		successBody: "Vamos verificar a fonte antes de atualizar a página. Informações não verificadas não são publicadas como fatos.",
		failure: "Não foi possível enviar o relato agora. Tente novamente mais tarde; os dados preenchidos foram mantidos.",
		tooLarge: "Este relato é muito longo. Encurte a mensagem, o link de comprovação ou os dados de contato e tente novamente."
	},
	ru: {
		trigger: "Сообщить об устаревшей информации",
		title: "Сообщить о проблеме с данными",
		description: "Укажите, какая информация устарела, отсутствует или требует исправления. Текущая страница будет приложена автоматически.",
		context: "Текущий отчёт",
		category: "Тип проблемы",
		categories: {
			outdated: "Устаревшая информация",
			incorrect: "Неверная информация",
			missing: "Отсутствуют важные данные",
			translation: "Ошибка перевода",
			"broken-link": "Неработающая ссылка на источник",
			other: "Другое"
		},
		message: "Что нужно исправить?",
		messagePlaceholder: "Например: значение изменилось после последнего обновления…",
		evidence: "Ссылка на подтверждение (необязательно)",
		evidencePlaceholder: "Официальное объявление, снимок игры или другая проверяемая страница",
		contact: "Контактные данные (необязательно)",
		contactPlaceholder: "Email, Discord или другой способ связи",
		privacy: "Контактные данные используются только для проверки отчёта и не публикуются.",
		submit: "Отправить отчёт",
		submitting: "Отправка…",
		cancel: "Отмена",
		close: "Закрыть",
		successTitle: "Получено, спасибо.",
		successBody: "Перед обновлением страницы мы проверим источник. Неподтверждённые сведения не публикуются как факт.",
		failure: "Сейчас отправить отчёт не удалось. Повторите попытку позже; введённые данные сохранены.",
		tooLarge: "Отчёт слишком длинный. Сократите описание, ссылку или контактные данные и повторите попытку."
	},
	ko: {
		trigger: "오래된 정보 신고 / 수정 제보",
		title: "데이터 문제 신고",
		description: "오래되었거나 누락되었거나 잘못된 내용을 알려 주세요. 현재 페이지는 자동으로 첨부됩니다.",
		context: "신고 대상",
		category: "문제 유형",
		categories: {
			outdated: "오래된 정보",
			incorrect: "잘못된 정보",
			missing: "중요한 정보 누락",
			translation: "번역 문제",
			"broken-link": "출처 링크 오류",
			other: "기타"
		},
		message: "문제 설명",
		messagePlaceholder: "예: 최근 업데이트 이후 이 수치가 변경되었습니다…",
		evidence: "근거 링크 (선택)",
		evidencePlaceholder: "공식 공지, 게임 스크린샷 또는 확인 가능한 페이지",
		contact: "연락처 (선택)",
		contactPlaceholder: "이메일, Discord 또는 연락 가능한 방법",
		privacy: "연락처는 이 신고를 확인할 때만 사용되며 공개 페이지에 표시되지 않습니다.",
		submit: "신고 보내기",
		submitting: "보내는 중…",
		cancel: "취소",
		close: "닫기",
		successTitle: "접수했습니다. 감사합니다.",
		successBody: "출처를 먼저 확인한 뒤 페이지를 수정합니다. 확인되지 않은 내용은 사실로 공개하지 않습니다.",
		failure: "지금은 신고를 보낼 수 없습니다. 잠시 후 다시 시도해 주세요. 입력한 내용은 유지됩니다.",
		tooLarge: "신고 내용이 너무 깁니다. 설명, 근거 링크 또는 연락처를 줄인 뒤 다시 보내 주세요."
	}
};
var MAX_REQUEST_BYTES = 8192;
var REQUEST_TIMEOUT_MS = 15e3;
function FeedbackReportDialog({ locale, service, targetKey, targetKind, targetLabel, triggerLabel, version }) {
	const copy = feedbackCopy[locale];
	const dialogRef = (0, import_react.useRef)(null);
	const triggerRef = (0, import_react.useRef)(null);
	const formRef = (0, import_react.useRef)(null);
	const requestControllerRef = (0, import_react.useRef)(null);
	const [state, setState] = (0, import_react.useState)("idle");
	const titleId = (0, import_react.useId)();
	const descriptionId = (0, import_react.useId)();
	(0, import_react.useEffect)(() => () => {
		requestControllerRef.current?.abort();
		requestControllerRef.current = null;
		if (dialogRef.current?.open) dialogRef.current.close();
	}, []);
	function openDialog() {
		const dialog = dialogRef.current;
		if (!dialog || dialog.open) return;
		setState("idle");
		dialog.showModal();
		trackEvent("report_outdated_start", {
			locale,
			service,
			target_key: targetKey,
			target_kind: targetKind,
			version: version ?? null
		});
	}
	function closeDialog() {
		const activeRequest = requestControllerRef.current;
		requestControllerRef.current = null;
		activeRequest?.abort();
		const dialog = dialogRef.current;
		if (dialog?.open) dialog.close();
		setState("idle");
		triggerRef.current?.focus();
	}
	function handleBackdropClick(event) {
		if (event.target === event.currentTarget) closeDialog();
	}
	async function submitReport(event) {
		event.preventDefault();
		if (state === "submitting") return;
		const form = event.currentTarget;
		const formData = new FormData(form);
		const category = String(formData.get("category") ?? "other");
		const payload = {
			targetKind,
			targetKey,
			locale,
			service,
			version: version ?? "",
			category,
			message: String(formData.get("message") ?? "").trim(),
			evidenceUrl: String(formData.get("evidenceUrl") ?? "").trim(),
			contact: String(formData.get("contact") ?? "").trim(),
			website: String(formData.get("website") ?? "")
		};
		const body = JSON.stringify(payload);
		if (new TextEncoder().encode(body).byteLength > MAX_REQUEST_BYTES) {
			setState("too-large");
			return;
		}
		const controller = new AbortController();
		requestControllerRef.current?.abort();
		requestControllerRef.current = controller;
		const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
		setState("submitting");
		try {
			if (!(await fetch("/api/reports", {
				method: "POST",
				headers: {
					accept: "application/json",
					"content-type": "application/json"
				},
				body,
				signal: controller.signal
			})).ok) throw new Error("Feedback report rejected");
			if (requestControllerRef.current !== controller) return;
			form.reset();
			setState("success");
			trackEvent("report_outdated_submit", {
				category,
				locale,
				service,
				target_key: targetKey,
				target_kind: targetKind,
				version: version ?? null
			});
		} catch {
			if (requestControllerRef.current === controller) setState("error");
		} finally {
			window.clearTimeout(timeout);
			if (requestControllerRef.current === controller) requestControllerRef.current = null;
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: ProvenancePanel_module_default.reportTrigger,
		onClick: openDialog,
		ref: triggerRef,
		type: "button",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareWarning, {
			"aria-hidden": "true",
			size: 17
		}), triggerLabel ?? copy.trigger]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dialog", {
		"aria-describedby": descriptionId,
		"aria-labelledby": titleId,
		className: ProvenancePanel_module_default.feedbackDialog,
		onCancel: (event) => {
			event.preventDefault();
			closeDialog();
		},
		onClick: handleBackdropClick,
		ref: dialogRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: ProvenancePanel_module_default.dialogPanel,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: ProvenancePanel_module_default.dialogHeader,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.context }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: titleId,
						children: copy.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						id: descriptionId,
						children: copy.description
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": copy.close,
					className: ProvenancePanel_module_default.dialogClose,
					onClick: closeDialog,
					type: "button",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						"aria-hidden": "true",
						size: 20
					})
				})]
			}), state === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ProvenancePanel_module_default.successState,
				role: "status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						"aria-hidden": "true",
						size: 32
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: copy.successTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.successBody })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: closeDialog,
						type: "button",
						children: copy.close
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"aria-busy": state === "submitting",
				onSubmit: submitReport,
				ref: formRef,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: ProvenancePanel_module_default.reportContext,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.context }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: targetLabel })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: ProvenancePanel_module_default.field,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.category }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							defaultValue: "outdated",
							name: "category",
							children: Object.entries(copy.categories).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value,
								children: label
							}, value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: ProvenancePanel_module_default.field,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.message }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							maxLength: 2e3,
							minLength: 10,
							name: "message",
							placeholder: copy.messagePlaceholder,
							required: true,
							rows: 5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: ProvenancePanel_module_default.field,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.evidence }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "url",
							maxLength: 500,
							name: "evidenceUrl",
							pattern: "https://.*",
							placeholder: copy.evidencePlaceholder,
							type: "url"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: ProvenancePanel_module_default.field,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.contact }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								autoComplete: "email",
								maxLength: 200,
								name: "contact",
								placeholder: copy.contactPlaceholder,
								type: "text"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: copy.privacy })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: ProvenancePanel_module_default.honeypot,
						"aria-hidden": "true",
						children: ["Website", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoComplete: "off",
							name: "website",
							tabIndex: -1,
							type: "text"
						})]
					}),
					state === "error" || state === "too-large" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: ProvenancePanel_module_default.formError,
						role: "alert",
						children: state === "too-large" ? copy.tooLarge : copy.failure
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: ProvenancePanel_module_default.formActions,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: closeDialog,
							type: "button",
							children: copy.cancel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: state === "submitting",
							type: "submit",
							children: state === "submitting" ? copy.submitting : copy.submit
						})]
					})
				]
			})]
		})
	})] });
}
//#endregion
export { FeedbackReportDialog_exports as n, ProvenancePanel_module_default as r, FeedbackReportDialog as t };
