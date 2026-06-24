import type { NextConfig } from "next";

/**
 * Static export tuned for GitHub Pages.
 * This repo is a USER page (nicolasAlejandroCossu.github.io) served from the
 * domain root, so no basePath / assetPrefix is required.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Pin the workspace root (a stray pnpm-lock.yaml in the home dir otherwise
  // confuses Next's root inference).
  outputFileTracingRoot: process.cwd(),
  // GitHub Pages has no image optimization server.
  images: { unoptimized: true },
  // Emit /route/index.html so static hosting resolves nested routes cleanly.
  trailingSlash: true,
  // Keep the creative build unblocked; types are still checked.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
