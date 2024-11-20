export async function getProjects() {
  const { projects } = await import("~:content");

  return projects;
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();

  return projects.find((project) => project.slugAsParams === slug);
}

export async function getFeaturedProjects() {
  const projects = await getProjects();

  return projects.filter((project) => project.isFeatured);
}

export type Project = Awaited<ReturnType<typeof getProjects>>[number];

export async function getPosts() {
  const { posts } = await import("~:content");

  return posts;
}

export async function getPostBySlug(slug: string) {
  const { posts } = await import("~:content");

  return posts.find((post) => post.slugAsParams === slug);
}

export type Post = Awaited<ReturnType<typeof getPosts>>[number];
export interface TocEntry {
  /**
   * Title of the entry
   */
  title: string;
  /**
   * URL that can be used to reach
   * the content
   */
  url: string;
  /**
   * Nested items
   */
  items: TocEntry[];
}

export interface CoverImage {
  /**
   * public url of the image
   */
  src: string;
  /**
   * image width
   */
  width: number;
  /**
   * image height
   */
  height: number;
  /**
   * blurDataURL of the image
   */
  blurDataURL: string;
  /**
   * blur image width
   */
  blurWidth: number;
  /**
   * blur image height
   */
  blurHeight: number;
}
