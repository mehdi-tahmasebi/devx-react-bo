import { useEffect, useState } from "react";
import { apiClient } from "@/core/api/client";
import {
  getDocumentDownloadPath,
  getDocumentPreviewPath,
} from "@/shared/utils/documents";

type UseDocumentPreviewUrlOptions = {
  buildingId?: string | number;
  refreshKey?: number;
  filename?: string;
  /** Default `"download"` — logo e caller esistenti restano invariati. */
  mode?: "download" | "preview";
  /** Omit `idBuilding` for global documents (e.g. service category media). */
  skipBuildingHeader?: boolean;
};

const IMAGE_EXTENSION_MIME_TYPES: Record<string, string> = {
  svg: "image/svg+xml",
  svc: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
};

function resolveImageMimeType(
  blob: Blob,
  contentType: string | undefined,
  filename?: string,
): string | null {
  const headerType = contentType?.split(";")[0].trim().toLowerCase();
  if (headerType?.startsWith("image/")) {
    return headerType;
  }

  const extension = filename?.toLowerCase().match(/\.([^.]+)$/)?.[1];
  if (extension && IMAGE_EXTENSION_MIME_TYPES[extension]) {
    return IMAGE_EXTENSION_MIME_TYPES[extension];
  }

  if (blob.type.startsWith("image/")) {
    return blob.type;
  }

  return null;
}

function readBlobAsDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export function useDocumentPreviewUrl(
  documentId: number | null | undefined,
  options?: UseDocumentPreviewUrlOptions,
) {
  const buildingId = options?.buildingId;
  const refreshKey = options?.refreshKey ?? 0;
  const filename = options?.filename;
  const mode = options?.mode ?? "download";
  const skipBuildingHeader = options?.skipBuildingHeader ?? false;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  useEffect(() => {
    if (documentId == null) {
      return;
    }

    const requestKey = `${documentId}:${refreshKey}:${mode}`;
    let cancelled = false;

    const path =
      mode === "preview"
        ? getDocumentPreviewPath(documentId)
        : getDocumentDownloadPath(documentId);

    void apiClient
      .get<Blob>(path, {
        responseType: "blob",
        overrideBuildingHeaderId: buildingId,
        skipBuildingHeader,
        params: refreshKey > 0 ? { _: refreshKey } : undefined,
        headers: {
          Accept: "image/*,*/*",
        },
      })
      .then(async (response) => {
        if (cancelled) {
          return;
        }

        const headerContentType = response.headers["content-type"];
        const contentType =
          typeof headerContentType === "string" ? headerContentType : undefined;
        const mimeType = resolveImageMimeType(
          response.data,
          contentType,
          filename,
        );

        if (!mimeType) {
          return;
        }

        const blob =
          response.data.type === mimeType
            ? response.data
            : new Blob([response.data], { type: mimeType });

        const dataUrl = await readBlobAsDataUrl(blob);
        if (cancelled) {
          return;
        }

        setPreviewUrl(dataUrl);
        setLoadedKey(requestKey);
      })
      .catch(() => {
        if (!cancelled) {
          setPreviewUrl(null);
          setLoadedKey(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [buildingId, documentId, filename, mode, refreshKey, skipBuildingHeader]);

  if (documentId == null) {
    return null;
  }

  const requestKey = `${documentId}:${refreshKey}:${mode}`;
  if (loadedKey !== requestKey) {
    return null;
  }

  return previewUrl;
}
