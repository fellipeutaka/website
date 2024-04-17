import rehypeSlug from "rehype-slug";
import { defineCollection, defineConfig, s } from "velite";
import { rehypeCode } from "~/lib/rehype/rehype-code";
import { rehypeInlineCode } from "~/lib/rehype/rehype-inline-code";

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      summary: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
      toc: s.toc(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split("/").slice(1).join("/"),
    })),
});

export default defineConfig({
  root: "src/content",
  output: {
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [rehypeSlug, rehypeCode, rehypeInlineCode],
    remarkPlugins: [],
  },
});
