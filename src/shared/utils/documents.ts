import { config } from "@/core/config";

export const DOCUMENTS_DOWNLOAD_BASE_PATH = "/api/bo/v1/documents";

const DOCUMENT_MIME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export function getDocumentDownloadPath(documentId: number): string {
  return `${DOCUMENTS_DOWNLOAD_BASE_PATH}/${documentId}/download`;
}

export function getDocumentPreviewPath(documentId: number): string {
  return `${DOCUMENTS_DOWNLOAD_BASE_PATH}/${documentId}/preview`;
}

export function resolveDocumentMimeType(
  blob: Blob,
  filename?: string,
  contentType?: string,
): string {
  const headerType = contentType?.split(";")[0].trim().toLowerCase();
  if (
    headerType &&
    headerType !== "application/octet-stream" &&
    headerType !== "application/json"
  ) {
    return headerType;
  }

  const extension = filename?.toLowerCase().match(/\.([^.]+)$/)?.[1];
  if (extension && DOCUMENT_MIME_TYPES[extension]) {
    return DOCUMENT_MIME_TYPES[extension];
  }

  if (blob.type && blob.type !== "application/octet-stream") {
    return blob.type;
  }

  return blob.type || "application/octet-stream";
}

export function canInlinePreview(mimeType: string): boolean {
  return (
    mimeType.startsWith("image/") ||
    mimeType === "application/pdf" ||
    mimeType.startsWith("text/")
  );
}

export type DocumentPreviewContent = {
  url: string;
  filename: string;
  canPreview: boolean;
};

export function createDocumentPreviewContent(
  blob: Blob,
  filename?: string,
): DocumentPreviewContent {
  const mimeType = resolveDocumentMimeType(blob, filename);
  const typedBlob =
    blob.type === mimeType ? blob : new Blob([blob], { type: mimeType });

  return {
    url: URL.createObjectURL(typedBlob),
    filename: filename?.trim() || "Documento",
    canPreview: canInlinePreview(mimeType),
  };
}

export function revokeDocumentPreviewContent(
  preview: DocumentPreviewContent | null,
) {
  if (preview) {
    URL.revokeObjectURL(preview.url);
  }
}

export function getDocumentDownloadUrl(
  documentId: number,
  cacheBust?: number,
): string {
  const base = config.apiBaseUrl ?? "";
  const url = `${base}${getDocumentDownloadPath(documentId)}`;

  if (cacheBust != null && cacheBust > 0) {
    return `${url}?_=${cacheBust}`;
  }

  return url;
}
