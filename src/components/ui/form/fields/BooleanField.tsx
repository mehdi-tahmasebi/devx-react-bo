import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import type { TBooleanFormField } from "@/shared/types";

type BooleanFieldProps = {
  field: TBooleanFormField;
  value: boolean;
  error?: string;
  onChange: (value: boolean) => void;
};

export function BooleanField({
  field,
  value,
  error,
  onChange,
}: BooleanFieldProps) {
  const variant = field.variant ?? "switch";
  const control =
    variant === "checkbox" ? (
      <Checkbox
        checked={value}
        disabled={field.disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
    ) : (
      <Switch
        checked={value}
        disabled={field.disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
    );

  return (
    <FormControl
      fullWidth
      required={field.required}
      error={Boolean(error)}
      margin="dense"
    >
      <FormControlLabel
        control={control}
        label={field.label}
        sx={{
          ml: 0,
          mr: 0,
          "& .MuiFormControlLabel-label": {
            fontSize: 14,
            fontWeight: 500,
          },
        }}
      />
      {(error ?? field.helperText) && (
        <FormHelperText>{error ?? field.helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
