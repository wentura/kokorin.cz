import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";
import Matomo from "@/components/Matomo";
import { PrimaryLink } from "@/components/PrimaryCta";
import Link from "next/link";

const base = "https://kokorin.cz";

export const metadata = {
  title: "Kempy Kokořínsko – stanování, karavany, tábořiště | Kokořín.cz",
  description:
    "Kempování na Kokořínsku: karavany, stany, vybavení kempů, sezóna a tipy na výlety. Odkazy na přehled objektů a centrální poptávku.",
  alternates: { canonical: "/kempy/kokorinsko" },
  openGraph: {
    title: "Kempy Kokořínsko – příroda, cyklistika a rodinné pobyty",
    description:
      "Jak vybrat kemp nebo tábořiště na Kokořínsku, na co se zeptat před příjezdem a jak doplnit plán výletů.",
    url: `${base}/kempy/kokorinsko`,
    siteName: "Kokořín.cz",
    locale: "cs_CZ",
    type: "website",
  },
};

const FAQ = [
  {
    q: "Potřebuji rezervovat kemp na Kokořínsku dopředu?",
    a: "V hlavní sezóně ano – zejména pro karavanové stání s přípojkou a oblíbené lokality u vody. Mimo sezónu bývá volněji, ale vždy ověřte otevírací dobu a zimní provoz na webu kempu.",
  },
  {
    q: "Jsou kempy vhodné pro rodiny s dětmi?",
    a: "Často ano – mnoho táboišť má hřiště, koupání v dosahu nebo programy pro děti. Ověřte si ale hluková pravidla večerů a bezpečnost u vody; každý provoz má jiné zaměření.",
  },
  {
    q: "Jak kemp zkombinovat s cyklovýlety?",
    a: "Vyberte kemp s úschovnou kol nebo alespoň uzamykatelným stáním. Kokořínsko má síť cyklotras – z mapy si naplánujte okruhy podle náročnosti a počasí.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kempy Kokořínsko – stany, karavany a tábořiště",
  url: `${base}/kempy/kokorinsko`,
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kokořín.cz", item: base },
    {
      "@type": "ListItem",
      position: 2,
      name: "Kempy Kokořínsko",
      item: `${base}/kempy/kokorinsko`,
    },
  ],
};

