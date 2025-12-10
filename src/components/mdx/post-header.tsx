"use client";

import Link from "next/link";
import { siteConfig } from "~/config/site";
import { formatDate } from "~/utils/date";
import type { Image } from "~/utils/zod-image";
import { BlurImage } from "../ui/blur-image";
import { ImageZoom } from "../ui/image-zoom";

interface PostHeaderProps {
  date: Date;
  title: string;
  cover: Image;
}

export function PostHeader({ title, date, cover }: PostHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-y-16 py-16">
      <div className="space-y-16 sm:px-8">
        <h1 className="heading-1 text-balance">{title}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1 md:mx-auto">
            <p className="text-muted-fg">Written by</p>
            <Link
              className="flex items-center gap-2"
              href={siteConfig.links.github}
            >
              <BlurImage
                alt={siteConfig.name}
                className="rounded-full"
                height={24}
                src="https://github.com/fellipeutaka.png"
                width={24}
              />
              {siteConfig.name}
            </Link>
          </div>
          <div className="space-y-1 md:mx-auto">
            <p className="text-muted-fg">Published on</p>
            <time dateTime={date.toISOString()}>
              {formatDate(date, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>
      <ImageZoom
        zoomImg={{
          src: cover.src,
          width: cover.width,
          height: cover.height,
          alt: title,
        }}
      >
        <BlurImage
          alt={title}
          className="rounded-lg"
          height={cover.height}
          priority
          quality={100}
          src={cover.src}
          width={cover.width}
        />
      </ImageZoom>
    </div>
  );
}
