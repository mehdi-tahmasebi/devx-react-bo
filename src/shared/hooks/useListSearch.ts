import { useCallback, useEffect } from "react";
import { useTableSearch } from "./useTableSearch";

type UrlQuerySetter = (patch: Record<string, unknown>) => void;

export function useListSearch(
  appliedFromUrl: string,
  setUrlState: UrlQuerySetter,
  options?: { qKey?: string },
) {
  const qKey = options?.qKey ?? "q";
  const search = useTableSearch({ initialApplied: appliedFromUrl });

  useEffect(() => {
    search.setDraft(appliedFromUrl);
    search.setApplied(appliedFromUrl);
  }, [appliedFromUrl, search.setApplied, search.setDraft]);

  const confirm = useCallback(
    (draftOverride?: string) => {
      const next = search.confirm(draftOverride);
      setUrlState({ [qKey]: next });
      return next;
    },
    [qKey, search.confirm, setUrlState],
  );

  const reset = useCallback(() => {
    search.reset();
    setUrlState({ [qKey]: "" });
  }, [qKey, search.reset, setUrlState]);

  return {
    draft: search.draft,
    applied: search.applied,
    helperText: search.helperText,
    apiQuery: search.apiQuery,
    setDraft: search.setDraft,
    confirm,
    reset,
  };
}
