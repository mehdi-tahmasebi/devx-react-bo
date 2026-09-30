import type { TSelectOption } from "@/shared/types";
import type { TApiSelectOptionResponse } from "./api.type";

export function mapApiSelectOptions(
  items: TApiSelectOptionResponse[],
): TSelectOption[] {
  return items.map(({ id, v }) => ({ value: id, label: v }));
}
