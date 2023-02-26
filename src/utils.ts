export function sanitizeNumeric(value: string) {
  return value.replace(/[^0-9]/g, "").trim();
}
