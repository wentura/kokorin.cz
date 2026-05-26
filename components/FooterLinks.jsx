import React from "react";
import { footerLinksData } from "./FooterLinksData";
import TrackedExternalAnchor from "./TrackedExternalAnchor";
import TrackedInternalLink from "./TrackedInternalLink";
export default function FooterLinks() {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 my-8 md:my-24 2xl:my-44">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* text - start */}

        {/* text - end */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 text-center justify-items-center md:text-left">
          {footerLinksData.map((link) => (
            <div key={link.name} className="flex flex-col gap-2">
              <span className="text-gray-600 font-bold mb-1 underline underline-offset-4 decoration-neutral-400 decoration-3">
                {link.name}
              </span>
              <ul>
                {link.links.map((item) => (
                  <li key={item.name}>
                    {item.internal ? (
                      <TrackedInternalLink
                        href={item.link}
                        source="footer-links"
                        name={item.name}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {item.name}
                      </TrackedInternalLink>
                    ) : (
                      <TrackedExternalAnchor
                        href={item.link}
                        section="footer-links"
                        objectName={item.name}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {item.name}
                      </TrackedExternalAnchor>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
