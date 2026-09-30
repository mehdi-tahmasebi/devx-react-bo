import { Box, Checkbox, FormControlLabel, Switch } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { CheckIcon, CloseIcon } from "@/shared/icons";
import { getGridWrapperSx, type TFieldGrid } from "../fieldLayout";

type BooleanControlVariant = "switch" | "checkbox";

type ReadonlyBooleanFieldProps = {
  label: string;
  value: boolean;
  variant?: BooleanControlVariant;
  grid?: TFieldGrid;
};

function BooleanControl({
  value,
  variant,
}: {
  value: boolean;
  variant: BooleanControlVariant;
}) {
  if (variant === "checkbox") {
    return <Checkbox checked={value} disabled size="small" />;
  }

  return <Switch checked={value} disabled size="small" />;
}

export function BooleanIndicator({ value }: { value: boolean }) {
  if (value) {
    return (
      <Box
        role="img"
        aria-label="Sì"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 26,
          height: 26,
          borderRadius: "50%",
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.12),
          color: "success.main",
        }}
      >
        <CheckIcon sx={{ fontSize: 16 }} />
      </Box>
    );
  }

  return (
    <Box
      role="img"
      aria-label="No"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 26,
        borderRadius: "50%",
        bgcolor: (theme) => alpha(theme.palette.text.secondary, 0.1),
        color: "text.secondary",
      }}
    >
      <CloseIcon sx={{ fontSize: 15 }} />
    </Box>
  );
}

export function ReadonlyBooleanField({
  label,
  value,
  variant = "switch",
  grid,
}: ReadonlyBooleanFieldProps) {
  return (
    <Box sx={getGridWrapperSx(grid)}>
      <FormControlLabel
        control={<BooleanControl value={value} variant={variant} />}
        label={label}
        sx={{
          ml: 0,
          mr: 0,
          width: "100%",
          "& .MuiFormControlLabel-label": {
            fontSize: 14,
            fontWeight: 500,
          },
        }}
      />
    </Box>
  );
}
