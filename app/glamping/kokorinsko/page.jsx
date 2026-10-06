import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";
import { PrimaryLink } from "@/components/PrimaryCta";
import Link from "next/link";

const base = "https://kokorin.cz";

export const metadata = {
  title: "Glamping Kokořínsko – tiny house a komfortní kemp | Kokořín.cz",
  description:
    "Glamping na Kokořínsku: co od tiny house čekat, srovnání s penzionem a kempy, tipy na výlety a odkaz na centrální poptávku ubytování.",
  alternates: { canonical: "/glamping/kokorinsko" },
  openGraph: {
    title: "Glamping Kokořínsko – příroda s vyšším komfortem",
    description:
      "Průvodce glampingem a tiny house na Kokořínsku: vybavení, sezóna, pro koho se hodí a jak pokračovat k rezervaci.",
    url: `${base}/glamping/kokorinsko`,
    siteName: "Kokořín.cz",
    locale: "cs_CZ",
    type: "website",
  },
};

const FAQ = [
  {
    q: "Čím se glamping na Kokořínsku liší od klasického kempu?",
    a: "Glamping obvykle znamená stálou nebo mobilní stavbu s postelí, vytápěním nebo klimatizací a kuchyňským koutem – vyšší komfort než stan, ale často stále odděleně od hotelového standardu. Kemp nabízí parcelu a vlastní vybavení; glamping tuto bariéru snižuje.",
  },
  {
    q: "Je glamping vhodný pro rodiny s malými dětmi?",
    a: "Často ano – záleží na konkrétním objektu. Tiny house může mít omezený prostor pro dětskou postýlku; vždy ověřte kapacity a bezpečnost terasy či schodů. Některé provozy mají více lůžek nebo sousední jednotky pro větší skupiny.",
  },
  {
    q: "Jak glamping zkombinovat s výlety po regionu?",
    a: "Vyberte si základnu tak, abyste měli rozumný dojezd k hradům a cyklotrasám. Kokořínsko má hustou síť značených cest – glamping jako startovní bod funguje dobře pro páry a menší skupiny, které nepotřebují hotelové služby třikrát denně.",
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
  name: "Glamping Kokořínsko – tiny house a komfort v přírodě",
  url: `${base}/glamping/kokorinsko`,
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kokořín.cz", item: base },
    {
      "@type": "ListItem",
      position: 2,
      name: "Glamping Kokořínsko",
      item: `${base}/glamping/kokorinsko`,
    },
  ],
};

