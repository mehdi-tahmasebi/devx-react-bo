import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  type DialogProps,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ReactNode } from "react";
import { CloseIcon } from "@/shared/icons";

type AppDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  maxWidth?: DialogProps["maxWidth"];
  toolbar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export function AppDialog({
  open,
  onClose,
  title,
  description,
  maxWidth = "sm",
  toolbar,
  footer,
  children,
}: AppDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 1.5,
            border: 1,
            borderColor: "divider",
            overflow: "hidden",
            boxShadow: (theme) =>
              `0 24px 48px ${alpha(theme.palette.common.black, 0.12)}`,
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          px: 3,
          py: 2.5,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, lineHeight: 1.5 }}
            >
              {description}
            </Typography>
          )}
        </Box>
        <IconButton
          aria-label="Chiudi"
          onClick={onClose}
          size="small"
          sx={{
            mt: -0.25,
            mr: -0.5,
            color: "text.secondary",
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
              color: "text.primary",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {toolbar && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
            px: 3,
            py: 1.5,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
          }}
        >
          {toolbar}
        </Box>
      )}

      <DialogContent
        sx={{
          px: 3,
          py: 2.5,
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        {children}
      </DialogContent>

      {footer && (
        <Box
          sx={{
            px: 3,
            py: 1.5,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          {footer}
        </Box>
      )}
    </Dialog>
  );
}
