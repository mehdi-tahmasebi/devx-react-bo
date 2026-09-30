import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, notify } from "@/core/notifications";
import {
  DEMO_RECORDS_ENDPOINT,
  demoRecordsKeys,
  deleteDemoRecordApi,
  fetchDemoRecordDetail,
  fetchDemoRecordsList,
  postDemoRecord,
  putDemoRecord,
} from "../api";
import type { DemoRecordRequestDto } from "../model";

export function useDemoRecordsList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: demoRecordsKeys.list(params),
    queryFn: () => fetchDemoRecordsList(params),
  });
}

export function useDemoRecordDetail(id: string | number | undefined) {
  return useQuery({
    queryKey: demoRecordsKeys.detail(id ?? "none"),
    queryFn: () => fetchDemoRecordDetail(id!),
    enabled: id != null && id !== "",
  });
}

export function useCreateDemoRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: DemoRecordRequestDto) => postDemoRecord(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: demoRecordsKeys.all });
      notify.success("Record creato con successo");
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Impossibile creare il record"));
    },
  });
}

export function useUpdateDemoRecord(id: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: DemoRecordRequestDto) => putDemoRecord(id, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: demoRecordsKeys.all });
      notify.success("Record aggiornato con successo");
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Impossibile aggiornare il record"));
    },
  });
}

export function useDeleteDemoRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteDemoRecordApi(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: demoRecordsKeys.all });
      notify.success("Record eliminato");
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Impossibile eliminare il record"));
    },
  });
}

export { DEMO_RECORDS_ENDPOINT };
