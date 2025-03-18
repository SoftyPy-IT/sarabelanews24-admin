import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Enable experimental features for App Router
  experimental: {
    // Enable strong type checking for App Router
    typedRoutes: true,
    // Improve compatibility with TypeScript for App Router routes
    serverComponentsExternalPackages: [],
  },
  // Ensure proper TypeScript type generation
  typescript: {
    // Generate TypeScript declaration files
    tsconfigPath: "./tsconfig.json",
  },
};

export default nextConfig;