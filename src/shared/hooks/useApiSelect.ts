import { useQuery } from "@tanstack/react-query";
import { mapApiSelectOptions } from "@/core/api/select.utils";
import { useGet } from "./useGet";

export const apiSelectKeys = {
  all: ["select"] as const,
  byEndpoint: (endpoint: string, params?: Record<string, unknown>) =>
    [...apiSelectKeys.all, endpoint, params] as const,
};

export function useApiSelect(
  endpoint: string,
  options?: { enabled?: boolean; params?: Record<string, unknown> },
) {
  const { apiSelect } = useGet();
  const params = options?.params;

  return useQuery({
    queryKey: apiSelectKeys.byEndpoint(endpoint, params),
    queryFn: () => apiSelect(endpoint, params),
    select: mapApiSelectOptions,
    enabled: options?.enabled ?? true,
  });
}
