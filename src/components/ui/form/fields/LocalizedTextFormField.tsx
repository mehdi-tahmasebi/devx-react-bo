import { FormHelperText } from "@mui/material";
import type { TLocalizedTextFormField } from "@/shared/types";
import { LocalizedTextFields } from "../LocalizedTextFields";

type LocalizedTextFormFieldProps = {
  field: TLocalizedTextFormField;
  value: Record<string, string>;
  error?: string;
  onChange: (next: Record<string, string>) => void;
};

export function LocalizedTextFormField({
  field,
  value,
  error,
  onChange,
}: LocalizedTextFormFieldProps) {
  return (
    <>
      <LocalizedTextFields
        value={value}
        onChange={onChange}
        label={field.label}
        disabled={field.disabled}
        required={field.required}
        inputVariant={field.inputVariant}
        minRows={field.minRows}
        maxRows={field.maxRows}
        placeholder={field.placeholder}
        maxLength={field.maxLength}
      />
      {error || field.helperText ? (
        <FormHelperText error={Boolean(error)} sx={{ mt: 0.5 }}>
          {error ?? field.helperText}
        </FormHelperText>
      ) : null}
    </>
  );
}
