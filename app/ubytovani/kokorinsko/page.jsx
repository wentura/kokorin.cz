import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";
import { PrimaryLink } from "@/components/PrimaryCta";
import Link from "next/link";

const base = "https://kokorin.cz";

export const metadata = {
  title: "Ubytování Kokořínsko – penziony, glamping, kempy | Kokořín.cz",
  description:
    "Průvodce ubytováním na Kokořínsku: penziony s gastronomií, glamping, kempy a centrální poptávka. Tipy na výlety, výběr typu pobytu a odkazy na rezervace.",
  alternates: { canonical: "/ubytovani/kokorinsko" },
  openGraph: {
    title: "Ubytování Kokořínsko – přehledně a podle typu pobytu",
    description:
      "Jak vybrat penzion, glamping nebo kemp na Kokořínsku, co od regionu čekat a jak funguje centrální poptávka Kokořín.cz.",
    url: `${base}/ubytovani/kokorinsko`,
    siteName: "Kokořín.cz",
    locale: "cs_CZ",
    type: "website",
  },
};

const FAQ = [
  {
    q: "Proč vyhledávat ubytování Kokořínsko právě přes Kokořín.cz?",
    a: "Získáte tematický kontext regionu, přehled typů zařízení a možnost jedné centrální poptávky. Nejedná se o agregátor všech kapacit na trhu, ale o kurátorský výběr portfolia s důrazem na Kokořínsko.",
  },
  {
    q: "Jak poznám, zda je pro mě lepší penzion nebo kemp?",
    a: "Penzion typicky nabízí pokoje, snídaně a často restauraci – hodí se pro hosty, kteří nechtějí řešit vaření a ocení pevné stěny. Kemp dává svobodu stanování nebo karavanu a často nižší cenu za noc, ale více vlastní přípravy. Glamping je mezičlánek – více komfortu než stan, stále silný kontakt s přírodou.",
  },
  {
    q: "Kde dokončím rezervaci konkrétního termínu?",
    a: "U většiny objektů na webech provozovatelů, kde jsou kalendáře a ceníky nejaktuálnější. Kokořín.cz vám pomůže s výběrem směru a s centrální poptávkou, pokud chcete doporučení nebo porovnání více variant.",
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
  name: "Ubytování Kokořínsko – průvodce výběrem pobytu",
  url: `${base}/ubytovani/kokorinsko`,
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kokořín.cz", item: base },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ubytování Kokořínsko",
      item: `${base}/ubytovani/kokorinsko`,
    },
  ],
};

