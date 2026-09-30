export {
  fetchLocalizationLanguages,
  LOCALIZATION_LANGUAGES_ENDPOINT,
  type LocalizationLanguageOptionDto,
  type LocalizationLanguagesDto,
} from "./localization.api";
export {
  LOCALIZATION_MIRROR_LOCALE,
  LOCALIZATION_PRIMARY_LOCALE,
  applyLocalizedFieldChange,
  filterVisibleLanguageOptions,
  getLocalizationLocaleKeys,
  getValidationLocales,
  normalizeLocalizedValueForSubmit,
  prepareLocalizedTextDto,
  resolveLocalizedInputLabel,
  type LocalizedTextInput,
  shouldMirrorSecondaryLocalizedLocale,
} from "./localization-input";
export { localizationKeys, useLocalizationLanguages } from "./localization.hooks";
export { useLocalizedInputLanguages } from "./useLocalizedInputLanguages";
export {
  cloneLocalizedText,
  hasLocalizedText,
  isLocalizedTextComplete,
  resolveLocalizedDisplayName,
  trimLocalizedText,
} from "./localized-text";
