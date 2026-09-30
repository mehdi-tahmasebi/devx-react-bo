import { config } from "@/core/config";
import type { TApiListResponse } from "@/core/api/api.type";
import type { TApiSelectOptionResponse } from "@/core/api/api.type";
import { apiClient } from "@/core/api/client";
import {
  demoCreateLabel,
  demoDeleteLabel,
  demoListLabels,
  demoListLabelsSelect,
  demoUpdateLabel,
} from "@/data/demo-store";
import type {
  DemoLabelListDto,
  DemoLabelRequestDto,
  DemoLabelSingleDto,
} from "./model";

export const DEMO_LABELS_ENDPOINT = "/api/bo/v1/demo-labels";

export const demoLabelsKeys = {
  all: ["demo-labels"] as const,
  list: (params?: Record<string, unknown>) =>
    [...demoLabelsKeys.all, "list", params] as const,
  select: () => [...demoLabelsKeys.all, "select"] as const,
  detail: (id: string | number) =>
    [...demoLabelsKeys.all, "detail", id] as const,
};

async function simulateNetwork<T>(value: T): Promise<T> {
  if (!config.useDemoApi) {
    return value;
  }
  await new Promise((resolve) => setTimeout(resolve, 80));
  return value;
}

export async function fetchDemoLabelsList(
  params?: Record<string, unknown>,
): Promise<TApiListResponse<DemoLabelListDto>> {
  if (config.useDemoApi) {
    return simulateNetwork(
      demoListLabels({
        page: Number(params?.page ?? 1),
        pageSize: Number(params?.pageSize ?? 50),
        q: typeof params?.q === "string" ? params.q : undefined,
      }),
    );
  }

  const { data } = await apiClient.get<TApiListResponse<DemoLabelListDto>>(
    DEMO_LABELS_ENDPOINT,
    { params },
  );
  return data;
}

export async function fetchDemoLabelsSelect(): Promise<
  TApiSelectOptionResponse[]
> {
  if (config.useDemoApi) {
    return simulateNetwork(demoListLabelsSelect());
  }

  const { data } = await apiClient.get<TApiSelectOptionResponse[]>(
    `${DEMO_LABELS_ENDPOINT}/select`,
  );
  return data;
}

export async function postDemoLabel(body: DemoLabelRequestDto) {
  if (config.useDemoApi) {
    return simulateNetwork(demoCreateLabel(body));
  }

  const { data } = await apiClient.post<DemoLabelSingleDto>(
    DEMO_LABELS_ENDPOINT,
    body,
  );
  return data;
}

export async function putDemoLabel(
  id: string | number,
  body: DemoLabelRequestDto,
) {
  if (config.useDemoApi) {
    return simulateNetwork(demoUpdateLabel(Number(id), body));
  }

  const { data } = await apiClient.put<DemoLabelSingleDto>(
    `${DEMO_LABELS_ENDPOINT}/${id}`,
    body,
  );
  return data;
}

export async function deleteDemoLabelApi(id: string | number) {
  if (config.useDemoApi) {
    await simulateNetwork(demoDeleteLabel(Number(id)));
    return;
  }

  await apiClient.delete(`${DEMO_LABELS_ENDPOINT}/${id}`);
}
