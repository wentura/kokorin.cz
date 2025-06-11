import CookieConsent from "@/components/CookieConsent";
// import BookingForm from "@/components/booking";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// export const metadata = {
//   title: "Kokořínsko",
//   description:
//     "Kokořínsko, kraj pískovcových skal, hlubokých lesů a romantických hradů",
// };
export const metadata = {
  title: "Kokořín – prostě nejlepší dovolená v Čechách",
  description:
    "Objevte Kokořín a okolí – malebnou oblast plnou skal, lesů a tradičních chalup.",
  keywords: [
    "Kokořín",
    "Kokořínsko",
    "hrad Kokořín",
    "ubytování",
    "kemp",
    "kemping",
    "přírodní rezervace",
    "penzion",
    "hotel",
    "pension",
    "restaurace",
    "turistika",
    "příroda",
    "cyklotrasy",
    "pískovcové skaly",
    "lesy",
    "tradice",
    "přírodní krásy",
    "turistické cíle",
    "turistické zajímavosti",
  ],
  openGraph: {
    title: "Kokořín – prostě nejlepší dovolená v Čechách",
    description:
      "Objevte Kokořín a okolí – malebnou oblast plnou skal, lesů a tradičních chalup.",
    url: "https://kokorin.cz",
    siteName: "Kokořín.cz",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kokořín – prostě nejlepší dovolená v Čechách",
    description:
      "Objevte Kokořín a okolí – malebnou oblast plnou skal, lesů a tradičních chalup.",
  },
  robots: "index, follow",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <BookingForm /> */}
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
