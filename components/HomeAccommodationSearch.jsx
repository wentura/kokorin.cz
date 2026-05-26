"use client";

import dynamic from "next/dynamic";

const AccommodationSearchSection = dynamic(
  () => import("@/components/AccommodationSearchSection"),
  {
    ssr: false,
    loading: () => (
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 -mt-8 md:-mt-12 mb-10 md:mb-16">
        <div className="h-56 md:h-48 rounded-2xl bg-gray-100 animate-pulse" />
      </div>
    ),
  },
);

export default function HomeAccommodationSearch() {
  return <AccommodationSearchSection />;
}
