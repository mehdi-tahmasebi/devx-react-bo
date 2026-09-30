import {
  UserManager,
  WebStorageStateStore,
  type OidcMetadata,
} from "oidc-client-ts";
import {
  AUTH_CALLBACK_PATH,
  AUTH_PUBLIC_PATHS,
  AUTH_RETURN_URL_KEY,
} from "@/core/auth/paths";
import { config } from "@/core/config";

let userManager: UserManager | null = null;

function getRedirectUri(): string {
  return `${window.location.origin}${AUTH_CALLBACK_PATH}`;
}

/**
 * In dev the app and Keycloak live on different origins, so the browser blocks the
 * token request. Vite proxies `/auth/*` to Keycloak: the endpoints called with fetch
 * point at that same-origin proxy, while `issuer` keeps the real value expected in
 * the ID token and the login page is reached directly on Keycloak.
 */
function buildProxiedMetadata(
  authority: string,
): Partial<OidcMetadata> | undefined {
  if (!import.meta.env.DEV) {
    return undefined;
  }

  let authorityUrl: URL;

  try {
    authorityUrl = new URL(authority);
  } catch {
    return undefined;
  }

  if (authorityUrl.origin === window.location.origin) {
    return undefined;
  }

  const issuer = authority.replace(/\/$/, "");
  const proxied = `${window.location.origin}${authorityUrl.pathname.replace(/\/$/, "")}`;

  return {
    issuer,
    authorization_endpoint: `${issuer}/protocol/openid-connect/auth`,
    end_session_endpoint: `${issuer}/protocol/openid-connect/logout`,
    token_endpoint: `${proxied}/protocol/openid-connect/token`,
    userinfo_endpoint: `${proxied}/protocol/openid-connect/userinfo`,
    jwks_uri: `${proxied}/protocol/openid-connect/certs`,
  };
}

export function getUserManager(): UserManager {
  if (!config.hasKeycloak) {
    throw new Error(
      "Keycloak non configurato: impostare VITE_KEYCLOAK_AUTHORITY e VITE_KEYCLOAK_CLIENT_ID",
    );
  }

  if (!userManager) {
    userManager = new UserManager({
      authority: config.keycloakAuthority,
      client_id: config.keycloakClientId,
      redirect_uri: getRedirectUri(),
      response_type: "code",
      scope: config.keycloakScope,
      automaticSilentRenew: true,
      metadata: buildProxiedMetadata(config.keycloakAuthority),
      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    });
  }

  return userManager;
}

export async function getAccessToken(): Promise<string | null> {
  if (!config.hasKeycloak) {
    return null;
  }

  const user = await getUserManager().getUser();
  if (!user || user.expired) {
    return null;
  }

  return user.access_token;
}

export function saveReturnUrl(url: string): void {
  sessionStorage.setItem(AUTH_RETURN_URL_KEY, url);
}

export function consumeReturnUrl(): string {
  const url = sessionStorage.getItem(AUTH_RETURN_URL_KEY);
  sessionStorage.removeItem(AUTH_RETURN_URL_KEY);

  if (!url || !url.startsWith("/")) {
    return "/";
  }

  return AUTH_PUBLIC_PATHS.has(url.split("?")[0]) ? "/" : url;
}

export async function signInRedirect(): Promise<void> {
  if (AUTH_PUBLIC_PATHS.has(window.location.pathname)) {
    sessionStorage.removeItem(AUTH_RETURN_URL_KEY);
  } else {
    saveReturnUrl(window.location.pathname + window.location.search);
  }

  await getUserManager().signinRedirect();
}

export async function handleSignInCallback(): Promise<void> {
  await getUserManager().signinRedirectCallback();
}

export async function signOutLocal(): Promise<void> {
  const manager = getUserManager();
  const user = await manager.getUser();

  if (user) {
    await manager.removeUser();
  }

  sessionStorage.removeItem(AUTH_RETURN_URL_KEY);
}
