import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { BuildingInfoStats, useBuildingStore } from "@/core/building";
import { useAuthMe } from "@/core/api/auth";
import { branding } from "@/core/branding";
import { demoRecordPaths } from "@/features/demo-record/routes";
import { demoLabelPaths } from "@/features/demo-record/demo-label/routes";
import { colors } from "@/core/theme";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Buongiorno";
  }

  if (hour < 18) {
    return "Buon pomeriggio";
  }

  return "Buonasera";
}

const quickLinks = [
  {
    title: "Record demo",
    description: "Lista, tabella, form e dettaglio con React Query.",
    to: demoRecordPaths.list,
  },
  {
    title: "Etichette demo",
    description: "Sottomodulo con dialog e store UI.",
    to: demoLabelPaths.list,
  },
];

export function HomePage() {
  const { data: user } = useAuthMe();
  const buildingId = useBuildingStore((state) => state.buildingId);
  const buildingLabel = useBuildingStore((state) => state.buildingLabel);

  const firstName = user?.displayName?.trim().split(/\s+/)[0];

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "flex-start", lg: "flex-end" },
          justifyContent: "space-between",
          gap: { xs: 2.5, lg: 4 },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: colors.text.soft,
              mb: 1,
            }}
          >
            {branding.productLabel}
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.125rem", lg: "2.5rem" },
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: colors.text.primary,
              mb: 1,
            }}
          >
            {getGreeting()}
            {firstName ? `, ${firstName}` : ""}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 15, lg: 16 },
              lineHeight: 1.65,
              color: colors.text.secondary,
              maxWidth: 560,
            }}
          >
            {buildingLabel
              ? `Workspace attivo: ${buildingLabel}. Apri un modulo di esempio dalla sidebar.`
              : "Sample backoffice: due moduli dimostrativi per il pattern feature-slice."}
          </Typography>
        </Box>

        {buildingId != null && (
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: "100%", lg: "auto" },
              px: { xs: 2, sm: 2.5 },
              py: { xs: 2, lg: 1.5 },
              borderRadius: 2,
              bgcolor: colors.fill.plum[4],
              border: `1px solid ${colors.border.plumSubtle}`,
            }}
          >
            <BuildingInfoStats variant="inline" />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          mt: 4,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 2,
        }}
      >
        {quickLinks.map((link) => (
          <Box
            key={link.to}
            component={RouterLink}
            to={link.to}
            sx={{
              p: 2.5,
              borderRadius: 2,
              textDecoration: "none",
              color: "inherit",
              border: `1px solid ${colors.border.glass}`,
              bgcolor: colors.surface.glassCard,
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: colors.shadow.cardHover,
              },
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{link.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {link.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
