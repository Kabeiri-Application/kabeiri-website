import type { NextConfig } from "next";

import "@/env";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/400x400/**/white",
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/signup",
        destination: "/onboarding",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
