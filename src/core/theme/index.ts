import { itIT } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import { branding } from "@/core/branding";
import { FORM_FIELD_RADIUS, THEME_SHAPE_RADIUS } from "./radius";
import { colorTokens, type ColorTokens } from "./tokens";

const brand = branding.palette;

declare module "@mui/material/styles" {
  interface Theme {
    shell: ColorTokens;
  }

  interface ThemeOptions {
    shell?: ColorTokens;
  }
}

export const theme = createTheme(
  {
  palette: {
    mode: "light",
    primary: {
      main: brand.magenta,
      light: brand.rose,
      dark: brand.magentaDark,
      contrastText: brand.white,
    },
    secondary: {
      main: brand.plum,
      light: brand.mauve,
      dark: brand.plumDeep,
    },
    background: {
      default: brand.surface,
      paper: brand.white,
    },
    text: {
      primary: brand.ink,
      secondary: brand.textMuted,
    },
    divider: brand.border,
  },
  shape: {
    borderRadius: THEME_SHAPE_RADIUS,
  },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shell: colorTokens,
  components: {
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: THEME_SHAPE_RADIUS,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: THEME_SHAPE_RADIUS + 2,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: FORM_FIELD_RADIUS,
        },
        containedPrimary: {
          backgroundColor: brand.magenta,
          boxShadow: colorTokens.shadow.buttonSoft,
          "&:hover": {
            backgroundColor: brand.magentaDark,
            boxShadow: colorTokens.shadow.button,
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "default",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        margin: "dense",
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
        margin: "dense",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: FORM_FIELD_RADIUS,
        },
        input: {
          fontSize: 14,
        },
        inputSizeSmall: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
        sizeSmall: {
          lineHeight: 1.2,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 4,
          fontSize: 12,
        },
      },
    },
  },
  },
  itIT,
);

export { defaultBrand } from "./brand";
export { alpha, linearGradient } from "./color.utils";
export {
  FORM_FIELD_RADIUS,
  radius,
  SHELL_RADIUS,
  THEME_SHAPE_RADIUS,
} from "./radius";
export { colorTokens, colors, createColorTokens } from "./tokens";
export type { ColorTokens } from "./tokens";
export type { BrandPalette } from "./brand";