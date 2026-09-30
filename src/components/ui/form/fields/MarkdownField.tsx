import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRef, useState, type RefObject } from "react";
import ReactMarkdown from "react-markdown";
import { VisibilityIcon, VisibilityOffIcon } from "@/shared/icons";
import type { TMarkdownFormField } from "@/shared/types";
import { FORM_FIELD_RADIUS } from "../form.tokens";
import { formFieldSize, formTextFieldSlotProps } from "./fieldStyles";
import {
  insertAtSelection,
  insertBlock,
  insertLinePrefix,
  type MarkdownSelection,
  wrapSelection,
} from "./markdown.utils";

type MarkdownFieldProps = {
  field: TMarkdownFormField;
  value: string;
  error?: string;
  readOnly?: boolean;
  onChange: (value: string) => void;
};

const EDITOR_MIN_ROWS = 10;
const PREVIEW_MIN_HEIGHT = 280;

const previewSx = {
  "& p": { m: 0, mb: 1.25, lineHeight: 1.6 },
  "& p:last-child": { mb: 0 },
  "& ul, & ol": { m: 0, mb: 1.25, pl: 2.5 },
  "& h1, & h2, & h3, & h4": { mt: 0, mb: 1, lineHeight: 1.35 },
  "& hr": { my: 1.5, borderColor: "divider" },
  "& code": {
    px: 0.5,
    py: 0.25,
    borderRadius: 0.5,
    bgcolor: "action.selected",
    fontFamily: "monospace",
    fontSize: 13,
  },
  "& pre": {
    m: 0,
    mb: 1.25,
    p: 1.5,
    borderRadius: 1,
    bgcolor: "action.selected",
    overflowX: "auto",
  },
  "& pre code": { bgcolor: "transparent", p: 0 },
  "& blockquote": {
    m: 0,
    mb: 1.25,
    pl: 1.5,
    borderLeft: 3,
    borderColor: "divider",
    color: "text.secondary",
  },
  "& a": { color: "primary.main" },
};

type ToolbarButtonProps = {
  label: string;
  title: string;
  disabled?: boolean;
  onClick: () => void;
};

function ToolbarButton({ label, title, disabled, onClick }: ToolbarButtonProps) {
  return (
    <Tooltip title={title}>
      <span>
        <IconButton
          size="small"
          disabled={disabled}
          onClick={onClick}
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {label}
        </IconButton>
      </span>
    </Tooltip>
  );
}

function getSelection(textarea: HTMLTextAreaElement): MarkdownSelection {
  return {
    start: textarea.selectionStart,
    end: textarea.selectionEnd,
  };
}

function applyChange(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  value: string,
  onChange: (value: string) => void,
  transform: (
    current: string,
    selection: MarkdownSelection,
  ) => { value: string; selection: MarkdownSelection },
) {
  const textarea = textareaRef.current;
  if (!textarea) {
    return;
  }

  const selection = getSelection(textarea);
  const result = transform(value, selection);
  onChange(result.value);

  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(result.selection.start, result.selection.end);
  });
}

