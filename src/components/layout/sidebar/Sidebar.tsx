import { Box, Drawer } from "@mui/material";
import { useLayout } from "@/components/layout/layout.context";
import { SHELL_RADIUS } from "@/components/layout/layout.tokens";
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
} from "./sidebar.config";
import { SidebarNav } from "./SidebarNav";
import { sidebarDockGlass, sidebarDrawerPaperSx } from "./sidebar.styles";

export function Sidebar() {
  const { isCollapsed, isMobileOpen, isDesktop, closeMobileSidebar } =
    useLayout();

  if (isDesktop) {
    const width = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

    return (
      <Box
        component="aside"
        sx={{
          width,
          flexShrink: 0,
          alignSelf: "stretch",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: `${SHELL_RADIUS}px`,
          overflow: "hidden",
          ...sidebarDockGlass,
        }}
      >
        <SidebarNav showLabels={!isCollapsed} />
      </Box>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={isMobileOpen}
      onClose={closeMobileSidebar}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", lg: "none" },
        "& .MuiDrawer-paper": {
          ...sidebarDrawerPaperSx,
          borderRadius: `0 ${SHELL_RADIUS}px ${SHELL_RADIUS}px 0`,
        },
      }}
    >
      <SidebarNav showLabels />
    </Drawer>
  );
}
