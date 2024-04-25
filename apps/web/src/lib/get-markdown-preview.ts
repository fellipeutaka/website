export async function getMarkdownPreview(content: string) {
  const { serialize } = await import("@utaka/mdx");

  return {
    result: await serialize(content),
  };
}
