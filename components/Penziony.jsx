import { penzionyData } from "@/data/PenzionyData";
import PortfolioObjectCard from "./PortfolioObjectCard";

export default function Penziony() {
  return (
    <div
      className="bg-white py-6 sm:py-8 lg:py-12 my-8 md:my-24 2xl:my-44"
      id="penziony"
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* text - start */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-lg md:text-2xl xl:text-4xl font-extralight uppercase tracking-tight text-gray-800 md:mb-6 lg:text-3xl">
            Penziony
          </h2>
          {/* <p className="mx-auto text-center text-gray-500 md:text-lg">
            Na Kokořínsku najdete penziony, které vám poskytnou příjemné
            ubytování a výbornou gastronomii.
          </p> */}
        </div>
        {/* text - end */}
        <ul className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {penzionyData.map((penzion) => (
            <PortfolioObjectCard
              key={penzion.id}
              item={penzion}
              section="penziony"
              showColSpan
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
