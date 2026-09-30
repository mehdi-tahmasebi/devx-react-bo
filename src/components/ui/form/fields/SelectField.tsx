import {
  Autocomplete,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField as MuiTextField,
} from "@mui/material";
import type { TSelectFormField, TSelectOption } from "@/shared/types";
import { FORM_SELECT_MENU_MAX_HEIGHT } from "../form.tokens";
import { formFieldSize, formSelectSx, formTextFieldSlotProps } from "./fieldStyles";

type SelectFieldProps = {
  field: TSelectFormField;
  value: string | number | "";
  error?: string;
  onChange: (value: string | number) => void;
};

function getMenuMaxHeight(field: TSelectFormField) {
  return field.menuMaxHeight ?? FORM_SELECT_MENU_MAX_HEIGHT;
}

function getSelectedOption(
  options: TSelectOption[],
  value: string | number | "",
) {
  return options.find((option) => option.value === value) ?? null;
}

export function SelectField({
  field,
  value,
  error,
  onChange,
}: SelectFieldProps) {
  const labelId = `${field.name}-label`;
  const menuMaxHeight = getMenuMaxHeight(field);

  if (field.searchable) {
    return (
      <Autocomplete
        size={formFieldSize}
        fullWidth
        options={field.options}
        value={getSelectedOption(field.options, value)}
        disabled={field.disabled}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, selected) =>
          option.value === selected.value
        }
        onChange={(_, option) => onChange(option?.value ?? "")}
        ListboxProps={{ style: { maxHeight: menuMaxHeight } }}
        renderInput={(params) => (
          <MuiTextField
            {...params}
            label={field.label}
            required={field.required}
            error={Boolean(error)}
            helperText={error ?? field.helperText}
            placeholder={field.placeholder}
            margin="dense"
            slotProps={{
              input: {
                ...params.InputProps,
                sx: formTextFieldSlotProps.input.sx,
              },
            }}
          />
        )}
      />
    );
  }

  return (
    <FormControl
      fullWidth
      required={field.required}
      error={Boolean(error)}
      size={formFieldSize}
      margin="dense"
    >
      <InputLabel id={labelId}>{field.label}</InputLabel>
      <Select
        labelId={labelId}
        label={field.label}
        value={value}
        disabled={field.disabled}
        onChange={(event) => onChange(event.target.value)}
        sx={formSelectSx}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: menuMaxHeight,
            },
          },
        }}
      >
        {field.options.map((option) => (
          <MenuItem key={String(option.value)} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {(error ?? field.helperText) && (
        <FormHelperText>{error ?? field.helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
