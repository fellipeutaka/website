import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("../../packages/env");

/** @type {import('next').NextConfig} */
export default {
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
