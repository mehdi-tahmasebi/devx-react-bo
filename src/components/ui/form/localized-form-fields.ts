import type { TFormFieldConfig } from "@/shared/types";

type LocalizedFieldOptions = {
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  helperText?: string;
  disabled?: boolean;
  grid?: { xs?: number; sm?: number; md?: number };
};

type LocalizedTextAreaOptions = LocalizedFieldOptions & {
  minRows?: number;
  maxRows?: number;
};

function resolveLocalizedFieldSection(section: string, label: string): string {
  if (section.trim().toLowerCase() === label.trim().toLowerCase()) {
    return "";
  }

  return section;
}

export function localizedTextField(
  section: string,
  name: string,
  label: string,
  options: LocalizedFieldOptions = {},
): TFormFieldConfig {
  return {
    section: resolveLocalizedFieldSection(section, label),
    type: "localized-text",
    name,
    label,
    inputVariant: "text",
    ...options,
  };
}

export function localizedTextAreaField(
  section: string,
  name: string,
  label: string,
  options: LocalizedTextAreaOptions = {},
): TFormFieldConfig {
  return {
    section: resolveLocalizedFieldSection(section, label),
    type: "localized-text",
    name,
    label,
    inputVariant: "textarea",
    ...options,
  };
}

export function localizedMarkdownField(
  section: string,
  name: string,
  label: string,
  options: LocalizedTextAreaOptions = {},
): TFormFieldConfig {
  return {
    section: resolveLocalizedFieldSection(section, label),
    type: "localized-markdown",
    name,
    label,
    ...options,
  };
}
