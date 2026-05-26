# Kokořín.cz Portfolio Funnel

## Role webu

Kokořín.cz je centrální akviziční a kvalifikační vrstva pro portfolio objektů,
ne pouze inspirační rozcestník. Web má plnit dvě role současně:

- pomoci návštěvníkovi vybrat vhodný typ pobytu,
- zachytit lead v dostatečném kontextu pro správný routing a reporting.

Weby jednotlivých objektů zůstávají místem pro detail nabídky, důvěru a finální
rozhodnutí.

## Typy vstupu

- `homepage-card`: návštěvník vychází z konkrétní karty objektu
- `homepage-generic`: návštěvník chce obecně typ pobytu z homepage
- `booking-page`: návštěvník používá centrální formulář bez vybraného objektu

## Routing pravidla

### direct_object

Použije se, když uživatel vychází z konkrétního objektu a nechce doporučit
alternativy. Lead jde na e-mail objektu a současně do centrálního inboxu pro
reporting.

### shortlist

Použije se, když uživatel nemá konkrétní objekt, ale vybere typ pobytu
(`penzion`, `glamping`, `kemping`). Lead jde do centrálního inboxu a obsahuje
shortlist kandidátů pro ruční nebo následnou automatickou distribuci.

### central_triage

Použije se, když uživatel neví, co chce, nebo výslovně žádá doporučení. Lead
jde do centrálního inboxu a čeká na kvalifikaci.

## Rozhodovací tabulka routingu

| Vstup | Intent / podmínka | Výsledek | Cílové e-maily |
|---|---|---|---|
| `homepage-card` | vybraný konkrétní objekt + `wantsRecommendation = false` | `direct_object` | e-mail objektu + centrální inbox |
| `homepage-card` | uživatel chce i alternativy | `shortlist` (fallback `central_triage`) | centrální inbox |
| `homepage-generic` | vybraná kategorie (`penzion`/`glamping`/`kemping`) | `shortlist` (fallback `central_triage`) | centrální inbox |
| `booking-page` | bez jasné kategorie nebo `nevim_potrebuji_poradit` | `central_triage` | centrální inbox |
| libovolný | chybí objektový kontext nebo není dostupný kontakt objektu | `central_triage` | centrální inbox |

## Datový model leadu

### Zdroj a kontext

- `source`
- `sourcePage`
- `sourceSection`
- `sourceObjectId`
- `sourceObjectName`
- `sourceCategory`

### Kontakt

- `name`
- `email`
- `phone`

### Pobyt

- `dateFrom`
- `dateTo`
- `flexibleDates`
- `adults`
- `children`
- `pets`
- `budgetRange`
- `notes`

### Intent

- `stayType`
- `travelIntent`
- `wantsRecommendation`

### Routing metadata

- `routingMode`
- `routingReason`
- `targetObjectIds`
- `targetObjectNames`
- `targetEmails`

## Informační architektura bez redesignu

1. Uživatel volí intent:
   - chci konkrétní objekt
   - chci typ pobytu
   - potřebuji poradit
2. Následně se sbírá minimální kvalifikační kontext.
3. Teprve potom se rozhoduje o předání leadu.

## Co řeší Kokořín.cz

- výběr typu pobytu
- kvalifikaci leadu
- centrální poptávku
- routing
- měření funnelu

## Co řeší web objektu

- detail nabídky
- galerie a důvěryhodnost
- lokální argumentace a benefity
- přímý kontakt a finální rozhodnutí

## Metriky

- počet otevření centrální poptávky
- podíl `direct_object` vs `shortlist` vs `central_triage`
- počet leadů na objekt
- CTR na externí weby objektů
- dokončení formuláře
- drop-off po krocích formuláře
- booking conversion rate podle typu pobytu
- reply rate provozovatelů

### KPI s interpretací

- **`open_request_rate`**: kolik návštěvníků otevře poptávku; nízká hodnota = slabé vysvětlení hodnoty funnelu.
- **`submit_rate`**: podíl otevření poptávky -> odeslání; pokles = tření ve formuláři.
- **`routing_mix`**: rozložení `direct_object` / `shortlist` / `central_triage`; extrémy signalizují špatně nastavenou kvalifikaci.
- **`outbound_ctr`**: odchody na weby objektů; vysoký CTR + nízký submit může znamenat, že centrální poptávka nepřesvědčuje.
- **`lead_quality_proxy`**: reply rate a podíl validních leadů; pokles = slabý sběr intentu.
- **`lead_to_booking`** (pokud dostupné): hlavní outcome metrika kvality routingu.

## Otevřené business otázky pro klienta

- Kdo je vlastník centrálního inboxu a jaké je SLA na první reakci?
- Jaké jsou tvrdé priority mezi objekty při kolizi termínu nebo typu pobytu?
- Kdy má mít absolutní prioritu přímý lead na objekt a kdy centrální kvalifikace?
- Jak přesně se měří rezervace navázaná na lead (atribuce, časové okno)?
- Které objekty jsou substituty a které se navzájem nemají kanibalizovat?
- Jaký minimální datový standard musí mít lead, aby mohl být předán bez ručního doplnění?
