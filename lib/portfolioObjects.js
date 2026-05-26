import { glampingData } from "@/data/GlampingData";
import { kempingData } from "@/data/KempingData";
import { penzionyData } from "@/data/PenzionyData";

export const portfolioObjects = [
  ...penzionyData,
  ...glampingData,
  ...kempingData,
];

export function getPortfolioObjectById(id) {
  return portfolioObjects.find((item) => item.id === id) ?? null;
}

export function getBookableObjectsByCategory(category) {
  return portfolioObjects.filter(
    (item) => item.category === category && item.hiddenBooking !== true,
  );
}

/** @typedef {"all"|"penzion"|"glamping"|"kemping"} StayCategoryFilter */

/**
 * Live filtr podle kapacity a mazlíčků (bez kalendáře volných termínů).
 * @param {{
 *   adults?: number;
 *   children310?: number;
 *   dogs?: number;
 *   cats?: number;
 *   pets?: number;
 *   category?: StayCategoryFilter;
 *   categories?: string[];
 *   styleTag?: string;
 * }} criteria
 */
export function filterPortfolioObjects(criteria = {}) {
  const adults = Math.max(0, Number(criteria.adults ?? 1) || 1);
  const children310 = Math.max(0, Number(criteria.children310 ?? 0) || 0);
  const dogs = Math.max(0, Number(criteria.dogs ?? 0) || 0);
  const cats = Math.max(0, Number(criteria.cats ?? 0) || 0);
  const category = criteria.category ?? "all";
  const categories = criteria.categories;
  const styleTag =
    typeof criteria.styleTag === "string" ? criteria.styleTag.trim() : "";

  const petTotal =
    criteria.pets != null && criteria.pets !== ""
      ? Math.max(0, Number(criteria.pets) || 0)
      : dogs + cats;

  const totalGuests = adults + children310;

  return portfolioObjects.filter((item) => {
    if (item.hiddenBooking === true) return false;
    if (item.hiddenFromFilter === true) return false;

    if (Array.isArray(categories)) {
      if (categories.length === 0) return false;
      if (categories.length < 3 && !categories.includes(item.category)) {
        return false;
      }
    } else if (category !== "all" && item.category !== category) {
      return false;
    }

    if (styleTag) {
      const tags = Array.isArray(item.tags) ? item.tags : [];
      const hasTag = tags.some(
        (tag) =>
          typeof tag === "string" &&
          tag.toLowerCase().includes(styleTag.toLowerCase()),
      );
      if (!hasTag) return false;
    }

    const maxGuests =
      typeof item.maxGuests === "number" && Number.isFinite(item.maxGuests)
        ? item.maxGuests
        : Infinity;
    const maxChildren =
      typeof item.maxChildren310 === "number"
        ? item.maxChildren310
        : maxGuests;
    const maxDogs = typeof item.maxDogs === "number" ? item.maxDogs : 0;
    const maxCats = typeof item.maxCats === "number" ? item.maxCats : 0;
    const maxPetsCombined = maxDogs + maxCats;

    if (totalGuests > maxGuests) return false;
    if (children310 > maxChildren) return false;
    if (petTotal > maxPetsCombined) return false;
    return true;
  });
}

/** E-maily provozovatelů z portfolia + centrální triage (pro validaci outbound z API). */
export function getAllowedBookingRecipientEmailSet() {
  const emails = new Set();
  for (const o of portfolioObjects) {
    if (o.contact && typeof o.contact === "string") {
      emails.add(o.contact.trim().toLowerCase());
    }
  }
  emails.add(
    (process.env.BOOKING_TRIAGE_EMAIL || "svoboda.zbynek@gmail.com").trim().toLowerCase(),
  );
  return emails;
}

export function isAllowedBookingRecipientEmail(email) {
  const n = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!n) return false;
  return getAllowedBookingRecipientEmailSet().has(n);
}
