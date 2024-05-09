import { getPosts } from "@utaka/mdx/utils/fs";
import type { MetadataRoute } from "next";
import { siteConfig } from "~/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.date,
  })) satisfies MetadataRoute.Sitemap;

  const routes = ["", "/about", "/blog", "/projects"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  })) satisfies MetadataRoute.Sitemap;

  return [...routes, ...posts];
}
