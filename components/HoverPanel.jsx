"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function HoverPanel({ title, image, href, position }) {
  const [isHovered, setIsHovered] = useState(false);

  const clipPaths = {
    left: "inset(0 1% 0 0)",
    center: "inset(0 1% 0 1%)",
    right: "inset(0 0 0 1%)",
  };

  const basisClasses = {
    left: isHovered ? "md:basis-4/7" : "md:basis-2/7",
    center: isHovered ? "md:basis-5/7" : "md:basis-3/7",
    right: isHovered ? "md:basis-4/7" : "md:basis-2/7",
  };

  return (
    <div
      className={clsx(
        "relative transition-all duration-500 ease-in-out bg-cover bg-center opacity-100 animate-fadeIn",
        "h-[33.33vh] md:h-full",
        "w-full md:hover:grow",
        basisClasses[position]
      )}
      style={{
        backgroundImage: `url(${image})`,
        clipPath: clipPaths[position],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        className="w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
      >
        <h2
          className={clsx(
            "text-white text-3xl font-bold text-center p-4 transition-all duration-500",
            isHovered ? "scale-110" : "scale-90 opacity-0 animate-scaleIn"
          )}
        >
          {title}
        </h2>
      </Link>
    </div>
  );
}
