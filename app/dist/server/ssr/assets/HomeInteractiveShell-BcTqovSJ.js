import { D as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { d as siteLocaleConfig, f as siteLocales, r as getSectionHref } from "./site-config-EbYJfejA.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import { n as useSiteTheme } from "./SiteThemeContext-fJpQHEU4.js";
//#region app/_components/home/HomeInteractiveShell.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var LazyHomeChecklistCard = (0, import_react.lazy)(() => import("./HomeChecklistCard-CxxrHvw0.js").then((module) => ({ default: module.HomeChecklistCard })));
var THEME_FRAME_PROPERTIES = [
	"top",
	"left",
	"width",
	"height"
];
var FACTION_GATE_SESSION_KEY = "aion2-atlas-faction-gate-seen";
var TRANSPARENT_IMAGE_SOURCE = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
var heroSupportLinks = [
	["Browse Guides", "guides"],
	["Compare Classes", "classes"],
	["Open Player Tools", "tools"]
];
function isThemeFrameProperty(value) {
	return THEME_FRAME_PROPERTIES.includes(value);
}
function HomeChecklistPlaceholder({ checklistHref, checklistPreview, copy, onActivate }) {
	const t = (value) => copy[value] ?? value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "expedition-card hero-checklist-card",
		"aria-labelledby": "hero-checklist-title",
		"aria-busy": "true",
		onFocusCapture: onActivate,
		onPointerEnter: onActivate,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-topline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("MY CHECKLIST / THIS DEVICE") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["00 / ", String(checklistPreview.length).padStart(2, "0")] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "hero-checklist-title",
				children: t("My checklist")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "progress-track",
				role: "progressbar",
				"aria-label": t("Checklist progress"),
				"aria-valuemin": 0,
				"aria-valuemax": Math.max(checklistPreview.length, 1),
				"aria-valuenow": 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: "0%" } })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "checklist",
				children: checklistPreview.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "check-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "custom-check",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "check-row-copy",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: t(item.frequency === "daily" ? "Daily" : "Weekly") })]
					})]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "checklist-card-footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("Saved on this device. Daily and weekly cycles reset automatically.") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: checklistHref,
					onClick: () => trackEvent("home_checklist_open", {
						item_count: checklistPreview.length,
						surface: "home-hero-placeholder"
					}),
					children: [
						t("Open full checklist"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "→"
						})
					]
				})]
			})
		]
	});
}
function HomeInteractiveShell({ children, checklistPreview, copy, locale }) {
	const t = (value) => copy[value] ?? value;
	const { theme, changeTheme } = useSiteTheme();
	const itemDatabaseHref = `/${locale}/database/`;
	const mapHref = `/${locale}/tools/map/`;
	const checklistHref = `/${locale}/tools/daily-checklist/`;
	const [hasEntered, setHasEntered] = (0, import_react.useState)(false);
	const [checklistReady, setChecklistReady] = (0, import_react.useState)(false);
	const [enteringTheme, setEnteringTheme] = (0, import_react.useState)(null);
	const [preparingTheme, setPreparingTheme] = (0, import_react.useState)(null);
	const [isSettlingTheme, setIsSettlingTheme] = (0, import_react.useState)(false);
	const [themeFrameStyle, setThemeFrameStyle] = (0, import_react.useState)({});
	const gateRef = (0, import_react.useRef)(null);
	const heroRef = (0, import_react.useRef)(null);
	const pendingThemeFramePropertiesRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const completedThemeFramePropertiesRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const completeFactionGate = (0, import_react.useCallback)(() => {
		try {
			window.sessionStorage.setItem(FACTION_GATE_SESSION_KEY, "true");
		} catch {}
		document.documentElement.dataset.aion2FactionGateSeen = "true";
		setHasEntered(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hasEntered) return;
		if (document.documentElement.dataset.aion2ThemeSaved === "true" && document.documentElement.dataset.aion2FactionGateSeen === "true") {
			const restoredFrame = window.requestAnimationFrame(() => setHasEntered(true));
			return () => window.cancelAnimationFrame(restoredFrame);
		}
		const previousOverflow = document.body.style.overflow;
		const previouslyFocused = document.activeElement;
		const hero = heroRef.current;
		const gate = gateRef.current;
		const background = Array.from(document.querySelectorAll(".site-shell-skip-link, .site-shell-header, .site-shell-footer"));
		background.forEach((element) => {
			element.inert = true;
		});
		document.body.style.overflow = "hidden";
		const focusableControls = () => Array.from(gateRef.current?.querySelectorAll("a[href]:not([tabindex=\"-1\"]), button:not([disabled]), summary:not([tabindex=\"-1\"])") ?? []);
		const focusFrame = window.requestAnimationFrame(() => gateRef.current?.querySelector("[data-faction-entry=\"elyos\"]")?.focus());
		const handleKeyDown = (event) => {
			if (event.key !== "Tab") return;
			const controls = focusableControls();
			if (!controls.length) return;
			const first = controls[0];
			const last = controls[controls.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			window.cancelAnimationFrame(focusFrame);
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = previousOverflow;
			background.forEach((element) => {
				element.inert = false;
			});
			if (previouslyFocused?.isConnected && previouslyFocused !== document.body && !gate?.contains(previouslyFocused)) previouslyFocused.focus();
			else hero?.focus({ preventScroll: true });
		};
	}, [hasEntered]);
	(0, import_react.useEffect)(() => {
		if (!enteringTheme || isSettlingTheme || hasEntered) return;
		const fallback = window.setTimeout(() => setIsSettlingTheme(true), 600);
		return () => window.clearTimeout(fallback);
	}, [
		enteringTheme,
		hasEntered,
		isSettlingTheme
	]);
	(0, import_react.useEffect)(() => {
		if (!hasEntered || checklistReady) return;
		let idleHandle;
		let fallbackHandle;
		const activate = () => setChecklistReady(true);
		const schedule = () => {
			if ("requestIdleCallback" in window) idleHandle = window.requestIdleCallback(activate, { timeout: 6e3 });
			else fallbackHandle = globalThis.setTimeout(activate, 6e3);
		};
		if (document.readyState === "complete") schedule();
		else window.addEventListener("load", schedule, { once: true });
		return () => {
			window.removeEventListener("load", schedule);
			if (idleHandle !== void 0 && "cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
			if (fallbackHandle !== void 0) globalThis.clearTimeout(fallbackHandle);
		};
	}, [checklistReady, hasEntered]);
	(0, import_react.useEffect)(() => {
		if (!isSettlingTheme || hasEntered) return;
		const fallback = window.setTimeout(completeFactionGate, 450);
		return () => window.clearTimeout(fallback);
	}, [
		completeFactionGate,
		hasEntered,
		isSettlingTheme
	]);
	const enterTheme = (nextTheme) => {
		if (enteringTheme || preparingTheme) {
			if (enteringTheme && !isSettlingTheme && !hasEntered) completeFactionGate();
			return;
		}
		const beginTransition = () => {
			const heroRect = heroRef.current?.querySelector(".hero-backdrops")?.getBoundingClientRect() ?? heroRef.current?.getBoundingClientRect();
			const gateArtRect = gateRef.current?.querySelector(`.race-gate-art--${nextTheme}`)?.getBoundingClientRect();
			const pendingProperties = /* @__PURE__ */ new Set();
			if (heroRect && gateArtRect) {
				const geometry = {
					top: [gateArtRect.top, heroRect.top],
					left: [gateArtRect.left, heroRect.left],
					width: [gateArtRect.width, heroRect.width],
					height: [gateArtRect.height, heroRect.height]
				};
				for (const property of THEME_FRAME_PROPERTIES) if (Math.abs(geometry[property][0] - geometry[property][1]) > .5) pendingProperties.add(property);
			} else for (const property of THEME_FRAME_PROPERTIES) pendingProperties.add(property);
			pendingThemeFramePropertiesRef.current = pendingProperties;
			completedThemeFramePropertiesRef.current.clear();
			if (heroRect) setThemeFrameStyle({
				"--theme-frame-x": `${heroRect.left}px`,
				"--theme-frame-y": `${heroRect.top}px`,
				"--theme-frame-width": `${heroRect.width}px`,
				"--theme-frame-height": `${heroRect.height}px`
			});
			changeTheme(nextTheme, void 0, { skipTransition: true });
			setEnteringTheme(nextTheme);
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) completeFactionGate();
		};
		if (!window.matchMedia("(max-width: 760px)").matches) {
			beginTransition();
			return;
		}
		setPreparingTheme(nextTheme);
		const factionImage = new Image();
		let completed = false;
		let prepareFallbackTimer = 0;
		const finishPreparing = () => {
			if (completed) return;
			completed = true;
			window.clearTimeout(prepareFallbackTimer);
			setPreparingTheme(null);
			beginTransition();
		};
		factionImage.onload = () => {
			if (typeof factionImage.decode === "function") {
				factionImage.decode().catch(() => void 0).then(finishPreparing);
				return;
			}
			finishPreparing();
		};
		factionImage.onerror = finishPreparing;
		prepareFallbackTimer = window.setTimeout(finishPreparing, 2500);
		factionImage.src = `/aion2-${nextTheme}-mobile.webp`;
		if (factionImage.complete) finishPreparing();
	};
	const handleGateAnimationEnd = (0, import_react.useCallback)((event) => {
		if (!enteringTheme || isSettlingTheme || !event.animationName.startsWith("unroll-")) return;
		setIsSettlingTheme(true);
		if (pendingThemeFramePropertiesRef.current.size === 0) completeFactionGate();
	}, [
		completeFactionGate,
		enteringTheme,
		isSettlingTheme
	]);
	const handleGateTransitionEnd = (0, import_react.useCallback)((event) => {
		if (!enteringTheme || !isSettlingTheme || !(event.target instanceof HTMLElement)) return;
		if (!event.target.classList.contains(`race-gate-art--${enteringTheme}`)) return;
		if (!isThemeFrameProperty(event.propertyName)) return;
		const pending = pendingThemeFramePropertiesRef.current;
		if (!pending.has(event.propertyName)) return;
		const completed = completedThemeFramePropertiesRef.current;
		completed.add(event.propertyName);
		if ([...pending].every((property) => completed.has(property))) completeFactionGate();
	}, [
		completeFactionGate,
		enteringTheme,
		isSettlingTheme
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: gateRef,
		className: `race-gate${hasEntered ? " race-gate--closed" : ""}${enteringTheme ? ` race-gate--entering-${enteringTheme}` : ""}${isSettlingTheme ? " race-gate--settling" : ""}`,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": t("Choose your AION2 faction theme"),
		"aria-hidden": hasEntered,
		"aria-busy": Boolean(enteringTheme || preparingTheme),
		"data-entering": enteringTheme ? "true" : "false",
		onAnimationEnd: handleGateAnimationEnd,
		onTransitionEnd: handleGateTransitionEnd,
		style: themeFrameStyle,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
				className: "race-gate-art race-gate-art--elyos",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					media: "(min-width: 761px)",
					srcSet: "/aion2-elyos.webp"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: enteringTheme === "elyos" ? "/aion2-elyos-mobile.webp" : TRANSPARENT_IMAGE_SOURCE,
					alt: t("Elyos hero in the luminous world of Elysea"),
					width: "1920",
					height: "1080",
					decoding: "async"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
				className: "race-gate-art race-gate-art--asmodian",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					media: "(min-width: 761px)",
					srcSet: "/aion2-asmodian.webp"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: enteringTheme === "asmodian" ? "/aion2-asmodian-mobile.webp" : TRANSPARENT_IMAGE_SOURCE,
					alt: t("Asmodian hero in the violet world of Asmodae"),
					width: "1920",
					height: "1080",
					decoding: "async"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
				className: "race-gate-art race-gate-art--mobile-dual",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					type: "image/avif",
					srcSet: "/aion2-dual-mobile.avif"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/aion2-dual-mobile.webp",
					alt: t("Elyos and Asmodian heroes of Atreia"),
					width: "750",
					height: "1234",
					decoding: "async",
					fetchPriority: "high"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "race-gate-shade",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "race-gate-seam",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "race-gate-brand",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					type: "image/avif",
					srcSet: "/aion2-logo.avif"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/aion2-logo.webp",
					srcSet: "/aion2-logo-160.webp 160w, /aion2-logo-240.webp 240w, /aion2-logo.webp 287w",
					sizes: "(max-width: 760px) 40vw, 18vw",
					alt: "AION2",
					width: "287",
					height: "213",
					fetchPriority: "high"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "race-choice race-choice--elyos",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"data-faction-entry": "elyos",
					type: "button",
					onClick: () => enterTheme("elyos"),
					disabled: Boolean(preparingTheme) || hasEntered,
					tabIndex: hasEntered ? -1 : 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "ELYSEA · LIGHT OF ATREIA" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("ENTER ELYSEA") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("ENTER AS ELYOS") })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "race-choice race-choice--asmodian",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"data-faction-entry": "asmodian",
					type: "button",
					onClick: () => enterTheme("asmodian"),
					disabled: Boolean(preparingTheme) || hasEntered,
					tabIndex: hasEntered ? -1 : 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "ASMODAE · SHADOW OF ATREIA" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("ENTER ASMODAE") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("ENTER AS ASMODIAN") })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "race-gate-language-picker",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					"aria-label": `${t("Choose language")}: ${siteLocaleConfig[locale].label}`,
					tabIndex: enteringTheme || preparingTheme || hasEntered ? -1 : 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						lang: siteLocaleConfig[locale].htmlLang,
						children: siteLocaleConfig[locale].shortLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "▾"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "race-gate-languages",
					"aria-label": t("Choose language"),
					children: siteLocales.map((language) => {
						const config = siteLocaleConfig[language];
						const isCurrent = language === locale;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "race-gate-language",
							href: `/${language}/`,
							hrefLang: config.hrefLang,
							lang: config.htmlLang,
							"aria-current": isCurrent ? "page" : void 0,
							tabIndex: enteringTheme || preparingTheme || hasEntered ? -1 : 0,
							onClick: (event) => {
								if (enteringTheme || preparingTheme || hasEntered) {
									event.preventDefault();
									return;
								}
								document.cookie = `aion2-atlas-locale=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
								trackEvent("language_change", {
									from: locale,
									to: language,
									surface: "faction_gate"
								});
								if (isCurrent) event.preventDefault();
							},
							children: config.label
						}, language);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "race-gate-hint",
				children: t("CHOOSE YOUR FACTION · YOU CAN CHANGE YOUR THEME AT ANY TIME")
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main-content",
		inert: !hasEntered ? true : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero",
			id: "top",
			"aria-labelledby": "hero-title",
			ref: heroRef,
			tabIndex: -1,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-backdrops",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
						className: "hero-backdrop hero-backdrop-elyos",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							media: "(max-width: 760px)",
							srcSet: hasEntered ? "/aion2-elyos-mobile.webp" : TRANSPARENT_IMAGE_SOURCE
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hasEntered ? "/aion2-elyos.webp" : TRANSPARENT_IMAGE_SOURCE,
							alt: t("Elyos hero in the luminous world of Elysea"),
							width: "1920",
							height: "1080",
							decoding: "async",
							fetchPriority: "high"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
						className: "hero-backdrop hero-backdrop-asmodian",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							media: "(max-width: 760px)",
							srcSet: hasEntered ? "/aion2-asmodian-mobile.webp" : TRANSPARENT_IMAGE_SOURCE
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hasEntered ? "/aion2-asmodian.webp" : TRANSPARENT_IMAGE_SOURCE,
							alt: t("Asmodian hero in the violet world of Asmodae"),
							width: "1920",
							height: "1080",
							decoding: "async",
							loading: "lazy"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-scrim",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rift-seam",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shell hero-inner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "eyebrow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("GLOBAL PLAYER RESOURCE") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									"aria-live": "polite",
									children: theme === "elyos" ? t("INTERFACE 01 / ELYOS") : t("INTERFACE 02 / ASMODIAN")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								id: "hero-title",
								children: t("AION2 Guides, Interactive Map & Item Database")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hero-tagline",
								children: t("Two Worlds. One Journey.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hero-summary",
								children: t("AION2 KINA is an independent AION2 guide hub for class guides, official item data, an interactive map, crafting calculators, and daily and weekly tools. Official announcements, game data, and community findings are labelled separately.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "hero-search",
								action: `/${locale}/search/`,
								method: "get",
								role: "search",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "sr-only",
										htmlFor: `home-search-${locale}`,
										children: t("Search AION2 guides, items, classes, maps, and tools")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: `home-search-${locale}`,
										type: "search",
										name: "q",
										placeholder: t("Search items, guides, classes, maps, or tools"),
										autoComplete: "off"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										children: t("Search")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-actions",
								"aria-label": t("Primary actions"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "button button-primary",
									href: mapHref,
									onClick: () => trackEvent("guide_to_map_click", {
										entry_source: "home-hero",
										locale,
										surface: "home-hero"
									}),
									children: [
										t("Open Interactive Map"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: "→"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "button button-secondary",
									href: itemDatabaseHref,
									children: [
										t("Search Item Database"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: "↗"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "quick-links",
								"aria-label": t("Quick entries"),
								children: heroSupportLinks.map(([title, target]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: getSectionHref(locale, target),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" }), t(title)]
								}, title))
							})
						]
					}), checklistReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeChecklistPlaceholder, {
							checklistHref,
							checklistPreview,
							copy,
							onActivate: () => setChecklistReady(true)
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyHomeChecklistCard, {
							locale,
							checklistHref,
							copy
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeChecklistPlaceholder, {
						checklistHref,
						checklistPreview,
						copy,
						onActivate: () => setChecklistReady(true)
					})]
				})
			]
		}), children]
	})] });
}
//#endregion
export { HomeInteractiveShell };
