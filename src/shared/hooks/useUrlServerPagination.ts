import { useCallback, useMemo } from "react";
import {
  urlQueryNumberField,
  urlQueryStringField,
  useUrlQueryState,
} from "./useUrlQueryState";
import { DEFAULT_PAGE_SIZE, type ServerPaginationParams } from "./useServerPagination";
import { SELECTED_ROW_QUERY_KEY } from "./table-navigation";

const URL_PAGINATION_FIELDS = {
  page: urlQueryNumberField(0),
  pageSize: urlQueryNumberField(DEFAULT_PAGE_SIZE),
  selectedId: urlQueryStringField(),
};

const URL_PAGINATION_DEFAULTS = {
  page: 0,
  pageSize: DEFAULT_PAGE_SIZE,
  selectedId: "",
};

export const URL_PAGINATION_QUERY_CONFIG = {
  fields: URL_PAGINATION_FIELDS,
  defaults: URL_PAGINATION_DEFAULTS,
};

export function useUrlServerPagination(options?: { initialPageSize?: number }) {
  const initialPageSize = options?.initialPageSize ?? DEFAULT_PAGE_SIZE;
  const defaults = useMemo(
    () => ({
      ...URL_PAGINATION_DEFAULTS,
      pageSize: initialPageSize,
    }),
    [initialPageSize],
  );

  const [urlState, setUrlState] = useUrlQueryState(URL_PAGINATION_FIELDS, defaults);

  const paginationParams = useMemo(
    (): ServerPaginationParams => ({
      offset: urlState.page * urlState.pageSize,
      limit: urlState.pageSize,
    }),
    [urlState.page, urlState.pageSize],
  );

  const onPageChange = useCallback(
    (nextPage: number) => {
      setUrlState({ page: nextPage });
    },
    [setUrlState],
  );

  const onPageSizeChange = useCallback(
    (nextSize: number) => {
      setUrlState({ page: 0, pageSize: nextSize });
    },
    [setUrlState],
  );

  const resetPage = useCallback(() => {
    setUrlState({ page: 0 });
  }, [setUrlState]);

  const setSelectedRowId = useCallback(
    (rowId: string | number | null) => {
      setUrlState({ selectedId: rowId == null ? "" : String(rowId) });
    },
    [setUrlState],
  );

  return {
    page: urlState.page,
    pageSize: urlState.pageSize,
    selectedRowId: urlState.selectedId || null,
    paginationParams,
    onPageChange,
    onPageSizeChange,
    resetPage,
    setSelectedRowId,
    selectedRowQueryKey: SELECTED_ROW_QUERY_KEY,
  };
}
