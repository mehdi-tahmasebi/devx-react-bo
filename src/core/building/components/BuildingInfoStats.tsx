import { Box, CircularProgress, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { colors } from "@/core/theme";
import {
  ConfirmationNumberOutlinedIcon,
  HandymanOutlinedIcon,
  PeopleOutlinedIcon,
  SpaOutlinedIcon,
} from "@/shared/icons";
import { useBuildingInfo } from "../building.hooks";
import { useBuildingStore } from "../building.store";
import type { BuildingInfoDto } from "../building.model";

type BuildingInfoStatsProps = {
  variant?: "inline" | "cards";
};

type StatItem = {
  key: keyof BuildingInfoDto;
  label: string;
  icon: ReactNode;
};

const STAT_ITEMS: StatItem[] = [
  {
    key: "userCount",
    label: "Utenti",
    icon: <PeopleOutlinedIcon sx={{ fontSize: 16 }} />,
  },
  {
    key: "amenityCount",
    label: "Spazi",
    icon: <SpaOutlinedIcon sx={{ fontSize: 16 }} />,
  },
  {
    key: "serviceCount",
    label: "Servizi",
    icon: <HandymanOutlinedIcon sx={{ fontSize: 16 }} />,
  },
  {
    key: "activeTicketCount",
    label: "Ticket attivi",
    icon: <ConfirmationNumberOutlinedIcon sx={{ fontSize: 16 }} />,
  },
  {
    key: "pendingTicketCount",
    label: "Ticket in attesa",
    icon: <ConfirmationNumberOutlinedIcon sx={{ fontSize: 16 }} />,
  },
];

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        bgcolor: colors.surface.glassContent,
        border: `1px solid ${colors.border.glassCard}`,
        boxShadow: colors.shadow.cardSoft,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          mb: 1.5,
          borderRadius: 1.5,
          display: "grid",
          placeItems: "center",
          color: colors.text.inverse,
          background: colors.gradient.brand,
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: colors.text.primary,
          mb: 0.5,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontSize: 13, color: colors.text.secondary }}>
        {label}
      </Typography>
    </Box>
  );
}

function StatInlineItem({
  label,
  value,
  showDivider,
}: {
  label: string;
  value: number;
  showDivider?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 1.25, sm: 1.5 },
        minWidth: 0,
        borderLeft: showDivider
          ? `1px solid ${colors.border.plumSubtle}`
          : "none",
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 800,
          lineHeight: 1.1,
          color: colors.text.primary,
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 600,
          color: colors.text.soft,
          whiteSpace: "nowrap",
          letterSpacing: "0.01em",
        }}
        noWrap
      >
        {label}
      </Typography>
    </Box>
  );
}

export function BuildingInfoStats({ variant = "inline" }: BuildingInfoStatsProps) {
  const buildingId = useBuildingStore((state) => state.buildingId);
  const { data: info, isLoading, isError } = useBuildingInfo(buildingId);

  if (buildingId == null) {
    return null;
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: variant === "inline" ? "flex-start" : "center",
          py: variant === "inline" ? 0 : 4,
          pl: variant === "inline" ? 0.5 : 0,
        }}
      >
        <CircularProgress size={variant === "inline" ? 18 : 24} />
      </Box>
    );
  }

  if (isError || !info) {
    if (variant === "inline") {
      return null;
    }

    return (
      <Typography
        sx={{
          fontSize: 13,
          color: colors.text.danger,
          textAlign: "center",
          py: 2,
        }}
      >
        Impossibile caricare le informazioni del building.
      </Typography>
    );
  }

  if (variant === "cards") {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            md: "repeat(5, 1fr)",
          },
          gap: 2,
        }}
      >
        {STAT_ITEMS.map((item) => (
          <StatCard
            key={item.key}
            label={item.label}
            value={info[item.key]}
            icon={item.icon}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-end" },
        minWidth: 0,
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      {STAT_ITEMS.map((item, index) => (
        <StatInlineItem
          key={item.key}
          label={item.label}
          value={info[item.key]}
          showDivider={index > 0}
        />
      ))}
    </Box>
  );
}
