import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-CU8j443B.js";
import { t as ShieldCheck } from "./shield-check-DpcKBlNS.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import Link from "./link-DDly4PBZ.js";
import { t as LoaderCircle } from "./loader-circle-Cq-I1Ywl.js";
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LockKeyhole = createLucideIcon("lock-keyhole", [
	["circle", {
		cx: "12",
		cy: "16",
		r: "1",
		key: "1au0dj"
	}],
	["rect", {
		x: "3",
		y: "10",
		width: "18",
		height: "12",
		rx: "2",
		key: "6s8ecr"
	}],
	["path", {
		d: "M7 10V7a5 5 0 0 1 10 0v3",
		key: "1pqi11"
	}]
]);
//#endregion
//#region app/admin/login/AdminEmailLogin.module.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var AdminEmailLogin_module_default = {
	page: "_page_apnez_1",
	ambient: "_ambient_apnez_16",
	loginShell: "_loginShell_apnez_28",
	brandHeader: "_brandHeader_apnez_38",
	brand: "_brand_apnez_38",
	privateBadge: "_privateBadge_apnez_62",
	content: "_content_apnez_75",
	securityMark: "_securityMark_apnez_76",
	eyebrow: "_eyebrow_apnez_88",
	lead: "_lead_apnez_102",
	verificationField: "_verificationField_apnez_104",
	primaryButton: "_primaryButton_apnez_122",
	waitingActions: "_waitingActions_apnez_142",
	callbackProgress: "_callbackProgress_apnez_170",
	statusMessage: "_statusMessage_apnez_184",
	infoStatus: "_infoStatus_apnez_196",
	successStatus: "_successStatus_apnez_197",
	errorStatus: "_errorStatus_apnez_198",
	spin: "_spin_apnez_213"
};
//#endregion
//#region app/admin/login/AdminEmailLogin.tsx
var import_jsx_runtime = require_jsx_runtime();
function AdminEmailLogin() {
	const [state, setState] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)(null);
	const [password, setPassword] = (0, import_react.useState)("");
	const submitPassword = async (event) => {
		event.preventDefault();
		if (state === "loading" || !password) return;
		setState("loading");
		setMessage(null);
		trackEvent("admin_password_login_attempt", {
			audience: "admin",
			surface: "admin_login"
		});
		try {
			const response = await fetch("/api/admin/auth/password/login", {
				method: "POST",
				credentials: "same-origin",
				cache: "no-store",
				headers: {
					accept: "application/json",
					"content-type": "application/json"
				},
				body: JSON.stringify({ password })
			});
			if (response.status === 429) {
				setState("error");
				setMessage("请求次数过多，请稍后再试。");
				trackEvent("admin_password_login_result", {
					audience: "admin",
					result: "rate_limited",
					surface: "admin_login"
				});
				return;
			}
			if (response.status === 401) {
				setState("error");
				setMessage("密码错误，请重试。");
				setPassword("");
				trackEvent("admin_password_login_result", {
					audience: "admin",
					result: "invalid_password",
					surface: "admin_login"
				});
				return;
			}
			if (!response.ok) {
				setState("error");
				setMessage("登录服务暂时无法使用，请稍后重试。");
				trackEvent("admin_password_login_result", {
					audience: "admin",
					result: "error",
					surface: "admin_login"
				});
				return;
			}
			setState("success");
			setMessage("登录成功，正在进入管理后台……");
			trackEvent("admin_password_login_result", {
				audience: "admin",
				result: "success",
				surface: "admin_login"
			});
			window.location.replace("/admin/");
		} catch {
			setState("error");
			setMessage("网络连接失败，请检查网络后重试。");
			trackEvent("admin_password_login_result", {
				audience: "admin",
				result: "network_error",
				surface: "admin_login"
			});
		}
	};
	const statusClassName = state === "error" ? AdminEmailLogin_module_default.errorStatus : state === "success" ? AdminEmailLogin_module_default.successStatus : AdminEmailLogin_module_default.infoStatus;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: AdminEmailLogin_module_default.page,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: AdminEmailLogin_module_default.ambient,
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: AdminEmailLogin_module_default.loginShell,
			"aria-labelledby": "admin-login-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: AdminEmailLogin_module_default.brandHeader,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: AdminEmailLogin_module_default.brand,
						href: "/zh-hant/",
						"aria-label": "返回 AION2 KINA 首页",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/aion2-logo.webp",
							width: 287,
							height: 213,
							alt: ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "AION2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "KINA ADMIN" })] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: AdminEmailLogin_module_default.privateBadge,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 14 }), " PRIVATE"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: AdminEmailLogin_module_default.content,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: AdminEmailLogin_module_default.securityMark,
							"aria-hidden": "true",
							children: state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: AdminEmailLogin_module_default.spin,
								size: 28
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 28 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: AdminEmailLogin_module_default.eyebrow,
							children: "ADMIN ACCESS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							id: "admin-login-title",
							children: "管理员安全登录"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: AdminEmailLogin_module_default.lead,
							children: "请输入管理员密码以进入后台。此页面与管理后台均不向搜索引擎开放。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submitPassword,
							className: AdminEmailLogin_module_default.verificationField,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {
								size: 18,
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { flex: 1 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "管理员密码" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "输入密码",
									disabled: state === "loading",
									autoFocus: true,
									autoComplete: "current-password",
									style: {
										width: "100%",
										marginTop: 6,
										padding: "10px 12px",
										background: "rgba(10, 20, 30, 0.8)",
										border: "1px solid #2a3b49",
										borderRadius: 8,
										color: "#eef7ff",
										fontSize: 14,
										outline: "none"
									}
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: AdminEmailLogin_module_default.primaryButton,
							disabled: state === "loading" || !password,
							onClick: submitPassword,
							type: "button",
							style: { marginTop: 16 },
							children: [state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: AdminEmailLogin_module_default.spin,
								size: 18
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 18 }), state === "loading" ? "正在验证……" : "登录"]
						}),
						message ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `${AdminEmailLogin_module_default.statusMessage} ${statusClassName}`,
							role: state === "error" ? "alert" : "status",
							children: [state === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }) : null, message]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "登录页与管理后台均不向搜索引擎开放，验证凭据不会写入分析数据。" })] })
			]
		})]
	});
}
//#endregion
export { AdminEmailLogin };
