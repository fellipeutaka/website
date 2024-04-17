import { type Config, preset } from "@utaka/tailwind";

const config: Config = {
  content: [
    "./src/**/*.{md,mdx,ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  presets: [preset],
};

export default config;
