"use client";

export default function Stripe({ text = "Sample Text" }) {
  return (
    <div className="fixed top-0 right-0 w-56 md:w-80 z-50">
      <div className="bg-teal-600 text-white flex items-center justify-center rotate-45 translate-x-[45px] translate-y-[40px] md:translate-x-[80px] md:translate-y-[70px] h-8 shadow-lg">
        <span className="text-xs md:text-sm  tracking-tight text-center">
          {text}
        </span>
      </div>
    </div>
  );
}
