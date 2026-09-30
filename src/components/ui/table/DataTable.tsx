import {
  Alert,
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ConfirmDialog } from "@/components/ui/dialog";
import { DeleteIcon, EditIcon, SearchIcon, VisibilityIcon } from "@/shared/icons";
import type { TTableColumn, TTableRowAction } from "@/shared/types";
import { getByPath } from "@/shared/utils/object";

type DataTableProps<T extends object> = {
  columns: TTableColumn<T>[];
  rows: T[];
  rowKey: keyof T | ((row: T) => string | number);
  loading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  totalRows?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  actions?: TTableRowAction<T>;
  searchable?: boolean;
  /** When this value changes, the table search field is cleared. */
  searchResetKey?: string | number | null;
  searchPlaceholder?: string;
  tableMinWidth?: number | string;
  compact?: boolean;
  variant?: "default" | "embedded";
  /**
   * Fill the parent flex height and scroll the table body (list pages).
   * Leave off for nested tables, modals, and settings sections.
   */
  fillContainer?: boolean;
  renderExtraActions?: (row: T) => ReactNode;
  /** Server-side search: applied query shown in empty states. */
  searchValue?: string;
  searchDraft?: string;
  onSearchDraftChange?: (value: string) => void;
  onSearchConfirm?: (draftOverride?: string) => void;
  searchHelperText?: string;
  onSearchReset?: () => void;
  /** Highlights the row whose key matches this value (e.g. after returning from a detail page). */
  selectedRowId?: string | number | null;
  /** Appends list state (page, filters) to action links for back navigation. */
  getActionHref?: (row: T, path: string) => string;
};

function resolveRowKey<T extends object>(
  row: T,
  rowKey: keyof T | ((row: T) => string | number),
) {
  return typeof rowKey === "function" ? rowKey(row) : String(row[rowKey]);
}

function renderCellValue<T extends object>(
  row: T,
  column: TTableColumn<T>,
) {
  if (column.render) {
    return column.render(row);
  }

  const value = getByPath(row, String(column.id));
  if (value == null || value === "") {
    return <Typography color="text.disabled">—</Typography>;
  }

  return (
    <Typography
      component="span"
      noWrap
      title={String(value)}
      sx={{ display: "block", overflow: "hidden", textOverflow: "ellipsis" }}
    >
      {String(value)}
    </Typography>
  );
}

function getColumnLayoutSx<T extends object>(column: TTableColumn<T>) {
  return {
    ...(column.width != null && { width: column.width }),
    ...(column.minWidth != null && { minWidth: column.minWidth }),
    overflow: "hidden",
  };
}

