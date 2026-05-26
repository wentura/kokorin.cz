/**
 * Matomo event tracking přes tracking pixel (bez cookies, konzistentní s Matomo.jsx).
 * @see https://developer.matomo.org/api-reference/tracking-api
 */

const MATOMO_PIXEL =
  "https://matomo.zbyneksvoboda.cz/matomo.php?idsite=20&rec=1";

/**
 * @param {string} category
 * @param {string} action
 * @param {string} [name]
 */
export function trackMatomoEvent(category, action, name) {
  if (typeof window === "undefined") return;
  const pageUrl = encodeURIComponent(window.location.href);
  const rand = Date.now();
  const qs = [
    `e_c=${encodeURIComponent(category)}`,
    `e_a=${encodeURIComponent(action)}`,
    name != null && name !== ""
      ? `e_n=${encodeURIComponent(String(name))}`
      : null,
    `url=${pageUrl}`,
    `rand=${rand}`,
  ]
    .filter(Boolean)
    .join("&");
  const img = new Image();
  img.referrerPolicy = "no-referrer-when-downgrade";
  img.src = `${MATOMO_PIXEL}&${qs}`;
}

/** Zdroj otevření poptávky: homepage-card | booking-page | homepage-generic | … */
export function trackBookingModalOpen(source) {
  trackMatomoEvent("Booking", "open_request", source);
}

/** Klik na web konkrétního objektu (penziony | glamping | kemping) */
export function trackExternalObjectClick(section, objectName) {
  trackMatomoEvent(
    "Outbound",
    "object_website",
    `${section}|${objectName || "unknown"}`,
  );
}

/**
 * @param {{ outcome: "success" | "error", routingMode: string, source: string }} p
 * source: např. booking-page, homepage-card, kemp-box (Matomo e_n = source|routingMode)
 */
export function trackLeadSubmit({ outcome, routingMode, source }) {
  trackMatomoEvent(
    "Booking",
    outcome === "success" ? "submit_success" : "submit_error",
    `${source}|${routingMode}`,
  );
}

/** Klik na interní CTA (např. /booking nebo kotva na filtr). */
export function trackInternalCtaClick(name, source = "unknown") {
  trackMatomoEvent("CTA", "internal_click", `${source}|${name}`);
}

/** Klik na telefonní odkaz. */
export function trackPhoneClick(source = "unknown") {
  trackMatomoEvent("CTA", "phone_click", source);
}

/** Klik na tlačítko poptávky konkrétního objektu. */
export function trackObjectRequestClick(sourceSection, objectName) {
  trackMatomoEvent(
    "Booking",
    "request_object_click",
    `${sourceSection}|${objectName || "unknown"}`,
  );
}
