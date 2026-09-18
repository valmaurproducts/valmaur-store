import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ttcdn-us.com",
      },
    ],
  },
};

export default nextConfig;
