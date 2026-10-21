"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { useContext } from "react";

import { cva } from "~/lib/cva";

import { SearchContext } from "./text-search";

export const InputStyles = cva({
  base: [
    "w-full min-w-0 bg-transparent px-2.5 py-2 text-fg placeholder-muted-fg outline-hidden select-none",
    "[&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden",
  ],
});

export function Input({
  className,
  ...props
}: React.ComponentProps<typeof InputPrimitive>) {
  const search = useContext(SearchContext);
  return (
    <InputPrimitive
      aria-label={search?.label}
      onValueChange={search?.onValueChange}
      type={search ? "search" : undefined}
      value={search?.value}
      {...props}
      className={(state) =>
        InputStyles({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
    />
  );
}
