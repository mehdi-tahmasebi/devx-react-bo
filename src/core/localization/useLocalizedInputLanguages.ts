import { useMemo } from "react";
import {
  filterVisibleLanguageOptions,
  getLocalizationLocaleKeys,
} from "./localization-input";
import { useLocalizationLanguages } from "./localization.hooks";

export function useLocalizedInputLanguages() {
  const query = useLocalizationLanguages();
  const allOptions = query.data?.options ?? [];
  const visibleOptions = useMemo(
    () => filterVisibleLanguageOptions(allOptions),
    [allOptions],
  );
  const allLocaleKeys = useMemo(
    () => getLocalizationLocaleKeys(allOptions),
    [allOptions],
  );
  const visibleLocaleKeys = useMemo(
    () => getLocalizationLocaleKeys(visibleOptions),
    [visibleOptions],
  );

  return {
    ...query,
    allOptions,
    visibleOptions,
    allLocaleKeys,
    visibleLocaleKeys,
  };
}
