import { Box, Stack } from "@mui/material";
import { useState, type ReactNode } from "react";
import type { TFormErrors, TFormFieldConfig } from "@/shared/types";
import { getByPath, setByPath } from "@/shared/utils/object";
import { ActionButtons } from "@/components/ui/buttons";
import { FormSection } from "./FormSection";
import { FORM_SECTION_SPACING } from "./form.tokens";
import { getFieldWrapperSx } from "./fieldLayout";
import { getValidationLocales } from "@/core/localization";
import {
  MultiSelectField,
  NumberField,
  SelectField,
  TagsField,
  BooleanField,
  ColorField,
  DateTimeLocalField,
  LocalizedMarkdownFormField,
  LocalizedTextFormField,
  MarkdownField,
  PasswordField,
  TextAreaField,
  TextField,
} from "./fields";

type ResourceFormProps<T extends object> = {
  fields: TFormFieldConfig[];
  initialValues: T;
  onSubmit: (values: T) => void;
  isPending?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  errors?: TFormErrors;
  onValuesChange?: (values: T) => void;
  renderSectionHeader?: (section: string | undefined, values: T) => ReactNode;
  renderSectionFooter?: (
    section: string | undefined,
    values: T,
    setFieldValue: (name: string, value: unknown) => void,
  ) => ReactNode;
  readOnly?: boolean;
  hideActions?: boolean;
  formId?: string;
};

type FieldSection = {
  title?: string;
  fields: TFormFieldConfig[];
};

const REQUIRED_FIELD_MESSAGE = "Compila questo campo";

function isRequiredLocalizedFieldEmpty(value: unknown): boolean {
  if (!value || typeof value !== "object") {
    return true;
  }

  const record = value as Record<string, string>;
  const locales =
    Object.keys(record).length > 0 ? Object.keys(record) : ["it", "en"];
  const requiredLocales = getValidationLocales(locales);

  return !requiredLocales.every((locale) => Boolean(record[locale]?.trim()));
}

function isRequiredFieldEmpty(field: TFormFieldConfig, value: unknown): boolean {
  if (field.type === "tags" || field.type === "multiselect") {
    return !Array.isArray(value) || value.length === 0;
  }

  if (field.type === "boolean") {
    return false;
  }

  if (field.type === "localized-text" || field.type === "localized-markdown") {
    return isRequiredLocalizedFieldEmpty(value);
  }

  if (field.type === "number") {
    return value === "" || value === null || value === undefined;
  }

  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim() === "";
  }

  return false;
}

function validateRequiredFields(
  fields: TFormFieldConfig[],
  values: object,
): TFormErrors {
  const next: TFormErrors = {};

  for (const field of fields) {
    if (!field.required) {
      continue;
    }

    const value = getByPath(values, field.name);
    if (isRequiredFieldEmpty(field, value)) {
      next[field.name] = REQUIRED_FIELD_MESSAGE;
    }
  }

  return next;
}

function groupFieldsBySection(fields: TFormFieldConfig[]): FieldSection[] {
  const sections: FieldSection[] = [];

  fields.forEach((field) => {
    const lastSection = sections.at(-1);

    if (lastSection && lastSection.title === field.section) {
      lastSection.fields.push(field);
      return;
    }

    sections.push({
      title: field.section,
      fields: [field],
    });
  });

  return sections;
}

function renderField<T extends object>(
  field: TFormFieldConfig,
  values: T,
  errors: TFormErrors | undefined,
  onFieldChange: (name: string, value: unknown) => void,
  readOnly = false,
) {
  const error = errors?.[field.name];
  const value = getByPath(values, field.name);
  const disabled = readOnly || Boolean(field.disabled);

  switch (field.type) {
    case "text":
      return (
        <TextField
          field={{ ...field, disabled }}
          value={String(value ?? "")}
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "password":
      return (
        <PasswordField
          field={{ ...field, disabled }}
          value={String(value ?? "")}
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "number":
      return (
        <NumberField
          field={{ ...field, disabled }}
          value={typeof value === "number" ? value : ""}
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "textarea":
      return (
        <TextAreaField
          field={{ ...field, disabled }}
          value={String(value ?? "")}
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "markdown":
      return (
        <MarkdownField
          field={{ ...field, disabled }}
          value={String(value ?? "")}
          error={error}
          readOnly={readOnly}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "datetime-local":
      return (
        <DateTimeLocalField
          field={{ ...field, disabled }}
          value={String(value ?? "")}
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "select":
      return (
        <SelectField
          field={{ ...field, disabled }}
          value={(value as string | number | "") ?? ""}
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "multiselect":
      return (
        <MultiSelectField
          field={{ ...field, disabled }}
          value={Array.isArray(value) ? value : []}
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "tags":
      return (
        <TagsField
          field={{ ...field, disabled }}
          value={Array.isArray(value) ? value.map(String) : []}
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "boolean":
      return (
        <BooleanField
          field={{ ...field, disabled }}
          value={Boolean(value)}
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "color":
      return (
        <ColorField
          field={{ ...field, disabled }}
          value={String(value ?? "")}
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "localized-text":
      return (
        <LocalizedTextFormField
          field={{ ...field, disabled }}
          value={
            value && typeof value === "object"
              ? (value as Record<string, string>)
              : {}
          }
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    case "localized-markdown":
      return (
        <LocalizedMarkdownFormField
          field={{ ...field, disabled }}
          value={
            value && typeof value === "object"
              ? (value as Record<string, string>)
              : {}
          }
          error={error}
          onChange={(nextValue) => onFieldChange(field.name, nextValue)}
        />
      );
    default:
      return null;
  }
}

export function ResourceForm<T extends object>({
  fields,
  initialValues,
  onSubmit,
  isPending,
  submitLabel = "Salva",
  cancelLabel = "Annulla",
  onCancel,
  errors,
  onValuesChange,
  renderSectionHeader,
  renderSectionFooter,
  readOnly = false,
  hideActions = false,
  formId,
}: ResourceFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<TFormErrors>({});
  const sections = groupFieldsBySection(fields);
  const mergedErrors = { ...fieldErrors, ...errors };

  const handleFieldChange = (name: string, value: unknown) => {
    setValues((current) => {
      const next = setByPath(current, name, value);
      onValuesChange?.(next);
      return next;
    });
    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = () => {
    const validationErrors = validateRequiredFields(fields, values);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setFieldErrors({});
    onSubmit(values);
  };

  return (
    <Stack
      component="form"
      id={formId}
      spacing={FORM_SECTION_SPACING}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      {sections.map((section, index) => (
        <FormSection
          key={section.title ?? `section-${index}`}
          title={section.title}
          header={renderSectionHeader?.(section.title, values)}
          footer={renderSectionFooter?.(section.title, values, handleFieldChange)}
        >
          {section.fields.map((field) => (
            <Box key={field.name} sx={getFieldWrapperSx(field)}>
              {renderField(field, values, mergedErrors, handleFieldChange, readOnly)}
            </Box>
          ))}
        </FormSection>
      ))}

      {!hideActions ? (
        readOnly ? (
          onCancel ? (
            <ActionButtons
              primaryLabel={cancelLabel}
              onPrimary={onCancel}
              primaryType="button"
            />
          ) : null
        ) : (
          <ActionButtons
            primaryLabel={submitLabel}
            primaryType="submit"
            primaryLoading={isPending}
            secondaryLabel={onCancel ? cancelLabel : undefined}
            onSecondary={onCancel}
            secondaryType="button"
          />
        )
      ) : null}
    </Stack>
  );
}
