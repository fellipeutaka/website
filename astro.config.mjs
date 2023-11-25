import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://fellipeutaka.vercel.app",
  image: {
    domains: ["github.com"],
  },
  integrations: [tailwind()],
  redirects: {
    "/": "/links",
  },
});