export default function KempyKokorinskoPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 md:py-16 prose prose-lg prose-gray max-w-none">
        <nav className="text-sm text-teal-700 not-prose mb-6">
          <Link href="/" className="hover:underline">
            Úvod
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">Kempy Kokořínsko</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-extralight uppercase tracking-tight text-gray-900 not-prose mb-6">
          Kempy Kokořínsko – stany, karavany a tábořiště v regionu
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed">
          Pro mnoho Čechů znamená výraz <strong>kempy Kokořínsko</strong> spojení
          dostupné přírody, cyklistiky a rodinného programu bez nutnosti
          investovat do hotelových pobytů. Kempy a tábořiště v oblasti nabízejí
          od jednoduchých parcel pro stany až po vybavené pozice pro obytné
          vozy s elektrickými přípojkami a vývody vody. Při výběru je důležité
          rozlišovat mezi rekreačním kempem s celodenním provozem a menším
          tábořištěm s omezenými službami – obojí má své publikum a jiná
          pravidla ohledně hluku, ohně a pobytu se psem.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Typický týden v kempu na Kokořínsku začíná pátečním příjezdem a
          pokračuje cyklovýlety, koupáním a návštěvami hradů. Děti ocení
          hřiště a krátké stezky v lese, dospělí večerní grilování a klidnější
          rána mimo městský ruch. Kapacity bývají v červenci a srpnu vyprodané
          rychle – pokud máte fixní termín, rezervujte co nejdříve. Mimo hlavní
          sezónu získáte často více soukromí a lepší dostupnost parcel, ale
          některé služby (obchod, půjčovna kol) mohou mít omezenou otevírací
          dobu. Obecný přehled stylů ubytování v regionu najdete na stránce{" "}
          <Link href="/ubytovani/kokorinsko" className="text-teal-600 underline">
            ubytování Kokořínsko
          </Link>
          .
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Karavanisté by měli sledovat šířku příjezdové cesty, obraty uvnitř
          areálu a dostupnost vypouštění šedé vody – informace bývají na webech
          kempů nebo v e-mailové komunikaci. Pro stanové party je zásadní
          zjistit, zda je povrch parcel tráva, štěrk nebo pevná dlažba, a zda
          jsou k dispozici altány pro případ deště. Kokořínsko má proměnlivé
          počasí; dobrá pláštěnka a vrstvené oblečení často rozhodnou o
          pohodě víc než jen teploměr.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Bezpečnost u vody je téma, které by rodiny neměly podceňovat –
          rybníky a přehrady v okolí lákají ke koupání, ale podmínky se mění
          podle ročního období a údržby. Respektujte místní zákazy a
          doporučení, hlídejte děti na molo i u brodění. Stejně tak platí
          pravidla CHKO v částech Kokořínska: pohyb mimo značené cesty nebo
          volné rozdělávání ohňů tam, kde to není povoleno, může znamenat
          postih – informujte se na informačních centrech nebo u obcí.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Pokud hledáte vyšší komfort než stan, ale stále „kempový“ zážitek,
          podívejte se na sekci{" "}
          <Link href="/#glamping" className="text-teal-600 underline">
            Glamping
          </Link>{" "}
          nebo na článek{" "}
          <Link href="/glamping/kokorinsko" className="text-teal-600 underline">
            glamping Kokořínsko
          </Link>
          . Tiny house a glampingové chatky často stojí v blízkosti klasických
          kempů a doplňují nabídku pro hosty, kteří po náročné túře nechtějí
          řešit stavbu stanu za tmy. Na úvodní stránce Kokořín.cz jsou kempy
          vypsány v bloku{" "}
          <Link href="/#kemping" className="text-teal-600 underline">
            Kempy a tábořiště
          </Link>{" "}
          s odkazy na provozovatele.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Stravování v kempu obvykle kombinuje vlastní vaření na vařiči,
          gril a nákupy v okolních obchodech. Některé areály mají restauraci
          nebo stánek s občerstvením v sezóně. Pokud preferujete polopenzi a
          servis, může být vhodnější{" "}
          <Link href="/#penziony" className="text-teal-600 underline">
            penzion
          </Link>{" "}
          – záleží na vašich prioritách. Centrální poptávka na{" "}
          <Link href="/booking" className="text-teal-600 underline font-medium">
            Kokořín.cz
          </Link>{" "}
          pomůže, pokud tápete mezi kempováním a jiným typem pobytu: vyplníte
          preference a dostanete návrhy z portfolia.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Cyklistika z kempové základny je na Kokořínsku jednou z hlavních
          aktivit. Volte trasy podle kondice skupiny – profil terénu může být
          místy náročnější, než mapa na první pohled naznačuje. Elektrokola
          získávají na oblibě; ověřte si u ubytování možnost nabíjení. Pro
          pěší turisty jsou atraktivní okruhy kolem skalních útvarů a vyhlídek;
          plánujte dostatek vody a buďte vidět v lese vůči cyklistům i
          lesním úsekům s provozem těžké techniky.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Kempy Kokořínsko mají smysl pro ty, kdo chtějí strávit dovolenou
          aktivně, nevadí jim sdílené zázemí sprch a kuchyňky a ocení nižší
          náklady za noc oproti hotelům. Region nabízí kulturní památky i klidné
          zákoutí lesů – kombinace obojího dělá z pobytu pestrý zážitek. Až
          budete mít vybraný směr, vraťte se na{" "}
          <Link href="/" className="text-teal-600 underline">
            úvod kokorin.cz
          </Link>
          , ověřte si konkrétní kemp v přehledu a domluvte rezervaci přímo u
          provozovatele. Přejeme šťastnou cestu a pohodové večery pod širým
          nebem.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 not-prose mt-14 mb-4">
          Časté dotazy
        </h2>
        <div className="space-y-4 not-prose">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <summary className="cursor-pointer font-medium text-gray-900">
                {item.q}
              </summary>
              <p className="mt-2 text-gray-700">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 not-prose text-center">
          <PrimaryLink href="/booking" size="landing">
            Poptávka ubytování
          </PrimaryLink>
        </p>
      </article>
      <FooterLinks />
      <Footer />
      <Matomo />
    </main>
  );
}
