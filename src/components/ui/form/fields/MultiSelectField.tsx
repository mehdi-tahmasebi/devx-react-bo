import {
  Autocomplete,
  Chip,
  TextField as MuiTextField,
} from "@mui/material";
import type { TMultiSelectFormField, TSelectOption } from "@/shared/types";
import { FORM_SELECT_MENU_MAX_HEIGHT } from "../form.tokens";
import { formFieldSize, formTextFieldSlotProps } from "./fieldStyles";

type MultiSelectFieldProps = {
  field: TMultiSelectFormField;
  value: Array<string | number>;
  error?: string;
  onChange: (value: Array<string | number>) => void;
};

export function MultiSelectField({
  field,
  value,
  error,
  onChange,
}: MultiSelectFieldProps) {
  const selectedOptions = field.options.filter((option) =>
    value.some((item) => String(item) === String(option.value)),
  );

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      size={formFieldSize}
      options={field.options}
      value={selectedOptions}
      disabled={field.disabled}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, selected) =>
        String(option.value) === String(selected.value)
      }
      onChange={(_, options) =>
        onChange(options.map((option: TSelectOption) => option.value))
      }
      ListboxProps={{ style: { maxHeight: FORM_SELECT_MENU_MAX_HEIGHT } }}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={String(option.value)}
            label={option.label}
            size="small"
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "& .MuiChip-deleteIcon": { color: "primary.contrastText" },
            }}
          />
        ))
      }
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
