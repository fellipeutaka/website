import { serialize } from "@utaka/mdx";

export async function getMarkdownPreview(content: string) {
  return {
    result: await serialize(content),
  };
}
