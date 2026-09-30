import { Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 1.5,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2.5, fontWeight: 700, letterSpacing: "-0.01em" }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
