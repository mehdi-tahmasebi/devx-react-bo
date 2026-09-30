import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { colors } from "@/core/theme";
import type { TSelectOption } from "@/shared/types";
import { useIsBuildingScopedFormRoute } from "../building-form-route";
import { useBuildingsSelect } from "../building.hooks";
import {
  invalidateBuildingScopedQueries,
  useBuildingStore,
} from "../building.store";

type BuildingSelectorProps = {
  fullWidth?: boolean;
};

export function BuildingSelector({ fullWidth = false }: BuildingSelectorProps) {
  const queryClient = useQueryClient();
  const isRouteLocked = useIsBuildingScopedFormRoute();
  const buildingId = useBuildingStore((state) => state.buildingId);
  const buildingLabel = useBuildingStore((state) => state.buildingLabel);
  const hasHydrated = useBuildingStore((state) => state.hasHydrated);
  const selectorLocked = useBuildingStore((state) => state.selectorLocked);
  const setBuilding = useBuildingStore((state) => state.setBuilding);
  const clearBuilding = useBuildingStore((state) => state.clearBuilding);

  const { data: options = [], isLoading } = useBuildingsSelect({
    enabled: hasHydrated,
  });

  const isSingleBuilding = options.length === 1;
  const isDisabled = isRouteLocked || selectorLocked || isSingleBuilding;

  const selectedOption = useMemo((): TSelectOption | null => {
    if (buildingId == null) {
      return null;
    }

    const fromOptions = options.find((option) => option.value === buildingId);
    if (fromOptions) {
      return fromOptions;
    }

    if (buildingLabel) {
      return { value: buildingId, label: buildingLabel };
    }

    return null;
  }, [buildingId, buildingLabel, options]);

  const handleChange = (_: unknown, option: TSelectOption | null) => {
    if (!option) {
      clearBuilding();
      invalidateBuildingScopedQueries(queryClient);
      return;
    }

    const nextId = Number(option.value);
    if (nextId === buildingId) {
      return;
    }

    setBuilding(nextId, option.label);
    invalidateBuildingScopedQueries(queryClient);
  };

  const tooltipTitle = isSingleBuilding
    ? "Un solo building disponibile"
    : selectorLocked || isRouteLocked
      ? "Chiudi il modulo per cambiare building"
      : null;

  const selector = (
    <Autocomplete
      size="small"
      fullWidth={fullWidth}
      options={options}
      value={selectedOption}
      loading={isLoading}
      disabled={isDisabled}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, selected) => option.value === selected.value}
      disableClearable={options.length === 1}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Seleziona building"
          slotProps={{
            input: {
              ...params.InputProps,
              sx: {
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                bgcolor: colors.surface.glassContent,
              },
            },
          }}
        />
      )}
      sx={{
        width: fullWidth ? "100%" : { xs: "100%", sm: 420, md: 480 },
        minWidth: fullWidth ? 0 : { sm: 360 },
        maxWidth: fullWidth ? "100%" : { sm: 480, md: 520 },
        flexShrink: 0,
        "& .MuiOutlinedInput-root": {
          pr: "8px !important",
        },
        "& .MuiAutocomplete-input": {
          minWidth: "8ch",
        },
      }}
    />
  );

  if (!tooltipTitle) {
    return selector;
  }

  return (
    <Tooltip title={tooltipTitle}>
      <span
        style={{
          display: "block",
          width: fullWidth ? "100%" : undefined,
        }}
      >
        {selector}
      </span>
    </Tooltip>
  );
}
