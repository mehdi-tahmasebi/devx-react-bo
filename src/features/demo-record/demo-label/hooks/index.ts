import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage, notify } from "@/core/notifications";
import {
  deleteDemoLabelApi,
  demoLabelsKeys,
  fetchDemoLabelsList,
  fetchDemoLabelsSelect,
  postDemoLabel,
  putDemoLabel,
} from "../api";
import type { DemoLabelRequestDto } from "../model";
import { demoRecordsKeys } from "../../api";

export function useDemoLabelsList(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: demoLabelsKeys.list(params),
    queryFn: () => fetchDemoLabelsList(params),
  });
}

export function useDemoLabelsSelect() {
  return useQuery({
    queryKey: demoLabelsKeys.select(),
    queryFn: fetchDemoLabelsSelect,
  });
}

export function useCreateDemoLabel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: DemoLabelRequestDto) => postDemoLabel(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: demoLabelsKeys.all });
      await queryClient.invalidateQueries({ queryKey: demoRecordsKeys.all });
      notify.success("Etichetta creata");
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Impossibile creare l'etichetta"));
    },
  });
}

export function useUpdateDemoLabel(id: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: DemoLabelRequestDto) => putDemoLabel(id, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: demoLabelsKeys.all });
      await queryClient.invalidateQueries({ queryKey: demoRecordsKeys.all });
      notify.success("Etichetta aggiornata");
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Impossibile aggiornare l'etichetta"));
    },
  });
}

export function useDeleteDemoLabel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteDemoLabelApi(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: demoLabelsKeys.all });
      await queryClient.invalidateQueries({ queryKey: demoRecordsKeys.all });
      notify.success("Etichetta eliminata");
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Impossibile eliminare l'etichetta"));
    },
  });
}
