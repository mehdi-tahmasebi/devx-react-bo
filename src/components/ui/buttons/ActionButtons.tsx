import { Stack } from "@mui/material";
import { Button } from "./Button";

type ActionButtonsProps = {
  primaryLabel: string;
  onPrimary?: () => void;
  primaryType?: "button" | "submit";
  primaryLoading?: boolean;
  primaryDisabled?: boolean;
  secondaryLabel?: string;
  onSecondary?: () => void;
  secondaryType?: "button" | "submit";
  secondaryDisabled?: boolean;
};

export function ActionButtons({
  primaryLabel,
  onPrimary,
  primaryType = "button",
  primaryLoading,
  primaryDisabled,
  secondaryLabel,
  onSecondary,
  secondaryType = "button",
  secondaryDisabled,
}: ActionButtonsProps) {
  return (
    <Stack direction="row" spacing={1.5} justifyContent="flex-end">
      {secondaryLabel && onSecondary && (
        <Button
          type={secondaryType}
          variant="outlined"
          color="inherit"
          size="small"
          onClick={onSecondary}
          disabled={secondaryDisabled || primaryLoading}
        >
          {secondaryLabel}
        </Button>
      )}
      <Button
        type={primaryType}
        variant="contained"
        size="small"
        onClick={primaryType === "submit" ? undefined : onPrimary}
        loading={primaryLoading}
        disabled={primaryDisabled || primaryLoading}
      >
        {primaryLabel}
      </Button>
    </Stack>
  );
}
