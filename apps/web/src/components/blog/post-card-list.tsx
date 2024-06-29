"use client";
import { Icons } from "@utaka/ui/icons";
import { Skeleton } from "@utaka/ui/skeleton";
import { TextField } from "@utaka/ui/textfield";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useDeferredValue } from "react";
import type { PostWithView } from "~/utils/posts";
import { MotionDiv, MotionP } from "../framer-motion";
import { PostCard } from "./post-card";

function filterPosts(
  initialList: PostWithView[],
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
  posts: PostWithView[];
}

export function PostCardList({ posts }: PostCardListProps) {
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const deferredQuery = useDeferredValue(query);

  const filteredPosts = filterPosts(posts, {
    query: deferredQuery,
  });

  function setQuery(query: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  }

  return (
    <section className="mt-10 animate-delay-75 animate-fade-up">
      <TextField className="mb-4 grow">
        <TextField.Slot>
          <Icons.Search className="size-4 text-muted-foreground" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Search post"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </TextField>

      <AnimatePresence>
        {filteredPosts.length > 0 ? (
          <div className="grid w-full gap-4 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <MotionDiv
                key={post.slug}
                layout
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <PostCard post={post} />
              </MotionDiv>
            ))}
          </div>
        ) : (
          <MotionP
            layout
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            No post found.
          </MotionP>
        )}
      </AnimatePresence>
    </section>
  );
}

export function PostCardListSkeleton() {
  return (
    <section className="mt-10 animate-delay-75 animate-fade-up">
      <TextField className="mb-4 grow">
        <TextField.Slot>
          <Icons.Search className="size-4 text-muted-foreground" />
        </TextField.Slot>
        <TextField.Input placeholder="Search post" disabled />
      </TextField>

      <div className="grid w-full gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton loader
            key={index}
            className="block rounded-xl border px-2 py-4"
          >
            <Skeleton className="h-96 rounded-lg" />
            <div className="flex items-center justify-between gap-2 px-2 pt-4 text-muted-foreground text-sm">
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
