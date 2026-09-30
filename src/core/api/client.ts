import axios, { type InternalAxiosRequestConfig } from "axios";
import { AUTH_PUBLIC_PATHS } from "@/core/auth/paths";
import {
  getAccessToken,
  getUserManager,
  signInRedirect,
} from "@/core/auth";
import {
  BUILDING_HEADER_NAME,
  shouldAttachBuildingHeader,
} from "@/core/building/building-header";
import { useBuildingStore } from "@/core/building/building.store";
import { config } from "@/core/config";
import { queryClient } from "@/core/store/query-client";

const AUTH_ME_QUERY_KEY = ["auth", "me"] as const;

function clearAuthSession() {
  queryClient.setQueryData(AUTH_ME_QUERY_KEY, null);
}

export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const multipartClient = axios.create({
  baseURL: config.apiBaseUrl,
});

function isAuthRoute(url?: string) {
  return Boolean(url?.includes("/api/auth/"));
}

function attachBuildingHeader(requestConfig: InternalAxiosRequestConfig) {
  if (requestConfig.skipBuildingHeader) {
    return requestConfig;
  }

  if (!shouldAttachBuildingHeader(requestConfig.url)) {
    return requestConfig;
  }

  if (requestConfig.overrideBuildingHeaderId != null) {
    requestConfig.headers.set(
      BUILDING_HEADER_NAME,
      String(requestConfig.overrideBuildingHeaderId),
    );
    return requestConfig;
  }

  const { buildingId } = useBuildingStore.getState();

  if (buildingId != null) {
    requestConfig.headers.set(BUILDING_HEADER_NAME, String(buildingId));
  }

  return requestConfig;
}

async function attachAuthHeader(requestConfig: InternalAxiosRequestConfig) {
  const token = await getAccessToken();

  if (token) {
    requestConfig.headers.set("Authorization", `Bearer ${token}`);
  }

  return attachBuildingHeader(requestConfig);
}

async function handleUnauthorized() {
  clearAuthSession();

  if (AUTH_PUBLIC_PATHS.has(window.location.pathname)) {
    return;
  }

  if (!config.hasKeycloak) {
    return;
  }

  try {
    await getUserManager().signinSilent();
  } catch {
    await signInRedirect();
  }
}

apiClient.interceptors.request.use(attachAuthHeader);
multipartClient.interceptors.request.use(attachAuthHeader);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !isAuthRoute(error.config?.url)
    ) {
      await handleUnauthorized();
    }

    return Promise.reject(error);
  },
);

multipartClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      await handleUnauthorized();
    }

    return Promise.reject(error);
  },
);
