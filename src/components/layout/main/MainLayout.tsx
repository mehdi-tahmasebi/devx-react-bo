import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { LayoutProvider } from "@/components/layout/layout.store";
import { SHELL_GAP, SHELL_RADIUS } from "@/components/layout/layout.tokens";
import { Sidebar } from "@/components/layout/sidebar";
import { BuildingBootstrap } from "@/core/building";
import { colors } from "@/core/theme";

function AmbientBackdrop() {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: `
            ${colors.overlay.glowRoseLarge},
            ${colors.overlay.glowPlumLarge},
            ${colors.overlay.glowMagenta},
            ${colors.gradient.shellBackground}
          `,
        }}
      />
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.35,
          backgroundImage: colors.overlay.dotPlum,
          backgroundSize: "32px 32px",
        }}
      />
    </>
  );
}

function MainLayoutContent() {
  return (
    <Box sx={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
      <BuildingBootstrap />
      <AmbientBackdrop />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          height: "100%",
          minHeight: 0,
          overflow: "hidden",
          p: { xs: 0, lg: 2.25 },
          gap: { xs: 0, lg: `${SHELL_GAP}px` },
        }}
      >
        <Sidebar />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            overflow: "hidden",
            gap: { xs: 0, lg: `${SHELL_GAP}px` },
          }}
        >
          <Header />

          <Box
            component="main"
            sx={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              bgcolor: { xs: "transparent", lg: colors.surface.glassFrost },
              backdropFilter: { xs: "none", lg: "blur(20px)" },
              border: { xs: "none", lg: `1px solid ${colors.border.glassStrong}` },
              borderRadius: { xs: 0, lg: `${SHELL_RADIUS}px` },
              boxShadow: "none",
              p: { xs: 2, sm: 2.5, md: 3 },
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function MainLayout() {
  return (
    <LayoutProvider>
      <MainLayoutContent />
    </LayoutProvider>
  );
}
