export const stayTypeOptions = [
  { value: "penzion", label: "Penzion" },
  { value: "glamping", label: "Glamping a tiny house" },
  { value: "kemping", label: "Kemp a tábořiště" },
  { value: "nevim_potrebuji_poradit", label: "Nevím, potřebuji poradit" },
];

export const travelIntentOptions = [
  { value: "rodina", label: "Rodina s dětmi" },
  { value: "par", label: "Pár" },
  { value: "skupina", label: "Skupina přátel" },
  { value: "cyklo", label: "Cyklo / aktivní pobyt" },
  { value: "relax", label: "Relax a klid" },
  { value: "jine", label: "Jiný typ pobytu" },
];

export const budgetRangeOptions = [
  { value: "", label: "Rozpočet neřeším" },
  { value: "do-3000", label: "Do 3 000 Kč / noc" },
  { value: "3000-5000", label: "3 000 až 5 000 Kč / noc" },
  { value: "5000-8000", label: "5 000 až 8 000 Kč / noc" },
  { value: "nad-8000", label: "Nad 8 000 Kč / noc" },
];

export function createLeadContext({
  source,
  sourcePage,
  sourceSection,
  object = null,
}) {
  return {
    source,
    sourcePage,
    sourceSection,
    sourceObjectId: object?.id ?? null,
    sourceObjectName: object?.name ?? null,
    sourceCategory: object?.category ?? null,
    sourceWebsite: object?.href ?? null,
    directContact: object?.contact ?? null,
  };
}
