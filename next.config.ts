import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // Uncomment for Docker/self-hosted deployment
  
  /* Vercel Configuration */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization for Vercel
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
