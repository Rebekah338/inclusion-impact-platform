import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@clerk/nextjs', '@clerk/backend', '@clerk/shared'],
  },
};

export default nextConfig;
