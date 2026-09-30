import { TextField as MuiTextField } from "@mui/material";
import type { TTextAreaFormField } from "@/shared/types";
import { formFieldSize, formTextFieldSlotProps } from "./fieldStyles";

type TextAreaFieldProps = {
  field: TTextAreaFormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function TextAreaField({
  field,
  value,
  error,
  onChange,
}: TextAreaFieldProps) {
  return (
    <MuiTextField
      label={field.label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required={field.required}
      disabled={field.disabled}
      helperText={error ?? field.helperText}
      placeholder={field.placeholder}
      error={Boolean(error)}
      fullWidth
      size={formFieldSize}
      margin="dense"
      multiline
      rows={field.rows}
      minRows={field.minRows ?? 3}
      maxRows={field.maxRows}
      slotProps={formTextFieldSlotProps}
    />
  );
}
