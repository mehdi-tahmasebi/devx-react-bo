export const AUTH_CALLBACK_PATH = "/authcallback";
export const GOODBYE_PATH = "/goodbye";
export const LOGIN_PATH = "/login";
export const AUTH_RETURN_URL_KEY = "devx.auth.returnUrl";

/** Pagine pubbliche di auth: mai usate come destinazione dopo il login. */
export const AUTH_PUBLIC_PATHS = new Set<string>([
  AUTH_CALLBACK_PATH,
  GOODBYE_PATH,
  LOGIN_PATH,
]);
