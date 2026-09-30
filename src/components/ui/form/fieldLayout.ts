import type { SxProps, Theme } from "@mui/material";
import type { TFormFieldConfig } from "@/shared/types";

export type TFieldGrid = {
  xs?: number;
  sm?: number;
  md?: number;
};

function gridColumnsToFlex(columns: number) {
  const basis = (columns / 12) * 100;
  return `1 1 calc(${basis}% - 12px)`;
}

function compactMaxWidth(columns: number) {
  if (columns <= 2) {
    return { md: 200 };
  }

  if (columns <= 3) {
    return { md: 280 };
  }

  return undefined;
}

export function getGridWrapperSx(grid?: TFieldGrid): SxProps<Theme> {
  return getFieldWrapperSx({
    name: "_",
    label: "_",
    type: "text",
    grid: grid ?? { xs: 12, sm: 12, md: 6 },
  });
}

export function getFieldWrapperSx(field: TFormFieldConfig): SxProps<Theme> {
  if (field.layout) {
    const { layout } = field;

    return {
      flex: {
        xs: layout.xs ?? "1 1 100%",
        sm: layout.sm ?? layout.xs ?? "1 1 100%",
        md: layout.md ?? layout.sm ?? layout.xs ?? "1 1 100%",
      },
      width: { xs: "100%", md: "auto" },
      minWidth: layout.minWidth,
      maxWidth: layout.maxWidth,
    };
  }

  if (field.grid) {
    const md = field.grid.md ?? 12;
    const sm = field.grid.sm ?? md;
    const xs = field.grid.xs ?? 12;

    if (xs >= 12 && sm >= 12 && md >= 12) {
      return {
        flex: "1 1 100%",
        width: "100%",
      };
    }

    return {
      flex: {
        xs: xs >= 12 ? "1 1 100%" : gridColumnsToFlex(xs),
        sm: sm >= 12 ? "1 1 100%" : gridColumnsToFlex(sm),
        md: md >= 12 ? "1 1 100%" : gridColumnsToFlex(md),
      },
      width: { xs: "100%", md: "auto" },
      minWidth: { xs: "100%", sm: 0, md: 0 },
      maxWidth: compactMaxWidth(md),
    };
  }

  return {
    flex: "1 1 100%",
    width: "100%",
  };
}
