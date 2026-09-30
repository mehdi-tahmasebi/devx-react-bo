import { Stack } from "@mui/material";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { DataTable } from "@/components/ui/table";
import { Button as UiButton } from "@/components/ui/buttons";
import { AddIcon } from "@/shared/icons";
import type { TTableColumn } from "@/shared/types";
import { useDeleteDemoLabel, useDemoLabelsList } from "../hooks";
import type { DemoLabelListDto } from "../model";
import { useDemoLabelUiStore } from "../store";
import { DemoLabelFormDialog } from "./DemoLabelFormDialog";

const columns: TTableColumn<DemoLabelListDto>[] = [
  {
    id: "name",
    label: "Nome",
    minWidth: 200,
    render: (row) => (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <ColorSwatch color={row.color} />
        <span>{row.name}</span>
      </Stack>
    ),
  },
  { id: "color", label: "Colore", minWidth: 120 },
];

type DemoLabelTableProps = {
  variant: "page" | "embedded";
  onAdd?: () => void;
  onEdit?: (id: number) => void;
};

export function DemoLabelTable({ variant, onAdd, onEdit }: DemoLabelTableProps) {
  const embeddedStore = useDemoLabelUiStore();
  const { data, isLoading, isError, error } = useDemoLabelsList();
  const { mutateAsync: deleteLabel } = useDeleteDemoLabel();

  const isEmbedded = variant === "embedded";
  const handleAdd = onAdd ?? embeddedStore.openCreate;
  const handleEdit = onEdit ?? embeddedStore.openEdit;
  const formOpen = isEmbedded ? embeddedStore.isFormOpen : false;
  const editingId = isEmbedded ? embeddedStore.editingId : null;
  const closeForm = embeddedStore.closeForm;

  return (
    <>
      {isEmbedded ? (
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
          <UiButton
            size="small"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Aggiungi
          </UiButton>
        </Stack>
      ) : null}

      <DataTable
        columns={columns}
        rows={data?.rows ?? []}
        rowKey="id"
        loading={isLoading}
        error={isError ? (error as Error) : null}
        totalRows={data?.totalRows}
        actions={{
          edit: {
            label: "Modifica",
            onClick: (row) => handleEdit(row.id),
          },
          delete: {
            confirmTitle: "Elimina etichetta",
            confirmMessage: (row) => `Eliminare "${row.name}"?`,
            onConfirm: async (row) => {
              await deleteLabel(row.id);
            },
          },
        }}
      />

      {isEmbedded ? (
        <DemoLabelFormDialog
          open={formOpen}
          labelId={editingId}
          onClose={closeForm}
        />
      ) : null}
    </>
  );
}