function renderViewAction<T extends object>(
  view: NonNullable<TTableRowAction<T>["view"]>,
  row: T,
  getActionHref?: (row: T, path: string) => string,
) {
  const ActionIcon = view.icon ?? VisibilityIcon;
  const buttonSx = {
    bgcolor: (theme: { palette: { primary: { main: string } } }) =>
      alpha(theme.palette.primary.main, 0.08),
    color: "primary.main",
    "&:hover": {
      bgcolor: (theme: { palette: { primary: { main: string } } }) =>
        alpha(theme.palette.primary.main, 0.16),
    },
  };

  if (view.onClick) {
    return (
      <Tooltip title={view.label ?? "Visualizza"}>
        <IconButton
          size="small"
          onClick={() => view.onClick?.(row)}
          sx={buttonSx}
        >
          <ActionIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }

  if (!view.getPath) {
    return null;
  }

  const path = getActionHref
    ? getActionHref(row, view.getPath(row))
    : view.getPath(row);

  return (
    <Tooltip title={view.label ?? "Visualizza"}>
      <IconButton
        component={Link}
        to={path}
        size="small"
        sx={buttonSx}
      >
        <ActionIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

function renderEditAction<T extends object>(
  edit: NonNullable<TTableRowAction<T>["edit"]>,
  row: T,
  getActionHref?: (row: T, path: string) => string,
) {
  const ActionIcon = edit.icon ?? EditIcon;
  const buttonSx = {
    bgcolor: (theme: { palette: { primary: { main: string } } }) =>
      alpha(theme.palette.primary.main, 0.08),
    color: "primary.main",
    "&:hover": {
      bgcolor: (theme: { palette: { primary: { main: string } } }) =>
        alpha(theme.palette.primary.main, 0.16),
    },
  };

  if (edit.onClick) {
    return (
      <Tooltip title={edit.label ?? "Modifica"}>
        <IconButton
          size="small"
          onClick={() => edit.onClick?.(row)}
          sx={buttonSx}
        >
          <ActionIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }

  if (!edit.getPath) {
    return null;
  }

  const path = getActionHref
    ? getActionHref(row, edit.getPath(row))
    : edit.getPath(row);

  return (
    <Tooltip title={edit.label ?? "Modifica"}>
      <IconButton
        component={Link}
        to={path}
        size="small"
        sx={buttonSx}
      >
        <ActionIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

function DataTableSearchField({
  value,
  placeholder,
  helperText,
  compact,
  onChange,
  onConfirm,
}: {
  value: string;
  placeholder: string;
  helperText?: string;
  compact?: boolean;
  onChange: (value: string) => void;
  onConfirm: () => void;
}) {
  const fieldSx = compact
    ? {
        flex: 1,
        minWidth: 200,
        maxWidth: 320,
        m: 0,
        "& .MuiOutlinedInput-root": {
          bgcolor: "background.paper",
          borderRadius: 1,
          fontSize: 14,
        },
      }
    : {
        width: 300,
        maxWidth: "100%",
        m: 0,
        "& .MuiOutlinedInput-root": {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          fontSize: 13,
          height: 36,
          bgcolor: (theme: { palette: { primary: { main: string } } }) =>
            alpha(theme.palette.primary.main, 0.06),
          transition: "background-color 0.2s ease",
          "&:hover": {
            bgcolor: (theme: { palette: { primary: { main: string } } }) =>
              alpha(theme.palette.primary.main, 0.09),
          },
          "&.Mui-focused": {
            bgcolor: (theme: { palette: { primary: { main: string } } }) =>
              alpha(theme.palette.primary.main, 0.1),
          },
          "& fieldset": {
            borderColor: "divider",
            borderBottom: "none",
          },
          "&:hover fieldset": {
            borderColor: (theme: { palette: { primary: { main: string } } }) =>
              alpha(theme.palette.primary.main, 0.35),
            borderBottom: "none",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
            borderWidth: 1,
            borderBottom: "none",
          },
        },
      };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
      <TextField
        size="small"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onConfirm();
          }
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "text.disabled" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Cerca">
                  <IconButton
                    size="small"
                    edge="end"
                    onClick={onConfirm}
                    aria-label="Cerca"
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          },
        }}
        sx={fieldSx}
      />
      {helperText ? (
        <FormHelperText sx={{ mx: compact ? 0 : 1.5, mt: 0.5 }}>
          {helperText}
        </FormHelperText>
      ) : null}
    </Box>
  );
}

export function DataTable<T extends object>({
  columns,
  rows,
  rowKey,
  loading,
  error,
  emptyMessage = "Nessun record trovato.",
  totalRows,
  page = 0,
  pageSize = 20,
  onPageChange,
  onPageSizeChange,
  actions,
  searchable = true,
  searchResetKey,
  searchPlaceholder = "Cerca nella tabella…",
  tableMinWidth,
  compact = false,
  variant = "default",
  fillContainer = false,
  renderExtraActions,
  searchValue,
  searchDraft,
  onSearchDraftChange,
  onSearchConfirm,
  searchHelperText,
  onSearchReset,
  selectedRowId,
  getActionHref,
}: DataTableProps<T>) {
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const searchResetKeyRef = useRef(searchResetKey);
  const isEmbedded = variant === "embedded";
  const isServerSearch = Boolean(onSearchConfirm);
  const shouldFill = fillContainer && !isEmbedded;
  const showSearch = searchable && (!isEmbedded || isServerSearch);
  const hasActions = Boolean(
    actions?.edit || actions?.delete || actions?.view || renderExtraActions,
  );
  const columnCount = columns.length + (hasActions ? 1 : 0);
  const hasAppliedSearch = Boolean(searchValue?.trim());
  const hasStandardActions = Boolean(
    actions?.edit || actions?.delete || actions?.view,
  );
  const actionsColumnMinWidth = renderExtraActions
    ? hasStandardActions
      ? 248
      : 168
    : hasStandardActions
      ? 104
      : 80;
  const actionsColumnSx = {
    minWidth: actionsColumnMinWidth,
    width: actionsColumnMinWidth,
    px: 0.75,
    whiteSpace: "nowrap",
  };

  const displayRows = useMemo(() => rows, [rows]);

  useEffect(() => {
    if (searchResetKeyRef.current === searchResetKey) {
      return;
    }

    searchResetKeyRef.current = searchResetKey;
    onSearchReset?.();
    onPageChange?.(0);
  }, [onPageChange, onSearchReset, searchResetKey]);

  if (error) {
    return (
      <Alert severity="error" sx={{ borderRadius: 1 }}>
        {error.message}
      </Alert>
    );
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget || !actions?.delete) {
      return;
    }

    try {
      setIsDeleting(true);
      await actions.delete.onConfirm(deleteTarget);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const resolvedEmptyMessage =
    hasAppliedSearch && displayRows.length === 0
      ? "Nessun risultato per la ricerca."
      : emptyMessage;

  const handleSearchDraftChange = (value: string) => {
    onSearchDraftChange?.(value);

    if (!value.trim() && searchValue?.trim()) {
      onSearchConfirm?.("");
    }
  };

  const searchField =
    showSearch && onSearchConfirm && onSearchDraftChange ? (
      <DataTableSearchField
        value={searchDraft ?? ""}
        placeholder={searchPlaceholder}
        helperText={searchHelperText}
        compact={isEmbedded}
        onChange={handleSearchDraftChange}
        onConfirm={onSearchConfirm}
      />
    ) : null;

  const tableElement = (
    <Table
      stickyHeader={shouldFill}
      size={compact ? "small" : "medium"}
      sx={{
        width: "100%",
        tableLayout: "fixed",
        ...(tableMinWidth != null && { minWidth: tableMinWidth }),
      }}
    >
      <TableHead>
        <TableRow
          sx={{
            "& th": {
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: "text.secondary",
              bgcolor: (theme) =>
                shouldFill
                  ? theme.palette.background.paper
                  : alpha(theme.palette.primary.main, 0.06),
              backgroundImage: shouldFill
                ? (theme) =>
                    `linear-gradient(0deg, ${alpha(theme.palette.primary.main, 0.06)}, ${alpha(theme.palette.primary.main, 0.06)})`
                : undefined,
              borderBottom: 1,
              borderColor: "divider",
              py: compact ? 1.25 : 1.75,
            },
          }}
        >
          {columns.map((column) => (
            <TableCell
              key={String(column.id)}
              align={column.align ?? "left"}
              sx={getColumnLayoutSx(column)}
            >
              {column.label}
            </TableCell>
          ))}
          {hasActions && (
            <TableCell align="right" sx={actionsColumnSx}>
              Azioni
            </TableCell>
          )}
        </TableRow>
      </TableHead>

      <TableBody>
        {loading &&
          Array.from({ length: isEmbedded ? 3 : 5 }).map((_, index) => (
            <TableRow key={`skeleton-${index}`}>
              {Array.from({ length: columnCount }).map((__, cellIndex) => (
                <TableCell key={`skeleton-cell-${cellIndex}`}>
                  <Skeleton variant="rounded" height={20} />
                </TableCell>
              ))}
            </TableRow>
          ))}

        {!loading && displayRows.length === 0 && (
          <TableRow>
            <TableCell colSpan={columnCount} sx={{ py: isEmbedded ? 4 : 6 }}>
              <Typography align="center" color="text.secondary">
                {resolvedEmptyMessage}
              </Typography>
            </TableCell>
          </TableRow>
        )}

        {!loading &&
          displayRows.map((row) => {
            const key = resolveRowKey(row, rowKey);
            const isSelected =
              selectedRowId != null && String(key) === String(selectedRowId);

            return (
              <TableRow
                key={key}
                hover
                selected={isSelected}
                sx={{
                  transition: "background-color 0.2s ease",
                  "&:last-child td": { borderBottom: 0 },
                  ...(isSelected && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    "&:hover": {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
                    },
                  }),
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${key}-${String(column.id)}`}
                    align={column.align ?? "left"}
                    sx={getColumnLayoutSx(column)}
                  >
                    {renderCellValue(row, column)}
                  </TableCell>
                ))}

                {hasActions && (
                  <TableCell align="right" sx={actionsColumnSx}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      justifyContent="flex-end"
                    >
                      {actions?.view &&
                        !actions.view.hidden?.(row) &&
                        renderViewAction(actions.view, row, getActionHref)}
                      {renderExtraActions?.(row)}
                      {actions?.edit &&
                        !actions.edit.hidden?.(row) &&
                        renderEditAction(actions.edit, row, getActionHref)}
                      {actions?.delete && !actions.delete.hidden?.(row) && (
                        <Tooltip title={actions.delete.label ?? "Elimina"}>
                          <IconButton
                            size="small"
                            onClick={() => setDeleteTarget(row)}
                            sx={{
                              bgcolor: (theme) =>
                                alpha(theme.palette.error.main, 0.08),
                              color: "error.main",
                              "&:hover": {
                                bgcolor: (theme) =>
                                  alpha(theme.palette.error.main, 0.16),
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );

  const paginationElement =
    totalRows != null && onPageChange && onPageSizeChange ? (
      <Box sx={{ borderTop: 1, borderColor: "divider" }}>
        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          rowsPerPage={pageSize}
          onPageChange={(_, nextPage) => onPageChange(nextPage)}
          onRowsPerPageChange={(event) =>
            onPageSizeChange(Number(event.target.value))
          }
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>
    ) : null;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          ...(shouldFill && {
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }),
        }}
      >
        {showSearch && searchField && (
          <Box
            sx={{
              display: "flex",
              justifyContent: isEmbedded ? "stretch" : "flex-end",
              position: "relative",
              zIndex: 1,
              lineHeight: 0,
              flexShrink: 0,
              ...(isEmbedded && { mb: 1.5 }),
            }}
          >
            {searchField}
          </Box>
        )}

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: isEmbedded ? 1 : 1.5,
            ...(showSearch && !isEmbedded && { borderTopRightRadius: 0 }),
            border: 1,
            borderColor: "divider",
            mt: showSearch && !isEmbedded ? "-1px" : 0,
            bgcolor: "background.paper",
            backgroundImage: isEmbedded
              ? "none"
              : (theme) =>
                  `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 120px)`,
            ...(shouldFill
              ? {
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }
              : { overflow: "hidden" }),
          }}
        >
          <Box
            sx={
              shouldFill
                ? { flex: 1, minHeight: 0, overflow: "auto" }
                : undefined
            }
          >
            {tableElement}
          </Box>
          {paginationElement ? (
            <Box sx={{ flexShrink: 0 }}>{paginationElement}</Box>
          ) : null}
        </TableContainer>
      </Box>

      {actions?.delete && (
        <ConfirmDialog
          open={Boolean(deleteTarget)}
          title={actions.delete.confirmTitle ?? "Elimina record"}
          message={
            deleteTarget
              ? (actions.delete.confirmMessage?.(deleteTarget) ??
                "Questa azione non può essere annullata.")
              : ""
          }
          confirmLabel="Elimina"
          isPending={isDeleting}
          onConfirm={() => void handleDeleteConfirm()}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
