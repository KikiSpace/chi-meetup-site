import type { NextConfig } from "next";

// Deployment configuration
// Two modes supported:
// 1. Custom domain (NEXT_PUBLIC_CUSTOM_DOMAIN=true): Serves from domain root
// 2. GitHub Pages subdirectory (default): Serves from /repo-name/

const REPO_NAME = "chi-meetup-site";

// Check if deploying to custom domain
const isCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === "true";
const isProduction = process.env.NODE_ENV === "production";

// Use basePath only when NOT using custom domain AND in production
const basePath = isCustomDomain || !isProduction ? "" : `/${REPO_NAME}`;

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",

  // Set base path based on deployment mode
  basePath: basePath,
  assetPrefix: basePath,

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Add trailing slashes for better compatibility
  trailingSlash: true,
};

export default nextConfig;
