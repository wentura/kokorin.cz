"use client";

import { trackObjectRequestClick } from "@/lib/analytics";
import { createLeadContext } from "@/lib/leadOptions";
import Image from "next/image";
import BookingButton from "./BookingButton";
import { PrimaryButton } from "./PrimaryCta";
import TrackedExternalAnchor from "./TrackedExternalAnchor";

const CATEGORY_BADGE = {
  penzion: "Penzion",
  glamping: "Glamping",
  kemping: "Kemp",
};

export default function PortfolioObjectCard({
  item,
  section,
  onBooking,
  showColSpan = false,
}) {
  const handleInlineBooking = () => {
    trackObjectRequestClick(section, item.name);
    onBooking(item);
  };

  return (
    <li
      className={`border border-gray-100 rounded-xl shadow-md overflow-hidden flex flex-col bg-white ${
        showColSpan && item.colSpan === "col-span-2" ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={item.image}
          alt={`${item.name} – ${item.mainBenefit || item.claim || "ubytování na Kokořínsku"}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          quality={80}
          priority={Boolean(item.colSpan === "col-span-2")}
        />
        <span className="absolute top-3 left-3 rounded-full bg-black/55 text-white text-xs px-2.5 py-1">
          {CATEGORY_BADGE[item.category] ?? item.category}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-lg lg:text-3xl xl:text-5xl font-extralight tracking-[-0.02em] uppercase text-gray-900">{item.name}</h3>
          <p className="text-sm md:text-base lg:text-xl text-gray-600 mt-0 tracking-tight">
            {item.claim}
          </p>
        </div>
<div>
  <p className="text-sm md:text-base text-gray-600 mt-1">{item.kpi[0]}</p>
</div>
        {/* {Array.isArray(item.tags) && item.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 5).map((tag) => (
              <span
                key={`${item.id}-${tag}`}
                className="text-[11px] px-2 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-100"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null} */}

        <div className="flex flex-wrap gap-2 items-stretch mt-auto">
          

          {onBooking ? (
          <div className="w-full flex justify-center gap-2"><TrackedExternalAnchor
          href={item.href}
          section={section}
          objectName={item.name}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7DD3CF]"
        >
          Detail webu
        </TrackedExternalAnchor>  <PrimaryButton
              size="compact"
              onClick={handleInlineBooking}
              className="flex-1 min-w-[10rem]"
            >
              Poptat termín
            </PrimaryButton></div>
          ) : item.hiddenBooking !== true ? (
            <div className="w-full flex justify-between gap-2 items-center text-center text-sm md:text-base">
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-medium text-gray-800 underline">
                {item.hrefText}
              </a>
            <BookingButton className="text-sm"
              leadContext={createLeadContext({
                source: "homepage-card",
                sourcePage: "/",
                sourceSection: section,
                object: item,
              })}
            />
            </div>
          ) : (
            <div className="w-full flex justify-start gap-2 items-center text-center text-sm md:text-base">
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-medium text-gray-800 underline">
                {item.hrefText}
              </a>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
