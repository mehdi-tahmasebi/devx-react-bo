import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { CloseIcon, FilterListOutlinedIcon } from "@/shared/icons";

export type TableFiltersPanelProps<T> = {
  value: T;
  defaultValue: T;
  onApply: (value: T) => void;
  countActiveFilters?: (value: T, defaultValue: T) => number;
  variant?: "standalone" | "attached";
  children: (context: {
    draft: T;
    setDraft: Dispatch<SetStateAction<T>>;
  }) => ReactNode;
};

export function TableFiltersPanel<T>({
  value,
  defaultValue,
  onApply,
  countActiveFilters = (current, defaults) =>
    JSON.stringify(current) === JSON.stringify(defaults) ? 0 : 1,
  variant = "standalone",
  children,
}: TableFiltersPanelProps<T>) {
  const activeCount = countActiveFilters(value, defaultValue);
  const attached = variant === "attached";

  const setDraft: Dispatch<SetStateAction<T>> = (updater) => {
    const next =
      typeof updater === "function"
        ? (updater as (current: T) => T)(value)
        : updater;
    onApply(next);
  };

  const handleReset = () => {
    onApply(defaultValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "stretch", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1.25, sm: 2 },
        px: 2,
        py: 1.25,
        minHeight: 48,
        border: 1,
        borderColor: (theme) =>
          activeCount > 0
            ? alpha(theme.palette.primary.main, 0.28)
            : "divider",
        borderRadius: attached ? "12px 12px 0 0" : 1.5,
        borderBottom: attached ? "none" : undefined,
        mb: attached ? 0 : 1.5,
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
        transition: "border-color 0.2s ease",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.75}
        sx={{ flexShrink: 0 }}
      >
        <FilterListOutlinedIcon
          sx={{ fontSize: 20, color: "text.secondary" }}
        />
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: "text.primary", letterSpacing: "-0.01em" }}
        >
          Filtri
        </Typography>
        {activeCount > 0 ? (
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: "primary.main",
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
              px: 0.75,
              py: 0.125,
              borderRadius: 999,
              lineHeight: 1.6,
            }}
          >
            {activeCount}
          </Typography>
        ) : null}
      </Stack>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          display: { xs: "none", sm: "block" },
          alignSelf: "center",
          height: 24,
          borderColor: "divider",
        }}
      />

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        useFlexGap
        spacing={2}
        sx={{ flex: 1, minWidth: 0 }}
      >
        {children({ draft: value, setDraft })}
      </Stack>

      {activeCount > 0 ? (
        <Tooltip title="Reimposta filtri">
          <IconButton
            size="small"
            aria-label="Reimposta filtri"
            onClick={handleReset}
            sx={{
              alignSelf: { xs: "flex-end", sm: "center" },
              width: 34,
              height: 34,
              flexShrink: 0,
              color: "text.secondary",
              "&:hover": {
                color: "error.main",
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  );
}
