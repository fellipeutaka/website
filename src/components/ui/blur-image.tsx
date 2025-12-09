"use client";

import type { ImageProps } from "next/image";
import NextImage from "next/image";
import React from "react";
import { cn } from "~/lib/cva";

interface BlurImageProps extends ImageProps {
  containerClassName?: string;
}

export const BlurImage = ({
  className,
  containerClassName,
  ...props
}: BlurImageProps) => {
  const [isLoading, setLoading] = React.useState(true);

  return (
    <div
      className={cn(
        "overflow-hidden",
        isLoading && "animate-pulse",
        containerClassName
      )}
    >
      <NextImage
        {...props}
        className={cn(
          "rounded-xl duration-700 ease-in-out",
          isLoading
            ? "scale-[1.02] blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0",
          className
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
