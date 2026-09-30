import axios from "axios";
import { config } from "@/core/config";
import type { TSelectOption } from "@/shared/types";

export const timezonesKeys = {
  all: ["timezones"] as const,
};

export async function fetchTimezones(): Promise<string[]> {
  if (!config.hasTimezoneApi) {
    return [];
  }

  const { data } = await axios.get<string[]>(config.timezoneApiUrl);
  return data;
}

export function mapTimezoneOptions(timezones: string[]): TSelectOption[] {
  return timezones.map((timezone) => ({
    value: timezone,
    label: timezone,
  }));
}

export function withSelectedTimezoneOption(
  options: TSelectOption[],
  selected?: string | null,
): TSelectOption[] {
  if (!selected || options.some((option) => option.value === selected)) {
    return options;
  }

  return [{ value: selected, label: selected }, ...options];
}
