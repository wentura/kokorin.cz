/**
 * Formátuje datum do českého tvaru dd.mm.yyyy.
 * Nepoužívá toLocaleDateString — v Node.js bez full-icu locale často selže.
 */
export function formatCzDate(value) {
  if (value == null || value === "") return "";

  if (typeof value === "string") {
    const trimmed = value.trim();
    const czMatch = trimmed.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (czMatch) {
      const day = czMatch[1].padStart(2, "0");
      const month = czMatch[2].padStart(2, "0");
      return `${day}.${month}.${czMatch[3]}`;
    }
    const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      return `${isoMatch[3]}.${isoMatch[2]}.${isoMatch[1]}`;
    }
  }

  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) {
    return typeof value === "string" ? value : "";
  }

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}
