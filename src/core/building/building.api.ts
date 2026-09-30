export const BUILDINGS_ENDPOINT = "/api/bo/v1/buildings";
export const BUILDINGS_SELECT_ENDPOINT = `${BUILDINGS_ENDPOINT}/select`;

export const buildingContextKeys = {
  all: ["building-context"] as const,
  select: () => [...buildingContextKeys.all, "select"] as const,
  info: (id: string | number) =>
    [...buildingContextKeys.all, "info", id] as const,
};

export function buildingInfoEndpoint(id: string | number) {
  return `${BUILDINGS_ENDPOINT}/${id}/info`;
}
