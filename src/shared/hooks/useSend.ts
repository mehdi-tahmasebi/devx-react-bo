import { apiClient } from "@/core/api/client";

export function useSend() {
  const apiPost = async <TBody, TResponse>(
    endpoint: string,
    body: TBody,
  ): Promise<TResponse> => {
    const { data } = await apiClient.post<TResponse>(endpoint, body);
    return data;
  };

  const apiPut = async <TBody, TResponse>(
    endpoint: string,
    id: string | number,
    body: TBody,
  ): Promise<TResponse> => {
    const { data } = await apiClient.put<TResponse>(
      `${endpoint}/${id}`,
      body,
    );
    return data;
  };

  const apiPatch = async <TBody, TResponse>(
    endpoint: string,
    id: string | number,
    body: TBody,
  ): Promise<TResponse> => {
    const { data } = await apiClient.patch<TResponse>(
      `${endpoint}/${id}`,
      body,
    );
    return data;
  };

  const apiClone = async <TResponse>(
    endpoint: string,
    id: string | number,
  ): Promise<TResponse> => {
    const { data } = await apiClient.post<TResponse>(
      `${endpoint}/${id}/clone`,
    );
    return data;
  };

  return { apiPost, apiPut, apiPatch, apiClone };
}
