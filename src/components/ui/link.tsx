"use client";

import LinkPrimitive from "next/link";
import { cva } from '~/lib/cva';
import type { VariantProps } from '~/lib/cva';

export const LinkStyles = cva({
  base: [
    "relative outline outline-0 outline-primary outline-offset-2 transition-colors",
    "focus-visible:outline-2",
    "disabled:cursor-default disabled:opacity-60",
    "disabled:focus-visible:outline-0",
  ],

  variants: {
    variant: {
      unstyled: ["text-current"],
      primary: ["text-primary hover:text-primary/80"],
      danger: ["text-danger hover:text-danger/80"],
      "lad/primary": ["text-fg hover:text-primary dark:hover:text-primary/80"],
      secondary: ["text-secondary-fg hover:text-secondary-fg/80"],
    },
  },
  defaultVariants: {
    variant: "unstyled",
  },
});

export interface LinkProps
  extends React.ComponentProps<typeof LinkPrimitive>,
    VariantProps<typeof LinkStyles> {}

export function Link({ className, variant, ...props }: LinkProps) {
  return (
    <LinkPrimitive {...props} className={LinkStyles({ variant, className })} />
  );
}

export { default as LinkPrimitive } from "next/link";
