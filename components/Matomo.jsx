"use client";

/**
 * Jednorázový pageview přes pixel (bez cookies).
 * Interakce (poptávka, outbound) se měří v lib/analytics.js stejným endpointem.
 */
export default function Matomo() {
  return (
    // Matomo tracking pixel — must stay a native <img>, not next/image
    // eslint-disable-next-line @next/next/no-img-element
    <img
      referrerPolicy="no-referrer-when-downgrade"
      src="https://matomo.zbyneksvoboda.cz/matomo.php?idsite=20&rec=1"
      className="border-0 invisible"
      alt="matomo"
      loading="lazy"
    />
  );
}
