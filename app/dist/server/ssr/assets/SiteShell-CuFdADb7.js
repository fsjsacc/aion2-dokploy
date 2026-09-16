import { E as __toESM, n as require_jsx_runtime, t as require_react_dom, x as require_react } from "../index.js";
import { t as usePathname } from "./navigation-C44awX2X.js";
import { a as localizedHref, d as siteLocaleConfig, f as siteLocales, l as siteFooterNavigation, m as siteShellCopy, o as replaceLocaleInPath, p as siteNavigation, r as getSectionHref, t as getActiveSection, u as siteFooterNavigationCopy } from "./site-config-EbYJfejA.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import { t as SiteThemeContext } from "./SiteThemeContext-Dp2CBcYK.js";
import Link from "./link-DDly4PBZ.js";
//#region app/_components/site/FooterExternalLinks.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_jsx_runtime = require_jsx_runtime();
var label = {
	"zh-hans": "合作伙伴",
	fr: "Partenaires",
	de: "Partner",
	es: "Socios",
	ja: "パートナー",
	"pt-br": "Parceiros",
	ru: "Партнёры",
	"zh-hant": "合作夥伴",
	en: "Partners",
	ko: "파트너"
};
function FooterExternalLinks({ links, locale, scalePercent }) {
	if (!links.length) return null;
	const renderLinks = (duplicate) => links.map((link) => {
		const displayHeight = Math.round(link.height * (scalePercent / 100));
		const displayWidth = Math.round(displayHeight * (250 / 54));
		const textScale = scalePercent / 100;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "site-shell-external-link",
			href: link.href,
			onClick: () => {
				let destination = "external";
				try {
					destination = new URL(link.href).hostname;
				} catch {}
				trackEvent("footer_external_link_click", {
					destination,
					locale,
					position: "site-footer",
					surface: "site-footer"
				});
			},
			rel: "noopener noreferrer",
			tabIndex: duplicate ? -1 : void 0,
			target: "_blank",
			children: link.badgeType === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "site-shell-external-link-text",
				style: {
					fontSize: Math.max(10, Math.round(12 * textScale)),
					height: displayHeight,
					paddingInline: Math.max(10, Math.round(16 * textScale))
				},
				children: link.alt
			}) : link.imageSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				alt: link.alt,
				height: displayHeight,
				loading: "lazy",
				src: link.imageSrc,
				style: {
					height: displayHeight,
					width: displayWidth
				},
				width: displayWidth
			}) }) : null
		}, `${duplicate ? "duplicate" : "primary"}-${link.id}`);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "site-shell-external-links",
		"aria-label": label[locale],
		style: { "--external-links-duration": `${Math.max(24, links.length * 4)}s` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "site-shell-external-links-label",
			children: label[locale]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "site-shell-external-links-list",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-shell-external-links-track",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "site-shell-external-links-group",
					children: renderLinks(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "site-shell-external-links-group site-shell-external-links-group--duplicate",
					children: renderLinks(true)
				})]
			})
		})]
	});
}
//#endregion
//#region app/locale-preference-client.ts
function persistSiteLocale(locale) {
	document.cookie = `aion2-atlas-locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
//#endregion
//#region app/_components/site/SiteShell.tsx
function resolvedCopy(locale) {
	const configured = siteShellCopy[locale];
	return {
		...configured,
		sectionLabels: configured.navigation
	};
}
function navigationLabel(item, copy, configured) {
	const direct = configured[item.labelKey];
	if (typeof direct === "string") return direct;
	const nested = configured.navigation;
	if (nested && typeof nested === "object") {
		const value = nested[item.section];
		if (typeof value === "string") return value;
	}
	return copy.sectionLabels[item.section] ?? item.labelKey;
}
function isMapPath(pathname) {
	return /\/tools\/map(?:\/|$)/.test(pathname);
}
function getLanguageNavigationSuffix(value, mapRoute) {
	if (!mapRoute || !value) return value;
	const hashIndex = value.indexOf("#");
	const rawSearch = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
	const hash = hashIndex >= 0 ? value.slice(hashIndex) : "";
	const parameters = new URLSearchParams(rawSearch.startsWith("?") ? rawSearch.slice(1) : rawSearch);
	parameters.delete("l");
	parameters.delete("lang");
	const search = parameters.toString();
	return `${search ? `?${search}` : ""}${hash}`;
}
function SiteShell({ children, externalLinkScalePercent, externalLinks, locale }) {
	const pathname = usePathname() || getSectionHref(locale, "home");
	const mapRoute = isMapPath(pathname);
	const activeSection = getActiveSection(pathname);
	const copy = (0, import_react.useMemo)(() => resolvedCopy(locale), [locale]);
	const shortSearchLabel = copy.searchButtonLabel;
	const configuredCopy = siteShellCopy[locale];
	const [theme, setTheme] = (0, import_react.useState)("elyos");
	const [isThemeTransitioning, setIsThemeTransitioning] = (0, import_react.useState)(false);
	const [locationSearch, setLocationSearch] = (0, import_react.useState)("");
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [languageMenuOpen, setLanguageMenuOpen] = (0, import_react.useState)(false);
	const menuRef = (0, import_react.useRef)(null);
	const menuButtonRef = (0, import_react.useRef)(null);
	const languagePickerRef = (0, import_react.useRef)(null);
	const languageButtonRef = (0, import_react.useRef)(null);
	const themeTransitionRef = (0, import_react.useRef)(null);
	const themeFallbackTimerRef = (0, import_react.useRef)(null);
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		let storedTheme = null;
		try {
			storedTheme = window.localStorage.getItem("aion2-atlas-theme");
		} catch {}
		let stateFrame = 0;
		if (storedTheme === "elyos" || storedTheme === "asmodian") {
			document.documentElement.dataset.aion2Theme = storedTheme;
			document.documentElement.dataset.aion2ThemeSaved = "true";
			stateFrame = window.requestAnimationFrame(() => {
				setTheme(storedTheme);
				setLocationSearch(`${window.location.search}${window.location.hash}`);
			});
		} else {
			document.documentElement.dataset.aion2Theme = "elyos";
			delete document.documentElement.dataset.aion2ThemeSaved;
			stateFrame = window.requestAnimationFrame(() => setLocationSearch(`${window.location.search}${window.location.hash}`));
		}
		const syncTheme = (event) => {
			if (event.key === "aion2-atlas-theme" && (event.newValue === "elyos" || event.newValue === "asmodian")) {
				setTheme(event.newValue);
				document.documentElement.dataset.aion2Theme = event.newValue;
				document.documentElement.dataset.aion2ThemeSaved = "true";
			}
		};
		window.addEventListener("storage", syncTheme);
		return () => {
			if (stateFrame) window.cancelAnimationFrame(stateFrame);
			window.removeEventListener("storage", syncTheme);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const frame = window.requestAnimationFrame(() => {
			setLocationSearch(`${window.location.search}${window.location.hash}`);
		});
		return () => window.cancelAnimationFrame(frame);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (!languageMenuOpen) return;
		const handlePointerDown = (event) => {
			if (event.target instanceof Node && !languagePickerRef.current?.contains(event.target)) setLanguageMenuOpen(false);
		};
		const handleKeyDown = (event) => {
			if (event.key !== "Escape") return;
			event.preventDefault();
			setLanguageMenuOpen(false);
			languageButtonRef.current?.focus({ preventScroll: true });
		};
		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [languageMenuOpen]);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
			if (themeFallbackTimerRef.current !== null) {
				window.clearTimeout(themeFallbackTimerRef.current);
				themeFallbackTimerRef.current = null;
			}
			themeTransitionRef.current = null;
			delete document.documentElement.dataset.aion2ThemeTransition;
			document.documentElement.style.removeProperty("--theme-origin-x");
			document.documentElement.style.removeProperty("--theme-origin-y");
			document.documentElement.style.removeProperty("--theme-reveal-radius");
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!menuOpen) return;
		const previousOverflow = document.body.style.overflow;
		const previouslyFocused = document.activeElement;
		const menuButton = menuButtonRef.current;
		const restoreTarget = previouslyFocused === document.body ? menuButton : previouslyFocused;
		document.body.style.overflow = "hidden";
		const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex=\"-1\"])";
		const focusables = () => Array.from(menuRef.current?.querySelectorAll(focusableSelector) ?? []);
		const firstControl = focusables()[0];
		firstControl?.focus({ preventScroll: true });
		const focusFrame = window.requestAnimationFrame(() => firstControl?.focus({ preventScroll: true }));
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				setMenuOpen(false);
				return;
			}
			if (event.key !== "Tab") return;
			const items = focusables();
			if (!items.length) return;
			const first = items[0];
			const last = items[items.length - 1];
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
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);
			const focusTarget = restoreTarget ?? menuButton;
			if (focusTarget?.isConnected) focusTarget.focus({ preventScroll: true });
		};
	}, [menuOpen]);
	const changeTheme = (0, import_react.useCallback)((nextTheme, event, options = {}) => {
		if (themeTransitionRef.current) return;
		const persistTheme = () => {
			document.documentElement.dataset.aion2Theme = nextTheme;
			document.documentElement.dataset.aion2ThemeSaved = "true";
			try {
				window.localStorage.setItem("aion2-atlas-theme", nextTheme);
			} catch {}
		};
		if (nextTheme === theme) {
			persistTheme();
			return;
		}
		const commitTheme = () => {
			(0, import_react_dom.flushSync)(() => setTheme(nextTheme));
			persistTheme();
		};
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const startViewTransition = document.startViewTransition?.bind(document);
		if (options.skipTransition || reducedMotion) {
			commitTheme();
			return;
		}
		if (!startViewTransition) {
			document.documentElement.dataset.aion2ThemeTransition = "fallback";
			setIsThemeTransitioning(true);
			const siteRoot = document.querySelector(".site-shell");
			if (siteRoot) window.getComputedStyle(siteRoot).getPropertyValue("--accent");
			commitTheme();
			themeTransitionRef.current = new Promise((resolve) => {
				themeFallbackTimerRef.current = window.setTimeout(() => {
					themeFallbackTimerRef.current = null;
					delete document.documentElement.dataset.aion2ThemeTransition;
					themeTransitionRef.current = null;
					if (mountedRef.current) setIsThemeTransitioning(false);
					resolve();
				}, 640);
			});
			return;
		}
		const rect = event?.currentTarget?.getBoundingClientRect();
		const pointerTriggered = Boolean(event && (event.detail ?? 0) > 0 && event.clientX !== void 0);
		const originX = pointerTriggered ? event?.clientX ?? window.innerWidth / 2 : rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
		const originY = pointerTriggered ? event?.clientY ?? window.innerHeight / 2 : rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
		const revealRadius = Math.hypot(Math.max(originX, window.innerWidth - originX), Math.max(originY, window.innerHeight - originY));
		document.documentElement.style.setProperty("--theme-origin-x", `${originX}px`);
		document.documentElement.style.setProperty("--theme-origin-y", `${originY}px`);
		document.documentElement.style.setProperty("--theme-reveal-radius", `${revealRadius}px`);
		const transition = startViewTransition(commitTheme);
		setIsThemeTransitioning(true);
		themeTransitionRef.current = transition.finished.catch(() => void 0).then(() => {
			themeTransitionRef.current = null;
			document.documentElement.style.removeProperty("--theme-origin-x");
			document.documentElement.style.removeProperty("--theme-origin-y");
			document.documentElement.style.removeProperty("--theme-reveal-radius");
			if (mountedRef.current) setIsThemeTransitioning(false);
		});
	}, [theme]);
	const themeContext = (0, import_react.useMemo)(() => ({
		theme,
		isThemeTransitioning,
		changeTheme
	}), [
		changeTheme,
		isThemeTransitioning,
		theme
	]);
	const navigation = (mobile = false, position = mobile ? "mobile-menu" : "header") => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: mobile ? "site-shell-mobile-nav" : "site-shell-navigation",
		"aria-label": copy.navigationLabel,
		children: siteNavigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			href: getSectionHref(locale, item.section),
			"aria-current": activeSection === item.section ? "page" : void 0,
			onClick: () => {
				if (mapRoute) trackEvent("map_site_navigation_click", {
					destination: item.section,
					locale,
					position,
					surface: "map-seo"
				});
				if (mobile) setMenuOpen(false);
			},
			children: navigationLabel(item, copy, configuredCopy)
		}, item.section))
	});
	const searchForm = (mobile = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: mobile ? "site-shell-mobile-search" : "site-shell-search",
		action: `/${locale}/search/`,
		method: "get",
		role: "search",
		onSubmit: (event) => {
			if (!mapRoute) return;
			const query = String(new FormData(event.currentTarget).get("q") ?? "").trim();
			trackEvent("map_site_search_submit", {
				locale,
				position: mobile ? "mobile-menu" : "header",
				query_length: query.length,
				surface: "map-seo"
			});
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "site-shell-visually-hidden",
			children: copy.searchLabel
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "search",
			name: "q",
			placeholder: copy.searchPlaceholder,
			autoComplete: "off"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			"aria-label": copy.searchLabel,
			children: shortSearchLabel
		})]
	});
	const trustNavigation = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "site-shell-trust-navigation",
		"aria-label": copy.siteInformationLabel,
		children: siteFooterNavigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			href: localizedHref(locale, item.path),
			onClick: () => {
				if (mapRoute) trackEvent("map_site_navigation_click", {
					destination: item.key,
					locale,
					position: "footer",
					surface: "map-seo"
				});
			},
			children: siteFooterNavigationCopy[locale][item.key]
		}, item.key))
	});
	const navigateLanguage = (event, language, mobile) => {
		setLanguageMenuOpen(false);
		if (mobile) setMenuOpen(false);
		if (language !== locale) trackEvent("language_change", {
			from: locale,
			to: language,
			position: mobile ? "mobile-menu" : "header",
			surface: mapRoute ? "map-seo" : "faction-gate"
		});
		if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();
		persistSiteLocale(language);
		const suffix = getLanguageNavigationSuffix(`${window.location.search}${window.location.hash}`, mapRoute);
		const destination = `${replaceLocaleInPath(window.location.pathname, language)}${suffix}`;
		window.location.assign(destination);
	};
	const languageLinks = (mobile) => siteLocales.map((language) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: `${replaceLocaleInPath(pathname, language)}${getLanguageNavigationSuffix(locationSearch, mapRoute)}`,
		hrefLang: siteLocaleConfig[language].hrefLang,
		lang: siteLocaleConfig[language].htmlLang,
		"aria-current": language === locale ? "page" : void 0,
		onClick: (event) => navigateLanguage(event, language, mobile),
		children: siteLocaleConfig[language].label
	}, language));
	const languageSwitcher = (mobile = false) => {
		if (mobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "site-shell-mobile-languages",
			"aria-label": copy.languageLabel,
			children: languageLinks(true)
		});
		const currentLocale = siteLocaleConfig[locale];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-shell-language-picker",
			ref: languagePickerRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				ref: languageButtonRef,
				className: "site-shell-language-trigger",
				type: "button",
				"aria-expanded": languageMenuOpen,
				"aria-controls": "site-shell-language-options",
				"aria-haspopup": "true",
				"aria-label": `${copy.languageLabel}: ${currentLocale.label}`,
				onClick: () => setLanguageMenuOpen((open) => !open),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						lang: currentLocale.htmlLang,
						children: currentLocale.shortLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "site-shell-language-trigger-label",
						lang: currentLocale.htmlLang,
						children: currentLocale.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "site-shell-language-chevron",
						"aria-hidden": "true",
						children: "▾"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				id: "site-shell-language-options",
				className: "site-shell-language-options",
				"aria-label": copy.languageLabel,
				hidden: !languageMenuOpen,
				"data-open": languageMenuOpen ? "true" : "false",
				children: languageLinks(false)
			})]
		});
	};
	const themeSwitcher = (mobile = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: mobile ? "site-shell-mobile-themes" : "site-shell-themes",
		role: "group",
		"aria-label": copy.themeLabel,
		"aria-busy": isThemeTransitioning,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-pressed": theme === "elyos",
			disabled: isThemeTransitioning,
			onClick: (event) => {
				if (mapRoute && theme !== "elyos") trackEvent("map_site_theme_change", {
					from: theme,
					locale,
					position: mobile ? "mobile-menu" : "header",
					surface: "map-seo",
					to: "elyos"
				});
				changeTheme("elyos", event);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: "01"
			}), copy.elyosTheme]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-pressed": theme === "asmodian",
			disabled: isThemeTransitioning,
			onClick: (event) => {
				if (mapRoute && theme !== "asmodian") trackEvent("map_site_theme_change", {
					from: theme,
					locale,
					position: mobile ? "mobile-menu" : "header",
					surface: "map-seo",
					to: "asmodian"
				});
				changeTheme("asmodian", event);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: "02"
			}), copy.asmodianTheme]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteThemeContext.Provider, {
		value: themeContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site site-shell",
			"data-theme": theme,
			lang: siteLocaleConfig[locale].htmlLang,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "site-shell-skip-link",
						href: "#site-shell-content",
						inert: menuOpen ? true : void 0,
						"aria-hidden": menuOpen ? true : void 0,
						children: copy.skipToContent
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "site-shell-header",
						inert: menuOpen ? true : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "site-shell-header-inner",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									className: "brand site-shell-brand",
									href: getSectionHref(locale, "home"),
									"aria-label": "AION2 KINA",
									onClick: () => {
										if (mapRoute) trackEvent("map_site_navigation_click", {
											destination: "home",
											locale,
											position: "header-brand",
											surface: "map-seo"
										});
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
										className: "site-brand-picture",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
											type: "image/avif",
											srcSet: "/aion2-logo-96.avif"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											className: "site-brand-logo",
											src: "/aion2-logo-96.webp",
											alt: "AION2 KINA",
											width: "96",
											height: "71"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "AION2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "KINA" })] })]
								}),
								navigation(),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "site-shell-header-actions",
									children: [
										searchForm(),
										languageSwitcher(),
										themeSwitcher(),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											ref: menuButtonRef,
											className: "site-shell-menu-button",
											type: "button",
											"aria-expanded": menuOpen,
											"aria-controls": "site-shell-mobile-menu",
											"aria-label": copy.openMenu,
											onClick: () => {
												setLanguageMenuOpen(false);
												setMenuOpen(true);
											},
											children: copy.moreLabel
										})
									]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "site-shell-menu-backdrop",
						type: "button",
						"aria-hidden": "true",
						"data-open": menuOpen ? "true" : "false",
						tabIndex: -1,
						onClick: () => setMenuOpen(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						ref: menuRef,
						id: "site-shell-mobile-menu",
						className: "site-shell-mobile-menu",
						role: "dialog",
						"aria-modal": "true",
						"aria-label": copy.navigationLabel,
						"aria-hidden": !menuOpen,
						inert: !menuOpen ? true : void 0,
						"data-open": menuOpen ? "true" : "false",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "site-shell-mobile-menu-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "AION2 KINA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setMenuOpen(false),
									children: copy.closeMenu
								})]
							}),
							searchForm(true),
							navigation(true),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"aria-labelledby": "site-shell-mobile-language-label",
								className: "site-shell-mobile-menu-section",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "site-shell-mobile-menu-label",
									id: "site-shell-mobile-language-label",
									children: copy.languageLabel
								}), languageSwitcher(true)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"aria-labelledby": "site-shell-mobile-theme-label",
								className: "site-shell-mobile-menu-section",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "site-shell-mobile-menu-label",
									id: "site-shell-mobile-theme-label",
									children: copy.themeLabel
								}), themeSwitcher(true)]
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "site-shell-content",
					className: "site-shell-content",
					tabIndex: -1,
					inert: menuOpen ? true : void 0,
					"aria-hidden": menuOpen ? true : void 0,
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: `site-shell-footer${activeSection === "home" ? " site-shell-footer--compact" : ""}`,
					inert: menuOpen ? true : void 0,
					"aria-hidden": menuOpen ? true : void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "site-shell-footer-inner",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								className: "brand site-shell-footer-brand",
								href: getSectionHref(locale, "home"),
								"aria-label": "AION2 KINA",
								onClick: () => {
									if (mapRoute) trackEvent("map_site_navigation_click", {
										destination: "home",
										locale,
										position: "footer-brand",
										surface: "map-seo"
									});
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
									className: "site-brand-picture",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
										type: "image/avif",
										srcSet: "/aion2-logo-96.avif"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										className: "site-brand-logo",
										src: "/aion2-logo-96.webp",
										alt: "AION2 KINA",
										width: "96",
										height: "71",
										loading: "lazy"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "AION2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "KINA" })] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.footerTagline })] }),
							activeSection !== "home" ? navigation(false, "footer") : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "site-shell-footer-policy",
								children: [trustNavigation(), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "site-shell-legal",
									children: [
										"© ",
										(/* @__PURE__ */ new Date()).getFullYear(),
										" AION2 KINA. ",
										copy.legalCopy
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterExternalLinks, {
						links: externalLinks,
						locale,
						scalePercent: externalLinkScalePercent
					})]
				})
			]
		})
	});
}
//#endregion
export { SiteShell, SiteShell as default };
