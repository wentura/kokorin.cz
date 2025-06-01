import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";
import Glamping from "@/components/Glamping";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Kemping from "@/components/Kemping";
import Matomo from "@/components/Matomo";
import Penziony from "@/components/Penziony";
import StickyBookingButton from "@/components/StickyBookingButton";
import Link from "next/link";

export default function Page() {
  return (
    <main className="">
      {/* <Header /> */}
      <div className="flex flex-col max-w-screen-2xl mx-auto my-10 md:my-16 gap-3 px-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold text-left -mb-3">
              Kokořínsko
            </h1>
            <h2 className="text-2xl text-left">
              kraj pískovcových skal, hlubokých lesů a romantických hradů
            </h2>
          </div>
          <div className="w-full flex justify-center md:justify-end mt-4 md:mt-0">
            <Link
              href="/booking"
              className="text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 px-4 py-2 rounded-md shadow-sm text-sm md:text-base 2xl:text-lg font-bold uppercase tracking-tight"
            >
              Rezervace ubytování
            </Link>
          </div>
        </div>
      </div>
      <Hero />
      <div className="flex flex-col max-w-screen-2xl mx-auto my-16 gap-3 px-4">
        <p className="text-gray-800 text-lg">
          <span className="font-bold">Kokořínsko</span> láká návštěvníky
          unikátními pískovcovými útvary a skalními městy, které patří k
          nejkrásnějším v Česku.
        </p>
        <p className="text-gray-800 text-lg">
          Romantické hrady, jako je <span className="font-bold">Kokořín</span>,{" "}
          <span className="font-bold">Houska</span> nebo{" "}
          <span className="font-bold">Bezděz</span>, dodávají oblasti jedinečnou
          historickou atmosféru. Milovníci aktivního odpočinku si užijí hustou
          síť turistických a cyklostezek v malebné přírodě.
        </p>
        <p className="text-gray-800 text-lg">
          <span className="font-bold">Kokořínsko</span> je také domovem vzácných
          druhů rostlin a živočichů, což ocení každý příznivec přírody.
          Panoramatické výhledy, možnost koupání a relaxace v přírodě dělají z a
          relaxace v přírodě dělají z Kokořínska ideální místo pro dovolenou.
        </p>
        <StickyBookingButton />
      </div>
      <Penziony />
      <Glamping />
      <Kemping />
      <FooterLinks />
      <Footer />
      <Matomo />
    </main>
  );
}
