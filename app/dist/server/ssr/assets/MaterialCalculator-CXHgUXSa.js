import { E as __toESM, n as require_jsx_runtime, x as require_react } from "../index.js";
import { d as siteLocaleConfig, f as siteLocales } from "./site-config-EbYJfejA.js";
import { n as trackEvent } from "./analytics-D_3EN7IN.js";
//#region app/material-calculator.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Version 1 is intentionally user-defined only. It must not be used to present
* community estimates or example quantities as official AION2 game data.
*/
var MATERIAL_PLAN_SCHEMA = "aion2kina.material-plan";
var MATERIAL_PLAN_SHARE_KEY = "plan";
var materialPlanLocales = siteLocales;
var materialPlanLimits = {
	maxMaterials: 100,
	maxStages: 100,
	maxCostsPerStage: 100,
	maxTotalCostLines: 1e3,
	maxIdLength: 64,
	maxLabelLength: 120,
	maxSerializedLength: 48e3,
	maxQuantity: Number.MAX_SAFE_INTEGER
};
var MaterialPlanValidationError = class extends Error {
	constructor(code, path, message) {
		super(`${path}: ${message}`);
		this.name = "MaterialPlanValidationError";
		this.code = code;
		this.path = path;
	}
};
var identifierPattern = /^[a-z0-9](?:[a-z0-9._-]{0,63})?$/u;
var controlCharacterPattern = /[\u0000-\u001f\u007f]/u;
var base64UrlAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
var base64UrlValues = new Map([...base64UrlAlphabet].map((character, index) => [character, index]));
function validationError(code, path, message) {
	throw new MaterialPlanValidationError(code, path, message);
}
function recordValue(value, path) {
	if (!value || typeof value !== "object" || Array.isArray(value)) validationError("invalid-type", path, "must be an object");
	return value;
}
function arrayValue(value, path, maximum) {
	if (!Array.isArray(value)) validationError("invalid-type", path, "must be an array");
	if (value.length > maximum) validationError("limit-exceeded", path, `cannot contain more than ${maximum} entries`);
	return value;
}
function labelValue(value, path) {
	if (typeof value !== "string") validationError("invalid-type", path, "must be a string");
	const normalized = value.trim();
	if (!normalized) validationError("out-of-range", path, "cannot be empty");
	if (controlCharacterPattern.test(normalized)) validationError("out-of-range", path, "must be a single-line label");
	if ([...normalized].length > materialPlanLimits.maxLabelLength) validationError("limit-exceeded", path, `cannot exceed ${materialPlanLimits.maxLabelLength} characters`);
	return normalized;
}
function identifierValue(value, path) {
	if (typeof value !== "string") validationError("invalid-type", path, "must be a string");
	if (value.length > materialPlanLimits.maxIdLength || !identifierPattern.test(value)) validationError("invalid-id", path, "must be a lowercase stable identifier using letters, numbers, dots, underscores, or hyphens");
	return value;
}
function integerValue(value, path, minimum, maximum = materialPlanLimits.maxQuantity) {
	if (!Number.isSafeInteger(value)) validationError("invalid-integer", path, "must be a safe integer");
	const quantity = value;
	if (quantity < minimum || quantity > maximum) validationError("out-of-range", path, `must be between ${minimum} and ${maximum}`);
	return Object.is(quantity, -0) ? 0 : quantity;
}
function checkedAdd(left, right, path) {
	const total = left + right;
	if (!Number.isSafeInteger(total)) validationError("unsafe-arithmetic", path, "sum exceeds the safe integer boundary");
	return total;
}
function checkedMultiply(left, right, path) {
	const total = left * right;
	if (!Number.isSafeInteger(total)) validationError("unsafe-arithmetic", path, "product exceeds the safe integer boundary");
	return total;
}
function ensureUnique(values, value, path) {
	if (values.has(value)) validationError("duplicate-id", path, `duplicates ${value}`);
}
/**
* Runtime validation is deliberately strict because share fragments are
* untrusted input. Unknown object properties are discarded from the canonical
* state returned by this function.
*/
function validateMaterialPlanState(value) {
	const root = recordValue(value, "plan");
	if (root.schema !== "aion2kina.material-plan") validationError("unsupported-schema", "plan.schema", `must equal ${MATERIAL_PLAN_SCHEMA}`);
	if (root.schemaVersion !== 1) validationError("unsupported-version", "plan.schemaVersion", `must equal 1`);
	const provenance = recordValue(root.provenance, "plan.provenance");
	if (provenance.kind !== "user-defined" || provenance.officialGameData !== false) validationError("invalid-provenance", "plan.provenance", "version 1 accepts only user-defined, non-official quantities");
	if (typeof root.locale !== "string" || !materialPlanLocales.includes(root.locale)) validationError("out-of-range", "plan.locale", `must be one of ${materialPlanLocales.join(", ")}`);
	const locale = root.locale;
	const title = labelValue(root.title, "plan.title");
	const materialValues = arrayValue(root.materials, "plan.materials", materialPlanLimits.maxMaterials);
	const materialIds = /* @__PURE__ */ new Set();
	const materials = materialValues.map((value, index) => {
		const path = `plan.materials[${index}]`;
		const material = recordValue(value, path);
		const id = identifierValue(material.id, `${path}.id`);
		ensureUnique(materialIds, id, `${path}.id`);
		materialIds.add(id);
		return {
			id,
			name: labelValue(material.name, `${path}.name`)
		};
	});
	const stageValues = arrayValue(root.stages, "plan.stages", materialPlanLimits.maxStages);
	const stageIds = /* @__PURE__ */ new Set();
	let totalCostLines = 0;
	const stages = stageValues.map((value, stageIndex) => {
		const path = `plan.stages[${stageIndex}]`;
		const stage = recordValue(value, path);
		const id = identifierValue(stage.id, `${path}.id`);
		ensureUnique(stageIds, id, `${path}.id`);
		stageIds.add(id);
		const costValues = arrayValue(stage.costs, `${path}.costs`, materialPlanLimits.maxCostsPerStage);
		totalCostLines = checkedAdd(totalCostLines, costValues.length, "plan.stages.costs");
		if (totalCostLines > materialPlanLimits.maxTotalCostLines) validationError("limit-exceeded", "plan.stages.costs", `cannot contain more than ${materialPlanLimits.maxTotalCostLines} total entries`);
		const stageMaterialIds = /* @__PURE__ */ new Set();
		const costs = costValues.map((costValue, costIndex) => {
			const costPath = `${path}.costs[${costIndex}]`;
			const cost = recordValue(costValue, costPath);
			const materialId = identifierValue(cost.materialId, `${costPath}.materialId`);
			if (!materialIds.has(materialId)) validationError("unknown-material", `${costPath}.materialId`, `references undefined material ${materialId}`);
			ensureUnique(stageMaterialIds, materialId, `${costPath}.materialId`);
			stageMaterialIds.add(materialId);
			return {
				materialId,
				quantity: integerValue(cost.quantity, `${costPath}.quantity`, 1)
			};
		});
		return {
			id,
			name: labelValue(stage.name, `${path}.name`),
			targetCount: integerValue(stage.targetCount, `${path}.targetCount`, 0),
			costs
		};
	});
	const inventoryValues = arrayValue(root.inventory, "plan.inventory", materialPlanLimits.maxMaterials);
	const inventoryMaterialIds = /* @__PURE__ */ new Set();
	return {
		schema: MATERIAL_PLAN_SCHEMA,
		schemaVersion: 1,
		provenance: {
			kind: "user-defined",
			officialGameData: false
		},
		locale,
		title,
		materials,
		stages,
		inventory: inventoryValues.map((value, index) => {
			const path = `plan.inventory[${index}]`;
			const entry = recordValue(value, path);
			const materialId = identifierValue(entry.materialId, `${path}.materialId`);
			if (!materialIds.has(materialId)) validationError("unknown-material", `${path}.materialId`, `references undefined material ${materialId}`);
			ensureUnique(inventoryMaterialIds, materialId, `${path}.materialId`);
			inventoryMaterialIds.add(materialId);
			return {
				materialId,
				quantity: integerValue(entry.quantity, `${path}.quantity`, 0)
			};
		})
	};
}
function createMaterialPlanState(draft) {
	return validateMaterialPlanState({
		schema: MATERIAL_PLAN_SCHEMA,
		schemaVersion: 1,
		provenance: {
			kind: "user-defined",
			officialGameData: false
		},
		...draft
	});
}
/**
* Calculates deterministic requirements only. It does not estimate success
* chances, failure costs, market prices, drop rates, or any other game value.
*/
function calculateMaterialPlan(input) {
	const state = validateMaterialPlanState(input);
	const requiredByMaterial = new Map(state.materials.map((material) => [material.id, 0]));
	let targetCount = 0;
	const stages = state.stages.map((stage, stageIndex) => {
		targetCount = checkedAdd(targetCount, stage.targetCount, "calculation.targetCount");
		const materials = stage.costs.map((cost, costIndex) => {
			const path = `calculation.stages[${stageIndex}].costs[${costIndex}]`;
			const required = checkedMultiply(cost.quantity, stage.targetCount, `${path}.required`);
			requiredByMaterial.set(cost.materialId, checkedAdd(requiredByMaterial.get(cost.materialId) ?? 0, required, `calculation.materials.${cost.materialId}.required`));
			return {
				materialId: cost.materialId,
				quantityPerTarget: cost.quantity,
				required
			};
		});
		return {
			id: stage.id,
			name: stage.name,
			targetCount: stage.targetCount,
			materials
		};
	});
	const inventoryByMaterial = new Map(state.inventory.map((entry) => [entry.materialId, entry.quantity]));
	const materials = state.materials.map((material) => {
		const required = requiredByMaterial.get(material.id) ?? 0;
		const inventory = inventoryByMaterial.get(material.id) ?? 0;
		const covered = Math.min(required, inventory);
		const shortage = Math.max(required - inventory, 0);
		const surplus = Math.max(inventory - required, 0);
		return {
			materialId: material.id,
			name: material.name,
			required,
			inventory,
			covered,
			shortage,
			surplus,
			completionRatio: required === 0 ? null : covered / required,
			hasTarget: required > 0,
			isComplete: required > 0 && shortage === 0
		};
	});
	const targeted = materials.filter((material) => material.hasTarget);
	const completeMaterials = targeted.filter((material) => material.isComplete).length;
	const hasTarget = targeted.length > 0;
	const completionRatio = hasTarget ? targeted.reduce((total, material) => total + (material.completionRatio ?? 0), 0) / targeted.length : null;
	return {
		stages,
		materials,
		totals: {
			targetCount,
			targetedMaterials: targeted.length,
			completeMaterials,
			completionRatio,
			hasTarget,
			isComplete: hasTarget && completeMaterials === targeted.length
		}
	};
}
function encodeBase64Url(value) {
	const bytes = new TextEncoder().encode(value);
	let encoded = "";
	for (let index = 0; index < bytes.length; index += 3) {
		const first = bytes[index] ?? 0;
		const second = bytes[index + 1];
		const third = bytes[index + 2];
		encoded += base64UrlAlphabet[first >> 2];
		encoded += base64UrlAlphabet[(first & 3) << 4 | (second ?? 0) >> 4];
		if (second !== void 0) encoded += base64UrlAlphabet[(second & 15) << 2 | (third ?? 0) >> 6];
		if (third !== void 0) encoded += base64UrlAlphabet[third & 63];
	}
	return encoded;
}
function decodeBase64Url(value) {
	if (!value || !/^[A-Za-z0-9_-]+$/u.test(value) || value.length % 4 === 1) throw new Error("Invalid base64url payload");
	let bitBuffer = 0;
	let bitCount = 0;
	const bytes = [];
	for (const character of value) {
		const digit = base64UrlValues.get(character);
		if (digit === void 0) throw new Error("Invalid base64url character");
		bitBuffer = bitBuffer << 6 | digit;
		bitCount += 6;
		if (bitCount >= 8) {
			bitCount -= 8;
			bytes.push(bitBuffer >> bitCount & 255);
			bitBuffer &= (1 << bitCount) - 1;
		}
	}
	if (bitCount > 0 && bitBuffer !== 0) throw new Error("Non-canonical base64url padding bits");
	return new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bytes));
}
function extractSharePayload(serialized) {
	const trimmed = serialized.trim();
	if (!trimmed) return null;
	if (/^[a-z][a-z0-9+.-]*:/iu.test(trimmed)) {
		let url;
		try {
			url = new URL(trimmed);
		} catch {
			return null;
		}
		const hash = url.hash.replace(/^#/u, "");
		if (hash) return new URLSearchParams(hash).get("plan") ?? hash;
		return url.searchParams.get(MATERIAL_PLAN_SHARE_KEY);
	}
	const fragment = trimmed.replace(/^[#?]/u, "");
	if (fragment.startsWith(`plan=`) || fragment.includes(`&plan=`)) return new URLSearchParams(fragment).get(MATERIAL_PLAN_SHARE_KEY);
	return fragment;
}
function serializeMaterialPlanState(input) {
	const state = validateMaterialPlanState(input);
	const serialized = encodeBase64Url(JSON.stringify(state));
	if (serialized.length > materialPlanLimits.maxSerializedLength) validationError("limit-exceeded", "plan", `serialized state cannot exceed ${materialPlanLimits.maxSerializedLength} characters`);
	return serialized;
}
function buildMaterialPlanShareFragment(input) {
	return `#${MATERIAL_PLAN_SHARE_KEY}=${serializeMaterialPlanState(input)}`;
}
function parseMaterialPlanState(serialized) {
	if (typeof serialized !== "string" || serialized.length > materialPlanLimits.maxSerializedLength + 4096) return {
		ok: false,
		code: "payload-too-large",
		message: "The shared plan exceeds the supported size."
	};
	const payload = extractSharePayload(serialized);
	if (!payload) return {
		ok: false,
		code: "missing-payload",
		message: "No material plan was found."
	};
	if (payload.length > materialPlanLimits.maxSerializedLength) return {
		ok: false,
		code: "payload-too-large",
		message: "The shared plan exceeds the supported size."
	};
	let decoded;
	try {
		decoded = decodeBase64Url(payload);
	} catch {
		return {
			ok: false,
			code: "malformed-payload",
			message: "The shared plan encoding is invalid."
		};
	}
	let value;
	try {
		value = JSON.parse(decoded);
	} catch {
		return {
			ok: false,
			code: "malformed-json",
			message: "The shared plan JSON is invalid."
		};
	}
	try {
		return {
			ok: true,
			state: validateMaterialPlanState(value)
		};
	} catch (error) {
		if (error instanceof MaterialPlanValidationError) return {
			ok: false,
			code: error.code === "unsupported-schema" ? "unsupported-schema" : error.code === "unsupported-version" ? "unsupported-version" : "invalid-state",
			message: error.message
		};
		return {
			ok: false,
			code: "invalid-state",
			message: "The shared plan state is invalid."
		};
	}
}
var materialPlanTemplateKinds = ["blank", "custom-example"];
var blankTemplateCopy = {
	"zh-hant": {
		name: "空白自訂計畫",
		description: "從空白計畫開始，自行輸入階段、每次材料成本、目標次數與目前庫存。",
		notice: "此範本不包含任何 AION2 官方成本；所有名稱與數量都由使用者輸入。",
		planTitle: "空白自訂材料計畫",
		materialNames: ["示例材料 A", "示例材料 B"],
		stageNames: ["示例階段一", "示例階段二"]
	},
	en: {
		name: "Blank custom plan",
		description: "Start with an empty plan and enter stages, per-target costs, target counts, and current inventory.",
		notice: "This template contains no official AION2 costs; every name and quantity is user-entered.",
		planTitle: "Blank custom material plan",
		materialNames: ["Example material A", "Example material B"],
		stageNames: ["Example stage one", "Example stage two"]
	},
	"zh-hans": {
		name: "空白自定义计划",
		description: "从空白计划开始，自行输入阶段、每次材料成本、目标次数与当前库存。",
		notice: "此范本不包含任何 AION2 官方成本；所有名称与数量都由用户输入。",
		planTitle: "空白自定义材料计划",
		materialNames: ["示例材料 A", "示例材料 B"],
		stageNames: ["示例阶段一", "示例阶段二"]
	},
	"de": {
		name: "Leerer benutzerdefinierter Plan",
		description: "Beginnen Sie mit einem leeren Plan und geben Sie Phasen, Kosten pro Ziel, Zielanzahl und aktuelles Inventar ein.",
		notice: "Diese Vorlage enthält keine offiziellen AION2 Kosten; jeder Name und jede Menge wird vom Benutzer eingegeben.",
		planTitle: "Leerer benutzerdefinierter Materialplan",
		materialNames: ["Beispielmaterial A", "Beispielmaterial B"],
		stageNames: ["Beispielstufe 1", "Beispielstufe 2"]
	},
	"fr": {
		name: "Plan personnalisé vierge",
		description: "Commencez par un plan vide et entrez les étapes, les coûts par cible, les dénombrements des cibles et l'inventaire actuel.",
		notice: "Ce modèle ne contient aucun coût officiel AION2 ; chaque nom et chaque quantité sont entrés par l'utilisateur.",
		planTitle: "Plan de matériaux sur mesure",
		materialNames: ["Exemple de matériel A", "Exemple de matériel B"],
		stageNames: ["Exemple de première étape", "Exemple de deuxième étape"]
	},
	"es": {
		name: "Plan personalizado en blanco",
		description: "Comience con un plan vacío y entre etapas, costos per-objetivo, conteos de destino y inventario actual.",
		notice: "Esta plantilla no contiene los costos oficiales de AION2; cada nombre y cantidad es de usuario.",
		planTitle: "Plan de material personalizado",
		materialNames: ["Material de ejemplo A", "Ejemplo de material B"],
		stageNames: ["Ejemplo de la primera etapa", "Ejemplo de la segunda etapa"]
	},
	"ja": {
		name: "空のカスタムプラン",
		description: "空のプランから始め、段階、目標1回あたりの材料数、目標回数、現在の所持数を入力します。",
		notice: "このテンプレートにAION2公式の必要数は含まれません。名前と数量はすべてユーザー入力です。",
		planTitle: "空のカスタム材料プラン",
		materialNames: ["サンプル材料A", "サンプル材料B"],
		stageNames: ["サンプル段階1", "サンプル段階2"]
	},
	"pt-br": {
		name: "Plano personalizado em branco",
		description: "Comece com um plano vazio e insira etapas, custos por alvo, contagens de alvo e inventário atual.",
		notice: "Este modelo não contém nenhum custo oficial do AION2; cada nome e quantidade é digitado pelo usuário.",
		planTitle: "Plano de materiais personalizados em branco",
		materialNames: ["Material de exemplo A", "Material de exemplo B"],
		stageNames: ["Fase de exemplo um", "Fase de exemplo dois"]
	},
	"ru": {
		name: "Бланковый индивидуальный план",
		description: "Начните с пустого плана и введите этапы, целевые затраты, количество целей и текущий инвентарь.",
		notice: "Этот шаблон не содержит официальных затрат AION2; каждое имя и количество вводится пользователем.",
		planTitle: "Бланковый индивидуальный план материалов",
		materialNames: ["Пример материала A", "Пример материала B"],
		stageNames: ["Примерный этап один", "Примерный этап два"]
	},
	ko: {
		name: "빈 사용자 계획",
		description: "빈 계획에서 단계, 1회당 재료 비용, 목표 횟수와 현재 보유량을 직접 입력합니다.",
		notice: "이 템플릿에는 AION2 공식 비용이 없으며 모든 이름과 수량은 사용자가 입력합니다.",
		planTitle: "빈 사용자 재료 계획",
		materialNames: ["예시 재료 A", "예시 재료 B"],
		stageNames: ["예시 단계 1", "예시 단계 2"]
	}
};
var exampleTemplateCopy = {
	"zh-hant": {
		name: "自訂計算示例",
		description: "用兩種虛構示例材料展示多階段需求、缺口與餘量的計算方式。",
		notice: "這是自訂算術示例，不是 AION2 官方材料名稱、成本、掉率或成長數值。",
		planTitle: "自訂計算示例（非 AION2 官方數值）",
		materialNames: ["虛構示例材料 A", "虛構示例材料 B"],
		stageNames: ["自訂示例階段一", "自訂示例階段二"]
	},
	en: {
		name: "Custom calculation example",
		description: "Use two fictional example materials to demonstrate multi-stage requirements, shortages, and surplus.",
		notice: "This is a custom arithmetic example, not official AION2 material names, costs, drop rates, or progression values.",
		planTitle: "Custom calculation example (not official AION2 data)",
		materialNames: ["Fictional example material A", "Fictional example material B"],
		stageNames: ["Custom example stage one", "Custom example stage two"]
	},
	"zh-hans": {
		name: "自定义计算示例",
		description: "用两种虚构示例材料展示多阶段需求、缺口与余量的计算方式。",
		notice: "这是自定义算术示例，不是 AION2 官方材料名称、成本、掉率或成长数值。",
		planTitle: "自定义计算示例（非 AION2 官方数值）",
		materialNames: ["虚构示例材料 A", "虚构示例材料 B"],
		stageNames: ["自定义示例阶段一", "自定义示例阶段二"]
	},
	"de": {
		name: "Beispiel für die Berechnung nach Kundenangaben",
		description: "Verwenden Sie zwei fiktive Beispielmaterialien, um mehrstufige Anforderungen, Engpässe und Überschüsse zu demonstrieren.",
		notice: "Dies ist ein benutzerdefiniertes arithmetisches Beispiel, nicht offizielle AION2-Materialnamen, Kosten, Drop-Raten oder Progressionswerte.",
		planTitle: "Benutzerdefiniertes Berechnungsbeispiel (nicht offizielle AION2-Daten)",
		materialNames: ["Fiktives Beispielmaterial A", "Fiktives Beispielmaterial B"],
		stageNames: ["Benutzerdefiniertes Beispiel Stufe 1", "Benutzerdefiniertes Beispiel Stufe 2"]
	},
	"fr": {
		name: "Exemple de calcul personnalisé",
		description: "Utilisez deux exemples fictifs pour démontrer les exigences, les pénuries et les surplus à plusieurs étapes.",
		notice: "Il s'agit d'un exemple arithmétique personnalisé, pas de noms officiels de matériaux AION2, de coûts, de taux de chute ou de valeurs de progression.",
		planTitle: "Exemple de calcul personnalisé (pas de données officielles AION2)",
		materialNames: ["Exemple fictif matériel A", "Exemple fictif matériel B"],
		stageNames: ["Exemple personnalisé étape un", "Exemple personnalisé étape deux"]
	},
	"es": {
		name: "Ejemplo de cálculo personalizado",
		description: "Utilice dos materiales de ejemplo ficticios para demostrar necesidades de múltiples etapas, escasez y excedente.",
		notice: "Este es un ejemplo aritmético personalizado, no nombres oficiales de materiales AION2, costos, tasas de caída o valores de progresión.",
		planTitle: "Ejemplo de cálculo personalizado (no datos oficiales de AION2)",
		materialNames: ["Material de ejemplo de ficción A", "Material de ejemplo de ficción B"],
		stageNames: ["Primera etapa del ejemplo personalizado", "Etapa de ejemplo personalizada dos"]
	},
	"ja": {
		name: "カスタム計算例",
		description: "2種類の架空材料を使い、複数段階の必要量、不足、余りの計算方法を示します。",
		notice: "これは計算例であり、AION2公式の材料名、必要数、ドロップ率、成長値ではありません。",
		planTitle: "カスタム計算例（AION2公式データではありません）",
		materialNames: ["架空サンプル材料A", "架空サンプル材料B"],
		stageNames: ["カスタムサンプル段階1", "カスタムサンプル段階2"]
	},
	"pt-br": {
		name: "Exemplo de cálculo personalizado",
		description: "Use dois materiais de exemplo fictícios para demonstrar exigências de múltiplos estágios, escassez e excedentes.",
		notice: "Este é um exemplo aritmético personalizado, não nomes de materiais oficiais AION2, custos, taxas de queda, ou valores de progressão.",
		planTitle: "Exemplo de cálculo personalizado (não são dados oficiais do AION2)",
		materialNames: ["Material de exemplo fictício A", "Material de exemplo fictício B"],
		stageNames: ["Fase de exemplo personalizada um", "Exemplo personalizado fase dois"]
	},
	"ru": {
		name: "Пример пользовательского расчета",
		description: "Используйте два вымышленных примера материалов, чтобы продемонстрировать многоэтапные требования, дефицит и излишки.",
		notice: "Это пример арифметики, а не официальные названия материалов AION2, затраты, коэффициенты падения или значения прогрессии.",
		planTitle: "Пример пользовательского расчета (не официальные данные AION2)",
		materialNames: ["Вымышленный пример материала А", "Примерный материал B"],
		stageNames: ["Примерная стадия один", "Примерная стадия два"]
	},
	ko: {
		name: "사용자 계산 예시",
		description: "두 가지 가상 예시 재료로 여러 단계의 필요량, 부족량과 잔여량 계산을 보여 줍니다.",
		notice: "사용자 산술 예시이며 AION2 공식 재료명, 비용, 획득 확률 또는 성장 수치가 아닙니다.",
		planTitle: "사용자 계산 예시(AION2 공식 수치 아님)",
		materialNames: ["가상 예시 재료 A", "가상 예시 재료 B"],
		stageNames: ["사용자 예시 단계 1", "사용자 예시 단계 2"]
	}
};
function blankTemplateState(locale, copy) {
	return createMaterialPlanState({
		locale,
		title: copy.planTitle,
		materials: [],
		stages: [],
		inventory: []
	});
}
/**
* The quantities below are deliberately small arithmetic fixtures. They do not
* model any AION2 system and are always paired with an explicit non-official
* notice in all three languages.
*/
function exampleTemplateState(locale, copy) {
	return createMaterialPlanState({
		locale,
		title: copy.planTitle,
		materials: [{
			id: "fictional-material-a",
			name: copy.materialNames[0]
		}, {
			id: "fictional-material-b",
			name: copy.materialNames[1]
		}],
		stages: [{
			id: "custom-stage-one",
			name: copy.stageNames[0],
			targetCount: 2,
			costs: [{
				materialId: "fictional-material-a",
				quantity: 3
			}, {
				materialId: "fictional-material-b",
				quantity: 1
			}]
		}, {
			id: "custom-stage-two",
			name: copy.stageNames[1],
			targetCount: 1,
			costs: [{
				materialId: "fictional-material-a",
				quantity: 2
			}]
		}],
		inventory: [{
			materialId: "fictional-material-a",
			quantity: 4
		}, {
			materialId: "fictional-material-b",
			quantity: 1
		}]
	});
}
function createMaterialPlanTemplate(kind, locale) {
	const localized = kind === "blank" ? blankTemplateCopy[locale] : exampleTemplateCopy[locale];
	return {
		kind,
		officialGameData: false,
		copy: {
			name: localized.name,
			description: localized.description,
			notice: localized.notice
		},
		state: kind === "blank" ? blankTemplateState(locale, localized) : exampleTemplateState(locale, localized)
	};
}
function getMaterialPlanTemplates(locale) {
	return materialPlanTemplateKinds.map((kind) => createMaterialPlanTemplate(kind, locale));
}
var MaterialCalculator_module_default = {
	calculator: "_calculator_1ay04_1",
	hero: "_hero_1ay04_43",
	kicker: "_kicker_1ay04_57",
	description: "_description_1ay04_75",
	sourceCard: "_sourceCard_1ay04_83",
	disclaimer: "_disclaimer_1ay04_111",
	sharedNotice: "_sharedNotice_1ay04_132",
	storageWarning: "_storageWarning_1ay04_133",
	templatePicker: "_templatePicker_1ay04_164",
	editorSection: "_editorSection_1ay04_165",
	stageCard: "_stageCard_1ay04_166",
	fieldHint: "_fieldHint_1ay04_188",
	sectionHeader: "_sectionHeader_1ay04_189",
	templateGrid: "_templateGrid_1ay04_196",
	templateCard: "_templateCard_1ay04_203",
	templateCardHeader: "_templateCardHeader_1ay04_235",
	templateAction: "_templateAction_1ay04_257",
	planBar: "_planBar_1ay04_276",
	materialRow: "_materialRow_1ay04_289",
	stageHeader: "_stageHeader_1ay04_290",
	costGrid: "_costGrid_1ay04_291",
	planActions: "_planActions_1ay04_337",
	primaryButton: "_primaryButton_1ay04_346",
	secondaryButton: "_secondaryButton_1ay04_347",
	dangerButton: "_dangerButton_1ay04_348",
	confirmDangerButton: "_confirmDangerButton_1ay04_349",
	addButton: "_addButton_1ay04_350",
	iconButton: "_iconButton_1ay04_351",
	dialogClose: "_dialogClose_1ay04_352",
	status: "_status_1ay04_403",
	status_success: "_status_success_1ay04_411",
	status_error: "_status_error_1ay04_415",
	status_info: "_status_info_1ay04_419",
	workspace: "_workspace_1ay04_423",
	editorColumn: "_editorColumn_1ay04_430",
	summary: "_summary_1ay04_437",
	emptyState: "_emptyState_1ay04_474",
	inlineEmpty: "_inlineEmpty_1ay04_475",
	materialList: "_materialList_1ay04_495",
	stageList: "_stageList_1ay04_496",
	costSection: "_costSection_1ay04_579",
	comparisonWarning: "_comparisonWarning_1ay04_619",
	summaryStats: "_summaryStats_1ay04_629",
	summaryStatReady: "_summaryStatReady_1ay04_659",
	summaryStatShort: "_summaryStatShort_1ay04_663",
	summaryEmpty: "_summaryEmpty_1ay04_667",
	allReady: "_allReady_1ay04_668",
	invalidSummary: "_invalidSummary_1ay04_669",
	resultList: "_resultList_1ay04_694",
	resultCard: "_resultCard_1ay04_700",
	progressRow: "_progressRow_1ay04_742",
	dialogBackdrop: "_dialogBackdrop_1ay04_820",
	fadeIn: "_fadeIn_1ay04_1",
	dialog: "_dialog_1ay04_352",
	dialogIn: "_dialogIn_1ay04_1",
	dialogActions: "_dialogActions_1ay04_867"
};
//#endregion
//#region app/_components/tools/MaterialCalculator.tsx
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "aion2-kina:material-calculator:v1";
var MAX_QUANTITY = materialPlanLimits.maxQuantity;
var materialCalculatorUiCopy = {
	"zh-hant": {
		kicker: "USER-DEFINED PLANNER",
		title: "自訂材料需求計算器",
		description: "建立多個階段，填入每個目標所需的材料與目標次數，再和目前庫存即時比對。",
		nonOfficial: "所有名稱、數量與結果都由你輸入並在瀏覽器中計算；不是 AION2 官方材料資料、掉落率、成功率或推薦。請依目前遊戲版本自行核對。",
		localOnly: "方案只儲存在這台裝置的瀏覽器。分享連結使用網址片段，不會把方案上傳至 KINA。",
		templateLegend: "選擇起始範本",
		templateHint: "範本會取代目前編輯中的方案。",
		useTemplate: (name) => `使用「${name}」`,
		selectedTemplate: "目前範本",
		planTitleLabel: "方案名稱",
		planTitleHint: "方便辨識這份自訂規劃，不會影響計算。",
		sourceLabel: "儲存狀態",
		sourceSession: "目前工作階段",
		sourceLocal: "已儲存在此裝置",
		sourceShared: "分享連結副本",
		sourceLoading: "正在讀取本機方案",
		sharedWarning: "你正在編輯分享連結的副本。本機原有方案不會被覆寫；要保留這份內容，請按「儲存副本」。",
		save: "儲存在此裝置",
		saveCopy: "儲存副本",
		share: "分享方案",
		copyShortage: "複製缺口清單",
		reset: "清除並重設",
		materialsLegend: "材料與庫存",
		materialsHint: "每種材料各自計算；名稱與庫存皆可編輯。",
		addMaterial: "新增材料",
		emptyMaterials: "尚未加入材料。先新增一種你要追蹤的材料。",
		materialName: "材料名稱",
		inventory: "目前庫存",
		removeMaterial: (name) => `移除材料「${name}」`,
		newMaterialName: (index) => `自訂材料 ${index}`,
		stagesLegend: "階段與每個目標成本",
		stagesHint: "每個階段可設定目標次數，以及完成一次目標所需的各項材料。",
		addStage: "新增階段",
		emptyStages: "尚未加入階段。新增階段後即可填寫每次材料成本。",
		stageName: "階段名稱",
		targetCount: "目標次數",
		targetCountHint: "此階段要完成幾次",
		costsTitle: "每個目標的材料成本",
		costsHint: "填 0 代表這個階段不使用該材料。",
		costFor: (material) => `${material}：每次需要`,
		removeStage: (name) => `移除階段「${name}」`,
		newStageName: (index) => `自訂階段 ${index}`,
		unnamedMaterial: "未命名材料",
		unnamedStage: "未命名階段",
		summaryKicker: "LIVE SUMMARY",
		summaryTitle: "需求摘要",
		readyTypes: "已備齊材料種類",
		shortageTypes: "有缺口材料種類",
		targetedTypes: "有需求的材料種類",
		configuredStages: "已設定階段",
		noTargets: "請加入材料、階段及大於 0 的目標次數以開始計算。",
		allReady: "目前所有有需求的材料種類都已備齊。",
		comparisonWarning: "不同材料的單位不能直接相加比較，因此不顯示合併總數或整體百分比；進度只在每種材料內計算。",
		resultRequired: "需求",
		resultInventory: "庫存",
		resultShortage: "缺口",
		resultSurplus: "餘量",
		resultReady: "已備齊",
		resultNotTargeted: "尚無需求",
		materialProgress: (name, percent) => `${name} 已備妥 ${percent}%`,
		saved: "方案已儲存在此裝置。",
		savedCopy: "分享方案的副本已儲存在此裝置，本機舊方案已由這份副本取代。",
		storageError: "瀏覽器封鎖了本機儲存；你仍可在目前工作階段繼續編輯。",
		invalidStored: "本機方案格式無效，已保留空白方案，且沒有覆寫原始資料。",
		invalidShared: "分享連結中的方案無效或版本不受支援，未載入其內容。",
		invalidPlan: "請補齊所有名稱並檢查數量；目前方案無法計算、儲存或分享。",
		quantityError: `數量必須是 0 至 ${MAX_QUANTITY.toLocaleString("en-US")} 之間的整數。`,
		limitError: "已達此版本支援的材料、階段或成本項目上限。",
		shareOpened: "系統分享視窗已開啟。",
		linkCopied: "方案分享連結已複製。",
		copiedShortage: "缺口清單已複製。",
		copyFailed: "瀏覽器無法自動複製，請檢查剪貼簿權限後再試。",
		nothingToCopy: "目前沒有可複製的材料缺口。",
		resetDone: "方案已清除，並回到空白自訂計畫。",
		confirmTitle: "清除整份方案？",
		confirmBody: "這會刪除此裝置儲存的材料、階段、成本與庫存，並回到空白範本。此動作無法復原。",
		cancel: "取消",
		confirmReset: "確認清除",
		closeDialog: "關閉確認視窗",
		shortageListTitle: "材料缺口清單（使用者自訂，非 AION2 官方資料）"
	},
	en: {
		kicker: "USER-DEFINED PLANNER",
		title: "Custom material requirement calculator",
		description: "Create multiple stages, enter the material cost per target and target count, then compare the result with your current inventory.",
		nonOfficial: "Every name, quantity, and result is entered by you and calculated in this browser. Nothing here is official AION2 material data, a drop rate, a success rate, or a recommendation. Verify values against your current game version.",
		localOnly: "Plans stay in this browser on this device. Share links use the URL fragment and do not upload your plan to KINA.",
		templateLegend: "Choose a starting template",
		templateHint: "A template replaces the plan currently being edited.",
		useTemplate: (name) => `Use “${name}”`,
		selectedTemplate: "Current template",
		planTitleLabel: "Plan name",
		planTitleHint: "A label for your own reference; it does not affect the calculation.",
		sourceLabel: "Save status",
		sourceSession: "Current session only",
		sourceLocal: "Saved on this device",
		sourceShared: "Shared-link copy",
		sourceLoading: "Reading local plan",
		sharedWarning: "You are editing a copy from a shared link. Your existing local plan will not be overwritten until you choose Save copy.",
		save: "Save on this device",
		saveCopy: "Save copy",
		share: "Share plan",
		copyShortage: "Copy shortage list",
		reset: "Clear and reset",
		materialsLegend: "Materials and inventory",
		materialsHint: "Each material is calculated separately. Names and inventory are editable.",
		addMaterial: "Add material",
		emptyMaterials: "No materials yet. Add the first material you want to track.",
		materialName: "Material name",
		inventory: "Current inventory",
		removeMaterial: (name) => `Remove material “${name}”`,
		newMaterialName: (index) => `Custom material ${index}`,
		stagesLegend: "Stages and per-target costs",
		stagesHint: "Each stage has a target count and the material cost required for one target.",
		addStage: "Add stage",
		emptyStages: "No stages yet. Add a stage to enter its per-target costs.",
		stageName: "Stage name",
		targetCount: "Target count",
		targetCountHint: "How many times to complete this stage",
		costsTitle: "Material cost per target",
		costsHint: "Enter 0 when this stage does not use a material.",
		costFor: (material) => `${material}: required per target`,
		removeStage: (name) => `Remove stage “${name}”`,
		newStageName: (index) => `Custom stage ${index}`,
		unnamedMaterial: "Unnamed material",
		unnamedStage: "Unnamed stage",
		summaryKicker: "LIVE SUMMARY",
		summaryTitle: "Requirement summary",
		readyTypes: "Material types ready",
		shortageTypes: "Material types short",
		targetedTypes: "Material types required",
		configuredStages: "Stages configured",
		noTargets: "Add materials, stages, and a target count above 0 to begin calculating.",
		allReady: "Every currently required material type is ready.",
		comparisonWarning: "Unlike material units cannot be meaningfully added together, so no combined unit total or overall percentage is shown. Progress is calculated within each material only.",
		resultRequired: "Required",
		resultInventory: "Inventory",
		resultShortage: "Shortage",
		resultSurplus: "Surplus",
		resultReady: "Ready",
		resultNotTargeted: "No requirement",
		materialProgress: (name, percent) => `${name} is ${percent}% covered`,
		saved: "Plan saved on this device.",
		savedCopy: "The shared plan copy is now saved on this device and replaces the previous local plan.",
		storageError: "This browser blocked local storage. You can still edit during this session.",
		invalidStored: "The saved plan is invalid. A blank plan is shown, and the original stored value was not overwritten.",
		invalidShared: "The shared plan is invalid or uses an unsupported version, so its contents were not loaded.",
		invalidPlan: "Complete every required name and check the quantities. This plan cannot currently be calculated, saved, or shared.",
		quantityError: `Quantities must be whole numbers from 0 to ${MAX_QUANTITY.toLocaleString("en-US")}.`,
		limitError: "This plan has reached the supported material, stage, or cost-entry limit.",
		shareOpened: "The system share sheet opened.",
		linkCopied: "Plan share link copied.",
		copiedShortage: "Shortage list copied.",
		copyFailed: "The browser could not copy automatically. Check clipboard permission and try again.",
		nothingToCopy: "There are no material shortages to copy.",
		resetDone: "The plan was cleared and returned to the blank custom template.",
		confirmTitle: "Clear the entire plan?",
		confirmBody: "This deletes the materials, stages, costs, and inventory saved on this device and returns to the blank template. It cannot be undone.",
		cancel: "Cancel",
		confirmReset: "Clear plan",
		closeDialog: "Close confirmation",
		shortageListTitle: "Material shortage list (user-defined, not official AION2 data)"
	},
	"zh-hans": {
		kicker: "USER-DEFINED PLANNER",
		title: "自定义材料需求计算器",
		description: "建立多个阶段，填入每个目标所需的材料与目标次数，再和当前库存即时比对。",
		nonOfficial: "所有名称、数量与结果都由你输入并在浏览器中计算；不是 AION2 官方材料数据、掉落率、成功率或推荐。请依当前游戏版本自行核对。",
		localOnly: "方案只保存在这台设备的浏览器。分享链接使用网址片段，不会把方案上传至 KINA。",
		templateLegend: "选择起始范本",
		templateHint: "范本会取代当前编辑中的方案。",
		useTemplate: (name) => `使用「${name}」`,
		selectedTemplate: "当前范本",
		planTitleLabel: "方案名称",
		planTitleHint: "方便辨识这份自定义规划，不会影响计算。",
		sourceLabel: "保存状态",
		sourceSession: "当前工作阶段",
		sourceLocal: "已保存在此设备",
		sourceShared: "分享链接副本",
		sourceLoading: "正在读取本地方案",
		sharedWarning: "你正在编辑分享链接的副本。本地原有方案不会被覆写；要保留这份内容，请按「保存副本」。",
		save: "保存在此设备",
		saveCopy: "保存副本",
		share: "分享方案",
		copyShortage: "复制缺口清单",
		reset: "清除并重设",
		materialsLegend: "材料与库存",
		materialsHint: "每种材料各自计算；名称与库存皆可编辑。",
		addMaterial: "新增材料",
		emptyMaterials: "尚未加入材料。先新增一种你要追踪的材料。",
		materialName: "材料名称",
		inventory: "当前库存",
		removeMaterial: (name) => `移除材料「${name}」`,
		newMaterialName: (index) => `自定义材料 ${index}`,
		stagesLegend: "阶段与每个目标成本",
		stagesHint: "每个阶段可设定目标次数，以及完成一次目标所需的各项材料。",
		addStage: "新增阶段",
		emptyStages: "尚未加入阶段。新增阶段后即可填写每次材料成本。",
		stageName: "阶段名称",
		targetCount: "目标次数",
		targetCountHint: "此阶段要完成几次",
		costsTitle: "每个目标的材料成本",
		costsHint: "填 0 代表这个阶段不使用该材料。",
		costFor: (material) => `${material}：每次需要`,
		removeStage: (name) => `移除阶段「${name}」`,
		newStageName: (index) => `自定义阶段 ${index}`,
		unnamedMaterial: "未命名材料",
		unnamedStage: "未命名阶段",
		summaryKicker: "LIVE SUMMARY",
		summaryTitle: "需求摘要",
		readyTypes: "已备齐材料种类",
		shortageTypes: "有缺口材料种类",
		targetedTypes: "有需求的材料种类",
		configuredStages: "已设定阶段",
		noTargets: "请加入材料、阶段及大于 0 的目标次数以开始计算。",
		allReady: "当前所有有需求的材料种类都已备齐。",
		comparisonWarning: "不同材料的单位不能直接相加比较，因此不显示合并总数或整体百分比；进度只在每种材料内计算。",
		resultRequired: "需求",
		resultInventory: "库存",
		resultShortage: "缺口",
		resultSurplus: "余量",
		resultReady: "已备齐",
		resultNotTargeted: "尚无需求",
		materialProgress: (name, percent) => `${name} 已备妥 ${percent}%`,
		saved: "方案已保存在此设备。",
		savedCopy: "分享方案的副本已保存在此设备，本地旧方案已由这份副本取代。",
		storageError: "浏览器封锁了本地保存；你仍可在当前工作阶段继续编辑。",
		invalidStored: "本地方案格式无效，已保留空白方案，且没有覆写原始数据。",
		invalidShared: "分享链接中的方案无效或版本不受支援，未载入其内容。",
		invalidPlan: "请补齐所有名称并检查数量；当前方案无法计算、保存或分享。",
		quantityError: `数量必须是 0 至 ${MAX_QUANTITY.toLocaleString("zh-Hans")} 之间的整数。`,
		limitError: "已达此版本支援的材料、阶段或成本项目上限。",
		shareOpened: "系统分享视窗已打开。",
		linkCopied: "方案分享链接已复制。",
		copiedShortage: "缺口清单已复制。",
		copyFailed: "浏览器无法自动复制，请检查剪贴簿权限后再试。",
		nothingToCopy: "当前没有可复制的材料缺口。",
		resetDone: "方案已清除，并回到空白自定义计划。",
		confirmTitle: "清除整份方案？",
		confirmBody: "这会删除此设备保存的材料、阶段、成本与库存，并回到空白范本。此动作无法复原。",
		cancel: "取消",
		confirmReset: "确认清除",
		closeDialog: "关闭确认视窗",
		shortageListTitle: "材料缺口清单（用户自定义，非 AION2 官方数据）"
	},
	"de": {
		kicker: "BENUTZERDEfinierter PLANNER",
		title: "Benutzerdefinierter Materialbedarfsrechner",
		description: "Erstellen Sie mehrere Phasen, geben Sie die Materialkosten pro Ziel und Zielanzahl ein und vergleichen Sie das Ergebnis dann mit Ihrem aktuellen Inventar.",
		nonOfficial: "Jeder Name, jede Menge und jedes Ergebnis werden von Ihnen eingegeben und in diesem Browser berechnet. Nichts hier ist offizielle AION2 Materialdaten, eine Drop-Rate, eine Erfolgsrate oder eine Empfehlung. Überprüfen Sie die Werte mit Ihrer aktuellen Spielversion.",
		localOnly: "Pläne bleiben in diesem Browser auf diesem Gerät. Freigabelinks verwenden das URL-Fragment und laden Sie Ihren Plan nicht in KINA hoch.",
		templateLegend: "Wählen Sie eine Startvorlage",
		templateHint: "Eine Vorlage ersetzt den Plan, der derzeit bearbeitet wird.",
		useTemplate: (name) => `Verwenden Sie ‚${name}‘`,
		selectedTemplate: "Aktuelle Vorlage",
		planTitleLabel: "Planbezeichnung",
		planTitleHint: "Ein Label für Ihre eigene Referenz; es hat keinen Einfluss auf die Berechnung.",
		sourceLabel: "Speicherstatus",
		sourceSession: "Nur aktuelle Sitzung",
		sourceLocal: "Auf diesem Gerät gespeichert",
		sourceShared: "Gemeinsame Link-Kopie",
		sourceLoading: "Lesen des lokalen Plans",
		sharedWarning: "Sie bearbeiten eine Kopie von einem freigegebenen Link. Ihr vorhandener lokaler Plan wird nicht überschrieben, bis Sie Kopie speichern auswählen.",
		save: "Sparen Sie auf diesem Gerät",
		saveCopy: "Speicherkopie",
		share: "Aktienplan",
		copyShortage: "Kopiermangelliste",
		reset: "Deaktivieren und Zurücksetzen",
		materialsLegend: "Material und Bestand",
		materialsHint: "Jedes Material wird separat berechnet. Namen und Inventar sind editierbar.",
		addMaterial: "Material hinzufügen",
		emptyMaterials: "Noch keine Materialien. Fügen Sie das erste Material hinzu, das Sie verfolgen möchten.",
		materialName: "Materialbezeichnung",
		inventory: "Aktueller Bestand",
		removeMaterial: (name) => `Material entfernen ‚${name}‘`,
		newMaterialName: (index) => `Benutzerdefiniertes Material ${index}`,
		stagesLegend: "Stufen und Kosten je Zielvorgabe",
		stagesHint: "Jede Stufe hat eine Zielanzahl und die für ein Ziel erforderlichen Materialkosten.",
		addStage: "Addierstufe",
		emptyStages: "Noch keine Etappen. Fügen Sie eine Stufe hinzu, um die Kosten pro Ziel einzugeben.",
		stageName: "Stufe Name",
		targetCount: "Zielzahl",
		targetCountHint: "Wie oft diese Phase abgeschlossen werden soll",
		costsTitle: "Materialkosten pro Ziel",
		costsHint: "Geben Sie 0 ein, wenn diese Stufe kein Material verwendet.",
		costFor: (material) => `${material}: pro Ziel erforderlich`,
		removeStage: (name) => `Entfernen Sie die Stufe „${name}`,
		newStageName: (index) => `Benutzerdefinierte Stufe ${index}`,
		unnamedMaterial: "Unbenanntes Material",
		unnamedStage: "Unbenannte Bühne",
		summaryKicker: "LEBENDGESCHLOSSEN",
		summaryTitle: "Anforderungszusammenfassung",
		readyTypes: "Werkstoffe bereit",
		shortageTypes: "Materialarten kurz",
		targetedTypes: "Erforderliche Materialtypen",
		configuredStages: "Bühnen konfiguriert",
		noTargets: "Fügen Sie Materialien, Stufen und eine Zielanzahl über 0 hinzu, um mit der Berechnung zu beginnen.",
		allReady: "Jeder aktuell benötigte Materialtyp ist bereit.",
		comparisonWarning: "Im Gegensatz zu materiellen Einheiten können sie nicht sinnvoll addiert werden, so dass keine kombinierte Gesamt- oder Gesamtprozentzahl angezeigt wird. Der Fortschritt wird nur innerhalb jedes Materials berechnet.",
		resultRequired: "Erforderlich",
		resultInventory: "Bestandsaufnahme",
		resultShortage: "Mangel",
		resultSurplus: "Überschuss",
		resultReady: "Fertig",
		resultNotTargeted: "Keine Anforderung",
		materialProgress: (name, percent) => `${name} ist ${percent}% abgedeckt`,
		saved: "Plan auf diesem Gerät gespeichert.",
		savedCopy: "Die freigegebene Plankopie wird nun auf diesem Gerät gespeichert und ersetzt den vorherigen lokalen Plan.",
		storageError: "Dieser Browser blockierte den lokalen Speicher. Sie können während dieser Sitzung noch bearbeiten.",
		invalidStored: "Der gespeicherte Plan ist ungültig. Es wird ein leerer Plan angezeigt und der ursprüngliche gespeicherte Wert wurde nicht überschrieben.",
		invalidShared: "Der freigegebene Plan ist ungültig oder verwendet eine nicht unterstützte Version, so dass der Inhalt nicht geladen wurde.",
		invalidPlan: "Füllen Sie alle erforderlichen Namen aus und überprüfen Sie die Mengen. Dieser Plan kann derzeit nicht berechnet, gespeichert oder geteilt werden.",
		quantityError: `Die Mengen müssen ganze Zahlen von 0 bis ${MAX_QUANTITY.toLocaleString("de-DE")} sein.`,
		limitError: "Dieser Plan hat das unterstützte Material, die Phase oder das Kosteneintrittslimit erreicht.",
		shareOpened: "Das System Freigabedialog wurde geöffnet.",
		linkCopied: "Plan Share Link kopiert.",
		copiedShortage: "Vervielfältigungsliste kopiert.",
		copyFailed: "Der Browser konnte nicht automatisch kopieren. Überprüfen Sie die Clipboard-Berechtigung und versuchen Sie es erneut.",
		nothingToCopy: "Es gibt keine materiellen Mängel zu kopieren.",
		resetDone: "Der Plan wurde gelöscht und in die leere benutzerdefinierte Vorlage zurückgegeben.",
		confirmTitle: "Den gesamten Plan löschen?",
		confirmBody: "Dadurch werden die auf diesem Gerät gespeicherten Materialien, Stufen, Kosten und das Inventar gelöscht und es wird in die leere Vorlage zurückgeführt. Sie kann nicht rückgängig gemacht werden.",
		cancel: "Abbruch",
		confirmReset: "Klarer Plan",
		closeDialog: "Bestätigungsdialog schließen",
		shortageListTitle: "Materialmangelliste (benutzerdefinierte, nicht offizielle AION2-Daten)"
	},
	"fr": {
		kicker: "PLANNIER DÉFINITEUR",
		title: "Calculatrice des besoins en matière personnalisée",
		description: "Créez plusieurs étapes, entrez le coût matériel par cible et le nombre de cibles, puis comparez le résultat avec votre inventaire actuel.",
		nonOfficial: "Chaque nom, quantité et résultat est entré par vous et calculé dans ce navigateur. Rien ici n'est des données officielles de matériel AION2, un taux de chute, un taux de réussite ou une recommandation. Vérifiez les valeurs par rapport à votre version actuelle du jeu.",
		localOnly: "Les plans restent dans ce navigateur sur cet appareil. Les liens de partage utilisent le fragment URL et ne téléchargent pas votre plan sur KINA.",
		templateLegend: "Choisir un modèle de démarrage",
		templateHint: "Un modèle remplace le plan en cours d'édition.",
		useTemplate: (name) => `Utiliser - -${name}`,
		selectedTemplate: "Modèle actuel",
		planTitleLabel: "Nom du plan",
		planTitleHint: "Une étiquette pour votre propre référence; elle n'affecte pas le calcul.",
		sourceLabel: "Enregistrer l' état",
		sourceSession: "Session en cours seulement",
		sourceLocal: "Enregistré sur ce périphérique",
		sourceShared: "Copie de lien partagé",
		sourceLoading: "Lecture du plan local",
		sharedWarning: "Vous modifiez une copie à partir d'un lien partagé. Votre plan local existant ne sera pas écrasé avant que vous ayez choisi Sauvegarder copie.",
		save: "Enregistrer sur ce périphérique",
		saveCopy: "Enregistrer la copie",
		share: "Plan d'action",
		copyShortage: "Copier la liste des pénuries",
		reset: "Effacer et réinitialiser",
		materialsLegend: "Matériel et inventaire",
		materialsHint: "Chaque matériau est calculé séparément. Les noms et l'inventaire sont modifiables.",
		addMaterial: "Ajouter le matériau",
		emptyMaterials: "Pas encore de matériaux. Ajoutez le premier matériel que vous voulez suivre.",
		materialName: "Nom du matériau",
		inventory: "Inventaire actuel",
		removeMaterial: (name) => `Supprimer le matériau - -${name}`,
		newMaterialName: (index) => `Matériel personnalisé ${index}`,
		stagesLegend: "Étapes et coûts par objectif",
		stagesHint: "Chaque étape a un nombre cible et le coût matériel requis pour une cible.",
		addStage: "Ajouter une étape",
		emptyStages: "Pas encore de scène. Ajouter une étape pour entrer dans ses coûts par objectif.",
		stageName: "Nom de l'étape",
		targetCount: "Nombre de cibles",
		targetCountHint: "Combien de fois pour terminer cette étape",
		costsTitle: "Coût matériel par objectif",
		costsHint: "Saisissez 0 lorsque cette étape n'utilise pas de matériau.",
		costFor: (material) => `${material}: requis par cible`,
		removeStage: (name) => `Supprimer l'étape -${name}`,
		newStageName: (index) => `Stade personnalisé ${index}`,
		unnamedMaterial: "Matériel non dénommé",
		unnamedStage: "Étape sans nom",
		summaryKicker: "RÉSUMÉ",
		summaryTitle: "Résumé des besoins",
		readyTypes: "Types de matériaux prêts",
		shortageTypes: "Types de matériaux courts",
		targetedTypes: "Types de matériaux requis",
		configuredStages: "Étapes configurées",
		noTargets: "Ajouter des matériaux, des étapes et un nombre de cibles supérieur à 0 pour commencer à calculer.",
		allReady: "Chaque type de matériel actuellement requis est prêt.",
		comparisonWarning: "Contrairement aux unités matérielles, on ne peut pas les additionner de façon significative, de sorte qu'aucun pourcentage total ou total de l'unité combinée n'est indiqué. Les progrès sont calculés à l'intérieur de chaque matériau seulement.",
		resultRequired: "Requis",
		resultInventory: "Inventaire",
		resultShortage: "Manque",
		resultSurplus: "Excédent",
		resultReady: "Prêt",
		resultNotTargeted: "Aucune prescription",
		materialProgress: (name, percent) => `${name} est couvert par ${percent}%`,
		saved: "Plan sauvegardé sur cet appareil.",
		savedCopy: "La copie du plan partagé est maintenant sauvegardée sur cet appareil et remplace le plan local précédent.",
		storageError: "Ce navigateur a bloqué le stockage local. Vous pouvez toujours modifier pendant cette session.",
		invalidStored: "Le plan sauvegardé est invalide. Un plan vierge est affiché, et la valeur originale stockée n'a pas été écrasée.",
		invalidShared: "Le plan partagé est invalide ou utilise une version non prise en charge, de sorte que son contenu n'a pas été chargé.",
		invalidPlan: "Remplissez chaque nom requis et vérifiez les quantités. Ce plan ne peut actuellement être calculé, sauvegardé ou partagé.",
		quantityError: `Les quantités doivent être des nombres entiers de 0 à ${MAX_QUANTITY.toLocaleString("fr-FR")}.`,
		limitError: "Ce plan a atteint la limite de la quantité, de l'étape ou de la valeur des coûts.",
		shareOpened: "La feuille de partage du système s'est ouverte.",
		linkCopied: "Le lien de partage du plan a été copié.",
		copiedShortage: "Liste de pénurie copiée.",
		copyFailed: "Le navigateur ne pouvait pas copier automatiquement. Vérifiez la permission du presse-papiers et essayez à nouveau.",
		nothingToCopy: "Il n'y a pas de pénuries matérielles à copier.",
		resetDone: "Le plan a été approuvé et retourné au modèle personnalisé vierge.",
		confirmTitle: "- Tout est réglé ?",
		confirmBody: "Cela supprime les matériaux, les étapes, les coûts et l'inventaire sauvegardés sur cet appareil et retourne au modèle vide. Il ne peut pas être annulé.",
		cancel: "Annuler",
		confirmReset: "Effacer le plan",
		closeDialog: "Fermer la fenêtre de confirmation",
		shortageListTitle: "Liste de pénuries de matériel (données définies par l'utilisateur, pas officielles AION2)"
	},
	"es": {
		kicker: "PLANNER DE USUARIO DE FINED",
		title: "Calculadora de requisitos de material personalizado",
		description: "Cree múltiples etapas, introduzca el costo de material por objetivo y cuenta de destino, y luego compare el resultado con su inventario actual.",
		nonOfficial: "Cada nombre, cantidad y resultado es introducido por usted y calculado en este navegador. Nada aquí es datos oficiales de material AION2, una tasa de caída, una tasa de éxito o una recomendación. Verifica los valores contra tu versión actual del juego.",
		localOnly: "Los planes permanecen en este navegador en este dispositivo. Los enlaces de compartir usan el fragmento URL y no suben su plan a KINA.",
		templateLegend: "Elija una plantilla inicial",
		templateHint: "Una plantilla reemplaza el plan que se está editando actualmente.",
		useTemplate: (name) => `Use “${name}”`,
		selectedTemplate: "Plantilla actual",
		planTitleLabel: "Nombre del plan",
		planTitleHint: "Una etiqueta para su propia referencia; no afecta el cálculo.",
		sourceLabel: "Salvo el estado",
		sourceSession: "Período de sesiones actual únicamente",
		sourceLocal: "Guardado en este dispositivo",
		sourceShared: "Copia de enlace compartido",
		sourceLoading: "Leyendo el plan local",
		sharedWarning: "Estás editando una copia de un enlace compartido. Su plan local existente no será sobrescrito hasta que elija Guardar copia.",
		save: "Guardar en este dispositivo",
		saveCopy: "Guardar la copia",
		share: "Plan de acción",
		copyShortage: "Lista de escasez de copias",
		reset: "Despejado y reajustado",
		materialsLegend: "Materiales e inventario",
		materialsHint: "Cada material se calcula por separado. Los nombres y el inventario son editables.",
		addMaterial: "Añadir material",
		emptyMaterials: "Todavía no hay materiales. Agregue el primer material que desee rastrear.",
		materialName: "Nombre del material",
		inventory: "Inventario actual",
		removeMaterial: (name) => `Quitar material “${name}”`,
		newMaterialName: (index) => `Material personalizado ${index}`,
		stagesLegend: "Gastos de las etapas y los objetivos",
		stagesHint: "Cada etapa tiene un recuento de destino y el costo de material necesario para un objetivo.",
		addStage: "Agregar etapa",
		emptyStages: "Todavía no hay etapas. Agregue una etapa para introducir sus costos per-objetivo.",
		stageName: "Nombre de la escena",
		targetCount: "Conteo de objetivos",
		targetCountHint: "¿Cuántas veces para completar esta etapa",
		costsTitle: "Costo de material por objetivo",
		costsHint: "Entra 0 cuando esta etapa no use material.",
		costFor: (material) => `${material}: requerido por objetivo`,
		removeStage: (name) => `Quitar el escenario “${name}”`,
		newStageName: (index) => `Etapa personalizada ${index}`,
		unnamedMaterial: "Material sin nombre",
		unnamedStage: "Etapa no anotada",
		summaryKicker: "RESUMEN DE LA VIVIDA",
		summaryTitle: "Resumen de las necesidades",
		readyTypes: "Tipos de material listos",
		shortageTypes: "Tipos de material corto",
		targetedTypes: "Tipos de material requeridos",
		configuredStages: "Estadios configurados",
		noTargets: "Agregue materiales, etapas y un recuento de destino por encima de 0 para comenzar a calcular.",
		allReady: "Cada tipo de material actualmente requerido está listo.",
		comparisonWarning: "A diferencia de las unidades materiales no pueden ser significativamente agregadas juntas, por lo que no se muestra un porcentaje total o total de unidad combinado. El progreso se calcula dentro de cada material solamente.",
		resultRequired: "Necesidad",
		resultInventory: "Inventario",
		resultShortage: "Shortage",
		resultSurplus: "Superávit",
		resultReady: "Listo",
		resultNotTargeted: "No se requiere",
		materialProgress: (name, percent) => `${name} es ${percent}% cubierto`,
		saved: "Plan guardado en este dispositivo.",
		savedCopy: "La copia del plan compartido se guarda ahora en este dispositivo y reemplaza el plan local anterior.",
		storageError: "Este navegador bloqueó el almacenamiento local. Aún puedes editarlo durante esta sesión.",
		invalidStored: "El plan salvado es inválido. Se muestra un plan en blanco, y el valor almacenado original no fue sobrescrito.",
		invalidShared: "El plan compartido es inválido o utiliza una versión sin soporte, por lo que su contenido no se carga.",
		invalidPlan: "Completar todos los nombres requeridos y comprobar las cantidades. Este plan no puede ser calculado, salvado o compartido actualmente.",
		quantityError: `Las cantidades deben ser números enteros de 0 a ${MAX_QUANTITY.toLocaleString("es-ES")}.`,
		limitError: "Este plan ha alcanzado el límite de entrada de material, etapa o costo.",
		shareOpened: "La hoja de acción del sistema se abrió.",
		linkCopied: "El enlace de la parte del plan copiado.",
		copiedShortage: "La lista de la escasez copiada.",
		copyFailed: "El navegador no pudo copiar automáticamente. Compruebe el permiso de portapapeles e inténtelo de nuevo.",
		nothingToCopy: "No hay escasez de material que copiar.",
		resetDone: "El plan fue aclarado y devuelto a la plantilla personalizada en blanco.",
		confirmTitle: "¿Despejar todo el plan?",
		confirmBody: "Esto elimina los materiales, etapas, costos e inventarios guardados en este dispositivo y regresa a la plantilla en blanco. No puede ser deshecho.",
		cancel: "Cancelar",
		confirmReset: "Plan claro",
		closeDialog: "Cerrar confirmación",
		shortageListTitle: "Lista de escasez de materiales (datos AION2 definidos por el usuario)"
	},
	"ja": {
		kicker: "ユーザー定義プランナー",
		title: "カスタム材料必要量計算機",
		description: "複数の段階を作成し、目標1回あたりの材料数と目標回数を入力して、現在の所持数と比較します。",
		nonOfficial: "名前、数量、計算結果はすべてユーザーが入力した内容です。AION2公式の材料データ、ドロップ率、成功率、推奨情報ではありません。現在のゲームバージョンで必ず確認してください。",
		localOnly: "プランはこの端末のブラウザ内だけに保存されます。共有リンクはURLフラグメントを使用し、プランをKINAへ送信しません。",
		templateLegend: "開始テンプレートを選択",
		templateHint: "テンプレートを選ぶと、編集中のプランが置き換わります。",
		useTemplate: (name) => `「${name}」を使用`,
		selectedTemplate: "現在のテンプレート",
		planTitleLabel: "プラン名",
		planTitleHint: "プランを識別するための名前です。計算結果には影響しません。",
		sourceLabel: "保存状態",
		sourceSession: "現在のセッションのみ",
		sourceLocal: "この端末に保存済み",
		sourceShared: "共有リンクのコピー",
		sourceLoading: "端末内のプランを読み込み中",
		sharedWarning: "共有リンクから読み込んだコピーを編集中です。「コピーを保存」を選ぶまで、既存の端末内プランは上書きされません。",
		save: "この端末に保存",
		saveCopy: "コピーを保存",
		share: "プランを共有",
		copyShortage: "不足リストをコピー",
		reset: "消去してリセット",
		materialsLegend: "材料と所持数",
		materialsHint: "材料ごとに個別計算します。名前と所持数は編集できます。",
		addMaterial: "材料を追加",
		emptyMaterials: "材料がありません。追跡したい材料を追加してください。",
		materialName: "材料名",
		inventory: "現在の所持数",
		removeMaterial: (name) => `材料「${name}」を削除`,
		newMaterialName: (index) => `カスタム材料${index}`,
		stagesLegend: "段階と目標1回あたりの材料数",
		stagesHint: "各段階に目標回数と、目標1回に必要な材料数を設定します。",
		addStage: "段階を追加",
		emptyStages: "段階がありません。段階を追加して、目標1回あたりの材料数を入力してください。",
		stageName: "段階名",
		targetCount: "目標回数",
		targetCountHint: "この段階を完了する回数",
		costsTitle: "目標1回あたりの材料数",
		costsHint: "この段階で使わない材料には0を入力してください。",
		costFor: (material) => `${material}：目標1回あたりの必要数`,
		removeStage: (name) => `段階「${name}」を削除`,
		newStageName: (index) => `カスタム段階${index}`,
		unnamedMaterial: "名前のない材料",
		unnamedStage: "名前のない段階",
		summaryKicker: "リアルタイム集計",
		summaryTitle: "必要量の集計",
		readyTypes: "準備済みの材料種類",
		shortageTypes: "不足している材料種類",
		targetedTypes: "必要な材料種類",
		configuredStages: "設定済みの段階",
		noTargets: "材料と段階を追加し、目標回数を1以上にすると計算を開始します。",
		allReady: "現在必要な材料はすべて準備できています。",
		comparisonWarning: "異なる材料の単位は合算できないため、合計数量や全体割合は表示しません。進捗率は材料ごとに計算します。",
		resultRequired: "必要数",
		resultInventory: "所持数",
		resultShortage: "不足",
		resultSurplus: "余り",
		resultReady: "準備済み",
		resultNotTargeted: "必要量なし",
		materialProgress: (name, percent) => `${name}は${percent}％準備済み`,
		saved: "プランをこの端末に保存しました。",
		savedCopy: "共有プランのコピーをこの端末に保存し、以前の端末内プランを置き換えました。",
		storageError: "ブラウザで端末内保存がブロックされています。このセッション中は引き続き編集できます。",
		invalidStored: "保存済みプランの形式が正しくありません。空のプランを表示し、元の保存データは上書きしていません。",
		invalidShared: "共有プランが無効、または未対応のバージョンのため読み込みませんでした。",
		invalidPlan: "必要な名前をすべて入力し、数量を確認してください。現在のプランは計算、保存、共有できません。",
		quantityError: `数量は0から${MAX_QUANTITY.toLocaleString("ja-JP")}までの整数で入力してください。`,
		limitError: "このバージョンで対応する材料、段階、材料数の上限に達しました。",
		shareOpened: "端末の共有画面を開きました。",
		linkCopied: "プランの共有リンクをコピーしました。",
		copiedShortage: "不足リストをコピーしました。",
		copyFailed: "自動コピーできませんでした。クリップボードの権限を確認して、もう一度お試しください。",
		nothingToCopy: "コピーする材料不足はありません。",
		resetDone: "プランを消去し、空のカスタムテンプレートへ戻しました。",
		confirmTitle: "プラン全体を消去しますか？",
		confirmBody: "この端末に保存した材料、段階、必要数、所持数を削除して空のテンプレートへ戻します。この操作は元に戻せません。",
		cancel: "キャンセル",
		confirmReset: "プランを消去",
		closeDialog: "確認画面を閉じる",
		shortageListTitle: "材料不足リスト（ユーザー入力・AION2公式データではありません）"
	},
	"pt-br": {
		kicker: "PLANEJADOR PERSONALIZADO",
		title: "Calculadora de requisitos de material personalizado",
		description: "Crie várias etapas, digite o custo do material por alvo e a contagem do alvo, e depois compare o resultado com o seu inventário atual.",
		nonOfficial: "Todos os nomes, quantidades e resultados são informados por você e calculados neste navegador. Nada aqui representa dados oficiais de materiais do AION2, taxas de obtenção, taxas de sucesso ou recomendações. Confira os valores na versão atual do jogo.",
		localOnly: "Os planos ficam apenas no navegador deste dispositivo. Os links compartilhados usam o fragmento da URL e não enviam seu plano para a KINA.",
		templateLegend: "Escolha um modelo inicial",
		templateHint: "Um modelo substitui o plano atualmente sendo editado.",
		useTemplate: (name) => `Usar “${name}”`,
		selectedTemplate: "Modelo atual",
		planTitleLabel: "Nome do plano",
		planTitleHint: "Um rótulo para a sua própria referência; não afeta o cálculo.",
		sourceLabel: "Estado de salvamento",
		sourceSession: "Somente nesta sessão",
		sourceLocal: "Salvo neste dispositivo",
		sourceShared: "Cópia de link compartilhado",
		sourceLoading: "Carregando o plano local",
		sharedWarning: "Você está editando uma cópia de um link compartilhado. O seu plano local existente não será substituído até que você escolha Salvar cópia.",
		save: "Salvar neste dispositivo",
		saveCopy: "Salvar cópia",
		share: "Compartilhar plano",
		copyShortage: "Copiar lista de materiais faltantes",
		reset: "Limpar e reiniciar",
		materialsLegend: "Materiais e inventário",
		materialsHint: "Cada material é calculado separadamente. Nomes e inventário são editáveis.",
		addMaterial: "Adicionar material",
		emptyMaterials: "Ainda não há material. Adicione o primeiro material que você deseja rastrear.",
		materialName: "Nome do material",
		inventory: "Estoque atual",
		removeMaterial: (name) => `Remover o material “${name}”`,
		newMaterialName: (index) => `Material personalizado ${index}`,
		stagesLegend: "Etapas e materiais por objetivo",
		stagesHint: "Cada etapa tem uma contagem de alvos e o custo material necessário para um alvo.",
		addStage: "Adicionar etapa",
		emptyStages: "Ainda não há etapas. Adicione uma etapa para informar os materiais por objetivo.",
		stageName: "Nome da etapa",
		targetCount: "Quantidade do objetivo",
		targetCountHint: "Quantas vezes esta etapa deve ser concluída",
		costsTitle: "Material necessário por objetivo",
		costsHint: "Digite 0 quando esta fase não usar um material.",
		costFor: (material) => `${material}: requerido por alvo`,
		removeStage: (name) => `Remover a etapa “${name}”`,
		newStageName: (index) => `Etapa personalizada ${index}`,
		unnamedMaterial: "Material não identificado",
		unnamedStage: "Etapa sem nome",
		summaryKicker: "RESUMO EM TEMPO REAL",
		summaryTitle: "Resumo dos requisitos",
		readyTypes: "Tipos de materiais prontos",
		shortageTypes: "Tipos de materiais faltantes",
		targetedTypes: "Tipos de materiais necessários",
		configuredStages: "Etapas configuradas",
		noTargets: "Adicione materiais, estágios e uma contagem de alvo acima de 0 para começar a calcular.",
		allReady: "Todo tipo de material atualmente necessário está pronto.",
		comparisonWarning: "Unidades de materiais diferentes não podem ser somadas de forma útil; por isso, não exibimos um total combinado nem uma porcentagem geral. O progresso é calculado separadamente para cada material.",
		resultRequired: "Necessário",
		resultInventory: "Inventário",
		resultShortage: "Faltante",
		resultSurplus: "Excedente",
		resultReady: "Pronto",
		resultNotTargeted: "Não é necessário",
		materialProgress: (name, percent) => `${name}: ${percent}% disponível`,
		saved: "Plano salvo neste dispositivo.",
		savedCopy: "A cópia do plano compartilhado agora é salva neste dispositivo e substitui o plano local anterior.",
		storageError: "Este navegador bloqueou o armazenamento local. Você ainda pode editar durante esta sessão.",
		invalidStored: "O plano salvo é inválido. Um plano em branco é mostrado, e o valor original armazenado não foi substituído.",
		invalidShared: "O plano compartilhado é inválido ou usa uma versão não suportada, então seu conteúdo não foi carregado.",
		invalidPlan: "Preencha todos os nomes necessários e verifique as quantidades. Este plano não pode ser calculado, salvo ou compartilhado atualmente.",
		quantityError: `Quantidades devem ser números inteiros de 0 a ${MAX_QUANTITY.toLocaleString("pt-BR")}.`,
		limitError: "Este plano atingiu o limite de materiais, etapas ou campos de quantidade suportados.",
		shareOpened: "A janela de compartilhamento do sistema foi aberta.",
		linkCopied: "Link de compartilhamento do plano copiado.",
		copiedShortage: "Lista de materiais faltantes copiada.",
		copyFailed: "O navegador não conseguiu copiar automaticamente. Verifique a permissão da área de transferência e tente novamente.",
		nothingToCopy: "Não há materiais faltantes para copiar.",
		resetDone: "O plano foi limpo e voltou ao modelo personalizado em branco.",
		confirmTitle: "Limpar o plano todo?",
		confirmBody: "Isso exclui os materiais, estágios, custos e inventário salvos neste dispositivo e retorna ao modelo em branco. Não pode ser desfeito.",
		cancel: "Cancelar",
		confirmReset: "Limpar plano",
		closeDialog: "Fechar a confirmação",
		shortageListTitle: "Lista de escassez de materiais (dados AION2 definidos pelo utilizador, não oficiais)"
	},
	"ru": {
		kicker: "ПОЛЬЗОВАТЕЛЬСКИЙ ПЛАНИРОВЩИК",
		title: "Калькулятор пользовательского плана материалов",
		description: "Создайте несколько этапов, укажите материалы на одну цель и количество целей, затем сравните результат с текущими запасами.",
		nonOfficial: "Все названия, количества и результаты вводятся вами и рассчитываются в браузере. Это не официальные данные AION2 о материалах, шансах получения, вероятности успеха или рекомендациях. Сверяйте значения с текущей версией игры.",
		localOnly: "Планы остаются в этом браузере на этом устройстве. Ссылки для обмена используют фрагмент URL и не загружают ваш план в KINA.",
		templateLegend: "Выберите стартовый шаблон",
		templateHint: "Шаблон заменяет план, который в настоящее время редактируется.",
		useTemplate: (name) => `Использование «${name}»`,
		selectedTemplate: "Текущий шаблон",
		planTitleLabel: "Название плана",
		planTitleHint: "Ярлык для вашей собственной ссылки; это не влияет на расчет.",
		sourceLabel: "Состояние сохранения",
		sourceSession: "Только текущий сеанс",
		sourceLocal: "Сохранено на этом устройстве",
		sourceShared: "Копия из общей ссылки",
		sourceLoading: "Загрузка локального плана",
		sharedWarning: "Вы редактируете копию из общей ссылки. Ваш существующий локальный план не будет перезаписан, пока вы не выберете Сохранить копию.",
		save: "Сохранить на этом устройстве",
		saveCopy: "Сохранить копию",
		share: "Поделиться планом",
		copyShortage: "Копировать список недостающих материалов",
		reset: "Очистить и сбросить",
		materialsLegend: "Материалы и инвентарь",
		materialsHint: "Каждый материал рассчитывается отдельно. Имена и инвентарь можно редактировать.",
		addMaterial: "Добавить материал",
		emptyMaterials: "Материалов пока нет. Добавьте первый материал, который вы хотите отследить.",
		materialName: "Название материала",
		inventory: "Текущий запас",
		removeMaterial: (name) => `Удалить материал «${name}»`,
		newMaterialName: (index) => `Пользовательский материал ${index}`,
		stagesLegend: "Этапы и материалы на одну цель",
		stagesHint: "Для каждого этапа задаются количество целей и материалы, необходимые для одной цели.",
		addStage: "Добавить этап",
		emptyStages: "Этапов пока нет. Добавьте этап и укажите материалы на одну цель.",
		stageName: "Название этапа",
		targetCount: "Количество целей",
		targetCountHint: "Сколько раз нужно пройти этот этап",
		costsTitle: "Материалы на одну цель",
		costsHint: "Введите 0, если на этом этапе не используется материал.",
		costFor: (material) => `${material}: требуется для каждой цели`,
		removeStage: (name) => `Удалить этап «${name}»`,
		newStageName: (index) => `Пользовательский этап ${index}`,
		unnamedMaterial: "Неназванный материал",
		unnamedStage: "Этап без названия",
		summaryKicker: "РАСЧЕТ В РЕАЛЬНОМ ВРЕМЕНИ",
		summaryTitle: "Сводка потребностей",
		readyTypes: "Готовые типы материалов",
		shortageTypes: "Типы недостающих материалов",
		targetedTypes: "Необходимые типы материалов",
		configuredStages: "Настроенные этапы",
		noTargets: "Добавьте материалы, этапы и целевое число выше 0, чтобы начать вычисление.",
		allReady: "Все необходимые на данный момент материалы готовы.",
		comparisonWarning: "Единицы разных материалов нельзя корректно складывать, поэтому общий итог и общий процент не отображаются. Прогресс рассчитывается отдельно для каждого материала.",
		resultRequired: "Требуется",
		resultInventory: "В наличии",
		resultShortage: "Нехватка",
		resultSurplus: "Излишек",
		resultReady: "Готово",
		resultNotTargeted: "Нет требований",
		materialProgress: (name, percent) => `${name} покрыт ${percent}%`,
		saved: "План сохранен на этом устройстве.",
		savedCopy: "Копия общего плана теперь сохраняется на этом устройстве и заменяет предыдущий локальный план.",
		storageError: "Этот браузер заблокировал локальное хранилище. Вы можете редактировать в течение этого сеанса.",
		invalidStored: "Сохраненный план поврежден. Показан пустой план, а исходные сохраненные данные не перезаписаны.",
		invalidShared: "Общий план недействителен или использует неподдерживаемую версию, поэтому его содержимое не было загружено.",
		invalidPlan: "Заполните все необходимые имена и проверьте их количество. В настоящее время этот план не может быть рассчитан, сохранен или распространен.",
		quantityError: `Количества должны быть целыми числами от 0 до ${MAX_QUANTITY.toLocaleString("ru-RU")}.`,
		limitError: "Достигнут поддерживаемый предел материалов, этапов или полей количества.",
		shareOpened: "Открылся лист системного обмена.",
		linkCopied: "Ссылка на план скопирована.",
		copiedShortage: "Список недостающих материалов скопирован.",
		copyFailed: "Браузер не может копировать автоматически. Проверьте разрешение буфера обмена и попробуйте еще раз.",
		nothingToCopy: "Нет недостающих материалов для копирования.",
		resetDone: "План был очищен и возвращен к пустому шаблону.",
		confirmTitle: "Очистить весь план?",
		confirmBody: "Это удаляет материалы, этапы, затраты и инвентарь, сохраненные на этом устройстве, и возвращается к пустому шаблону. Его нельзя отменить.",
		cancel: "Отмена",
		confirmReset: "Очистить план",
		closeDialog: "Закрыть подтверждение",
		shortageListTitle: "Список дефицита материалов (определяемый пользователем, а не официальные данные AION2)"
	},
	ko: {
		kicker: "USER-DEFINED PLANNER",
		title: "사용자 재료 필요량 계산기",
		description: "여러 단계를 만들고 목표 1회당 재료 비용과 목표 횟수를 입력한 뒤 현재 보유량과 바로 비교합니다.",
		nonOfficial: "모든 이름, 수량과 결과는 사용자가 입력하고 이 브라우저에서 계산합니다. AION2 공식 재료 정보, 획득 확률, 성공 확률 또는 추천이 아닙니다. 현재 게임 버전에서 직접 확인해 주세요.",
		localOnly: "계획은 이 기기의 브라우저에만 저장됩니다. 공유 링크는 URL 조각을 사용하며 KINA로 계획을 업로드하지 않습니다.",
		templateLegend: "시작 템플릿 선택",
		templateHint: "템플릿을 선택하면 현재 편집 중인 계획을 대체합니다.",
		useTemplate: (name) => `“${name}” 사용`,
		selectedTemplate: "현재 템플릿",
		planTitleLabel: "계획 이름",
		planTitleHint: "사용자가 계획을 구분하는 이름이며 계산에는 영향을 주지 않습니다.",
		sourceLabel: "저장 상태",
		sourceSession: "현재 세션에서만 사용",
		sourceLocal: "이 기기에 저장됨",
		sourceShared: "공유 링크 사본",
		sourceLoading: "로컬 계획 불러오는 중",
		sharedWarning: "공유 링크에서 가져온 사본을 편집하고 있습니다. ‘사본 저장’을 누르기 전에는 기존 로컬 계획을 덮어쓰지 않습니다.",
		save: "이 기기에 저장",
		saveCopy: "사본 저장",
		share: "계획 공유",
		copyShortage: "부족 목록 복사",
		reset: "지우고 초기화",
		materialsLegend: "재료와 보유량",
		materialsHint: "각 재료는 따로 계산합니다. 이름과 현재 보유량을 편집할 수 있습니다.",
		addMaterial: "재료 추가",
		emptyMaterials: "아직 재료가 없습니다. 추적할 첫 재료를 추가하세요.",
		materialName: "재료 이름",
		inventory: "현재 보유량",
		removeMaterial: (name) => `재료 “${name}” 삭제`,
		newMaterialName: (index) => `사용자 재료 ${index}`,
		stagesLegend: "단계와 목표 1회당 비용",
		stagesHint: "각 단계에 목표 횟수와 목표 1회에 필요한 재료를 설정합니다.",
		addStage: "단계 추가",
		emptyStages: "아직 단계가 없습니다. 단계를 추가해 1회당 비용을 입력하세요.",
		stageName: "단계 이름",
		targetCount: "목표 횟수",
		targetCountHint: "이 단계를 완료할 횟수",
		costsTitle: "목표 1회당 재료 비용",
		costsHint: "이 단계에서 쓰지 않는 재료는 0을 입력하세요.",
		costFor: (material) => `${material}: 목표 1회당 필요량`,
		removeStage: (name) => `단계 “${name}” 삭제`,
		newStageName: (index) => `사용자 단계 ${index}`,
		unnamedMaterial: "이름 없는 재료",
		unnamedStage: "이름 없는 단계",
		summaryKicker: "LIVE SUMMARY",
		summaryTitle: "필요량 요약",
		readyTypes: "준비된 재료 종류",
		shortageTypes: "부족한 재료 종류",
		targetedTypes: "필요한 재료 종류",
		configuredStages: "설정한 단계",
		noTargets: "재료와 단계를 추가하고 목표 횟수를 1 이상 입력하면 계산을 시작합니다.",
		allReady: "현재 필요한 모든 재료 종류가 준비되었습니다.",
		comparisonWarning: "서로 다른 재료의 단위는 직접 합산해 비교할 수 없으므로 통합 수량이나 전체 퍼센트를 표시하지 않습니다. 진행률은 각 재료 안에서만 계산합니다.",
		resultRequired: "필요",
		resultInventory: "보유",
		resultShortage: "부족",
		resultSurplus: "여유",
		resultReady: "준비 완료",
		resultNotTargeted: "필요량 없음",
		materialProgress: (name, percent) => `${name} ${percent}% 준비`,
		saved: "이 기기에 계획을 저장했습니다.",
		savedCopy: "공유 계획 사본을 이 기기에 저장했으며 이전 로컬 계획을 대체했습니다.",
		storageError: "브라우저가 로컬 저장을 차단했습니다. 현재 세션에서는 계속 편집할 수 있습니다.",
		invalidStored: "저장된 계획이 올바르지 않습니다. 빈 계획을 표시하며 기존 저장 값은 덮어쓰지 않았습니다.",
		invalidShared: "공유 계획이 올바르지 않거나 지원하지 않는 버전이어서 내용을 불러오지 않았습니다.",
		invalidPlan: "필수 이름을 모두 입력하고 수량을 확인하세요. 현재 계획은 계산, 저장 또는 공유할 수 없습니다.",
		quantityError: `수량은 0부터 ${MAX_QUANTITY.toLocaleString("en-US")}까지의 정수여야 합니다.`,
		limitError: "이 버전에서 지원하는 재료, 단계 또는 비용 항목 한도에 도달했습니다.",
		shareOpened: "시스템 공유 창을 열었습니다.",
		linkCopied: "계획 공유 링크를 복사했습니다.",
		copiedShortage: "부족 목록을 복사했습니다.",
		copyFailed: "브라우저가 자동 복사를 허용하지 않았습니다. 클립보드 권한을 확인해 주세요.",
		nothingToCopy: "복사할 재료 부족분이 없습니다.",
		resetDone: "계획을 지우고 빈 사용자 계획으로 초기화했습니다.",
		confirmTitle: "전체 계획을 지울까요?",
		confirmBody: "이 기기에 저장된 재료, 단계, 비용과 보유량을 삭제하고 빈 템플릿으로 돌아갑니다. 되돌릴 수 없습니다.",
		cancel: "취소",
		confirmReset: "계획 지우기",
		closeDialog: "확인 창 닫기",
		shortageListTitle: "재료 부족 목록(사용자 입력, AION2 공식 자료 아님)"
	}
};
var idSequence = 0;
function nextStableId(prefix, existingIds) {
	let candidate = "";
	do {
		idSequence += 1;
		candidate = `${prefix}-${Date.now().toString(36)}-${idSequence.toString(36)}`;
	} while (existingIds.has(candidate));
	return candidate;
}
function pushAnalytics(event, payload = {}) {
	trackEvent(event, {
		tool_name: "material_calculator",
		...payload
	});
}
function planWithLocale(state, locale) {
	return createMaterialPlanState({
		locale,
		title: state.title,
		materials: state.materials,
		stages: state.stages,
		inventory: state.inventory
	});
}
function hashContainsPlan(hash) {
	if (!hash) return false;
	return new URLSearchParams(hash.replace(/^#/u, "")).has(MATERIAL_PLAN_SHARE_KEY);
}
function removePlanHash() {
	if (typeof window === "undefined" || !hashContainsPlan(window.location.hash)) return;
	const url = new URL(window.location.href);
	const parameters = new URLSearchParams(url.hash.replace(/^#/u, ""));
	parameters.delete(MATERIAL_PLAN_SHARE_KEY);
	const remaining = parameters.toString();
	url.hash = remaining ? `#${remaining}` : "";
	window.history.replaceState(window.history.state, "", url);
}
function numberFromInput(value) {
	if (value.trim() === "") return 0;
	const quantity = Number(value);
	return Number.isSafeInteger(quantity) && quantity >= 0 && quantity <= MAX_QUANTITY ? quantity : null;
}
async function copyText(value) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(value);
		return;
	}
	const textarea = document.createElement("textarea");
	textarea.value = value;
	textarea.readOnly = true;
	textarea.style.position = "fixed";
	textarea.style.opacity = "0";
	textarea.style.pointerEvents = "none";
	document.body.append(textarea);
	textarea.select();
	const copied = document.execCommand("copy");
	textarea.remove();
	if (!copied) throw new Error("Clipboard copy was rejected");
}
function sourceText(text, origin, hydrated) {
	if (!hydrated) return text.sourceLoading;
	if (origin === "shared") return text.sourceShared;
	if (origin === "local") return text.sourceLocal;
	return text.sourceSession;
}
function MaterialCalculator({ locale }) {
	const text = materialCalculatorUiCopy[locale];
	const templates = (0, import_react.useMemo)(() => getMaterialPlanTemplates(locale), [locale]);
	const instanceId = (0, import_react.useId)();
	const [plan, setPlan] = (0, import_react.useState)(() => createMaterialPlanTemplate("blank", locale).state);
	const [origin, setOrigin] = (0, import_react.useState)("session");
	const [activeTemplate, setActiveTemplate] = (0, import_react.useState)("blank");
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [storageBlocked, setStorageBlocked] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)(null);
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	const startedRef = (0, import_react.useRef)(false);
	const pendingFocusRef = (0, import_react.useRef)(null);
	const resetButtonRef = (0, import_react.useRef)(null);
	const closeButtonRef = (0, import_react.useRef)(null);
	const cancelButtonRef = (0, import_react.useRef)(null);
	const confirmButtonRef = (0, import_react.useRef)(null);
	const calculationResult = (0, import_react.useMemo)(() => {
		try {
			return {
				calculation: calculateMaterialPlan(plan),
				valid: true
			};
		} catch {
			return {
				calculation: null,
				valid: false
			};
		}
	}, [plan]);
	const calculation = calculationResult.calculation;
	const targetedMaterials = calculation?.materials.filter((material) => material.hasTarget) ?? [];
	const shortageMaterials = targetedMaterials.filter((material) => material.shortage > 0);
	const readyMaterials = targetedMaterials.filter((material) => material.isComplete);
	const formatter = (0, import_react.useMemo)(() => new Intl.NumberFormat(siteLocaleConfig[locale].code), [locale]);
	function markStarted(entryAction) {
		if (startedRef.current) return;
		startedRef.current = true;
		pushAnalytics("material_calculator_start", { entry_action: entryAction });
	}
	function persistPlan(nextPlan, announce = false) {
		try {
			calculateMaterialPlan(nextPlan);
			const serialized = serializeMaterialPlanState(nextPlan);
			window.localStorage.setItem(STORAGE_KEY, serialized);
			setStorageBlocked(false);
			setOrigin("local");
			if (announce) setStatus({
				kind: "success",
				text: origin === "shared" ? text.savedCopy : text.saved
			});
			return true;
		} catch (error) {
			if (error instanceof DOMException || error instanceof Error && /storage|quota|security|denied/iu.test(error.message)) {
				setStorageBlocked(true);
				setStatus({
					kind: "error",
					text: text.storageError
				});
			} else setStatus({
				kind: "error",
				text: text.invalidPlan
			});
			return false;
		}
	}
	function commitPlan(nextPlan, entryAction = "edit") {
		markStarted(entryAction);
		setPlan(nextPlan);
		if (entryAction !== "template") setActiveTemplate(null);
		if (origin === "shared") {
			setStatus({
				kind: "info",
				text: text.sharedWarning
			});
			return;
		}
		removePlanHash();
		persistPlan(nextPlan);
	}
	function setQuantityError() {
		setStatus({
			kind: "error",
			text: text.quantityError
		});
	}
	(0, import_react.useEffect)(() => {
		let initialStatus = null;
		let initialPlan = null;
		let initialOrigin = "session";
		let initialStorageBlocked = false;
		let sharedWasLoaded = false;
		let disposed = false;
		if (hashContainsPlan(window.location.hash)) {
			const parsed = parseMaterialPlanState(window.location.hash);
			if (parsed.ok) try {
				initialPlan = planWithLocale(parsed.state, locale);
				initialOrigin = "shared";
				sharedWasLoaded = true;
				initialStatus = {
					kind: "info",
					text: text.sharedWarning
				};
			} catch {
				initialStatus = {
					kind: "error",
					text: text.invalidShared
				};
			}
			else initialStatus = {
				kind: "error",
				text: text.invalidShared
			};
		}
		if (!sharedWasLoaded) try {
			const stored = window.localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = parseMaterialPlanState(stored);
				if (parsed.ok) {
					initialPlan = planWithLocale(parsed.state, locale);
					initialOrigin = "local";
				} else if (!initialStatus) initialStatus = {
					kind: "error",
					text: text.invalidStored
				};
			}
		} catch {
			initialStorageBlocked = true;
			if (!initialStatus) initialStatus = {
				kind: "error",
				text: text.storageError
			};
		}
		queueMicrotask(() => {
			if (disposed) return;
			if (initialPlan) setPlan(initialPlan);
			setOrigin(initialOrigin);
			setActiveTemplate(initialPlan ? null : "blank");
			setStorageBlocked(initialStorageBlocked);
			setStatus(initialStatus);
			setHydrated(true);
		});
		const handleHashChange = () => {
			if (!hashContainsPlan(window.location.hash)) return;
			const parsed = parseMaterialPlanState(window.location.hash);
			if (!parsed.ok) {
				setStatus({
					kind: "error",
					text: text.invalidShared
				});
				return;
			}
			try {
				setPlan(planWithLocale(parsed.state, locale));
				setOrigin("shared");
				setActiveTemplate(null);
				setStatus({
					kind: "info",
					text: text.sharedWarning
				});
			} catch {
				setStatus({
					kind: "error",
					text: text.invalidShared
				});
			}
		};
		window.addEventListener("hashchange", handleHashChange);
		return () => {
			disposed = true;
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, [
		locale,
		text.invalidShared,
		text.invalidStored,
		text.sharedWarning,
		text.storageError
	]);
	(0, import_react.useEffect)(() => {
		const focusId = pendingFocusRef.current;
		if (!focusId) return;
		const element = document.getElementById(focusId);
		if (element instanceof HTMLElement) {
			element.focus();
			pendingFocusRef.current = null;
		}
	}, [plan.materials, plan.stages]);
	(0, import_react.useEffect)(() => {
		if (!confirmOpen) return;
		const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : resetButtonRef.current;
		cancelButtonRef.current?.focus();
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				setConfirmOpen(false);
				return;
			}
			if (event.key !== "Tab") return;
			const buttons = [
				closeButtonRef.current,
				cancelButtonRef.current,
				confirmButtonRef.current
			].filter((button) => Boolean(button));
			if (buttons.length === 0) return;
			const currentIndex = buttons.indexOf(document.activeElement);
			const nextIndex = event.shiftKey ? currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1 : currentIndex >= buttons.length - 1 ? 0 : currentIndex + 1;
			event.preventDefault();
			buttons[nextIndex]?.focus();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			previouslyFocused?.focus();
		};
	}, [confirmOpen]);
	function applyTemplate(kind) {
		const template = createMaterialPlanTemplate(kind, locale);
		setActiveTemplate(kind);
		markStarted("template");
		setPlan(template.state);
		pushAnalytics("material_calculator_template_select", { template_kind: kind });
		if (origin === "shared") {
			setStatus({
				kind: "info",
				text: text.sharedWarning
			});
			return;
		}
		removePlanHash();
		persistPlan(template.state);
	}
	function addMaterial() {
		if (plan.materials.length >= materialPlanLimits.maxMaterials) {
			setStatus({
				kind: "error",
				text: text.limitError
			});
			return;
		}
		const id = nextStableId("material", new Set(plan.materials.map((material) => material.id)));
		const nextPlan = {
			...plan,
			materials: [...plan.materials, {
				id,
				name: text.newMaterialName(plan.materials.length + 1)
			}],
			inventory: [...plan.inventory, {
				materialId: id,
				quantity: 0
			}]
		};
		pendingFocusRef.current = `${instanceId}-material-${id}-name`;
		commitPlan(nextPlan, "add_material");
		pushAnalytics("material_calculator_add_material", { material_count: nextPlan.materials.length });
	}
	function removeMaterial(materialId) {
		const index = plan.materials.findIndex((material) => material.id === materialId);
		const remaining = plan.materials.filter((material) => material.id !== materialId);
		const focusMaterial = remaining[Math.min(index, remaining.length - 1)];
		pendingFocusRef.current = focusMaterial ? `${instanceId}-material-${focusMaterial.id}-name` : `${instanceId}-add-material`;
		const nextPlan = {
			...plan,
			materials: remaining,
			inventory: plan.inventory.filter((entry) => entry.materialId !== materialId),
			stages: plan.stages.map((stage) => ({
				...stage,
				costs: stage.costs.filter((cost) => cost.materialId !== materialId)
			}))
		};
		commitPlan(nextPlan, "remove_material");
		pushAnalytics("material_calculator_remove_material", { material_count: nextPlan.materials.length });
	}
	function updateMaterialName(materialId, name) {
		commitPlan({
			...plan,
			materials: plan.materials.map((material) => material.id === materialId ? {
				...material,
				name
			} : material)
		}, "edit_material");
	}
	function updateInventory(materialId, rawValue) {
		const quantity = numberFromInput(rawValue);
		if (quantity === null) {
			setQuantityError();
			return;
		}
		const hasEntry = plan.inventory.some((entry) => entry.materialId === materialId);
		commitPlan({
			...plan,
			inventory: hasEntry ? plan.inventory.map((entry) => entry.materialId === materialId ? {
				...entry,
				quantity
			} : entry) : [...plan.inventory, {
				materialId,
				quantity
			}]
		}, "edit_inventory");
	}
	function addStage() {
		if (plan.stages.length >= materialPlanLimits.maxStages) {
			setStatus({
				kind: "error",
				text: text.limitError
			});
			return;
		}
		const id = nextStableId("stage", new Set(plan.stages.map((stage) => stage.id)));
		const nextPlan = {
			...plan,
			stages: [...plan.stages, {
				id,
				name: text.newStageName(plan.stages.length + 1),
				targetCount: 1,
				costs: []
			}]
		};
		pendingFocusRef.current = `${instanceId}-stage-${id}-name`;
		commitPlan(nextPlan, "add_stage");
		pushAnalytics("material_calculator_add_stage", { stage_count: nextPlan.stages.length });
	}
	function removeStage(stageId) {
		const index = plan.stages.findIndex((stage) => stage.id === stageId);
		const remaining = plan.stages.filter((stage) => stage.id !== stageId);
		const focusStage = remaining[Math.min(index, remaining.length - 1)];
		pendingFocusRef.current = focusStage ? `${instanceId}-stage-${focusStage.id}-name` : `${instanceId}-add-stage`;
		const nextPlan = {
			...plan,
			stages: remaining
		};
		commitPlan(nextPlan, "remove_stage");
		pushAnalytics("material_calculator_remove_stage", { stage_count: nextPlan.stages.length });
	}
	function updateStageName(stageId, name) {
		commitPlan({
			...plan,
			stages: plan.stages.map((stage) => stage.id === stageId ? {
				...stage,
				name
			} : stage)
		}, "edit_stage");
	}
	function updateTargetCount(stageId, rawValue) {
		const targetCount = numberFromInput(rawValue);
		if (targetCount === null) {
			setQuantityError();
			return;
		}
		commitPlan({
			...plan,
			stages: plan.stages.map((stage) => stage.id === stageId ? {
				...stage,
				targetCount
			} : stage)
		}, "edit_target");
	}
	function updateCost(stageId, materialId, rawValue) {
		const quantity = numberFromInput(rawValue);
		if (quantity === null) {
			setQuantityError();
			return;
		}
		const stage = plan.stages.find((candidate) => candidate.id === stageId);
		if (!stage) return;
		const hasCost = stage.costs.some((cost) => cost.materialId === materialId);
		const totalCostLines = plan.stages.reduce((total, candidate) => total + candidate.costs.length, 0);
		if (quantity > 0 && !hasCost && totalCostLines >= materialPlanLimits.maxTotalCostLines) {
			setStatus({
				kind: "error",
				text: text.limitError
			});
			return;
		}
		const costs = quantity === 0 ? stage.costs.filter((cost) => cost.materialId !== materialId) : hasCost ? stage.costs.map((cost) => cost.materialId === materialId ? {
			...cost,
			quantity
		} : cost) : [...stage.costs, {
			materialId,
			quantity
		}];
		commitPlan({
			...plan,
			stages: plan.stages.map((candidate) => candidate.id === stageId ? {
				...candidate,
				costs
			} : candidate)
		}, "edit_cost");
	}
	function savePlanCopy() {
		markStarted("save");
		if (!persistPlan(plan, true)) return;
		removePlanHash();
		pushAnalytics("material_calculator_save", {
			entry_source: origin,
			material_count: plan.materials.length,
			stage_count: plan.stages.length
		});
	}
	async function sharePlan() {
		markStarted("share");
		try {
			calculateMaterialPlan(plan);
			const fragment = buildMaterialPlanShareFragment(plan);
			const url = new URL(window.location.href);
			url.hash = fragment;
			window.history.replaceState(window.history.state, "", url);
			if (navigator.share) {
				await navigator.share({
					title: plan.title,
					text: text.nonOfficial,
					url: url.toString()
				});
				setStatus({
					kind: "success",
					text: text.shareOpened
				});
				pushAnalytics("material_calculator_share", {
					method: "native",
					material_count: plan.materials.length,
					stage_count: plan.stages.length
				});
				return;
			}
			await copyText(url.toString());
			setStatus({
				kind: "success",
				text: text.linkCopied
			});
			pushAnalytics("material_calculator_share", {
				method: "clipboard",
				material_count: plan.materials.length,
				stage_count: plan.stages.length
			});
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") return;
			setStatus({
				kind: "error",
				text: calculationResult.valid ? text.copyFailed : text.invalidPlan
			});
		}
	}
	async function copyShortageList() {
		markStarted("copy_shortage");
		if (shortageMaterials.length === 0) {
			setStatus({
				kind: "info",
				text: text.nothingToCopy
			});
			return;
		}
		const lines = shortageMaterials.map((material) => `${material.name}: ${text.resultShortage} ${formatter.format(material.shortage)} (${text.resultRequired} ${formatter.format(material.required)} · ${text.resultInventory} ${formatter.format(material.inventory)})`);
		try {
			await copyText([
				text.shortageListTitle,
				plan.title,
				"",
				...lines
			].join("\n"));
			setStatus({
				kind: "success",
				text: text.copiedShortage
			});
			pushAnalytics("material_calculator_copy_shortage", { shortage_type_count: shortageMaterials.length });
		} catch {
			setStatus({
				kind: "error",
				text: text.copyFailed
			});
		}
	}
	function confirmReset() {
		const blank = createMaterialPlanTemplate("blank", locale).state;
		setPlan(blank);
		setActiveTemplate("blank");
		setOrigin("session");
		setConfirmOpen(false);
		removePlanHash();
		try {
			window.localStorage.removeItem(STORAGE_KEY);
			setStorageBlocked(false);
			setStatus({
				kind: "success",
				text: text.resetDone
			});
		} catch {
			setStorageBlocked(true);
			setStatus({
				kind: "error",
				text: text.storageError
			});
		}
		markStarted("reset");
		pushAnalytics("material_calculator_reset", {
			previous_material_count: plan.materials.length,
			previous_stage_count: plan.stages.length
		});
	}
	function handleDialogKeyDown(event) {
		if (event.key === "Escape") setConfirmOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: MaterialCalculator_module_default.calculator,
		"aria-labelledby": `${instanceId}-title`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: MaterialCalculator_module_default.hero,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: MaterialCalculator_module_default.kicker,
						children: text.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: `${instanceId}-title`,
						children: text.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: MaterialCalculator_module_default.description,
						children: text.description
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: MaterialCalculator_module_default.sourceCard,
					"aria-label": text.sourceLabel,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.sourceLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						"data-origin": origin,
						children: sourceText(text, origin, hydrated)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: MaterialCalculator_module_default.disclaimer,
				role: "note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: text.nonOfficial }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.localOnly })]
			}),
			origin === "shared" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: MaterialCalculator_module_default.sharedNotice,
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text.sharedWarning }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: MaterialCalculator_module_default.primaryButton,
					onClick: savePlanCopy,
					children: text.saveCopy
				})]
			}) : null,
			storageBlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: MaterialCalculator_module_default.storageWarning,
				role: "alert",
				children: text.storageError
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: MaterialCalculator_module_default.templatePicker,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: text.templateLegend }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: MaterialCalculator_module_default.fieldHint,
						children: text.templateHint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: MaterialCalculator_module_default.templateGrid,
						children: templates.map((template) => {
							const selected = activeTemplate === template.kind;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: MaterialCalculator_module_default.templateCard,
								"aria-pressed": selected,
								onClick: () => applyTemplate(template.kind),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: MaterialCalculator_module_default.templateCardHeader,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: template.copy.name }), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: text.selectedTemplate }) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: template.copy.description }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: template.copy.notice }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: MaterialCalculator_module_default.templateAction,
										children: text.useTemplate(template.copy.name)
									})
								]
							}, template.kind);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: MaterialCalculator_module_default.planBar,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: `${instanceId}-plan-title`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.planTitleLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: `${instanceId}-plan-title`,
							type: "text",
							value: plan.title,
							maxLength: materialPlanLimits.maxLabelLength,
							"aria-invalid": !plan.title.trim(),
							"aria-describedby": `${instanceId}-plan-title-hint`,
							onChange: (event) => commitPlan({
								...plan,
								title: event.currentTarget.value
							}, "edit_title")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: `${instanceId}-plan-title-hint`,
						children: text.planTitleHint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: MaterialCalculator_module_default.planActions,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: MaterialCalculator_module_default.primaryButton,
								disabled: !calculationResult.valid,
								onClick: savePlanCopy,
								children: origin === "shared" ? text.saveCopy : text.save
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: MaterialCalculator_module_default.secondaryButton,
								disabled: !calculationResult.valid,
								onClick: sharePlan,
								children: text.share
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: MaterialCalculator_module_default.secondaryButton,
								disabled: shortageMaterials.length === 0,
								onClick: copyShortageList,
								children: text.copyShortage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								ref: resetButtonRef,
								type: "button",
								className: MaterialCalculator_module_default.dangerButton,
								onClick: () => setConfirmOpen(true),
								children: text.reset
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `${MaterialCalculator_module_default.status} ${status ? MaterialCalculator_module_default[`status_${status.kind}`] : ""}`,
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "true",
				children: status?.text ?? " "
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: MaterialCalculator_module_default.workspace,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: MaterialCalculator_module_default.editorColumn,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: MaterialCalculator_module_default.editorSection,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: text.materialsLegend }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: MaterialCalculator_module_default.sectionHeader,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text.materialsHint }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									id: `${instanceId}-add-material`,
									type: "button",
									className: MaterialCalculator_module_default.addButton,
									disabled: plan.materials.length >= materialPlanLimits.maxMaterials,
									onClick: addMaterial,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "＋"
									}), text.addMaterial]
								})]
							}),
							plan.materials.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: MaterialCalculator_module_default.emptyState,
								children: text.emptyMaterials
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: MaterialCalculator_module_default.materialList,
								children: plan.materials.map((material) => {
									const inventory = plan.inventory.find((entry) => entry.materialId === material.id)?.quantity ?? 0;
									const displayName = material.name.trim() || text.unnamedMaterial;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: MaterialCalculator_module_default.materialRow,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												htmlFor: `${instanceId}-material-${material.id}-name`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.materialName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: `${instanceId}-material-${material.id}-name`,
													type: "text",
													value: material.name,
													maxLength: materialPlanLimits.maxLabelLength,
													"aria-invalid": !material.name.trim(),
													onChange: (event) => updateMaterialName(material.id, event.currentTarget.value)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												htmlFor: `${instanceId}-material-${material.id}-inventory`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.inventory }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: `${instanceId}-material-${material.id}-inventory`,
													type: "number",
													inputMode: "numeric",
													min: 0,
													max: MAX_QUANTITY,
													step: 1,
													value: inventory,
													onChange: (event) => updateInventory(material.id, event.currentTarget.value)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: MaterialCalculator_module_default.iconButton,
												"aria-label": text.removeMaterial(displayName),
												title: text.removeMaterial(displayName),
												onClick: () => removeMaterial(material.id),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"aria-hidden": "true",
													children: "×"
												})
											})
										]
									}, material.id);
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: MaterialCalculator_module_default.editorSection,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: text.stagesLegend }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: MaterialCalculator_module_default.sectionHeader,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text.stagesHint }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									id: `${instanceId}-add-stage`,
									type: "button",
									className: MaterialCalculator_module_default.addButton,
									disabled: plan.stages.length >= materialPlanLimits.maxStages,
									onClick: addStage,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "＋"
									}), text.addStage]
								})]
							}),
							plan.stages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: MaterialCalculator_module_default.emptyState,
								children: text.emptyStages
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: MaterialCalculator_module_default.stageList,
								children: plan.stages.map((stage, stageIndex) => {
									const displayName = stage.name.trim() || text.unnamedStage;
									const costHeadingId = `${instanceId}-stage-${stage.id}-cost-heading`;
									const costHintId = `${instanceId}-stage-${stage.id}-cost-hint`;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
										className: MaterialCalculator_module_default.stageCard,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatter.format(stageIndex + 1) }), displayName] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: MaterialCalculator_module_default.stageHeader,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														htmlFor: `${instanceId}-stage-${stage.id}-name`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.stageName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															id: `${instanceId}-stage-${stage.id}-name`,
															type: "text",
															value: stage.name,
															maxLength: materialPlanLimits.maxLabelLength,
															"aria-invalid": !stage.name.trim(),
															onChange: (event) => updateStageName(stage.id, event.currentTarget.value)
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														htmlFor: `${instanceId}-stage-${stage.id}-target`,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.targetCount }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																id: `${instanceId}-stage-${stage.id}-target`,
																type: "number",
																inputMode: "numeric",
																min: 0,
																max: MAX_QUANTITY,
																step: 1,
																value: stage.targetCount,
																"aria-describedby": `${instanceId}-stage-${stage.id}-target-hint`,
																onChange: (event) => updateTargetCount(stage.id, event.currentTarget.value)
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
																id: `${instanceId}-stage-${stage.id}-target-hint`,
																children: text.targetCountHint
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: MaterialCalculator_module_default.iconButton,
														"aria-label": text.removeStage(displayName),
														title: text.removeStage(displayName),
														onClick: () => removeStage(stage.id),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"aria-hidden": "true",
															children: "×"
														})
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: MaterialCalculator_module_default.costSection,
												role: "group",
												"aria-labelledby": costHeadingId,
												"aria-describedby": costHintId,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														id: costHeadingId,
														children: text.costsTitle
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														id: costHintId,
														children: text.costsHint
													}),
													plan.materials.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: MaterialCalculator_module_default.inlineEmpty,
														children: text.emptyMaterials
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: MaterialCalculator_module_default.costGrid,
														children: plan.materials.map((material) => {
															const quantity = stage.costs.find((cost) => cost.materialId === material.id)?.quantity ?? 0;
															const displayMaterial = material.name.trim() || text.unnamedMaterial;
															const inputId = `${instanceId}-stage-${stage.id}-cost-${material.id}`;
															return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
																htmlFor: inputId,
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.costFor(displayMaterial) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																	id: inputId,
																	type: "number",
																	inputMode: "numeric",
																	min: 0,
																	max: MAX_QUANTITY,
																	step: 1,
																	value: quantity,
																	onChange: (event) => updateCost(stage.id, material.id, event.currentTarget.value)
																})]
															}, material.id);
														})
													})
												]
											})
										]
									}, stage.id);
								})
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: MaterialCalculator_module_default.summary,
					"aria-labelledby": `${instanceId}-summary-title`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: MaterialCalculator_module_default.kicker,
							children: text.summaryKicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: `${instanceId}-summary-title`,
							children: text.summaryTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: MaterialCalculator_module_default.comparisonWarning,
							children: text.comparisonWarning
						}),
						calculation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", {
								className: MaterialCalculator_module_default.summaryStats,
								"aria-live": "polite",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: MaterialCalculator_module_default.summaryStatReady,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatter.format(readyMaterials.length) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: text.readyTypes })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: MaterialCalculator_module_default.summaryStatShort,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatter.format(shortageMaterials.length) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: text.shortageTypes })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatter.format(calculation.totals.targetedMaterials) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: text.targetedTypes })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatter.format(plan.stages.length) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: text.configuredStages })] })
								]
							}),
							!calculation.totals.hasTarget ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: MaterialCalculator_module_default.summaryEmpty,
								children: text.noTargets
							}) : shortageMaterials.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: MaterialCalculator_module_default.allReady,
								children: text.allReady
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: MaterialCalculator_module_default.resultList,
								children: calculation.materials.map((material) => {
									const percentage = material.completionRatio === null ? null : Math.max(0, Math.min(100, Math.round(material.completionRatio * 100)));
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: MaterialCalculator_module_default.resultCard,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: material.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-state": !material.hasTarget ? "idle" : material.isComplete ? "ready" : "short",
												children: !material.hasTarget ? text.resultNotTargeted : material.isComplete ? text.resultReady : `${text.resultShortage} ${formatter.format(material.shortage)}`
											})] }),
											percentage !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: MaterialCalculator_module_default.progressRow,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("progress", {
													max: material.required,
													value: material.covered,
													"aria-label": text.materialProgress(material.name, percentage),
													children: [percentage, "%"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"aria-hidden": "true",
													children: [percentage, "%"]
												})]
											}) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: text.resultRequired }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatter.format(material.required) })] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: text.resultInventory }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatter.format(material.inventory) })] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: text.resultShortage }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													"data-tone": material.shortage > 0 ? "short" : void 0,
													children: formatter.format(material.shortage)
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: text.resultSurplus }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													"data-tone": material.surplus > 0 ? "ready" : void 0,
													children: formatter.format(material.surplus)
												})] })
											] })
										]
									}, material.materialId);
								})
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: MaterialCalculator_module_default.invalidSummary,
							role: "alert",
							children: text.invalidPlan
						})
					]
				})]
			}),
			confirmOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: MaterialCalculator_module_default.dialogBackdrop,
				role: "presentation",
				onMouseDown: (event) => {
					if (event.target === event.currentTarget) setConfirmOpen(false);
				},
				onKeyDown: handleDialogKeyDown,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: MaterialCalculator_module_default.dialog,
					role: "alertdialog",
					"aria-modal": "true",
					"aria-labelledby": `${instanceId}-confirm-title`,
					"aria-describedby": `${instanceId}-confirm-description`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							ref: closeButtonRef,
							type: "button",
							className: MaterialCalculator_module_default.dialogClose,
							"aria-label": text.closeDialog,
							onClick: () => setConfirmOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "×"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: `${instanceId}-confirm-title`,
							children: text.confirmTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: `${instanceId}-confirm-description`,
							children: text.confirmBody
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: MaterialCalculator_module_default.dialogActions,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								ref: cancelButtonRef,
								type: "button",
								className: MaterialCalculator_module_default.secondaryButton,
								onClick: () => setConfirmOpen(false),
								children: text.cancel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								ref: confirmButtonRef,
								type: "button",
								className: MaterialCalculator_module_default.confirmDangerButton,
								onClick: confirmReset,
								children: text.confirmReset
							})]
						})
					]
				})
			}) : null
		]
	});
}
//#endregion
export { MaterialCalculator, MaterialCalculator as default };
