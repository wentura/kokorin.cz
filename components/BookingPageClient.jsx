"use client";

import BookingModal from "@/components/BookingModal";
import { trackBookingModalOpen } from "@/lib/analytics";
import { createLeadContext } from "@/lib/leadOptions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BookingPageClient() {
  const router = useRouter();
  const leadContext = createLeadContext({
    source: "booking-page",
    sourcePage: "/booking",
    sourceSection: "booking-page",
  });

  useEffect(() => {
    trackBookingModalOpen("booking-page");
  }, []);

  const handleClose = () => {
    router.push("/");
  };

  return (
    <BookingModal
      isOpen={true}
      onClose={handleClose}
      leadContext={leadContext}
    />
  );
}
