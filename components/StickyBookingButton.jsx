"use client";

import { PrimaryLink } from "@/components/PrimaryCta";
import { useEffect, useState } from "react";

export default function StickyBookingButton() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById("booking-button-trigger");
      if (button) {
        const rect = button.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full flex justify-center md:justify-end mt-12 bg-white py-4">
      <div id="booking-button-trigger" className="h-0" />
      <div
        className={`${
          isSticky
            ? "fixed top-[0px] left-0 right-0 z-50 p-2 w-full bg-white/40 backdrop-blur-sm"
            : ""
        } transition-all duration-300`}
      >
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex justify-center md:justify-end">
            <PrimaryLink
              href="/booking"
              size="default"
              trackingName="sticky_booking"
              trackingSource="sticky-booking-button"
            >
              Poptat termín
            </PrimaryLink>
          </div>
        </div>
      </div>
    </div>
  );
}
