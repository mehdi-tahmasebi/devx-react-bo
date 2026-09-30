import { branding } from "@/core/branding";
import type { BrandPalette } from "./brand";
import { alpha, linearGradient } from "./color.utils";

export function createColorTokens(brand: BrandPalette = branding.palette) {
  const white = brand.white;

  return {
    brand,

    common: {
      white,
      black: brand.black,
      transparent: "transparent",
    },

    text: {
      primary: brand.ink,
      secondary: brand.textMuted,
      soft: brand.textSoft,
      label: brand.textLabel,
      placeholder: brand.textPlaceholder,
      inverse: white,
      accent: brand.plum,
      danger: brand.berry,
      dangerHover: brand.berryDark,
      brand: brand.magenta,
    },

    surface: {
      default: brand.surface,
      muted: brand.surfaceMuted,
      paper: white,
      glass: alpha(white, 0.92),
      glassStrong: alpha(white, 0.9),
      glassPanel: alpha(white, 0.88),
      glassCard: alpha(white, 0.85),
      glassMedium: alpha(white, 0.82),
      glassContent: alpha(white, 0.78),
      glassLight: alpha(white, 0.72),
      glassFrost: alpha(white, 0.62),
      glassHeader: alpha(white, 0.55),
      glassHeaderMobile: alpha(white, 0.9),
      authAccent: brand.mauve,
      authForm: brand.surface,
    },

    border: {
      default: brand.border,
      glass: alpha(white, 0.82),
      glassStrong: alpha(white, 0.85),
      glassPanel: alpha(white, 0.72),
      glassCard: alpha(white, 0.88),
      glassContent: alpha(white, 0.9),
      plumSubtle: alpha(brand.plum, 0.12),
      plumSoft: alpha(brand.plum, 0.14),
      plumMedium: alpha(brand.plum, 0.16),
      plumStrong: alpha(brand.plum, 0.18),
      magentaSubtle: alpha(brand.magenta, 0.18),
      berryDashed: alpha(brand.berry, 0.35),
      berryStrong: alpha(brand.berry, 0.55),
    },

    fill: {
      plum: {
        4: alpha(brand.plum, 0.04),
        5: alpha(brand.plum, 0.05),
        7: alpha(brand.plum, 0.07),
        8: alpha(brand.plum, 0.08),
        10: alpha(brand.plum, 0.1),
        12: alpha(brand.plum, 0.12),
        14: alpha(brand.plum, 0.14),
        16: alpha(brand.plum, 0.16),
        18: alpha(brand.plum, 0.18),
        22: alpha(brand.plum, 0.22),
      },
      magenta: {
        4: alpha(brand.magenta, 0.04),
        6: alpha(brand.magenta, 0.06),
        8: alpha(brand.magenta, 0.08),
        10: alpha(brand.magenta, 0.1),
        20: alpha(brand.magenta, 0.2),
        22: alpha(brand.magenta, 0.22),
        24: alpha(brand.magenta, 0.24),
        28: alpha(brand.magenta, 0.28),
        35: alpha(brand.magenta, 0.35),
        40: alpha(brand.magenta, 0.4),
      },
      berry: {
        8: alpha(brand.berry, 0.08),
      },
      rose: {
        20: alpha(brand.rose, 0.2),
        22: alpha(brand.rose, 0.22),
        28: alpha(brand.rose, 0.28),
      },
      blush: {
        35: alpha(brand.blush, 0.35),
      },
      ink: {
        4: alpha(brand.ink, 0.04),
      },
      white: {
        7: alpha(white, 0.07),
        95: alpha(white, 0.95),
      },
      black: {
        35: alpha(brand.black, 0.35),
      },
    },

    shadow: {
      shell: `0 20px 50px ${alpha(brand.plumDeep, 0.08)}, inset 0 1px 0 ${alpha(white, 0.95)}`,
      content: `0 24px 64px ${alpha(brand.plumDeep, 0.06)}, inset 0 1px 0 ${alpha(white, 0.9)}`,
      header: `0 16px 40px ${alpha(brand.plumDeep, 0.06)}, inset 0 1px 0 ${alpha(white, 0.95)}`,
      card: `0 20px 48px ${alpha(brand.plumDeep, 0.06)}, inset 0 1px 0 ${white}`,
      cardHover: `0 18px 40px ${alpha(brand.plumDeep, 0.08)}`,
      cardSoft: `0 12px 32px ${alpha(brand.plumDeep, 0.04)}`,
      notFound: `0 24px 56px ${alpha(brand.plumDeep, 0.06)}, inset 0 1px 0 ${white}`,
      button: `0 12px 32px ${alpha(brand.magenta, 0.24)}`,
      buttonSoft: `0 8px 20px ${alpha(brand.magenta, 0.16)}`,
      buttonNotFound: `0 12px 32px ${alpha(brand.magenta, 0.2)}`,
      avatar: `0 2px 8px ${alpha(brand.magenta, 0.18)}`,
      dropPlum: `0 8px 18px ${alpha(brand.plum, 0.14)}`,
      dropDark: `0 12px 28px ${alpha(brand.black, 0.28)}`,
      focus: `0 0 0 3px ${alpha(brand.magenta, 0.15)}`,
      input: `0 1px 2px ${alpha(brand.ink, 0.04)}`,
      insetGlass: `inset 0 1px 0 ${alpha(white, 0.95)}`,
    },

    filter: {
      dropPlum: `drop-shadow(0 8px 18px ${alpha(brand.plum, 0.18)})`,
      dropDark: `drop-shadow(0 12px 28px ${alpha(brand.black, 0.35)})`,
    },

    gradient: {
      brand: linearGradient(135, [brand.magenta, 0], [brand.plum, 100]),
      brandReverse: linearGradient(135, [brand.plum, 0], [brand.magenta, 100]),
      brandHover: linearGradient(
        135,
        [brand.magentaDark, 0],
        [brand.plum, 100],
      ),
      login: linearGradient(135, [brand.magentaDark, 0], [brand.magenta, 100]),
      loginHover: linearGradient(
        135,
        [brand.loginButtonHoverStart, 0],
        [brand.loginButtonHoverEnd, 100],
      ),
      authPanel: linearGradient(
        152,
        [brand.authPanelStart, 0],
        [brand.authPanelMid, 35],
        [brand.plum, 70],
        [brand.magentaDark, 100],
      ),
      shellBackground: linearGradient(
        165,
        [brand.surface, 0],
        [brand.surfaceGradientMid, 55],
        [brand.surfaceGradientEnd, 100],
      ),
      headerSheen: `${linearGradient(112, [alpha(brand.magenta, 0.04), 0], ["transparent", 34])}, ${linearGradient(90, [alpha(brand.plum, 0.03), 0], ["transparent", 28])}`,
      divider: linearGradient(
        180,
        ["transparent", 0],
        [brand.border, 50],
        ["transparent", 100],
      ),
      authAccent: linearGradient(
        90,
        [brand.authAccentStart, 0],
        [brand.white, 100],
      ),
    },

    overlay: {
      dotPlum: `radial-gradient(circle at 1px 1px, ${alpha(brand.ink, 0.035)} 1px, transparent 0)`,
      dotWhite: `radial-gradient(circle at 1px 1px, ${alpha(white, 0.07)} 1px, transparent 0)`,
      glowRose: `radial-gradient(ellipse 65% 80% at 0% 0%, ${alpha(brand.magenta, 0.06)} 0%, transparent 55%)`,
      glowRoseSoft: `radial-gradient(ellipse 70% 55% at 0% 0%, ${alpha(brand.magenta, 0.05)} 0%, transparent 58%)`,
      glowPlum: `radial-gradient(ellipse 50% 60% at 100% 100%, ${alpha(brand.plumDeep, 0.08)} 0%, transparent 50%)`,
      glowPlumSoft: `radial-gradient(ellipse 60% 50% at 100% 100%, ${alpha(brand.plum, 0.06)} 0%, transparent 55%)`,
      glowMagenta: `radial-gradient(ellipse 60% 45% at 50% 100%, ${alpha(brand.magenta, 0.05)} 0%, transparent 55%)`,
      glowRoseLarge: `radial-gradient(ellipse 80% 60% at 8% 12%, ${alpha(brand.magenta, 0.07)} 0%, transparent 55%)`,
      glowPlumLarge: `radial-gradient(ellipse 70% 50% at 92% 8%, ${alpha(brand.plum, 0.05)} 0%, transparent 50%)`,
      glowBlush: `radial-gradient(circle, ${alpha(brand.magenta, 0.08)} 0%, transparent 68%)`,
      glowMagentaCircle: `radial-gradient(circle, ${alpha(brand.magenta, 0.12)} 0%, transparent 70%)`,
      glowRoseCircle: `radial-gradient(circle, ${alpha(brand.plum, 0.06)} 0%, transparent 70%)`,
    },

    nav: {
      group: {
        color: brand.textMuted,
        colorActive: brand.magenta,
        bg: "transparent",
        bgActive: alpha(brand.magenta, 0.06),
        bgHover: alpha(brand.ink, 0.04),
        border: "transparent",
        borderActive: alpha(brand.magenta, 0.12),
        borderHover: alpha(brand.ink, 0.08),
      },
      item: {
        color: brand.textMuted,
        colorActive: brand.magenta,
        bg: "transparent",
        bgActive: alpha(brand.magenta, 0.08),
        bgHover: alpha(brand.ink, 0.04),
        bgHoverActive: alpha(brand.magenta, 0.12),
        border: "transparent",
        borderActive: alpha(brand.magenta, 0.22),
        borderHover: alpha(brand.ink, 0.06),
        borderHoverActive: alpha(brand.magenta, 0.28),
      },
      pipe: alpha(brand.ink, 0.12),
      submenuBorder: alpha(brand.ink, 0.1),
      groupHeader: {
        color: brand.textSoft,
        colorActive: brand.magenta,
        bgHover: alpha(brand.magenta, 0.04),
      },
      submenu: {
        color: brand.textMuted,
        colorActive: brand.magenta,
        bg: "transparent",
        bgActive: alpha(brand.magenta, 0.06),
        bgHover: alpha(brand.ink, 0.03),
        bgHoverActive: alpha(brand.magenta, 0.1),
      },
      logout: {
        color: brand.berry,
        colorHover: brand.berryDark,
        border: alpha(brand.berry, 0.35),
        borderHover: alpha(brand.berry, 0.55),
        bg: alpha(white, 0.72),
        bgHover: alpha(brand.berry, 0.08),
      },
    },
  } as const;
}

export const colorTokens = createColorTokens();

export type ColorTokens = ReturnType<typeof createColorTokens>;

/** Short alias for everyday imports: `import { colors } from '@/core/theme'`. */
export const colors = colorTokens;
