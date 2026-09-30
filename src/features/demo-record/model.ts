import {
  DEMO_RECORD_STATUS_LABELS,
  DemoRecordStatus,
  type DemoRecord,
} from "@/data/demo-store";

export { DEMO_RECORD_STATUS_LABELS, DemoRecordStatus };

export type DemoRecordListDto = Pick<
  DemoRecord,
  "id" | "name" | "code" | "status" | "isActive" | "createdAt"
>;

export type DemoRecordSingleDto = DemoRecord;

export interface DemoRecordRequestDto {
  name: string;
  code: string;
  status: DemoRecordStatus;
  isActive: boolean;
  notes: string;
  labelIds: number[];
}

export type DemoRecordFormValues = DemoRecordRequestDto;
