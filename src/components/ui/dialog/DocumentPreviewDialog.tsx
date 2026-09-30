import { Box, Typography } from "@mui/material";
import { AppDialog } from "./AppDialog";

type DocumentPreviewDialogProps = {
  open: boolean;
  title: string;
  url: string | null;
  canPreview: boolean;
  onClose: () => void;
};

export function DocumentPreviewDialog({
  open,
  title,
  url,
  canPreview,
  onClose,
}: DocumentPreviewDialogProps) {
  return (
    <AppDialog open={open} onClose={onClose} title={title} maxWidth="lg">
      {canPreview && url ? (
        <Box
          component="iframe"
          src={url}
          title={title}
          sx={{
            display: "block",
            width: "100%",
            height: "75vh",
            border: 0,
            bgcolor: "common.white",
          }}
        />
      ) : url ? (
        <Typography variant="body2" color="text.secondary">
          Anteprima non disponibile per questo tipo di file. Usa Scarica.
        </Typography>
      ) : null}
    </AppDialog>
  );
}
