import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { z } from "zod";
import { transformerNpmCommands } from "~/lib/mdx-plugins/rehype-npm-commands";
import { vercelDarkTheme } from "~/lib/mdx-plugins/themes/vercel-dark";
import { vercelLightTheme } from "~/lib/mdx-plugins/themes/vercel-light";
import type { TechnologyName } from "~/lib/technologies";
import { zodImage } from "~/utils/zod-image";

export const posts = defineDocs({
  dir: "src/content/blog",
  docs: {
    schema: ({ path }) =>
      z.object({
        title: z.string().max(99),
        description: z.string().max(256).optional(),
        cover: z.string().transform(
          zodImage({
            path,
          })
        ),
      }),
  },
});

export const pages = defineDocs({
  dir: "src/content/pages",
  docs: {
    schema: z.object({
      title: z.string().max(99).optional(),
    }),
  },
});

export const projects = defineDocs({
  dir: "src/content/projects",
  docs: {
    schema: z.object({
      name: z.string().max(99),
      description: z.string().max(999),
      sourceCodeUrl: z.url(),
      previewUrl: z.url().optional(),
      isFeatured: z.boolean().optional().default(false),
      technologies: z.custom<TechnologyName[]>(),
    }),
  },
});

export default defineConfig({
  plugins: [lastModified()],
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
