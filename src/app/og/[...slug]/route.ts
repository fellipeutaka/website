import { notFound } from "next/navigation";

import { createOpenGraphImage } from "~/components/open-graph-image";
import { postsSource } from "~/lib/source";

export const dynamic = "force-static";

export function generateStaticParams() {
  return postsSource.generateParams();
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/og/[...slug]">
) {
  const { slug } = await params;
  const post = postsSource.getPage(slug);

  if (!post) {
    notFound();
  }

  return createOpenGraphImage({
    title: post.data.title,
    description: post.data.description,
  });
}
