import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-CU8j443B.js";
import { t as X } from "./x-Cgr92E5e.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
import { t as ChevronLeft } from "./chevron-left-C4SvgscM.js";
import { t as ChevronRight } from "./chevron-right-DJtAFs5y.js";
import { t as addChecklistItem } from "./checklist-store-Pmpy4L7d.js";
import { n as Download, r as Copy, t as Share2 } from "./share-2-MZpbKR6z.js";
import { t as RefreshCw } from "./refresh-cw-Crqu6vln.js";
import { t as ChevronDown } from "./chevron-down-B5Ec6fJR.js";
import { t as Trash2 } from "./trash-2-COIzMATA.js";
import { t as LoaderCircle } from "./loader-circle-Cq-I1Ywl.js";
import { n as Route, t as TriangleAlert } from "./triangle-alert-BG_-YQzv.js";
import { a as isLocale, c as routeLocaleForMapLocale, i as UI_TEXT, n as LANGUAGE_OPTIONS, o as mapDataLocaleForLocale, r as LOCALE_STORAGE_KEY, s as numberLocaleForMapLocale, t as DEFAULT_LOCALE } from "./i18n-D5JEB-IK.js";
//#region node_modules/lucide-react/dist/esm/icons/chevron-up.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronUp = createLucideIcon("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ListPlus = createLucideIcon("list-plus", [
	["path", {
		d: "M16 5H3",
		key: "m91uny"
	}],
	["path", {
		d: "M11 12H3",
		key: "51ecnj"
	}],
	["path", {
		d: "M16 19H3",
		key: "zzsher"
	}],
	["path", {
		d: "M18 9v6",
		key: "1twb98"
	}],
	["path", {
		d: "M21 12h-6",
		key: "bt1uis"
	}]
]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Maximize2 = createLucideIcon("maximize-2", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "m21 3-7 7",
		key: "1l2asr"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M9 21H3v-6",
		key: "wtvkvv"
	}]
]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Minimize2 = createLucideIcon("minimize-2", [
	["path", {
		d: "m14 10 7-7",
		key: "oa77jy"
	}],
	["path", {
		d: "M20 10h-6V4",
		key: "mjg0md"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M4 14h6v6",
		key: "rmj7iw"
	}]
]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PanelLeftClose = createLucideIcon("panel-left-close", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M9 3v18",
		key: "fh3hqa"
	}],
	["path", {
		d: "m16 15-3-3 3-3",
		key: "14y99z"
	}]
]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PanelLeftOpen = createLucideIcon("panel-left-open", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M9 3v18",
		key: "fh3hqa"
	}],
	["path", {
		d: "m14 9 3 3-3 3",
		key: "8010ee"
	}]
]);
/**
* @license lucide-react v1.24.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Undo2 = createLucideIcon("undo-2", [["path", {
	d: "M9 14 4 9l5-5",
	key: "102s5s"
}], ["path", {
	d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
	key: "f3b9sd"
}]]);
//#endregion
//#region app/map-app/asset-url.ts
function resolveMapAssetUrl(value, assetBasePath) {
	const base = assetBasePath?.replace(/\/+$/u, "") ?? "";
	if (!value || !base || /^(?:data:|blob:|https?:\/\/)/u.test(value) || value === base || value.startsWith(`${base}/`)) return value;
	return `${base}/${value.replace(/^\/+/u, "")}`;
}
//#endregion
//#region app/map-app/MapLibreMap.tsx
var import_jsx_runtime = require_jsx_runtime();
var MARKER_SOURCE = "aion2-markers";
var MARKER_LAYER = "aion2-marker-icons";
var MARKER_LABEL_LAYER = "aion2-marker-labels";
var FOUND_LAYER = "aion2-marker-found";
var SELECTED_LAYER = "aion2-marker-selected";
var REGION_SOURCE = "aion2-regions";
var REGION_LAYER = "aion2-region-lines";
var ROUTE_SOURCE = "aion2-route";
var ROUTE_HALO_LAYER = "aion2-route-halo";
var ROUTE_LAYER = "aion2-route-line";
var ROUTE_POINT_SOURCE = "aion2-route-points";
var ROUTE_POINT_LAYER = "maplibre-route-index";
var ROUTE_POINT_LABEL_LAYER = "aion2-route-index-label";
var INTERACTIVE_MARKER_LAYERS = [
	ROUTE_POINT_LABEL_LAYER,
	ROUTE_POINT_LAYER,
	SELECTED_LAYER,
	FOUND_LAYER,
	MARKER_LABEL_LAYER,
	MARKER_LAYER
];
var FALLBACK_SPRITE_URL = "/sprites/aion2";
var MAX_MERCATOR_LATITUDE = 85.0511287798066;
var MAX_ZOOM_OVERSCALE = .5;
var MARKER_ICON_SCALE = 1.5;
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
function worldYToLatitude(y) {
	const normalized = Math.PI * (1 - 2 * y);
	return Math.atan(Math.sinh(normalized)) * 180 / Math.PI;
}
function latitudeToWorldY(latitude) {
	const radians = clamp(latitude, -MAX_MERCATOR_LATITUDE, MAX_MERCATOR_LATITUDE) * Math.PI / 180;
	return (1 - Math.asinh(Math.tan(radians)) / Math.PI) / 2;
}
function gamePointToLngLat(mapInfo, x, y) {
	const worldX = x / mapInfo.tileWorldSize;
	const worldY = y / mapInfo.tileWorldSize;
	return [worldX * 360 - 180, worldYToLatitude(worldY)];
}
function lngLatToGamePoint(mapInfo, longitude, latitude) {
	return {
		x: (longitude + 180) / 360 * mapInfo.tileWorldSize,
		y: latitudeToWorldY(latitude) * mapInfo.tileWorldSize
	};
}
function mapBounds(mapInfo) {
	return [gamePointToLngLat(mapInfo, 0, mapInfo.height), gamePointToLngLat(mapInfo, mapInfo.width, 0)];
}
function hasUsableViewport(map) {
	const container = map.getContainer();
	return container.clientWidth > 0 && container.clientHeight > 0;
}
function iconUrl(marker, mapInfo) {
	if (mapInfo.type === "dark" && marker.darkIconUrl) return marker.darkIconUrl;
	return marker.iconUrl || marker.darkIconUrl || "";
}
function spriteId(url) {
	const filename = url.split("/").pop()?.split("?")[0] ?? "";
	const extension = filename.lastIndexOf(".");
	return extension > 0 ? filename.slice(0, extension) : filename || "__fallback";
}
function markerDensityScale(markerCount) {
	return clamp(1 - Math.log1p(Math.max(0, markerCount) / 240) / Math.log1p(1800 / 240) * .42, .58, 1);
}
function markerFeatures(mapInfo, markers) {
	const densityScale = markerDensityScale(markers.length);
	return {
		type: "FeatureCollection",
		features: markers.map((marker) => ({
			type: "Feature",
			id: marker.id,
			geometry: {
				type: "Point",
				coordinates: gamePointToLngLat(mapInfo, marker.x, marker.y)
			},
			properties: {
				markerId: marker.id,
				iconId: spriteId(iconUrl(marker, mapInfo)),
				iconScale: (Number.isFinite(marker.iconScale) ? marker.iconScale : 1) * densityScale,
				label: marker.name || marker.subtypeLabel
			}
		}))
	};
}
function regionFeatures(mapInfo, regions) {
	const features = [];
	for (const region of regions) for (const border of region.borders) {
		if (border.length < 2) continue;
		features.push({
			type: "Feature",
			geometry: {
				type: "LineString",
				coordinates: border.map(([x, y]) => gamePointToLngLat(mapInfo, x, y))
			},
			properties: {
				name: region.name,
				label: region.label
			}
		});
	}
	return {
		type: "FeatureCollection",
		features
	};
}
function routeFeatures(mapInfo, markers) {
	return {
		type: "FeatureCollection",
		features: markers.length >= 2 ? [{
			type: "Feature",
			geometry: {
				type: "LineString",
				coordinates: markers.map((marker) => gamePointToLngLat(mapInfo, marker.x, marker.y))
			},
			properties: { route: true }
		}] : []
	};
}
function routePointFeatures(mapInfo, markers) {
	return {
		type: "FeatureCollection",
		features: markers.map((marker, index) => ({
			type: "Feature",
			id: `${marker.id}:${index}`,
			geometry: {
				type: "Point",
				coordinates: gamePointToLngLat(mapInfo, marker.x, marker.y)
			},
			properties: {
				markerId: marker.id,
				routeIndex: String(index + 1)
			}
		}))
	};
}
function iconSizeExpression(mapInfo, selected = false) {
	const multiplier = (selected ? 1.18 : 1) * MARKER_ICON_SCALE;
	const detailZoom = Math.max(1, mapInfo.tileMaxZoom);
	return [
		"interpolate",
		["exponential", 1.35],
		["zoom"],
		0,
		[
			"*",
			[
				"coalesce",
				["get", "iconScale"],
				1
			],
			multiplier * .52
		],
		detailZoom,
		[
			"*",
			[
				"coalesce",
				["get", "iconScale"],
				1
			],
			multiplier * .72
		],
		detailZoom + MAX_ZOOM_OVERSCALE,
		[
			"*",
			[
				"coalesce",
				["get", "iconScale"],
				1
			],
			multiplier * .78
		]
	];
}
function labelSizeExpression(mapInfo) {
	const detailZoom = Math.max(1, mapInfo.tileMaxZoom);
	return [
		"interpolate",
		["linear"],
		["zoom"],
		0,
		10,
		detailZoom,
		12,
		detailZoom + MAX_ZOOM_OVERSCALE,
		12.5
	];
}
function routeCircleRadiusExpression(mapInfo) {
	const detailZoom = Math.max(1, mapInfo.tileMaxZoom);
	return [
		"interpolate",
		["linear"],
		["zoom"],
		0,
		10,
		detailZoom,
		13,
		detailZoom + MAX_ZOOM_OVERSCALE,
		14
	];
}
function routeTextSizeExpression(mapInfo) {
	const detailZoom = Math.max(1, mapInfo.tileMaxZoom);
	return [
		"interpolate",
		["linear"],
		["zoom"],
		0,
		11,
		detailZoom,
		13,
		detailZoom + MAX_ZOOM_OVERSCALE,
		14
	];
}
function foundIconSizeExpression(mapInfo) {
	const detailZoom = Math.max(1, mapInfo.tileMaxZoom);
	return [
		"interpolate",
		["linear"],
		["zoom"],
		0,
		.24,
		detailZoom,
		.32,
		detailZoom + MAX_ZOOM_OVERSCALE,
		.35
	];
}
function toError(value, fallbackMessage) {
	if (value instanceof Error) return value;
	if (value && typeof value === "object" && "message" in value) return new Error(String(value.message));
	return new Error(value == null ? fallbackMessage : String(value));
}
function isAbortError$1(error) {
	return error instanceof Error && error.name === "AbortError";
}
function hasWebGLSupport() {
	try {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
		if (!context) return false;
		context.getExtension("WEBGL_lose_context")?.loseContext();
		return true;
	} catch {
		return false;
	}
}
function mapSpriteUrl(mapInfo) {
	return `/sprites/maps/${mapInfo.slug}`;
}
async function verifySpriteAtlas(spriteUrl, signal) {
	const resolutionSuffix = window.devicePixelRatio > 1 ? "@2x" : "";
	await Promise.all([".json", ".png"].map(async (extension) => {
		const assetUrl = `${spriteUrl}${resolutionSuffix}${extension}`;
		const response = await fetch(assetUrl, {
			method: "HEAD",
			cache: "no-cache",
			signal
		});
		if (!response.ok) throw new Error(`Sprite atlas request failed (${response.status}): ${assetUrl}`);
	}));
}
function isSpriteRuntimeError(error) {
	return /sprite|style image|image .* (?:missing|not found)|\/sprites\/.*\.(?:png|json)/i.test(error.message);
}
var MapLibreMap = (0, import_react.forwardRef)(function MapLibreMap({ mapInfo, accessibleName, unavailableLabel, assetBasePath, markers, regions, foundMarkerIds, routeMarkers, selectedMarker, showLabels, showRegions, onSelectMarker, onCoordinate, onError, onReady }, ref) {
	const containerRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const loadedRef = (0, import_react.useRef)(false);
	const appliedFoundRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const markersRef = (0, import_react.useRef)(markers);
	const regionsRef = (0, import_react.useRef)(regions);
	const foundRef = (0, import_react.useRef)(foundMarkerIds);
	const routeMarkersRef = (0, import_react.useRef)(routeMarkers);
	const selectedRef = (0, import_react.useRef)(selectedMarker);
	const labelsVisibleRef = (0, import_react.useRef)(showLabels);
	const regionsVisibleRef = (0, import_react.useRef)(showRegions);
	const onSelectRef = (0, import_react.useRef)(onSelectMarker);
	const onCoordinateRef = (0, import_react.useRef)(onCoordinate);
	const onErrorRef = (0, import_react.useRef)(onError);
	const onReadyRef = (0, import_react.useRef)(onReady);
	const accessibleNameRef = (0, import_react.useRef)(accessibleName);
	const pendingFocusRef = (0, import_react.useRef)(null);
	const [mapStatus, setMapStatus] = (0, import_react.useState)("loading");
	const [fatalError, setFatalError] = (0, import_react.useState)(null);
	markersRef.current = markers;
	regionsRef.current = regions;
	foundRef.current = foundMarkerIds;
	routeMarkersRef.current = routeMarkers;
	selectedRef.current = selectedMarker;
	labelsVisibleRef.current = showLabels;
	regionsVisibleRef.current = showRegions;
	onSelectRef.current = onSelectMarker;
	onCoordinateRef.current = onCoordinate;
	onErrorRef.current = onError;
	onReadyRef.current = onReady;
	accessibleNameRef.current = accessibleName;
	const reportError = (0, import_react.useCallback)((event) => {
		if (!event.recoverable) {
			setFatalError(event.error);
			setMapStatus("error");
		}
		const callbackError = Object.assign(event.error, {
			stage: event.stage,
			recoverable: event.recoverable,
			resourceUrl: event.resourceUrl
		});
		onErrorRef.current?.(callbackError);
	}, []);
	const syncFoundState = (0, import_react.useCallback)((reset = false) => {
		const map = mapRef.current;
		if (!map || !loadedRef.current || !map.getSource(MARKER_SOURCE)) return;
		try {
			if (reset) map.removeFeatureState({ source: MARKER_SOURCE });
			const previous = reset ? /* @__PURE__ */ new Set() : appliedFoundRef.current;
			const next = foundRef.current;
			for (const markerId of previous) if (!next.has(markerId)) map.setFeatureState({
				source: MARKER_SOURCE,
				id: markerId
			}, { found: false });
			for (const markerId of next) if (reset || !previous.has(markerId)) map.setFeatureState({
				source: MARKER_SOURCE,
				id: markerId
			}, { found: true });
			appliedFoundRef.current = new Set(next);
		} catch (error) {
			reportError({
				stage: "runtime",
				error: toError(error, "Failed to update marker progress"),
				recoverable: true
			});
		}
	}, [reportError]);
	const syncRoute = (0, import_react.useCallback)(() => {
		const map = mapRef.current;
		if (!map || !loadedRef.current) return;
		map.getSource(ROUTE_SOURCE)?.setData(routeFeatures(mapInfo, routeMarkersRef.current));
		map.getSource(ROUTE_POINT_SOURCE)?.setData(routePointFeatures(mapInfo, routeMarkersRef.current));
	}, [mapInfo]);
	const fitMap = (0, import_react.useCallback)((duration = 0) => {
		const map = mapRef.current;
		if (!map || !hasUsableViewport(map)) return false;
		map.fitBounds(mapBounds(mapInfo), {
			padding: 24,
			duration,
			maxZoom: mapInfo.tileMaxZoom
		});
		return true;
	}, [mapInfo]);
	const fitRoute = (0, import_react.useCallback)((route, duration = 320) => {
		const map = mapRef.current;
		if (!map || route.length === 0 || !hasUsableViewport(map)) return;
		if (route.length === 1) {
			map.easeTo({
				center: gamePointToLngLat(mapInfo, route[0].x, route[0].y),
				zoom: Math.max(2.25, mapInfo.tileMaxZoom - 1),
				duration
			});
			return;
		}
		const coordinates = route.map((marker) => gamePointToLngLat(mapInfo, marker.x, marker.y));
		const longitudes = coordinates.map(([longitude]) => longitude);
		const latitudes = coordinates.map(([, latitude]) => latitude);
		map.fitBounds([[Math.min(...longitudes), Math.min(...latitudes)], [Math.max(...longitudes), Math.max(...latitudes)]], {
			padding: 84,
			duration,
			maxZoom: Math.max(2.25, mapInfo.tileMaxZoom - .5)
		});
	}, [mapInfo]);
	const focusMapMarker = (0, import_react.useCallback)((marker) => {
		pendingFocusRef.current = marker;
		const map = mapRef.current;
		if (!map || !loadedRef.current) return;
		pendingFocusRef.current = null;
		map.easeTo({
			center: gamePointToLngLat(mapInfo, marker.x, marker.y),
			zoom: Math.max(map.getZoom(), Math.max(2.25, mapInfo.tileMaxZoom - 1)),
			duration: 420
		});
	}, [mapInfo]);
	(0, import_react.useImperativeHandle)(ref, () => ({
		zoomIn() {
			mapRef.current?.easeTo({
				zoom: (mapRef.current?.getZoom() ?? 0) + .5,
				duration: 220
			});
		},
		zoomOut() {
			mapRef.current?.easeTo({
				zoom: (mapRef.current?.getZoom() ?? 0) - .5,
				duration: 220
			});
		},
		resize() {
			mapRef.current?.resize();
		},
		fit() {
			fitMap(300);
		},
		fitRoute(markers) {
			fitRoute(markers);
		},
		focusMarker(marker) {
			focusMapMarker(marker);
		}
	}), [
		fitMap,
		fitRoute,
		focusMapMarker
	]);
	(0, import_react.useEffect)(() => {
		const container = containerRef.current;
		if (!container) return;
		const abortController = new AbortController();
		const origin = window.location.origin;
		const fallbackSpriteUrl = `${origin}${FALLBACK_SPRITE_URL}`;
		let cancelled = false;
		let cursorFrame = 0;
		let webglRestoreTimer = null;
		let activeSpriteUrl = `${origin}${mapSpriteUrl(mapInfo)}`;
		let usedSpriteFallback = false;
		let spriteFallbackAttempted = false;
		let reportedMissingFallbackImage = false;
		const reportedRuntimeErrors = /* @__PURE__ */ new Set();
		setFatalError(null);
		setMapStatus("loading");
		const reportRuntimeOnce = (error, stage = "runtime", resourceUrl) => {
			const signature = `${stage}:${resourceUrl ?? ""}:${error.message}`;
			if (reportedRuntimeErrors.has(signature)) return;
			reportedRuntimeErrors.add(signature);
			reportError({
				stage,
				error,
				recoverable: true,
				resourceUrl
			});
		};
		async function initialize() {
			let maplibre;
			try {
				maplibre = await import("./maplibre-gl-DNTrUD7m.js");
			} catch (error) {
				if (!cancelled) reportError({
					stage: "import",
					error: toError(error, "Failed to load MapLibre"),
					recoverable: false
				});
				return;
			}
			if (cancelled || !container) return;
			if (!hasWebGLSupport()) {
				reportError({
					stage: "webgl",
					error: /* @__PURE__ */ new Error("WebGL is unavailable in this browser"),
					recoverable: false
				});
				return;
			}
			const primarySpriteUrl = `${origin}${mapSpriteUrl(mapInfo)}`;
			try {
				await verifySpriteAtlas(primarySpriteUrl, abortController.signal);
			} catch (error) {
				if (cancelled || isAbortError$1(error)) return;
				reportError({
					stage: "sprite",
					error: toError(error, "Failed to load the map sprite atlas"),
					recoverable: true,
					resourceUrl: primarySpriteUrl
				});
				activeSpriteUrl = fallbackSpriteUrl;
				usedSpriteFallback = true;
				spriteFallbackAttempted = true;
				try {
					await verifySpriteAtlas(fallbackSpriteUrl, abortController.signal);
				} catch (fallbackError) {
					if (cancelled || isAbortError$1(fallbackError)) return;
					reportError({
						stage: "sprite",
						error: toError(fallbackError, "Failed to load the fallback sprite atlas"),
						recoverable: false,
						resourceUrl: fallbackSpriteUrl
					});
					return;
				}
			}
			if (cancelled) return;
			const bounds = mapBounds(mapInfo);
			const tilePath = resolveMapAssetUrl(mapInfo.tileTemplate, assetBasePath);
			const tileUrl = /^(?:https?:)?\/\//u.test(tilePath) ? tilePath : `${origin}${tilePath}`;
			let map;
			try {
				map = new maplibre.Map({
					container,
					style: {
						version: 8,
						sprite: activeSpriteUrl,
						sources: { "aion2-base-map": {
							type: "raster",
							tiles: [tileUrl],
							tileSize: mapInfo.tileSize,
							minzoom: mapInfo.tileMinZoom,
							maxzoom: mapInfo.tileMaxZoom,
							bounds: [
								bounds[0][0],
								bounds[0][1],
								bounds[1][0],
								bounds[1][1]
							]
						} },
						layers: [{
							id: "aion2-background",
							type: "background",
							paint: { "background-color": "#090c11" }
						}, {
							id: "aion2-base-map-layer",
							type: "raster",
							source: "aion2-base-map",
							paint: {
								"raster-fade-duration": 80,
								"raster-resampling": "linear"
							}
						}]
					},
					center: gamePointToLngLat(mapInfo, mapInfo.width / 2, mapInfo.height / 2),
					zoom: 0,
					minZoom: -2,
					maxZoom: mapInfo.tileMaxZoom + MAX_ZOOM_OVERSCALE,
					attributionControl: false,
					renderWorldCopies: false,
					dragRotate: false,
					pitchWithRotate: false,
					touchPitch: false,
					fadeDuration: 0,
					localIdeographFontFamily: "Arial, sans-serif"
				});
			} catch (error) {
				const mapError = toError(error, "Failed to initialize MapLibre");
				reportError({
					stage: /webgl/i.test(mapError.message) ? "webgl" : "initialization",
					error: mapError,
					recoverable: false
				});
				container.replaceChildren();
				return;
			}
			if (cancelled) {
				map.remove();
				return;
			}
			mapRef.current = map;
			map.touchZoomRotate.disableRotation();
			map.getCanvas().setAttribute("aria-label", accessibleNameRef.current || mapInfo.localizedName || mapInfo.displayName || mapInfo.name);
			const activateSpriteFallback = (error) => {
				if (cancelled || spriteFallbackAttempted) return;
				spriteFallbackAttempted = true;
				usedSpriteFallback = true;
				activeSpriteUrl = fallbackSpriteUrl;
				reportError({
					stage: "sprite",
					error,
					recoverable: true,
					resourceUrl: primarySpriteUrl
				});
				verifySpriteAtlas(fallbackSpriteUrl, abortController.signal).then(() => {
					if (!cancelled && mapRef.current === map) map.setSprite(fallbackSpriteUrl);
				}).catch((fallbackError) => {
					if (cancelled || isAbortError$1(fallbackError)) return;
					reportError({
						stage: "sprite",
						error: toError(fallbackError, "Failed to load the fallback sprite atlas"),
						recoverable: false,
						resourceUrl: fallbackSpriteUrl
					});
				});
			};
			map.on("error", (event) => {
				if (cancelled) return;
				const error = toError(event.error, "MapLibre runtime error");
				if (!usedSpriteFallback && isSpriteRuntimeError(error)) {
					activateSpriteFallback(error);
					return;
				}
				reportRuntimeOnce(error);
			});
			map.on("styleimagemissing", (event) => {
				const error = /* @__PURE__ */ new Error(`Sprite image is missing: ${event.id}`);
				if (!usedSpriteFallback) {
					activateSpriteFallback(error);
					return;
				}
				if (reportedMissingFallbackImage) return;
				reportedMissingFallbackImage = true;
				reportRuntimeOnce(error, "sprite", activeSpriteUrl);
			});
			map.on("webglcontextlost", () => {
				setMapStatus("loading");
				reportRuntimeOnce(/* @__PURE__ */ new Error("The WebGL context was lost"), "webgl");
				if (webglRestoreTimer !== null) window.clearTimeout(webglRestoreTimer);
				webglRestoreTimer = window.setTimeout(() => {
					webglRestoreTimer = null;
					if (cancelled || mapRef.current !== map) return;
					reportError({
						stage: "webgl",
						error: /* @__PURE__ */ new Error("The WebGL context could not be restored"),
						recoverable: false
					});
				}, 1e4);
			});
			map.on("webglcontextrestored", () => {
				map.once("render", () => {
					if (cancelled) return;
					if (webglRestoreTimer !== null) {
						window.clearTimeout(webglRestoreTimer);
						webglRestoreTimer = null;
					}
					appliedFoundRef.current = /* @__PURE__ */ new Set();
					syncFoundState(true);
					setFatalError(null);
					setMapStatus("ready");
					onReadyRef.current?.({
						map,
						spriteUrl: activeSpriteUrl,
						usedSpriteFallback
					});
				});
				map.triggerRepaint();
			});
			map.on("load", () => {
				if (cancelled) return;
				try {
					loadedRef.current = true;
					map.addSource(REGION_SOURCE, {
						type: "geojson",
						data: regionFeatures(mapInfo, regionsRef.current)
					});
					map.addLayer({
						id: REGION_LAYER,
						type: "line",
						source: REGION_SOURCE,
						layout: { visibility: regionsVisibleRef.current ? "visible" : "none" },
						paint: {
							"line-color": "rgba(255,255,255,0.78)",
							"line-width": 2,
							"line-dasharray": [4, 3]
						}
					});
					map.addSource(ROUTE_SOURCE, {
						type: "geojson",
						data: routeFeatures(mapInfo, routeMarkersRef.current)
					});
					map.addLayer({
						id: ROUTE_HALO_LAYER,
						type: "line",
						source: ROUTE_SOURCE,
						paint: {
							"line-color": "rgba(4, 7, 10, 0.88)",
							"line-width": 8,
							"line-opacity": .86
						}
					});
					map.addLayer({
						id: ROUTE_LAYER,
						type: "line",
						source: ROUTE_SOURCE,
						paint: {
							"line-color": "#f2c94c",
							"line-width": 4,
							"line-opacity": .96,
							"line-dasharray": [1.5, 1]
						}
					});
					map.addSource(ROUTE_POINT_SOURCE, {
						type: "geojson",
						data: routePointFeatures(mapInfo, routeMarkersRef.current)
					});
					map.addSource(MARKER_SOURCE, {
						type: "geojson",
						data: markerFeatures(mapInfo, markersRef.current),
						promoteId: "markerId"
					});
					map.addLayer({
						id: MARKER_LABEL_LAYER,
						type: "symbol",
						source: MARKER_SOURCE,
						layout: {
							visibility: labelsVisibleRef.current ? "visible" : "none",
							"icon-image": ["get", "iconId"],
							"icon-size": iconSizeExpression(mapInfo),
							"icon-padding": 2,
							"icon-allow-overlap": true,
							"icon-ignore-placement": true,
							"text-field": ["get", "label"],
							"text-font": ["Arial"],
							"text-size": labelSizeExpression(mapInfo),
							"text-variable-anchor": [
								"left",
								"right",
								"top",
								"bottom"
							],
							"text-radial-offset": 1.1,
							"text-justify": "auto",
							"text-max-width": 18,
							"text-padding": 2,
							"text-optional": true
						},
						paint: {
							"icon-opacity": [
								"case",
								[
									"boolean",
									["feature-state", "found"],
									false
								],
								.38,
								1
							],
							"text-color": "#f8fafc",
							"text-halo-color": "rgba(10, 12, 16, 0.92)",
							"text-halo-width": 2,
							"text-halo-blur": .5,
							"text-opacity": [
								"case",
								[
									"boolean",
									["feature-state", "found"],
									false
								],
								.5,
								1
							]
						}
					});
					map.addLayer({
						id: MARKER_LAYER,
						type: "symbol",
						source: MARKER_SOURCE,
						layout: {
							visibility: labelsVisibleRef.current ? "none" : "visible",
							"icon-image": ["get", "iconId"],
							"icon-size": iconSizeExpression(mapInfo),
							"icon-padding": 2,
							"icon-allow-overlap": true,
							"icon-ignore-placement": true
						},
						paint: { "icon-opacity": [
							"case",
							[
								"boolean",
								["feature-state", "found"],
								false
							],
							.38,
							1
						] }
					});
					map.addLayer({
						id: SELECTED_LAYER,
						type: "symbol",
						source: MARKER_SOURCE,
						filter: [
							"==",
							["get", "markerId"],
							selectedRef.current?.id ?? "__none"
						],
						layout: {
							"icon-image": ["get", "iconId"],
							"icon-size": iconSizeExpression(mapInfo, true),
							"icon-allow-overlap": true,
							"icon-ignore-placement": true
						}
					});
					map.addLayer({
						id: FOUND_LAYER,
						type: "symbol",
						source: MARKER_SOURCE,
						layout: {
							"icon-image": "__found",
							"icon-size": foundIconSizeExpression(mapInfo),
							"icon-offset": [20, 20],
							"icon-allow-overlap": true,
							"icon-ignore-placement": true
						},
						paint: { "icon-opacity": [
							"case",
							[
								"boolean",
								["feature-state", "found"],
								false
							],
							1,
							0
						] }
					});
					map.addLayer({
						id: ROUTE_POINT_LAYER,
						type: "circle",
						source: ROUTE_POINT_SOURCE,
						paint: {
							"circle-radius": routeCircleRadiusExpression(mapInfo),
							"circle-color": "#f2c94c",
							"circle-stroke-color": "rgba(7, 10, 14, 0.92)",
							"circle-stroke-width": 3
						}
					});
					map.addLayer({
						id: ROUTE_POINT_LABEL_LAYER,
						type: "symbol",
						source: ROUTE_POINT_SOURCE,
						layout: {
							"text-field": ["get", "routeIndex"],
							"text-font": ["Consolas"],
							"text-size": routeTextSizeExpression(mapInfo),
							"text-allow-overlap": true,
							"text-ignore-placement": true
						},
						paint: { "text-color": "#0a0e14" }
					});
					syncFoundState(true);
				} catch (error) {
					loadedRef.current = false;
					reportError({
						stage: "initialization",
						error: toError(error, "Failed to configure the map"),
						recoverable: false
					});
					map.remove();
					if (mapRef.current === map) mapRef.current = null;
					return;
				}
				try {
					if (fitMap()) {
						const fittedZoom = map.getZoom();
						map.setMinZoom(Math.max(-2, fittedZoom - 1));
					}
					if (pendingFocusRef.current) focusMapMarker(pendingFocusRef.current);
					if (routeMarkersRef.current.length > 0) fitRoute(routeMarkersRef.current, 0);
				} catch (error) {
					reportRuntimeOnce(toError(error, "Failed to set the initial map camera"));
				}
				setFatalError(null);
				setMapStatus("ready");
				onReadyRef.current?.({
					map,
					spriteUrl: activeSpriteUrl,
					usedSpriteFallback
				});
			});
			map.on("click", INTERACTIVE_MARKER_LAYERS, (event) => {
				const markerId = event.features?.[0]?.properties?.markerId;
				if (typeof markerId === "string") onSelectRef.current(markerId);
			});
			map.on("mouseenter", INTERACTIVE_MARKER_LAYERS, () => {
				map.getCanvas().style.cursor = "pointer";
			});
			map.on("mouseleave", INTERACTIVE_MARKER_LAYERS, () => {
				map.getCanvas().style.cursor = "grab";
			});
			map.on("mousemove", (event) => {
				if (cursorFrame) return;
				cursorFrame = window.requestAnimationFrame(() => {
					cursorFrame = 0;
					const point = lngLatToGamePoint(mapInfo, event.lngLat.lng, event.lngLat.lat);
					const sourceX = clamp(point.x / mapInfo.scaleX, 0, mapInfo.sourceWidth);
					const sourceY = clamp(mapInfo.sourceHeight - point.y / mapInfo.scaleY, 0, mapInfo.sourceHeight);
					onCoordinateRef.current(sourceX, sourceY);
				});
			});
		}
		initialize().catch((error) => {
			if (cancelled || isAbortError$1(error)) return;
			reportError({
				stage: "initialization",
				error: toError(error, "Unexpected map initialization failure"),
				recoverable: false
			});
		});
		return () => {
			cancelled = true;
			abortController.abort();
			if (cursorFrame) window.cancelAnimationFrame(cursorFrame);
			if (webglRestoreTimer !== null) window.clearTimeout(webglRestoreTimer);
			loadedRef.current = false;
			appliedFoundRef.current = /* @__PURE__ */ new Set();
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, [
		assetBasePath,
		fitMap,
		fitRoute,
		focusMapMarker,
		mapInfo,
		reportError,
		syncFoundState
	]);
	(0, import_react.useEffect)(() => {
		mapRef.current?.getCanvas().setAttribute("aria-label", accessibleName || mapInfo.localizedName || mapInfo.displayName || mapInfo.name);
	}, [
		accessibleName,
		mapInfo.displayName,
		mapInfo.localizedName,
		mapInfo.name
	]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || !loadedRef.current) return;
		map.getSource(MARKER_SOURCE)?.setData(markerFeatures(mapInfo, markers));
		syncFoundState(true);
	}, [
		mapInfo,
		markers,
		syncFoundState
	]);
	(0, import_react.useEffect)(() => {
		syncFoundState();
	}, [foundMarkerIds, syncFoundState]);
	(0, import_react.useEffect)(() => {
		syncRoute();
	}, [routeMarkers, syncRoute]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || !loadedRef.current || !map.getLayer(SELECTED_LAYER)) return;
		map.setFilter(SELECTED_LAYER, [
			"==",
			["get", "markerId"],
			selectedMarker?.id ?? "__none"
		]);
	}, [selectedMarker]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || !loadedRef.current) return;
		map.getSource(REGION_SOURCE)?.setData(regionFeatures(mapInfo, regions));
	}, [mapInfo, regions]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || !loadedRef.current || !map.getLayer(REGION_LAYER)) return;
		map.setLayoutProperty(REGION_LAYER, "visibility", showRegions ? "visible" : "none");
	}, [showRegions]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || !loadedRef.current || !map.getLayer(MARKER_LABEL_LAYER) || !map.getLayer(MARKER_LAYER)) return;
		map.setLayoutProperty(MARKER_LABEL_LAYER, "visibility", showLabels ? "visible" : "none");
		map.setLayoutProperty(MARKER_LAYER, "visibility", showLabels ? "none" : "visible");
	}, [showLabels]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "maplibre-map-root",
		"data-map-status": mapStatus,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "maplibre-map-canvas",
			ref: containerRef,
			role: "region",
			"aria-label": accessibleName || mapInfo.localizedName || mapInfo.displayName || mapInfo.name,
			"aria-busy": mapStatus === "loading"
		}), fatalError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "maplibre-engine-badge",
			role: "alert",
			title: unavailableLabel,
			children: unavailableLabel
		})]
	});
});
//#endregion
//#region app/map-app/share-state.ts
var PROGRESS_FORMAT_VERSION = "3";
var LEGACY_PROGRESS_FORMAT_VERSION = "1";
var LEGACY_SPARSE_PROGRESS_FORMAT_VERSION = "2";
var POINT_FORMAT_VERSION = "2";
var ROUTE_FORMAT_VERSION = "2";
var LEGACY_ROUTE_FORMAT_VERSION = "1";
var BUILD_FINGERPRINT_LENGTH = 12;
var MAP_FINGERPRINT_LENGTH = 22;
var MAX_MAP_NAME_BYTES = 128;
var MAX_MARKER_ID_BYTES = 128;
var MAX_PROGRESS_STATE_BYTES = 2800;
var MAX_ROUTE_STATE_BYTES = 2800;
var ALL_MAPS_PROGRESS_SCOPE = { kind: "all-maps" };
function currentMapProgressScope(mapName) {
	return {
		kind: "current-map",
		mapName
	};
}
var BASE64URL_PATTERN = /^[A-Za-z0-9_-]+$/u;
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder("utf-8", { fatal: true });
function bytesToBase64Url(bytes) {
	let binary = "";
	for (let offset = 0; offset < bytes.length; offset += 32768) binary += String.fromCharCode(...bytes.subarray(offset, offset + 32768));
	return globalThis.btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}
