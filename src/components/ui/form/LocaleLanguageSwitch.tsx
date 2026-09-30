import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type LocaleLanguageSwitchProps = {
  options: { value: string; label: string }[];
  value: string;
  disabled?: boolean;
  onChange: (locale: string) => void;
};

export function LocaleLanguageSwitch({
  options,
  value,
  disabled = false,
  onChange,
}: LocaleLanguageSwitchProps) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      color="primary"
      value={value}
      disabled={disabled}
      aria-label="Lingua"
      onChange={(_, next) => {
        if (typeof next === "string") {
          onChange(next);
        }
      }}
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
