/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TIMEZONE_API_URL?: string;
  readonly VITE_GEOCODING_API_URL?: string;
  readonly VITE_PHOTON_GEOCODING_API_URL?: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_DESCRIPTION?: string;
  readonly VITE_APP_PRODUCT_LABEL?: string;
  readonly VITE_APP_FAVICON?: string;
  readonly VITE_APP_FAVICON_TYPE?: string;
  readonly VITE_KEYCLOAK_AUTHORITY?: string;
  readonly VITE_KEYCLOAK_CLIENT_ID?: string;
  readonly VITE_KEYCLOAK_SCOPE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
