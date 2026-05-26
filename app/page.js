// "use client";
// import { motion } from "framer-motion";
// import Hero from "@/components/Hero";
import Image from "next/image";
import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";
import dynamic from "next/dynamic";
import Matomo from "@/components/Matomo";
const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: true,
  loading: () => (
    <div className="md:h-[50vh] min-h-[200px] md:min-h-[400px] w-full bg-gray-100 animate-pulse rounded-lg" />
  ),
});

const Penziony = dynamic(() => import("@/components/Penziony"), {
  loading: () => (
    <section className="max-w-screen-2xl mx-auto my-16 px-4">
      <div className="h-10 w-40 bg-gray-100 rounded-full mb-6 animate-pulse" />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    </section>
  ),
});

const Glamping = dynamic(() => import("@/components/Glamping"), {
  loading: () => (
    <section className="max-w-screen-2xl mx-auto my-16 px-4">
      <div className="h-10 w-56 bg-gray-100 rounded-full mb-6 animate-pulse" />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    </section>
  ),
});

const Kemping = dynamic(() => import("@/components/Kemping"), {
  loading: () => (
    <section className="max-w-screen-2xl mx-auto my-16 px-4">
      <div className="h-10 w-64 bg-gray-100 rounded-full mb-6 animate-pulse" />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-80 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    </section>
  ),
});

import HomeAccommodationSearch from "@/components/HomeAccommodationSearch";
import { PrimaryLink } from "@/components/PrimaryCta";
import StickyBookingButton from "@/components/StickyBookingButton";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import Link from "next/link";

export const metadata = {
  title: "Ubytování Kokořínsko - penziony, glamping a kemp u Harasova",
  description:
    "Vyberte si ubytování v Kokořínsku podle stylu cesty. Penziony, glamping chaty a kemp u rybníka Harasov. Pošlete nezávaznou poptávku.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ubytování v Kokořínsku podle stylu vaší cesty",
    description:
      "Kokořín.cz je obchodní rozcestník portfolia: porovnejte objekty a pošlete nezávaznou poptávku.",
    url: "https://kokorin.cz/",
    type: "website",
    locale: "cs_CZ",
  },
};

const HOMEPAGE_FAQ = [
  {
    question: "Jaký typ pobytu na Kokořínsku zvolit – penzion, glamping nebo kemp?",
    answer:
      "Záleží na komfortu, rozpočtu a stylu cestování. Penzion je vhodný pro hosty, kteří chtějí postel, snídani a často i restauraci na dosah. Glamping a tiny house kombinují přírodu s vyšším komfortem než klasický stan. Kempy a tábořiště ocení rodiny se stanem, karavanem nebo milovníci táboráků. Na úvodní stránce najdete sekce #penziony, #glamping a #kemping – projděte si je a porovnejte kapacity i vybavení.",
  },
  {
    question: "Co je centrální poptávka na Kokořín.cz?",
    answer:
      "Jedná se o jeden formulář, který můžete vyplnit, pokud ještě nemáte vybraný konkrétní objekt, nebo chcete porovnat více variant. Popíšete termín, počet osob, typ pobytu a preference; tým pak propojí poptávku s vhodnými provozovateli z portfolia. Slouží jako vstupní brána, aby se zbytečně neprodlužovalo hledání kontaktů po jednotlivých webech.",
  },
  {
    question: "Jaký je rozdíl mezi rezervací přímo u objektu a poptávkou přes Kokořín.cz?",
    answer:
      "Weby jednotlivých penzionů, glampingů a kempů obsahují aktuální ceníky, kalendáře a specifika provozu – tam často dokončíte konkrétní rezervaci. Kokořín.cz sjednocuje přehled nabídek v regionu a nabízí centrální poptávku, když potřebujete doporučení nebo krátký výběr z více míst. Obojí se doplňuje: přehled na Kokořín.cz, detailní domluva u provozovatele.",
  },
  {
    question: "Kde najdu tematické informace o ubytování podle způsobu pobytu?",
    answer:
      "Připravili jsme vstupní stránky podle častých dotazů z vyhledávání: ubytování Kokořínsko jako obecný přehled, glamping Kokořínsko pro příznivce komfortního kempování a kempy Kokořínsko pro klasické stanování a karavany. Z každé stránky vedou odkazy zpět na přehledy sekcí a na formulář poptávky.",
  },
  {
    question: "Je Kokořínsko vhodné pro rodiny s dětmi a cyklisty?",
    answer:
      "Ano – region nabízí bezpečné trasy v lesích, naučné stezky, koupání u rybníků a výlety k hradům. Při výběru ubytování zvažte vzdálenost k cyklotrasám, možnost úschovy kol a dětské vybavení u konkrétního objektu – detaily jsou vždy na webech provozovatelů nebo je můžete doplnit v poznámce k poptávce.",
  },
  {
    question: "Jak rychle dostanu odpověď na odeslanou poptávku?",
    answer:
      "Záleží na sezóně a vytížení provozovatelů. Obvykle se ozve provozovatel nebo koordinátor do několika pracovních dnů. Pokud potřebujete termín urgentně, použijte také přímé kontakty u vybraného objektu v sekci karet níže.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOMEPAGE_FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const homepageWebPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Ubytování v Kokořínsku podle stylu vaší cesty",
  url: "https://kokorin.cz/",
  description:
    "Obchodní vstupní portál pro výběr ubytování na Kokořínsku: penziony, glamping, kemp a centrální poptávka.",
};

const homepageBreadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Kokořín.cz",
      item: "https://kokorin.cz/",
    },
  ],
};

