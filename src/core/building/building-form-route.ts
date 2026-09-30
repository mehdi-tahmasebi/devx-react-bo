import { useLocation } from "react-router-dom";

/**
 * True on create/edit (and invite) form routes. The header BuildingSelector
 * is frozen so the operator cannot change building while a form is open.
 */
export function isBuildingScopedFormRoute(pathname: string): boolean {
  return (
    pathname.endsWith("/new") ||
    pathname.endsWith("/invite") ||
    /\/[^/]+\/edit$/.test(pathname)
  );
}

export function useIsBuildingScopedFormRoute(): boolean {
  const { pathname } = useLocation();
  return isBuildingScopedFormRoute(pathname);
}
