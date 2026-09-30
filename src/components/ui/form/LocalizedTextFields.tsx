import { Box, Skeleton, Stack, TextField } from "@mui/material";
import {
  applyLocalizedFieldChange,
  resolveLocalizedInputLabel,
  useLocalizedInputLanguages,
} from "@/core/localization";
import { formFieldSize, formTextFieldSlotProps } from "./fields/fieldStyles";
import { getGridWrapperSx, type TFieldGrid } from "./fieldLayout";

type LocalizedTextFieldsProps = {
  value: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
  /** Field name used in input labels (e.g. "Nome", or "Nome (Italiano)" in multi-locale mode). */
  label?: string;
  disabled?: boolean;
  required?: boolean;
  inputVariant?: "text" | "textarea";
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  maxLength?: number;
  size?: "small" | "medium";
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

export function LocalizedTextFields({
  value,
  onChange,
  label,
  disabled = false,
  required = false,
  inputVariant = "text",
  minRows = 3,
  maxRows,
  placeholder,
  maxLength,
  size = formFieldSize,
}: LocalizedTextFieldsProps) {
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
          <Skeleton variant="rounded" height={56} />
        </Box>
        <Box sx={getGridWrapperSx({ xs: 12, md: 6 })}>
          <Skeleton variant="rounded" height={56} />
        </Box>
      </Stack>
    );
  }

  if (isError || visibleOptions.length === 0) {
    return null;
  }

  const grid = gridForLanguageCount(visibleOptions.length);
  const isTextarea = inputVariant === "textarea";
  const useFieldNameAsLabel = visibleOptions.length <= 1;

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      useFlexGap
      spacing={2}
      sx={{ width: "100%" }}
    >
      {visibleOptions.map((option) => (
        <Box key={option.value} sx={getGridWrapperSx(grid)}>
          <TextField
            label={resolveLocalizedInputLabel(
              label,
              option.label,
              visibleOptions.length,
            )}
            value={value[option.value] ?? ""}
            disabled={disabled}
            required={required}
            fullWidth
            size={size}
            margin="dense"
            multiline={isTextarea}
            minRows={isTextarea ? minRows : undefined}
            maxRows={isTextarea ? maxRows : undefined}
            placeholder={
              useFieldNameAsLabel ? placeholder : (placeholder ?? undefined)
            }
            slotProps={{
              ...formTextFieldSlotProps,
              htmlInput: maxLength ? { maxLength } : undefined,
            }}
            onChange={(event) =>
              onChange(
                applyLocalizedFieldChange(
                  value,
                  option.value,
                  event.target.value,
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
