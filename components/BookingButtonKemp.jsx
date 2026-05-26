"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/PrimaryCta";
import BookingModalKemp from "./BookingModalKemp";

export default function BookingButton({ accommodation, contact }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center md:justify-end mt-0">
      <PrimaryButton onClick={() => setIsOpen(true)}>
        Poptávka ubytování
      </PrimaryButton>
      <BookingModalKemp
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        accommodation={accommodation}
        contact={contact}
      />
    </div>
  );
}
