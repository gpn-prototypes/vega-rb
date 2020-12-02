export function isEmpty(
  value: number | string | null | undefined | unknown,
): boolean {
  return value === null || value === undefined || String(value).trim() === '';
}
