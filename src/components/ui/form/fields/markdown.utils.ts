export type MarkdownSelection = {
  start: number;
  end: number;
};

export type MarkdownInsertResult = {
  value: string;
  selection: MarkdownSelection;
};

function clampSelection(value: string, start: number, end: number): MarkdownSelection {
  const length = value.length;
  return {
    start: Math.max(0, Math.min(start, length)),
    end: Math.max(0, Math.min(end, length)),
  };
}

export function wrapSelection(
  value: string,
  selection: MarkdownSelection,
  prefix: string,
  suffix: string = prefix,
): MarkdownInsertResult {
  const { start, end } = clampSelection(value, selection.start, selection.end);
  const selected = value.slice(start, end);
  const wrapped = `${prefix}${selected || "testo"}${suffix}`;
  const nextValue = `${value.slice(0, start)}${wrapped}${value.slice(end)}`;
  const cursorStart = start + prefix.length;
  const cursorEnd = cursorStart + (selected || "testo").length;

  return {
    value: nextValue,
    selection: { start: cursorStart, end: cursorEnd },
  };
}

export function insertAtSelection(
  value: string,
  selection: MarkdownSelection,
  insert: string,
  placeholder = "",
): MarkdownInsertResult {
  const { start, end } = clampSelection(value, selection.start, selection.end);
  const selected = value.slice(start, end);
  const content = selected || placeholder;
  const nextValue = `${value.slice(0, start)}${insert.replace("{}", content)}${value.slice(end)}`;
  const cursorStart = start + insert.indexOf("{}");
  const cursorEnd = cursorStart + content.length;

  return {
    value: nextValue,
    selection: { start: cursorStart, end: cursorEnd },
  };
}

export function insertLinePrefix(
  value: string,
  selection: MarkdownSelection,
  prefix: string,
): MarkdownInsertResult {
  const { start, end } = clampSelection(value, selection.start, selection.end);
  const before = value.slice(0, start);
  const selected = value.slice(start, end);
  const after = value.slice(end);
  const lineStart = before.lastIndexOf("\n") + 1;
  const block = value.slice(lineStart, end);
  const lines = (selected || block || "").split("\n");
  const prefixed = lines
    .map((line) => (line.startsWith(prefix) ? line : `${prefix}${line}`))
    .join("\n");
  const nextValue = `${value.slice(0, lineStart)}${prefixed}${after}`;
  const cursorOffset = prefixed.length;

  return {
    value: nextValue,
    selection: {
      start: lineStart,
      end: lineStart + cursorOffset,
    },
  };
}

export function insertBlock(
  value: string,
  selection: MarkdownSelection,
  block: string,
): MarkdownInsertResult {
  const { start, end } = clampSelection(value, selection.start, selection.end);
  const needsLeadingBreak = start > 0 && value[start - 1] !== "\n";
  const needsTrailingBreak = end < value.length && value[end] !== "\n";
  const payload = `${needsLeadingBreak ? "\n\n" : ""}${block}${needsTrailingBreak ? "\n" : ""}`;
  const nextValue = `${value.slice(0, start)}${payload}${value.slice(end)}`;
  const cursorStart = start + payload.length;

  return {
    value: nextValue,
    selection: { start: cursorStart, end: cursorStart },
  };
}
