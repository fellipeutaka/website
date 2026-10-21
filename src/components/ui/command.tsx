"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { useState } from "react";

import { cva } from "~/lib/cva";

import { Dialog } from "./dialog";
import type { DialogRootProps } from "./dialog";
import { Icons } from "./icons";

export const CommandStyles = {
  Root: cva({
    base: "flex w-full flex-col overflow-hidden rounded-md bg-popover text-popover-fg",
  }),
  Dialog: cva({
    base: "[&_[data-slot=command-group]]:px-2 [&_[data-slot=command-input]_svg]:size-5 [&_[data-slot=command-item]]:px-2 [&_[data-slot=command-item]]:py-3 [&_input]:h-12",
  }),
  Input: cva({
    base: "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-fg disabled:cursor-not-allowed disabled:opacity-50",
  }),
  List: cva({ base: "max-h-[300px] overflow-x-hidden overflow-y-auto" }),
  Empty: cva({ base: "py-6 text-center text-sm empty:hidden" }),
  Group: cva({
    base: "overflow-hidden p-1 text-fg [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:py-1.5 [&_[data-slot=command-group-heading]]:text-xs [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group-heading]]:text-muted-fg",
  }),
  Separator: cva({ base: "-mx-1 my-1 h-px bg-border" }),
  Item: cva({
    base: "relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-fg",
  }),
  Shortcut: cva({ base: "ml-auto text-xs tracking-widest text-muted-fg" }),
};

export type CommandItems<T> = readonly { value: string; items: readonly T[] }[];
const emptyItems = [] as const;

function matchesCommand<T>(
  item: T,
  query: string,
  itemToString?: (item: T) => string
) {
  const label = (
    itemToString?.(item) ?? (typeof item === "string" ? item : "")
  ).toLowerCase();
  let position = 0;
  for (const character of query.trim().toLowerCase()) {
    const match = label.indexOf(character, position);
    if (match === -1) {
      return false;
    }
    position = match + 1;
  }
  return true;
}
export type CommandRootProps<T> = Omit<Autocomplete.Root.Props<T>, "items"> & {
  className?: string;
  items?: CommandItems<T>;
};

export function CommandRoot<T>({
  className,
  items = emptyItems,
  value,
  defaultValue = "",
  onValueChange,
  ...props
}: CommandRootProps<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  return (
    <div className={CommandStyles.Root({ className })}>
      <Autocomplete.Root<CommandItems<T>>
        filter={matchesCommand}
        {...props}
        autoHighlight="always"
        inline
        items={items}
        keepHighlight
        onValueChange={(value, details) => {
          if (details.reason === "item-press") {
            details.cancel();
            return;
          }
          onValueChange?.(value, details);
          if (!details.isCanceled) {
            setUncontrolledValue(value);
          }
        }}
        open
        value={value ?? uncontrolledValue}
      />
    </div>
  );
}

export interface CommandDialogProps extends Omit<DialogRootProps, "children"> {
  children: React.ReactNode;
  items?: CommandItems<string>;
}

export function CommandDialog({
  children,
  items,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Content className="overflow-hidden p-0">
        <Dialog.Title className="sr-only">Commands</Dialog.Title>
        <CommandRoot className={CommandStyles.Dialog()} items={items}>
          {children}
        </CommandRoot>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export type CommandInputProps = Autocomplete.Input.Props;

export function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div className="flex items-center border-b px-3" data-slot="command-input">
      <Icons.Search className="mr-2 size-4 shrink-0 opacity-50" />
      <Autocomplete.Input
        aria-label={props["aria-label"] ?? props.placeholder}
        {...props}
        className={(state) =>
          CommandStyles.Input({
            className:
              typeof className === "function" ? className(state) : className,
          })
        }
      />
    </div>
  );
}

export function CommandList({ className, ...props }: Autocomplete.List.Props) {
  return (
    <Autocomplete.List
      {...props}
      className={(state) =>
        CommandStyles.List({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
    />
  );
}

export function CommandEmpty({
  className,
  ...props
}: Autocomplete.Empty.Props) {
  return (
    <Autocomplete.Empty
      {...props}
      className={(state) =>
        CommandStyles.Empty({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
    />
  );
}

interface CommandGroupProps extends Autocomplete.Group.Props {
  heading?: React.ReactNode;
}

export function CommandGroup({
  className,
  children,
  heading,
  ...props
}: CommandGroupProps) {
  return (
    <Autocomplete.Group
      {...props}
      className={(state) =>
        CommandStyles.Group({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
      data-slot="command-group"
    >
      {Boolean(heading) && (
        <Autocomplete.GroupLabel data-slot="command-group-heading">
          {heading}
        </Autocomplete.GroupLabel>
      )}
      {children}
    </Autocomplete.Group>
  );
}

export function CommandItem({ className, ...props }: Autocomplete.Item.Props) {
  return (
    <Autocomplete.Item
      {...props}
      className={(state) =>
        CommandStyles.Item({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
      data-slot="command-item"
    />
  );
}

export function CommandSeparator({
  className,
  ...props
}: Autocomplete.Separator.Props) {
  return (
    <Autocomplete.Separator
      {...props}
      className={(state) =>
        CommandStyles.Separator({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
    />
  );
}

export function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">) {
  return <kbd {...props} className={CommandStyles.Shortcut({ className })} />;
}

export const Command = {
  Root: CommandRoot,
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
  Shortcut: CommandShortcut,
  Collection: Autocomplete.Collection,
};
