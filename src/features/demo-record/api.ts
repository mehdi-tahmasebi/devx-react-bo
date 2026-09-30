import { config } from "@/core/config";
import type { TApiListResponse } from "@/core/api/api.type";
import { apiClient } from "@/core/api/client";
import {
  demoCreateRecord,
  demoDeleteRecord,
  demoGetRecord,
  demoListRecords,
  demoUpdateRecord,
} from "@/data/demo-store";
import type {
  DemoRecordListDto,
  DemoRecordRequestDto,
  DemoRecordSingleDto,
} from "./model";

/** Contract you would align with OpenAPI / Bruno in a real product. */
export const DEMO_RECORDS_ENDPOINT = "/api/bo/v1/demo-records";

export const demoRecordsKeys = {
  all: ["demo-records"] as const,
  list: (params?: Record<string, unknown>) =>
    [...demoRecordsKeys.all, "list", params] as const,
  detail: (id: string | number) =>
    [...demoRecordsKeys.all, "detail", id] as const,
};

async function simulateNetwork<T>(value: T): Promise<T> {
  if (!config.useDemoApi) {
    return value;
  }
  await new Promise((resolve) => setTimeout(resolve, 120));
  return value;
}

export async function fetchDemoRecordsList(
  params?: Record<string, unknown>,
): Promise<TApiListResponse<DemoRecordListDto>> {
  if (config.useDemoApi) {
    const page = Number(params?.page ?? 1);
    const pageSize = Number(params?.pageSize ?? 20);
    const q = typeof params?.q === "string" ? params.q : undefined;
    return simulateNetwork(demoListRecords({ page, pageSize, q }));
  }

  const { data } = await apiClient.get<TApiListResponse<DemoRecordListDto>>(
    DEMO_RECORDS_ENDPOINT,
    { params },
  );
  return data;
}

export async function fetchDemoRecordDetail(
  id: string | number,
): Promise<DemoRecordSingleDto> {
  if (config.useDemoApi) {
    return simulateNetwork(demoGetRecord(Number(id)));
  }

  const { data } = await apiClient.get<DemoRecordSingleDto>(
    `${DEMO_RECORDS_ENDPOINT}/${id}`,
  );
  return data;
}

export async function postDemoRecord(body: DemoRecordRequestDto) {
  if (config.useDemoApi) {
    return simulateNetwork(demoCreateRecord(body));
  }

  const { data } = await apiClient.post<DemoRecordSingleDto>(
    DEMO_RECORDS_ENDPOINT,
    body,
  );
  return data;
}

export async function putDemoRecord(
  id: string | number,
  body: DemoRecordRequestDto,
) {
  if (config.useDemoApi) {
    return simulateNetwork(demoUpdateRecord(Number(id), body));
  }

  const { data } = await apiClient.put<DemoRecordSingleDto>(
    `${DEMO_RECORDS_ENDPOINT}/${id}`,
    body,
  );
  return data;
}

export async function deleteDemoRecordApi(id: string | number) {
  if (config.useDemoApi) {
    await simulateNetwork(demoDeleteRecord(Number(id)));
    return;
  }

  await apiClient.delete(`${DEMO_RECORDS_ENDPOINT}/${id}`);
}
