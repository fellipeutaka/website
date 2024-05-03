import { getPage } from "@utaka/mdx/utils/fs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "~/components/mdx/mdx";

export const metadata: Metadata = {
  title: "About",
  description:
    "A brief introduction about me and my journey as a software developer.",
};

export default function Page() {
  const page = getPage("pages/about");

  if (!page) {
    notFound();
  }

  return (
    <main className="container my-20 animate-fade-up">
      <Mdx code={page.content} />
    </main>
  );
}