function MarkdownToolbar({
  disabled,
  showPreview,
  onTogglePreview,
  textareaRef,
  value,
  onChange,
}: {
  disabled?: boolean;
  showPreview: boolean;
  onTogglePreview: () => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (value: string) => void;
}) {
  const run = (
    transform: (
      current: string,
      selection: MarkdownSelection,
    ) => { value: string; selection: MarkdownSelection },
  ) => {
    applyChange(textareaRef, value, onChange, transform);
  };

  return (
    <Stack
      direction="row"
      spacing={0.25}
      useFlexGap
      sx={{
        flexWrap: "wrap",
        alignItems: "center",
        px: 0.75,
        py: 0.75,
        bgcolor: "action.hover",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <ToolbarButton
        label="B"
        title="Grassetto"
        disabled={disabled}
        onClick={() => run((current, selection) => wrapSelection(current, selection, "**"))}
      />
      <ToolbarButton
        label="I"
        title="Corsivo"
        disabled={disabled}
        onClick={() => run((current, selection) => wrapSelection(current, selection, "*"))}
      />
      <ToolbarButton
        label="S"
        title="Barrato"
        disabled={disabled}
        onClick={() => run((current, selection) => wrapSelection(current, selection, "~~"))}
      />
      <Divider flexItem orientation="vertical" sx={{ mx: 0.25 }} />
      <ToolbarButton
        label="H2"
        title="Titolo"
        disabled={disabled}
        onClick={() =>
          run((current, selection) =>
            insertLinePrefix(current, selection, "## "),
          )
        }
      />
      <ToolbarButton
        label="“"
        title="Citazione"
        disabled={disabled}
        onClick={() =>
          run((current, selection) =>
            insertLinePrefix(current, selection, "> "),
          )
        }
      />
      <ToolbarButton
        label="</>"
        title="Codice inline"
        disabled={disabled}
        onClick={() => run((current, selection) => wrapSelection(current, selection, "`"))}
      />
      <ToolbarButton
        label="{}"
        title="Blocco codice"
        disabled={disabled}
        onClick={() =>
          run((current, selection) =>
            insertBlock(current, selection, "```\ncodice\n```"),
          )
        }
      />
      <Divider flexItem orientation="vertical" sx={{ mx: 0.25 }} />
      <ToolbarButton
        label="•"
        title="Elenco puntato"
        disabled={disabled}
        onClick={() =>
          run((current, selection) =>
            insertLinePrefix(current, selection, "- "),
          )
        }
      />
      <ToolbarButton
        label="1."
        title="Elenco numerato"
        disabled={disabled}
        onClick={() =>
          run((current, selection) =>
            insertLinePrefix(current, selection, "1. "),
          )
        }
      />
      <ToolbarButton
        label="—"
        title="Linea orizzontale"
        disabled={disabled}
        onClick={() =>
          run((current, selection) => insertBlock(current, selection, "---"))
        }
      />
      <ToolbarButton
        label="Link"
        title="Link"
        disabled={disabled}
        onClick={() =>
          run((current, selection) =>
            insertAtSelection(current, selection, "[{}](https://)", "testo"),
          )
        }
      />

      <Box sx={{ flex: 1 }} />

      <Button
        size="small"
        variant={showPreview ? "contained" : "outlined"}
        color="inherit"
        disabled={disabled}
        startIcon={
          showPreview ? (
            <VisibilityOffIcon fontSize="small" />
          ) : (
            <VisibilityIcon fontSize="small" />
          )
        }
        onClick={onTogglePreview}
        sx={{
          minHeight: 32,
          px: 1.25,
          fontSize: 12,
          textTransform: "none",
          borderColor: "divider",
        }}
      >
        {showPreview ? "Nascondi anteprima" : "Mostra anteprima"}
      </Button>
    </Stack>
  );
}

export function MarkdownField({
  field,
  value,
  error,
  readOnly = false,
  onChange,
}: MarkdownFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const isDisabled = Boolean(field.disabled);

  if (readOnly) {
    return (
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: 0.75, fontWeight: 600 }}
        >
          {field.label}
        </Typography>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: `${FORM_FIELD_RADIUS}px`,
            p: 2.5,
            minHeight: PREVIEW_MIN_HEIGHT,
            bgcolor: "background.paper",
            ...previewSx,
          }}
        >
          {value.trim() ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <Typography color="text.disabled">—</Typography>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Stack spacing={1.25} sx={{ width: "100%" }}>
      <InputLabel
        required={field.required}
        sx={{
          position: "static",
          transform: "none",
          fontSize: 14,
          fontWeight: 500,
          color: error ? "error.main" : "text.primary",
        }}
      >
        {field.label}
      </InputLabel>

      {field.helperText ? (
        <Typography variant="caption" color="text.secondary">
          {field.helperText}
        </Typography>
      ) : null}

      <Box
        sx={{
          width: "100%",
          border: 1,
          borderColor: error ? "error.main" : "divider",
          borderRadius: `${FORM_FIELD_RADIUS}px`,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <MarkdownToolbar
          disabled={isDisabled}
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview((current) => !current)}
          textareaRef={textareaRef}
          value={value}
          onChange={onChange}
        />

        <TextField
          inputRef={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          disabled={isDisabled}
          fullWidth
          multiline
          minRows={EDITOR_MIN_ROWS}
          size={formFieldSize}
          slotProps={{
            ...formTextFieldSlotProps,
            input: {
              ...formTextFieldSlotProps.input,
              sx: {
                ...formTextFieldSlotProps.input?.sx,
                fontFamily: "monospace",
                fontSize: 14,
                lineHeight: 1.6,
                py: 1.5,
                px: 1.5,
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              "& fieldset": { border: "none" },
            },
          }}
        />
      </Box>

      {showPreview ? (
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 0.75, fontWeight: 600 }}
          >
            Anteprima
          </Typography>
          <Box
            sx={{
              width: "100%",
              border: 1,
              borderColor: "divider",
              borderRadius: `${FORM_FIELD_RADIUS}px`,
              p: 2.5,
              minHeight: PREVIEW_MIN_HEIGHT,
              bgcolor: "action.hover",
              ...previewSx,
            }}
          >
            {value.trim() ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <Typography color="text.disabled" variant="body2">
                L&apos;anteprima apparirà qui.
              </Typography>
            )}
          </Box>
        </Box>
      ) : null}

      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </Stack>
  );
}
