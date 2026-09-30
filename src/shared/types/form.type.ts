export type TSelectOption = {
  value: string | number;
  label: string;
};

type TFormFieldBase = {
  name: string;
  label: string;
  section?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  placeholder?: string;
  maxLength?: number;
  layout?: {
    xs?: string;
    sm?: string;
    md?: string;
    minWidth?: { xs?: string | number; sm?: string | number; md?: string | number };
    maxWidth?: { xs?: string | number; sm?: string | number; md?: string | number };
  };
  grid?: { xs?: number; sm?: number; md?: number };
};

export type TTextFormField = TFormFieldBase & {
  type: "text";
  inputType?: "text" | "date";
};

export type TPasswordFormField = TFormFieldBase & {
  type: "password";
};

export type TNumberFormField = TFormFieldBase & {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
};

export type TTextAreaFormField = TFormFieldBase & {
  type: "textarea";
  rows?: number;
  minRows?: number;
  maxRows?: number;
};

export type TSelectFormField = TFormFieldBase & {
  type: "select";
  options: TSelectOption[];
  menuMaxHeight?: number;
  searchable?: boolean;
};

export type TMultiSelectFormField = TFormFieldBase & {
  type: "multiselect";
  options: TSelectOption[];
};

export type TTagsFormField = TFormFieldBase & {
  type: "tags";
};

export type TBooleanFormField = TFormFieldBase & {
  type: "boolean";
  variant?: "checkbox" | "switch";
};

export type TColorFormField = TFormFieldBase & {
  type: "color";
};

export type TMarkdownFormField = TFormFieldBase & {
  type: "markdown";
  minRows?: number;
  maxRows?: number;
};

export type TDateTimeLocalFormField = TFormFieldBase & {
  type: "datetime-local";
};

export type TLocalizedTextFormField = TFormFieldBase & {
  type: "localized-text";
  inputVariant?: "text" | "textarea";
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
};

export type TLocalizedMarkdownFormField = TFormFieldBase & {
  type: "localized-markdown";
  minRows?: number;
  maxRows?: number;
};

export type TFormFieldConfig =
  | TTextFormField
  | TPasswordFormField
  | TNumberFormField
  | TTextAreaFormField
  | TSelectFormField
  | TMultiSelectFormField
  | TTagsFormField
  | TBooleanFormField
  | TColorFormField
  | TMarkdownFormField
  | TDateTimeLocalFormField
  | TLocalizedTextFormField
  | TLocalizedMarkdownFormField;

export type TFormErrors = Record<string, string>;
