// Tiny template helper for detail-page labels that contain per-record values.
// "{name} Admission Process" + { name: 'IEM' } -> "IEM Admission Process". Unknown tokens are kept as typed.
export function fill(template: string | undefined | null, vars: Record<string, string | number | undefined | null>): string {
  return String(template ?? '').replace(/\{(\w+)\}/g, (match, key: string) => {
    const v = vars[key];
    return v === undefined || v === null ? match : String(v);
  });
}
