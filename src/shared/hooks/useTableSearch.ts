import { useCallback, useState } from "react";

export const MIN_TABLE_SEARCH_LENGTH = 3;

export const TABLE_SEARCH_TOO_SHORT_MESSAGE =
  "Inserisci almeno 3 caratteri per avviare la ricerca";

export function useTableSearch(options?: {
  minLength?: number;
  initialApplied?: string;
}) {
  const minLength = options?.minLength ?? MIN_TABLE_SEARCH_LENGTH;
  const initialApplied = options?.initialApplied ?? "";
  const [draft, setDraft] = useState(initialApplied);
  const [applied, setApplied] = useState(initialApplied);
  const [helperText, setHelperText] = useState<string | undefined>();

  const confirm = useCallback(
    (draftOverride?: string) => {
      const trimmed = (draftOverride ?? draft).trim();

      if (!trimmed) {
        setApplied("");
        setHelperText(undefined);
        return "";
      }

      if (trimmed.length < minLength) {
        setHelperText(TABLE_SEARCH_TOO_SHORT_MESSAGE);
        return applied;
      }

      setHelperText(undefined);
      setApplied(trimmed);
      return trimmed;
    },
    [applied, draft, minLength],
  );

  const reset = useCallback(() => {
    setDraft("");
    setApplied("");
    setHelperText(undefined);
  }, []);

  const onDraftChange = useCallback(
    (value: string) => {
      setDraft(value);
      if (helperText) {
        setHelperText(undefined);
      }
    },
    [helperText],
  );

  const apiQuery = applied.length >= minLength ? applied : undefined;

  return {
    draft,
    applied,
    helperText,
    apiQuery,
    setDraft: onDraftChange,
    confirm,
    reset,
    setApplied,
  };
}
