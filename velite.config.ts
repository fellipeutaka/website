import rehypeSlug from "rehype-slug";

import { rehypePrettyCode } from "rehype-pretty-code";
import { defineCollection, defineConfig, s } from "velite";
import { rehypeCommand } from "~/lib/rehype-command";
import { rehypeFigureElement } from "~/lib/rehype-figure-element";
import { rehypePreElement } from "~/lib/rehype-pre-element";
import { rehypePrettyCodeOptions } from "~/lib/rehype-pretty-code";
import type { TechnologyName } from "~/lib/technologies";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Posts",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(256).optional(),
      date: s.isodate(),
      cover: s.image(),
      slug: s.path(),
      toc: s.toc(),
      content: s.mdx(),
    })
    .transform(computedFields),
});

const pages = defineCollection({
  name: "Pages",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      content: s.mdx(),
    })
    .transform(computedFields),
});

const projects = defineCollection({
  name: "Projects",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      name: s.string().max(99),
      description: s.string().max(999),
      sourceCodeUrl: s.string().url(),
      previewUrl: s.string().url().optional(),
      isFeatured: s.boolean().optional().default(false),
      technologies: s.custom<TechnologyName[]>(),
      slug: s.path(),
      toc: s.toc(),
      content: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "src/content",
  collections: {
    posts,
    pages,
    projects,
  },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypePreElement,
      [rehypePrettyCode, rehypePrettyCodeOptions],
      rehypeFigureElement,
      rehypeCommand,
    ],
  },
});
