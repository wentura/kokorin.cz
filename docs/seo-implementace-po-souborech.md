# SEO implementace po souborech

## Cíl

Převést SEO backlog na konkrétní změny v souborech projektu tak, aby šly postupně nasadit bez redesignu.

## Týden 1 – Technické minimum

- [ ] `app/layout.js`
  - Ověřit konzistenci `metadataBase`, `openGraph.url`, canonical konfigurace.
  - Doplnit/ověřit `apple-touch-icon` odkaz na lokální asset.
  - Ujistit se, že homepage a `/booking` mají vlastní canonical přes route metadata.
- [ ] `next.config.mjs`
  - Potvrdit jednotnou URL konvenci (`trailingSlash: false`) a držet ji konzistentně.
- [ ] `app/sitemap.js`
  - Ověřit, že obsahuje aktuální URL (`/`, `/booking`) a používá finální kanonickou doménu.
- [ ] `public/robots.txt`
  - Udržet minimální a přesná pravidla + správný odkaz na sitemap.
- [ ] `public/apple-touch-icon.png`
  - Přidat lokální ikonku 180x180 (pokud ještě chybí).

## Týden 2 – Obsah a strukturovaná data

- [ ] `app/page.js`
  - Finalizovat H1 + textovou sekci (300+ slov kvalitního textu, ne placeholder).
  - Přidat FAQ blok (4–6 otázek) navázaný na intent: výběr typu pobytu, centrální poptávka, rozdíl objekt vs. doporučení.
  - Posílit interní odkazy na `#penziony`, `#glamping`, `#kemping`, `/booking`.
- [ ] `app/layout.js`
  - Rozšířit JSON-LD o `Organization` a `WebSite`.
  - Udržet stávající `TouristDestination` a doplnit chybějící relevantní pole.

## Týden 3 – Landing pages podle intentu

- [ ] Nové soubory (App Router):
  - `app/ubytovani/kokorinsko/page.jsx`
  - `app/glamping/kokorinsko/page.jsx`
  - `app/kempy/kokorinsko/page.jsx`
- [ ] Pro každou landing page:
  - Přidat route `metadata` (unikátní title/description/canonical/OG).
  - Přidat 600+ slov kontextového textu.
  - Přidat interní linky na související sekce a `/booking`.
  - Přidat FAQ sekci (a případně route-level JSON-LD).
- [ ] `app/sitemap.js`
  - Doplnit nové landing URL.

## Týden 4 – Měření funnelu

- [ ] `components/Matomo.jsx` + případně nová utilita `lib/analytics.js`
  - Zavedeme event tracking pro:
    - klik na externí web objektu,
    - otevření centrální poptávky,
    - odeslání poptávky,
    - zdroj (`homepage-card`, `booking-page`, `homepage-generic`).
- [ ] `components/BookingButton.jsx`
  - Track otevření poptávky z objektové karty.
- [ ] `components/booking.jsx`
  - Track submit + výsledek (success/error) + routing mode.
- [ ] `components/Penziony.jsx`, `components/Glamping.jsx`, `components/Kemping.jsx`
  - Track odchody na externí weby objektů.

## Akceptační kritéria

- [ ] Canonical, sitemap a robots vrací konzistentní doménu a URL.
- [ ] Homepage projde znovu audit metrik: H1, počet slov, interní odkazy, Apple touch icon.
- [ ] Existují 3 intent landing pages s vlastním metadata a interním prolinkováním.
- [ ] Funnel je měřitelný na úrovni hlavních kroků (klik CTA, otevření formuláře, odeslání, routing mode).
