import { TextField as MuiTextField } from "@mui/material";
import type { TTextFormField } from "@/shared/types";
import { formFieldSize, formTextFieldSlotProps } from "./fieldStyles";

type TextFieldProps = {
  field: TTextFormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function TextField({ field, value, error, onChange }: TextFieldProps) {
  return (
    <MuiTextField
      type={field.inputType ?? "text"}
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
      slotProps={{
        ...formTextFieldSlotProps,
        htmlInput: {
          maxLength: field.maxLength,
        },
        inputLabel:
          field.inputType === "date" ? { shrink: true } : undefined,
      }}
    />
  );
}
