import { getTOC } from "@utaka/mdx";
import { Mdx } from "../mdx/mdx";
import { TableOfContents } from "./table-of-contents";

type PostContentProps = {
  content: string;
};

export async function PostContent({ content }: PostContentProps) {
  const toc = await getTOC(content);

  return (
    <div className="mt-8 flex flex-col justify-between gap-16 lg:flex-row">
      <article>
        <Mdx code={content} />
      </article>
      <aside className="lg:min-w-72">
        <div className="sticky top-24">
          {toc && toc.length > 0 && <TableOfContents toc={toc} />}
        </div>
      </aside>
    </div>
  );
}
