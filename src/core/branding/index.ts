import appLogo from "@/assets/app-logo.svg";
import appMark from "@/assets/app-mark.svg";
import { defaultBrand, type BrandPalette } from "@/core/theme/brand";

const DEFAULTS = {
  name: "DevX Backoffice",
  description:
    "Pannello operativo di esempio: stessa architettura feature-slice, layout e data-fetching del blueprint React.",
  productLabel: "DEVX BACKOFFICE",
  logo: appLogo,
  sidebarLogo: appLogo,
  sidebarLogoCollapsed: appMark,
  favicon: "/favicon.svg",
  faviconType: "image/svg+xml",
  palette: defaultBrand,
} satisfies {
  name: string;
  description: string;
  productLabel: string;
  logo: string;
  sidebarLogo: string;
  sidebarLogoCollapsed: string;
  favicon: string;
  faviconType: string;
  palette: BrandPalette;
};

/**
 * Branding resolved at build time from `VITE_APP_*` env vars.
 * Fork this repo and replace logos in `src/assets/` plus palette in `core/theme/brand.ts`.
 */
export const branding = {
  name: import.meta.env.VITE_APP_TITLE?.trim() || DEFAULTS.name,
  description:
    import.meta.env.VITE_APP_DESCRIPTION?.trim() || DEFAULTS.description,
  productLabel:
    import.meta.env.VITE_APP_PRODUCT_LABEL?.trim() || DEFAULTS.productLabel,
  logo: DEFAULTS.logo,
  sidebarLogo: DEFAULTS.sidebarLogo,
  sidebarLogoCollapsed: DEFAULTS.sidebarLogoCollapsed,
  favicon: import.meta.env.VITE_APP_FAVICON?.trim() || DEFAULTS.favicon,
  faviconType:
    import.meta.env.VITE_APP_FAVICON_TYPE?.trim() || DEFAULTS.faviconType,
  palette: DEFAULTS.palette,
} as const;

export type Branding = typeof branding;
