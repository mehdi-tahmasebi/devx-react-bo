import { useEffect, useRef } from "react";
import { useAuthMe } from "@/core/api/auth";
import { useBuildingsSelect } from "../building.hooks";
import { useBuildingStore } from "../building.store";

export function BuildingBootstrap() {
  const { data: user } = useAuthMe();
  const hasHydrated = useBuildingStore((state) => state.hasHydrated);
  const buildingId = useBuildingStore((state) => state.buildingId);
  const syncForUser = useBuildingStore((state) => state.syncForUser);
  const setBuilding = useBuildingStore((state) => state.setBuilding);
  const clearBuilding = useBuildingStore((state) => state.clearBuilding);
  const autoSelectedRef = useRef(false);

  const { data: options = [], isSuccess } = useBuildingsSelect({
    enabled: Boolean(user) && hasHydrated,
  });

  useEffect(() => {
    if (user) {
      syncForUser(user.userId);
      autoSelectedRef.current = false;
    }
  }, [user, syncForUser]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    if (buildingId != null) {
      const match = options.find((option) => option.value === buildingId);

      if (!match) {
        clearBuilding();
        autoSelectedRef.current = false;
        return;
      }

      if (useBuildingStore.getState().buildingLabel !== match.label) {
        setBuilding(buildingId, match.label);
      }

      return;
    }

    if (options.length === 1 && !autoSelectedRef.current) {
      const [onlyOption] = options;
      setBuilding(Number(onlyOption.value), onlyOption.label);
      autoSelectedRef.current = true;
    }
  }, [
    buildingId,
    clearBuilding,
    isSuccess,
    options,
    setBuilding,
  ]);

  return null;
}
