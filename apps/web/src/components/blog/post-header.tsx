"use client";

import { formatDate } from "@utaka/utils/date";
import Link from "next/link";
import { useEffect } from "react";
import { siteConfig } from "~/config/site";
import { nativeClient } from "~/lib/api/native";
import { reactClient } from "~/lib/api/react";
import { BlurImage } from "../blur-image";
import { ImageZoom } from "../image-zoom";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface PostHeaderProps {
  date: Date;
  title: string;
  slug: string;
}

export function PostHeader({ title, date, slug }: PostHeaderProps) {
  const { data, isLoading } = reactClient.post.getMetadata.useQuery(slug);

  useEffect(() => {
    nativeClient.post.increaseView.mutate(slug);
  }, [slug]);

  return (
    <div className="flex flex-col items-center gap-y-16 py-16">
      <div className="space-y-16 sm:px-8">
        <h1 className="text-balance text-center font-bold text-4xl md:text-5xl md:leading-[64px]">
          {title}
        </h1>
        <div className="grid grid-cols-2 text-sm md:grid-cols-4 max-md:gap-4">
          <div className="space-y-1 md:mx-auto">
            <div className="text-muted-foreground">Written by</div>
            <Link
              href={siteConfig.links.github}
              className="flex items-center gap-2"
            >
              <BlurImage
                src="https://github.com/fellipeutaka.png"
                className="rounded-full"
                width={24}
                height={24}
                alt={siteConfig.name}
              />
              {siteConfig.name}
            </Link>
          </div>
          <div className="space-y-1 md:mx-auto">
            <div className="text-muted-foreground">Published on</div>
            <div>{formatDate(date)}</div>
          </div>
          <div className="space-y-1 md:mx-auto">
            <div className="text-muted-foreground">Views</div>
            {isLoading ? (
              "--"
            ) : (
              <div>{data?.views ?? getRandomNumber(0, 1_000)}</div>
            )}
          </div>
          <div className="space-y-1 md:mx-auto">
            <div className="text-muted-foreground">Comments</div>
            {isLoading ? (
              "--"
            ) : (
              <div>{data?.comments ?? getRandomNumber(0, 100)}</div>
            )}
          </div>
        </div>
      </div>
      <ImageZoom
        zoomImg={{
          src: `/images/blog/${slug}/cover.png`,
          alt: title,
        }}
      >
        <BlurImage
          src={`/images/blog/${slug}/cover.png`}
          className="rounded-lg"
          width={1200}
          height={630}
          alt={title}
          priority
          quality={100}
        />
      </ImageZoom>
    </div>
  );
}
