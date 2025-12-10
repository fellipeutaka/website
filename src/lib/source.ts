import type { Page } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import type { DocCollectionEntry } from "fumadocs-mdx/runtime/server";
import { pages, posts, projects } from "~:content/server";

export const pagesSource = loader({
  baseUrl: "/pages",
  source: pages.toFumadocsSource(),
});

export const postsSource = loader({
  baseUrl: "/blog",
  source: posts.toFumadocsSource(),
});

export const projectsSource = loader({
  baseUrl: "/projects",
  source: projects.toFumadocsSource(),
});

interface SourceDataMap {
  pages: (typeof pages)["docs"][number];
  posts: (typeof posts)["docs"][number];
  projects: (typeof projects)["docs"][number];
}

type NonSerializableDataKeys =
  | "_exports"
  | "body"
  | "getMDAST"
  | "getText"
  | "structuredData"
  | "info"
  | "toc";

type SerializableDocData<T> = Omit<T, NonSerializableDataKeys>;

type Source<TName extends keyof SourceDataMap> = Omit<
  Page<DocCollectionEntry<TName, SourceDataMap[TName]>>,
  "data"
> & {
  data: SerializableDocData<SourceDataMap[TName]>;
};

export type PostSource = Source<"posts">;
export type PageSource = Source<"pages">;
export type ProjectSource = Source<"projects">;

export function mapSourceData<TName extends keyof SourceDataMap>(
  doc: DocCollectionEntry<TName, SourceDataMap[TName]>
): SerializableDocData<SourceDataMap[TName]> {
  const {
    _exports,
    body,
    getMDAST,
    getText,
    structuredData,
    info,
    toc,
    ...serializableData
  } = doc;

  return serializableData as SerializableDocData<SourceDataMap[TName]>;
}
