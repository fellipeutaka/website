import type { TocEntry } from "./mdx";

function getUrls(toc: TocEntry[]): string[] {
  return toc.flatMap((item) => [
    item.url,
    ...(item.items ? getUrls(item.items) : []),
  ]);
}

export function getItemIds(toc: TocEntry[]) {
  return getUrls(toc)
    .filter(Boolean)
    .map((id) => id.split("#")[1]);
}
