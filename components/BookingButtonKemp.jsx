"use client";

import { useState } from "react";
import BookingModalKemp from "./BookingModalKemp";

export default function BookingButton({ accommodation, contact }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center md:justify-end mt-0">
      <button
        onClick={() => setIsOpen(true)}
        className="text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 px-4 py-2 rounded-md shadow-sm text-sm md:text-base 2xl:text-lg font-bold uppercase tracking-tight"
      >
        Poptávka ubytování
      </button>
      <BookingModalKemp
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        accommodation={accommodation}
        contact={contact}
      />
    </div>
  );
}
