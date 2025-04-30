import React from "react";
import { glampingData } from "./GlampingData";
export default function Glamping() {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 min-h-screen" id="glamping">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* text - start */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Collections
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated.
          </p>
        </div>
        {/* text - end */}
        <div className="grid gap-6 sm:grid-cols-2">
          {glampingData.map((glamping) => (
            <div key={glamping.name}>
              <a
                href={glamping.href}
                className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
              >
                <img
                  src={glamping.image}
                  loading="lazy"
                  alt={glamping.name}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50" />
                <div className="relative flex flex-col">
                  <span className="text-gray-300">{glamping.description}</span>
                  <span className="text-lg font-semibold text-white lg:text-xl">
                    {glamping.name}
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
