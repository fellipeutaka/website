import { defineTailwindConfig } from "@fellipeutaka/styles";
import defaultTheme from "tailwindcss/defaultTheme";

export default defineTailwindConfig({
  content: ["./src/**/*.{astro,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
});
