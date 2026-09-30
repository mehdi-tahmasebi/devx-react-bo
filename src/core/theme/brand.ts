/** Shared brand palette shape used by `createColorTokens`. */
export type BrandPalette = {
  magenta: string;
  magentaDark: string;
  plum: string;
  plumDeep: string;
  ink: string;
  rose: string;
  blush: string;
  mauve: string;
  coral: string;
  berry: string;
  berryDark: string;
  surface: string;
  surfaceMuted: string;
  surfaceGradientMid: string;
  surfaceGradientEnd: string;
  border: string;
  textMuted: string;
  textSoft: string;
  textLabel: string;
  textPlaceholder: string;
  white: string;
  black: string;
  authPanelStart: string;
  /** Mid stop for the login left-column gradient. */
  authPanelMid: string;
  authAccentStart: string;
  loginButtonHoverStart: string;
  loginButtonHoverEnd: string;
};

/** Default sample palette — override via env-driven branding if needed. */
export const defaultBrand = {
  magenta: "#4F46E5",
  magentaDark: "#3730A3",
  plum: "#4338CA",
  plumDeep: "#312E81",
  ink: "#1E1B4B",
  rose: "#818CF8",
  blush: "#E0E7FF",
  mauve: "#F5F3FF",
  coral: "#6366F1",
  berry: "#DC2626",
  berryDark: "#B91C1C",
  surface: "#FAFAFA",
  surfaceMuted: "#F4F4F5",
  surfaceGradientMid: "#F1F5F9",
  surfaceGradientEnd: "#E2E8F0",
  border: "#E4E4E7",
  textMuted: "#71717A",
  textSoft: "#A1A1AA",
  textLabel: "#27272A",
  textPlaceholder: "#A1A1AA",
  white: "#ffffff",
  black: "#000000",
  authPanelStart: "#1E1B4B",
  authPanelMid: "#312E81",
  authAccentStart: "#A5B4FC",
  loginButtonHoverStart: "#4338CA",
  loginButtonHoverEnd: "#4F46E5",
} as const satisfies BrandPalette;
