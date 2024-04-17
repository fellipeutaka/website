"use client";

import type { TOC } from "@utaka/mdx";
import { cn } from "@utaka/tailwind";

import { useScrollSpy } from "~/hooks/use-scrollspy";

type TableOfContentsProps = {
  toc: TOC[];
};

export function TableOfContents(props: TableOfContentsProps) {
  const { toc } = props;
  const activeId = useScrollSpy(
    toc.map((item) => `#${item.url}`),
    { rootMargin: "0% 0% -80% 0%" },
  );

  return (
    <div className="hidden lg:block">
      <div className="mb-4 pl-4 font-medium">On this page</div>
      <div>
        {toc.map((item) => {
          const { title, url, depth } = item;

          return (
            <a
              key={url}
              href={`#${url}`}
              className={cn(
                "block py-2.5 pr-2.5 text-muted-foreground text-sm leading-[1.2] transition-all hover:text-foreground",
                url === activeId && "text-foreground",
              )}
              style={{
                paddingLeft: (depth - 1) * 16,
              }}
            >
              {title}
            </a>
          );
        })}
      </div>
    </div>
  );
}
