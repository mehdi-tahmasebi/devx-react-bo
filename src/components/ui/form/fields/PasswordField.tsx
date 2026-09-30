import {
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
} from "@mui/material";
import { useState } from "react";
import type { TPasswordFormField } from "@/shared/types";
import { VisibilityIcon, VisibilityOffIcon } from "@/shared/icons";
import { formFieldSize, formTextFieldSlotProps } from "./fieldStyles";

type PasswordFieldProps = {
  field: TPasswordFormField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function PasswordField({ field, value, error, onChange }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MuiTextField
      label={field.label}
      value={value}
      type={showPassword ? "text" : "password"}
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
          autoComplete: "new-password",
        },
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                aria-label={
                  showPassword ? "Nascondi password" : "Mostra password"
                }
                onClick={() => setShowPassword((current) => !current)}
                edge="end"
                size="small"
              >
                {showPassword ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
