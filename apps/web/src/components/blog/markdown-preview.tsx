"use client";

import { MDXRemote } from "@utaka/mdx/client";
import { cn } from "@utaka/tailwind";
import { Suspense, cache, use } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
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

function FallbackRender(props: FallbackProps) {
  return <p>{props.error.message || "Something went wrong"}</p>;
}

export function MarkdownPreview(props: MarkdownProps) {
  const { source, compiledSource, className } = props;

  return (
    <div
      className={cn(
        "prose w-full break-words text-sm [&_table_*]:border-border",
        className,
      )}
    >
      <ErrorBoundary fallbackRender={FallbackRender}>
        {compiledSource && <CommentRenderer compiledSource={compiledSource} />}
        {source && (
          <Suspense fallback={<p>Rendering...</p>}>
            <CommentRenderer source={source} />
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
}

const { h1, h2, h3, h4, h5, h6, p, ...mdxComponents } = components;

const getPreview = cache(async (content: string) => {
  const { serialize } = await import("@utaka/mdx/serialize");

  return await serialize(content);
});

type CommentRendererProps =
  | { source?: never; compiledSource: string }
  | { source: string; compiledSource?: never };

function CommentRenderer({ compiledSource, source }: CommentRendererProps) {
  if (source) {
    const result = use(getPreview(source));

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
