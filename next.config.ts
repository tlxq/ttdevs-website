import type { NextConfig } from "next";

const repo = "ttdevs-website";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
