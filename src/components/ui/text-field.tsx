"use client";

import { Field } from "@base-ui/react/field";
import { cva } from "~/lib/cva";

export const TextFieldStyles = cva({
  base: ["group flex flex-col gap-y-1.5"],
});

export function TextField({ className, ...props }: Field.Root.Props) {
  return (
    <Field.Root
      {...props}
      className={(values) =>
        TextFieldStyles({
          className:
            typeof className === "function" ? className(values) : className,
        })
      }
    />
  );
}
