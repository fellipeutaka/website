import "~/config/env";

import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "github.com",
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
