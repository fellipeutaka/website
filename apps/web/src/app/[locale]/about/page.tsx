import { useLocale } from "@utaka/i18n/utils/react";
import { getPage } from "@utaka/mdx/utils/fs";
import { notFound } from "next/navigation";
import { Mdx } from "~/components/mdx/mdx";

export default function Page() {
  const locale = useLocale();
  const page = getPage(locale, "pages/about");

  if (!page) {
    notFound();
  }

  return (
    <main className="container my-20 animate-fade-up">
      <Mdx code={page.content} />
    </main>
  );
}
