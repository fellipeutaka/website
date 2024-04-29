import { getPage } from "@utaka/mdx/utils/fs";
import { notFound } from "next/navigation";
import { Mdx } from "~/components/mdx/mdx";

export default function Page() {
  const page = getPage("pages/about");

  if (!page) {
    notFound();
  }

  return (
    <main className="container my-20">
      <Mdx code={page.content} />
    </main>
  );
}
