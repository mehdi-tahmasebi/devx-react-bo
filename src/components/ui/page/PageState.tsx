import { Alert, Box, CircularProgress } from "@mui/material";
import type { ReactNode } from "react";
import { getErrorMessage } from "@/core/notifications";

type PageStateProps = {
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  errorMessage?: string;
  children?: ReactNode;
};

export function PageState({
  isLoading,
  isError,
  error,
  errorMessage = "Impossibile caricare i dati",
  children,
}: PageStateProps) {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        {getErrorMessage(error, errorMessage)}
      </Alert>
    );
  }

  return children ?? null;
}
