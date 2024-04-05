import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import { siteConfig } from "./src/config/site";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  image: {
    domains: ["github.com"],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
