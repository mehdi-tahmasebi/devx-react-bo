import type { SxProps, Theme } from "@mui/material";
import { colors, radius } from "@/core/theme";
import { SIDEBAR_WIDTH } from "./sidebar.config";

export const sidebarDockGlass = {
  bgcolor: colors.surface.glass,
  border: `1px solid ${colors.border.glass}`,
  boxShadow: colors.shadow.shell,
};

export const sidebarDrawerPaperSx = {
  width: SIDEBAR_WIDTH,
  boxSizing: "border-box" as const,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  ...sidebarDockGlass,
};

export const sidebarCollapsedIconSx: SxProps<Theme> = {
  minWidth: 0,
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "inherit",
  "& .MuiSvgIcon-root": {
    fontSize: 22,
  },
};

export function sidebarCollapsedGroupSx(
  isOpen: boolean,
  hasActiveChild: boolean,
): SxProps<Theme> {
  const emphasized = isOpen || hasActiveChild;

  return {
    borderRadius: radius.md,
    minHeight: 44,
    width: 44,
    mx: "auto",
    px: 0,
    py: 0.75,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 0.25,
    color: emphasized ? colors.text.brand : colors.text.secondary,
    bgcolor: "transparent",
    border: "none",
    transition: "color 0.2s ease",
    "&:hover": {
      bgcolor: "transparent",
      color: colors.text.brand,
    },
  };
}

export function sidebarCollapsedChildSx(isActive: boolean): SxProps<Theme> {
  const { item } = colors.nav;

  return {
    borderRadius: "50%",
    minHeight: 38,
    width: 38,
    mx: "auto",
    px: 0,
    justifyContent: "center",
    color: isActive ? item.colorActive : item.color,
    bgcolor: isActive ? item.bgActive : "transparent",
    border: "1px solid",
    borderColor: isActive ? item.borderActive : "transparent",
    transition:
      "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
    "&:hover": {
      bgcolor: isActive ? item.bgHoverActive : item.bgHover,
      borderColor: isActive ? item.borderHoverActive : item.borderHover,
    },
  };
}

export const sidebarCollapsedPipeSx: SxProps<Theme> = {
  width: 2,
  flexShrink: 0,
  bgcolor: colors.nav.pipe,
  borderRadius: radius.xs,
};

export const sidebarCollapsedGroupLabelSx: SxProps<Theme> = {
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textAlign: "center",
  textTransform: "uppercase",
  px: 0.5,
  py: 0.25,
  lineHeight: 1.2,
};

export function sidebarCollapsedGroupLabelColorSx(
  isOpen: boolean,
): SxProps<Theme> {
  return {
    ...sidebarCollapsedGroupLabelSx,
    color: isOpen ? colors.text.brand : colors.text.soft,
  };
}

export function sidebarSubmenuLinkSx(isActive: boolean): SxProps<Theme> {
  const { submenu } = colors.nav;

  return {
    borderRadius: radius.md,
    minHeight: 40,
    py: 0.75,
    px: 1.5,
    color: isActive ? submenu.colorActive : submenu.color,
    bgcolor: isActive ? submenu.bgActive : submenu.bg,
    "&:hover": {
      bgcolor: isActive ? submenu.bgHoverActive : submenu.bgHover,
    },
  };
}

export function sidebarGroupHeaderSx(
  isOpen: boolean,
  hasActiveChild: boolean,
): SxProps<Theme> {
  const { groupHeader } = colors.nav;

  return {
    borderRadius: radius.md,
    minHeight: 40,
    px: 1.5,
    mb: isOpen ? 0.75 : 0,
    color: hasActiveChild ? groupHeader.colorActive : groupHeader.color,
    "&:hover": {
      bgcolor: groupHeader.bgHover,
    },
  };
}
