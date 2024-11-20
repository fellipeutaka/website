import { pages } from "~:content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "~/components/mdx/mdx-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "A brief introduction about me and my journey as a software developer.",
};

export default function Page() {
  const page = pages.find((page) => page.slugAsParams === "about");

  if (!page) {
    notFound();
  }

  return (
    <main className="container my-20 animate-fade-up">
      <MDXContent code={page.content} />
    </main>
  );
}
