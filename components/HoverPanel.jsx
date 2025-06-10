"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function HoverPanel({ title, image, href, position }) {
  const [isHovered, setIsHovered] = useState(false);

  const clipPaths = {
    left: "inset(0 0 0 0)",
    center: "inset(0 0 0 0)",
    right: "inset(0 0 0 0)",
  };

  const basisClasses = {
    left: isHovered ? "md:basis-3/7" : "md:basis-2/7",
    center: isHovered ? "md:basis-5/7" : "md:basis-3/7",
    right: isHovered ? "md:basis-3/7" : "md:basis-2/7",
  };

  return (
    <div className="w-full">
      <motion.div
        className={clsx(
          "relative transition-all duration-500 ease-in-out bg-cover bg-center opacity-100",
          "h-32 md:h-full min-h-32",
          "w-full",
          basisClasses[position],
        )}
        style={{
          backgroundImage: `url(${image})`,
          clipPath: clipPaths[position],
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: position === "left" ? 0 : position === "center" ? 0.2 : 0.4,
        }}
        whileHover={{ scale: 1.02 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={href}
          className="w-full h-full flex items-center justify-center bg-black/10 hover:bg-black/50 transition-colors"
        >
          <motion.h2
            className={clsx(
              "text-white text-3xl font-bold text-center p-4",
              isHovered ? "md:scale-110" : "md:scale-90 md:opacity-0",
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            {title}
          </motion.h2>
        </Link>
      </motion.div>
    </div>
  );
}
