import { pages, posts, projects } from "~:content";
import { loader } from "fumadocs-core/source";

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
