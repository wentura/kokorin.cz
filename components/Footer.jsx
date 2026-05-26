import React from "react";
import TrackedInternalLink from "./TrackedInternalLink";
import TrackedPhoneLink from "./TrackedPhoneLink";

export default function Footer() {
  return (
    <footer className="py-4 mb-44">
      <div className="max-w-screen-2xl mx-auto px-4">
        <p className="text-center text-gray-500">
          <TrackedInternalLink
            href="/"
            source="footer"
            name="home"
            className="underline text-gray-600 hover:text-gray-800"
          >
            Kokořín.cz
          </TrackedInternalLink>
          {" · "}
          <TrackedInternalLink
            href="/booking"
            source="footer"
            name="booking"
            className="underline text-gray-600 hover:text-gray-800"
          >
            Poptávka ubytování
          </TrackedInternalLink>
        </p>
        <p className="text-center text-gray-500 mt-2">
          provozovatel: Kokosport s.r.o.
          <br />
          Kokořínský Důl 41, 277 23 Kokořín
          <br />
          <TrackedPhoneLink
            source="footer"
            className="underline text-gray-600 hover:text-gray-800"
          >
            +420 604 674 273
          </TrackedPhoneLink>
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
