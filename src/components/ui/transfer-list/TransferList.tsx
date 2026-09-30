import { Box, CircularProgress, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useCallback, useMemo, useState, type DragEvent } from "react";

export type TransferListItem = {
  id: number | string;
  label: string;
  secondaryLabel?: string;
};

type DragSource = "available" | "selected";

type DragPayload = {
  id: number | string;
  source: DragSource;
};

type TransferListProps = {
  items: TransferListItem[];
  selectedIds: Array<number | string>;
  onChange: (selectedIds: Array<number | string>) => void;
  availableTitle?: string;
  selectedTitle?: string;
  loading?: boolean;
  height?: number;
  emptyAvailableMessage?: string;
  emptySelectedMessage?: string;
};

const DRAG_MIME = "application/x-transfer-list-item";

function sameId(a: number | string, b: number | string) {
  return String(a) === String(b);
}

function parseDragPayload(event: DragEvent): DragPayload | null {
  const raw = event.dataTransfer.getData(DRAG_MIME);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as DragPayload;
  } catch {
    return null;
  }
}

function TransferListColumn({
  title,
  children,
  onDragOver,
  onDrop,
  isDropTarget,
}: {
  title: string;
  children: React.ReactNode;
  onDragOver: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
  isDropTarget: boolean;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        border: 1,
        borderColor: isDropTarget ? "primary.main" : "divider",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
        transition: "border-color 0.15s ease",
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Box
        sx={{
          px: 2,
          py: 1.25,
          bgcolor: (theme) => alpha(theme.palette.text.primary, 0.04),
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, fontSize: 13, color: "text.secondary" }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

function TransferListRow({
  item,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDoubleClick,
}: {
  item: TransferListItem;
  isDragOver: boolean;
  onDragStart: (event: DragEvent) => void;
  onDragOver: (event: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (event: DragEvent) => void;
  onDoubleClick: () => void;
}) {
  return (
    <Box
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDoubleClick={onDoubleClick}
      sx={{
        px: 2,
        py: 1.25,
        cursor: "grab",
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: isDragOver
          ? (theme) => alpha(theme.palette.primary.main, 0.08)
          : "background.paper",
        "&:hover": {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
        },
        "&:active": {
          cursor: "grabbing",
        },
        "&:last-of-type": {
          borderBottom: 0,
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          fontSize: 13,
          lineHeight: 1.4,
        }}
      >
        {item.label}
        {item.secondaryLabel ? (
          <Typography
            component="span"
            variant="body2"
            sx={{ ml: 0.75, color: "success.main", fontSize: 13 }}
          >
            {item.secondaryLabel}
          </Typography>
        ) : null}
      </Typography>
    </Box>
  );
}

export function TransferList({
  items,
  selectedIds,
  onChange,
  availableTitle = "Disponibili",
  selectedTitle = "Assegnati",
  loading = false,
  height = 320,
  emptyAvailableMessage = "Nessun elemento disponibile.",
  emptySelectedMessage = "Trascina qui gli elementi da assegnare.",
}: TransferListProps) {
  const [dragOverTarget, setDragOverTarget] = useState<DragSource | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const itemsById = useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items],
  );

  const availableItems = useMemo(
    () =>
      items.filter(
        (item) => !selectedIds.some((selectedId) => sameId(selectedId, item.id)),
      ),
    [items, selectedIds],
  );

  const selectedItems = useMemo(
    () =>
      selectedIds
        .map(
          (id) =>
            itemsById.get(id) ??
            items.find((item) => sameId(item.id, id)),
        )
        .filter((item): item is TransferListItem => Boolean(item)),
    [items, itemsById, selectedIds],
  );

  const resetDragState = useCallback(() => {
    setDragOverTarget(null);
    setDragOverIndex(null);
  }, []);

  const handleDragStart = useCallback(
    (event: DragEvent, id: number | string, source: DragSource) => {
      const payload: DragPayload = { id, source };
      event.dataTransfer.setData(DRAG_MIME, JSON.stringify(payload));
      event.dataTransfer.effectAllowed = "move";
    },
    [],
  );

  const allowDrop = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const insertSelectedId = useCallback(
    (id: number | string, index: number) => {
      const next = selectedIds.filter(
        (selectedId) => !sameId(selectedId, id),
      );
      const clampedIndex = Math.max(0, Math.min(index, next.length));
      next.splice(clampedIndex, 0, id);
      onChange(next);
    },
    [onChange, selectedIds],
  );

  const assignItem = useCallback(
    (id: number | string, index?: number) => {
      if (selectedIds.some((selectedId) => sameId(selectedId, id))) {
        return;
      }

      if (index === undefined) {
        onChange([...selectedIds, id]);
        return;
      }

      insertSelectedId(id, index);
    },
    [insertSelectedId, onChange, selectedIds],
  );

  const unassignItem = useCallback(
    (id: number | string) => {
      onChange(
        selectedIds.filter((selectedId) => !sameId(selectedId, id)),
      );
    },
    [onChange, selectedIds],
  );

  const reorderSelected = useCallback(
    (id: number | string, index: number) => {
      const currentIndex = selectedIds.findIndex((selectedId) =>
        sameId(selectedId, id),
      );
      if (currentIndex === -1) {
        return;
      }

      const next = [...selectedIds];
      next.splice(currentIndex, 1);
      const clampedIndex = Math.max(0, Math.min(index, next.length));
      next.splice(clampedIndex, 0, id);
      onChange(next);
    },
    [onChange, selectedIds],
  );

  const handleDropOnSelected = useCallback(
    (event: DragEvent, index?: number) => {
      event.preventDefault();
      event.stopPropagation();

      const payload = parseDragPayload(event);
      if (!payload) {
        resetDragState();
        return;
      }

      if (payload.source === "available") {
        assignItem(payload.id, index ?? selectedIds.length);
      } else {
        reorderSelected(payload.id, index ?? selectedIds.length);
      }

      resetDragState();
    },
    [assignItem, reorderSelected, resetDragState, selectedIds.length],
  );

  const handleDropOnAvailable = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const payload = parseDragPayload(event);
      if (payload?.source === "selected") {
        unassignItem(payload.id);
      }

      resetDragState();
    },
    [resetDragState, unassignItem],
  );

  const listBodySx = {
    flex: 1,
    minHeight: 0,
    overflowY: "auto" as const,
  };

  if (loading) {
    return (
      <Box
        sx={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 2, height }}>
      <TransferListColumn
        title={availableTitle}
        isDropTarget={dragOverTarget === "available"}
        onDragOver={(event) => {
          allowDrop(event);
          setDragOverTarget("available");
          setDragOverIndex(null);
        }}
        onDrop={handleDropOnAvailable}
      >
        <Box sx={listBodySx}>
          {availableItems.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ px: 2, py: 2, fontSize: 13 }}
            >
              {emptyAvailableMessage}
            </Typography>
          ) : (
            availableItems.map((item) => (
              <TransferListRow
                key={item.id}
                item={item}
                isDragOver={false}
                onDragStart={(event) => handleDragStart(event, item.id, "available")}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={() => undefined}
                onDrop={(event) => event.preventDefault()}
                onDoubleClick={() => assignItem(item.id)}
              />
            ))
          )}
        </Box>
      </TransferListColumn>

      <TransferListColumn
        title={selectedTitle}
        isDropTarget={dragOverTarget === "selected"}
        onDragOver={(event) => {
          allowDrop(event);
          setDragOverTarget("selected");
        }}
        onDrop={(event) => handleDropOnSelected(event)}
      >
        <Box sx={listBodySx}>
          {selectedItems.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ px: 2, py: 2, fontSize: 13 }}
            >
              {emptySelectedMessage}
            </Typography>
          ) : (
            selectedItems.map((item, index) => (
              <TransferListRow
                key={item.id}
                item={item}
                isDragOver={dragOverIndex === index}
                onDragStart={(event) => handleDragStart(event, item.id, "selected")}
                onDragOver={(event) => {
                  allowDrop(event);
                  setDragOverTarget("selected");
                  setDragOverIndex(index);
                }}
                onDragLeave={() => {
                  if (dragOverIndex === index) {
                    setDragOverIndex(null);
                  }
                }}
                onDrop={(event) => handleDropOnSelected(event, index)}
                onDoubleClick={() => unassignItem(item.id)}
              />
            ))
          )}
        </Box>
      </TransferListColumn>
    </Box>
  );
}
