import type { MDXProps } from "mdx/types";
import { mdxComponents } from "./mdx-components";

interface MDXContentProps {
  body: React.FC<MDXProps>;
}

export function MDXContent({ body: Content }: MDXContentProps) {
  return <Content components={mdxComponents} />;
}
