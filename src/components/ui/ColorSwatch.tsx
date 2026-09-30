import { Box } from "@mui/material";

type ColorSwatchProps = {
  color: string;
  size?: number;
};

export function ColorSwatch({ color, size = 20 }: ColorSwatchProps) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        borderRadius: 0.75,
        bgcolor: color || "action.selected",
        border: "1px solid",
        borderColor: "divider",
        flexShrink: 0,
      }}
    />
  );
}
