import { useQuery } from "@tanstack/react-query";
import { fetchLocalizationLanguages } from "./localization.api";

export const localizationKeys = {
  all: ["localization"] as const,
  languages: () => [...localizationKeys.all, "languages"] as const,
};

export function useLocalizationLanguages() {
  return useQuery({
    queryKey: localizationKeys.languages(),
    queryFn: fetchLocalizationLanguages,
    staleTime: 5 * 60 * 1000,
  });
}
