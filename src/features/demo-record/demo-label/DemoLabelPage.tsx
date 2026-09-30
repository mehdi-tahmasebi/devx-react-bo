import { Button } from "@/components/ui/buttons";
import { PageHeader } from "@/components/ui/page";
import { AddIcon } from "@/shared/icons";
import { DemoLabelTable } from "./components/DemoLabelTable";
import { DemoLabelFormDialog } from "./components/DemoLabelFormDialog";
import { useDemoLabelUiStore } from "./store";

/** Secondo modulo di esempio: lista + dialog (senza route form dedicate). */
export function DemoLabelPage() {
  const { openCreate, openEdit, isFormOpen, closeForm, editingId } =
    useDemoLabelUiStore();

  return (
    <>
      <PageHeader
        title="Etichette demo"
        description="Sottomodulo con CRUD in dialog — stesso pattern di categorie/modal nel BO reale."
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Nuova etichetta
          </Button>
        }
      />
      <DemoLabelTable variant="page" onAdd={openCreate} onEdit={openEdit} />
      <DemoLabelFormDialog
        open={isFormOpen}
        labelId={editingId}
        onClose={closeForm}
      />
    </>
  );
}
