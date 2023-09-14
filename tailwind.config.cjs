/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  plugins: [],
};
