// "use client";
// import { motion } from "framer-motion";

import BookingButton from "@/components/BookingButton";
import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";
import Glamping from "@/components/Glamping";
import Header from "@/components/Header";
import Hero from "@/components/Hero_bak";
import HoverPanel from "@/components/HoverPanel";
import Kemping from "@/components/Kemping";
import Matomo from "@/components/Matomo";
import Penziony from "@/components/Penziony";
import StickyBookingButton from "@/components/StickyBookingButton";
import Stripe from "@/components/Stripe";
import Link from "next/link";

export default function Page() {
  return (
    <main className="">
      <Stripe text="nově poptávkový formulář" />
      {/* <Header /> */}
      {/* <HoverPanel
        className="w-full h-80"
        title="Kokořínsko"
        image="https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262136/Kamil/W45A8096.webp"
        href="https://www.kempharasov.cz"
        position="left"
      />
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        Draggable Content
      </motion.div> */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        Content
      </motion.div>
      <motion.div
        animate={{ x: 100 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        Springy Content
      </motion.div>
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Keyframe Content
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Content that animates on scroll
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Content that animates on scroll
      </motion.div> */}

      <div className="flex flex-col max-w-screen-2xl mx-auto my-10 md:my-16 gap-3 px-4">
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
            {/* <Link
              href="/booking"
              className="text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 px-4 py-2 rounded-md shadow-sm text-sm md:text-base 2xl:text-lg font-bold uppercase tracking-tight"
            >
              Poptávka ubytování
            </Link>*/}
          </div>
        </div>
      </div>
      <Hero />
      <div className="flex flex-col max-w-screen-2xl mx-auto my-16 gap-3 px-4">
        <p className="text-gray-800 text-lg md:text-xl">
          <span className="font-bold">Kokořínsko</span> vás vítá krajinou
          pískovcových skal, malebných hradů a tajemných lesů.
          <br />
          Stačí otevřít dveře a ocitnete se v přírodě – ideální pro cyklistické
          výlety, hradní dobrodružství i osvěžující koupání při rybníku.
        </p>
        <p className="text-gray-800 text-2xl md:text-4xl font-bold tracking-tight pt-12 text-right">
          Načerpejte energii a nechte se okouzlit místní atmosférou!
        </p>
        {/* <p className="text-gray-800 text-lg">
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
        </p> */}
        {/* <StickyBookingButton accommodation="Malba" /> */}
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
