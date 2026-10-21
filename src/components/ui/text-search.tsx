"use client";

import { Field } from "@base-ui/react/field";
import { createContext, useContext, useState } from "react";
import { cva } from "~/lib/cva";
import { Button, type ButtonProps } from "./button";
import { Icons } from "./icons";
import { Spinner } from "./spinner";

interface SearchState {
  label: string;
  onValueChange: (value: string) => void;
  value: string;
}

export const SearchContext = createContext<SearchState | null>(null);

interface TextSearchRootProps
  extends Omit<Field.Root.Props, "onChange" | "defaultValue"> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

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

export function TextSearchRoot({
  className,
  value,
  defaultValue = "",
  onValueChange,
  children,
  ...props
}: TextSearchRootProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  function updateValue(next: string) {
    if (value === undefined) {
      setUncontrolledValue(next);
    }
    onValueChange?.(next);
  }
  return (
    <SearchContext
      value={{
        value: value ?? uncontrolledValue,
        onValueChange: updateValue,
        label: props["aria-label"] ?? "Search...",
      }}
    >
      <Field.Root
        {...props}
        className={(values) =>
          TextFieldStyles.Root({
            className:
              typeof className === "function" ? className(values) : className,
          })
        }
        data-empty={(value ?? uncontrolledValue).length === 0 ? "" : undefined}
      >
        {children}
      </Field.Root>
    </SearchContext>
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
  onClick,
  ...props
}: ButtonProps) {
  const search = useContext(SearchContext);
  return (
    <Button
      aria-label="Clear search"
      className={(values) =>
        TextFieldStyles.ClearButton({
          className:
            typeof className === "function" ? className(values) : className,
        })
      }
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) {
          return;
        }
        search?.onValueChange("");
        event.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
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
