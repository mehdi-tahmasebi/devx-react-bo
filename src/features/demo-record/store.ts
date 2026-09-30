import { useCallback, useState } from "react";

/** Local UI state only — never server cache (see REACT.md). */
export function useDemoRecordUiStore() {
  const [isLabelsDialogOpen, setIsLabelsDialogOpen] = useState(false);

  const openLabelsDialog = useCallback(() => setIsLabelsDialogOpen(true), []);
  const closeLabelsDialog = useCallback(() => setIsLabelsDialogOpen(false), []);

  return {
    isLabelsDialogOpen,
    openLabelsDialog,
    closeLabelsDialog,
  };
}
