import { AppDialog } from "@/components/ui/dialog";
import { DemoLabelTable } from "../demo-label/components/DemoLabelTable";

type DemoRecordLabelsDialogProps = {
  open: boolean;
  onClose: () => void;
};

/** Adapter: riusa il sottomodulo `demo-label` dentro un dialog sulla form di edit. */
export function DemoRecordLabelsDialog({
  open,
  onClose,
}: DemoRecordLabelsDialogProps) {
  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Etichette demo"
      description="CRUD secondario: stesso stack (api → hooks → tabella), host in dialog."
      maxWidth="md"
    >
      <DemoLabelTable variant="embedded" />
    </AppDialog>
  );
}
