import { getPosts } from "@utaka/mdx/utils/fs";
import { serverClient } from "~/lib/api/server";

export async function getPostsWithViews() {
  const posts = getPosts();

  const postSlugs = posts.map((post) => post.slug);

  const views: Record<string, number> = {};

  await Promise.all(
    postSlugs.map(async (slug) => {
      const { views: postViews } = await serverClient.post.getMetadata(slug);
      views[slug] = postViews;
    }),
  );

  return posts.map((post) => ({
    ...post,
    views: views[post.slug],
  }));
}

export type PostWithView = Awaited<
  ReturnType<typeof getPostsWithViews>
>[number];
