import type { MDXProvider } from "@mdx-js/react";

export type MDXComponents = React.ComponentProps<
  typeof MDXProvider
>["components"];

export type TOC = {
  title: string;
  url: string;
  depth: number;
};

import type { Node } from "unist-builder";

export interface UnistNode extends Node {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  properties?: {
    __rawString__?: string;
    __className__?: string;
    __event__?: string;
    [key: string]: unknown;
  };
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
  lang?: string;
}

export interface UnistTree extends Node {
  children: UnistNode[];
}
