"use client";

import {
  TextField as TextFieldPrimitive,
  type TextFieldProps,
} from "react-aria-components";
import { cva } from "~/lib/cva";

export const TextFieldStyles = cva({
  base: ["group flex flex-col gap-y-1.5"],
});

export function TextField({ className, ...props }: TextFieldProps) {
  return (
    <TextFieldPrimitive
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
