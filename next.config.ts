import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Prevent static 404 generation
  generateBuildId: () => 'build',
};

export default nextConfig;