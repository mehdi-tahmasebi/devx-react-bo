import { Box, InputAdornment, TextField as MuiTextField } from "@mui/material";
import type { TColorFormField } from "@/shared/types";
import { FORM_FIELD_RADIUS } from "../form.tokens";
import { formFieldSize, formTextFieldSlotProps } from "./fieldStyles";

type ColorFieldProps = {
  field: TColorFormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;

function toPickerValue(value: string) {
  return HEX_COLOR_PATTERN.test(value) ? value : "#000000";
}

function normalizeHexInput(value: string, maxLength: number) {
  return value
    .replace(/[^#0-9A-Fa-f]/g, "")
    .slice(0, maxLength)
    .toUpperCase();
}

export function ColorField({ field, value, error, onChange }: ColorFieldProps) {
  const maxLength = field.maxLength ?? 7;

  return (
    <MuiTextField
      label={field.label}
      value={value}
      onChange={(event) =>
        onChange(normalizeHexInput(event.target.value, maxLength))
      }
      required={field.required}
      disabled={field.disabled}
      helperText={error ?? field.helperText}
      placeholder={field.placeholder ?? "#FF0000"}
      error={Boolean(error)}
      fullWidth
      size={formFieldSize}
      margin="dense"
      slotProps={{
        input: {
          ...formTextFieldSlotProps.input,
          startAdornment: (
            <InputAdornment position="start" sx={{ ml: -0.5, mr: 0 }}>
              <Box
                component="input"
                type="color"
                value={toPickerValue(value)}
                disabled={field.disabled}
                aria-label={`${field.label} picker`}
                onChange={(event) => onChange(event.target.value.toUpperCase())}
                sx={{
                  width: 28,
                  height: 28,
                  p: 0,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: `${FORM_FIELD_RADIUS}px`,
                  cursor: field.disabled ? "not-allowed" : "pointer",
                  bgcolor: "background.paper",
                  display: "block",
                }}
              />
            </InputAdornment>
          ),
        },
        htmlInput: {
          maxLength,
        },
      }}
    />
  );
}
