"use client";

import { trackInternalCtaClick } from "@/lib/analytics";
import Link from "next/link";

export default function TrackedInternalLink({
  href,
  source = "unknown",
  name = "internal_link",
  className,
  children,
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackInternalCtaClick(name, source)}
    >
      {children}
    </Link>
  );
}
