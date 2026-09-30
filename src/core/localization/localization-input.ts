import { productFeatures } from "@/core/branding/features";
import type { LocalizationLanguageOptionDto } from "./localization.api";

export const LOCALIZATION_PRIMARY_LOCALE = "it";
export const LOCALIZATION_MIRROR_LOCALE = "en";

const FALLBACK_LOCALES = [
  LOCALIZATION_PRIMARY_LOCALE,
  LOCALIZATION_MIRROR_LOCALE,
];

export function shouldMirrorSecondaryLocalizedLocale(): boolean {
  return productFeatures.mirrorEnFromIt;
}

/**
 * Single-locale mode: field name only — e.g. "Nome".
 * Multi-locale mode: field name + language — e.g. "Nome (Italiano)".
 */
export function resolveLocalizedInputLabel(
  fieldLabel: string | undefined,
  localeLabel: string,
  visibleLocaleCount: number,
): string {
  const trimmedField = fieldLabel?.trim();

  if (shouldMirrorSecondaryLocalizedLocale() || visibleLocaleCount <= 1) {
    return trimmedField || localeLabel;
  }

  if (trimmedField) {
    return `${trimmedField} (${localeLabel})`;
  }

  return localeLabel;
}

export function filterVisibleLanguageOptions(
  options: LocalizationLanguageOptionDto[],
): LocalizationLanguageOptionDto[] {
  if (!shouldMirrorSecondaryLocalizedLocale()) {
    return options;
  }

  const primary = options.find(
    (option) => option.value === LOCALIZATION_PRIMARY_LOCALE,
  );

  if (primary) {
    return [primary];
  }

  return options.length > 0 ? [options[0]] : [];
}

export function getLocalizationLocaleKeys(
  options: LocalizationLanguageOptionDto[],
): string[] {
  if (options.length > 0) {
    return options.map((option) => option.value);
  }

  return [...FALLBACK_LOCALES];
}

export function getValidationLocales(locales: string[]): string[] {
  if (shouldMirrorSecondaryLocalizedLocale()) {
    if (locales.includes(LOCALIZATION_PRIMARY_LOCALE)) {
      return [LOCALIZATION_PRIMARY_LOCALE];
    }

    return locales.length > 0 ? [locales[0]] : [];
  }

  return locales;
}

export function applyLocalizedFieldChange(
  current: Record<string, string>,
  changedLocale: string,
  newText: string,
  allLocaleKeys: string[],
): Record<string, string> {
  const next: Record<string, string> = Object.fromEntries(
    allLocaleKeys.map((locale) => [
      locale,
      locale === changedLocale ? newText : (current[locale] ?? ""),
    ]),
  );

  if (
    shouldMirrorSecondaryLocalizedLocale() &&
    changedLocale === LOCALIZATION_PRIMARY_LOCALE
  ) {
    next[LOCALIZATION_MIRROR_LOCALE] = newText;
  }

  return next;
}

export function normalizeLocalizedValueForSubmit(
  value: Record<string, string>,
  allLocaleKeys: string[] = FALLBACK_LOCALES,
): Record<string, string> {
  const keys = allLocaleKeys.length > 0 ? allLocaleKeys : FALLBACK_LOCALES;
  const trimmed = Object.fromEntries(
    keys.map((locale) => [locale, (value[locale] ?? "").trim()]),
  );

  if (shouldMirrorSecondaryLocalizedLocale()) {
    trimmed[LOCALIZATION_MIRROR_LOCALE] =
      trimmed[LOCALIZATION_PRIMARY_LOCALE] ?? "";
  }

  return trimmed;
}

export type LocalizedTextInput = Record<string, string> | { it: string; en: string };

export function prepareLocalizedTextDto(
  value: LocalizedTextInput,
  allLocaleKeys: string[] = FALLBACK_LOCALES,
): { it: string; en: string } {
  const normalized = normalizeLocalizedValueForSubmit(value, allLocaleKeys);

  return {
    it: normalized.it ?? "",
    en: normalized.en ?? "",
  };
}
