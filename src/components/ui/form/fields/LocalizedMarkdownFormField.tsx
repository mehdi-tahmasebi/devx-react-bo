import { FormHelperText } from "@mui/material";
import type { TLocalizedMarkdownFormField } from "@/shared/types";
import { LocalizedMarkdownFields } from "../LocalizedMarkdownFields";

type LocalizedMarkdownFormFieldProps = {
  field: TLocalizedMarkdownFormField;
  value: Record<string, string>;
  error?: string;
  onChange: (next: Record<string, string>) => void;
};

export function LocalizedMarkdownFormField({
  field,
  value,
  error,
  onChange,
}: LocalizedMarkdownFormFieldProps) {
  return (
    <>
      <LocalizedMarkdownFields
        value={value}
        onChange={onChange}
        name={field.name}
        label={field.label}
        disabled={field.disabled}
        minRows={field.minRows}
        maxRows={field.maxRows}
      />
      {error || field.helperText ? (
        <FormHelperText error={Boolean(error)} sx={{ mt: 0.5 }}>
          {error ?? field.helperText}
        </FormHelperText>
      ) : null}
    </>
  );
}
