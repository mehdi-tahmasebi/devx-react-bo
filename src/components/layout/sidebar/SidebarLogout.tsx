import {
  Box,
  CircularProgress,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSignOut } from "@/core/api/auth";
import { colors } from "@/core/theme";
import { LogoutOutlinedIcon } from "@/shared/icons";

type SidebarLogoutProps = {
  showLabels: boolean;
  onAfterLogout?: () => void;
};

export function SidebarLogout({ showLabels, onAfterLogout }: SidebarLogoutProps) {
  const { mutate: signOut, isPending, isError } = useSignOut();
  const logout = colors.nav.logout;

  const handleLogout = () => {
    signOut(undefined, {
      onSettled: () => {
        onAfterLogout?.();
      },
    });
  };

  return (
    <Box sx={{ px: 1.25, pb: 1.25, pt: 0.5 }}>
      <ListItemButton
        onClick={handleLogout}
        disabled={isPending}
        aria-label="Esci"
        sx={{
          position: "relative",
          borderRadius: showLabels ? 1.5 : 1,
          minHeight: showLabels ? 52 : 44,
          width: showLabels ? "100%" : 44,
          mx: showLabels ? 0 : "auto",
          px: showLabels ? 1.75 : 0,
          justifyContent: showLabels ? "flex-start" : "center",
          overflow: "hidden",
          color: logout.color,
          border: "1px dashed",
          borderColor: logout.border,
          bgcolor: logout.bg,
          transition:
            "color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
          "&:hover": {
            bgcolor: logout.bgHover,
            borderColor: logout.borderHover,
            color: logout.colorHover,
          },
          "&.Mui-disabled": {
            opacity: 0.72,
            color: logout.color,
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: showLabels ? 36 : 0,
            width: showLabels ? 36 : 22,
            justifyContent: "center",
            color: "inherit",
            "& .MuiSvgIcon-root": {
              fontSize: 22,
            },
          }}
        >
          {isPending ? (
            <CircularProgress size={20} sx={{ color: "inherit" }} />
          ) : (
            <LogoutOutlinedIcon />
          )}
        </ListItemIcon>

        {showLabels && (
          <ListItemText
            primary={isPending ? "Uscita in corso…" : "Esci"}
            slotProps={{
              primary: {
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.01em",
                color: "inherit",
              },
            }}
          />
        )}
      </ListItemButton>

      {showLabels && isError && (
        <Typography
          sx={{
            mt: 1,
            px: 0.5,
            fontSize: 11,
            lineHeight: 1.4,
            color: colors.text.brand,
            textAlign: "center",
          }}
        >
          Logout temporaneamente non disponibile. Riprova tra poco.
        </Typography>
      )}
    </Box>
  );
}
