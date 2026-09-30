import type { SxProps, Theme } from "@mui/material";
import { FORM_FIELD_RADIUS, FORM_FIELD_SIZE } from "../form.tokens";

export const formFieldSize = FORM_FIELD_SIZE;

export const formFieldInputSx: SxProps<Theme> = {
  borderRadius: `${FORM_FIELD_RADIUS}px`,
  fontSize: 14,
};

export const formSelectSx: SxProps<Theme> = {
  borderRadius: `${FORM_FIELD_RADIUS}px`,
  fontSize: 14,
};

export const formTextFieldSlotProps = {
  input: {
    sx: formFieldInputSx,
  },
} as const;
