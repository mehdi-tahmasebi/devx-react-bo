import type { DemoLabel } from "@/data/demo-store";

export type DemoLabelListDto = DemoLabel;
export type DemoLabelSingleDto = DemoLabel;

export interface DemoLabelRequestDto {
  name: string;
  color: string;
}

export type DemoLabelFormValues = DemoLabelRequestDto;
