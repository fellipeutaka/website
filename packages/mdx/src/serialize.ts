import { compile } from "@mdx-js/mdx";
import { VFile, type VFileCompatible } from "vfile";
import { matter } from "vfile-matter";

import { rehypePlugins, remarkPlugins } from "./plugins";

export type SerializeResult<T = Record<string, unknown>> = {
  compiledSource: string;
  frontmatter: T;
};

export type SerializeOptions = {
  rsc?: boolean;
};

export const serialize = async <T>(
  source: VFileCompatible,
  options: SerializeOptions = {},
): Promise<SerializeResult<T>> => {
  const { rsc = false } = options;
  const vfile = new VFile(source);

  matter(vfile, { strip: true });

  try {
    return {
      compiledSource: String(
        await compile(vfile, {
          outputFormat: "function-body",
          providerImportSource: rsc ? undefined : "@mdx-js/react",
          development: process.env.NODE_ENV === "development",
          remarkPlugins,
          rehypePlugins,
        }),
      ),
      frontmatter: (vfile.data.matter ?? {}) as T,
    };
  } catch {
    throw new Error("Failed to render markdown. Please check your syntax.");
  }
};
