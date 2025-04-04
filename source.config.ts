import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";
import { transformerNpmCommands } from "~/lib/mdx-plugins/rehype-npm-commands";
import { vercelDarkTheme } from "~/lib/mdx-plugins/themes/vercel-dark";
import { vercelLightTheme } from "~/lib/mdx-plugins/themes/vercel-light";
import type { TechnologyName } from "~/lib/technologies";
import { zodImage } from "~/utils/zod-image";

export const posts = defineDocs({
  dir: "src/content/blog",
  docs: {
    schema: (options) =>
      z.object({
        title: z.string().max(99),
        description: z.string().max(256).optional(),
        cover: z.string().transform(zodImage(options)),
      }),
  },
});

export const pages = defineDocs({
  dir: "src/content/pages",
  docs: {
    async: true,
  },
});

export const projects = defineDocs({
  dir: "src/content/projects",
  docs: {
    schema: z.object({
      name: z.string().max(99),
      description: z.string().max(999),
      sourceCodeUrl: z.string().url(),
      previewUrl: z.string().url().optional(),
      isFeatured: z.boolean().optional().default(false),
      technologies: z.custom<TechnologyName[]>(),
    }),
    async: true,
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: vercelLightTheme,
        dark: vercelDarkTheme,
      },
      icon: false,
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerNpmCommands(),
      ],
    },
  },
});
