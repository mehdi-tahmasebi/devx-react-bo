import { Link as RouterLink, useParams } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { BooleanIndicator } from "@/components/ui/form/fields";
import { PageHeader, PageState } from "@/components/ui/page";
import { formatDateTime } from "@/shared/utils/date";
import { useDemoRecordDetail } from "./hooks";
import { DEMO_RECORD_STATUS_LABELS } from "./model";
import { demoRecordPaths } from "./routes";

export function DemoRecordView() {
  const { id = "" } = useParams();
  const { data, isLoading, isError, error } = useDemoRecordDetail(id);
  const record = data;

  return (
    <PageState
      isLoading={isLoading}
      isError={isError}
      error={error}
      errorMessage="Impossibile caricare il record"
    >
      <PageHeader
        title={record?.name ?? "Dettaglio"}
        description={`Codice ${record?.code ?? "—"}`}
        action={
          <Button
            component={RouterLink}
            variant="contained"
            to={demoRecordPaths.edit(id)}
          >
            Modifica
          </Button>
        }
      />

      <Stack spacing={1.5} sx={{ maxWidth: 480 }}>
        <Typography variant="body2">
          Stato:{" "}
          {record ? DEMO_RECORD_STATUS_LABELS[record.status] : "—"}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2">Attivo:</Typography>
          <BooleanIndicator value={record?.isActive ?? false} />
        </Stack>
        <Typography variant="body2">
          Creato: {formatDateTime(record?.createdAt)}
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
          Note: {record?.notes?.trim() ? record.notes : "—"}
        </Typography>
      </Stack>
    </PageState>
  );
}
