import "server-only";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/** Parsuje řetězec dd.mm.yyyy nebo vrátí null. */
export function parseCzDateStringToIso(value) {
  if (value == null || value === "") return null;
  if (typeof value !== "string") return null;
  const m = value.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  const d = new Date(year, month - 1, day);
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  ) {
    return null;
  }
  return d.toISOString().slice(0, 10);
}

/**
 * Uloží lead do Supabase. Selhání DB nesmí rozbít odeslání e-mailu — vrací { ok, error }.
 */
export async function persistAccommodationLead({
  siteSlug = "kokorin",
  data,
  leadContext,
  routing,
}) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.warn(
      "[accommodation_leads] Supabase není nakonfigurováno (chybí SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    );
    return { ok: false, error: new Error("supabase_not_configured") };
  }

  const payload = {
    ...data,
    leadContext: leadContext ?? {},
    routing: routing
      ? {
          routingMode: routing.routingMode,
          routingReason: routing.routingReason,
        }
      : {},
  };

  const row = {
    site_slug: siteSlug,
    source_page: data?.sourcePage ?? leadContext?.sourcePage ?? null,
    source_section: data?.sourceSection ?? leadContext?.sourceSection ?? null,
    source_object_id: data?.sourceObjectId ?? leadContext?.sourceObjectId ?? null,
    date_from: parseCzDateStringToIso(data?.dateFrom),
    date_to: parseCzDateStringToIso(data?.dateTo),
    adults: Number(data?.adults ?? 1) || 1,
    children_3_10: Number(data?.children ?? 0) || 0,
    dogs:
      typeof data?.pets === "number" && !Number.isNaN(data.pets)
        ? Math.max(0, Number(data.pets) || 0)
        : Number(data?.dogs ?? 0) || 0,
    cats:
      typeof data?.pets === "number" && !Number.isNaN(data.pets)
        ? 0
        : Number(data?.cats ?? 0) || 0,
    stay_type_filter: data?.stayType ?? null,
    name: data?.name ?? null,
    email: data?.email ?? null,
    phone: data?.phone ?? null,
    routing_mode: routing?.routingMode ?? null,
    routing_reason: routing?.routingReason ?? null,
    payload,
    email_sent: true,
  };

  const { error } = await supabase.from("accommodation_leads").insert(row);

  if (error) {
    console.error("[accommodation_leads] insert error:", error);
    return { ok: false, error };
  }

  return { ok: true };
}
