import React from "react";
import BookingButton from "./BookingButton";
import { kempingData } from "./KempingData";
export default function Kemping() {
  return (
    <div
      className="bg-white py-6 sm:py-8 lg:py-12 my-8 md:my-24 2xl:my-44"
      id="kemping"
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* text - start */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-xl md:text-3xl xl:text-5xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Kempy a tábořiště
          </h2>
          {/* <p className="mx-auto text-center text-gray-500 md:text-lg">
            Tato stránka obsahuje informace o kempech v Kokořínsku.
          </p> */}
        </div>
        {/* text - end */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {kempingData.map((kemping) => (
            <div
              key={kemping.name}
              className={`border-1 border-gray-100 rounded-lg shadow-lg ${
                kemping.colSpan === "col-span-2" ? "md:col-span-2" : ""
              }`}
            >
              <a
                href={kemping.href}
                className="group relative flex min-h-80 items-end rounded-lg bg-gray-100 p-4 shadow-lg border-1 border-gray-100"
              >
                <img
                  src={kemping.image}
                  loading="lazy"
                  alt={kemping.name}
                  className="absolute inset-0 h-full w-full object-cover object-center rounded-t-lg"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
                <div className="relative flex flex-col p-6 rounded-lg bg-gray-100/5 bg-clip-padding backdrop-filter backdrop-blur-sm">
                  <span className="text-xl font-semibold text-white lg:text-4xl">
                    {kemping.name}
                  </span>
                </div>
              </a>
              <div className="text-gray-900 text-xl lg:text-3xl font-medium my-6 px-4">
                {kemping.claim}
              </div>
              <div className="flex flex-col gap-2 px-4 text-xl">
                {kemping?.kpi?.map((kpi, index) => (
                  <span key={index} className="text-gray-500">
                    {kpi}
                  </span>
                ))}
              </div>
              {kemping.longDesc && (
                <span className="text-gray-500 text-sm p-4">
                  {kemping.longDesc}
                </span>
              )}
              <div className="mb-4 flex flex-col md:flex-row items-center justify-between mx-2 gap-2">
                <a
                  href={kemping.href}
                  className="w-full text-teal-600 text-sm font-light no-wrap underline underline-offset-2 decoration-teal-600 p-2 tracking-tight"
                >
                  navštívit web {kemping.name}
                </a>
                {!kemping.hiddenBooking && (
                  <BookingButton
                    accommodation={kemping.name}
                    contact={kemping.contact}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