export default function GlampingKokorinskoPage() {
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
          <span className="text-gray-600">Glamping Kokořínsko</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-extralight uppercase tracking-tight text-gray-900 not-prose mb-6">
          Glamping Kokořínsko – tiny house a komfort v přírodě
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed">
          Hledání výrazu <strong>glamping Kokořínsko</strong> odráží rostoucí
          zájem o pobyt mezi skalami a lesy bez nutnosti stavět stan a spát na
          karimatce. Glamping (z „glamorous camping“) spojuje outdoorový zážitek
          s prvky komfortu: postel, často vlastní koupelna, vybavená kuchyň a
          terasa s výhledem. Na Kokořínsku najdete různé interpretace – od
          minimalistických modulů až po stylové tiny house s designovým
          vnitřním vybavením. Region je pro tento typ pobytu atraktivní díky
          tichým lokalitám, relativní dostupnosti z Prahy a bohaté síti turistických
          cílů v okolí.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Při porovnání s penzionem zvažte, zda potřebujte denní úklid,
          recepci a restauraci na místě. Glamping často funguje na principu
          samoobsluhy: host si přinese potraviny nebo využije místní bistra v
          okolních obcích. To může být výhoda pro páry hledající soukromí, naopak
          rodiny s náročným denním režimem mohou ocenit spíše penzion s
          dětským koutkem a stravováním. Na úvodní stránce Kokořín.cz najdete
          sekci{" "}
          <Link href="/#glamping" className="text-teal-600 underline">
            Glamping a tiny house
          </Link>{" "}
          s konkrétními objekty a odkazy na jejich weby.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Sezónnost u glampingu bývá výrazná: jarní a podzimní termíny nabízejí
          méně lidí na stezkách a příjemné teploty na chození; léto přitahuje
          hosty kvůli koupání a delším večerům venku. V zimě neprovozují všechny
          objekty celoroční provoz – izolace tiny house a zdroj tepla jsou
          klíčové, proto vždy ověřte dostupnost termínů. Pokud plánujete svátky
          nebo prodloužené víkendy, počítejte s vyšší poptávkou a rezervujte s
          předstihem. Obecné srovnání všech typů ubytování v regionu nabízí
          stránka{" "}
          <Link href="/ubytovani/kokorinsko" className="text-teal-600 underline">
            ubytování Kokořínsko
          </Link>
          .
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Vybavení glampingových jednotek se liší – někde je koupelna sdílená v
          areálu, jinde plně soukromá. Stejně tak se může lišit kuchyň: od
          jednoduchého vařiče po plnou linku s troubou. Při čtení popisů na
          webech provozovatelů sledujte počet lůžek, možnost přistýlky a
          pravidla k domácím mazlíčkům. Tyto detaily ovlivní nejen komfort, ale
          i cenu za noc, která u glampingu často sleduje sezónní špičky
          podobně jako u kempů.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Aktivity v okolí glampingové základny typicky zahrnují cyklistiku po
          zpevněných i lesních cestách, výstupy na vyhlídky a návštěvy hradů.
          Kokořínsko má také rybníky a přírodní koupání – informace o kvalitě
          vody a přístupu najdete u konkrétních lokalit v turistických mapách.
          Pokud cestujete ve větší skupině, domluvte si předem, zda areál
          umožňuje více chat vedle sebe nebo společné grilování; některé provozy
          mají pravidla ohledně hluku a ohňů z důvodu ochrany přírody.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Centrální poptávka na Kokořín.cz se hodí v situaci, kdy chcete
          glamping, ale ještě nevíte, který objekt nejlépe sedí vašemu termínu a
          rozpočtu. Ve formuláři na{" "}
          <Link href="/booking" className="text-teal-600 underline font-medium">
            /booking
          </Link>{" "}
          uvedete typ pobytu, počet osob a preference; tým může navrhnout
          shortlist z portfolia. Konečná rezervace často proběhne přímo u
          provozovatele, kde dostanete přesné podmínky storna a záloh.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Pro milovníky čistého kempování bez „glamu“ může být vhodnější
          klasický kemp – přehled najdete v sekci{" "}
          <Link href="/#kemping" className="text-teal-600 underline">
            Kempy
          </Link>{" "}
          na úvodní stránce nebo na tematické stránce{" "}
          <Link href="/kempy/kokorinsko" className="text-teal-600 underline">
            kempy Kokořínsko
          </Link>
          . Glamping je kompromisem mezi svobodou stanování a pohodlím
          penzionu; na Kokořínsku má smysl zejména tehdy, když chcete trávit
          čas venku, ale večer usínat v suchu a v teple. Pokud si nejste jisti,
          projděte si fotogalerie objektů, často prozradí rozlohu a skutečný
          stav vybavení lépe než obecné slogany.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed mt-6">
          Závěrem: glamping Kokořínsko je silným tahákem pro páry a menší
          skupiny hledající autentický kontakt s krajinou a přitom rozumný
          standard spaní a hygieny. Region nabízí dostatek podnětů k celodenním
          výletům, takže investice do kvalitnějšího ubytování se často vrátí
          lepší regenerací po túře. Vraťte se na{" "}
          <Link href="/" className="text-teal-600 underline">
            kokorin.cz
          </Link>
          , vyberte si konkrétní nabídku nebo využijte centrální poptávku – a
          užijte si Kokořínsko naplno.
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
