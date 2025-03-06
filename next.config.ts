import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ['localhost', 'strapi-qxa4.onrender.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi-qxa4.onrender.com",
        port: "",
        pathname: "/uploads/**/*",
      }
    ]
  },
};

export default nextConfig;
