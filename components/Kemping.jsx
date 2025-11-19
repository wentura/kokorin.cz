import Image from "next/image";
import React from "react";
// import BookingButton from "./BookingButtonKemp";
import BookingButton from "./BookingButton";
import { kempingData } from "./KempingData";

const formatKpiText = (kpi) => {
  if (!kpi) return "";
  if (Array.isArray(kpi)) {
    return kpi.join(" ");
  }
  return kpi;
};

export default function Kemping() {
  return (
    <div
      className="bg-white py-6 sm:py-8 lg:py-12 my-8 md:my-24 2xl:my-44"
      id="kemping"
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* text - start */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-lg md:text-2xl xl:text-4xl font-extralight uppercase tracking-tight text-gray-800 md:mb-6 lg:text-3xl">
            Kempy a tábořiště
          </h2>
        </div>
        {/* text - end */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {kempingData.map((kemping) => {
            const description = formatKpiText(kemping?.kpi);
            const details = kemping?.kpi2;

            return (
              <div
                key={kemping.name}
                className={`border-1 border-gray-100 rounded-lg shadow-lg flex flex-col justify-between group ${
                  kemping.colSpan === "col-span-2" ? "md:col-span-2" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <a
                    href={kemping.href}
                    className="group relative flex min-h-80 items-end rounded-lg bg-gray-100 p-4 shadow-lg border-1 border-gray-100 group-hover:scale-105 transition-all duration-300"
                  >
                    <Image
                      src={kemping.image}
                      alt={kemping.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center rounded-t-lg"
                      priority={kemping.colSpan === "col-span-2"}
                      quality={85}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
                  </a>
                  <div className="text-gray-900 text-xl lg:text-3xl font-medium my-6 px-4" />
                  <div
                    className={`grid grid-cols-1 gap-6 px-4 text-xl pb-8 ${
                      kemping.colSpan === "col-span-2" ? "md:grid-cols-2" : ""
                    }`}
                  >
                    <div className="relative flex flex-col">
                      <span className="text-3xl font-extralight text-neutral-900 md:text-6xl uppercase tracking-tight">
                        {kemping.name}
                      </span>
                      {kemping.claim && (
                        <span className="text-md font-medium text-neutral-900 lg:text-xl tracking-wide">
                          {kemping.claim}
                        </span>
                      )}
                    </div>
                    <div
                      className={`flex flex-col gap-4 text-gray-500 ${
                        kemping.colSpan === "col-span-2" ? "max-w-5xl" : ""
                      }`}
                    >
                      {description && <span>{description}</span>}
                      {details && details.length > 0 && (
                        <ul className="list-disc pl-4 text-base text-gray-500 space-y-1">
                          {details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>
                      )}
                      {(kemping.preLinkText ||
                        kemping.linkText ||
                        kemping.postLinkText) && (
                        <span>
                          {kemping.preLinkText && (
                            <>{kemping.preLinkText} </>
                          )}
                          {kemping.linkText && (
                            <a
                              href={kemping.href}
                              className="text-teal-600 underline"
                            >
                              {kemping.linkText}
                            </a>
                          )}{" "}
                          {kemping.postLinkText}
                        </span>
                      )}
                    </div>
                  </div>
                  {kemping.longDesc && (
                    <span className="text-gray-500 text-sm p-4">
                      {kemping.longDesc}
                    </span>
                  )}
                </div>
                <div className="mb-4 flex flex-col md:flex-row items-center justify-between mx-4 gap-2">
                  <a
                    href={kemping.href}
                    className="w-full text-teal-600 text-sm font-light no-wrap underline underline-offset-2 decoration-teal-600 p-2 tracking-tight"
                  >
                    {kemping.hrefText || `navštívit web ${kemping.name}`}
                  </a>
                  {!kemping.hiddenBooking && (
                    <BookingButton
                      accommodation={kemping.name}
                      contact={kemping.contact}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
