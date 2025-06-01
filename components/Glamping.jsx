import React from "react";
import { glampingData } from "./GlampingData";
export default function Glamping() {
  return (
    <div
      className="bg-white py-6 sm:py-8 lg:py-12 my-8 md:my-24 2xl:my-44"
      id="glamping"
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* text - start */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-xl md:text-3xl xl:text-5xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Glamping a tiny house
          </h2>
          {/* <p className="mx-auto text-center text-gray-500 md:text-lg">
            Na Kokořínsku najdete mnoho glampingů a tiny house, které vám
            poskytnou příjemné ubytování a výbornou gastronomii.
          </p> */}
        </div>
        {/* text - end */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {glampingData.map((glamping) => (
            <div
              key={glamping.name}
              className={` ${
                glamping.colSpan === "col-span-2" ? "md:col-span-2" : ""
              }`}
            >
              <a
                href={glamping.href}
                className="flex flex-col min-h-80 rounded-lg shadow-lg border-1 border-gray-200"
              >
                <div className="group relative flex min-h-80 items-end rounded-lg bg-gray-100 p-4 shadow-lg border-1 border-gray-200">
                  <img
                    src={glamping.image}
                    loading="lazy"
                    alt={glamping.name}
                    className="absolute inset-0 h-full w-full object-cover object-center rounded-t-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
                  <div className="relative flex flex-col p-6 rounded-lg bg-gray-100/5 bg-clip-padding backdrop-filter backdrop-blur-sm">
                    <span className="text-xl font-semibold text-white lg:text-4xl">
                      {glamping.name}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-4 text-xl">
                  {glamping?.kpi?.map((kpi, index) => (
                    <span key={index} className="text-gray-500">
                      {kpi}
                    </span>
                  ))}
                </div>
                {glamping.longDesc && (
                  <span className="text-gray-500 text-sm p-4">
                    {glamping.longDesc}
                  </span>
                )}
                <div className="mb-4 flex justify-end mr-4">
                  <span className="text-white text-center text-sm uppercase font-bold p-2 bg-teal-600 rounded-md tracking-tight">
                    navštívit glamping {glamping.name}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
