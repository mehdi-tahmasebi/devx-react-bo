import { Box, Typography, keyframes } from "@mui/material";
import type { ReactNode } from "react";
import { branding } from "@/core/branding";
import { colors } from "@/core/theme";

const drift = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(24px, -18px) scale(1.06); }
  66% { transform: translate(-16px, 12px) scale(0.96); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.45; }
  50% { opacity: 0.75; }
`;

type AuthPageShellProps = {
  brandHeadline: ReactNode;
  brandSubheadline?: ReactNode;
  brandFooterLabel?: string;
  children: ReactNode;
};

function BrandPanel({
  brandHeadline,
  brandSubheadline,
  brandFooterLabel,
}: Pick<
  AuthPageShellProps,
  "brandHeadline" | "brandSubheadline" | "brandFooterLabel"
>) {
  const footerLabel = brandFooterLabel ?? branding.productLabel;
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flex: 1.1,
        position: "relative",
        overflow: "hidden",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 6,
        color: colors.text.inverse,
        background: colors.gradient.authPanel,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: colors.overlay.dotWhite,
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          top: "-12%",
          right: "-8%",
          background: colors.overlay.glowBlush,
          animation: `${drift} 14s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          bottom: "8%",
          left: "-10%",
          background: colors.overlay.glowMagentaCircle,
          animation: `${drift} 18s ease-in-out infinite reverse`,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          component="img"
          src={branding.logo}
          alt={branding.name}
          sx={{
            width: 200,
            maxWidth: "100%",
            height: "auto",
            filter: colors.filter.dropDark,
            borderRadius: 1,
          }}
        />
      </Box>

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 420 }}>
        {brandHeadline}
        {brandSubheadline}
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: 3,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: colors.surface.authAccent,
            animation: `${pulse} 2.4s ease-in-out infinite`,
          }}
        />
        <Typography sx={{ fontSize: 13, opacity: 0.65, letterSpacing: "0.06em" }}>
          {footerLabel}
        </Typography>
      </Box>
    </Box>
  );
}

export function AuthPageShell({
  brandHeadline,
  brandSubheadline,
  brandFooterLabel,
  children,
}: AuthPageShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: colors.surface.authForm,
      }}
    >
      <BrandPanel
        brandHeadline={brandHeadline}
        brandSubheadline={brandSubheadline}
        brandFooterLabel={brandFooterLabel}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 3, sm: 6, md: 8, lg: 10 },
          py: { xs: 5, md: 6 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: 24, md: "auto" },
            right: -80,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: colors.overlay.glowRoseCircle,
            pointerEvents: "none",
          }}
        />

        <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}

export function AuthPageMobileBrand() {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        gap: 1.5,
        mb: 4,
      }}
    >
      <Box
        component="img"
        src={branding.logo}
        alt={branding.name}
        sx={{
          width: 140,
          height: "auto",
          borderRadius: 1,
        }}
      />
    </Box>
  );
}

export function AuthPageGradientText({ children }: { children: ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        display: "block",
        background: colors.gradient.authAccent,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </Box>
  );
}
