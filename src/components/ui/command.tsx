"use client";

import { Command as Cmdk } from "cmdk";
import { Input, Keyboard, TextField } from "react-aria-components";
import { cva } from "~/lib/cva";
import { Dialog, type DialogRootProps } from "./dialog";
import { Icons } from "./icons";

export const CommandStyles = {
  Root: cva({
    base: [
      "flex w-full flex-col overflow-hidden rounded-md bg-popover text-popover-fg",
    ],
  }),
  Dialog: cva({
    base: [
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-fg [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3",
    ],
  }),
  Input: cva({
    base: [
      "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden",
      "placeholder:text-muted-fg",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
  }),
  List: cva({
    base: ["max-h-[300px] overflow-y-auto overflow-x-hidden"],
  }),
  Empty: cva({
    base: ["py-6 text-center text-sm"],
  }),
  Group: cva({
    base: [
      "overflow-hidden p-1 text-fg",
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium",
      "[&_[cmdk-group-heading]]:text-muted-fg [&_[cmdk-group-heading]]:text-xs",
    ],
  }),
  Separator: cva({
    base: ["-mx-1 my-1 h-px bg-border"],
  }),
  Item: cva({
    base: [
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden",
      "aria-selected:bg-accent aria-selected:text-accent-fg",
      "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    ],
  }),
  Shortcut: cva({
    base: ["ml-auto text-muted-fg text-xs tracking-widest"],
  }),
};

export type CommandRootProps = React.ComponentProps<typeof Cmdk>;

export function CommandRoot({ className, ...props }: CommandRootProps) {
  return <Cmdk {...props} className={CommandStyles.Root({ className })} />;
}

export type CommandDialogProps = DialogRootProps;

export function CommandDialog({ children, ...props }: CommandDialogProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Content className="overflow-hidden p-0">
        <Cmdk className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-fg [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3">
          {children}
        </Cmdk>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export type CommandInputProps = React.ComponentProps<(typeof Cmdk)["Input"]>;

export function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div className="flex items-center border-b px-3">
      <Icons.Search className="mr-2 size-4 shrink-0 opacity-50" />
      <TextField
        aria-label={props["aria-label"] ?? props.placeholder}
        autoFocus
      >
        <Cmdk.Input asChild>
          <Input
            {...props}
            className={CommandStyles.Input({
              className: [className, "max-sm:hidden"],
            })}
          />
        </Cmdk.Input>
      </TextField>
      <Cmdk.Input
        {...props}
        className={CommandStyles.Input({
          className: [className, "sm:hidden"],
        })}
      />
    </div>
  );
}

export type CommandListProps = React.ComponentProps<(typeof Cmdk)["List"]>;

export function CommandList({ className, ...props }: CommandListProps) {
  return <Cmdk.List {...props} className={CommandStyles.List({ className })} />;
}

export type CommandEmptyProps = React.ComponentProps<(typeof Cmdk)["Empty"]>;

export function CommandEmpty({ className, ...props }: CommandEmptyProps) {
  return (
    <Cmdk.Empty {...props} className={CommandStyles.Empty({ className })} />
  );
}

export type CommandGroupProps = React.ComponentProps<(typeof Cmdk)["Group"]>;

export function CommandGroup({ className, ...props }: CommandGroupProps) {
  return (
    <Cmdk.Group {...props} className={CommandStyles.Group({ className })} />
  );
}

export type CommandItemProps = React.ComponentProps<(typeof Cmdk)["Item"]>;

export function CommandItem({ className, ...props }: CommandItemProps) {
  return <Cmdk.Item {...props} className={CommandStyles.Item({ className })} />;
}

export type CommandSeparatorProps = React.ComponentProps<
  (typeof Cmdk)["Separator"]
>;

export function CommandSeparator({
  className,
  ...props
}: CommandSeparatorProps) {
  return (
    <Cmdk.Separator
      {...props}
      className={CommandStyles.Separator({ className })}
    />
  );
}

export type CommandShortcutProps = React.ComponentProps<"span">;

export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <Keyboard {...props} className={CommandStyles.Shortcut({ className })} />
  );
}

export const Command = Object.assign(
  {},
  {
    Root: CommandRoot,
    Dialog: CommandDialog,
    Input: CommandInput,
    List: CommandList,
    Empty: CommandEmpty,
    Group: CommandGroup,
    Item: CommandItem,
    Separator: CommandSeparator,
    Shortcut: CommandShortcut,
  },
);
