import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLayout } from "@/components/layout/layout.context";
import { branding } from "@/core/branding";
import { colors } from "@/core/theme";
import { ExpandMoreIcon } from "@/shared/icons";
import {
  allSidebarLinks,
  isSidebarGroupActive,
  isSidebarLinkActive,
  sidebarNavGroups,
  type SidebarNavGroup,
  type SidebarNavLink,
} from "./sidebar.config";
import {
  sidebarCollapsedChildSx,
  sidebarCollapsedGroupLabelColorSx,
  sidebarCollapsedGroupSx,
  sidebarCollapsedIconSx,
  sidebarCollapsedPipeSx,
  sidebarGroupHeaderSx,
  sidebarSubmenuLinkSx,
} from "./sidebar.styles";
import { SidebarLogout } from "./SidebarLogout";

type SidebarNavProps = {
  showLabels: boolean;
};

export function SidebarNav({ showLabels }: SidebarNavProps) {
  const { closeMobileSidebar, isDesktop } = useLayout();
  const onNavigate = !isDesktop ? closeMobileSidebar : undefined;

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SidebarBrand showLabels={showLabels} />

      <Box
        sx={{
          mx: 1.25,
          mb: 1.25,
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          bgcolor: colors.surface.glassPanel,
          border: `1px solid ${colors.border.glassPanel}`,
          overflow: "hidden",
        }}
      >
        <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", py: 0.75 }}>
          <NavList
            key={showLabels ? "expanded" : "collapsed"}
            showLabels={showLabels}
            onNavigate={onNavigate}
          />
        </Box>
      </Box>

      <SidebarLogout showLabels={showLabels} onAfterLogout={onNavigate} />
    </Box>
  );
}

function SidebarBrand({ showLabels }: { showLabels: boolean }) {
  const logoSrc = showLabels
    ? branding.sidebarLogo
    : branding.sidebarLogoCollapsed;
  const isMark = !showLabels;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: showLabels ? "flex-start" : "center",
        gap: 1.25,
        px: showLabels ? 2 : 1.25,
        py: 2.25,
        minHeight: 72,
      }}
    >
      <Box
        component="img"
        src={logoSrc}
        alt={branding.name}
        sx={{
          width: showLabels ? 168 : isMark ? 32 : 44,
          height: "auto",
          flexShrink: 0,
          borderRadius: isMark ? 0 : 1,
        }}
      />
    </Box>
  );
}

const DEFAULT_OPEN_SIDEBAR_GROUP = "Gestione";

function findActiveGroupLabel(pathname: string): string | null {
  return (
    sidebarNavGroups.find((group) => isSidebarGroupActive(group, pathname))
      ?.label ?? null
  );
}

function NavList({
  showLabels,
  onNavigate,
}: {
  showLabels: boolean;
  onNavigate?: () => void;
}) {
  const { pathname } = useLocation();
  const groups = sidebarNavGroups;
  const activeGroupLabel = findActiveGroupLabel(pathname);
  const [expandedOpenLabel, setExpandedOpenLabel] = useState<string | null>(
    () => activeGroupLabel ?? DEFAULT_OPEN_SIDEBAR_GROUP,
  );
  const [collapsedAccordion, setCollapsedAccordion] = useState<{
    openLabel: string | null;
    pathname: string;
  } | null>(null);

  useEffect(() => {
    if (!showLabels || !activeGroupLabel) {
      return;
    }

    setExpandedOpenLabel(activeGroupLabel);
  }, [pathname, activeGroupLabel, showLabels]);

  const collapsedOpenLabel = showLabels
    ? null
    : collapsedAccordion?.pathname === pathname
      ? collapsedAccordion.openLabel
      : activeGroupLabel;

  const isGroupOpen = (group: SidebarNavGroup) => {
    if (showLabels) {
      return expandedOpenLabel === group.label;
    }

    return collapsedOpenLabel === group.label;
  };

  const toggleGroup = (group: SidebarNavGroup) => {
    if (showLabels) {
      setExpandedOpenLabel((current) =>
        current === group.label ? null : group.label,
      );
      return;
    }

    const isCurrentlyOpen = collapsedOpenLabel === group.label;
    setCollapsedAccordion({
      openLabel: isCurrentlyOpen ? null : group.label,
      pathname,
    });
  };

  return (
    <List component="nav" disablePadding sx={{ px: 1, py: 1 }}>
      {groups.map((group) => (
        <NavGroup
          key={group.label}
          group={group}
          showLabels={showLabels}
          isOpen={isGroupOpen(group)}
          pathname={pathname}
          onToggle={() => toggleGroup(group)}
          onNavigate={onNavigate}
        />
      ))}
    </List>
  );
}

