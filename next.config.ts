import type { NextConfig } from "next";

const repo = "ttdevs-website";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },

  // Needed for GitHub Pages project site:
  // https://tlxq.github.io/ttdevs-website/
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

export default nextConfig;
