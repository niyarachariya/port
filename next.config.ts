import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH comes from .env.production (only loaded during
// `next build`, not `next dev`), so this stays "" locally and "/port" in
// the production static export. Using Next's standard .env + NEXT_PUBLIC_
// auto-inlining here instead of the `env` config key, since that key is
// not reliably inlined into client-component bundles.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