export default function UbytovaniKokorinskoPage() {
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
          <span className="text-gray-600">Ubytování Kokořínsko</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-extralight uppercase tracking-tight text-gray-900 not-prose mb-6">
          Ubytování Kokořínsko – průvodce výběrem pobytu
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed">
          Kokořínsko je jednou z nejikoničtějších krajinných oblastí středních Čech:
          pískovcové věže, tiché lesy, rybníky a hrady včetně Kokořína lákají k
          celoroční turistice. Vyhledávání{" "}
          <strong>ubytování Kokořínsko</strong> ale může být časově náročné –
          kombinace penzionů, menších hotelů, glampingů a kempů má různé
          cílové skupiny a provozní pravidla. Cílem této stránky je srovnat
          očekávání typu pobytu s realitou regionu a nabídnout jednoznačné
          odkazy na další přehledy a na{" "}
          <Link href="/booking" className="text-teal-600 underline font-medium">
            centrální poptávku
          </Link>
          , pokud ještě nemáte vybraný konkrétní objekt.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Typický host na Kokořínsku přijíždí na dva až pět dní: cyklisté
          hledají bezpečné trasy s mírným převýšením, rodiny s dětmi zase
          koupání a krátké výlety k hradům. Při výběru ubytování proto mějte
          na paměti vzdálenost k cyklotrasám, možnost úschovy kol, parkování u
          objektu a případně přítomnost restaurace. Penziony v oblasti často
          kombinují snídaně a večerní menu – to je výhoda, pokud nechcete
          každý den řešit stravování. Naopak milovníci karavanů a stanů ocení
          kempy s elektrickými přípojkami a zázemím pro děti, které bývají v
          letní sezóně vyhledávané, proto je vhodné plánovat s předstihem.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Glamping a tiny house jako forma ubytování na Kokořínsku rostou
          popularity: nabízejí postel, kuchyňský kout a často vlastní terasu,
          čímž překonávají bariéry klasického „spánku ve spacáku“, ale drží
          kontakt s přírodou okolo. Pokud váháte mezi glampingem a penzionem,
          zvažte počet osob – pro menší skupiny jsou tiny house často
          efektivnější, při větší rodině se může vyplatit penzion s více
          pokoji pod jednou střechou. Naše stránka{" "}
          <Link href="/glamping/kokorinsko" className="text-teal-600 underline">
            glamping Kokořínsko
          </Link>{" "}
          rozvádí téma podrobněji včetně typických zařízení a stylů pobytu.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Region není homogenní – část Kokořínska je chráněným územím s
          regulovaným pohybem, jinde najdete vesnice s lokálními službami.
          Proto se vyplatí číst popisy konkrétních objektů v sekcích na úvodní
          stránce:{" "}
          <Link href="/#penziony" className="text-teal-600 underline">
            penziony
          </Link>
          ,{" "}
          <Link href="/#glamping" className="text-teal-600 underline">
            glamping
          </Link>
          ,{" "}
          <Link href="/#kemping" className="text-teal-600 underline">
            kempy
          </Link>
          . Každá karta odkazuje na oficiální web, kde jsou aktuální ceníky a
          pravidla pobytu. Kokořín.cz zde vstupuje jako rozcestník a může
          převzít roli „kvalifikační vrstvy“, pokud vyplníte poptávku – popíšete
          termín, počet osob, typ pobytu a preference; tým pak propojí dotaz s
          vhodnými provozovateli z portfolia.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Sezónnost hraje při ubytování Kokořínsko velkou roli. Léto přináší
          největší nápor na kempy a glampingy, jaro a podzim naopak klidnější
          trasy a fotogenické mlžné ráno u skal. Zimní měsíce jsou tišší, ale
          některé penziony nabízejí topení a vyhřívané prostory – vždy
          předem ověřte, zda objekt v zimě vůbec přijímá hosty. Pokud cestujete
          se psem, hledejte v popisech informaci o domácích mazlíčcích a
          případně to uveďte v poznámce k poptávce; pravidla se v jednotlivých
          zařízeních liší.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Kombinace aktivit je v regionu široká: pěší turistika po značených
          cestách, cyklostezky, koupání, návštěvy hradů a rozhleden. Doporučujeme
          si předem vybrat dva až tři hlavní cíle a podle toho zvolit ubytování
          tak, abyste nemuseli denně přejíždět desítky kilometrů. Pro hosty,
          kteří preferují spíše klid než adrenalin, jsou výhodné penziony v
          menších obcích; aktivní skupiny často ocení blízkost kempu s večerním
          společenským životem. Více o stanování a karavanech najdete na stránce{" "}
          <Link href="/kempy/kokorinsko" className="text-teal-600 underline">
            kempy Kokořínsko
          </Link>
          .
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Shrnutí: ubytování Kokořínsko si zaslouží promyšlený výběr podle typu
          cestování, sezóny a očekávaného komfortu. Kokořín.cz neslibuje
          nahrazení všech rezervačních systémů, ale přehled v regionu a
          možnost jedné centrální poptávky. Až budete mít jasno, vraťte se na{" "}
          <Link href="/" className="text-teal-600 underline font-medium">
            úvodní stránku
          </Link>
          , prohlédněte si karty objektů a případně odešlete poptávku – nebo
          pokračujte přímo na weby provozovatelů, když už máte favorita.
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

    </main>
  );
}
