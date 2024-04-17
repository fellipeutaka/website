"use client";

import { MDXRemote } from "@utaka/mdx";
import { cn } from "@utaka/tailwind";
import { Suspense, cache, use } from "react";
import { getMarkdownPreview } from "~/lib/get-markdown-preview";
import { components } from "../mdx/mdx";

type MarkdownProps = {
  className?: string;
} & (
  | {
      compiledSource?: never;

      source: string;
    }
  | {
      compiledSource: string;

      source?: never;
    }
);

export function MarkdownPreview(props: MarkdownProps) {
  const { source, compiledSource, className } = props;

  return (
    <div
      className={cn(
        "prose w-full break-words text-sm [&_table_*]:border-border",
        className,
      )}
    >
      {compiledSource && <CommentRenderer compiledSource={compiledSource} />}
      {source && (
        <Suspense fallback={<p>Rendering...</p>}>
          <CommentRenderer source={source} />
        </Suspense>
      )}
    </div>
  );
}

const { h1, h2, h3, h4, h5, h6, p, ...mdxComponents } = components;

const getPreview = cache(getMarkdownPreview);

type CommentRendererProps =
  | { source?: never; compiledSource: string }
  | { source: string; compiledSource?: never };

function CommentRenderer({ compiledSource, source }: CommentRendererProps) {
  if (source) {
    const { result } = use(getPreview(source));

    return (
      <MDXRemote
        compiledSource={result.compiledSource}
        components={mdxComponents}
        frontmatter={{}}
      />
    );
  }

  return (
    <MDXRemote
      compiledSource={compiledSource ?? ""}
      components={mdxComponents}
      frontmatter={{}}
    />
  );
}
