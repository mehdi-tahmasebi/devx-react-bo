import { getValidationLocales } from "./localization-input";

export function cloneLocalizedText(
  value: Record<string, string> | null | undefined,
): Record<string, string> {
  return { ...(value ?? {}) };
}

export function trimLocalizedText(
  value: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(value).map(([locale, text]) => [locale, text.trim()]),
  );
}

export function hasLocalizedText(
  value: Record<string, string> | null | undefined,
): boolean {
  if (!value) {
    return false;
  }

  return Object.values(value).some((text) => Boolean(text?.trim()));
}

export function isLocalizedTextComplete(
  value: Record<string, string>,
  locales: string[],
): boolean {
  const requiredLocales = getValidationLocales(locales);

  return (
    requiredLocales.length > 0 &&
    requiredLocales.every((locale) => Boolean(value[locale]?.trim()))
  );
}

export function resolveLocalizedDisplayName(
  value: Record<string, string> | string | null | undefined,
  fallback = "—",
): string {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  const preferred = value.it?.trim() || value.en?.trim();
  if (preferred) {
    return preferred;
  }

  const first = Object.values(value).find((text) => text?.trim());
  return first?.trim() || fallback;
}
