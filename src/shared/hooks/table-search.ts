export type TableSearchState = {
  draft: string;
  applied: string;
  helperText?: string;
  setDraft: (value: string) => void;
};

export function appendListSearchParam(
  params: Record<string, unknown>,
  apiQuery: string | undefined,
) {
  if (apiQuery) {
    params.q = apiQuery;
  }

  return params;
}

export function getDataTableServerSearchProps(
  search: TableSearchState,
  onConfirm: (draftOverride?: string) => void,
) {
  return {
    searchDraft: search.draft,
    onSearchDraftChange: search.setDraft,
    onSearchConfirm: onConfirm,
    searchValue: search.applied,
    searchHelperText: search.helperText,
  };
}
