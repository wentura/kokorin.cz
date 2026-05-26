"use client";

import { trackExternalObjectClick } from "@/lib/analytics";

/**
 * Externí odkaz na web objektu s měřením kliku (Matomo).
 */
export default function TrackedExternalAnchor({
  href,
  className,
  children,
  section,
  objectName,
  rel = "noopener noreferrer",
  ...rest
}) {
  return (
    <a
      href={href}
      className={className}
      rel={rel}
      onClick={() => trackExternalObjectClick(section, objectName ?? href)}
      {...rest}
    >
      {children}
    </a>
  );
}
