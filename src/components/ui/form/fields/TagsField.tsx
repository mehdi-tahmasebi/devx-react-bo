import {
  Autocomplete,
  Chip,
  TextField as MuiTextField,
} from "@mui/material";
import { useCallback, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import type { TTagsFormField } from "@/shared/types";
import { formFieldSize, formTextFieldSlotProps } from "./fieldStyles";

type TagsFieldProps = {
  field: TTagsFormField;
  value: string[];
  error?: string;
  onChange: (value: string[]) => void;
};

function mergeTags(current: string[], input: string) {
  const parts = input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return current;
  }

  const next = [...current];
  for (const part of parts) {
    if (!next.includes(part)) {
      next.push(part);
    }
  }

  return next;
}

export function TagsField({ field, value, error, onChange }: TagsFieldProps) {
  const [inputValue, setInputValue] = useState("");

  const commitInput = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    flushSync(() => {
      onChange(mergeTags(value, trimmed));
      setInputValue("");
    });
  }, [inputValue, onChange, value]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commitInput();
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      size={formFieldSize}
      options={[]}
      value={value}
      inputValue={inputValue}
      disabled={field.disabled}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, newValue) => {
        onChange(
          newValue
            .map((item) => (typeof item === "string" ? item : String(item)))
            .map((item) => item.trim())
            .filter(Boolean),
        );
        setInputValue("");
      }}
      onBlur={commitInput}
      onKeyDown={handleKeyDown}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={`${option}-${index}`}
            label={option}
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
