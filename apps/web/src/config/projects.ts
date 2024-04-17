import { type Technology, technologies } from "./technology";

export const projects = [
  {
    name: "kenji",
    description:
      "🖥️ A CLI to scaffold web, desktop, mobile and server apps, with custom import alias, linter, tester framework and more",
    url: "https://github.com/fellipeutaka/kenji",
    imageSrc:
      "https://opengraph.githubassets.com/88e80980a1ffa67d23cabf08bd9b3743d9073e1ba835a1b9a7d8b290b3bcb81d/fellipeutaka/kenji",
    technologies: [technologies.node, technologies.typescript],
  },
  {
    name: "useful-tools",
    description:
      "🛠️ A free and open source PWA application with a collection of tools to help you",
    url: "https://github.com/fellipeutaka/useful-tools",
    imageSrc:
      "https://usefultools.vercel.app/en/opengraph-image.png?8d743770033bfb96",
    technologies: [
      technologies.react,
      technologies.next,
      technologies.typescript,
    ],
    previewUrl: "https://usefultools.vercel.app",
  },
  {
    name: "fellipeutaka/ui",
    description:
      "🎨 A Design System with accessible and customizable components powered by shadcn/ui",
    url: "https://github.com/fellipeutaka/ui",
    imageSrc:
      "https://opengraph.githubassets.com/88e80980a1ffa67d23cabf08bd9b3743d9073e1ba835a1b9a7d8b290b3bcb81d/fellipeutaka/ui",
    technologies: [
      technologies.react,
      technologies.tailwindcss,
      technologies.typescript,
    ],
    previewUrl: "https://fellipeutaka-ui.vercel.app",
  },
  {
    name: "electron-pomodoro-app",
    description:
      "💻 A desktop pomodoro app to help you manage your time and let you focus on any tasks",
    url: "https://github.com/fellipeutaka/electron-pomodoro-app",
    imageSrc:
      "https://opengraph.githubassets.com/88e80980a1ffa67d23cabf08bd9b3743d9073e1ba835a1b9a7d8b290b3bcb81d/fellipeutaka/electron-pomodoro-app",
    technologies: [
      technologies.react,
      technologies.electron,
      technologies.typescript,
    ],
  },
  {
    name: "react-native-pomodoro-app",
    description:
      "📱 A mobile pomodoro app to help you manage your time and let you focus on any tasks",
    url: "https://github.com/fellipeutaka/react-native-pomodoro-app",
    imageSrc:
      "https://opengraph.githubassets.com/88e80980a1ffa67d23cabf08bd9b3743d9073e1ba835a1b9a7d8b290b3bcb81d/fellipeutaka/react-native-pomodoro-app",
    technologies: [
      technologies.reactNative,
      technologies.expo,
      technologies.typescript,
    ],
  },
  {
    name: "eslint-config",
    description:
      "⚙️ My shareable ESLint configuration for Node.js, React, Expo, Next.js and Tailwind CSS",
    url: "https://github.com/fellipeutaka/eslint-config",
    imageSrc:
      "https://opengraph.githubassets.com/88e80980a1ffa67d23cabf08bd9b3743d9073e1ba835a1b9a7d8b290b3bcb81d/fellipeutaka/eslint-config",
    technologies: [technologies.turborepo],
  },
  {
    name: "ts-init",
    description:
      "🖥️ A CLI tool to generate a tsconfig.json file for your TypeScript project with a set of interactive prompts.",
    url: "https://github.com/fellipeutaka/ts-init",
    imageSrc:
      "https://opengraph.githubassets.com/88e80980a1ffa67d23cabf08bd9b3743d9073e1ba835a1b9a7d8b290b3bcb81d/fellipeutaka/ts-init",
    technologies: [technologies.node, technologies.typescript],
  },
] satisfies {
  name: string;
  description: string;
  url: string;
  imageSrc: string;
  technologies: Technology[];
  previewUrl?: string;
}[];

export type Project = (typeof projects)[number];
