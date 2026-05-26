"use client";

import clsx from "clsx";
import Link from "next/link";
import { forwardRef } from "react";
import { trackInternalCtaClick } from "@/lib/analytics";

const primaryBase = clsx(
  "inline-flex items-center justify-center rounded-md text-white shadow-sm transition-colors",
  "bg-[#1A6E6E] hover:bg-[#155858] active:bg-[#134949]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7DD3CF]",
  "disabled:opacity-50 disabled:pointer-events-none",
);

const sizeClasses = {
  default:
    "px-4 py-2 text-sm md:text-base 2xl:text-lg font-bold uppercase tracking-tight",
  compact: "px-4 py-2 text-sm font-bold uppercase tracking-tight",
  landing:
    "rounded-lg px-6 py-3 text-sm font-semibold tracking-normal normal-case",
  formSubmit:
    "w-full justify-center py-2 px-4 border border-transparent rounded-md md:text-xl font-bold uppercase tracking-tight",
  /** pravý konec pill lišty – max 1240px: plná šířka jako na mobilu */
  pillEnd:
    "rounded-r-full rounded-l-none px-4 py-3 min-[640px]:px-6 text-[11px] min-[640px]:text-xs font-bold uppercase tracking-wide min-h-[48px] min-[1241px]:min-h-[52px] min-[1241px]:flex min-[1241px]:items-center min-[1241px]:justify-center min-[1241px]:shrink-0 max-[1240px]:w-full max-[1240px]:rounded-full",
};

export const PrimaryButton = forwardRef(function PrimaryButton(
  { className, size = "default", children = "Poptávka ubytování", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(primaryBase, sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

PrimaryButton.displayName = "PrimaryButton";

export const PrimarySubmitButton = forwardRef(function PrimarySubmitButton(
  { className, size = "formSubmit", children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="submit"
      className={clsx(primaryBase, sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

PrimarySubmitButton.displayName = "PrimarySubmitButton";

export function PrimaryLink({
  href,
  className,
  size = "landing",
  children = "Poptávka ubytování",
  trackingName,
  trackingSource,
  ...props
}) {
  const handleClick = () => {
    if (trackingName) {
      trackInternalCtaClick(trackingName, trackingSource || "primary-link");
    }
  };

  return (
    <Link
      href={href}
      className={clsx(primaryBase, sizeClasses[size], className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
