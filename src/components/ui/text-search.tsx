"use client";

import { SearchField, type SearchFieldProps } from "react-aria-components";
import { cva } from "~/lib/cva";
import { Button, type ButtonProps } from "./button";
import { Icons } from "./icons";
import { Spinner } from "./spinner";

export const TextFieldStyles = {
  Root: cva({
    base: ["group flex flex-col gap-y-1.5"],
  }),
  Icon: cva({
    base: ["ml-2.5 size-4 shrink-0 text-muted-fg group-disabled:text-muted-fg"],
  }),
  ClearButton: cva({
    base: [
      "mr-1 size-8 pressed:bg-transparent pressed:text-fg text-muted-fg hover:bg-transparent hover:text-fg group-empty:invisible",
    ],
  }),
};

export function TextSearchRoot({ className, ...props }: SearchFieldProps) {
  return (
    <SearchField
      {...props}
      aria-label={props["aria-label"] ?? "Search..."}
      className={(values) =>
        TextFieldStyles.Root({
          className:
            typeof className === "function" ? className(values) : className,
        })
      }
    />
  );
}

export function TextSearchIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <Icons.Search {...props} className={TextFieldStyles.Icon({ className })} />
  );
}

export function TextSearchSpinner({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return <Spinner {...props} className={TextFieldStyles.Icon({ className })} />;
}

export function TextSearchClearButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={(values) =>
        TextFieldStyles.ClearButton({
          className:
            typeof className === "function" ? className(values) : className,
        })
      }
      size="icon"
      variant="ghost"
      {...props}
    >
      {children ?? <Icons.X className="size-4" />}
    </Button>
  );
}

export const TextSearch = {
  Root: TextSearchRoot,
  Icon: TextSearchIcon,
  Spinner: TextSearchSpinner,
  ClearButton: TextSearchClearButton,
};
