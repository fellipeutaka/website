import { cn } from "~/lib/cva";

import { Link } from "../ui/link";
import { Code } from "./code";
import { DisplayAge } from "./display-age";
import { Figcaption } from "./figcaption";
import { Heading } from "./heading";
import { Pre } from "./pre";

export const mdxComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="mt-2 text-4xl font-bold tracking-tight" {...props}>
      {children}
    </h1>
  ),
  h2: (props) => (
    <Heading
      as="h2"
      className="mt-10 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <Heading
      as="h3"
      className="mt-8 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h4: (props) => (
    <Heading
      as="h4"
      className="mt-8 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h5: (props) => (
    <Heading
      as="h5"
      className="mt-8 text-lg font-semibold tracking-tight"
      {...props}
    />
  ),
  h6: (props) => (
    <Heading
      as="h6"
      className="mt-8 text-base font-semibold tracking-tight"
      {...props}
    />
  ),
  a: ({ className, children, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    >
      {children}
    </a>
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p className={cn("leading-7 not-first:mt-6", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic *:text-muted-fg", className)}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    width,
    height,
    ...props
  }: React.ComponentProps<"img">) => (
    // oxlint-disable-next-line next/no-img-element -- MDX supplies native image properties, including remote sources.
    <img
      {...props}
      alt={alt}
      className={cn("rounded-md border", className)}
      height={height}
      width={width}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  Code,
  code: Code,
  pre: Pre,
  figure: ({ className, ...props }: React.ComponentProps<"figure">) => (
    <figure
      className={cn(
        "group relative mt-6 overflow-hidden rounded-lg border text-sm",
        className
      )}
      {...props}
    />
  ),
  figcaption: Figcaption,
  Link,

  // Pages
  DisplayAge,
} satisfies Record<string, React.FunctionComponent<SAFE_ANY>>;

// oxlint-disable-next-line typescript/no-explicit-any -- MDX maps heterogeneous intrinsic and custom component props.
type SAFE_ANY = any;
