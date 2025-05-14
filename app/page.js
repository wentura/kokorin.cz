import Glamping from "@/components/Glamping";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Kemping from "@/components/Kemping";
import Penziony from "@/components/Penziony";
export default function Page() {
  return (
    <main className="bg-gray-100">
      <Header />
      <div className="flex flex-col max-w-screen-2xl mx-auto my-16 gap-3 px-4">
        <h1 className="text-4xl font-extrabold text-left -mb-3">Kokořínsko</h1>
        <h2 className="text-2xl text-left mb-8">
          kraj pískovcových skal, hlubokých lesů a romantických hradů
        </h2>
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
      </div>
      <Hero />
      <Penziony />
      <Glamping />
      <Kemping />
    </main>
  );
}
