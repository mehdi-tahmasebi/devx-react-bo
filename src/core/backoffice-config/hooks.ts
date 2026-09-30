import { useQuery } from "@tanstack/react-query";
import { getBackofficeConfig } from "./api";

export const backofficeConfigKeys = {
  all: ["backoffice-config"] as const,
};

export function useBackofficeConfig() {
  return useQuery({
    queryKey: backofficeConfigKeys.all,
    queryFn: getBackofficeConfig,
    staleTime: 5 * 60 * 1000,
  });
}

export function useWorkplaceBookingEnabled(): boolean {
  const { data } = useBackofficeConfig();
  return data?.features.workplaceBooking === true;
}
