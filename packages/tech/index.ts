import type { Icon } from "@utaka/ui/icons";

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
  swc: {
    name: "SWC",
    icon: "SWC",
    url: "https://swc.rs",
  },
  docker: {
    name: "Docker",
    icon: "Docker",
    url: "https://www.docker.com",
  },
  trpc: {
    name: "tRPC",
    icon: "Trpc",
    url: "https://trpc.io",
  },
  drizzle: {
    name: "Drizzle",
    icon: "Drizzle",
    url: "https://orm.drizzle.team",
  },
  prisma: {
    name: "Prisma",
    icon: "Prisma",
    url: "https://www.prisma.io",
  },
  postgres: {
    name: "PostgreSQL",
    icon: "Postgres",
    url: "https://www.postgresql.org",
  },
  redis: {
    name: "Redis",
    icon: "Redis",
    url: "https://redis.io",
  },
  fastify: {
    name: "Fastify",
    icon: "Fastify",
    url: "https://fastify.dev",
  },
  jwt: {
    name: "JWT",
    icon: "Jwt",
    url: "https://jwt.io",
  },
  swagger: {
    name: "Swagger",
    icon: "Swagger",
    url: "https://swagger.io",
  },
  vitest: {
    name: "Vitest",
    icon: "Vitest",
    url: "https://vitest.dev",
  },
} as const satisfies Record<string, Technology>;

export const technologyList = Object.values(technologies).map(
  (technology) => technology.name,
);

export function getTechnology(name: (typeof technologyList)[number]) {
  return Object.values(technologies).find((t) => t.name === name)!;
}

export type Technologies = typeof technologies;
export interface Technology {
  name: string;
  url: string;
  icon: Icon;
}
