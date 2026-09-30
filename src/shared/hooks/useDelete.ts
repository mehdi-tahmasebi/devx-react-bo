import { apiClient } from "@/core/api/client";

export function useDelete() {
  const apiDelete = async (
    endpoint: string,
    id: string | number,
  ): Promise<void> => {
    await apiClient.delete(`${endpoint}/${id}`);
  };

  return { apiDelete };
}
