import { apiClient } from "@/core/api/client";
import { resolveDocumentMimeType } from "@/shared/utils/documents";

export function useDownload() {
  const apiDownload = async (
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<Blob> => {
    const { data, headers } = await apiClient.get<Blob>(endpoint, {
      params,
      responseType: "blob",
    });
    const headerContentType = headers["content-type"];
    const contentType =
      typeof headerContentType === "string" ? headerContentType : undefined;
    const mimeType = resolveDocumentMimeType(data, undefined, contentType);

    return data.type === mimeType
      ? data
      : new Blob([data], { type: mimeType });
  };

  const saveBlobAsFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return { apiDownload, saveBlobAsFile };
}
