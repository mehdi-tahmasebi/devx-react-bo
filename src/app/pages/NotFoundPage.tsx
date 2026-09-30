import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AUTHENTICATED_ROOT } from "@/app/auth";
import { Button } from "@/components/ui/buttons";
import { branding } from "@/core/branding";
import { colors } from "@/core/theme";

const primaryButtonSx = {
  px: 3,
  py: 1.35,
  borderRadius: 1.5,
  fontSize: 15,
  fontWeight: 600,
  background: colors.gradient.brandReverse,
  "&:hover": {
    background: colors.gradient.brandHover,
    boxShadow: colors.shadow.buttonNotFound,
  },
};

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: { xs: "50vh", md: "58vh" },
        py: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 560,
          px: { xs: 3, sm: 4.5 },
          py: { xs: 4, sm: 5 },
          borderRadius: 2,
          overflow: "hidden",
          textAlign: "center",
          bgcolor: colors.surface.glassMedium,
          border: `1px solid ${colors.border.glassContent}`,
          boxShadow: colors.shadow.notFound,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `
              ${colors.overlay.glowRoseSoft},
              ${colors.overlay.glowPlumSoft}
            `,
          }}
        />

        <Box
          component="img"
          src={branding.logo}
          alt=""
          aria-hidden
          sx={{
            position: "relative",
            width: 120,
            height: "auto",
            mb: 2.5,
            opacity: 0.9,
            filter: colors.filter.dropPlum,
          }}
        />

        <Typography
          sx={{
            position: "relative",
            fontSize: { xs: "4rem", sm: "5rem" },
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            mb: 1.5,
            background: colors.gradient.brandReverse,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </Typography>

        <Typography
          sx={{
            position: "relative",
            fontSize: { xs: "1.5rem", sm: "1.75rem" },
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: colors.text.primary,
            mb: 1,
          }}
        >
          Pagina non trovata
        </Typography>

        <Typography
          sx={{
            position: "relative",
            fontSize: 15,
            lineHeight: 1.65,
            color: colors.text.secondary,
            mb: 3.5,
            maxWidth: 380,
            mx: "auto",
          }}
        >
          Questo percorso non esiste nel workspace. Controlla l&apos;indirizzo o
          torna alla dashboard.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(AUTHENTICATED_ROOT)}
          sx={primaryButtonSx}
        >
          Torna alla dashboard
        </Button>

        <Typography
          sx={{
            position: "relative",
            mt: 3.5,
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 600,
            color: colors.text.soft,
          }}
        >
          ERRORE 404
        </Typography>
      </Box>
    </Box>
  );
}
