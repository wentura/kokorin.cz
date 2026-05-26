/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "harasov.eu" },
      { hostname: "www.harasov.eu" },
      { hostname: "www.penzionmalba.cz" },
      { hostname: "penzionmalba.cz" },
      { hostname: "malba-pracovni.netlify.app" },
      { hostname: "www.malbenka.cz" },
      { hostname: "malbenka.cz" },
      { hostname: "harasov.eu" },
      { hostname: "www.harasov.eu" },
      { hostname: "taboristeusplavku.cz" },
    ],
    formats: ["image/webp", "image/avif"],
    qualities: [75, 80],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "clsx"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
export default nextConfig;
