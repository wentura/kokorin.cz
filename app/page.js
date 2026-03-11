// "use client";
// import { motion } from "framer-motion";
// import Hero from "@/components/Hero";
import BookingButton from "@/components/BookingButton";
import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";
import Header from "@/components/Header";
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

// import StickyBookingButton from "@/components/StickyBookingButton";
import Stripe from "@/components/Stripe";
import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      {/* <Header /> */}

      <main className="min-h-screen">
        <section className="flex flex-col max-w-screen-2xl mx-auto my-10 md:my-16 gap-3 px-4">
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-4xl font-extralight text-left -mb-3 md:text-8xl tracking-tight uppercase">
                Kokořínsko
              </h1>
              <h2 className="text-xl md:text-3xl text-left font-extrabold pl-1 tracking-wide">
                kraj pískovcových skal, hlubokých lesů a romantických míst
              </h2>
            </div>
            <div className="w-full flex justify-center md:justify-end mt-0">
              {/* Booking button can be added here if needed */}
            </div>
          </div>
        </section>

        <Hero />

        <section className="flex flex-col max-w-screen-2xl mx-auto my-16 gap-3 px-4">
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
            <span className="font-bold">Kokořínsko</span> vás vítá krajinou
            pískovcových skal, malebných hradů a tajemných lesů. Nabízíme vám
            přehled <Link href="#penziony" className="text-teal-600 underline underline-offset-2">penzionů</Link>,{" "}
            <Link href="#glamping" className="text-teal-600 underline underline-offset-2">glamping a tiny house</Link> i{" "}
            <Link href="#kemping" className="text-teal-600 underline underline-offset-2">kempy a tábořiště</Link> v regionu – stačí otevřít dveře a ocitnete se v přírodě. Ideální pro cyklistické výlety, hradní dobrodružství i osvěžující koupání u rybníka.
          </p>
          <p className="text-gray-800 text-2xl md:text-4xl font-bold tracking-tight pt-12 text-right">
            Načerpejte energii a nechte se okouzlit místní atmosférou!
          </p>
          {/* Návrh – upravte před publikací: další odstavce pro lepší SEO (min. 250 slov na stránce). */}
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed pt-6">
            Dovolená v Čechách nemusí znamenat dálkové cestování. Kokořínsko je jedna z nejkrásnějších přírodních oblastí Středočeského kraje: romantický hrad Kokořín, pískovcové Pokličky, údolí a rybníky lákají k pěším i cyklistickým výletům. Ubytování zde najdete v různých stylech – od pohodlných penzionů s restaurací až po glamping a kempy pro milovníky stanů a karavanů.
          </p>
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
            Ať už plánujete víkend na kole, dovolenou s dětmi u vody, nebo túru po skalách, náš přehled ubytování na Kokořínsku vám pomůže vybrat to pravé. Pro rychlou poptávku využijte formulář – <Link href="/booking" className="text-teal-600 underline underline-offset-2 font-medium">poptávka ubytování</Link> je bez závazku a provozovatelé se vám ozvou s nabídkou.
          </p>
        </section>

        <Penziony />
        <Glamping />
        <Kemping />
        <FooterLinks />
        <Footer />
        <Matomo />
        {/* <StickyBookingButton /> */}
      </main>
    </>
  );
}
