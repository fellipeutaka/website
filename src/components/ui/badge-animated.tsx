import { cn } from "~/lib/cva";

export function BadgeAnimated(props: React.ComponentProps<"span">) {
  return (
    <div className="group relative grid w-max overflow-hidden rounded-full px-3 py-1 shadow-[0_1000px_0_0_oklch(var(--border))_inset] transition-colors duration-200">
      <span className="absolute inset-0 size-full animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:-rotate-90 before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
      <span className="absolute inset-px rounded-full bg-bg transition-colors duration-200 group-hover:bg-bg/90" />
      <span
        {...props}
        className={cn("z-10 font-medium text-xs", props.className)}
      />
    </div>
  );
}
