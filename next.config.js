// @ts-check

import { createMDX } from "fumadocs-mdx/next";

// Use a .js file instead of .ts until Next.js support top-level await in next.config.ts
// https://github.com/vercel/next.js/issues/67765
await import("./src/config/env.js");

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "github.com",
      },
      {
        hostname: "**",
      },
    ],
  },
  // biome-ignore lint/suspicious/useAwait: This needs to be async
  redirects: async () => {
    return [
      {
        source: "/github",
        destination: "https://github.com/fellipeutaka/website",
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
