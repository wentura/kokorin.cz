import "server-only";

import { getBookableObjectsByCategory, getPortfolioObjectById } from "@/lib/portfolioObjects";

export const CENTRAL_TRIAGE_EMAIL =
  process.env.BOOKING_TRIAGE_EMAIL || "kamil@kokorin.cz";

export function resolveLeadRouting({ leadContext, formData }) {
  const sourceObject = leadContext?.sourceObjectId
    ? getPortfolioObjectById(leadContext.sourceObjectId)
    : null;
  const wantsRecommendation = Boolean(formData?.wantsRecommendation);
  const stayType =
    formData?.stayType ||
    leadContext?.sourceCategory ||
    "nevim_potrebuji_poradit";
  const staysWithinSourceCategory =
    !sourceObject || stayType === sourceObject.category;

  if (
    sourceObject &&
    sourceObject.contact &&
    !wantsRecommendation &&
    staysWithinSourceCategory
  ) {
    return {
      routingMode: "direct_object",
      routingReason: "specific_object_selected",
      targetObjects: [sourceObject],
      targetEmails: [sourceObject.contact, CENTRAL_TRIAGE_EMAIL],
    };
  }

  if (stayType && stayType !== "nevim_potrebuji_poradit") {
    const shortlist = getBookableObjectsByCategory(stayType);

    return {
      routingMode: shortlist.length > 0 ? "shortlist" : "central_triage",
      routingReason: sourceObject
        ? "asked_for_alternatives"
        : "category_selected_without_object",
      targetObjects: shortlist,
      targetEmails: [CENTRAL_TRIAGE_EMAIL],
    };
  }

  return {
    routingMode: "central_triage",
    routingReason: "generic_request_without_clear_match",
    targetObjects: [],
    targetEmails: [CENTRAL_TRIAGE_EMAIL],
  };
}
