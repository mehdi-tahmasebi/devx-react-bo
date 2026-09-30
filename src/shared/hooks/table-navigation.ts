import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SELECTED_ROW_QUERY_KEY = "selectedId";
export const RETURN_TO_QUERY_KEY = "returnTo";

export function buildReturnToSearch(
  search: string,
  rowId: string | number,
): string {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(raw);
  params.set(SELECTED_ROW_QUERY_KEY, String(rowId));
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function buildDetailPathWithReturn(
  detailPath: string,
  returnSearch: string,
): string {
  if (!returnSearch) {
    return detailPath;
  }

  return `${detailPath}?${RETURN_TO_QUERY_KEY}=${encodeURIComponent(returnSearch)}`;
}

export function useListReturnNavigation(listPath: string) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return useCallback(() => {
    const returnTo = searchParams.get(RETURN_TO_QUERY_KEY);
    navigate(returnTo ? `${listPath}${returnTo}` : listPath);
  }, [listPath, navigate, searchParams]);
}
