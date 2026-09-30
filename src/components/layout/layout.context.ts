import { createContext, useContext } from "react";

export type LayoutContextValue = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isDesktop: boolean;
  toggleSidebar: () => void;
  closeMobileSidebar: () => void;
};

export const LayoutContext = createContext<LayoutContextValue | null>(null);

export function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }

  return context;
}
