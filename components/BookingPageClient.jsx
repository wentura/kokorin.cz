"use client";

import BookingModal from "@/components/BookingModal";
import { useRouter } from "next/navigation";

export default function BookingPageClient() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return (
    <BookingModal
      isOpen={true}
      onClose={handleClose}
      accommodation={undefined}
      contact={undefined}
    />
  );
}
