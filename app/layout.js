// import CookieConsent from "@/components/CookieConsent";
// import PerformanceMonitor from "@/components/PerformanceMonitor";
// import PerformanceOptimizer from "@/components/PerformanceOptimizer";
// import BookingForm from "@/components/booking";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/localStoragePolyfill";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

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
  authors: [{ name: "Kokořín.cz" }],
  creator: "Kokořín.cz",
  publisher: "Kokořín.cz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kokorin.cz"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Kokořín – nejlepší dovolená v Čechách",
    description:
      "Užijte si klid a relax v srdci Kokořínska: pískovcové skály, historické hrady, cyklostezky, koupání a odpočinek v přírodě. Rezervujte nyní!",
    url: "https://kokorin.cz",
    siteName: "Kokořín.cz",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262136/Kamil/W45A8096.webp",
        width: 1200,
        height: 630,
        alt: "Kokořínsko - kraj pískovcových skal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kokořín – nejlepší dovolená v Čechách",
    description:
      "Užijte si klid a relax v srdci Kokořínska: pískovcové skály, historické hrady, cyklostezky, koupání a odpočinek v přírodě. Rezervujte nyní!",
    images: [
      "https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262136/Kamil/W45A8096.webp",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Kokořínsko",
  description:
    "Kraj pískovcových skal, hlubokých lesů a romantických hradů v České republice",
  url: "https://kokorin.cz",
  image:
    "https://res.cloudinary.com/dam7wdzvx/image/upload/v1747262136/Kamil/W45A8096.webp",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CZ",
    addressRegion: "Středočeský kraj",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.4333,
    longitude: 14.5667,
  },
  containsPlace: [
    {
      "@type": "TouristAttraction",
      name: "Hrad Kokořín",
      description: "Romantický hrad v srdci Kokořínska",
    },
  ],
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Cyklostezky",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Turistické trasy",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Koupání",
      value: true,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.harasov.eu" />
        <link rel="dns-prefetch" href="https://malba-pracovni.netlify.app" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kokořín.cz" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      {/* <BookingForm /> */}
      <body className={`${geist.className} antialiased`}>
        {/* <PerformanceOptimizer /> */}
        {/* <PerformanceMonitor /> */}
        {children}
        {/* <CookieConsent /> */}
      </body>
    </html>
  );
}
