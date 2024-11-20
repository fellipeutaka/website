import type { TocEntry } from "~/utils/mdx";
import { MDXContent } from "./mdx-content";
import { TableOfContents } from "./table-of-contents";

interface PostContentProps {
  content: string;
  toc: TocEntry[];
  itemIds: string[];
}

export function PostContent({ content, toc, itemIds }: PostContentProps) {
  return (
    <div className="mt-8 flex flex-col justify-between gap-16 lg:flex-row">
      <article className="w-full">
        <MDXContent code={content} />
      </article>
      <aside className="lg:min-w-72">
        <div className="sticky top-24">
          {toc && toc.length > 0 && (
            <TableOfContents toc={toc} itemIds={itemIds} />
          )}
        </div>
      </aside>
    </div>
  );
}
