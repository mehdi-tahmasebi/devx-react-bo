import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  type ButtonProps,
} from "@mui/material";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: ButtonProps["color"];
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Conferma",
  cancelLabel = "Annulla",
  confirmColor = "error",
  isPending,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onCancel}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 1.5,
            p: 0.5,
          },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "text.secondary" }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onCancel}
          disabled={isPending}
          sx={{ borderRadius: 1.5 }}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          color={confirmColor}
          onClick={onConfirm}
          loading={isPending}
          sx={{ borderRadius: 1.5 }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
