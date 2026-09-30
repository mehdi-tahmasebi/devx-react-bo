export function getByPath<T extends object>(
  object: T,
  path: string,
): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current == null || typeof current !== "object") {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, object);
}

export function setByPath<T extends object>(
  object: T,
  path: string,
  value: unknown,
): T {
  const keys = path.split(".");
  const result = { ...object } as Record<string, unknown>;
  let current: Record<string, unknown> = result;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
      return;
    }

    const next = current[key];
    current[key] =
      next != null && typeof next === "object" ? { ...(next as object) } : {};
    current = current[key] as Record<string, unknown>;
  });

  return result as T;
}
