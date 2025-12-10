import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "~/components/mdx/mdx-content";
import { pagesSource } from "~/lib/source";

export const metadata: Metadata = {
  title: "About",
  description:
    "A brief introduction about me and my journey as a software developer.",
};

export default function Page() {
  const page = pagesSource.getPage(["about"]);

  if (!page) {
    notFound();
  }

  const { body } = page.data;

  return (
    <main className="container my-20 animate-fade-up">
      <MDXContent body={body} />
    </main>
  );
}
