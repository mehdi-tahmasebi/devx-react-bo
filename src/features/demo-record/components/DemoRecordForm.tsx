import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/buttons";
import { FormRelatedRow, FormWrapper, ResourceForm } from "@/components/ui/form";
import { PageState } from "@/components/ui/page";
import { useListReturnNavigation } from "@/shared/hooks";
import type { TFormFieldConfig } from "@/shared/types";
import { useDemoLabelsSelect } from "../demo-label/hooks";
import {
  useCreateDemoRecord,
  useDemoRecordDetail,
  useUpdateDemoRecord,
} from "../hooks";
import {
  DEMO_RECORD_STATUS_LABELS,
  DemoRecordStatus,
  type DemoRecordFormValues,
  type DemoRecordSingleDto,
} from "../model";
import { demoRecordPaths } from "../routes";
import { useDemoRecordUiStore } from "../store";
import { DemoRecordLabelsDialog } from "./DemoRecordLabelsDialog";

const initialValues: DemoRecordFormValues = {
  name: "",
  code: "",
  status: DemoRecordStatus.Draft,
  isActive: true,
  notes: "",
  labelIds: [],
};

function mapSingleToFormValues(record: DemoRecordSingleDto): DemoRecordFormValues {
  return {
    name: record.name,
    code: record.code,
    status: record.status,
    isActive: record.isActive,
    notes: record.notes,
    labelIds: record.labelIds,
  };
}

export function DemoRecordForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const returnToList = useListReturnNavigation(demoRecordPaths.list);
  const { isLabelsDialogOpen, openLabelsDialog, closeLabelsDialog } =
    useDemoRecordUiStore();

  const { data, isLoading, isError, error } = useDemoRecordDetail(id);
  const { data: labelOptions = [] } = useDemoLabelsSelect();
  const { mutateAsync: createRecord, isPending: isCreating } =
    useCreateDemoRecord();
  const { mutateAsync: updateRecord, isPending: isUpdating } =
    useUpdateDemoRecord(id ?? "");

  const fields = useMemo<TFormFieldConfig[]>(
    () => [
      {
        type: "text",
        name: "name",
        label: "Nome",
        required: true,
        section: "Dettagli",
      },
      {
        type: "text",
        name: "code",
        label: "Codice",
        required: true,
        section: "Dettagli",
        helperText: "In edit reale il codice può essere read-only.",
      },
      {
        type: "select",
        name: "status",
        label: "Stato",
        required: true,
        section: "Dettagli",
        options: Object.entries(DEMO_RECORD_STATUS_LABELS).map(([value, label]) => ({
          value: Number(value),
          label,
        })),
      },
      {
        type: "boolean",
        name: "isActive",
        label: "Attivo",
        section: "Configurazione",
      },
      {
        type: "multiselect",
        name: "labelIds",
        label: "Etichette",
        section: "Configurazione",
        options: labelOptions.map((option) => ({
          value: option.id,
          label: option.v,
        })),
      },
      {
        type: "textarea",
        name: "notes",
        label: "Note",
        section: "Configurazione",
        grid: { xs: 12 },
      },
    ],
    [labelOptions],
  );

  const formInitialValues = useMemo(
    () => (isEdit && data ? mapSingleToFormValues(data) : initialValues),
    [data, isEdit],
  );

  const handleSubmit = async (values: DemoRecordFormValues) => {
    const payload: DemoRecordFormValues = {
      ...values,
      status: Number(values.status) as DemoRecordFormValues["status"],
      labelIds: values.labelIds.map(Number),
    };

    if (isEdit && id) {
      await updateRecord(payload);
      navigate(demoRecordPaths.detail(id));
      return;
    }

    const created = await createRecord(payload);
    navigate(demoRecordPaths.detail(created.id));
  };

  return (
    <PageState
      isLoading={isEdit && isLoading}
      isError={isEdit && isError}
      error={error}
      errorMessage="Impossibile caricare il record"
    >
      <FormWrapper title={isEdit ? "Modifica record" : "Nuovo record"}>
        <ResourceForm
          key={isEdit ? id : "new"}
          fields={fields}
          initialValues={formInitialValues}
          onSubmit={handleSubmit}
          isPending={isCreating || isUpdating}
          submitLabel={isEdit ? "Aggiorna" : "Crea"}
          onCancel={returnToList}
        />
      </FormWrapper>

      {isEdit ? (
        <FormRelatedRow
          title="Etichette demo"
          description="Sottomodulo in dialog — pattern per risorse collegate (FAQ, contatti, …)."
          action={
            <Button variant="outlined" onClick={openLabelsDialog}>
              Gestisci etichette
            </Button>
          }
        />
      ) : null}

      <DemoRecordLabelsDialog
        open={isLabelsDialogOpen}
        onClose={closeLabelsDialog}
      />
    </PageState>
  );
}
