import type { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BuildingStore = {
  ownerUserId: string | null;
  buildingId: number | null;
  buildingLabel: string | null;
  hasHydrated: boolean;
  /** Not persisted — freezes the header BuildingSelector while a dialog/form needs it. */
  selectorLocked: boolean;

  setBuilding: (id: number, label: string) => void;
  clearBuilding: () => void;
  syncForUser: (userId: string) => void;
  setHasHydrated: (value: boolean) => void;
  lockSelector: () => void;
  unlockSelector: () => void;
};

export const useBuildingStore = create<BuildingStore>()(
  persist(
    (set, get) => ({
      ownerUserId: null,
      buildingId: null,
      buildingLabel: null,
      hasHydrated: false,
      selectorLocked: false,

      setBuilding: (id, label) =>
        set({ buildingId: id, buildingLabel: label }),

      clearBuilding: () => set({ buildingId: null, buildingLabel: null }),

      syncForUser: (userId) => {
        const { ownerUserId } = get();

        if (ownerUserId && ownerUserId !== userId) {
          set({
            ownerUserId: userId,
            buildingId: null,
            buildingLabel: null,
          });
          return;
        }

        set({ ownerUserId: userId });
      },

      setHasHydrated: (value) => set({ hasHydrated: value }),

      lockSelector: () => set({ selectorLocked: true }),

      unlockSelector: () => set({ selectorLocked: false }),
    }),
    {
      name: "devx-react-bo-building",
      partialize: (state) => ({
        ownerUserId: state.ownerUserId,
        buildingId: state.buildingId,
        buildingLabel: state.buildingLabel,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

const BUILDING_SCOPED_QUERY_ROOTS = [
  "demo-records",
  "demo-labels",
  "building-context",
] as const;

export function invalidateBuildingScopedQueries(queryClient: QueryClient) {
  for (const rootKey of BUILDING_SCOPED_QUERY_ROOTS) {
    void queryClient.invalidateQueries({ queryKey: [rootKey] });
  }
}
