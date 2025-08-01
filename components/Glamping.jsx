import Image from "next/image";
import React from "react";
import BookingButton from "./BookingButton";
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
          <h2 className="mb-4 text-center text-lg md:text-2xl xl:text-4xl font-extralight uppercase tracking-tight text-gray-800 md:mb-6 lg:text-3xl">
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
              className={`border-1 border-gray-100 rounded-lg shadow-lg flex flex-col justify-between hover:scale-105 transition-all duration-300 ${
                glamping.colSpan === "col-span-2" ? "md:col-span-2" : ""
              }`}
            >
              <div>
                <a
                  href={glamping.href}
                  className="group relative flex min-h-80 items-end rounded-lg bg-gray-100 p-4 shadow-lg border-1 border-gray-100"
                >
                  <Image
                    src={glamping.image}
                    alt={glamping.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center rounded-t-lg"
                    priority={glamping.colSpan === "col-span-2"}
                    quality={85}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
                  <div className="relative flex flex-col p-4 rounded-xl bg-gray-100/5 bg-clip-padding backdrop-filter backdrop-blur-sm">
                    <span className="text-3xl font-extralight text-white md:text-6xl uppercase tracking-tight">
                      {glamping.name}
                    </span>
                    <span className="text-md font-medium text-white lg:text-xl pt-4 tracking-wide">
                      {glamping.claim}
                    </span>
                  </div>
                </a>
                <div className="text-gray-900 text-xl lg:text-3xl font-medium my-6 px-4">
                  {/* {glamping.claim} */}
                </div>
                <div className="flex flex-col gap-0 px-4 text-xl pb-8">
                  {/* {glamping?.kpi?.map((kpi, index) => (
                    <span key={index} className="text-gray-500">
                      {kpi}
                    </span>
                  ))} */}
                  <span
                    className={`text-gray-500 ${
                      glamping.colSpan === "col-span-2" ? "max-w-5xl" : ""
                    }`}
                  >
                    {glamping?.kpi} {glamping.preLinkText}{" "}
                    <a href={glamping.href} className="text-teal-600 underline">
                      {glamping.linkText}
                    </a>{" "}
                    {glamping.postLinkText}
                  </span>
                </div>
                {glamping.longDesc && (
                  <span className="text-gray-500 text-sm p-4">
                    {glamping.longDesc}
                  </span>
                )}
              </div>
              <div className="mb-4 flex flex-col md:flex-row items-center justify-between mx-4 gap-2">
                <a
                  href={glamping.href}
                  className="w-full text-teal-600 text-sm font-light no-wrap underline underline-offset-2 decoration-teal-600 p-2 tracking-tight"
                >
                  navštívit web {glamping.name}
                </a>
                <BookingButton
                  accommodation={glamping.name}
                  contact={glamping.contact}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
