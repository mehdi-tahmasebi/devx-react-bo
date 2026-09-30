import { Box, Typography } from "@mui/material";
import { Button } from "@/components/ui/buttons";
import { AuthPageShell } from "@/components/ui/page";
import { branding } from "@/core/branding";
import { signInRedirect } from "@/core/auth";
import { getErrorMessage, notify } from "@/core/notifications";
import { colors } from "@/core/theme";

export function GoodbyePage() {
  return (
    <AuthPageShell
      brandHeadline={
        <Typography
          sx={{
            fontSize: { md: "2.5rem", lg: "3rem" },
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            mb: 2,
          }}
        >
          {branding.name}
        </Typography>
      }
      brandSubheadline={
        <Typography sx={{ fontSize: 16, lineHeight: 1.7, opacity: 0.78 }}>
          {branding.description}
        </Typography>
      }
    >
      <Box sx={{ maxWidth: 480 }}>
        <Typography
          sx={{
            fontSize: { xs: "1.75rem", sm: "2rem" },
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            mb: 1.5,
            color: colors.text.primary,
          }}
        >
          Grazie per aver utilizzato il backoffice
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 4, fontSize: 15 }}>
          La tua sessione locale è stata chiusa. Puoi accedere di nuovo quando
          vuoi.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => {
            signInRedirect().catch((error) => {
              notify.error(
                getErrorMessage(
                  error,
                  "Impossibile avviare l'accesso. Riprova.",
                ),
              );
            });
          }}
          sx={{
            py: 1.5,
            px: 3,
            borderRadius: 1.5,
            fontSize: 16,
            color: colors.text.inverse,
            background: colors.gradient.login,
            "&:hover": {
              background: colors.gradient.loginHover,
              boxShadow: colors.shadow.button,
              color: colors.text.inverse,
            },
          }}
        >
          Accedi di nuovo
        </Button>
      </Box>
    </AuthPageShell>
  );
}
