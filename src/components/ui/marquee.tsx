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
  if (!children) {
    return null;
  }

  return (
    <div
      className={cn(
        "group flex gap-(--gap) overflow-x-hidden",
        "[--duration:20s] [--gap:1rem]",
        "mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]",
        className
      )}
      role="marquee"
      data-slot="marquee"
      {...props}
    >
      <div
        className={cn(
          "flex animate-marquee items-center gap-(--gap)",
          pauseOnHover && "group-hover:motion-paused",
          // TODO: Use native class if this PR is merged:
          // https://github.com/romboHQ/tailwindcss-motion/pull/64
          reverse && "[animation-direction:reverse]"
        )}
        data-slot="marquee-content"
      >
        {children}
      </div>
      <div
        className={cn(
          "flex animate-marquee items-center gap-(--gap)",
          pauseOnHover && "group-hover:motion-paused",
          // TODO: Use native class if this PR is merged:
          // https://github.com/romboHQ/tailwindcss-motion/pull/64
          reverse && "[animation-direction:reverse]"
        )}
        data-slot="marquee-content"
      >
        {children}
      </div>
    </div>
  );
}
