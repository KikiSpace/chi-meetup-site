import type { NextConfig } from "next";

// GitHub repository name - update this to match your repo
const REPO_NAME = "chi-meetup-site";

// Determine if we're building for production (GitHub Pages) or development
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? `/${REPO_NAME}` : "";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",

  // Set base path for GitHub Pages subdirectory
  basePath: basePath,
  assetPrefix: basePath,

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Add trailing slashes for better GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
