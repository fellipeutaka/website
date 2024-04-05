import { cn } from "~/lib/utils";

type DivProps = React.ComponentPropsWithoutRef<"div">;

function BentoGridRoot(props: DivProps) {
  return (
    <div
      {...props}
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3 ",
        props.className,
      )}
    />
  );
}

function BentoGridItem(props: DivProps) {
  return (
    <div
      {...props}
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between gap-4 rounded-xl border border-transparent bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        props.className,
      )}
    />
  );
}

function BentoGridBody(props: DivProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex-1 transition duration-200 group-hover/bento:translate-x-2",
        props.className,
      )}
    />
  );
}

function BentoGridTitle(props: DivProps) {
  return (
    <div
      {...props}
      className={cn(
        "my-2 font-bold text-neutral-600 dark:text-neutral-200",
        props.className,
      )}
    />
  );
}

function BentoGridDescription(props: DivProps) {
  return (
    <div
      {...props}
      className={cn(
        "text-xs font-normal text-neutral-600 dark:text-neutral-300",
        props.className,
      )}
    />
  );
}

export const BentoGrid = Object.assign(BentoGridRoot, {
  Item: BentoGridItem,
  Body: BentoGridBody,
  Title: BentoGridTitle,
  Description: BentoGridDescription,
});