"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { TextSearch } from "~/components/ui/text-search";
import { useFilters } from "~/hooks/use-filters";
import type { Post } from "~/utils/mdx";
import { PostCard } from "./post-card";

function filterPosts(
  initialList: Post[],
  filter: {
    query: string;
  },
) {
  return initialList.filter((post) => {
    const query = filter.query.trim().toLowerCase();

    if (query && !post.title.toLowerCase().includes(query)) {
      return false;
    }

    return true;
  });
}

interface PostCardListProps {
  posts: Post[];
}

export function PostCardList({ posts }: PostCardListProps) {
  const [filters, setFilters] = useFilters();

  const filteredPosts = filterPosts(posts, {
    query: filters.q,
  });

  return (
    <section className="mt-10 animate-delay-75 animate-fade-up">
      <TextSearch.Root
        value={filters.q}
        onChange={(q) => setFilters({ q })}
        className="mb-4 grow"
      >
        <Form.Field>
          <TextSearch.Icon />

          <Input placeholder="Search..." />

          <TextSearch.ClearButton />
        </Form.Field>
      </TextSearch.Root>

      <AnimatePresence>
        {filteredPosts.length > 0 ? (
          <div className="grid w-full gap-4 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <m.div
                key={post.slug}
                layout
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                className="motion"
              >
                <PostCard post={post} />
              </m.div>
            ))}
          </div>
        ) : (
          <m.p
            layout
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            className="motion"
          >
            No post found.
          </m.p>
        )}
      </AnimatePresence>
    </section>
  );
}

export function PostCardListSkeleton() {
  return (
    <section className="mt-10 animate-delay-75 animate-fade-up">
      <TextSearch.Root isDisabled className="mb-4 grow">
        <Form.Field>
          <TextSearch.Icon />

          <Input placeholder="Search..." />

          <TextSearch.ClearButton />
        </Form.Field>
      </TextSearch.Root>

      <div className="grid w-full gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton loader
            key={index}
            className="block rounded-xl border px-2 py-4"
          >
            <Skeleton className="h-96 rounded-lg" />
            <div className="flex items-center justify-between gap-2 px-2 pt-4 text-muted-fg text-sm">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-14" />
            </div>
            <div className="flex flex-col space-y-2 px-2 py-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
