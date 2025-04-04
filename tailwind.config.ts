import type { Config } from "tailwindcss";
import ta from "tailwindcss-animate";
import tad from "tailwindcss-animated";
import trac from "tailwindcss-react-aria-components";
import { fontFamily } from "tailwindcss/defaultTheme";
import type { PluginCreator } from "tailwindcss/types/config";

const headingPlugin: PluginCreator = ({ addComponents, theme }) =>
  addComponents({
    ".heading-1": {
      scrollMargin: theme("margin.20"),
      fontWeight: theme("fontWeight.extrabold"),
      fontSize: theme("fontSize.4xl"),
      letterSpacing: theme("letterSpacing.tight"),
      "@screen lg": {
        fontSize: theme("fontSize.5xl"),
        lineHeight: "1",
      },
    },

    ".heading-2": {
      scrollMargin: theme("margin.20"),
      fontWeight: theme("fontWeight.semibold"),
      fontSize: theme("fontSize.3xl"),
      lineHeight: "2.25rem",
      letterSpacing: theme("letterSpacing.tight"),
      "&:first-child": {
        marginTop: "0",
      },
    },

    ".heading-3": {
      scrollMargin: theme("margin.20"),
      fontWeight: theme("fontWeight.semibold"),
      fontSize: theme("fontSize.2xl"),
      lineHeight: "2rem",
      letterSpacing: theme("letterSpacing.tight"),
    },

    ".heading-4": {
      scrollMargin: theme("margin.20"),
      fontWeight: theme("fontWeight.semibold"),
      fontSize: theme("fontSize.xl"),
      lineHeight: "1.75rem",
      letterSpacing: theme("letterSpacing.tight"),
    },
  });

const config = {
  darkMode: "class",
  content: ["./src/**/*.{md,mdx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      colors: {
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        bg: "oklch(var(--bg) / <alpha-value>)",
        fg: "oklch(var(--fg) / <alpha-value>)",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          fg: "oklch(var(--primary-fg) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          fg: "oklch(var(--secondary-fg) / <alpha-value>)",
        },
        success: {
          DEFAULT: "oklch(var(--success) / <alpha-value>)",
          fg: "oklch(var(--success-fg) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "oklch(var(--warning) / <alpha-value>)",
          fg: "oklch(var(--warning-fg) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "oklch(var(--danger) / <alpha-value>)",
          fg: "oklch(var(--danger-fg) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          fg: "oklch(var(--muted-fg) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          fg: "oklch(var(--accent-fg) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          fg: "oklch(var(--popover-fg) / <alpha-value>)",
        },
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          fg: "oklch(var(--card-fg) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      keyframes: {
        // Animated Spotlight
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },

        // Animated Badge
        flip: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        rotate: {
          to: {
            transform: "rotate(90deg)",
          },
        },

        // Marquee
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap, 1rem)))" },
        },
      },
      animation: {
        // Animated Spotlight
        spotlight: "spotlight 2s ease .75s 1 forwards",

        // Animated Badge
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both",

        // Marquee
        marquee: "marquee var(--duration, 20s) linear infinite",
      },
    },
  },
  plugins: [ta, tad, trac, headingPlugin],
} satisfies Config;

export default config;
