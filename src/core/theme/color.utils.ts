/**
 * Converts a hex color to rgba with the given opacity (0–1).
 */
export function alpha(color: string, opacity: number): string {
  const hex = color.replace("#", "");

  if (hex.length !== 6) {
    return color;
  }

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

/**
 * Builds a linear gradient string from color stops.
 */
export function linearGradient(
  angle: number,
  ...stops: Array<[string, number]>
): string {
  const gradientStops = stops
    .map(([color, position]) => `${color} ${position}%`)
    .join(", ");

  return `linear-gradient(${angle}deg, ${gradientStops})`;
}
