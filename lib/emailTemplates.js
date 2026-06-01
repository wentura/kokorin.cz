import { escapeHtml, safeHttpUrlForHref } from "@/lib/emailSecurity";
import { formatCzDate } from "@/lib/formatCzDate";

export const USER_CONFIRMATION_HTML = `Děkujeme za vaši poptávku ubytování na Kokořín.cz.<br />Budeme vás kontaktovat co nejdříve.<br /><br /><br />S pozdravem, tým Kokořín.cz`;

const formatBoolean = (value) => (value ? "ano" : "ne");

/** Počet mazlíčků: nové leady mají `pets` jako číslo; starší jen psy/kočky. */
const petCountForEmail = (data) => {
  if (typeof data?.pets === "number" && !Number.isNaN(data.pets)) {
    return Math.max(0, data.pets);
  }
  if (typeof data?.pets === "string" && data.pets.trim() !== "") {
    const n = Number(data.pets);
    if (!Number.isNaN(n)) return Math.max(0, n);
  }
  return (
    (Number(data?.dogs ?? 0) || 0) + (Number(data?.cats ?? 0) || 0)
  );
};

const renderTargetObjects = (targetObjects = []) => {
  if (targetObjects.length === 0) {
    return "<p><strong>Kandidáti:</strong> budou určeni centrálním triage.</p>";
  }

  return `
    <p><strong>Kandidáti / cílové objekty:</strong></p>
    <ul>
      ${targetObjects
        .map((item) => {
          const name = escapeHtml(item.name);
          const cat = escapeHtml(item.category);
          const href = item.href ? escapeHtml(item.href) : "";
          return `<li>${name} (${cat})${href ? ` - ${href}` : ""}</li>`;
        })
        .join("")}
    </ul>
  `;
};

export function renderLeadEmail({ data, leadContext, routing }) {
  const safeWebsite = leadContext?.sourceWebsite
  ? safeHttpUrlForHref(leadContext.sourceWebsite)
  : null;
  const websiteBlock = safeWebsite
  ? `<p><strong>Zdrojový web objektu:</strong> <a href="${escapeHtml(safeWebsite)}">${escapeHtml(safeWebsite)}</a></p>`
  : leadContext?.sourceWebsite
  ? `<p><strong>Zdrojový web objektu:</strong> ${escapeHtml(leadContext.sourceWebsite)}</p>`
  : "";
  
  return `
  <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto; padding: 20px;">
  <h2>Nová poptávka na Kokořín.cz</h2>
  <p><strong>Jméno:</strong> ${escapeHtml(data.name)}</p>
  <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
  <p><strong>Telefon:</strong> ${escapeHtml(data.phone || "neuveden")}</p>
  <p><br /><strong>Od:</strong> ${escapeHtml(formatCzDate(data.dateFrom))}</p>
  <p><strong>Do:</strong> ${escapeHtml(formatCzDate(data.dateTo))}</p>
  <p><strong>Flexibilní termín:</strong> ${formatBoolean(data.flexibleDates)}</p>
  <p><br /><strong>Počet dospělých:</strong> ${escapeHtml(String(data.adults ?? ""))}</p>
  <p><strong>Počet dětí (3–10 let):</strong> ${escapeHtml(String(data.children ?? ""))}</p>
  <p><strong>Počet mazlíčků:</strong> ${escapeHtml(String(petCountForEmail(data)))}</p>
  <p><br /><strong>Vybraný objekt:</strong> ${escapeHtml(data.sourceObjectName || "neuveden")}</p>
  <p><strong>Preferuje:</strong> ${escapeHtml(String(data.stayType ?? ""))}</p>
  <p><strong>Pro koho pobyt vybral:</strong> ${escapeHtml(String(data.travelIntent ?? ""))}</p>
  <p><strong>Doporučit alternativy:</strong> ${formatBoolean(data.wantsRecommendation)}</p>
  ${renderTargetObjects(routing.targetObjects)}
  ${
    data.notes
    ? `
    <p><strong>Poznámka k poptávce:</strong></p>
    <p style="white-space: pre-wrap; background-color: #f9fafb; padding: 10px; border-radius: 4px;">${escapeHtml(data.notes)}</p>
    `
    : ""
  }
  ${websiteBlock}
  </div>
  `;
}

{/* <p class="hidden"><strong>Routing mód:</strong> ${escapeHtml(routing.routingMode)}</p> */}
{/* <p class="hidden"><strong>Důvod routingu:</strong> ${escapeHtml(routing.routingReason)}</p> */}
{/* <p class="hidden"><strong>Zdroj:</strong> ${escapeHtml(data.source)} / ${escapeHtml(data.sourcePage)} / ${escapeHtml(data.sourceSection)}</p> */}


export function renderConfirmationEmail({ name, dateFrom, dateTo }) {
  const fromLabel = formatCzDate(dateFrom);
  const toLabel = formatCzDate(dateTo);
  const termLine =
    fromLabel && toLabel
      ? `Poptávku ubytování v termínu příjezd ${escapeHtml(fromLabel)}, odjezd ${escapeHtml(toLabel)} jsme přijali, budeme vás kontaktovat co nejdříve.`
      : USER_CONFIRMATION_HTML;

  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <p>Dobrý den ${escapeHtml(name)},</p>
    <p>${termLine}</p>
    <p>S přáním hezkého dne za tým Kokořín.cz<br />Kamil Veselý</p>
  </div>
`;
}
