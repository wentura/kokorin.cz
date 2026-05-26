"use client";

import { trackBookingModalOpen } from "@/lib/analytics";
import { trackObjectRequestClick } from "@/lib/analytics";
import { useState } from "react";
import { PrimaryButton } from "@/components/PrimaryCta";
import BookingModal from "./BookingModal";

export default function BookingButton({ leadContext }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    const source =
      leadContext?.source || "homepage-generic";
    trackObjectRequestClick(
      leadContext?.sourceSection || "unknown",
      leadContext?.sourceObjectName || "unknown",
    );
    trackBookingModalOpen(source);
    setIsOpen(true);
  };

  return (
    <div className="w-full flex justify-center md:justify-end mt-0">
      <PrimaryButton onClick={handleOpen}>Poptat termín</PrimaryButton>
      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        leadContext={leadContext}
      />
    </div>
  );
}
