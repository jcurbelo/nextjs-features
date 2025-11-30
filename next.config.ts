import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable 'use cache' directive for composable caching
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheLife
  cacheLife: {
    // Default presets, customize as needed
    default: {
      stale: 300, // 5 minutes
      revalidate: 60, // 1 minute
      expire: 3600, // 1 hour
    },
  },

  // Type-safe routes - catch invalid Link hrefs at compile time
  // https://nextjs.org/docs/app/api-reference/config/typescript#statically-typed-links
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
