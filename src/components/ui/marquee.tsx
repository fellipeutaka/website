import { cn } from "~/lib/cva";

export interface MarqueeProps extends React.ComponentProps<"div"> {
  pauseOnHover?: boolean;
  reverse?: boolean;
  children: React.JSX.Element[];
}

export function Marquee({
  pauseOnHover = false,
  reverse = false,
  className,
  children,
  ...props
}: MarqueeProps) {
  if (!children) return null;

  return (
    <div
      role="marquee"
      className={cn(
        "group flex gap-[--gap] overflow-x-hidden",
        "[--duration:20s] [--gap:1rem]",
        "[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex animate-marquee items-center gap-[--gap]",
          pauseOnHover && "group-hover:animate-pause",
          reverse && "animate-reverse",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex animate-marquee items-center gap-[--gap]",
          pauseOnHover && "group-hover:animate-pause",
          reverse && "animate-reverse",
        )}
      >
        {children}
      </div>
    </div>
  );
}
