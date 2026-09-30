import { useMemo } from "react";
import { AppDialog } from "@/components/ui/dialog";
import { ResourceForm } from "@/components/ui/form";
import type { TFormFieldConfig } from "@/shared/types";
import { useCreateDemoLabel, useDemoLabelsList, useUpdateDemoLabel } from "../hooks";
import type { DemoLabelFormValues } from "../model";

const initialValues: DemoLabelFormValues = {
  name: "",
  color: "#4F46E5",
};

type DemoLabelFormDialogProps = {
  open: boolean;
  labelId: number | null;
  onClose: () => void;
};

export function DemoLabelFormDialog({
  open,
  labelId,
  onClose,
}: DemoLabelFormDialogProps) {
  const isEdit = labelId != null;
  const { data } = useDemoLabelsList();
  const existing = data?.rows.find((row) => row.id === labelId);

  const { mutateAsync: createLabel, isPending: isCreating } =
    useCreateDemoLabel();
  const { mutateAsync: updateLabel, isPending: isUpdating } =
    useUpdateDemoLabel(labelId ?? 0);

  const fields: TFormFieldConfig[] = [
    { type: "text", name: "name", label: "Nome", required: true },
    { type: "color", name: "color", label: "Colore", required: true },
  ];

  const formInitialValues = useMemo(
    () =>
      isEdit && existing
        ? { name: existing.name, color: existing.color }
        : initialValues,
    [existing, isEdit],
  );

  const handleSubmit = async (values: DemoLabelFormValues) => {
    if (isEdit && labelId != null) {
      await updateLabel(values);
    } else {
      await createLabel(values);
    }
    onClose();
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={isEdit ? "Modifica etichetta" : "Nuova etichetta"}
      maxWidth="sm"
    >
      <ResourceForm
        key={isEdit ? labelId : "new"}
        fields={fields}
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
        isPending={isCreating || isUpdating}
        submitLabel={isEdit ? "Salva" : "Crea"}
        onCancel={onClose}
      />
    </AppDialog>
  );
}
