import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/buttons";
import { PageHeader } from "@/components/ui/page";
import { AddIcon } from "@/shared/icons";
import { DemoRecordTable } from "./components/DemoRecordTable";
import { demoRecordPaths } from "./routes";

export function DemoRecordPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Record demo"
        description="Esempio di pagina lista: PageHeader + DataTable + azioni CRUD."
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(demoRecordPaths.new)}
          >
            Nuovo record
          </Button>
        }
      />
      <DemoRecordTable />
    </>
  );
}
