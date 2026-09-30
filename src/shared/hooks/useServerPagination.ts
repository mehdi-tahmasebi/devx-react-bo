import { useCallback, useMemo, useState } from "react";

export const DEFAULT_PAGE_SIZE = 20;

export type ServerPaginationParams = {
  offset: number;
  limit: number;
};

export function useServerPagination(options?: { initialPageSize?: number }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(
    options?.initialPageSize ?? DEFAULT_PAGE_SIZE,
  );

  const paginationParams = useMemo(
    (): ServerPaginationParams => ({
      offset: page * pageSize,
      limit: pageSize,
    }),
    [page, pageSize],
  );

  const onPageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const onPageSizeChange = useCallback((nextSize: number) => {
    setPageSize(nextSize);
    setPage(0);
  }, []);

  const resetPage = useCallback(() => {
    setPage(0);
  }, []);

  return {
    page,
    pageSize,
    paginationParams,
    onPageChange,
    onPageSizeChange,
    resetPage,
  };
}
