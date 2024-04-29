import type { Icon } from "@utaka/ui";

export const technologies = {
  react: {
    name: "React",
    icon: "React",
    url: "https://react.dev",
  },
  reactNative: {
    name: "React Native",
    icon: "ReactNative",
    url: "https://reactnative.dev",
  },
  expo: {
    name: "Expo",
    icon: "Expo",
    url: "https://expo.dev",
  },
  next: {
    name: "Next.js",
    icon: "NextJS",
    url: "https://nextjs.org",
  },
  node: {
    name: "Node.js",
    icon: "Node",
    url: "https://nodejs.org",
  },
  typescript: {
    name: "TypeScript",
    icon: "TypeScript",
    url: "https://www.typescriptlang.org",
  },
  electron: {
    name: "Electron",
    icon: "Electron",
    url: "https://www.electronjs.org",
  },
  tailwindcss: {
    name: "Tailwind CSS",
    icon: "TailwindCSS",
    url: "https://tailwindcss.com",
  },
  turborepo: {
    name: "Turborepo",
    icon: "Turborepo",
    url: "https://turbo.build/repo",
  },
} as const satisfies Record<string, Technology>;

export const technologyList = Object.values(technologies).map(
  (technology) => technology.name,
);

export type Technologies = typeof technologies;
export interface Technology {
  name: string;
  url: string;
  icon: Icon;
}
