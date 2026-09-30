import { Box, CircularProgress, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useCallback, useMemo, useState, type DragEvent } from "react";

export type SortableListItem = {
  id: number | string;
  label: string;
};

type SortableListProps = {
  items: SortableListItem[];
  orderedIds: Array<number | string>;
  onChange: (orderedIds: Array<number | string>) => void;
  loading?: boolean;
  height?: number;
  emptyMessage?: string;
};

type DragPayload = {
  id: number | string;
};

const DRAG_MIME = "application/x-sortable-list-item";

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

function SortableListRow({
  item,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
}: {
  item: SortableListItem;
  isDragOver: boolean;
  onDragStart: (event: DragEvent) => void;
  onDragOver: (event: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (event: DragEvent) => void;
}) {
  return (
    <Box
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
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
      </Typography>
    </Box>
  );
}

export function SortableList({
  items,
  orderedIds,
  onChange,
  loading = false,
  height = 360,
  emptyMessage = "Nessun elemento presente.",
}: SortableListProps) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const itemsById = useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items],
  );

  const orderedItems = useMemo(
    () =>
      orderedIds
        .map(
          (id) =>
            itemsById.get(id) ??
            items.find((item) => sameId(item.id, id)),
        )
        .filter((item): item is SortableListItem => Boolean(item)),
    [items, itemsById, orderedIds],
  );

  const resetDragState = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDragStart = useCallback((event: DragEvent, id: number | string) => {
    const payload: DragPayload = { id };
    event.dataTransfer.setData(DRAG_MIME, JSON.stringify(payload));
    event.dataTransfer.effectAllowed = "move";
  }, []);

  const allowDrop = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const reorder = useCallback(
    (id: number | string, index: number) => {
      const currentIndex = orderedIds.findIndex((orderedId) =>
        sameId(orderedId, id),
      );
      if (currentIndex === -1) {
        return;
      }

      const next = [...orderedIds];
      next.splice(currentIndex, 1);
      const clampedIndex = Math.max(0, Math.min(index, next.length));
      next.splice(clampedIndex, 0, id);
      onChange(next);
    },
    [onChange, orderedIds],
  );

  const handleDrop = useCallback(
    (event: DragEvent, index?: number) => {
      event.preventDefault();
      event.stopPropagation();

      const payload = parseDragPayload(event);
      if (!payload) {
        resetDragState();
        return;
      }

      reorder(payload.id, index ?? orderedIds.length);
      resetDragState();
    },
    [orderedIds.length, reorder, resetDragState],
  );

  if (loading) {
    return (
      <Box
        sx={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
        }}
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height,
        display: "flex",
        flexDirection: "column",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
      onDragOver={allowDrop}
      onDrop={(event) => handleDrop(event)}
    >
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        {orderedItems.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ px: 2, py: 2, fontSize: 13 }}
          >
            {emptyMessage}
          </Typography>
        ) : (
          orderedItems.map((item, index) => (
            <SortableListRow
              key={item.id}
              item={item}
              isDragOver={dragOverIndex === index}
              onDragStart={(event) => handleDragStart(event, item.id)}
              onDragOver={(event) => {
                allowDrop(event);
                setDragOverIndex(index);
              }}
              onDragLeave={() => {
                if (dragOverIndex === index) {
                  setDragOverIndex(null);
                }
              }}
              onDrop={(event) => handleDrop(event, index)}
            />
          ))
        )}
      </Box>
    </Box>
  );
}
