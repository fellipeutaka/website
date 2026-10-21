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
  const [isLoading, setIsLoading] = React.useState(true);

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
            : "blur-0 scale-100 grayscale-0",
          className
        )}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
};
