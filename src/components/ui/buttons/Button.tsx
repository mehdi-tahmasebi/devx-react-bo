import { Button as MuiButton, type ButtonProps } from "@mui/material";

export function Button({ sx, ...props }: ButtonProps) {
  return (
    <MuiButton
      {...props}
      sx={{
        px: 2.5,
        py: 1,
        boxShadow: "none",
        ...sx,
      }}
    />
  );
}