export default function Page() {
  return (
    <>
      {/* <Header /> */}

      <main className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageWebPageLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homepageBreadcrumbLd),
          }}
        />
        <section className="flex flex-col max-w-screen-2xl mx-auto my-10 md:my-16 gap-3 px-4">
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl xl:text-7xl font-extralight text-left -mb-3 tracking-[-0.03em] uppercase leading-tightest">
                Kokořínsko - nejlepší místo pro vaši dovolenou
              </h1>
              {/* <p className="text-lg md:text-2xl text-left font-semibold pl-1 tracking-tight text-gray-800">
                Penziony, glamping chaty a kemp u Harasova. Vyberte si místo,
                které sedí vašemu pobytu.
              </p>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl">
                Kokořín.cz není automatická rezervace. Pošlete nezávaznou
                poptávku, potvrzení termínu vždy řeší provozovatel.
              </p> */}
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-center md:justify-end gap-2 mt-4 md:mt-0">
              <PrimaryLink
                href="#ubytovani-filtr"
                trackingName="find_accommodation"
                trackingSource="homepage-hero"
                className="lg:px-12 xl:px-16 lg:py-4 xl:py-6 lg:text-lg xl:text-xl tracking-tight drop-shadow-lg lg:drop-shadow-xl xl:drop-shadow-2xl"
              >
                Najít ubytování
              </PrimaryLink>
              {/* <PrimaryLink
                href="/booking"
                className="bg-white font-medium !text-neutral-600 border border-gray-300 hover:bg-gray-50"
                trackingName="send_request"
                trackingSource="homepage-hero"
              >
                Poslat poptávku
              </PrimaryLink> */}
            </div>
          </div>
        </section>
        <Hero />
        <HomeAccommodationSearch />

        

        <section className="flex flex-col max-w-screen-2xl mx-auto my-16 gap-6 px-4">
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
            <span className="font-bold">Kokořínsko</span> vás vítá krajinou
            pískovcových skal, malebných hradů a tajemných lesů. Nabízíme vám
            přehled{" "}
            <Link
              href="#penziony"
              className="text-teal-600 underline underline-offset-2"
            >
              penzionů
            </Link>
            ,{" "}
            <Link
              href="#glamping"
              className="text-teal-600 underline underline-offset-2"
            >
              glamping a tiny house
            </Link>{" "}
            i{" "}
            <Link
              href="#kemping"
              className="text-teal-600 underline underline-offset-2"
            >
              kempy a tábořiště
            </Link>{" "}
            v regionu – stačí otevřít dveře a ocitnete se v přírodě. Ideální
            pro cyklistické výlety, hradní dobrodružství i osvěžující koupání u
            rybníka. Tematické vstupy najdete také na stránkách{" "}
            <Link
              href="/ubytovani/kokorinsko"
              className="text-teal-600 underline underline-offset-2 font-medium"
            >
              ubytování Kokořínsko
            </Link>
            ,{" "}
            <Link
              href="/glamping/kokorinsko"
              className="text-teal-600 underline underline-offset-2 font-medium"
            >
              glamping Kokořínsko
            </Link>{" "}
            a{" "}
            <Link
              href="/kempy/kokorinsko"
              className="text-teal-600 underline underline-offset-2 font-medium"
            >
              kempy Kokořínsko
            </Link>
            .
          </p>
          <p className="text-gray-800 text-2xl md:text-4xl font-bold tracking-tight pt-4 text-right">
            Vyberte místo, pošlete poptávku, provozovatel potvrdí termín.
          </p>
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed pt-4">
            Dovolená v Čechách nemusí znamenat dlouhé cestování.<br />Kokořínsko je
            jedna z nejkrásnějších přírodních oblastí Středočeského kraje:
            romantický hrad Kokořín, pískovcové Pokličky, údolí a rybníky lákají
            k pěším i cyklistickým výletům. Ubytování zde najdete v různých
            stylech – od pohodlných penzionů s restaurací až po glamping a kempy
            pro milovníky stanů a karavanů.
          </p>
          <Image src="https://res.cloudinary.com/dam7wdzvx/image/upload/v1775633404/Kamil/kokorin.webp" alt="Kokořínsko" width={800} height={600} className="w-full h-auto rounded-xl aspect-4/2 md:aspect-6/2 object-cover" />
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
            Ať už plánujete víkend na kole, dovolenou s dětmi u vody, nebo túru
            po skalách, náš přehled ubytování na Kokořínsku vám pomůže vybrat
            směr. Pro rychlou poptávku využijte formulář –{" "}
            <Link
              href="/booking"
              className="text-teal-600 underline underline-offset-2 font-medium"
            >
              poptávka ubytování
            </Link>{" "}
            je bez závazku a provozovatelé se vám ozvou s nabídkou. Pokud už
            víte, že hledáte konkrétní typ zařízení, proklikněte se do sekcí{" "}
            <Link href="#penziony" className="text-teal-600 underline">
              Penziony
            </Link>
            ,{" "}
            <Link href="#glamping" className="text-teal-600 underline">
              Glamping
            </Link>{" "}
            nebo{" "}
            <Link href="#kemping" className="text-teal-600 underline">
              Kempy
            </Link>{" "}
            a porovnejte styl pobytu, vzdálenost k trasám i rodinné vybavení.
          </p>
          
        </section>

        {/* <section className="max-w-screen-2xl mx-auto my-10 md:my-16 px-4">
          <h2 className="text-2xl md:text-3xl font-extralight uppercase tracking-tight text-gray-900 mb-6">
            Jak funguje poptávka
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">1. Vyberete styl pobytu</h3>
              <p className="text-sm text-gray-700 mt-2">
                Pomocí filtru porovnáte objekty podle kapacity, typu ubytování a
                mazlíčků.
              </p>
            </article>
            <article className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">2. Pošlete nezávaznou poptávku</h3>
              <p className="text-sm text-gray-700 mt-2">
                U vybraného objektu kliknete na „Poptat termín“ a vyplníte krátký
                formulář.
              </p>
            </article>
            <article className="rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">3. Ozve se provozovatel</h3>
              <p className="text-sm text-gray-700 mt-2">
                Potvrdí termín nebo navrhne vhodnou alternativu z portfolia.
              </p>
            </article>
          </div>
        </section> */}

        {/* <section
          id="faq"
          className="max-w-screen-2xl mx-auto my-16 px-4 scroll-mt-24"
        >
          <h2 className="text-2xl md:text-3xl font-extralight uppercase tracking-tight text-gray-900 mb-8">
            Časté dotazy k pobytu a poptávce
          </h2>
          <div className="space-y-4">
            {HOMEPAGE_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm open:shadow-md"
              >
                <summary className="cursor-pointer list-none font-medium text-gray-900 pr-8 relative">
                  {item.question}
                  <span className="absolute right-0 top-0 text-teal-600 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed text-base md:text-lg">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-gray-800 text-lg">
            Chcete rovnou začít? Přejděte na{" "}
            <Link
              href="/booking"
              className="text-teal-600 font-semibold underline underline-offset-2"
            >
              centrální poptávku ubytování
            </Link>{" "}
            nebo si projděte nabídky v sekcích výše.
          </p>
        </section> */}

        <Penziony />
        <Glamping />
        <Kemping />
        {/* <section className="max-w-screen-2xl mx-auto my-12 px-4">
          <div className="rounded-2xl bg-teal-50 border border-teal-100 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extralight uppercase tracking-tight text-gray-900">
                Nevíte, které místo vybrat?
              </h2>
              <p className="text-gray-700 mt-2">
                Pošlete poptávku a doporučíme variantu podle počtu osob, stylu
                pobytu a termínu.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <PrimaryLink
                href="/booking"
                trackingName="final_request"
                trackingSource="homepage-final-cta"
              >
                Poslat poptávku
              </PrimaryLink>
              <TrackedPhoneLink
                source="homepage-final-cta"
                className="inline-flex items-center justify-center rounded-lg border border-teal-700 px-6 py-3 text-sm font-semibold text-teal-800 hover:bg-teal-100"
              >
                Zavolat
              </TrackedPhoneLink>
            </div>
          </div>
        </section> */}
        <FooterLinks />
        <Footer />
        <Matomo />
        <StickyBookingButton />
      </main>
    </>
  );
}
