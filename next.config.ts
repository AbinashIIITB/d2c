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
      // IEM B.Tech SEO Landing Page Aliases
      {
        source: '/admission-in-iem-2027',
        destination: '/direct-admission-in-iem-kolkata',
        permanent: true,
      },
      {
        source: '/iem-kolkata-admission-2027',
        destination: '/direct-admission-in-iem-kolkata',
        permanent: true,
      },
      {
        source: '/btech-admission-in-iem-2027',
        destination: '/btech-direct-admission-in-iem-kolkata',
        permanent: true,
      },
      {
        source: '/direct-admission-btech-iem-2027',
        destination: '/btech-direct-admission-in-iem-kolkata',
        permanent: true,
      },
      {
        source: '/cse-admission-iem-2027',
        destination: '/iem-kolkata-cse-direct-admission',
        permanent: true,
      },
      {
        source: '/direct-admission-cse-iem-2027',
        destination: '/iem-kolkata-cse-direct-admission',
        permanent: true,
      },
      {
        source: '/aiml-admission-iem-2027',
        destination: '/iem-kolkata-cse-ai-ml-direct-admission',
        permanent: true,
      },
      {
        source: '/data-science-admission-iem-2027',
        destination: '/iem-kolkata-cse-ai-ml-direct-admission',
        permanent: true,
      },
      {
        source: '/it-admission-iem-2027',
        destination: '/iem-kolkata-it-direct-admission',
        permanent: true,
      },
      {
        source: '/ece-admission-iem-2027',
        destination: '/iem-kolkata-ece-direct-admission',
        permanent: true,
      },
      {
        source: '/electrical-engineering-admission-iem-2027',
        destination: '/iem-kolkata-electrical-engineering-direct-admission',
        permanent: true,
      },
      {
        source: '/mechanical-engineering-admission-iem-2027',
        destination: '/iem-kolkata-mechanical-engineering-direct-admission',
        permanent: true,
      },
      {
        source: '/direct-admission-mechanical-iem-2027',
        destination: '/iem-kolkata-mechanical-engineering-direct-admission',
        permanent: true,
      },
      {
        source: '/computer-science-engineering-iem-2027',
        destination: '/iem-kolkata-cse-direct-admission',
        permanent: true,
      },
      {
        source: '/engineering-courses-iem-kolkata',
        destination: '/btech-direct-admission-in-iem-kolkata',
        permanent: true,
      },
      {
        source: '/how-to-get-admission-in-iem-kolkata',
        destination: '/direct-admission-in-iem-kolkata',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
