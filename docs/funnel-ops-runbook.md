# Kokořín.cz Funnel Ops Runbook

## Účel

Praktický návod, jak průběžně vyhodnocovat výkon funnelu, routing leadů a kvalitu předání poptávek bez redesignu UI.

## 1) Denní kontrola (10–15 min)

- Zkontroluj počet otevření poptávky (`Booking/open_request`) podle zdroje:
  - `homepage-card`
  - `homepage-generic`
  - `booking-page`
- Zkontroluj počet submitů:
  - `Booking/submit_success`
  - `Booking/submit_error`
- Zkontroluj odchody na weby objektů:
  - `Outbound/object_website`

## 2) Týdenní KPI dashboard

- `open_request_rate`
  - definice: otevření poptávky / návštěvy relevantních vstupních stránek
  - signál problému: dlouhodobý pokles > 20 % proti 4týdennímu průměru
- `submit_rate`
  - definice: `submit_success / open_request`
  - signál problému: pokles > 15 % WoW
- `error_rate`
  - definice: `submit_error / (submit_success + submit_error)`
  - signál problému: > 5 %
- `routing_mix`
  - definice: podíl `direct_object` vs `shortlist` vs `central_triage`
  - signál problému:
    - téměř vše `central_triage` = slabá kvalifikace
    - téměř vše `direct_object` = funnel neplní filtrační roli
- `outbound_ctr`
  - definice: kliky na weby objektů / návštěvy sekcí objektů
  - interpretace: vysoké `outbound_ctr` + nízký `submit_rate` = centrální poptávka nepřesvědčuje

## 3) Incident playbook (co dělat při odchylce)

### A) Roste `submit_error`

1. Ověř stav endpointu `/api/send-email`.
2. Ověř validitu cílových e-mailů v routingu (objekty + centrální inbox).
3. Ověř, že payload obsahuje `source`, `stayType`, `routingMode`.
4. Pokud chyba trvá > 30 min:
   - přepni interní prioritu na `central_triage`,
   - informuj provoz (SLA incident).

### B) Příliš vysoký podíl `central_triage`

1. Ověř, zda uživatelé volí `stayType` a `wantsRecommendation`.
2. Ověř mapování `sourceCategory` z objektových karet.
3. Projdi posledních 20 leadů:
   - kolik jich má chybějící kontext (`sourceObjectId`, `travelIntent`).
4. Pokud je problém ve sběru kontextu:
   - prioritně fixnout validaci/form defaults,
   - dočasně zavést ruční shortlist pravidla.

### C) Vysoké `outbound_ctr`, nízký `submit_rate`

1. Ověř copy kolem centrální poptávky (“co se stane po odeslání”).
2. Ověř, že tracking `open_request` běží na všech vstupech.
3. Porovnej výkon podle zdrojů:
   - pokud selhává jen `homepage-generic`, uprav edukaci ve flow.

## 4) Minimální datová kvalita leadu

Lead je „ready for routing“, pokud má:

- `source`, `sourcePage`, `sourceSection`
- `stayType`, `travelIntent`, `wantsRecommendation`
- `dateFrom`, `dateTo`, `adults`
- `routingMode`, `routingReason`

Pokud některé pole chybí, lead jde do `central_triage` s označením “needs_manual_qualification”.

## 5) Týdenní rozhodovací review (30 min)

- Vyhodnoť:
  - podíl `direct_object` / `shortlist` / `central_triage`
  - trend `submit_rate`
  - trend `error_rate`
  - top 5 objektů podle příchozích leadů
- Rozhodni:
  - zda upravit shortlist pravidla podle sezóny
  - zda je potřeba změnit prioritu mezi direct vs central
  - které objekty vyžadují SLA zásah (pomalé odpovědi)

## 6) Vlastnictví a SLA (doporučené)

- **Owner funnelu:** produkt/ops (Kokořín.cz)
- **Owner routingu:** ops + obchod
- **SLA první reakce na lead:** do 24 hodin v pracovní dny
- **Escalace:** pokud `error_rate > 5 %` nebo `submit_rate` klesne o > 20 % po 2 týdny

## 7) Měsíční výstup pro klienta

- Shrnutí KPI trendů (4–8 týdnů)
- Změny v routing pravidlech a jejich dopad
- Kvalita leadů (reply rate, validita)
- Návrh systémových změn (bez UI redesignu), které mají nejvyšší ROI
