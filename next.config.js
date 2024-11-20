// @ts-check

// Use a .js file instead of .ts until Next.js support top-level await in next.config.ts
// https://github.com/vercel/next.js/issues/67765

await import("./src/config/env.js");

const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;
// biome-ignore lint/nursery/noProcessEnv: This env is injected by velite
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  // biome-ignore lint/nursery/noProcessEnv: This env is injected by velite
  process.env.VELITE_STARTED = "1";
  const { build } = await import("velite");
  await build({ watch: isDev, clean: !isDev });
}

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

export default config;
