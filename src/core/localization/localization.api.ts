import { apiClient } from "@/core/api/client";

export const LOCALIZATION_LANGUAGES_ENDPOINT =
  "/api/bo/v1/localization/languages";

export interface LocalizationLanguageOptionDto {
  value: string;
  label: string;
}

export interface LocalizationLanguagesDto {
  defaultLocale: string;
  options: LocalizationLanguageOptionDto[];
}

export async function fetchLocalizationLanguages() {
  const { data } = await apiClient.get<LocalizationLanguagesDto>(
    LOCALIZATION_LANGUAGES_ENDPOINT,
  );
  return data;
}
