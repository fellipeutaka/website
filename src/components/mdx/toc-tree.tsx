"use client";

import { ScrollProvider, TOCItem } from 'fumadocs-core/toc';
import type { TableOfContents } from 'fumadocs-core/toc';
import { useRef } from "react";
import { cx } from "~/lib/cva";

interface TocTreeProps {
  tree: TableOfContents;
}

function indentStyle(depth: number): React.CSSProperties & { "--indent": string } {
  return { "--indent": `${depth}rem` };
}

export function TocTree({ tree }: TocTreeProps) {
  const viewRef = useRef<HTMLUListElement>(null);

  return (
    <ScrollProvider containerRef={viewRef}>
      <ul className="space-y-2" ref={viewRef}>
        {tree.map((item) => (
          <li className="space-y-2" key={item.url}>
            <TOCItem
              className={cx(
                "inline-block text-muted-fg text-sm leading-[1.2] no-underline transition-colors",
                "hover:text-fg",
                "data-[active=true]:font-medium data-[active=true]:text-fg",
                "pl-[calc(var(--indent)-2rem)]"
              )}
              href={item.url}
              style={indentStyle(item.depth)}
            >
              {item.title}
            </TOCItem>
          </li>
        ))}
      </ul>
    </ScrollProvider>
  );
}
