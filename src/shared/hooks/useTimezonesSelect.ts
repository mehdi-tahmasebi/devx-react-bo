import { useQuery } from "@tanstack/react-query";
import { config } from "@/core/config";
import {
  fetchTimezones,
  mapTimezoneOptions,
  timezonesKeys,
} from "@/shared/api/timezones";

const TIMEZONES_STALE_TIME_MS = 1000 * 60 * 60 * 24;

export function useTimezonesSelect() {
  return useQuery({
    queryKey: timezonesKeys.all,
    queryFn: fetchTimezones,
    select: mapTimezoneOptions,
    staleTime: TIMEZONES_STALE_TIME_MS,
    enabled: config.hasTimezoneApi,
  });
}
