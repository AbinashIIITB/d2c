import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "ui-avatars.com" },
    ],
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
  },

  // Compress responses for better transfer speed
  compress: true,

  // Powered-by header removal (security + minor perf)
  poweredByHeader: false,

  // Strict-mode for catching issues early
  reactStrictMode: true,

  turbopack: {
    root: process.cwd(),
  },

  async redirects() {
    return [
      {
        source: '/colleges/iem-salt-lake',
        destination: '/colleges/iem-saltlake',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
