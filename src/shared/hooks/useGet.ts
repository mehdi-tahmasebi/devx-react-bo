import { apiClient } from "@/core/api/client";
import type {
  TApiListResponse,
  TApiSelectOptionResponse,
} from "@/core/api/api.type";

export function useGet() {
  const apiList = async <T>(
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<TApiListResponse<T>> => {
    const { data } = await apiClient.get<TApiListResponse<T>>(endpoint, {
      params,
    });
    return data;
  };

  const apiSingle = async <T>(
    endpoint: string,
    id?: string | number,
  ): Promise<T> => {
    const url = id != null ? `${endpoint}/${id}` : endpoint;
    const { data } = await apiClient.get<T>(url);
    return data;
  };

  const apiSelect = async (
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<TApiSelectOptionResponse[]> => {
    const { data } = await apiClient.get<TApiSelectOptionResponse[]>(endpoint, {
      params,
    });
    return data;
  };

  return { apiList, apiSingle, apiSelect };
};
