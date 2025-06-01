"use client";

import Link from "next/link";
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
            <Link
              href="/booking"
              className="text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 px-4 py-2 rounded-md shadow-sm text-sm md:text-base 2xl:text-lg font-bold uppercase tracking-tight"
            >
              Rezervace ubytování
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
