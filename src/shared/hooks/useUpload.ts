import { multipartClient } from "@/core/api/client";

export function useUpload() {
  const apiUpload = async <TResponse>(
    endpoint: string,
    formData: FormData,
  ): Promise<TResponse> => {
    const { data } = await multipartClient.post<TResponse>(endpoint, formData);
    return data;
  };

  const apiPatchUpload = async <TResponse>(
    endpoint: string,
    formData: FormData,
  ): Promise<TResponse> => {
    const { data } = await multipartClient.patch<TResponse>(endpoint, formData);
    return data;
  };

  return { apiUpload, apiPatchUpload };
}
