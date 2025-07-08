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
    "Užijte si klid a relax v srdci Kokořínska: pískovcové skály, historické hrady, cyklostezky, koupání a odpočinek v přírodě. Rezervujte nyní!",
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
    title: "Kokořín – nejlepší dovolená v Čechách",
    description:
      "Užijte si klid a relax v srdci Kokořínska: pískovcové skály, historické hrady, cyklostezky, koupání a odpočinek v přírodě. Rezervujte nyní!",
    url: "https://kokorin.cz",
    siteName: "Kokořín.cz",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kokořín – nejlepší dovolená v Čechách",
    description:
      "Užijte si klid a relax v srdci Kokořínska: pískovcové skály, historické hrady, cyklostezky, koupání a odpočinek v přírodě. Rezervujte nyní!",
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
