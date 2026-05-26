/**
 * Escaping a validace vstupů pro HTML e-maily (ochrana před injekcí do šablon).
 */

const EMAIL_RE =
  /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;

export function escapeHtml(value) {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function normalizeEmail(value) {
  if (value == null || typeof value !== "string") return null;
  const t = value.trim().toLowerCase();
  if (!t || !EMAIL_RE.test(t)) return null;
  return t;
}

export function safeHttpUrlForHref(raw) {
  if (raw == null || typeof raw !== "string") return null;
  try {
    const u = new URL(raw.trim());
    if (u.protocol === "https:" || u.protocol === "http:") return u.href;
  } catch {
    /* ignore */
  }
  return null;
}
