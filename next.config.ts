import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/400x400/**/white',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
