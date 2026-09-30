import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { FORM_GRID_SPACING } from "./form.tokens";

type FormSectionProps = {
  title?: string;
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

export function FormSection({
  title,
  children,
  header,
  footer,
}: FormSectionProps) {
  return (
    <Box>
      {title ? (
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1.5,
            color: "text.secondary",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
      ) : null}
      {header ? <Box sx={{ width: "100%", mb: 2 }}>{header}</Box> : null}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: FORM_GRID_SPACING,
        }}
      >
        {children}
      </Box>
      {footer ? <Box sx={{ width: "100%", mt: 2 }}>{footer}</Box> : null}
    </Box>
  );
}
