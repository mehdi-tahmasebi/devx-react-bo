import type { TApiListResponse } from "@/core/api/api.type";

/** In-memory fixtures for the sample BO (no backend required). */

export type DemoWorkspace = { id: number; label: string };

export type DemoLabel = {
  id: number;
  name: string;
  color: string;
};

export type DemoRecord = {
  id: number;
  name: string;
  code: string;
  status: DemoRecordStatus;
  isActive: boolean;
  notes: string;
  labelIds: number[];
  createdAt: string;
};

export const DemoRecordStatus = {
  Draft: 1,
  Published: 2,
  Archived: 3,
} as const;

export type DemoRecordStatus =
  (typeof DemoRecordStatus)[keyof typeof DemoRecordStatus];

export const DEMO_RECORD_STATUS_LABELS: Record<DemoRecordStatus, string> = {
  [DemoRecordStatus.Draft]: "Bozza",
  [DemoRecordStatus.Published]: "Pubblicato",
  [DemoRecordStatus.Archived]: "Archiviato",
};

let nextRecordId = 4;
let nextLabelId = 4;

const workspaces: DemoWorkspace[] = [
  { id: 1, label: "Workspace demo" },
  { id: 2, label: "Workspace secondario" },
];

let labels: DemoLabel[] = [
  { id: 1, name: "Priorità alta", color: "#DC2626" },
  { id: 2, name: "Interno", color: "#4F46E5" },
  { id: 3, name: "Cliente", color: "#059669" },
];

let records: DemoRecord[] = [
  {
    id: 1,
    name: "Primo elemento",
    code: "REC-001",
    status: DemoRecordStatus.Published,
    isActive: true,
    notes: "Esempio di riga in lista.",
    labelIds: [1, 2],
    createdAt: "2026-01-15T10:00:00.000Z",
  },
  {
    id: 2,
    name: "Secondo elemento",
    code: "REC-002",
    status: DemoRecordStatus.Draft,
    isActive: true,
    notes: "",
    labelIds: [3],
    createdAt: "2026-02-01T14:30:00.000Z",
  },
  {
    id: 3,
    name: "Elemento archiviato",
    code: "REC-003",
    status: DemoRecordStatus.Archived,
    isActive: false,
    notes: "Mostra stato disattivato.",
    labelIds: [],
    createdAt: "2025-11-20T09:00:00.000Z",
  },
];

function paginate<T>(
  rows: T[],
  page = 1,
  pageSize = 20,
): TApiListResponse<T> {
  const safePage = Math.max(1, page);
  const safeSize = Math.max(1, pageSize);
  const start = (safePage - 1) * safeSize;
  return {
    rows: rows.slice(start, start + safeSize),
    totalRows: rows.length,
  };
}

export function demoListWorkspacesSelect() {
  return workspaces.map((w) => ({ id: w.id, v: w.label }));
}

export function demoGetWorkspaceInfo(_id: number) {
  return {
    userCount: 12,
    amenityCount: 4,
    serviceCount: 7,
    activeTicketCount: 2,
    pendingTicketCount: 1,
  };
}

export function demoListLabels(params?: {
  page?: number;
  pageSize?: number;
  q?: string;
}) {
  const q = params?.q?.trim().toLowerCase();
  let filtered = labels;
  if (q) {
    filtered = labels.filter((l) => l.name.toLowerCase().includes(q));
  }
  return paginate(filtered, params?.page, params?.pageSize);
}

export function demoListLabelsSelect() {
  return labels.map((l) => ({ id: l.id, v: l.name }));
}

export function demoGetLabel(id: number) {
  const label = labels.find((l) => l.id === id);
  if (!label) {
    throw new Error("Etichetta non trovata");
  }
  return label;
}

export function demoCreateLabel(body: Omit<DemoLabel, "id">) {
  const created: DemoLabel = { id: nextLabelId++, ...body };
  labels = [...labels, created];
  return created;
}

export function demoUpdateLabel(id: number, body: Omit<DemoLabel, "id">) {
  if (!labels.some((l) => l.id === id)) {
    throw new Error("Etichetta non trovata");
  }
  const updated: DemoLabel = { id, ...body };
  labels = labels.map((l) => (l.id === id ? updated : l));
  return updated;
}

export function demoDeleteLabel(id: number) {
  labels = labels.filter((l) => l.id !== id);
  records = records.map((r) => ({
    ...r,
    labelIds: r.labelIds.filter((lid) => lid !== id),
  }));
}

export function demoListRecords(params?: {
  page?: number;
  pageSize?: number;
  q?: string;
}) {
  const q = params?.q?.trim().toLowerCase();
  let filtered = records;
  if (q) {
    filtered = records.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q),
    );
  }
  return paginate(filtered, params?.page, params?.pageSize);
}

export function demoGetRecord(id: number) {
  const record = records.find((r) => r.id === id);
  if (!record) {
    throw new Error("Record non trovato");
  }
  return record;
}

export function demoCreateRecord(
  body: Omit<DemoRecord, "id" | "createdAt">,
) {
  const created: DemoRecord = {
    id: nextRecordId++,
    createdAt: new Date().toISOString(),
    ...body,
  };
  records = [...records, created];
  return created;
}

export function demoUpdateRecord(
  id: number,
  body: Omit<DemoRecord, "id" | "createdAt">,
) {
  const index = records.findIndex((r) => r.id === id);
  if (index === -1) {
    throw new Error("Record non trovato");
  }
  const previous = records[index];
  const updated: DemoRecord = { ...previous, ...body, id: previous.id };
  records = records.map((r) => (r.id === id ? updated : r));
  return updated;
}

export function demoDeleteRecord(id: number) {
  records = records.filter((r) => r.id !== id);
}
