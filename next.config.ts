import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },
  // Prevent static 404 generation
  generateBuildId: () => 'build',
};

export default nextConfig;