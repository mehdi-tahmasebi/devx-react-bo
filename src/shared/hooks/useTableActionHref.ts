import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  buildDetailPathWithReturn,
  buildReturnToSearch,
} from "./table-navigation";

export function useTableActionHref() {
  const location = useLocation();

  return useCallback(
    (row: { id: string | number }, path: string) =>
      buildDetailPathWithReturn(
        path,
        buildReturnToSearch(location.search, row.id),
      ),
    [location.search],
  );
}
