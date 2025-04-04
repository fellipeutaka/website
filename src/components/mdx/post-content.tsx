import type { TableOfContents } from "fumadocs-core/server";
import { AnchorProvider } from "fumadocs-core/toc";
import { TocTree } from "./toc-tree";

interface PostContentProps {
  toc: TableOfContents;
  children: React.ReactNode;
}

export function PostContent({ toc, children }: PostContentProps) {
  return (
    <div className="mt-8 flex flex-col justify-between gap-16 lg:flex-row">
      <article className="w-full">{children}</article>

      <aside className="lg:min-w-72">
        <div className="sticky top-24">
          {toc && toc.length > 0 && (
            <div className="-mt-10 sticky top-16 space-y-4 pt-4">
              <p className="font-medium text-sm">On This Page</p>

              <AnchorProvider toc={toc}>
                <TocTree tree={toc} />
              </AnchorProvider>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
