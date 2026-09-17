const ANALYTICS_IP_KEY_BYTES = 32;
const ANALYTICS_IP_IV_BYTES = 12;
const BASE64URL_PATTERN = /^[A-Za-z0-9_-]+$/u;

export const ANALYTICS_IP_KEY_VERSION = 1;

export type AnalyticsIpContext = {
  rowId: string;
  visitorHash: string;
  sessionHash: string;
  occurredAt: number;
  keyVersion: number;
};

export type EncryptedAnalyticsIp = {
  ciphertext: string;
  iv: string;
  keyVersion: number;
};

function encodeBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}

function decodeBase64Url(value: string, expectedBytes?: number) {
  if (!value || !BASE64URL_PATTERN.test(value)) {
    throw new Error("Invalid base64url value");
  }
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  let binary: string;
  try {
    binary = atob(value.replaceAll("-", "+").replaceAll("_", "/") + padding);
  } catch {
    throw new Error("Invalid base64url value");
  }
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  if (
    (expectedBytes !== undefined && bytes.byteLength !== expectedBytes) ||
    encodeBase64Url(bytes) !== value
  ) {
    throw new Error("Invalid base64url value");
  }
  return bytes;
}

async function importEncryptionKey(secret: string | undefined) {
  const normalized = secret?.trim() ?? "";
  const raw = decodeBase64Url(normalized, ANALYTICS_IP_KEY_BYTES);
  return crypto.subtle.importKey(
    "raw",
    raw,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"],
  );
}

function additionalData(context: AnalyticsIpContext) {
  return new TextEncoder().encode([
    "aion2kina-analytics-ip-v1",
    context.rowId,
    context.visitorHash,
    context.sessionHash,
    String(context.occurredAt),
    String(context.keyVersion),
  ].join("\n"));
}

export async function encryptAnalyticsIp(
  ipAddress: string,
  context: Omit<AnalyticsIpContext, "keyVersion">,
  secret: string | undefined,
): Promise<EncryptedAnalyticsIp> {
  const keyVersion = ANALYTICS_IP_KEY_VERSION;
  const key = await importEncryptionKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(ANALYTICS_IP_IV_BYTES));
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
      additionalData: additionalData({ ...context, keyVersion }),
      tagLength: 128,
    },
    key,
    new TextEncoder().encode(ipAddress),
  ));
  return {
    ciphertext: encodeBase64Url(ciphertext),
    iv: encodeBase64Url(iv),
    keyVersion,
  };
}

export async function decryptAnalyticsIp(
  encrypted: EncryptedAnalyticsIp,
  context: Omit<AnalyticsIpContext, "keyVersion">,
  secret: string | undefined,
) {
  if (encrypted.keyVersion !== ANALYTICS_IP_KEY_VERSION) return null;
  try {
    const key = await importEncryptionKey(secret);
    const plaintext = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: decodeBase64Url(encrypted.iv, ANALYTICS_IP_IV_BYTES),
        additionalData: additionalData({
          ...context,
          keyVersion: encrypted.keyVersion,
        }),
        tagLength: 128,
      },
      key,
      decodeBase64Url(encrypted.ciphertext),
    );
    return new TextDecoder("utf-8", { fatal: true }).decode(plaintext);
  } catch {
    return null;
  }
}
