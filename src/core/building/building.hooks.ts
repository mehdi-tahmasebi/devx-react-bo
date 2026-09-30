import { useQuery } from "@tanstack/react-query";
import { config } from "@/core/config";
import {
  demoGetWorkspaceInfo,
  demoListWorkspacesSelect,
} from "@/data/demo-store";
import { mapApiSelectOptions } from "@/core/api/select.utils";
import { useApiSelect } from "@/shared/hooks/useApiSelect";
import { useGet } from "@/shared/hooks/useGet";
import {
  BUILDINGS_SELECT_ENDPOINT,
  buildingContextKeys,
  buildingInfoEndpoint,
} from "./building.api";
import type { BuildingInfoDto } from "./building.model";

export function useBuildingsSelect(options?: { enabled?: boolean }) {
  const demoQuery = useQuery({
    queryKey: buildingContextKeys.select(),
    queryFn: async () => demoListWorkspacesSelect(),
    select: mapApiSelectOptions,
    enabled: config.useDemoApi && (options?.enabled ?? true),
  });

  const apiQuery = useApiSelect(BUILDINGS_SELECT_ENDPOINT, {
    enabled: !config.useDemoApi && (options?.enabled ?? true),
  });

  return config.useDemoApi ? demoQuery : apiQuery;
}

export function useBuildingInfo(buildingId: number | null) {
  const { apiSingle } = useGet();

  return useQuery({
    queryKey:
      buildingId != null
        ? buildingContextKeys.info(buildingId)
        : [...buildingContextKeys.all, "info", "none"],
    queryFn: async () => {
      if (config.useDemoApi && buildingId != null) {
        return demoGetWorkspaceInfo(buildingId);
      }

      return apiSingle<BuildingInfoDto>(buildingInfoEndpoint(buildingId!));
    },
    enabled: buildingId != null,
  });
}
