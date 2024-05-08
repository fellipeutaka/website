import { getPosts } from "@utaka/mdx/utils/fs";
import { siteConfig } from "~/config/site";

export async function GET() {
  const allBlogs = getPosts();

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      return 1;
    })
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${siteConfig.url}/blog/${post.slug}</link>
          <description>${post.summary || ""}</description>
          <pubDate>${post.date.toUTCString()}</pubDate>
        </item>`,
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>My Portfolio</title>
        <link>${siteConfig.url}</link>
        <description>This is my portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
