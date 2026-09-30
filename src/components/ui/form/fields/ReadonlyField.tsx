import { Box, TextField as MuiTextField } from "@mui/material";
import type { TFormFieldConfig } from "@/shared/types";
import { getGridWrapperSx, type TFieldGrid } from "../fieldLayout";
import { formTextFieldSlotProps } from "./fieldStyles";

type ReadonlyFieldProps = {
  label: string;
  value: string;
  grid?: TFieldGrid;
  layout?: TFormFieldConfig["layout"];
  multiline?: boolean;
  minRows?: number;
};

export function ReadonlyField({
  label,
  value,
  grid,
  layout,
  multiline = false,
  minRows,
}: ReadonlyFieldProps) {
  const compactWidth = layout?.maxWidth;

  return (
    <Box
      sx={
        compactWidth
          ? {
              alignSelf: "flex-start",
              width: compactWidth,
              maxWidth: compactWidth,
              minWidth: 0,
              flex: "0 0 auto",
            }
          : getGridWrapperSx(grid)
      }
    >
      <MuiTextField
        label={label}
        value={value}
        fullWidth
        size="small"
        margin="dense"
        multiline={multiline}
        minRows={minRows}
        slotProps={{
          ...formTextFieldSlotProps,
          input: {
            ...formTextFieldSlotProps.input,
            readOnly: true,
          },
        }}
      />
    </Box>
  );
}
