import { Resend } from "resend";
import { normalizeEmail } from "@/lib/emailSecurity";
import { renderConfirmationEmail, renderLeadEmail } from "@/lib/emailTemplates";
import { formatCzDate } from "@/lib/formatCzDate";
import { resolveLeadRouting } from "@/lib/leadRouting";
import { persistAccommodationLead } from "@/lib/persistAccommodationLead";
import { isAllowedBookingRecipientEmail } from "@/lib/portfolioObjects";

const resend = new Resend(process.env.RESEND_API_KEY);

const isProd = process.env.NODE_ENV === "production";

function jsonError(status, message, details) {
  if (isProd) {
    return Response.json({ error: message }, { status });
  }
  if (details != null) {
    return Response.json({ error: message, details }, { status });
  }
  return Response.json({ error: message }, { status });
}

function normalizeRecipientList(to) {
  if (to == null) return [];
  if (Array.isArray(to)) {
    return to.map((t) => (typeof t === "string" ? t.trim().toLowerCase() : "")).filter(Boolean);
  }
  if (typeof to === "string") {
    const n = to.trim().toLowerCase();
    return n ? [n] : [];
  }
  return [];
}

const LEGACY_ROUTING = {
  routingMode: "direct_object",
  routingReason: "legacy_contact_routing",
  targetObjects: [],
};

async function sendUserConfirmationIfNeeded(name, userEmail, formData) {
  const { data: emailData, error } = await resend.emails.send({
    from: "Kokořín.cz <info@kokorin.cz>",
    to: [userEmail],
    subject: "Vaše poptávka ubytování na Kokořín.cz",
    html: renderConfirmationEmail({
      name,
      dateFrom: formatCzDate(formData?.dateFrom),
      dateTo: formatCzDate(formData?.dateTo),
    }),
  });
  return { emailData, error };
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const {
      messageType = "legacy",
      to,
      subject,
      data,
      leadContext,
      sendUserConfirmation,
      adminTo,
    } = payload;

    if (messageType === "lead") {
      const userEmail = normalizeEmail(data?.email);
      if (!userEmail) {
        return jsonError(400, "Neplatný e-mail", { field: "email" });
      }

      const routing = resolveLeadRouting({ leadContext, formData: data });
      const recipients = [...new Set(routing.targetEmails.filter(Boolean))];
      const computedSubject =
        routing.routingMode === "direct_object"
          ? `Nová přímá poptávka z Kokořín.cz: ${data.sourceObjectName || data.accommodation || "objekt"}`
          : "Nová centrální poptávka z Kokořín.cz";

      const { data: emailData, error } = await resend.emails.send({
        from: "Kokořín.cz <info@kokorin.cz>",
        to: recipients,
        subject: computedSubject,
        html: renderLeadEmail({ data, leadContext, routing }),
      });

      if (error) {
        return jsonError(400, "Odeslání e-mailu se nezdařilo", error);
      }

      const shouldConfirm = sendUserConfirmation !== false;
      if (shouldConfirm) {
        const confirm = await sendUserConfirmationIfNeeded(
          data.name,
          userEmail,
          data,
        );
        if (confirm.error) {
          return jsonError(400, "Potvrzovací e-mail se nepodařilo odeslat", confirm.error);
        }
      }

      const persisted = await persistAccommodationLead({
        siteSlug: "kokorin",
        data,
        leadContext,
        routing,
      });
      if (!persisted.ok) {
        console.error("[send-email] accommodation_leads persist failed", persisted.error);
      }

      return Response.json({
        success: true,
        data: emailData,
        routing,
        persisted: persisted.ok,
      });
    }

    if (messageType === "legacyPair") {
      const admin = typeof adminTo === "string" ? adminTo.trim().toLowerCase() : "";
      if (!admin || !isAllowedBookingRecipientEmail(admin)) {
        return jsonError(403, "Nepovolený příjemce", { adminTo });
      }
      const userEmail = normalizeEmail(data?.email);
      if (!userEmail) {
        return jsonError(400, "Neplatný e-mail", { field: "email" });
      }

      const routing = {
        ...LEGACY_ROUTING,
        targetEmails: [admin],
      };

      const { data: adminMail, error: errAdmin } = await resend.emails.send({
        from: "Kokořín.cz <info@kokorin.cz>",
        to: [admin],
        subject: "Nová poptávka ubytování z Kokořín.cz",
        html: renderLeadEmail({
          data: {
            ...data,
            children: data.infants ?? 0,
            source: "legacy",
            sourcePage: "legacy",
            sourceSection: "legacy",
            stayType: "legacy",
            travelIntent: "legacy",
            wantsRecommendation: false,
            flexibleDates: false,
            pets: false,
            budgetRange: "",
          },
          leadContext: {},
          routing,
        }),
      });

      if (errAdmin) {
        return jsonError(400, "Odeslání e-mailu se nezdařilo", errAdmin);
      }

      const confirm = await sendUserConfirmationIfNeeded(
        data.name,
        userEmail,
        data,
      );
      if (confirm.error) {
        return jsonError(400, "Potvrzovací e-mail se nepodařilo odeslat", confirm.error);
      }

      return Response.json({
        success: true,
        data: adminMail,
        routing,
      });
    }

    const list = normalizeRecipientList(to);
    if (list.length === 0 || !list.every(isAllowedBookingRecipientEmail)) {
      return jsonError(403, "Nepovolený příjemce", null);
    }

    if (subject !== "Nová poptávka ubytování z Kokořín.cz") {
      return jsonError(
        400,
        "Neplatný typ požadavku. Použijte messageType lead nebo legacyPair.",
        { subject },
      );
    }

    const routing = {
      ...LEGACY_ROUTING,
      targetEmails: list,
    };

    const { data: emailData, error } = await resend.emails.send({
      from: "Kokořín.cz <info@kokorin.cz>",
      to: list,
      subject,
      html: renderLeadEmail({
        data: {
          ...data,
          children: data.infants ?? 0,
          source: "legacy",
          sourcePage: "legacy",
          sourceSection: "legacy",
          stayType: "legacy",
          travelIntent: "legacy",
          wantsRecommendation: false,
          flexibleDates: false,
          pets: false,
          budgetRange: "",
        },
        leadContext: {},
        routing,
      }),
    });

    if (error) {
      return jsonError(400, "Odeslání e-mailu se nezdařilo", error);
    }

    return Response.json({ success: true, data: emailData, routing });
  } catch (error) {
    const msg =
      error && typeof error === "object" && "message" in error
        ? String(error.message)
        : String(error);
    return jsonError(500, isProd ? "Interní chyba serveru" : msg, !isProd ? error : undefined);
  }
}
