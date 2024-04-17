import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const mdxFilesRootDirectory = path.join(process.cwd(), "src", "content");

const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf8");
};

type Schema<TData> = {
  parse: (data: unknown) => TData;
};

const readMDXFile = <TData>(filePath: string, schema: Schema<TData>) => {
  const rawContent = readFile(filePath);
  const { content, data } = matter(rawContent);

  const metadata = schema.parse(data);

  return {
    content,
    metadata,
  };
};

type GetAllPostsOptions = {
  limit?: number;
};

export const getPage = <TData>(filePath: string, schema: Schema<TData>) => {
  const fullPath = path.join(mdxFilesRootDirectory, `${filePath}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const { content, metadata } = readMDXFile(fullPath, schema);

  return {
    content,
    metadata: {
      ...metadata,
      slug: filePath.split("/").pop(),
    },
  };
};

export const getAllPages = <TData>(
  directoryPath: string,
  schema: Schema<TData>,
  options: GetAllPostsOptions = {},
) => {
  const { limit } = options;

  const pagesDirectory = path.join(mdxFilesRootDirectory, directoryPath);

  const fileNames = fs.readdirSync(pagesDirectory);

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(pagesDirectory, fileName);
      const { metadata } = readMDXFile(fullPath, schema);

      return {
        ...metadata,
        slug,
      };
    })
    .slice(0, limit);
};

const postSchema = z.object({
  title: z.string().max(99),
  summary: z.string().max(999).optional(),
  date: z.date(),
  published: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
});

export type Post = z.output<typeof postSchema> & {
  slug: string;
};

export function getPosts() {
  const posts = getAllPages("blog", postSchema);

  return posts;
}

export function getPostBySlug(slug: string) {
  const posts = getPage(`blog/${slug}`, postSchema);

  return posts;
}
