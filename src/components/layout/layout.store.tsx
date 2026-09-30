import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { LayoutContext } from "@/components/layout/layout.context";

export function LayoutProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (isDesktop) {
      setIsCollapsed((current) => !current);
      return;
    }

    setIsMobileOpen((current) => !current);
  }, [isDesktop]);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isCollapsed,
      isMobileOpen,
      isDesktop,
      toggleSidebar,
      closeMobileSidebar,
    }),
    [
      isCollapsed,
      isMobileOpen,
      isDesktop,
      toggleSidebar,
      closeMobileSidebar,
    ],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
