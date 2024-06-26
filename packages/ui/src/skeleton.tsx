import { cn } from "@utaka/tailwind";
import { forwardRef } from "react";

export type SkeletonProps = React.ComponentPropsWithoutRef<"div">;

export const Skeleton = forwardRef<React.ElementRef<"div">, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("animate-pulse rounded-md bg-muted", className)}
        aria-busy="true"
        aria-live="polite"
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";
