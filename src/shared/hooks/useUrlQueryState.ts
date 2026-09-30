import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export type UrlQueryField<T> = {
  parse: (raw: string | null) => T;
  serialize: (value: T) => string | null;
  equals?: (left: T, right: T) => boolean;
};

type UrlQueryFieldMap<T extends Record<string, unknown>> = {
  [K in keyof T]: UrlQueryField<T[K]>;
};

function defaultEquals<T>(left: T, right: T) {
  return Object.is(left, right);
}

export const urlQueryStringField = (
  defaultValue = "",
): UrlQueryField<string> => ({
  parse: (raw) => raw ?? defaultValue,
  serialize: (value) => {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  },
});

export const urlQueryBooleanField = (
  defaultValue = false,
): UrlQueryField<boolean> => ({
  parse: (raw) => (raw == null ? defaultValue : raw === "true"),
  serialize: (value) => (value ? "true" : null),
  equals: (left, right) => left === right,
});

export const urlQueryNumberArrayField = (
  defaultValue: number[] = [],
): UrlQueryField<number[]> => ({
  parse: (raw) => {
    if (!raw) {
      return defaultValue;
    }

    return raw
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value) && value > 0);
  },
  serialize: (value) => (value.length > 0 ? value.join(",") : null),
  equals: (left, right) =>
    left.length === right.length &&
    left.every((item, index) => item === right[index]),
});

export const urlQueryNumberField = (
  defaultValue = 0,
): UrlQueryField<number> => ({
  parse: (raw) => {
    if (raw == null || raw === "") {
      return defaultValue;
    }

    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : defaultValue;
  },
  serialize: (value) => (value === defaultValue ? null : String(value)),
  equals: (left, right) => left === right,
});

export function applyUrlQueryPatch<T extends Record<string, unknown>>(
  searchParams: URLSearchParams,
  fields: UrlQueryFieldMap<T>,
  defaults: T,
  patch: Partial<T>,
): URLSearchParams {
  const nextParams = new URLSearchParams(searchParams);

  for (const key of Object.keys(patch) as (keyof T)[]) {
    const field = fields[key];
    const value = patch[key];
    const equals = field.equals ?? defaultEquals;
    const serialized = field.serialize(value as T[keyof T]);

    if (serialized == null || equals(value as T[keyof T], defaults[key])) {
      nextParams.delete(String(key));
    } else {
      nextParams.set(String(key), serialized);
    }
  }

  return nextParams;
}

export function useUrlQueryState<T extends Record<string, unknown>>(
  fields: UrlQueryFieldMap<T>,
  defaults: T,
): [T, (patch: Partial<T>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(() => {
    const next = { ...defaults };

    for (const key of Object.keys(fields) as (keyof T)[]) {
      const field = fields[key];
      next[key] = field.parse(searchParams.get(String(key)));
    }

    return next;
  }, [defaults, fields, searchParams]);

  const setState = useCallback(
    (patch: Partial<T>) => {
      setSearchParams(
        (prevSearchParams) =>
          applyUrlQueryPatch(prevSearchParams, fields, defaults, patch),
        { replace: true },
      );
    },
    [defaults, fields, setSearchParams],
  );

  return [state, setState];
}
