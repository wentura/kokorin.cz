import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Kokořínsko",
  description:
    "Kokořínsko, kraj pískovcových skal, hlubokých lesů a romantických hradů",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
