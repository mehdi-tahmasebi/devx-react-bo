import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { BuildingInfoStats, BuildingSelector } from "@/core/building";
import { useLayout } from "@/components/layout/layout.context";
import { SHELL_HEADER_HEIGHT, SHELL_RADIUS } from "@/components/layout/layout.tokens";
import { useAuthMe } from "@/core/api/auth";
import { colors } from "@/core/theme";
import { MenuIcon } from "@/shared/icons";

function resolveUserLabel(user: {
  displayName?: string;
  username?: string;
  email?: string;
}) {
  const displayName = user.displayName?.trim();
  if (displayName) {
    return displayName;
  }

  const username = user.username?.trim();
  if (username) {
    return username;
  }

  const email = user.email?.trim();
  if (email) {
    return email.split("@")[0] ?? email;
  }

  return "Utente";
}

function getInitials(label: string | undefined) {
  const parts = (label ?? "").trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function Header() {
  const { toggleSidebar } = useLayout();
  const { data: user } = useAuthMe();
  const userLabel = user ? resolveUserLabel(user) : null;

  return (
    <Box
      component="header"
      sx={{
        flexShrink: 0,
        minHeight: { xs: 60, lg: SHELL_HEADER_HEIGHT },
        display: "flex",
        alignItems: "stretch",
        borderRadius: { xs: 0, lg: `${SHELL_RADIUS}px` },
        overflow: "hidden",
        bgcolor: {
          xs: colors.surface.glassHeaderMobile,
          lg: colors.surface.glassHeader,
        },
        backdropFilter: "blur(22px)",
        border: { xs: "none", lg: `1px solid ${colors.border.glass}` },
        borderBottom: {
          xs: `1px solid ${colors.border.default}`,
          lg: `1px solid ${colors.border.glass}`,
        },
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: colors.gradient.headerSheen,
        }}
      />

      <Box
        sx={{
          position: "relative",
          flex: 1,
          display: "grid",
          gridTemplateColumns: {
            xs: "auto 1fr auto",
            md: "auto minmax(0, 1fr) auto",
          },
          gridTemplateRows: {
            xs: "auto auto",
            md: "auto",
          },
          alignItems: "center",
          columnGap: { xs: 1.25, sm: 2 },
          rowGap: { xs: 1.25, md: 0 },
          px: { xs: 1.5, sm: 2.25, lg: 2.5 },
          py: { xs: 1, lg: 0 },
        }}
      >
        <IconButton
          aria-label="Apri o chiudi barra laterale"
          onClick={toggleSidebar}
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,
            color: colors.text.accent,
            borderRadius: 1.5,
            border: `1px solid ${colors.border.plumSoft}`,
            bgcolor: colors.surface.glassLight,
            transition: "all 0.22s ease",
            gridColumn: { xs: "1 / 2", md: "1 / 2" },
            gridRow: { xs: "1 / 2", md: "1 / 2" },
            "&:hover": {
              borderColor: colors.fill.magenta[35],
              color: colors.text.brand,
              bgcolor: colors.fill.magenta[6],
              transform: "rotate(-4deg)",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(300px, 420px) minmax(0, 1fr)",
            },
            alignItems: "center",
            gap: { xs: 1, md: 2 },
            width: "100%",
            minWidth: 0,
            px: { md: 0.5 },
            gridColumn: {
              xs: "1 / -1",
              md: "2 / 3",
            },
            gridRow: {
              xs: "2 / 3",
              md: "1 / 2",
            },
          }}
        >
          <BuildingSelector fullWidth />
          <BuildingInfoStats variant="inline" />
        </Box>

        {user && userLabel && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              pl: 1.25,
              pr: 0.75,
              py: 0.65,
              borderRadius: 999,
              border: `1px solid ${colors.border.plumSubtle}`,
              bgcolor: colors.surface.glassContent,
              boxShadow: colors.shadow.insetGlass,
              maxWidth: { xs: 54, sm: 300 },
              overflow: "hidden",
              flexShrink: 0,
              justifySelf: { md: "end" },
              gridColumn: { xs: "3 / 4", md: "3 / 4" },
              gridRow: { xs: "1 / 2", md: "1 / 2" },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                fontSize: 13,
                fontWeight: 700,
                background: colors.gradient.brand,
                boxShadow: colors.shadow.avatar,
              }}
            >
              {getInitials(userLabel)}
            </Avatar>

            <Box
              sx={{
                minWidth: 0,
                pr: 0.5,
                display: { xs: "none", sm: "block" },
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: colors.text.primary,
                  lineHeight: 1.25,
                }}
                noWrap
              >
                {userLabel}
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  color: colors.text.soft,
                  lineHeight: 1.25,
                  letterSpacing: "0.02em",
                }}
                noWrap
              >
                {user.email || user.username}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
