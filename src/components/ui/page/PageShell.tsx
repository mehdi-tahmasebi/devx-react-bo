import { Box } from "@mui/material";
import type { ReactNode } from "react";

export type PageShellVariant = "scroll" | "fill";

type PageShellProps = {
  children: ReactNode;
  /**
   * `scroll` — page content scrolls (forms, detail).
   * `fill` — content fills the main panel; children manage their own scroll (list + DataTable).
   */
  variant?: PageShellVariant;
};

export function PageShell({ children, variant = "scroll" }: PageShellProps) {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        overflow: variant === "fill" ? "hidden" : "auto",
      }}
    >
      {children}
    </Box>
  );
}
