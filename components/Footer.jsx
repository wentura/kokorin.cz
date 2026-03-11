import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4 mb-44">
      <div className="max-w-screen-2xl mx-auto px-4">
        <p className="text-center text-gray-500">
          <Link href="/" className="underline text-gray-600 hover:text-gray-800">
            Kokořín.cz
          </Link>
          {" · "}
          <Link href="/booking" className="underline text-gray-600 hover:text-gray-800">
            Poptávka ubytování
          </Link>
        </p>
        <p className="text-center text-gray-500 mt-2">
          provozovatel: Kokosport s.r.o.
          <br />
          Kokořínský Důl 41, 277 23 Kokořín
          <br />
          IČO: 03662993 &copy; {new Date().getFullYear()}
          <br />
          <a
            href="https://www.zbyneksvoboda.cz"
            className="underline text-xs underline-offset-4"
            title="web Zbyněk Svoboda"
            target="_blank"
            rel="noopener noreferrer"
          >
            web Zbyněk Svoboda
          </a>
        </p>
      </div>
    </footer>
  );
}
