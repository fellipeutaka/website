import "~/config/env";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  agentRules: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        hostname: "github.com",
      },
    ],
  },
  // oxlint-disable-next-line require-await -- Next.js requires redirects to return a Promise.
  redirects: async () => [
    {
      source: "/github",
      destination: "https://github.com/fellipeutaka/website",
      permanent: false,
    },
  ],
};

export default withMDX(config);
