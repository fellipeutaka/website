import type { Icon } from "~/components/ui/icons";

export const technologies = [
  {
    name: "Tailwind CSS",
    icon: "TailwindCSS",
    url: "https://tailwindcss.com",
  },
  {
    name: "React",
    icon: "React",
    url: "https://react.dev",
  },
  {
    name: "React Native",
    icon: "ReactNative",
    url: "https://reactnative.dev",
  },
  {
    name: "React Aria",
    icon: "Adobe",
    url: "https://react-spectrum.adobe.com/react-aria/index.html",
  },
  {
    name: "Expo",
    icon: "Expo",
    url: "https://expo.dev",
  },
  {
    name: "Next.js",
    icon: "NextJS",
    url: "https://nextjs.org",
  },
  {
    name: "Node.js",
    icon: "Node",
    url: "https://nodejs.org",
  },
  {
    name: "TypeScript",
    icon: "TypeScript",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "Electron",
    icon: "Electron",
    url: "https://www.electronjs.org",
  },
  {
    name: "Tauri",
    icon: "Tauri",
    url: "https://tauri.studio",
  },
  {
    name: "Rust",
    icon: "Rust",
    url: "https://www.rust-lang.org",
  },
  {
    name: "Turborepo",
    icon: "Turborepo",
    url: "https://turbo.build/repo",
  },
  {
    name: "SWC",
    icon: "SWC",
    url: "https://swc.rs",
  },
  {
    name: "Docker",
    icon: "Docker",
    url: "https://www.docker.com",
  },
  {
    name: "tRPC",
    icon: "Trpc",
    url: "https://trpc.io",
  },
  {
    name: "Drizzle",
    icon: "Drizzle",
    url: "https://orm.drizzle.team",
  },
  {
    name: "Prisma",
    icon: "Prisma",
    url: "https://www.prisma.io",
  },
  {
    name: "PostgreSQL",
    icon: "Postgres",
    url: "https://www.postgresql.org",
  },
  {
    name: "Redis",
    icon: "Redis",
    url: "https://redis.io",
  },
  {
    name: "Fastify",
    icon: "Fastify",
    url: "https://fastify.dev",
  },
  {
    name: "JWT",
    icon: "Jwt",
    url: "https://jwt.io",
  },
  {
    name: "Swagger",
    icon: "Swagger",
    url: "https://swagger.io",
  },
  {
    name: "Vitest",
    icon: "Vitest",
    url: "https://vitest.dev",
  },
  {
    name: "Zod",
    icon: "Zod",
    url: "https://zod.dev",
  },
] as const satisfies Technology[];

export interface Technology {
  name: string;
  url: string;
  icon: Icon;
}
export type Technologies = typeof technologies;
export type TechnologyName = Technologies[number]["name"];

export function getTechnology(name: TechnologyName) {
  return technologies.find((t) => t.name === name)!;
}
