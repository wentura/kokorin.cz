"use client";

import { trackPhoneClick } from "@/lib/analytics";

export default function TrackedPhoneLink({
  href = "tel:+420604674273",
  source = "unknown",
  className,
  children = "Zavolat",
}) {
  return (
    <a
      href={href}
      onClick={() => trackPhoneClick(source)}
      className={className}
    >
      {children}
    </a>
  );
}
