const timezoneApiUrl = import.meta.env.VITE_TIMEZONE_API_URL?.trim() ?? "";
const geocodingApiUrl = import.meta.env.VITE_GEOCODING_API_URL?.trim() ?? "";
const geocodingPhotonApiUrl =
  import.meta.env.VITE_PHOTON_GEOCODING_API_URL?.trim() ?? "";
const keycloakAuthority = import.meta.env.VITE_KEYCLOAK_AUTHORITY?.trim() ?? "";
const keycloakClientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID?.trim() ?? "";
const keycloakScope =
  import.meta.env.VITE_KEYCLOAK_SCOPE?.trim() || "openid profile email";

const useDemoApi = import.meta.env.VITE_USE_DEMO_API !== "false";

export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  useDemoApi,
  timezoneApiUrl,
  geocodingApiUrl,
  geocodingPhotonApiUrl,
  hasTimezoneApi: timezoneApiUrl.length > 0,
  hasGeocodingApi:
    geocodingApiUrl.length > 0 || geocodingPhotonApiUrl.length > 0,
  keycloakAuthority,
  keycloakClientId,
  keycloakScope,
  hasKeycloak: keycloakAuthority.length > 0 && keycloakClientId.length > 0,
} as const;

export { branding } from "@/core/branding";
