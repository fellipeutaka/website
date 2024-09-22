import fs from "node:fs";
import path from "node:path";
import { technologyList } from "@utaka/tech";
import matter from "gray-matter";
import { z } from "zod";

const mdxFilesRootDirectory = path.join(process.cwd(), "src", "content");

const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf8");
};

interface Schema<TData> {
  parse: (data: unknown) => TData;
}

const readMDXFile = <TData>(filePath: string, schema: Schema<TData>) => {
  const rawContent = readFile(filePath);
  const { content, data } = matter(rawContent);

  const metadata = schema.parse(data);

  return {
    content,
    metadata,
  };
};

interface GetAllPostsOptions {
  limit?: number;
}

export const getPage = <TData>(filePath: string, schema?: Schema<TData>) => {
  const fullPath = path.join(mdxFilesRootDirectory, `${filePath}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const { content, metadata } = readMDXFile(
    fullPath,
    schema ?? z.record(z.string().or(z.number()).or(z.symbol()), z.any()),
  );

  return {
    content,
    metadata: {
      ...metadata,
      slug: filePath.split("/").pop(),
    },
  };
};

const MDX_FILE_REGEX = /\.mdx$/;

const getAllPages = <TData>(
  directoryPath: string,
  schema: Schema<TData>,
  options: GetAllPostsOptions = {},
) => {
  const { limit } = options;

  const pagesDirectory = path.join(mdxFilesRootDirectory, directoryPath);

  const fileNames = fs.readdirSync(pagesDirectory);

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(MDX_FILE_REGEX, "");
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
});

export interface Post extends z.output<typeof postSchema> {
  slug: string;
}

export function getPosts() {
  return getAllPages("blog", postSchema);
}

export function getPostBySlug(slug: string) {
  return getPage(`blog/${slug}`, postSchema);
}

type TechnologyList = (typeof technologyList)[number];

const projectSchema = z.object({
  name: z.string().max(99),
  description: z.string().max(999),
  sourceCodeUrl: z.string().url(),
  previewUrl: z.string().url().optional(),
  isFeatured: z.boolean().optional().default(false),
  technologies: z.array(
    z.string().refine((value) => (technologyList as string[]).includes(value)),
  ) as z.ZodArray<z.ZodType<TechnologyList>>,
});

export interface Project extends z.output<typeof projectSchema> {
  slug: string;
}

export function getProjects() {
  return getAllPages("projects", projectSchema);
}

export function getFeaturedProjects() {
  return getAllPages("projects", projectSchema).filter(
    (project) => project.isFeatured,
  );
}

export function getProjectBySlug(slug: string) {
  return getPage(`projects/${slug}`, projectSchema);
}
