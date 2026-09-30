import { Box, Skeleton, Stack } from "@mui/material";
import {
  applyLocalizedFieldChange,
  resolveLocalizedInputLabel,
  useLocalizedInputLanguages,
} from "@/core/localization";
import { getGridWrapperSx, type TFieldGrid } from "./fieldLayout";
import { MarkdownField } from "./fields/MarkdownField";

type LocalizedMarkdownFieldsProps = {
  value: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
  name: string;
  label: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
};

function gridForLanguageCount(count: number): TFieldGrid {
  if (count <= 1) {
    return { xs: 12, md: 12 };
  }
  if (count === 2) {
    return { xs: 12, md: 6 };
  }
  if (count === 3) {
    return { xs: 12, sm: 6, md: 4 };
  }
  return { xs: 12, sm: 6, md: 3 };
}

export function LocalizedMarkdownFields({
  value,
  onChange,
  name,
  label,
  disabled = false,
  minRows,
  maxRows,
}: LocalizedMarkdownFieldsProps) {
  const {
    visibleOptions,
    allLocaleKeys,
    isPending,
    isError,
  } = useLocalizedInputLanguages();

  if (isPending) {
    return (
      <Stack
        direction="row"
        flexWrap="wrap"
        useFlexGap
        spacing={2}
        sx={{ width: "100%" }}
      >
        <Box sx={getGridWrapperSx({ xs: 12, md: 6 })}>
          <Skeleton variant="rounded" height={120} />
        </Box>
        <Box sx={getGridWrapperSx({ xs: 12, md: 6 })}>
          <Skeleton variant="rounded" height={120} />
        </Box>
      </Stack>
    );
  }

  if (isError || visibleOptions.length === 0) {
    return null;
  }

  const grid = gridForLanguageCount(visibleOptions.length);

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      useFlexGap
      spacing={2}
      sx={{ width: "100%" }}
      aria-label={label}
    >
      {visibleOptions.map((option) => (
        <Box key={option.value} sx={getGridWrapperSx(grid)}>
          <MarkdownField
            field={{
              type: "markdown",
              name: `${name}.${option.value}`,
              label: resolveLocalizedInputLabel(
                label,
                option.label,
                visibleOptions.length,
              ),
              disabled,
              minRows,
              maxRows,
            }}
            value={value[option.value] ?? ""}
            onChange={(text) =>
              onChange(
                applyLocalizedFieldChange(
                  value,
                  option.value,
                  text,
                  allLocaleKeys,
                ),
              )
            }
          />
        </Box>
      ))}
    </Stack>
  );
}
