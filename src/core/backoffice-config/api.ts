import { apiClient } from "@/core/api/client";

export const BACKOFFICE_CONFIG_ENDPOINT = "/api/bo/v1/config";

export type BackofficeConfigDto = {
  key: string;
  features: {
    workplaceBooking: boolean;
  };
};

export async function getBackofficeConfig(): Promise<BackofficeConfigDto> {
  const { data } = await apiClient.get<BackofficeConfigDto>(
    BACKOFFICE_CONFIG_ENDPOINT,
  );
  return data;
}
