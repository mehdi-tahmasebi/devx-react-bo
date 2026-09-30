import { Link, Typography } from "@mui/material";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { BooleanIndicator } from "@/components/ui/form/fields";
import { DataTable } from "@/components/ui/table";
import {
  appendListSearchParam,
  getDataTableServerSearchProps,
  useListSearch,
  useTableActionHref,
  useUrlQueryState,
  useUrlServerPagination,
  urlQueryStringField,
} from "@/shared/hooks";
import type { TTableColumn } from "@/shared/types";
import { formatDateTime } from "@/shared/utils/date";
import { useDeleteDemoRecord, useDemoRecordsList } from "../hooks";
import { DEMO_RECORD_STATUS_LABELS, type DemoRecordListDto } from "../model";
import { demoRecordPaths } from "../routes";

const LIST_URL_FIELDS = { q: urlQueryStringField() };
const LIST_URL_DEFAULTS = { q: "" };

const columns: TTableColumn<DemoRecordListDto>[] = [
  {
    id: "name",
    label: "Nome",
    minWidth: 200,
    render: (row) => (
      <Link
        component={RouterLink}
        to={demoRecordPaths.detail(row.id)}
        underline="hover"
      >
        {row.name}
      </Link>
    ),
  },
  { id: "code", label: "Codice", minWidth: 120 },
  {
    id: "status",
    label: "Stato",
    minWidth: 120,
    render: (row) => DEMO_RECORD_STATUS_LABELS[row.status],
  },
  {
    id: "isActive",
    label: "Attivo",
    width: 100,
    render: (row) => <BooleanIndicator value={row.isActive} />,
  },
  {
    id: "createdAt",
    label: "Creato",
    minWidth: 160,
    render: (row) => (
      <Typography variant="body2">{formatDateTime(row.createdAt)}</Typography>
    ),
  },
];

export function DemoRecordTable() {
  const [urlState, setUrlState] = useUrlQueryState(
    LIST_URL_FIELDS,
    LIST_URL_DEFAULTS,
  );
  const search = useListSearch(urlState.q, setUrlState);
  const getActionHref = useTableActionHref();
  const {
    page,
    pageSize,
    selectedRowId,
    paginationParams,
    onPageChange,
    onPageSizeChange,
    resetPage,
  } = useUrlServerPagination();

  const listParams = useMemo(
    () => appendListSearchParam({ ...paginationParams }, search.apiQuery),
    [paginationParams, search.apiQuery],
  );

  const { data, isLoading, isError, error } = useDemoRecordsList(listParams);
  const { mutateAsync: deleteRecord } = useDeleteDemoRecord();

  const handleSearchConfirm = (draftOverride?: string) => {
    search.confirm(draftOverride);
    resetPage();
  };

  return (
    <DataTable
      columns={columns}
      rows={data?.rows ?? []}
      rowKey="id"
      loading={isLoading}
      error={isError ? (error as Error) : null}
      totalRows={data?.totalRows}
      page={page}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      selectedRowId={selectedRowId}
      searchable
      searchPlaceholder="Cerca per nome o codice…"
      fillContainer
      getActionHref={getActionHref}
      {...getDataTableServerSearchProps(search, handleSearchConfirm)}
      actions={{
        edit: {
          getPath: (row) => demoRecordPaths.edit(row.id),
        },
        delete: {
          confirmTitle: "Elimina record",
          confirmMessage: (row) =>
            `Eliminare "${row.name}"? L'operazione non è reversibile.`,
          onConfirm: async (row) => {
            await deleteRecord(row.id);
          },
        },
      }}
    />
  );
}
