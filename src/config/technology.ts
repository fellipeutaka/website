import { Icons, type Icon } from "~/components/ui/icons";

export const technologies = {
  react: {
    name: "React",
    icon: Icons.React,
    url: "https://react.dev",
  },
  reactNative: {
    name: "React Native",
    icon: Icons.ReactNative,
    url: "https://reactnative.dev",
  },
  expo: {
    name: "Expo",
    icon: Icons.Expo,
    url: "https://expo.dev",
  },
  next: {
    name: "Next.js",
    icon: Icons.NextJS,
    url: "https://nextjs.org",
  },
  node: {
    name: "Node.js",
    icon: Icons.Node,
    url: "https://nodejs.org",
  },
  typescript: {
    name: "TypeScript",
    icon: Icons.TypeScript,
    url: "https://www.typescriptlang.org",
  },
  electron: {
    name: "Electron",
    icon: Icons.Electron,
    url: "https://www.electronjs.org",
  },
  tailwindcss: {
    name: "Tailwind CSS",
    icon: Icons.TailwindCSS,
    url: "https://tailwindcss.com",
  },
} satisfies Record<string, Technology>;

export type Technologies = typeof technologies;
export type Technology = {
  name: string;
  icon: Icon;
  url: string;
};
