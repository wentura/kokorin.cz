"use client";

import HoverPanel from "@/components/HoverPanel";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <motion.main
      className="md:h-[50vh] min-h-[200px] md:min-h-[400px] w-full flex flex-col md:flex-row overflow-hidden gap-1 md:gap-0"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <HoverPanel
        title="Glamping a tiny house"
        image="https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262134/Kamil/vW45A8151.webp"
        href="#glamping"
        position="left"
      />
      <HoverPanel
        title="Penziony"
        image="https://www.harasov.eu/gallery/titulka_a_tiny.webp"
        href="#penziony"
        position="center"
      />
      <HoverPanel
        title="Kempy a tábořiště"
        image="https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262135/Kamil/W45A8080.webp"
        href="#kemping"
        position="right"
      />
    </motion.main>
  );
}
