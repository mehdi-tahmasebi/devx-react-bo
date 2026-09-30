import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { colors } from "@/core/theme";

type FormRelatedSectionProps = {
  title: string;
  description?: string;
  layout?: "stack" | "grid";
  children: ReactNode;
};

export function FormRelatedSection({
  title,
  description,
  layout = "stack",
  children,
}: FormRelatedSectionProps) {
  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: "divider",
        pt: 3,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          mb: description ? 0.75 : 1.5,
          color: "text.secondary",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5, maxWidth: 560 }}
        >
          {description}
        </Typography>
      ) : null}
      {layout === "grid" ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(auto-fit, minmax(240px, 1fr))",
            },
            gap: 2,
          }}
        >
          {children}
        </Box>
      ) : (
        <Stack spacing={2.5}>{children}</Stack>
      )}
    </Box>
  );
}

type FormRelatedRowProps = {
  title: string;
  description: string;
  action: ReactNode;
};

export function FormRelatedRow({ title, description, action }: FormRelatedRowProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      alignItems={{ xs: "stretch", sm: "center" }}
      justifyContent="space-between"
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <Box sx={{ flexShrink: 0, alignSelf: { xs: "flex-start", sm: "center" } }}>
        {action}
      </Box>
    </Stack>
  );
}

type FormRelatedCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  action: ReactNode;
  disabled?: boolean;
};

export function FormRelatedCard({
  title,
  description,
  icon,
  action,
  disabled = false,
}: FormRelatedCardProps) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 2.5,
        minHeight: 196,
        borderRadius: 2,
        bgcolor: colors.surface.glassContent,
        border: `1px solid ${colors.border.glassCard}`,
        boxShadow: colors.shadow.cardSoft,
        opacity: disabled ? 0.82 : 1,
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
        ...(!disabled && {
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: colors.border.magentaSubtle,
            boxShadow: colors.shadow.cardHover,
          },
        }),
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 1.5,
          display: "grid",
          placeItems: "center",
          color: colors.text.inverse,
          background: disabled ? colors.fill.plum[16] : colors.gradient.brand,
          boxShadow: disabled ? "none" : colors.shadow.buttonSoft,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: colors.text.primary,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: 1.55,
            color: colors.text.secondary,
          }}
        >
          {description}
        </Typography>
      </Box>

      <Box sx={{ mt: "auto", pt: 0.5 }}>{action}</Box>
    </Box>
  );
}
