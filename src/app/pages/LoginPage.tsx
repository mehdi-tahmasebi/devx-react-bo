import {
  Alert,
  Box,
  Collapse,
  IconButton,
  Stack,
  Typography,
  type SvgIconProps,
} from "@mui/material";
import axios from "axios";
import { useState, type ChangeEvent, type ReactNode, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AUTHENTICATED_ROOT } from "@/app/auth";
import { Button } from "@/components/ui/buttons";
import {
  AuthPageGradientText,
  AuthPageMobileBrand,
  AuthPageShell,
} from "@/components/ui/page";
import { useSignIn } from "@/core/api/auth";
import { branding } from "@/core/branding";
import { colors } from "@/core/theme";
import {
  EmailOutlinedIcon,
  LockOutlinedIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "@/shared/icons";

type LoginFieldProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  autoComplete: string;
  icon: React.ComponentType<SvgIconProps>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  endAction?: ReactNode;
};

function LoginField({
  id,
  label,
  type,
  value,
  autoComplete,
  icon: Icon,
  onChange,
  endAction,
}: LoginFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <Box>
      <Typography
        component="label"
        htmlFor={id}
        sx={{
          display: "block",
          mb: 1,
          fontSize: 13,
          fontWeight: 600,
          color: colors.text.label,
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 52,
          pl: 1.75,
          pr: endAction ? 0.75 : 1.75,
          gap: 1.25,
          borderRadius: 1.5,
          bgcolor: colors.surface.paper,
          border: "1px solid",
          borderColor: focused ? colors.text.brand : colors.border.default,
          boxShadow: focused ? colors.shadow.focus : colors.shadow.input,
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <Icon
          fontSize="small"
          sx={{
            color: focused ? colors.text.brand : colors.text.soft,
            flexShrink: 0,
            transition: "color 0.2s ease",
          }}
        />

        <Box
          component="input"
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          sx={{
            flex: 1,
            minWidth: 0,
            border: 0,
            outline: 0,
            bgcolor: "transparent",
            fontSize: 15,
            lineHeight: 1.5,
            color: colors.text.primary,
            fontFamily: "inherit",
            "&::placeholder": {
              color: colors.text.placeholder,
            },
          }}
        />

        {endAction}
      </Box>
    </Box>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { mutate: signIn, isPending } = useSignIn();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    signIn(
      { username, password },
      {
        onSuccess: () => navigate(AUTHENTICATED_ROOT, { replace: true }),
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const message =
              (error.response?.data as { message?: string } | undefined)
                ?.message ?? "Nome utente o password non validi.";
            setErrorMessage(message);
            return;
          }

          if (error instanceof Error && error.message) {
            setErrorMessage(error.message);
            return;
          }

          setErrorMessage("Impossibile accedere. Riprova.");
        },
      },
    );
  };

  return (
    <AuthPageShell
      brandFooterLabel="SESSIONE SICURA · COOKIE HTTPONLY"
      brandHeadline={
        <Typography
          sx={{
            fontSize: { md: "3.25rem", lg: "3.75rem" },
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            mb: 2,
          }}
        >
          Gestisci
          <AuthPageGradientText>le operazioni.</AuthPageGradientText>
        </Typography>
      }
      brandSubheadline={
        <Typography sx={{ fontSize: 16, lineHeight: 1.7, opacity: 0.78 }}>
          {branding.description}
        </Typography>
      }
    >
      <Box component="form" onSubmit={handleSubmit}>
        <AuthPageMobileBrand />

        <Typography
          sx={{
            fontSize: { xs: "2rem", sm: "2.35rem" },
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            mb: 1,
            color: colors.text.primary,
          }}
        >
          Accedi
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 4, fontSize: 15 }}>
          Usa le credenziali del workspace per continuare.
        </Typography>

        <Collapse in={Boolean(errorMessage)}>
          <Alert severity="error" sx={{ mb: 3, borderRadius: 1.5 }}>
            {errorMessage}
          </Alert>
        </Collapse>

        <Stack spacing={2}>
          <LoginField
            id="username"
            label="Nome utente"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            icon={EmailOutlinedIcon}
          />

          <LoginField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            icon={LockOutlinedIcon}
            endAction={
              <IconButton
                type="button"
                aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                onClick={() => setShowPassword((current) => !current)}
                size="small"
                sx={{
                  color: colors.text.soft,
                  "&:hover": {
                    color: colors.text.brand,
                    bgcolor: colors.fill.magenta[6],
                  },
                }}
              >
                {showPassword ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </IconButton>
            }
          />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isPending}
          sx={{
            mt: 3.5,
            py: 1.5,
            borderRadius: 1.5,
            fontSize: 16,
            color: colors.text.inverse,
            background: colors.gradient.login,
            "&:hover": {
              background: colors.gradient.loginHover,
              boxShadow: colors.shadow.button,
              color: colors.text.inverse,
            },
            "&.Mui-disabled": {
              background: colors.gradient.login,
              color: colors.text.inverse,
              opacity: 0.75,
            },
          }}
        >
          {isPending ? "Accesso in corso…" : "Entra nel workspace"}
        </Button>

        <Typography
          sx={{
            mt: 4,
            fontSize: 12,
            color: "text.secondary",
            textAlign: "center",
            letterSpacing: "0.04em",
          }}
        >
          Ambiente protetto · Solo personale autorizzato
        </Typography>
      </Box>
    </AuthPageShell>
  );
}
