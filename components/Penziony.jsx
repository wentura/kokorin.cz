import React from "react";
import BookingButton from "./BookingButton";
import { penzionyData } from "./PenzionyData";
export default function Penziony() {
  return (
    <div
      className="bg-white py-6 sm:py-8 lg:py-12 my-8 md:my-24 2xl:my-44"
      id="penziony"
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* text - start */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-xl md:text-3xl xl:text-5xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Penziony
          </h2>
          {/* <p className="mx-auto text-center text-gray-500 md:text-lg">
            Na Kokořínsku najdete penziony, které vám poskytnou příjemné
            ubytování a výbornou gastronomii.
          </p> */}
        </div>
        {/* text - end */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {penzionyData.map((penzion) => (
            <div
              key={penzion.name}
              className={`border-1 border-gray-100 rounded-lg shadow-lg ${
                penzion.colSpan === "col-span-2" ? "md:col-span-2" : ""
              }`}
            >
              <div className="group relative flex min-h-80 items-end rounded-lg bg-gray-100 p-4 shadow-lg border-1 border-gray-100">
                <img
                  src={penzion.image}
                  loading="lazy"
                  alt={penzion.name}
                  className="absolute inset-0 h-full w-full object-cover object-center rounded-t-lg"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
                <div className="relative flex flex-col p-6 rounded-lg bg-gray-100/5 bg-clip-padding backdrop-filter backdrop-blur-sm">
                  {/* <span className="text-gray-300 text-lg lg:text-xl">
                      {penzion.description}
                    </span> */}
                  <span className="text-xl font-semibold text-white lg:text-4xl">
                    {penzion.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-4 text-xl">
                {penzion?.kpi?.map((kpi, index) => (
                  <span key={index} className="text-gray-500">
                    {kpi}
                  </span>
                ))}
              </div>
              {penzion.longDesc && (
                <span className="text-gray-500 text-sm p-4">
                  {penzion.longDesc}
                </span>
              )}
              <div className="mb-4 flex flex-col md:flex-row items-center justify-between mx-2 gap-2">
                <a
                  href={penzion.href}
                  className="w-full text-teal-600 text-sm font-light no-wrap underline underline-offset-2 decoration-teal-600 p-2 tracking-tight"
                >
                  navštívit {penzion.name}
                </a>
                <BookingButton accommodation={penzion.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
