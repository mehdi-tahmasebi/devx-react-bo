import { TextField as MuiTextField } from "@mui/material";
import type { TDateTimeLocalFormField } from "@/shared/types";
import { formFieldSize, formTextFieldSlotProps } from "./fieldStyles";

type DateTimeLocalFieldProps = {
  field: TDateTimeLocalFormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function DateTimeLocalField({
  field,
  value,
  error,
  onChange,
}: DateTimeLocalFieldProps) {
  const hasFixedLayout = Boolean(field.layout);

  return (
    <MuiTextField
      fullWidth={!hasFixedLayout}
      type="datetime-local"
      size={formFieldSize}
      label={field.label}
      value={value}
      required={field.required}
      disabled={field.disabled}
      helperText={field.helperText ?? error}
      error={Boolean(error)}
      slotProps={{
        ...formTextFieldSlotProps,
        inputLabel: { shrink: true },
      }}
      sx={
        hasFixedLayout
          ? {
              width: "100%",
              maxWidth: "100%",
            }
          : undefined
      }
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
