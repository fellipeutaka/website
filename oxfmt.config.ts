import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? []),
    ".agents/**",
    ".claude/**",
    ".opencode/**",
    ".source/**",
    "next-env.d.ts",
    "skills-lock.json",
    "**/*.svg",
  ],
  sortTailwindcss: {
    functions: ["clsx", "cva", "tw", "twMerge", "cn", "twJoin", "tv", "cx"],
    stylesheet: "./src/styles/globals.css",
  },
});