function NavGroup({
  group,
  showLabels,
  isOpen,
  pathname,
  onToggle,
  onNavigate,
}: {
  group: SidebarNavGroup;
  showLabels: boolean;
  isOpen: boolean;
  pathname: string;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const Icon = group.icon;
  const hasActiveChild = isSidebarGroupActive(group, pathname);

  if (!showLabels) {
    return (
      <Box sx={{ mb: 1.25 }}>
        <Tooltip title={group.label} placement="right">
          <ListItemButton
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-label={group.label}
            sx={sidebarCollapsedGroupSx(isOpen, hasActiveChild)}
          >
            <ListItemIcon sx={sidebarCollapsedIconSx}>
              <Icon />
            </ListItemIcon>
            <ExpandMoreIcon
              sx={{
                fontSize: 14,
                color: "inherit",
                opacity: 0.75,
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </ListItemButton>
        </Tooltip>

        {isOpen ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 0.5,
            }}
          >
            <Box sx={{ ...sidebarCollapsedPipeSx, height: 10, my: 0.25 }} />

            <Typography sx={sidebarCollapsedGroupLabelColorSx(isOpen)}>
              {group.label}
            </Typography>

            <Box sx={{ ...sidebarCollapsedPipeSx, height: 10, my: 0.25 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              {group.children.map((child, index) => (
                <Box
                  key={child.to}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CollapsedNavLinkItem
                    item={child}
                    isActive={isSidebarLinkActive(
                      pathname,
                      child.to,
                      allSidebarLinks,
                    )}
                    onNavigate={onNavigate}
                  />
                  {index < group.children.length - 1 ? (
                    <Box
                      sx={{
                        ...sidebarCollapsedPipeSx,
                        height: 10,
                        my: 0.25,
                      }}
                    />
                  ) : null}
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
      <ListItemButton
        onClick={onToggle}
        aria-expanded={isOpen}
        sx={sidebarGroupHeaderSx(isOpen, hasActiveChild)}
      >
        <ListItemIcon
          sx={{
            minWidth: 32,
            color: "inherit",
            "& .MuiSvgIcon-root": { fontSize: 20 },
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={group.label}
          slotProps={{
            primary: {
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            },
          }}
        />
        <ExpandMoreIcon
          sx={{
            fontSize: 20,
            color: "inherit",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </ListItemButton>

      {isOpen ? (
        <List
          disablePadding
          sx={{
            pl: 1.25,
            pr: 0.5,
            pt: 0.25,
            pb: 0.5,
            display: "flex",
            flexDirection: "column",
            gap: 0.25,
            borderLeft: `2px solid ${colors.nav.submenuBorder}`,
            ml: 2.25,
          }}
        >
          {group.children.map((child) => (
            <NavLinkItem
              key={child.to}
              item={child}
              isActive={isSidebarLinkActive(
                pathname,
                child.to,
                allSidebarLinks,
              )}
              onNavigate={onNavigate}
            />
          ))}
        </List>
      ) : null}
    </Box>
  );
}

function CollapsedNavLinkItem({
  item,
  isActive,
  onNavigate,
}: {
  item: SidebarNavLink;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  return (
    <Tooltip title={item.label} placement="right">
      <ListItemButton
        component={NavLink}
        to={item.to}
        disableRipple
        onClick={onNavigate}
        aria-label={item.label}
        aria-current={isActive ? "page" : undefined}
        sx={sidebarCollapsedChildSx(isActive)}
      >
        <ListItemIcon
          sx={{
            ...sidebarCollapsedIconSx,
            "& .MuiSvgIcon-root": { fontSize: 20 },
          }}
        >
          <Icon />
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}

function NavLinkItem({
  item,
  isActive,
  onNavigate,
}: {
  item: SidebarNavLink;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  return (
    <ListItemButton
      component={NavLink}
      to={item.to}
      disableRipple
      onClick={onNavigate}
      sx={sidebarSubmenuLinkSx(isActive)}
    >
      <ListItemIcon
        sx={{
          minWidth: 32,
          color: "inherit",
          "& .MuiSvgIcon-root": { fontSize: 20 },
        }}
      >
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={item.label}
        slotProps={{
          primary: {
            fontSize: 13,
            fontWeight: isActive ? 600 : 500,
            letterSpacing: "0.01em",
          },
        }}
      />
    </ListItemButton>
  );
}
