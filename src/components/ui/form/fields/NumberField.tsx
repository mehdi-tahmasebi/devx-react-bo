import { TextField as MuiTextField } from "@mui/material";
import type { TNumberFormField } from "@/shared/types";
import { formFieldSize, formTextFieldSlotProps } from "./fieldStyles";

type NumberFieldProps = {
  field: TNumberFormField;
  value: number | "";
  error?: string;
  onChange: (value: number) => void;
};

export function NumberField({
  field,
  value,
  error,
  onChange,
}: NumberFieldProps) {
  return (
    <MuiTextField
      label={field.label}
      type="number"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      required={field.required}
      disabled={field.disabled}
      helperText={error ?? field.helperText}
      placeholder={field.placeholder}
      error={Boolean(error)}
      fullWidth
      size={formFieldSize}
      margin="dense"
      slotProps={{
        ...formTextFieldSlotProps,
        htmlInput: {
          min: field.min,
          max: field.max,
          step: field.step,
          maxLength: field.maxLength,
        },
      }}
    />
  );
}
