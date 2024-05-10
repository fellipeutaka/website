import { cn } from "@utaka/tailwind";

export interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  pauseOnHover?: boolean;
  reverse?: boolean;
  motionReduce?: boolean;
  children: React.JSX.Element[];
}

export function Marquee({
  pauseOnHover = false,
  reverse = false,
  motionReduce = true,
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
        motionReduce &&
          "motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-scroll",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex animate-marquee items-center gap-[--gap]",
          pauseOnHover && "group-hover:animate-pause",
          reverse && "animate-reverse",
          motionReduce &&
            "motion-reduce:animate-none motion-reduce:[&>*]:snap-start",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex animate-marquee items-center gap-[--gap]",
          pauseOnHover && "group-hover:animate-pause",
          reverse && "animate-reverse",
          motionReduce && "motion-reduce:hidden motion-reduce:animate-none",
        )}
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
}