function base64UrlLength(byteLength) {
	return Math.floor((byteLength * 4 + 2) / 3);
}
function decodedBase64UrlLength(value) {
	if (value.length % 4 === 1) return null;
	return Math.floor(value.length * 3 / 4);
}
function isBoundedBase64Url(value, maximumBytes, allowEmpty = false) {
	if (value.length === 0 && !allowEmpty || value.length > base64UrlLength(maximumBytes) || value.length > 0 && !BASE64URL_PATTERN.test(value)) return false;
	const decodedLength = decodedBase64UrlLength(value);
	return decodedLength !== null && decodedLength <= maximumBytes;
}
function base64UrlToBytes(value, options) {
	if (!isBoundedBase64Url(value, options.maxBytes, options.allowEmpty)) return null;
	const expectedLength = decodedBase64UrlLength(value);
	if (expectedLength === null || expectedLength > options.maxBytes || options.exactBytes !== void 0 && expectedLength !== options.exactBytes) return null;
	try {
		const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
		const padding = "=".repeat((4 - normalized.length % 4) % 4);
		const binary = globalThis.atob(`${normalized}${padding}`);
		if (binary.length !== expectedLength) return null;
		const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
		return bytesToBase64Url(bytes) === value ? bytes : null;
	} catch {
		return null;
	}
}
function boundedTextBytes(value, maximumBytes) {
	if (typeof value !== "string" || value.length === 0) return null;
	const bytes = textEncoder.encode(value);
	return bytes.length <= maximumBytes ? bytes : null;
}
function decodeBoundedText(bytes, maximumBytes) {
	if (bytes.length === 0 || bytes.length > maximumBytes) return null;
	try {
		const value = textDecoder.decode(bytes);
		const canonicalBytes = textEncoder.encode(value);
		if (canonicalBytes.length !== bytes.length) return null;
		for (let index = 0; index < bytes.length; index += 1) if (canonicalBytes[index] !== bytes[index]) return null;
		return value;
	} catch {
		return null;
	}
}
function fingerprintParts(parts) {
	let h1 = 1779033703;
	let h2 = 3144134277;
	let h3 = 1013904242;
	let h4 = 2773480762;
	const mix = (byte) => {
		h1 = Math.imul(h1 ^ byte, 597399067);
		h2 = Math.imul(h2 ^ byte, 2869860233);
		h3 = Math.imul(h3 ^ byte, 951274213);
		h4 = Math.imul(h4 ^ byte, 2716044179);
	};
	for (const part of parts) {
		const bytes = textEncoder.encode(part);
		for (let shift = 0; shift < 32; shift += 8) mix(bytes.length >>> shift & 255);
		for (const byte of bytes) mix(byte);
	}
	h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
	h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
	h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
	h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
	const words = [
		h1 ^ h2 ^ h3 ^ h4,
		h2 ^ h1,
		h3 ^ h1,
		h4 ^ h1
	];
	const bytes = new Uint8Array(16);
	const view = new DataView(bytes.buffer);
	words.forEach((word, index) => view.setUint32(index * 4, word >>> 0));
	return bytesToBase64Url(bytes);
}
function encodedMapScope(mapName) {
	const bytes = boundedTextBytes(mapName, MAX_MAP_NAME_BYTES);
	return bytes ? bytesToBase64Url(bytes) : null;
}
function mapMarkerLayout(payload, mapName) {
	const matchingMaps = payload.maps.filter((candidate) => candidate.name === mapName);
	if (matchingMaps.length !== 1 || !encodedMapScope(mapName)) return null;
	const [map] = matchingMaps;
	const markers = payload.markersByMap[mapName] ?? [];
	const markerIds = [];
	const markerIdSet = /* @__PURE__ */ new Set();
	for (const marker of markers) {
		if (!boundedTextBytes(marker.id, MAX_MARKER_ID_BYTES) || markerIdSet.has(marker.id)) return null;
		markerIds.push(marker.id);
		markerIdSet.add(marker.id);
	}
	return {
		mapName,
		markerIds,
		markerIdSet,
		fingerprint: fingerprintParts([
			"map-marker-layout-v1",
			mapName,
			typeof map.id === "string" ? map.id : "",
			String(markerIds.length),
			...markerIds
		])
	};
}
function normalizeProgressScope(scope) {
	if (typeof scope === "string") return currentMapProgressScope(scope);
	if (scope.kind === "all-maps") return ALL_MAPS_PROGRESS_SCOPE;
	if (scope.kind !== "current-map" || !encodedMapScope(scope.mapName)) return null;
	return currentMapProgressScope(scope.mapName);
}
function progressLayout(payload, requestedScope) {
	const scope = normalizeProgressScope(requestedScope);
	if (!scope) return null;
	const selectedMaps = scope.kind === "current-map" ? payload.maps.filter((map) => map.name === scope.mapName) : payload.maps;
	if (scope.kind === "current-map" && selectedMaps.length !== 1) return null;
	const maps = [];
	const fingerprintInput = ["progress-layout-v1", scope.kind];
	let totalCount = 0;
	for (const map of selectedMaps) {
		const layout = mapMarkerLayout(payload, map.name);
		if (!layout) return null;
		maps.push({
			mapName: map.name,
			markerIds: layout.markerIds
		});
		fingerprintInput.push(map.name, layout.fingerprint, String(layout.markerIds.length));
		totalCount += layout.markerIds.length;
	}
	return {
		scope,
		scopeSegment: scope.kind === "current-map" ? `m${encodedMapScope(scope.mapName)}` : "a",
		maps,
		fingerprint: fingerprintParts(fingerprintInput),
		totalCount
	};
}
function appendVarint(bytes, value) {
	let remaining = value >>> 0;
	do {
		let byte = remaining & 127;
		remaining >>>= 7;
		if (remaining > 0) byte |= 128;
		bytes.push(byte);
	} while (remaining > 0);
}
function encodeVarints(values) {
	const bytes = [];
	for (const value of values) appendVarint(bytes, value);
	return Uint8Array.from(bytes);
}
function decodeVarints(bytes, maximumValues) {
	const values = [];
	let value = 0;
	let byteCount = 0;
	for (const byte of bytes) {
		const chunk = byte & 127;
		byteCount += 1;
		if (byteCount > 5 || byteCount === 5 && chunk > 15) return null;
		value += chunk * 2 ** ((byteCount - 1) * 7);
		if ((byte & 128) === 0) {
			if (byteCount > 1 && chunk === 0) return null;
			values.push(value);
			if (values.length > maximumValues) return null;
			value = 0;
			byteCount = 0;
		}
	}
	if (byteCount !== 0) return null;
	const canonical = encodeVarints(values);
	if (canonical.length !== bytes.length) return null;
	for (let index = 0; index < bytes.length; index += 1) if (canonical[index] !== bytes[index]) return null;
	return values;
}
function readVarint(bytes, startOffset) {
	let value = 0;
	let byteCount = 0;
	let offset = startOffset;
	while (offset < bytes.length) {
		const byte = bytes[offset];
		const chunk = byte & 127;
		byteCount += 1;
		if (byteCount > 5 || byteCount === 5 && chunk > 15) return null;
		value += chunk * 2 ** ((byteCount - 1) * 7);
		offset += 1;
		if ((byte & 128) === 0) {
			if (byteCount > 1 && chunk === 0) return null;
			return {
				value,
				offset
			};
		}
	}
	return null;
}
function progressFromIndexes(layout, foundIndexes) {
	const byMapName = /* @__PURE__ */ new Map();
	let markerIndex = 0;
	let foundCount = 0;
	for (const map of layout.maps) {
		const foundMarkerIds = /* @__PURE__ */ new Set();
		for (const markerId of map.markerIds) {
			if (foundIndexes.has(markerIndex)) {
				foundMarkerIds.add(markerId);
				foundCount += 1;
			}
			markerIndex += 1;
		}
		byMapName.set(map.mapName, foundMarkerIds);
	}
	return {
		byMapName,
		foundCount,
		totalCount: markerIndex,
		scope: layout.scope
	};
}
function decodeProgressState(encodedState, totalCount) {
	const expectedByteCount = Math.ceil(totalCount / 8);
	if (expectedByteCount > MAX_PROGRESS_STATE_BYTES || encodedState.length === 0) return null;
	const mode = encodedState[0];
	const encodedBytes = encodedState.slice(1);
	const foundIndexes = /* @__PURE__ */ new Set();
	if (mode === "b") {
		if (encodedBytes.length !== base64UrlLength(expectedByteCount)) return null;
		const bytes = base64UrlToBytes(encodedBytes, {
			maxBytes: expectedByteCount,
			exactBytes: expectedByteCount,
			allowEmpty: expectedByteCount === 0
		});
		if (!bytes) return null;
		if (totalCount % 8 !== 0 && bytes.length > 0) {
			const validMask = (1 << totalCount % 8) - 1;
			if ((bytes[bytes.length - 1] & ~validMask) !== 0) return null;
		}
		for (let markerIndex = 0; markerIndex < totalCount; markerIndex += 1) if ((bytes[markerIndex >> 3] & 1 << (markerIndex & 7)) !== 0) foundIndexes.add(markerIndex);
		return foundIndexes;
	}
	if (mode !== "s" || expectedByteCount === 0) return null;
	const maximumSparseBytes = expectedByteCount - 1;
	if (encodedBytes.length > base64UrlLength(maximumSparseBytes)) return null;
	const bytes = base64UrlToBytes(encodedBytes, {
		maxBytes: maximumSparseBytes,
		allowEmpty: true
	});
	if (!bytes) return null;
	const deltas = decodeVarints(bytes, totalCount);
	if (!deltas) return null;
	let markerIndex = -1;
	for (const delta of deltas) {
		if (delta === 0) return null;
		markerIndex += delta;
		if (markerIndex < 0 || markerIndex >= totalCount) return null;
		foundIndexes.add(markerIndex);
	}
	return foundIndexes;
}
function hasValidProgressStateEnvelope(encodedState) {
	return (encodedState[0] === "b" || encodedState[0] === "s") && isBoundedBase64Url(encodedState.slice(1), MAX_PROGRESS_STATE_BYTES, true);
}
function legacyProgressLayout(payload) {
	const maps = [];
	let totalCount = 0;
	for (const map of payload.maps) {
		const markerIds = (payload.markersByMap[map.name] ?? []).map((marker) => marker.id);
		maps.push({
			mapName: map.name,
			markerIds
		});
		totalCount += markerIds.length;
	}
	if (Math.ceil(totalCount / 8) > MAX_PROGRESS_STATE_BYTES) return null;
	return {
		scope: ALL_MAPS_PROGRESS_SCOPE,
		scopeSegment: "a",
		maps,
		fingerprint: "",
		totalCount
	};
}
function expectedLegacyBuild(payload) {
	const build = payload.source?.build;
	return typeof build === "string" ? build.slice(0, BUILD_FINGERPRINT_LENGTH) : "";
}
function decodeLegacyProgress(payload, token) {
	const [formatVersion, buildFingerprint, encodedBytes, ...extra] = token.split(".");
	const layout = legacyProgressLayout(payload);
	if (!layout || extra.length > 0 || formatVersion !== LEGACY_PROGRESS_FORMAT_VERSION || buildFingerprint !== expectedLegacyBuild(payload) || !buildFingerprint || encodedBytes === void 0 || encodedBytes.length !== base64UrlLength(Math.ceil(layout.totalCount / 8))) return null;
	const bytes = base64UrlToBytes(encodedBytes, {
		maxBytes: Math.ceil(layout.totalCount / 8),
		exactBytes: Math.ceil(layout.totalCount / 8),
		allowEmpty: layout.totalCount === 0
	});
	if (!bytes) return null;
	if (layout.totalCount % 8 !== 0 && bytes.length > 0) {
		const validMask = (1 << layout.totalCount % 8) - 1;
		if ((bytes[bytes.length - 1] & ~validMask) !== 0) return null;
	}
	const foundIndexes = /* @__PURE__ */ new Set();
	for (let markerIndex = 0; markerIndex < layout.totalCount; markerIndex += 1) if ((bytes[markerIndex >> 3] & 1 << (markerIndex & 7)) !== 0) foundIndexes.add(markerIndex);
	return progressFromIndexes(layout, foundIndexes);
}
function decodeLegacySparseProgress(payload, token) {
	const [formatVersion, buildFingerprint, encodedState, ...extra] = token.split(".");
	const layout = legacyProgressLayout(payload);
	if (!layout || extra.length > 0 || formatVersion !== LEGACY_SPARSE_PROGRESS_FORMAT_VERSION || buildFingerprint !== expectedLegacyBuild(payload) || !buildFingerprint || !encodedState) return null;
	const foundIndexes = decodeProgressState(encodedState, layout.totalCount);
	return foundIndexes ? progressFromIndexes(layout, foundIndexes) : null;
}
function encodeSharedProgress(payload, foundForMapOrMapName, scopeOrFoundMarkerIds) {
	let foundForMap;
	let scope;
	if (typeof foundForMapOrMapName === "string") {
		const foundMarkerIds = scopeOrFoundMarkerIds;
		if (!foundMarkerIds || typeof foundMarkerIds.has !== "function") throw new TypeError("Current-map progress requires a marker ID set");
		const mapName = foundForMapOrMapName;
		foundForMap = (candidateMapName) => candidateMapName === mapName ? foundMarkerIds : /* @__PURE__ */ new Set();
		scope = currentMapProgressScope(mapName);
	} else {
		foundForMap = foundForMapOrMapName;
		scope = scopeOrFoundMarkerIds ?? ALL_MAPS_PROGRESS_SCOPE;
	}
	const layout = progressLayout(payload, scope);
	if (!layout) throw new RangeError("Unable to encode progress for the requested map scope");
	const bitset = new Uint8Array(Math.ceil(layout.totalCount / 8));
	if (bitset.length > MAX_PROGRESS_STATE_BYTES) throw new RangeError("Shared progress exceeds the token size limit");
	const foundIndexes = [];
	let markerIndex = 0;
	for (const map of layout.maps) {
		const foundMarkerIds = foundForMap(map.mapName);
		for (const markerId of map.markerIds) {
			if (foundMarkerIds.has(markerId)) {
				bitset[markerIndex >> 3] |= 1 << (markerIndex & 7);
				foundIndexes.push(markerIndex);
			}
			markerIndex += 1;
		}
	}
	const sparseBytes = encodeVarints(foundIndexes.map((index, position) => position === 0 ? index + 1 : index - foundIndexes[position - 1]));
	const encodedState = sparseBytes.length < bitset.length ? `s${bytesToBase64Url(sparseBytes)}` : `b${bytesToBase64Url(bitset)}`;
	const token = `${PROGRESS_FORMAT_VERSION}.${layout.scopeSegment}.${layout.fingerprint}.${encodedState}`;
	if (token.length > 4096) throw new RangeError("Shared progress exceeds the token size limit");
	return {
		token,
		foundCount: foundIndexes.length,
		totalCount: layout.totalCount,
		scope: layout.scope
	};
}
function encodeSharedMapProgress(payload, mapName, foundMarkerIds) {
	return encodeSharedProgress(payload, mapName, foundMarkerIds);
}
function decodeSharedProgress(payload, token) {
	if (typeof token !== "string" || token.length === 0 || token.length > 4096) return null;
	if (token.startsWith(`${LEGACY_PROGRESS_FORMAT_VERSION}.`)) return decodeLegacyProgress(payload, token);
	if (token.startsWith(`${LEGACY_SPARSE_PROGRESS_FORMAT_VERSION}.`)) return decodeLegacySparseProgress(payload, token);
	const [formatVersion, scopeSegment, fingerprint, encodedState, ...extra] = token.split(".");
	if (extra.length > 0 || formatVersion !== PROGRESS_FORMAT_VERSION || !scopeSegment || !fingerprint || fingerprint.length !== MAP_FINGERPRINT_LENGTH || !BASE64URL_PATTERN.test(fingerprint) || !encodedState || !hasValidProgressStateEnvelope(encodedState)) return null;
	let scope;
	if (scopeSegment === "a") scope = ALL_MAPS_PROGRESS_SCOPE;
	else if (scopeSegment.startsWith("m")) {
		const encodedMapName = scopeSegment.slice(1);
		const mapNameBytes = base64UrlToBytes(encodedMapName, { maxBytes: MAX_MAP_NAME_BYTES });
		if (!mapNameBytes) return null;
		const mapName = decodeBoundedText(mapNameBytes, MAX_MAP_NAME_BYTES);
		if (!mapName || encodedMapScope(mapName) !== encodedMapName) return null;
		scope = currentMapProgressScope(mapName);
	} else return null;
	const layout = progressLayout(payload, scope);
	if (!layout || layout.scopeSegment !== scopeSegment || layout.fingerprint !== fingerprint) return null;
	const foundIndexes = decodeProgressState(encodedState, layout.totalCount);
	return foundIndexes ? progressFromIndexes(layout, foundIndexes) : null;
}
function encodeSharedPoint(payload, mapName, markerId) {
	const layout = mapMarkerLayout(payload, mapName);
	const mapScope = encodedMapScope(mapName);
	const markerIdBytes = boundedTextBytes(markerId, MAX_MARKER_ID_BYTES);
	if (!layout || !mapScope || !markerIdBytes || !layout.markerIdSet.has(markerId)) return null;
	const token = `${POINT_FORMAT_VERSION}.${mapScope}.${layout.fingerprint}.${bytesToBase64Url(markerIdBytes)}`;
	return token.length <= 512 ? token : null;
}
function decodeSharedPoint(payload, mapName, token) {
	if (typeof token !== "string" || token.length === 0 || token.length > 512) return null;
	const layout = mapMarkerLayout(payload, mapName);
	if (!layout) return null;
	if (!token.startsWith(`${POINT_FORMAT_VERSION}.`)) {
		if (boundedTextBytes(token, MAX_MARKER_ID_BYTES) && layout.markerIdSet.has(token)) return token;
		if (!/^[0-9a-z]+$/iu.test(token)) return null;
		const markerIndex = Number.parseInt(token, 36);
		return Number.isSafeInteger(markerIndex) ? layout.markerIds[markerIndex] ?? null : null;
	}
	const [formatVersion, mapScope, fingerprint, encodedMarkerId, ...extra] = token.split(".");
	const expectedMapScope = encodedMapScope(mapName);
	if (!layout || !expectedMapScope || extra.length > 0 || formatVersion !== POINT_FORMAT_VERSION || mapScope !== expectedMapScope || !fingerprint || fingerprint !== layout.fingerprint || fingerprint.length !== MAP_FINGERPRINT_LENGTH || encodedMarkerId === void 0) return null;
	const markerIdBytes = base64UrlToBytes(encodedMarkerId, { maxBytes: MAX_MARKER_ID_BYTES });
	if (!markerIdBytes) return null;
	const markerId = decodeBoundedText(markerIdBytes, MAX_MARKER_ID_BYTES);
	return markerId && layout.markerIdSet.has(markerId) ? markerId : null;
}
function encodeSharedRoute(payload, mapName, markerIds) {
	if (markerIds.length < 2 || markerIds.length > 64 || new Set(markerIds).size !== markerIds.length) return null;
	const layout = mapMarkerLayout(payload, mapName);
	const mapScope = encodedMapScope(mapName);
	if (!layout || !mapScope || markerIds.some((markerId) => !layout.markerIdSet.has(markerId))) return null;
	const state = [];
	appendVarint(state, markerIds.length);
	for (const markerId of markerIds) {
		const markerIdBytes = boundedTextBytes(markerId, MAX_MARKER_ID_BYTES);
		if (!markerIdBytes) return null;
		appendVarint(state, markerIdBytes.length);
		state.push(...markerIdBytes);
		if (state.length > MAX_ROUTE_STATE_BYTES) return null;
	}
	const token = `${ROUTE_FORMAT_VERSION}.${mapScope}.${layout.fingerprint}.s${bytesToBase64Url(Uint8Array.from(state))}`;
	return token.length <= 4096 ? token : null;
}
function decodeSharedRoute(payload, mapName, token) {
	if (typeof token !== "string" || token.length === 0 || token.length > 4096) return null;
	if (token.startsWith(`${LEGACY_ROUTE_FORMAT_VERSION}.`)) {
		const [formatVersion, buildFingerprint, encodedIndexes, ...extra] = token.split(".");
		if (extra.length > 0 || formatVersion !== LEGACY_ROUTE_FORMAT_VERSION || buildFingerprint !== expectedLegacyBuild(payload) || !encodedIndexes) return null;
		const bytes = base64UrlToBytes(encodedIndexes, { maxBytes: MAX_ROUTE_STATE_BYTES });
		const indexes = bytes ? decodeVarints(bytes, 64) : null;
		const markers = payload.markersByMap[mapName] ?? [];
		if (!indexes || indexes.length < 2 || indexes.length > 64) return null;
		const markerIds = indexes.map((index) => markers[index]?.id);
		if (markerIds.some((markerId) => !markerId)) return null;
		return new Set(markerIds).size === markerIds.length ? markerIds : null;
	}
	const [formatVersion, mapScope, fingerprint, encodedState, ...extra] = token.split(".");
	const layout = mapMarkerLayout(payload, mapName);
	const expectedMapScope = encodedMapScope(mapName);
	if (!layout || !expectedMapScope || extra.length > 0 || formatVersion !== ROUTE_FORMAT_VERSION || mapScope !== expectedMapScope || !fingerprint || fingerprint !== layout.fingerprint || fingerprint.length !== MAP_FINGERPRINT_LENGTH || !encodedState || encodedState[0] !== "s") return null;
	const bytes = base64UrlToBytes(encodedState.slice(1), { maxBytes: MAX_ROUTE_STATE_BYTES });
	if (!bytes) return null;
	const countValue = readVarint(bytes, 0);
	if (!countValue || countValue.value < 2 || countValue.value > 64) return null;
	const markerIds = [];
	let offset = countValue.offset;
	for (let index = 0; index < countValue.value; index += 1) {
		const lengthValue = readVarint(bytes, offset);
		if (!lengthValue || lengthValue.value < 1 || lengthValue.value > MAX_MARKER_ID_BYTES || lengthValue.offset + lengthValue.value > bytes.length) return null;
		const markerId = decodeBoundedText(bytes.subarray(lengthValue.offset, lengthValue.offset + lengthValue.value), MAX_MARKER_ID_BYTES);
		if (!markerId || !layout.markerIdSet.has(markerId)) return null;
		markerIds.push(markerId);
		offset = lengthValue.offset + lengthValue.value;
	}
	if (offset !== bytes.length || new Set(markerIds).size !== markerIds.length) return null;
	return markerIds;
}
//#endregion
//#region app/map-app/share-card.ts
var CARD_WIDTH = 1200;
var CARD_HEIGHT = 630;
var DEFAULT_SHARE_IMAGE_TIMEOUT_MS = 6e3;
var MAX_SHARE_IMAGE_TIMEOUT_MS = 3e4;
function abortError() {
	const error = /* @__PURE__ */ new Error("Share image generation was cancelled");
	error.name = "AbortError";
	return error;
}
function isAbortError(error) {
	return error instanceof Error && error.name === "AbortError";
}
function throwIfAborted(signal) {
	if (signal?.aborted) throw abortError();
}
function imageTimeout(options) {
	if (options.imageTimeoutMs === void 0) return DEFAULT_SHARE_IMAGE_TIMEOUT_MS;
	if (!Number.isFinite(options.imageTimeoutMs)) return DEFAULT_SHARE_IMAGE_TIMEOUT_MS;
	return Math.min(MAX_SHARE_IMAGE_TIMEOUT_MS, Math.max(0, Math.floor(options.imageTimeoutMs)));
}
function loadImage(url, options) {
	return new Promise((resolve, reject) => {
		if (options.signal?.aborted) {
			reject(abortError());
			return;
		}
		const image = new Image();
		let settled = false;
		let timer = null;
		const cleanup = () => {
			if (timer !== null) globalThis.clearTimeout(timer);
			options.signal?.removeEventListener("abort", onAbort);
			image.onload = null;
			image.onerror = null;
		};
		const fail = (error, cancelRequest = false) => {
			if (settled) return;
			settled = true;
			cleanup();
			if (cancelRequest) try {
				image.src = "";
			} catch {}
			reject(error);
		};
		const onAbort = () => fail(abortError(), true);
		image.decoding = "async";
		image.onload = () => {
			if (settled) return;
			settled = true;
			cleanup();
			resolve(image);
		};
		image.onerror = () => fail(/* @__PURE__ */ new Error(`Unable to load share image asset: ${url}`));
		options.signal?.addEventListener("abort", onAbort, { once: true });
		timer = globalThis.setTimeout(() => {
			const error = /* @__PURE__ */ new Error(`Timed out loading share image asset: ${url}`);
			error.name = "TimeoutError";
			fail(error, true);
		}, imageTimeout(options));
		image.src = url;
	});
}
async function loadOptionalImage(url, options) {
	if (!url) return null;
	try {
		return await loadImage(url, options);
	} catch (error) {
		if (isAbortError(error)) throw error;
		return null;
	}
}
function roundedRectPath(context, x, y, width, height, radius) {
	const safeRadius = Math.min(radius, width / 2, height / 2);
	context.beginPath();
	context.moveTo(x + safeRadius, y);
	context.lineTo(x + width - safeRadius, y);
	context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
	context.lineTo(x + width, y + height - safeRadius);
	context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
	context.lineTo(x + safeRadius, y + height);
	context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
	context.lineTo(x, y + safeRadius);
	context.quadraticCurveTo(x, y, x + safeRadius, y);
	context.closePath();
}
function drawImageCover(context, image, sourceWidth, sourceHeight, x, y, width, height) {
	const scale = Math.max(width / sourceWidth, height / sourceHeight);
	const cropWidth = width / scale;
	const cropHeight = height / scale;
	const sourceX = (sourceWidth - cropWidth) / 2;
	const sourceY = (sourceHeight - cropHeight) / 2;
	context.drawImage(image, sourceX, sourceY, cropWidth, cropHeight, x, y, width, height);
}
function fontFamily(locale) {
	if (locale === "zh-Hant") return "\"Microsoft JhengHei\", \"Noto Sans TC\", sans-serif";
	if (locale === "zh-Hans") return "\"Microsoft YaHei\", \"Noto Sans SC\", sans-serif";
	if (locale === "ja") return "\"Yu Gothic\", \"Noto Sans JP\", sans-serif";
	if (locale === "ko") return "\"Malgun Gothic\", \"Noto Sans KR\", sans-serif";
	if (locale === "ru") return "\"Segoe UI\", \"Noto Sans\", Arial, sans-serif";
	return "\"Segoe UI\", Arial, sans-serif";
}
function numberLocale(locale) {
	return numberLocaleForMapLocale(locale);
}
function fitText(context, value, maxWidth, initialSize, minimumSize, family) {
	let size = initialSize;
	while (size > minimumSize) {
		context.font = `750 ${size}px ${family}`;
		if (context.measureText(value).width <= maxWidth) break;
		size -= 2;
	}
	return size;
}
function ellipsize(context, value, maxWidth) {
	if (context.measureText(value).width <= maxWidth) return value;
	let shortened = value;
	while (shortened.length > 1 && context.measureText(`${shortened}…`).width > maxWidth) shortened = shortened.slice(0, -1);
	return `${shortened}…`;
}
async function createCardBase(options) {
	throwIfAborted(options.signal);
	const canvas = document.createElement("canvas");
	canvas.width = CARD_WIDTH;
	canvas.height = CARD_HEIGHT;
	const context = canvas.getContext("2d");
	if (!context) throw new Error("Canvas 2D rendering is unavailable");
	context.fillStyle = "#0a0e14";
	context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
	const landmark = await loadOptionalImage(`/landmarks/${options.map.slug}.webp`, options);
	if (landmark && landmark.naturalWidth > 0 && landmark.naturalHeight > 0) drawImageCover(context, landmark, landmark.naturalWidth, landmark.naturalHeight, 0, 0, CARD_WIDTH, CARD_HEIGHT);
	const shade = context.createLinearGradient(0, 0, CARD_WIDTH, 0);
	shade.addColorStop(0, "rgba(5, 8, 12, 0.96)");
	shade.addColorStop(.5, "rgba(7, 10, 15, 0.7)");
	shade.addColorStop(1, "rgba(6, 9, 13, 0.16)");
	context.fillStyle = shade;
	context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
	const family = fontFamily(options.locale);
	context.fillStyle = "#f2c94c";
	context.font = `760 18px ${family}`;
	context.fillText("AION2 INTERACTIVE MAP", 52, 62);
	return {
		canvas,
		context,
		family
	};
}
function drawPanel(context, x, y, width, height) {
	roundedRectPath(context, x, y, width, height, 8);
	context.fillStyle = "rgba(6, 10, 15, 0.78)";
	context.fill();
	context.strokeStyle = "rgba(226, 232, 240, 0.22)";
	context.lineWidth = 2;
	context.stroke();
}
function drawLinkBand(context, family, linkLabel, shareUrl) {
	context.fillStyle = "rgba(4, 7, 10, 0.94)";
	context.fillRect(0, 552, CARD_WIDTH, 78);
	context.fillStyle = "rgba(242, 201, 76, 0.82)";
	context.font = `720 14px ${family}`;
	context.fillText(linkLabel, 52, 581);
	context.fillStyle = "rgba(241, 245, 249, 0.92)";
	context.font = "500 16px Consolas, \"Courier New\", monospace";
	context.fillText(formatShareUrlForCard(shareUrl), 52, 610);
}
function canvasToBlob(canvas, signal) {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(abortError());
			return;
		}
		let settled = false;
		const cleanup = () => signal?.removeEventListener("abort", onAbort);
		const onAbort = () => {
			if (settled) return;
			settled = true;
			cleanup();
			reject(abortError());
		};
		signal?.addEventListener("abort", onAbort, { once: true });
		try {
			canvas.toBlob((blob) => {
				if (settled) return;
				settled = true;
				cleanup();
				if (blob) resolve(blob);
				else reject(/* @__PURE__ */ new Error("Unable to encode the share image"));
			}, "image/png");
		} catch (error) {
			settled = true;
			cleanup();
			reject(error);
		}
	});
}
function formatShareUrlForCard(value, maxLength = 112) {
	const limit = Number.isFinite(maxLength) ? Math.max(0, Math.floor(maxLength)) : maxLength === Number.POSITIVE_INFINITY ? value.length : 0;
	if (value.length <= limit) return value;
	if (limit <= 3) return value.slice(0, limit);
	const availableLength = limit - 3;
	const tailLength = Math.min(12, Math.floor(availableLength / 3));
	const headLength = availableLength - tailLength;
	const tail = tailLength > 0 ? value.slice(-tailLength) : "";
	return `${value.slice(0, headLength)}...${tail}`;
}
function progressShareCardFilename(map, locale) {
	return `aion2-${map.slug}-${locale}-progress.png`;
}
function pointShareCardFilename(map, locale) {
	return `aion2-${map.slug}-${locale}-point.png`;
}
function routeShareCardFilename(map, locale) {
	return `aion2-${map.slug}-${locale}-route.png`;
}
async function renderProgressShareCard(options) {
	const { canvas, context, family } = await createCardBase(options);
	const icons = await Promise.all(options.breakdown.slice(0, 8).map((item) => loadOptionalImage(item.iconUrl, options)));
	const titleSize = fitText(context, options.mapName, 520, 50, 30, family);
	context.fillStyle = "#f8fafc";
	context.font = `750 ${titleSize}px ${family}`;
	context.fillText(options.mapName, 52, 138);
	context.fillStyle = "rgba(226, 232, 240, 0.72)";
	context.font = `650 20px ${family}`;
	context.fillText(options.progressLabel, 52, 225);
	const locale = numberLocale(options.locale);
	const progressValue = `${options.foundCount.toLocaleString(locale)} / ${options.totalCount.toLocaleString(locale)}`;
	const percentage = options.totalCount > 0 ? Math.round(options.foundCount / options.totalCount * 100) : 0;
	context.fillStyle = "#ffffff";
	context.font = `780 64px ${family}`;
	context.fillText(progressValue, 52, 310);
	roundedRectPath(context, 52, 354, 500, 14, 7);
	context.fillStyle = "rgba(255, 255, 255, 0.14)";
	context.fill();
	if (percentage > 0) {
		roundedRectPath(context, 52, 354, Math.max(14, 500 * (percentage / 100)), 14, 7);
		context.fillStyle = "#4dd6c8";
		context.fill();
	}
	context.fillStyle = "#9cebe4";
	context.font = `720 22px ${family}`;
	context.fillText(`${percentage}%`, 52, 410);
	drawPanel(context, 620, 54, 528, 468);
	context.fillStyle = "#f8fafc";
	context.font = `740 21px ${family}`;
	context.fillText(options.breakdownLabel, 648, 91);
	if (options.breakdown.length === 0) {
		context.fillStyle = "rgba(226, 232, 240, 0.66)";
		context.font = `600 18px ${family}`;
		context.fillText(options.noBreakdownLabel, 648, 145);
	}
	options.breakdown.slice(0, 8).forEach((item, index) => {
		const y = 120 + index * 48;
		const icon = icons[index];
		if (icon) context.drawImage(icon, 648, y, 30, 30);
		else {
			context.beginPath();
			context.arc(663, y + 15, 7, 0, Math.PI * 2);
			context.fillStyle = "#4dd6c8";
			context.fill();
		}
		context.fillStyle = "rgba(248, 250, 252, 0.94)";
		context.font = `650 17px ${family}`;
		context.fillText(ellipsize(context, item.name, 310), 692, y + 21);
		context.fillStyle = item.foundCount === item.totalCount ? "#7de2b3" : "#cbd5e1";
		context.font = "700 17px Consolas, \"Courier New\", monospace";
		const count = `${item.foundCount.toLocaleString(locale)}/${item.totalCount.toLocaleString(locale)}`;
		context.fillText(count, 1118 - context.measureText(count).width, y + 21);
	});
	drawLinkBand(context, family, options.linkLabel, options.shareUrl);
	return canvasToBlob(canvas, options.signal);
}
async function renderPointShareCard(options) {
	const { canvas, context, family } = await createCardBase(options);
	const icon = await loadOptionalImage(options.iconUrl, options);
	context.fillStyle = "rgba(226, 232, 240, 0.72)";
	context.font = `650 18px ${family}`;
	context.fillText(options.mapName, 52, 110);
	const titleSize = fitText(context, options.markerName, 520, 50, 28, family);
	context.fillStyle = "#ffffff";
	context.font = `760 ${titleSize}px ${family}`;
	context.fillText(options.markerName, 52, 180);
	context.fillStyle = "#9cebe4";
	context.font = `680 20px ${family}`;
	context.fillText(`${options.categoryLabel} / ${options.subtypeLabel}`, 52, 225);
	drawPanel(context, 620, 54, 528, 468);
	if (icon) context.drawImage(icon, 660, 94, 92, 92);
	context.fillStyle = "#f2c94c";
	context.font = `720 16px ${family}`;
	context.fillText(options.pointLabel, 782, 112);
	context.fillStyle = "#f8fafc";
	context.font = `740 24px ${family}`;
	context.fillText(ellipsize(context, options.markerName, 326), 782, 151);
	context.fillStyle = "rgba(226, 232, 240, 0.7)";
	context.font = `600 17px ${family}`;
	context.fillText(ellipsize(context, options.subtypeLabel, 326), 782, 181);
	context.strokeStyle = "rgba(226, 232, 240, 0.16)";
	context.beginPath();
	context.moveTo(650, 216);
	context.lineTo(1118, 216);
	context.stroke();
	[[options.coordinatesLabel, options.coordinates], [options.regionLabel, options.region || "-"]].forEach(([label, value], index) => {
		const y = 270 + index * 86;
		context.fillStyle = "rgba(226, 232, 240, 0.62)";
		context.font = `620 16px ${family}`;
		context.fillText(label, 654, y);
		context.fillStyle = "#ffffff";
		context.font = index === 0 ? "720 25px Consolas, \"Courier New\", monospace" : `720 23px ${family}`;
		context.fillText(ellipsize(context, value, 430), 654, y + 38);
	});
	drawLinkBand(context, family, options.linkLabel, options.shareUrl);
	return canvasToBlob(canvas, options.signal);
}
async function renderRouteShareCard(options) {
	const { canvas, context, family } = await createCardBase(options);
	const icons = await Promise.all(options.steps.slice(0, 8).map((step) => loadOptionalImage(step.iconUrl, options)));
	const titleSize = fitText(context, options.mapName, 520, 50, 30, family);
	context.fillStyle = "#f8fafc";
	context.font = `750 ${titleSize}px ${family}`;
	context.fillText(options.mapName, 52, 138);
	context.fillStyle = "rgba(226, 232, 240, 0.72)";
	context.font = `650 20px ${family}`;
	context.fillText(options.routeLabel, 52, 225);
	context.fillStyle = "#ffffff";
	context.font = `780 64px ${family}`;
	context.fillText(String(options.steps.length), 52, 310);
	context.fillStyle = "#9cebe4";
	context.font = `700 22px ${family}`;
	context.fillText(options.stopsLabel, 52, 354);
	drawPanel(context, 620, 54, 528, 468);
	context.fillStyle = "#f8fafc";
	context.font = `740 21px ${family}`;
	context.fillText(options.routeLabel, 648, 91);
	options.steps.slice(0, 8).forEach((step, index) => {
		const y = 118 + index * 47;
		context.beginPath();
		context.arc(665, y + 15, 15, 0, Math.PI * 2);
		context.fillStyle = "#f2c94c";
		context.fill();
		context.fillStyle = "#0a0e14";
		context.font = "760 14px \"Segoe UI\", Arial, sans-serif";
		const order = String(index + 1);
		context.fillText(order, 665 - context.measureText(order).width / 2, y + 20);
		const icon = icons[index];
		if (icon) context.drawImage(icon, 692, y, 30, 30);
		context.fillStyle = "rgba(248, 250, 252, 0.94)";
		context.font = `650 17px ${family}`;
		context.fillText(ellipsize(context, step.name, 372), 734, y + 21);
	});
	if (options.steps.length > 8) {
		context.fillStyle = "rgba(226, 232, 240, 0.68)";
		context.font = `650 16px ${family}`;
		context.fillText(`+${options.steps.length - 8}`, 1066, 500);
	}
	drawLinkBand(context, family, options.linkLabel, options.shareUrl);
	return canvasToBlob(canvas, options.signal);
}
function createProgressShareCard(options) {
	return renderProgressShareCard(options);
}
function createPointShareCard(options) {
	return renderPointShareCard(options);
}
function createRouteShareCard(options) {
	return renderRouteShareCard(options);
}
//#endregion
//#region app/map-app/InteractiveMap.tsx
var mapOrder = [
	"World_L_B",
	"World_D_B",
	"World_L_A",
	"World_D_A",
	"World_L_Starter",
	"World_D_Starter",
	"Abyss_Reshanta_A",
	"Abyss_Reshanta_B",
	"Abyss_Reshanta_C",
	"ReforgedAbyss"
];
var categoryPalette = {
	location: "#42d6ff",
	gathering: "#58d68d",
	creature: "#f47c48",
	collection: "#c49cff",
	quest: "#f4cf4f",
	unknown: "#cbd5e1"
};
var FOUND_STORAGE_PREFIX = "aion2-map-found-v1";
var FILTER_STORAGE_PREFIX = "aion2-map-filters-v1";
var FOUND_BROADCAST_CHANNEL = "aion2-map-found-sync-v1";
var MARKER_PAGE_SIZE = 120;
var RESOURCE_TIMEOUT_MS = 45e3;
var MAP_ENGINE_TIMEOUT_MS = 45e3;
function formatNumber(value, locale) {
	return Math.round(value).toLocaleString(numberLocaleForMapLocale(locale));
}
function displayColor(marker) {
	if (marker.color && marker.color !== "#000000") return marker.color;
	return categoryPalette[marker.category] ?? categoryPalette.unknown;
}
function markerIconUrl(marker, map, assetBasePath) {
	return resolveMapAssetUrl(map?.type === "dark" && marker.darkIconUrl ? marker.darkIconUrl : marker.iconUrl || marker.darkIconUrl || "", assetBasePath);
}
function subtypeIconUrl(subtype, map, assetBasePath) {
	return resolveMapAssetUrl(map?.type === "dark" && subtype.darkIconUrl ? subtype.darkIconUrl : subtype.iconUrl || subtype.darkIconUrl || "", assetBasePath);
}
function normalizeSearch(value, locale) {
	return value.trim().toLocaleLowerCase(locale);
}
function initialTypesCollapsed() {
	return typeof window !== "undefined" && window.matchMedia("(max-width: 920px)").matches;
}
function initialDetailCollapsed() {
	return typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches;
}
function parseStoredStringSet(value) {
	if (!value) return null;
	try {
		const parsed = JSON.parse(value);
		if (!Array.isArray(parsed)) return null;
		return new Set(parsed.filter((item) => typeof item === "string"));
	} catch {
		return null;
	}
}
function readStoredStringSet(key) {
	try {
		return parseStoredStringSet(window.localStorage.getItem(key));
	} catch {
		return null;
	}
}
function writeStoredStringSet(key, value) {
	try {
		window.localStorage.setItem(key, JSON.stringify([...value]));
		return true;
	} catch {
		return false;
	}
}
function decodeProgressForMap(payload, mapName, token) {
	const decoded = decodeSharedProgress(payload, token);
	if (!decoded) return null;
	if (decoded.scope.kind === "current-map" && decoded.scope.mapName !== mapName) return null;
	const decodedIds = decoded.byMapName.get(mapName);
	if (!decodedIds) return null;
	const markers = payload.markersByMap[mapName] ?? [];
	const validIds = new Set(markers.map((marker) => marker.id));
	const foundMarkerIds = new Set([...decodedIds].filter((markerId) => validIds.has(markerId)));
	return {
		mapName,
		foundMarkerIds,
		foundCount: foundMarkerIds.size,
		totalCount: markers.length
	};
}
async function copyText(value) {
	if (window.navigator.clipboard?.writeText) try {
		await window.navigator.clipboard.writeText(value);
		return true;
	} catch {}
	const textarea = document.createElement("textarea");
	textarea.value = value;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "fixed";
	textarea.style.opacity = "0";
	document.body.appendChild(textarea);
	try {
		textarea.select();
		return document.execCommand("copy");
	} catch {
		return false;
	} finally {
		textarea.remove();
	}
}
function updateCurrentUrl(update, mode = "replace") {
	const url = new URL(window.location.href);
	const hash = new URLSearchParams(url.hash.slice(1));
	update(url, hash);
	if (url.searchParams.has("m")) url.searchParams.delete("map");
	if (url.searchParams.has("l")) url.searchParams.delete("lang");
	url.hash = hash.toString();
	const method = mode === "push" ? "pushState" : "replaceState";
	window.history[method](window.history.state, "", url);
}
function clearHashParameters(hash, names) {
	for (const name of names) hash.delete(name);
}
function InteractiveMap({ initialServerLocale = DEFAULT_LOCALE, initialMapName = "World_L_A", embedded: embeddedMode = false, assetBasePath }) {
	const [payload, setPayload] = (0, import_react.useState)(null);
	const [translations, setTranslations] = (0, import_react.useState)(null);
	const [mapDataLoad, setMapDataLoad] = (0, import_react.useState)({ status: "loading" });
	const [translationLoad, setTranslationLoad] = (0, import_react.useState)({ status: "loading" });
	const [loadAttempt, setLoadAttempt] = (0, import_react.useState)(0);
	const [locale, setLocale] = (0, import_react.useState)(initialServerLocale);
	const [selectedMapName, setSelectedMapName] = (0, import_react.useState)(initialMapName);
	const [embedded, setEmbedded] = (0, import_react.useState)(embeddedMode);
	const [query, setQuery] = (0, import_react.useState)("");
	const [selectedSubtypes, setSelectedSubtypes] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [urlRequestedSubtype, setUrlRequestedSubtype] = (0, import_react.useState)(null);
	const [filterMapName, setFilterMapName] = (0, import_react.useState)("");
	const [foundMarkerIds, setFoundMarkerIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [selectedMarkerId, setSelectedMarkerId] = (0, import_react.useState)(null);
	const [showLabels, setShowLabels] = (0, import_react.useState)(false);
	const [showRegions, setShowRegions] = (0, import_react.useState)(false);
	const [sidebarCollapsed, setSidebarCollapsed] = (0, import_react.useState)(false);
	const [typesCollapsed, setTypesCollapsed] = (0, import_react.useState)(false);
	const [detailCollapsed, setDetailCollapsed] = (0, import_react.useState)(false);
	const [sharedProgress, setSharedProgress] = (0, import_react.useState)(null);
	const [forcedVisibleMarkerIds, setForcedVisibleMarkerIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [routeMode, setRouteMode] = (0, import_react.useState)(false);
	const [routeMarkerIds, setRouteMarkerIds] = (0, import_react.useState)([]);
	const [markerPage, setMarkerPage] = (0, import_react.useState)(0);
	const [mapEngineAttempt, setMapEngineAttempt] = (0, import_react.useState)(0);
	const [locationApplyVersion, setLocationApplyVersion] = (0, import_react.useState)(0);
	const [mapEngineStatus, setMapEngineStatus] = (0, import_react.useState)({ status: "loading" });
	const [shareNotice, setShareNotice] = (0, import_react.useState)("");
	const [sharePreview, setSharePreview] = (0, import_react.useState)(null);
	const [isGeneratingShareImage, setIsGeneratingShareImage] = (0, import_react.useState)(false);
	const [fullscreenMode, setFullscreenMode] = (0, import_react.useState)("off");
	const mapShellRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const mapViewportRef = (0, import_react.useRef)(null);
	const coordinateRef = (0, import_react.useRef)(null);
	const fullscreenButtonRef = (0, import_react.useRef)(null);
	const fullscreenModeRef = (0, import_react.useRef)("off");
	const fullscreenTriggerRef = (0, import_react.useRef)("browser");
	const fullscreenScrollRef = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const inertSnapshotsRef = (0, import_react.useRef)([]);
	const collapseSidebarButtonRef = (0, import_react.useRef)(null);
	const expandSidebarButtonRef = (0, import_react.useRef)(null);
	const shareDialogRef = (0, import_react.useRef)(null);
	const shareDialogCloseRef = (0, import_react.useRef)(null);
	const modalReturnFocusRef = (0, import_react.useRef)(null);
	const foundBroadcastRef = (0, import_react.useRef)(null);
	const mapEngineReadyRef = (0, import_react.useRef)(false);
	const mapEngineStartedAtRef = (0, import_react.useRef)(null);
	const pendingSharedPointIdRef = (0, import_react.useRef)(null);
	const pendingSharedRouteIdsRef = (0, import_react.useRef)(null);
	const noticeTimerRef = (0, import_react.useRef)(null);
	const analyticsOpenKeyRef = (0, import_react.useRef)("");
	const analyticsReadyKeyRef = (0, import_react.useRef)("");
	const analyticsMarkerOpenKeyRef = (0, import_react.useRef)("");
	const markerEntrySourceRef = (0, import_react.useRef)("shared-link");
	const text = UI_TEXT[locale];
	const MapRoot = embedded ? "section" : "main";
	const MapTitle = embedded ? "h2" : "h1";
	const isFullscreen = fullscreenMode !== "off";
	const scheduleMapResize = (0, import_react.useCallback)(() => {
		const frame = window.requestAnimationFrame(() => mapRef.current?.resize());
		const settled = window.setTimeout(() => mapRef.current?.resize(), 220);
		return () => {
			window.cancelAnimationFrame(frame);
			window.clearTimeout(settled);
		};
	}, []);
	const restoreFallbackDocument = (0, import_react.useCallback)(() => {
		delete document.documentElement.dataset.mapFullscreen;
		for (const snapshot of inertSnapshotsRef.current) if (snapshot.element.isConnected) snapshot.element.inert = snapshot.inert;
		inertSnapshotsRef.current = [];
	}, []);
	const prepareFallbackDocument = (0, import_react.useCallback)((shell) => {
		const snapshots = [];
		let current = shell;
		while (current && current !== document.body) {
			const parentElement = current.parentElement;
			if (!parentElement) break;
			for (const sibling of parentElement.children) {
				if (sibling === current || !(sibling instanceof HTMLElement)) continue;
				snapshots.push({
					element: sibling,
					inert: sibling.inert
				});
				sibling.inert = true;
			}
			current = parentElement;
		}
		inertSnapshotsRef.current = snapshots;
		document.documentElement.dataset.mapFullscreen = "fallback";
	}, []);
	const commitFullscreenMode = (0, import_react.useCallback)((nextMode, trigger, options = {}) => {
		const previousMode = fullscreenModeRef.current;
		if (previousMode === nextMode) return;
		if (previousMode !== "off") restoreFallbackDocument();
		if (nextMode === "fallback" && mapShellRef.current) prepareFallbackDocument(mapShellRef.current);
		else if (nextMode === "native") document.documentElement.dataset.mapFullscreen = "native";
		fullscreenModeRef.current = nextMode;
		setFullscreenMode(nextMode);
		scheduleMapResize();
		if (options.track !== false) trackEvent("map_fullscreen_change", {
			action: nextMode === "off" ? "exit" : "enter",
			mode: nextMode === "off" ? previousMode : nextMode,
			trigger,
			locale: locale.toLowerCase(),
			map_name: selectedMapName,
			embedded,
			surface: "interactive-map",
			target_kind: "map",
			target_key: selectedMapName
		});
		if (nextMode === "off") window.requestAnimationFrame(() => {
			window.scrollTo(fullscreenScrollRef.current.x, fullscreenScrollRef.current.y);
			if (options.restoreFocus !== false) fullscreenButtonRef.current?.focus();
		});
	}, [
		embedded,
		locale,
		prepareFallbackDocument,
		restoreFallbackDocument,
		scheduleMapResize,
		selectedMapName
	]);
	const toggleFullscreen = (0, import_react.useCallback)(async () => {
		const shell = mapShellRef.current;
		if (!shell) return;
		if (fullscreenModeRef.current === "fallback") {
			commitFullscreenMode("off", "button");
			return;
		}
		if (fullscreenModeRef.current === "native" || document.fullscreenElement === shell) {
			fullscreenTriggerRef.current = "button";
			try {
				await document.exitFullscreen();
			} catch {
				if (document.fullscreenElement !== shell) commitFullscreenMode("off", "button");
			}
			return;
		}
		fullscreenScrollRef.current = {
			x: window.scrollX,
			y: window.scrollY
		};
		fullscreenTriggerRef.current = "button";
		if (typeof shell.requestFullscreen === "function") try {
			await shell.requestFullscreen();
			if (document.fullscreenElement === shell) commitFullscreenMode("native", "button");
			return;
		} catch {}
		commitFullscreenMode("fallback", "button");
	}, [commitFullscreenMode]);
	const showNotice = (0, import_react.useCallback)((message) => {
		setShareNotice(message);
		if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
		noticeTimerRef.current = window.setTimeout(() => {
			setShareNotice("");
			noticeTimerRef.current = null;
		}, 2800);
	}, []);
	(0, import_react.useEffect)(() => () => {
		if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
	}, []);
	const closeSharePreview = (0, import_react.useCallback)(() => setSharePreview(null), []);
	const captureShareReturnFocus = (0, import_react.useCallback)(() => {
		const activeElement = document.activeElement;
		modalReturnFocusRef.current = activeElement instanceof HTMLElement && activeElement !== document.body ? activeElement : null;
	}, []);
	const restoreShareReturnFocus = (0, import_react.useCallback)(() => {
		const returnTarget = modalReturnFocusRef.current;
		modalReturnFocusRef.current = null;
		if (returnTarget?.isConnected) window.requestAnimationFrame(() => returnTarget.focus());
	}, []);
	(0, import_react.useEffect)(() => {
		if (!sharePreview) return;
		const activeElement = document.activeElement;
		if (!modalReturnFocusRef.current && activeElement instanceof HTMLElement && activeElement !== document.body) modalReturnFocusRef.current = activeElement;
		const focusFrame = window.requestAnimationFrame(() => shareDialogCloseRef.current?.focus());
		const handleDialogKeys = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				closeSharePreview();
				return;
			}
			if (event.key !== "Tab" || !shareDialogRef.current) return;
			const focusable = [...shareDialogRef.current.querySelectorAll("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])")].filter((element) => !element.hasAttribute("hidden"));
			if (focusable.length === 0) {
				event.preventDefault();
				shareDialogRef.current.focus();
				return;
			}
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		document.addEventListener("keydown", handleDialogKeys);
		return () => {
			window.cancelAnimationFrame(focusFrame);
			document.removeEventListener("keydown", handleDialogKeys);
			URL.revokeObjectURL(sharePreview.imageUrl);
			restoreShareReturnFocus();
		};
	}, [
		closeSharePreview,
		restoreShareReturnFocus,
		sharePreview
	]);
	(0, import_react.useEffect)(() => {
		const handleFullscreenChange = () => {
			const shell = mapShellRef.current;
			if (shell && document.fullscreenElement === shell) commitFullscreenMode("native", fullscreenTriggerRef.current);
			else if (fullscreenModeRef.current === "native") commitFullscreenMode("off", fullscreenTriggerRef.current);
			fullscreenTriggerRef.current = "browser";
		};
		const handleFullscreenKey = (event) => {
			if (event.key !== "Escape" || event.defaultPrevented || sharePreview || fullscreenModeRef.current !== "fallback") return;
			event.preventDefault();
			commitFullscreenMode("off", "escape");
		};
		const handlePageHide = () => {
			if (fullscreenModeRef.current === "fallback") commitFullscreenMode("off", "browser", {
				track: false,
				restoreFocus: false
			});
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		document.addEventListener("keydown", handleFullscreenKey);
		window.addEventListener("pagehide", handlePageHide);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
			document.removeEventListener("keydown", handleFullscreenKey);
			window.removeEventListener("pagehide", handlePageHide);
		};
	}, [commitFullscreenMode, sharePreview]);
	(0, import_react.useEffect)(() => () => {
		restoreFallbackDocument();
		const shell = mapShellRef.current;
		if (shell && document.fullscreenElement === shell) document.exitFullscreen().catch(() => void 0);
	}, [restoreFallbackDocument]);
	(0, import_react.useEffect)(() => {
		return scheduleMapResize();
	}, [scheduleMapResize, sidebarCollapsed]);
	(0, import_react.useEffect)(() => {
		const frame = window.requestAnimationFrame(() => {
			setLocale(initialServerLocale);
			setEmbedded(embeddedMode);
			setTypesCollapsed(initialTypesCollapsed());
			setDetailCollapsed(initialDetailCollapsed());
		});
		return () => window.cancelAnimationFrame(frame);
	}, [embeddedMode, initialServerLocale]);
	(0, import_react.useEffect)(() => {
		try {
			window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
		} catch {}
	}, [locale]);
	(0, import_react.useEffect)(() => {
		let alive = true;
		const controllers = [];
		const loadResource = async (url, setStatus, setValue) => {
			const controller = new AbortController();
			controllers.push(controller);
			let timedOut = false;
			const timeout = window.setTimeout(() => {
				timedOut = true;
				controller.abort();
			}, RESOURCE_TIMEOUT_MS);
			try {
				const response = await fetch(url, {
					cache: "force-cache",
					signal: controller.signal
				});
				if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
				const value = await response.json();
				if (!alive) return;
				setValue(value);
				setStatus({ status: "ready" });
			} catch (error) {
				if (!alive) return;
				console.error(`Failed to load ${url}`, error);
				setStatus({
					status: "error",
					reason: timedOut ? "timeout" : "failed"
				});
			} finally {
				window.clearTimeout(timeout);
			}
		};
		loadResource("/data/aion2-map-data.json", setMapDataLoad, setPayload);
		loadResource("/data/aion2-map-i18n.json", setTranslationLoad, setTranslations);
		return () => {
			alive = false;
			for (const controller of controllers) controller.abort();
		};
	}, [loadAttempt]);
	const applyLocationState = (0, import_react.useCallback)(() => {
		if (!payload) return;
		const url = new URL(window.location.href);
		const requestedLocale = url.searchParams.get("l") ?? url.searchParams.get("lang");
		const nextLocale = isLocale(requestedLocale) ? requestedLocale : initialServerLocale;
		const requestedMapName = url.searchParams.get("m") ?? url.searchParams.get("map");
		const fallbackMap = payload.maps.find((map) => map.name === initialMapName) ?? payload.maps.find((map) => map.name === "World_L_A") ?? payload.maps[0];
		const requestedMap = payload.maps.find((map) => map.name === requestedMapName) ?? fallbackMap;
		if (!requestedMap) return;
		const hash = new URLSearchParams(url.hash.slice(1));
		const requestedSubtype = hash.get("type")?.trim() || null;
		const routeToken = hash.get("r") ?? hash.get("route");
		const decodedRoute = routeToken ? decodeSharedRoute(payload, requestedMap.name, routeToken) : null;
		const pointToken = hash.get("pt");
		const legacyPointId = hash.get("point") ?? hash.get("poi");
		const compactPointId = pointToken ? decodeSharedPoint(payload, requestedMap.name, pointToken) : null;
		const legacyPointMap = legacyPointId ? payload.maps.find((map) => (payload.markersByMap[map.name] ?? []).some((marker) => marker.id === legacyPointId)) ?? null : null;
		const requestedPointId = compactPointId ?? (legacyPointMap ? legacyPointId : null);
		const pointMap = compactPointId ? requestedMap : legacyPointMap;
		const targetMap = decodedRoute ? requestedMap : pointMap ?? requestedMap;
		setLocale(nextLocale);
		setEmbedded(embeddedMode || url.searchParams.get("embed") === "1");
		setUrlRequestedSubtype(requestedSubtype);
		if (targetMap.name !== selectedMapName) setMapEngineStatus({ status: "loading" });
		setSelectedMapName(targetMap.name);
		setMarkerPage(0);
		pendingSharedPointIdRef.current = null;
		pendingSharedRouteIdsRef.current = null;
		setLocationApplyVersion((version) => version + 1);
		if (routeToken) {
			setSharedProgress(null);
			setSelectedMarkerId(null);
			if (decodedRoute) {
				pendingSharedRouteIdsRef.current = decodedRoute;
				setRouteMarkerIds(decodedRoute);
				setForcedVisibleMarkerIds(new Set(decodedRoute));
				setRouteMode(true);
			} else {
				setRouteMarkerIds([]);
				setForcedVisibleMarkerIds(/* @__PURE__ */ new Set());
				setRouteMode(false);
				showNotice(UI_TEXT[nextLocale].sharedRouteInvalid);
			}
			return;
		}
		if (pointToken || legacyPointId) {
			setSharedProgress(null);
			setRouteMarkerIds([]);
			setRouteMode(false);
			if (requestedPointId && pointMap) {
				pendingSharedPointIdRef.current = requestedPointId;
				markerEntrySourceRef.current = "shared-link";
				setSelectedMarkerId(requestedPointId);
				setForcedVisibleMarkerIds(new Set([requestedPointId]));
			} else {
				setSelectedMarkerId(null);
				setForcedVisibleMarkerIds(/* @__PURE__ */ new Set());
				showNotice(UI_TEXT[nextLocale].shareFailed);
			}
			return;
		}
		setSelectedMarkerId(null);
		setRouteMarkerIds([]);
		setRouteMode(false);
		setForcedVisibleMarkerIds(/* @__PURE__ */ new Set());
		const progressToken = hash.get("p") ?? hash.get("progress");
		if (progressToken) {
			const decodedProgress = decodeProgressForMap(payload, requestedMap.name, progressToken);
			if (decodedProgress) setSharedProgress(decodedProgress);
			else {
				setSharedProgress(null);
				showNotice(UI_TEXT[nextLocale].sharedProgressInvalid);
			}
		} else setSharedProgress(null);
	}, [
		embeddedMode,
		initialMapName,
		initialServerLocale,
		payload,
		selectedMapName,
		showNotice
	]);
	(0, import_react.useEffect)(() => {
		if (!payload) return;
		const applyFrame = window.requestAnimationFrame(applyLocationState);
		window.addEventListener("hashchange", applyLocationState);
		window.addEventListener("popstate", applyLocationState);
		return () => {
			window.cancelAnimationFrame(applyFrame);
			window.removeEventListener("hashchange", applyLocationState);
			window.removeEventListener("popstate", applyLocationState);
		};
	}, [applyLocationState, payload]);
	const maps = (0, import_react.useMemo)(() => {
		if (!payload) return [];
		return [...payload.maps].sort((a, b) => {
			const aIndex = mapOrder.indexOf(a.name);
			const bIndex = mapOrder.indexOf(b.name);
			return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
		});
	}, [payload]);
	const selectedMap = (0, import_react.useMemo)(() => maps.find((item) => item.name === selectedMapName) ?? maps[0], [maps, selectedMapName]);
	const mapDataLocale = mapDataLocaleForLocale(locale);
	const localeBundle = translations?.locales[mapDataLocale] ?? translations?.locales.en;
	const sourceMarkers = (0, import_react.useMemo)(() => {
		if (!payload || !selectedMap) return [];
		return payload.markersByMap[selectedMap.name] ?? [];
	}, [payload, selectedMap]);
	const selectedMapDataUnavailable = Boolean(selectedMap && sourceMarkers.length === 0);
	const validMarkerIdsByMap = (0, import_react.useMemo)(() => {
		const result = /* @__PURE__ */ new Map();
		if (!payload) return result;
		for (const map of payload.maps) result.set(map.name, new Set((payload.markersByMap[map.name] ?? []).map((marker) => marker.id)));
		return result;
	}, [payload]);
	const markers = (0, import_react.useMemo)(() => {
		if (!localeBundle) return sourceMarkers;
		return sourceMarkers.map((marker) => {
			const translated = localeBundle.markers[marker.id];
			const subtypeLabel = localeBundle.subtypes[marker.subtype] ?? marker.subtypeLabel;
			return {
				...marker,
				name: translated?.name || subtypeLabel,
				description: translated?.description ?? marker.description,
				subtypeLabel,
				categoryLabel: localeBundle.categories[marker.category] ?? marker.categoryLabel
			};
		});
	}, [localeBundle, sourceMarkers]);
	const sourceRegions = (0, import_react.useMemo)(() => {
		if (!payload || !selectedMap) return [];
		return payload.regionsByMap[selectedMap.name] ?? [];
	}, [payload, selectedMap]);
	const regions = (0, import_react.useMemo)(() => {
		const labels = selectedMap ? localeBundle?.regions[selectedMap.name] : void 0;
		if (!labels) return sourceRegions;
		return sourceRegions.map((region) => ({
			...region,
			label: labels[region.name] ?? region.label
		}));
	}, [
		localeBundle,
		selectedMap,
		sourceRegions
	]);
	const selectedMapText = (0, import_react.useMemo)(() => {
		if (!selectedMap) return null;
		return localeBundle?.maps[selectedMap.name] ?? {
			name: selectedMap.displayName,
			description: selectedMap.description || selectedMap.type
		};
	}, [localeBundle, selectedMap]);
	(0, import_react.useEffect)(() => {
		if (!payload || !selectedMap) return;
		const key = `${selectedMap.name}:${locale}`;
		if (analyticsOpenKeyRef.current === key) return;
		analyticsOpenKeyRef.current = key;
		trackEvent("tool_open", {
			tool_name: "interactive_map",
			locale,
			map_name: selectedMap.name,
			embedded
		});
	}, [
		embedded,
		locale,
		payload,
		selectedMap
	]);
	const categoriesForMap = (0, import_react.useMemo)(() => {
		if (!payload) return [];
		const subtypeCounts = /* @__PURE__ */ new Map();
		for (const marker of sourceMarkers) subtypeCounts.set(marker.subtype, (subtypeCounts.get(marker.subtype) ?? 0) + 1);
		return payload.categories.map((category) => ({
			...category,
			subtypes: category.subtypes.filter((subtype) => subtypeCounts.has(subtype.name)).map((subtype) => ({
				...subtype,
				count: subtypeCounts.get(subtype.name) ?? 0
			}))
		})).filter((category) => category.subtypes.length > 0).map((category) => ({
			...category,
			count: category.subtypes.reduce((total, subtype) => total + subtype.count, 0)
		}));
	}, [payload, sourceMarkers]);
	const allSubtypeNamesForMap = (0, import_react.useMemo)(() => categoriesForMap.flatMap((category) => category.subtypes.map((subtype) => subtype.name)), [categoriesForMap]);
	const activeUrlSubtype = (0, import_react.useMemo)(() => urlRequestedSubtype && allSubtypeNamesForMap.includes(urlRequestedSubtype) ? urlRequestedSubtype : null, [allSubtypeNamesForMap, urlRequestedSubtype]);
	const activeFoundMarkerIds = (0, import_react.useMemo)(() => selectedMap && sharedProgress?.mapName === selectedMap.name ? sharedProgress.foundMarkerIds : foundMarkerIds, [
		foundMarkerIds,
		selectedMap,
		sharedProgress
	]);
	const foundCountsBySubtype = (0, import_react.useMemo)(() => {
		const counts = /* @__PURE__ */ new Map();
		for (const marker of markers) {
			if (!activeFoundMarkerIds.has(marker.id)) continue;
			counts.set(marker.subtype, (counts.get(marker.subtype) ?? 0) + 1);
		}
		return counts;
	}, [activeFoundMarkerIds, markers]);
	const buildCollectibleBreakdown = (0, import_react.useCallback)((foundIds) => {
		const counts = /* @__PURE__ */ new Map();
		for (const marker of markers) {
			if (!foundIds.has(marker.id)) continue;
			counts.set(marker.subtype, (counts.get(marker.subtype) ?? 0) + 1);
		}
		return categoriesForMap.flatMap((category) => category.subtypes.filter((subtype) => subtype.canComplete).map((subtype) => ({
			name: localeBundle?.subtypes[subtype.name] ?? subtype.label,
			foundCount: counts.get(subtype.name) ?? 0,
			totalCount: subtype.count,
			iconUrl: subtypeIconUrl(subtype, selectedMap, assetBasePath)
		})));
	}, [
		assetBasePath,
		categoriesForMap,
		localeBundle,
		markers,
		selectedMap
	]);
	(0, import_react.useEffect)(() => {
		if (!selectedMap) return;
		const allowed = new Set(allSubtypeNamesForMap);
		const stored = readStoredStringSet(`${FILTER_STORAGE_PREFIX}:${selectedMap.name}`);
		let next = activeUrlSubtype ? new Set([activeUrlSubtype]) : stored ? new Set([...stored].filter((subtypeName) => allowed.has(subtypeName))) : new Set(categoriesForMap.filter((category) => category.name === "location").flatMap((category) => category.subtypes.map((subtype) => subtype.name)));
		if (!activeUrlSubtype && stored === null && selectedMap.type === "abyss" && allowed.has("monolithMaterial")) next.add("monolithMaterial");
		if (!activeUrlSubtype && stored === null && next.size === 0 && allSubtypeNamesForMap.length > 0) next = new Set(categoriesForMap[0]?.subtypes.map((subtype) => subtype.name) ?? []);
		const pendingRouteIds = pendingSharedRouteIdsRef.current;
		const hasPendingSharedState = pendingSharedPointIdRef.current !== null || pendingRouteIds !== null;
		const frame = requestAnimationFrame(() => {
			setSelectedSubtypes(next);
			setFilterMapName(selectedMap.name);
			if (!hasPendingSharedState) setSelectedMarkerId(null);
			if (coordinateRef.current) coordinateRef.current.textContent = "0, 0";
		});
		return () => cancelAnimationFrame(frame);
	}, [
		activeUrlSubtype,
		allSubtypeNamesForMap,
		categoriesForMap,
		selectedMap
	]);
	(0, import_react.useEffect)(() => {
		if (!selectedMap || filterMapName !== selectedMap.name || activeUrlSubtype) return;
		writeStoredStringSet(`${FILTER_STORAGE_PREFIX}:${selectedMap.name}`, selectedSubtypes);
	}, [
		activeUrlSubtype,
		filterMapName,
		selectedMap,
		selectedSubtypes
	]);
	const readLatestFoundForMap = (0, import_react.useCallback)((mapName, fallback = /* @__PURE__ */ new Set()) => {
		const validIds = validMarkerIdsByMap.get(mapName) ?? /* @__PURE__ */ new Set();
		const stored = readStoredStringSet(`${FOUND_STORAGE_PREFIX}:${mapName}`);
		return new Set([...stored ?? fallback].filter((markerId) => validIds.has(markerId)));
	}, [validMarkerIdsByMap]);
	const persistFoundForMap = (0, import_react.useCallback)(async (mapName, fallback, update) => {
		const commit = () => {
			const next = readLatestFoundForMap(mapName, fallback);
			update(next);
			const saved = writeStoredStringSet(`${FOUND_STORAGE_PREFIX}:${mapName}`, next);
			if (saved) foundBroadcastRef.current?.postMessage({
				mapName,
				markerIds: [...next]
			});
			return {
				next,
				saved
			};
		};
		if (window.navigator.locks) return window.navigator.locks.request(`${FOUND_STORAGE_PREFIX}:${mapName}`, commit);
		return commit();
	}, [readLatestFoundForMap]);
	(0, import_react.useEffect)(() => {
		if (!selectedMap) return;
		const next = readLatestFoundForMap(selectedMap.name);
		const frame = requestAnimationFrame(() => setFoundMarkerIds(next));
		return () => cancelAnimationFrame(frame);
	}, [readLatestFoundForMap, selectedMap]);
	(0, import_react.useEffect)(() => {
		if (!payload) return;
		const applyIncomingProgress = (mapName, incoming) => {
			const validIds = validMarkerIdsByMap.get(mapName);
			if (!validIds || selectedMap?.name !== mapName) return;
			setFoundMarkerIds(new Set([...incoming].filter((markerId) => validIds.has(markerId))));
		};
		const handleStorage = (event) => {
			const keyPrefix = `${FOUND_STORAGE_PREFIX}:`;
			if (!event.key?.startsWith(keyPrefix)) return;
			applyIncomingProgress(event.key.slice(keyPrefix.length), parseStoredStringSet(event.newValue) ?? /* @__PURE__ */ new Set());
		};
		const refreshCurrentMap = () => {
			if (selectedMap) setFoundMarkerIds(readLatestFoundForMap(selectedMap.name));
		};
		window.addEventListener("storage", handleStorage);
		window.addEventListener("focus", refreshCurrentMap);
		let channel = null;
		if (typeof BroadcastChannel !== "undefined") try {
			channel = new BroadcastChannel(FOUND_BROADCAST_CHANNEL);
			foundBroadcastRef.current = channel;
			channel.onmessage = (event) => {
				if (!event.data || typeof event.data !== "object") return;
				const message = event.data;
				if (typeof message.mapName !== "string" || !Array.isArray(message.markerIds)) return;
				applyIncomingProgress(message.mapName, new Set(message.markerIds.filter((id) => typeof id === "string")));
			};
		} catch {
			channel = null;
		}
		return () => {
			window.removeEventListener("storage", handleStorage);
			window.removeEventListener("focus", refreshCurrentMap);
			channel?.close();
			if (foundBroadcastRef.current === channel) foundBroadcastRef.current = null;
		};
	}, [
		payload,
		readLatestFoundForMap,
		selectedMap,
		validMarkerIdsByMap
	]);
	(0, import_react.useEffect)(() => {
		const markerId = pendingSharedPointIdRef.current;
		if (!markerId || !selectedMap) return;
		const marker = markers.find((item) => item.id === markerId);
		if (!marker) return;
		pendingSharedPointIdRef.current = null;
		setSelectedMarkerId(marker.id);
		const frame = requestAnimationFrame(() => {
			setDetailCollapsed(initialDetailCollapsed());
			mapRef.current?.focusMarker(marker);
		});
		return () => cancelAnimationFrame(frame);
	}, [
		locationApplyVersion,
		markers,
		selectedMap
	]);
	(0, import_react.useEffect)(() => {
		const markerIds = pendingSharedRouteIdsRef.current;
		if (!markerIds || !selectedMap) return;
		const markerById = new Map(markers.map((marker) => [marker.id, marker]));
		const sharedRouteMarkers = markerIds.map((markerId) => markerById.get(markerId)).filter((marker) => Boolean(marker));
		if (sharedRouteMarkers.length < 2) return;
		pendingSharedRouteIdsRef.current = null;
		setRouteMarkerIds(sharedRouteMarkers.map((marker) => marker.id));
		setRouteMode(true);
		const frame = requestAnimationFrame(() => {
			mapRef.current?.fitRoute(sharedRouteMarkers);
		});
		return () => cancelAnimationFrame(frame);
	}, [
		locationApplyVersion,
		markers,
		selectedMap
	]);
	const deferredQuery = (0, import_react.useDeferredValue)(query);
	const filteredMarkers = (0, import_react.useMemo)(() => {
		const normalized = normalizeSearch(deferredQuery, locale);
		return markers.filter((marker) => {
			if (forcedVisibleMarkerIds.has(marker.id)) return true;
			if (!selectedSubtypes.has(marker.subtype)) return false;
			if (!normalized) return true;
			return marker.name.toLocaleLowerCase(locale).includes(normalized) || marker.description.toLocaleLowerCase(locale).includes(normalized) || marker.subtypeLabel.toLocaleLowerCase(locale).includes(normalized) || marker.categoryLabel.toLocaleLowerCase(locale).includes(normalized);
		});
	}, [
		deferredQuery,
		forcedVisibleMarkerIds,
		locale,
		markers,
		selectedSubtypes
	]);
	const markerPageCount = Math.max(1, Math.ceil(filteredMarkers.length / MARKER_PAGE_SIZE));
	const activeMarkerPage = Math.min(markerPage, markerPageCount - 1);
	const markerPageStart = activeMarkerPage * MARKER_PAGE_SIZE;
	const pagedMarkers = filteredMarkers.slice(markerPageStart, markerPageStart + MARKER_PAGE_SIZE);
	const markerRangeStart = filteredMarkers.length === 0 ? 0 : markerPageStart + 1;
	const markerRangeEnd = Math.min(markerPageStart + MARKER_PAGE_SIZE, filteredMarkers.length);
	const selectedMarker = (0, import_react.useMemo)(() => markers.find((marker) => marker.id === selectedMarkerId) ?? null, [markers, selectedMarkerId]);
	(0, import_react.useEffect)(() => {
		if (!selectedMap || !selectedMarker) {
			analyticsMarkerOpenKeyRef.current = "";
			return;
		}
		const markerOpenKey = `${selectedMap.name}:${selectedMarker.id}`;
		if (analyticsMarkerOpenKeyRef.current === markerOpenKey) return;
		analyticsMarkerOpenKeyRef.current = markerOpenKey;
		trackEvent("marker_open", {
			entry_source: markerEntrySourceRef.current,
			locale,
			map_name: selectedMap.name,
			marker_id: selectedMarker.id,
			surface: "interactive-map",
			tool_name: "interactive_map"
		});
	}, [
		locale,
		selectedMap,
		selectedMarker
	]);
	const routeMarkers = (0, import_react.useMemo)(() => {
		const markerById = new Map(markers.map((marker) => [marker.id, marker]));
		return routeMarkerIds.map((markerId) => markerById.get(markerId)).filter((marker) => Boolean(marker));
	}, [markers, routeMarkerIds]);
	const handleMapEngineReady = (0, import_react.useCallback)(() => {
		mapEngineReadyRef.current = true;
		setMapEngineStatus({ status: "ready" });
		if (!selectedMap) return;
		const readyKey = `${selectedMap.name}:${locale}:${mapEngineAttempt}`;
		if (analyticsReadyKeyRef.current === readyKey) return;
		analyticsReadyKeyRef.current = readyKey;
		const startedAt = mapEngineStartedAtRef.current;
		const readyDurationMs = startedAt === null ? void 0 : Math.max(0, Math.round(performance.now() - startedAt));
		trackEvent("map_ready", {
			embedded,
			locale,
			map_name: selectedMap.name,
			marker_count: sourceMarkers.length,
			ready_duration_ms: readyDurationMs,
			surface: "interactive-map",
			tool_name: "interactive_map"
		});
	}, [
		embedded,
		locale,
		mapEngineAttempt,
		selectedMap,
		sourceMarkers.length
	]);
	const handleMapEngineError = (0, import_react.useCallback)((error) => {
		if (error.recoverable) {
			console.warn("Recoverable map engine error", error);
			showNotice(text.mapEngineWarning);
			return;
		}
		mapEngineReadyRef.current = false;
		console.error("Fatal map engine error", error);
		setMapEngineStatus({
			status: "error",
			message: text.mapEngineError
		});
	}, [
		showNotice,
		text.mapEngineError,
		text.mapEngineWarning
	]);
	(0, import_react.useEffect)(() => {
		if (!selectedMap) return;
		mapEngineReadyRef.current = false;
		mapEngineStartedAtRef.current = performance.now();
		const timeout = window.setTimeout(() => {
			if (!mapEngineReadyRef.current) setMapEngineStatus({
				status: "error",
				message: text.mapEngineError
			});
		}, MAP_ENGINE_TIMEOUT_MS);
		return () => {
			window.clearTimeout(timeout);
		};
	}, [
		mapEngineAttempt,
		selectedMap,
		text.mapEngineError
	]);
	const regionLabelByName = (0, import_react.useMemo)(() => new Map(regions.map((region) => [region.name, region.label])), [regions]);
	const updateCoordinate = (0, import_react.useCallback)((x, y) => {
		if (coordinateRef.current) coordinateRef.current.textContent = `${formatNumber(x, locale)}, ${formatNumber(y, locale)}`;
	}, [locale]);
	const focusMarkerOnMap = (0, import_react.useCallback)((marker) => {
		setSelectedMarkerId(marker.id);
		setDetailCollapsed(initialDetailCollapsed());
		mapRef.current?.focusMarker(marker);
	}, []);
	const focusMarker = (0, import_react.useCallback)((marker, entrySource) => {
		if (!payload || !selectedMap) return;
		markerEntrySourceRef.current = entrySource;
		focusMarkerOnMap(marker);
		setSharedProgress(null);
		setForcedVisibleMarkerIds(/* @__PURE__ */ new Set());
		const encodedPoint = encodeSharedPoint(payload, selectedMap.name, marker.id);
		updateCurrentUrl((url, hash) => {
			url.searchParams.set("m", selectedMap.name);
			url.searchParams.set("l", locale);
			clearHashParameters(hash, [
				"pt",
				"point",
				"poi",
				"r",
				"route",
				"p",
				"progress"
			]);
			if (encodedPoint) hash.set("pt", encodedPoint);
			else hash.set("point", marker.id);
		}, "push");
	}, [
		focusMarkerOnMap,
		locale,
		payload,
		selectedMap
	]);
	const addRouteMarker = (0, import_react.useCallback)((marker, entrySource) => {
		markerEntrySourceRef.current = entrySource;
		focusMarkerOnMap(marker);
		setRouteMarkerIds((current) => {
			if (current.includes(marker.id)) return current;
			if (current.length >= 64) {
				showNotice(text.routeLimitReached(64));
				return current;
			}
			return [...current, marker.id];
		});
	}, [
		focusMarkerOnMap,
		showNotice,
		text
	]);
	const selectMarkerFromMap = (0, import_react.useCallback)((markerId) => {
		const marker = markers.find((item) => item.id === markerId);
		if (!marker) return;
		if (routeMode) addRouteMarker(marker, "map-canvas-route");
		else focusMarker(marker, "map-canvas");
	}, [
		addRouteMarker,
		focusMarker,
		markers,
		routeMode
	]);
	const beginRoute = (0, import_react.useCallback)(() => {
		if (!selectedMap || selectedMapDataUnavailable) return;
		setRouteMarkerIds([]);
		setRouteMode(true);
		setSelectedMarkerId(null);
		setSharedProgress(null);
		setForcedVisibleMarkerIds(/* @__PURE__ */ new Set());
		updateCurrentUrl((url, hash) => {
			url.searchParams.set("m", selectedMap.name);
			url.searchParams.set("l", locale);
			clearHashParameters(hash, [
				"pt",
				"point",
				"poi",
				"r",
				"route",
				"p",
				"progress"
			]);
		}, "push");
	}, [
		locale,
		selectedMap,
		selectedMapDataUnavailable
	]);
	const closeRoute = (0, import_react.useCallback)(() => {
		setRouteMarkerIds([]);
		setRouteMode(false);
		setSelectedMarkerId(null);
		setForcedVisibleMarkerIds(/* @__PURE__ */ new Set());
		updateCurrentUrl((_url, hash) => {
			clearHashParameters(hash, [
				"r",
				"route",
				"pt",
				"point",
				"poi"
			]);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!payload || !selectedMap || !routeMode) return;
		const encodedRoute = routeMarkerIds.length >= 2 ? encodeSharedRoute(payload, selectedMap.name, routeMarkerIds) : null;
		updateCurrentUrl((url, hash) => {
			url.searchParams.set("m", selectedMap.name);
			url.searchParams.set("l", locale);
			clearHashParameters(hash, [
				"pt",
				"point",
				"poi",
				"route",
				"p",
				"progress"
			]);
			if (encodedRoute) hash.set("r", encodedRoute);
			else hash.delete("r");
		});
	}, [
		locale,
		payload,
		routeMarkerIds,
		routeMode,
		selectedMap
	]);
	const changeMap = (0, import_react.useCallback)((mapName) => {
		setMapEngineStatus({ status: "loading" });
		setSelectedMapName(mapName);
		setMarkerPage(0);
		setSelectedMarkerId(null);
		setRouteMarkerIds([]);
		setRouteMode(false);
		setSharedProgress(null);
		setForcedVisibleMarkerIds(/* @__PURE__ */ new Set());
		updateCurrentUrl((url, hash) => {
			url.searchParams.set("m", mapName);
			url.searchParams.set("l", locale);
			clearHashParameters(hash, [
				"pt",
				"point",
				"poi",
				"r",
				"route",
				"p",
				"progress"
			]);
		}, "push");
	}, [locale]);
	const changeLocale = (0, import_react.useCallback)((nextLocale) => {
		trackEvent("language_change", {
			from: locale,
			to: nextLocale,
			surface: "interactive_map",
			data_locale: mapDataLocaleForLocale(nextLocale)
		});
		setLocale(nextLocale);
		updateCurrentUrl((url) => {
			url.searchParams.set("l", nextLocale);
		});
	}, [locale]);
	const closeMarkerDetails = (0, import_react.useCallback)(() => {
		setSelectedMarkerId(null);
		if (!routeMode) {
			setForcedVisibleMarkerIds(/* @__PURE__ */ new Set());
			updateCurrentUrl((_url, hash) => clearHashParameters(hash, [
				"pt",
				"point",
				"poi"
			]));
		}
	}, [routeMode]);
	const collapseSidebar = (0, import_react.useCallback)(() => {
		setSidebarCollapsed(true);
		window.requestAnimationFrame(() => expandSidebarButtonRef.current?.focus());
	}, []);
	const expandSidebar = (0, import_react.useCallback)(() => {
		setSidebarCollapsed(false);
		window.requestAnimationFrame(() => collapseSidebarButtonRef.current?.focus());
	}, []);
	const toggleSubtype = (subtypeName) => {
		setMarkerPage(0);
		setSelectedSubtypes((current) => {
			const next = new Set(current);
			if (next.has(subtypeName)) next.delete(subtypeName);
			else next.add(subtypeName);
			return next;
		});
	};
	const setSubtypesActive = (subtypeNames, active) => {
		setMarkerPage(0);
		setSelectedSubtypes((current) => {
			const next = new Set(current);
			for (const subtypeName of subtypeNames) if (active) next.add(subtypeName);
			else next.delete(subtypeName);
			return next;
		});
	};
	const toggleMarkerFound = (0, import_react.useCallback)(async (markerId) => {
		if (!selectedMap) return;
		const { next } = await persistFoundForMap(selectedMap.name, foundMarkerIds, (latest) => {
			if (latest.has(markerId)) latest.delete(markerId);
			else latest.add(markerId);
		});
		const isFound = next.has(markerId);
		setFoundMarkerIds(next);
		trackEvent("map_marker_found_toggle", {
			tool_name: "interactive_map",
			locale,
			map_name: selectedMap.name,
			marker_id: markerId,
			found: isFound,
			surface: "interactive-map"
		});
		if (isFound) trackEvent("marker_found", {
			tool_name: "interactive_map",
			locale,
			map_name: selectedMap.name,
			marker_id: markerId,
			found: true,
			surface: "interactive-map"
		});
	}, [
		foundMarkerIds,
		locale,
		persistFoundForMap,
		selectedMap
	]);
	const addMarkerToChecklist = (0, import_react.useCallback)((marker) => {
		if (!payload || !selectedMap) return;
		try {
			const result = addChecklistItem({
				label: marker.name || marker.subtypeLabel,
				frequency: "once",
				mapRef: {
					mapName: selectedMap.name,
					mapSlug: selectedMap.slug,
					markerId: marker.id,
					markerNameSnapshot: marker.name || marker.subtypeLabel,
					sourceVersion: payload.source.build
				}
			});
			if (!result) {
				showNotice(text.checklistAddFailed);
				return;
			}
			if (result.outcome === "limit") showNotice(text.checklistLimit);
			else if (!result.added) showNotice(text.alreadyInChecklist);
			else if (!result.persisted) showNotice(text.checklistTemporary);
			else showNotice(text.addedToChecklist);
			trackEvent("map_to_checklist_add", {
				tool_name: "interactive_map",
				locale,
				map_name: selectedMap.name,
				marker_id: marker.id,
				added: result.added,
				outcome: result.outcome,
				persisted: result.persisted
			});
		} catch {
			showNotice(text.checklistAddFailed);
		}
	}, [
		locale,
		payload,
		selectedMap,
		showNotice,
		text
	]);
	const buildShareUrl = (0, import_react.useCallback)(() => {
		if (!selectedMap) return null;
		const url = new URL(window.location.href);
		url.search = "";
		url.searchParams.set("m", selectedMap.name);
		url.searchParams.set("l", locale);
		url.hash = "";
		return url;
	}, [locale, selectedMap]);
	const shareUrlOrCopy = (0, import_react.useCallback)(async ({ url, title, shareText, copiedMessage }) => {
		if (window.navigator.share) try {
			await window.navigator.share({
				title,
				text: shareText,
				url
			});
			showNotice(text.shareComplete);
			return;
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") return;
		}
		showNotice(await copyText(url) ? copiedMessage : text.shareFailed);
	}, [
		showNotice,
		text.shareComplete,
		text.shareFailed
	]);
	const shareMarker = (0, import_react.useCallback)(async (marker) => {
		if (!payload || !selectedMap || !selectedMapText || isGeneratingShareImage) return;
		const encodedPoint = encodeSharedPoint(payload, selectedMap.name, marker.id);
		const url = buildShareUrl();
		if (!url || !encodedPoint) return;
		url.hash = new URLSearchParams({ pt: encodedPoint }).toString();
		const shareUrl = url.toString();
		trackEvent("map_point_share", {
			tool_name: "interactive_map",
			locale,
			map_name: selectedMap.name,
			marker_id: marker.id
		});
		const coordinates = `${Math.round(marker.sourceX)}, ${Math.round(marker.sourceY)}`;
		const markerName = marker.name || marker.subtypeLabel;
		const region = regionLabelByName.get(marker.region) || marker.region || "-";
		captureShareReturnFocus();
		setIsGeneratingShareImage(true);
		let previewCreated = false;
		try {
			const blob = await createPointShareCard({
				map: selectedMap,
				mapName: selectedMapText.name,
				locale,
				shareUrl,
				linkLabel: text.progressCardLinkLabel,
				markerName,
				categoryLabel: marker.categoryLabel,
				subtypeLabel: marker.subtypeLabel,
				coordinates,
				region,
				iconUrl: markerIconUrl(marker, selectedMap, assetBasePath),
				pointLabel: text.pointDetails,
				coordinatesLabel: text.coordinates,
				regionLabel: text.region
			});
			setSharePreview({
				kind: "point",
				blob,
				imageUrl: URL.createObjectURL(blob),
				shareUrl,
				fileName: pointShareCardFilename(selectedMap, locale),
				title: `${markerName} | ${text.documentTitle}`,
				shareText: text.markerShareText(markerName, selectedMapText.name, coordinates),
				mapName: selectedMapText.name,
				heading: text.share,
				summaryLabel: text.pointDetails,
				summaryValue: `${marker.subtypeLabel} · ${coordinates}`,
				copiedMessage: text.pointLinkCopied
			});
			previewCreated = true;
		} catch (error) {
			console.error("Failed to create point share image", error);
			await shareUrlOrCopy({
				url: shareUrl,
				title: `${markerName} | ${text.documentTitle}`,
				shareText: text.markerShareText(markerName, selectedMapText.name, coordinates),
				copiedMessage: text.pointLinkCopied
			});
		} finally {
			setIsGeneratingShareImage(false);
			if (!previewCreated) restoreShareReturnFocus();
		}
	}, [
		assetBasePath,
		buildShareUrl,
		captureShareReturnFocus,
		isGeneratingShareImage,
		locale,
		payload,
		regionLabelByName,
		selectedMap,
		selectedMapText,
		restoreShareReturnFocus,
		shareUrlOrCopy,
		text
	]);
	const shareCollectionProgress = (0, import_react.useCallback)(async () => {
		if (!payload || !selectedMap || !selectedMapText || isGeneratingShareImage) return;
		const progressIds = sharedProgress?.mapName === selectedMap.name ? sharedProgress.foundMarkerIds : readLatestFoundForMap(selectedMap.name, foundMarkerIds);
		let encoded = null;
		try {
			encoded = encodeSharedMapProgress(payload, selectedMap.name, progressIds).token;
		} catch (error) {
			console.error("Failed to encode map progress", error);
		}
		const url = buildShareUrl();
		if (!url || !encoded) {
			setIsGeneratingShareImage(false);
			showNotice(text.shareFailed);
			return;
		}
		url.hash = new URLSearchParams({ p: encoded }).toString();
		const shareUrl = url.toString();
		trackEvent("map_progress_share", {
			tool_name: "interactive_map",
			locale,
			map_name: selectedMap.name,
			found_count: progressIds.size
		});
		const progressBreakdown = buildCollectibleBreakdown(progressIds);
		const progressSnapshot = progressBreakdown.reduce((progress, item) => ({
			foundCount: progress.foundCount + item.foundCount,
			totalCount: progress.totalCount + item.totalCount
		}), {
			foundCount: 0,
			totalCount: 0
		});
		captureShareReturnFocus();
		setIsGeneratingShareImage(true);
		let previewCreated = false;
		try {
			const blob = await createProgressShareCard({
				map: selectedMap,
				mapName: selectedMapText.name,
				locale,
				foundCount: progressSnapshot.foundCount,
				totalCount: progressSnapshot.totalCount,
				shareUrl,
				breakdown: progressBreakdown,
				progressLabel: text.collectibleProgress,
				breakdownLabel: text.collectionBreakdown,
				noBreakdownLabel: text.noCollectionBreakdown,
				linkLabel: text.progressCardLinkLabel
			});
			setSharePreview({
				kind: "progress",
				blob,
				imageUrl: URL.createObjectURL(blob),
				shareUrl,
				fileName: progressShareCardFilename(selectedMap, locale),
				title: `${selectedMapText.name} | ${text.shareProgress}`,
				shareText: text.progressShareText(selectedMapText.name, progressSnapshot.foundCount, progressSnapshot.totalCount),
				mapName: selectedMapText.name,
				heading: text.shareCurrentMapProgress,
				summaryLabel: text.currentMapOnly(selectedMapText.name),
				summaryValue: `${formatNumber(progressSnapshot.foundCount, locale)}/${formatNumber(progressSnapshot.totalCount, locale)}`,
				copiedMessage: text.progressLinkCopied
			});
			previewCreated = true;
		} catch (error) {
			console.error("Failed to create progress share image", error);
			await shareUrlOrCopy({
				url: shareUrl,
				title: `${selectedMapText.name} | ${text.shareCurrentMapProgress}`,
				shareText: text.progressShareText(selectedMapText.name, progressSnapshot.foundCount, progressSnapshot.totalCount),
				copiedMessage: text.progressLinkCopied
			});
		} finally {
			setIsGeneratingShareImage(false);
			if (!previewCreated) restoreShareReturnFocus();
		}
	}, [
		buildCollectibleBreakdown,
		buildShareUrl,
		captureShareReturnFocus,
		foundMarkerIds,
		isGeneratingShareImage,
		locale,
		payload,
		readLatestFoundForMap,
		restoreShareReturnFocus,
		selectedMap,
		selectedMapText,
		shareUrlOrCopy,
		sharedProgress,
		showNotice,
		text
	]);
	const shareRoute = (0, import_react.useCallback)(async () => {
		if (!payload || !selectedMap || !selectedMapText || isGeneratingShareImage) return;
		if (routeMarkers.length < 2) {
			showNotice(text.routeNeedsTwo);
			return;
		}
		const encodedRoute = encodeSharedRoute(payload, selectedMap.name, routeMarkerIds);
		const url = buildShareUrl();
		if (!encodedRoute || !url) {
			showNotice(text.shareFailed);
			return;
		}
		url.hash = new URLSearchParams({ r: encodedRoute }).toString();
		const shareUrl = url.toString();
		trackEvent("map_route_share", {
			tool_name: "interactive_map",
			locale,
			map_name: selectedMap.name,
			stop_count: routeMarkers.length
		});
		const stopsLabel = text.routeStopsLabel(routeMarkers.length);
		captureShareReturnFocus();
		setIsGeneratingShareImage(true);
		let previewCreated = false;
		try {
			const blob = await createRouteShareCard({
				map: selectedMap,
				mapName: selectedMapText.name,
				locale,
				shareUrl,
				linkLabel: text.progressCardLinkLabel,
				routeLabel: text.routeBuilder,
				stopsLabel,
				steps: routeMarkers.map((marker) => ({
					name: marker.name || marker.subtypeLabel,
					iconUrl: markerIconUrl(marker, selectedMap, assetBasePath)
				}))
			});
			setSharePreview({
				kind: "route",
				blob,
				imageUrl: URL.createObjectURL(blob),
				shareUrl,
				fileName: routeShareCardFilename(selectedMap, locale),
				title: `${selectedMapText.name} | ${text.shareRoute}`,
				shareText: text.routeShareText(selectedMapText.name, routeMarkers.length),
				mapName: selectedMapText.name,
				heading: text.shareRoute,
				summaryLabel: text.routeBuilder,
				summaryValue: stopsLabel,
				copiedMessage: text.routeLinkCopied
			});
			previewCreated = true;
		} catch (error) {
			console.error("Failed to create route share image", error);
			await shareUrlOrCopy({
				url: shareUrl,
				title: `${selectedMapText.name} | ${text.shareRoute}`,
				shareText: text.routeShareText(selectedMapText.name, routeMarkers.length),
				copiedMessage: text.routeLinkCopied
			});
		} finally {
			setIsGeneratingShareImage(false);
			if (!previewCreated) restoreShareReturnFocus();
		}
	}, [
		assetBasePath,
		buildShareUrl,
		captureShareReturnFocus,
		isGeneratingShareImage,
		locale,
		payload,
		routeMarkerIds,
		routeMarkers,
		restoreShareReturnFocus,
		selectedMap,
		selectedMapText,
		shareUrlOrCopy,
		showNotice,
		text
	]);
	const downloadShareImage = (0, import_react.useCallback)(() => {
		if (!sharePreview) return;
		const anchor = document.createElement("a");
		anchor.href = sharePreview.imageUrl;
		anchor.download = sharePreview.fileName;
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
	}, [sharePreview]);
	const saveShareImage = (0, import_react.useCallback)(() => {
		downloadShareImage();
		showNotice(text.shareImageSaved);
	}, [
		downloadShareImage,
		showNotice,
		text.shareImageSaved
	]);
	const copyShareLink = (0, import_react.useCallback)(async () => {
		if (!sharePreview) return;
		showNotice(await copyText(sharePreview.shareUrl) ? sharePreview.copiedMessage : text.shareFailed);
	}, [
		sharePreview,
		showNotice,
		text.shareFailed
	]);
	const shareCurrentImage = (0, import_react.useCallback)(async () => {
		if (!sharePreview) return;
		const file = new File([sharePreview.blob], sharePreview.fileName, { type: "image/png" });
		const shareData = {
			files: [file],
			title: sharePreview.title,
			text: `${sharePreview.shareText}\n${sharePreview.shareUrl}`
		};
		const canShareFile = typeof window.navigator.canShare === "function" && window.navigator.canShare({ files: [file] });
		if (window.navigator.share && canShareFile) try {
			await window.navigator.share(shareData);
			closeSharePreview();
			showNotice(text.shareComplete);
			return;
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") return;
		}
		await shareUrlOrCopy({
			url: sharePreview.shareUrl,
			title: sharePreview.title,
			shareText: sharePreview.shareText,
			copiedMessage: sharePreview.copiedMessage
		});
	}, [
		closeSharePreview,
		sharePreview,
		shareUrlOrCopy,
		showNotice,
		text.shareComplete
	]);
	const dismissSharedProgress = (0, import_react.useCallback)(() => {
		setSharedProgress(null);
		updateCurrentUrl((_url, hash) => clearHashParameters(hash, ["p", "progress"]));
	}, []);
	const importSharedProgress = (0, import_react.useCallback)(async () => {
		if (!selectedMap || !selectedMapText || !sharedProgress || sharedProgress.mapName !== selectedMap.name) {
			showNotice(text.progressImportFailed);
			return;
		}
		const { next, saved } = await persistFoundForMap(selectedMap.name, foundMarkerIds, (latest) => {
			for (const markerId of sharedProgress.foundMarkerIds) latest.add(markerId);
		});
		if (!saved) {
			showNotice(text.progressImportFailed);
			return;
		}
		setFoundMarkerIds(next);
		setSharedProgress(null);
		updateCurrentUrl((_url, hash) => clearHashParameters(hash, ["p", "progress"]));
		showNotice(text.progressImportedForMap(selectedMapText.name, sharedProgress.foundCount));
	}, [
		foundMarkerIds,
		persistFoundForMap,
		selectedMap,
		selectedMapText,
		sharedProgress,
		showNotice,
		text
	]);
	if (!payload || !translations || !selectedMap || !selectedMapText) {
		const hasLoadError = mapDataLoad.status === "error" || translationLoad.status === "error";
		const statusText = (status, resource) => {
			if (status.status === "loading") return text.loadStateLoading;
			if (status.status === "ready") return text.loadStateReady;
			return status.reason === "timeout" ? text.loadTimedOut(resource) : text.loadFailed(resource);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapRoot, {
			ref: mapShellRef,
			className: "map-shell loading-shell",
			lang: locale,
			"data-embedded": embedded ? "true" : void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "load-state-panel",
				role: hasLoadError ? "alert" : "status",
				"aria-live": "polite",
				"aria-busy": !hasLoadError,
				children: [
					hasLoadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						size: 30,
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "share-spinner",
						size: 30,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapTitle, { children: text.loadingMapApp }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "load-resource-list",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-status": mapDataLoad.status,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: text.mapDataResource }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: statusText(mapDataLoad, text.mapDataResource) })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-status": translationLoad.status,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: text.translationResource }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: statusText(translationLoad, text.translationResource) })]
						})]
					}),
					hasLoadError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "load-retry-button",
						onClick: () => {
							setPayload(null);
							setTranslations(null);
							setMapDataLoad({ status: "loading" });
							setTranslationLoad({ status: "loading" });
							setLoadAttempt((value) => value + 1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							size: 16,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.retryLoading })]
					})
				]
			})
		});
	}
	const mapAccessibleName = text.mapCanvasLabel(selectedMapText.name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapRoot, {
		ref: mapShellRef,
		className: "map-shell",
		lang: locale,
		"data-embedded": embedded ? "true" : void 0,
		"data-fullscreen-mode": fullscreenMode !== "off" ? fullscreenMode : void 0,
		"data-sidebar-collapsed": sidebarCollapsed ? "true" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "map-sidebar",
			"aria-hidden": sidebarCollapsed || Boolean(sharePreview),
			inert: sidebarCollapsed || Boolean(sharePreview) ? true : void 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "brand-block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "AION2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapTitle, { children: text.appTitle })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "brand-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "brand-action-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "language-select",
								value: locale,
								"aria-label": text.language,
								title: text.language,
								onChange: (event) => {
									if (isLocale(event.target.value)) changeLocale(event.target.value);
								},
								children: LANGUAGE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: option.value,
									children: option.label
								}, option.value))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "sidebar-collapse-button",
								ref: collapseSidebarButtonRef,
								"aria-label": text.collapseSidebar,
								title: text.collapseSidebar,
								onClick: collapseSidebar,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, {
									size: 16,
									"aria-hidden": "true"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "total-pill",
							children: markers.length ? `${filteredMarkers.length}/${markers.length}` : "0"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "control-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "field-label",
							htmlFor: "map-select",
							children: text.map
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "map-select",
							value: selectedMap.name,
							onChange: (event) => changeMap(event.target.value),
							children: maps.map((map) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: map.name,
								children: localeBundle?.maps[map.name]?.name ?? map.displayName
							}, map.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "map-meta",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedMapText.description }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								formatNumber(selectedMap.width, locale),
								" x ",
								formatNumber(selectedMap.height, locale)
							] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "control-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "field-label",
						htmlFor: "marker-search",
						children: text.search
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "marker-search",
						value: query,
						onChange: (event) => {
							setQuery(event.target.value);
							setMarkerPage(0);
						},
						placeholder: text.searchPlaceholder
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "control-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "field-label",
							children: text.types
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "filter-shortcuts",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-button",
									onClick: () => {
										setSelectedSubtypes(new Set(allSubtypeNamesForMap));
										setMarkerPage(0);
									},
									children: text.all
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-button muted-action",
									onClick: () => {
										setSelectedSubtypes(/* @__PURE__ */ new Set());
										setMarkerPage(0);
									},
									children: text.hideAll
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "section-collapse-button",
									"aria-controls": "type-groups",
									"aria-expanded": !typesCollapsed,
									"aria-label": typesCollapsed ? text.expandTypes : text.collapseTypes,
									title: typesCollapsed ? text.expandTypes : text.collapseTypes,
									onClick: () => setTypesCollapsed((collapsed) => !collapsed),
									children: typesCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										size: 16,
										"aria-hidden": "true"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
										size: 16,
										"aria-hidden": "true"
									})
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "type-groups",
						className: "type-groups",
						hidden: typesCollapsed,
						children: categoriesForMap.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "empty-copy",
							children: text.noMarkerData
						}) : categoriesForMap.map((category) => {
							const subtypeNames = category.subtypes.map((subtype) => subtype.name);
							const activeCount = subtypeNames.filter((name) => selectedSubtypes.has(name)).length;
							const allActive = activeCount === subtypeNames.length;
							const categoryLabel = localeBundle?.categories[category.name] ?? category.label;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "type-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "type-group-header",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: categoryLabel }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "chip-count",
											children: [
												activeCount,
												"/",
												subtypeNames.length,
												" · ",
												category.count
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "type-group-toggle",
											"aria-pressed": allActive,
											"aria-label": allActive ? text.hideNamed(categoryLabel) : text.showNamed(categoryLabel),
											onClick: () => setSubtypesActive(subtypeNames, !allActive),
											children: allActive ? text.hide : text.show
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "subtype-grid",
									children: category.subtypes.map((subtype) => {
										const active = selectedSubtypes.has(subtype.name);
										const iconUrl = subtypeIconUrl(subtype, selectedMap, assetBasePath);
										const foundCount = foundCountsBySubtype.get(subtype.name) ?? 0;
										const subtypeLabel = localeBundle?.subtypes[subtype.name] ?? subtype.label;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: `subtype-chip ${active ? "active" : ""}`,
											"aria-pressed": active,
											"aria-label": `${active ? text.hideNamed(subtypeLabel) : text.showNamed(subtypeLabel)} (${subtype.count})`,
											onClick: () => toggleSubtype(subtype.name),
											title: subtypeLabel,
											children: [
												iconUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													className: "chip-icon",
													src: iconUrl,
													alt: text.iconImageAlt(subtypeLabel),
													draggable: false
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "chip-fallback",
													style: { background: categoryPalette[category.name] ?? subtype.color }
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: subtypeLabel }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "chip-count",
													children: subtype.canComplete || foundCount > 0 ? `${foundCount}/${subtype.count}` : subtype.count
												})
											]
										}, subtype.name);
									})
								})]
							}, category.name);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "control-section compact-controls",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMarkerPage(0);
								mapRef.current?.fit();
							},
							children: text.reset
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowLabels((value) => !value),
							className: showLabels ? "active" : "",
							"aria-pressed": showLabels,
							"aria-label": showLabels ? text.hideNamed(text.names) : text.showNamed(text.names),
							children: text.names
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowRegions((value) => !value),
							className: showRegions ? "active" : "",
							"aria-pressed": showRegions,
							"aria-label": showRegions ? text.hideNamed(text.regions) : text.showNamed(text.regions),
							children: text.regions
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: routeMode ? closeRoute : beginRoute,
							className: routeMode ? "active route-control-action" : "route-control-action",
							"aria-pressed": routeMode,
							disabled: selectedMapDataUnavailable,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
								size: 14,
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: routeMode ? text.closeRoute : text.createRoute })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "share-progress-action",
							onClick: shareCollectionProgress,
							disabled: isGeneratingShareImage || selectedMapDataUnavailable,
							"aria-label": text.shareCurrentMapProgress,
							children: [isGeneratingShareImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "share-spinner",
								size: 14,
								"aria-hidden": "true"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
								size: 14,
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isGeneratingShareImage ? text.generatingShareImage : text.shareCurrentMapProgress })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "marker-list-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "field-label",
								children: text.markers
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "marker-range",
								"aria-live": "polite",
								children: text.markerRange(markerRangeStart, markerRangeEnd, filteredMarkers.length)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "marker-list",
							children: [
								selectedMapDataUnavailable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sidebar-empty-state",
									role: "status",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: text.mapDataUnavailableTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.mapDataUnavailableDetail })]
								}),
								!selectedMapDataUnavailable && filteredMarkers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "empty-copy",
									children: text.noMarkerData
								}),
								pagedMarkers.map((marker) => {
									const iconUrl = markerIconUrl(marker, selectedMap, assetBasePath);
									const isFound = activeFoundMarkerIds.has(marker.id);
									const routeOrder = routeMarkerIds.indexOf(marker.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: `marker-row ${selectedMarkerId === marker.id ? "selected" : ""} ${isFound ? "found" : ""} ${routeOrder >= 0 ? "route-stop" : ""}`,
										"aria-current": selectedMarkerId === marker.id ? "true" : void 0,
										"aria-label": `${marker.name || marker.subtypeLabel} — ${marker.categoryLabel} / ${marker.subtypeLabel}`,
										onClick: () => routeMode ? addRouteMarker(marker, "marker-list-route") : focusMarker(marker, "marker-list"),
										children: [
											iconUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												className: "marker-row-icon",
												src: iconUrl,
												alt: text.iconImageAlt(marker.name || marker.subtypeLabel),
												loading: "lazy",
												decoding: "async",
												draggable: false
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "marker-row-dot",
												style: { background: displayColor(marker) }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "marker-row-main",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "marker-row-name",
													children: marker.name || marker.subtypeLabel
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "marker-row-sub",
													children: [
														marker.categoryLabel,
														" / ",
														marker.subtypeLabel
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "coord",
												children: routeOrder >= 0 ? `#${routeOrder + 1}` : isFound ? text.found : `${Math.round(marker.sourceX)}, ${Math.round(marker.sourceY)}`
											})
										]
									}, marker.id);
								})
							]
						}),
						!selectedMapDataUnavailable && filteredMarkers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "marker-pagination",
							"aria-label": text.markers,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMarkerPage((page) => Math.max(0, page - 1)),
									disabled: activeMarkerPage === 0,
									"aria-label": text.previousPage,
									title: text.previousPage,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
										size: 16,
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.previousPage })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pagination-position",
									"aria-live": "polite",
									children: [
										activeMarkerPage + 1,
										"/",
										markerPageCount
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMarkerPage((page) => Math.min(markerPageCount - 1, page + 1)),
									disabled: activeMarkerPage >= markerPageCount - 1,
									"aria-label": text.nextPage,
									title: text.nextPage,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.nextPage }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
										size: 16,
										"aria-hidden": "true"
									})]
								})
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "map-workspace",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "map-interaction-layer",
					"aria-hidden": sharePreview ? true : void 0,
					inert: sharePreview ? true : void 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "top-bar",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "map-title-group",
									children: [sidebarCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "sidebar-expand-button",
										ref: expandSidebarButtonRef,
										"aria-label": text.expandSidebar,
										title: text.expandSidebar,
										onClick: expandSidebar,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, {
											size: 17,
											"aria-hidden": "true"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "map-title",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedMapText.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedMapText.description })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "information-link",
									href: `/${routeLocaleForMapLocale(locale)}/news/`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.information }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "→"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "top-controls",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "zoom-controls",
											"aria-label": text.zoomControls,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": text.zoomOut,
													onClick: () => mapRef.current?.zoomOut(),
													children: "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": text.zoomIn,
													onClick: () => mapRef.current?.zoomIn(),
													children: "+"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": text.resetView,
													onClick: () => mapRef.current?.fit(),
													children: text.reset
												})
											]
										}),
										embedded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "map-fullscreen-button",
											ref: fullscreenButtonRef,
											"aria-label": isFullscreen ? text.exitFullscreen : text.enterFullscreen,
											"aria-pressed": isFullscreen,
											title: isFullscreen ? text.exitFullscreen : text.enterFullscreen,
											onClick: toggleFullscreen,
											children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, {
												size: 16,
												"aria-hidden": "true"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, {
												size: 16,
												"aria-hidden": "true"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "coordinate-readout",
											ref: coordinateRef,
											children: "0, 0"
										})
									]
								})
							]
						}),
						sharedProgress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shared-progress-bar",
							role: "region",
							"aria-label": text.viewingSharedProgress,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shared-progress-copy",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: text.viewingSharedProgressForMap(selectedMapText.name) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									formatNumber(sharedProgress.foundCount, locale),
									"/",
									formatNumber(sharedProgress.totalCount, locale)
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shared-progress-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-label": text.mergeProgressForMap(selectedMapText.name),
									title: text.mergeProgressForMap(selectedMapText.name),
									onClick: importSharedProgress,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
										size: 14,
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.mergeProgress })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "shared-progress-close",
									"aria-label": text.closeSharedProgress,
									title: text.closeSharedProgress,
									onClick: dismissSharedProgress,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										size: 16,
										"aria-hidden": "true"
									})
								})]
							})]
						}),
						routeMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "route-builder-bar",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "route-builder-copy",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
										size: 18,
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: text.routeBuilder }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "route-limit-status",
										"aria-live": "polite",
										children: text.routeStopsLimit(routeMarkerIds.length, 64)
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "route-step-strip",
									"aria-label": text.routeBuilder,
									children: routeMarkers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "route-empty",
										children: text.routeHint
									}) : routeMarkers.map((marker, index) => {
										const iconUrl = markerIconUrl(marker, selectedMap, assetBasePath);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "route-step",
											onClick: () => focusMarkerOnMap(marker),
											"aria-label": `${index + 1}. ${marker.name || marker.subtypeLabel}`,
											title: marker.name || marker.subtypeLabel,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: index + 1 }),
												iconUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: iconUrl,
													alt: text.iconImageAlt(marker.name || marker.subtypeLabel),
													draggable: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: marker.name || marker.subtypeLabel })
											]
										}, marker.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "route-builder-actions",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setRouteMarkerIds((current) => current.slice(0, -1)),
											disabled: routeMarkerIds.length === 0,
											"aria-label": text.undoLast,
											title: text.undoLast,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {
												size: 15,
												"aria-hidden": "true"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setRouteMarkerIds([]);
												setSelectedMarkerId(null);
											},
											disabled: routeMarkerIds.length === 0,
											"aria-label": text.clearRoute,
											title: text.clearRoute,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												size: 15,
												"aria-hidden": "true"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "route-share-action",
											onClick: shareRoute,
											disabled: isGeneratingShareImage,
											title: text.shareRoute,
											children: [isGeneratingShareImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
												className: "share-spinner",
												size: 15,
												"aria-hidden": "true"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
												size: 15,
												"aria-hidden": "true"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.shareRoute })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: closeRoute,
											"aria-label": text.closeRoute,
											title: text.closeRoute,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
												size: 16,
												"aria-hidden": "true"
											})
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "map-viewport maplibre-viewport",
							ref: mapViewportRef,
							role: "region",
							"aria-label": mapAccessibleName,
							"aria-busy": mapEngineStatus.status === "loading",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapLibreMap, {
									ref: mapRef,
									mapInfo: selectedMap,
									accessibleName: mapAccessibleName,
									unavailableLabel: text.mapEngineError,
									assetBasePath,
									markers: filteredMarkers,
									regions,
									foundMarkerIds: activeFoundMarkerIds,
									routeMarkers,
									selectedMarker,
									showLabels,
									showRegions,
									onSelectMarker: selectMarkerFromMap,
									onCoordinate: updateCoordinate,
									onReady: handleMapEngineReady,
									onError: handleMapEngineError
								}, `${selectedMap.name}:${mapEngineAttempt}`),
								mapEngineStatus.status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "map-state-overlay",
									role: "status",
									"aria-live": "polite",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										className: "share-spinner",
										size: 24,
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: text.mapEngineLoading })]
								}),
								mapEngineStatus.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "map-state-overlay map-state-error",
									role: "alert",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											size: 24,
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: text.mapEngineError }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "map-error-detail",
											children: mapEngineStatus.message
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setMapEngineStatus({ status: "loading" });
												setMapEngineAttempt((attempt) => attempt + 1);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
												size: 15,
												"aria-hidden": "true"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.retryMapEngine })]
										})
									]
								}),
								selectedMapDataUnavailable && mapEngineStatus.status === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "map-empty-state",
									role: "status",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
										size: 22,
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: text.mapDataUnavailableTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.mapDataUnavailableDetail })] })]
								})
							]
						}),
						selectedMarker && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "detail-panel",
							"aria-label": text.pointDetails,
							"data-collapsed": detailCollapsed ? "true" : void 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "detail-heading",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "detail-icon-frame",
										children: markerIconUrl(selectedMarker, selectedMap, assetBasePath) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											className: "detail-icon",
											src: markerIconUrl(selectedMarker, selectedMap, assetBasePath),
											alt: text.iconImageAlt(selectedMarker.subtypeLabel),
											"aria-hidden": "true",
											draggable: false
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "detail-dot",
											style: { background: displayColor(selectedMarker) }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selectedMarker.name || selectedMarker.subtypeLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										selectedMarker.categoryLabel,
										" / ",
										selectedMarker.subtypeLabel
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "detail-heading-actions",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "detail-collapse-button",
											"aria-controls": `detail-body-${selectedMarker.id}`,
											"aria-expanded": !detailCollapsed,
											"aria-label": detailCollapsed ? text.expandDetails : text.collapseDetails,
											title: detailCollapsed ? text.expandDetails : text.collapseDetails,
											onClick: () => setDetailCollapsed((collapsed) => !collapsed),
											children: detailCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
												size: 17,
												"aria-hidden": "true"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
												size: 17,
												"aria-hidden": "true"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": text.close,
											onClick: closeMarkerDetails,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
												size: 17,
												"aria-hidden": "true"
											})
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								id: `detail-body-${selectedMarker.id}`,
								className: "detail-body",
								hidden: detailCollapsed,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "detail-grid",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.coordinates }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
												Math.round(selectedMarker.sourceX),
												", ",
												Math.round(selectedMarker.sourceY)
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.mapPixels }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
												Math.round(selectedMarker.x),
												", ",
												Math.round(selectedMarker.y)
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.region }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: regionLabelByName.get(selectedMarker.region) || selectedMarker.region || "-" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.status }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: activeFoundMarkerIds.has(selectedMarker.id) ? text.found : text.notFound })
										]
									}),
									selectedMarker.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "detail-description",
										children: selectedMarker.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "detail-actions",
										children: [
											sharedProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "found-action",
												disabled: true,
												children: text.sharedProgressReadOnly
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: `found-action ${activeFoundMarkerIds.has(selectedMarker.id) ? "active" : ""}`,
												"aria-pressed": activeFoundMarkerIds.has(selectedMarker.id),
												onClick: () => toggleMarkerFound(selectedMarker.id),
												children: activeFoundMarkerIds.has(selectedMarker.id) ? text.cancelFound : text.markFound
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: "primary-action",
												onClick: () => shareMarker(selectedMarker),
												disabled: isGeneratingShareImage,
												children: [isGeneratingShareImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
													className: "share-spinner",
													size: 15,
													"aria-hidden": "true"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
													size: 15,
													"aria-hidden": "true"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.share })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: "checklist-action",
												onClick: () => addMarkerToChecklist(selectedMarker),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, {
													size: 15,
													"aria-hidden": "true"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.addToChecklist })]
											})
										]
									})
								]
							})]
						})
					]
				}),
				sharePreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "share-image-backdrop",
					role: "presentation",
					onMouseDown: (event) => {
						if (event.target === event.currentTarget) closeSharePreview();
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "share-image-dialog",
						ref: shareDialogRef,
						role: "dialog",
						"aria-modal": "true",
						"aria-labelledby": "share-image-title",
						"aria-describedby": "share-image-description",
						tabIndex: -1,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "share-image-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: sharePreview.mapName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "share-image-title",
									children: sharePreview.heading
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									ref: shareDialogCloseRef,
									"aria-label": text.close,
									title: text.close,
									onClick: closeSharePreview,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										size: 17,
										"aria-hidden": "true"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "share-image-preview",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: sharePreview.imageUrl,
									alt: text.shareImageAlt(sharePreview.mapName, sharePreview.heading),
									draggable: false
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "share-image-summary",
								id: "share-image-description",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sharePreview.summaryLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: sharePreview.summaryValue })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "share-image-actions",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "primary-action",
										onClick: shareCurrentImage,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
											size: 15,
											"aria-hidden": "true"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.shareImage })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: saveShareImage,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
											size: 15,
											"aria-hidden": "true"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.saveImage })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: copyShareLink,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
											size: 15,
											"aria-hidden": "true"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.copyLink })]
									})
								]
							})
						]
					})
				}),
				shareNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "share-toast",
					role: "status",
					"aria-live": "polite",
					children: shareNotice
				})
			]
		})]
	});
}
//#endregion
export { InteractiveMap };
