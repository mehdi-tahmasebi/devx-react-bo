const BUILDING_HEADER_EXEMPT_SUFFIXES = [
  "/api/auth/",
  "/api/bo/v1/buildings/select",
  // Global service category catalog (not building-scoped).
  "/api/bo/v1/services/categories",
] as const;

export const BUILDING_HEADER_NAME = "idBuilding";

export function shouldAttachBuildingHeader(url?: string): boolean {
  if (!url) {
    return false;
  }

  if (BUILDING_HEADER_EXEMPT_SUFFIXES.some((suffix) => url.includes(suffix))) {
    return false;
  }

  return url.includes("/api/bo/");
}
