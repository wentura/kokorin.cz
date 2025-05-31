"use client";

import BookingModal from "@/components/BookingModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    router.push("/");
  };

  return <BookingModal isOpen={isOpen} onClose={handleClose} />;
}
