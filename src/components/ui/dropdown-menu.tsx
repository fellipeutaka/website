"use client";

import { Menu } from "@base-ui/react/menu";
import { useCallback } from "react";
import { cva } from "~/lib/cva";
import { PopoverStyles } from "./popover";
import { SeparatorStyles } from "./separator";

export const DropdownMenuStyles = {
  Content: cva({
    base: [
      "overflow-auto rounded-xl p-1 outline outline-0",
      "[clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))]",
      "sm:max-h-[inherit]",
    ],
  }),
  Item: cva({
    base: [
      "group relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-fg [&>svg]:size-4 [&>svg]:shrink-0",
    ],
    variants: {
      isDisabled: {
        true: "text-muted-fg",
      },
      isFocused: {
        false: "data-[danger=true]:text-danger",
        true: [
          "bg-accent text-accent-fg",
          "data-[danger=true]:bg-danger data-[danger=true]:text-danger-fg",
        ],
      },
      type: {
        checkbox: ["relative pl-8"],
        radio: ["relative pl-8"],
        default: [""],
      },
    },
  }),
  Shortcut: cva({
    base: ["ml-auto text-xs tracking-widest opacity-60"],
  }),
  Header: cva({
    base: ["px-2 py-1.5 font-semibold text-sm"],
  }),
  CheckboxIcon: cva({
    base: [
      "absolute left-2 grid size-4 shrink-0 place-content-center opacity-0 transition-opacity group-aria-checked:opacity-100",
    ],
  }),
  ItemDetails: cva({
    base: ["flex flex-col gap-y-1"],
  }),
};

export const DropdownMenuRoot = Menu.Root;
export const DropdownMenuTrigger = Menu.Trigger;

interface DropdownMenuContentProps
  extends Menu.Popup.Props,
    Pick<
      Menu.Positioner.Props,
      "side" | "align" | "sideOffset" | "alignOffset"
    > {}

export function DropdownMenuContent({
  className,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 9,
  alignOffset = -1,
  ...props
}: DropdownMenuContentProps) {
  const focusFirstItem = useCallback((element: HTMLDivElement | null) => {
    element
      ?.querySelector<HTMLElement>('[role="menuitem"]:not([data-disabled])')
      ?.focus();
  }, []);
  return (
    <Menu.Portal>
      <Menu.Positioner
        align={align}
        alignOffset={alignOffset}
        className="z-50"
        side={side}
        sideOffset={sideOffset}
      >
        <Menu.Popup
          {...props}
          className={(state) =>
            PopoverStyles.Content({
              isMenu: true,
              className:
                typeof className === "function" ? className(state) : className,
            })
          }
        >
          <div className={DropdownMenuStyles.Content()} ref={focusFirstItem}>
            {children}
          </div>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}

interface DropdownMenuItemProps extends Menu.Item.Props {
  isDanger?: boolean;
}

export function DropdownMenuItem({
  className,
  children,
  isDanger,
  ...props
}: DropdownMenuItemProps) {
  return (
    <Menu.Item
      {...props}
      className={(values) =>
        DropdownMenuStyles.Item({
          isFocused: values.highlighted,
          isDisabled: values.disabled,
          className:
            typeof className === "function" ? className(values) : className,
        })
      }
      data-danger={isDanger}
    >
      {children}
    </Menu.Item>
  );
}

export function DropdownMenuHeader({
  className,
  ...props
}: Menu.GroupLabel.Props) {
  return (
    <Menu.GroupLabel
      {...props}
      className={(state) =>
        DropdownMenuStyles.Header({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
    />
  );
}

export const DropdownMenuGroup = Menu.Group;

export function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">) {
  return (
    <kbd {...props} className={DropdownMenuStyles.Shortcut({ className })} />
  );
}

export function DropdownMenuSeparator({
  className,
  orientation = "horizontal",
  ...props
}: Menu.Separator.Props) {
  return (
    <Menu.Separator
      {...props}
      className={(state) =>
        SeparatorStyles({
          className: [
            "my-1",
            typeof className === "function" ? className(state) : className,
          ],
          orientation,
        })
      }
      orientation={orientation}
    />
  );
}

interface DropdownMenuLabelProps extends React.ComponentProps<"span"> {}

export function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  return <span {...props} data-slot="label" />;
}

export function DropdownMenuDescription(props: DropdownMenuLabelProps) {
  return <span {...props} data-slot="description" />;
}

export function DropdownMenuItemDetails({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div {...props} className={DropdownMenuStyles.ItemDetails({ className })} />
  );
}

export const DropdownMenuSub = Menu.SubmenuRoot;
export const DropdownMenuSubTrigger = Menu.SubmenuTrigger;

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Header: DropdownMenuHeader,
  Group: DropdownMenuGroup,
  Shortcut: DropdownMenuShortcut,
  Separator: DropdownMenuSeparator,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  Label: DropdownMenuLabel,
  Description: DropdownMenuDescription,
  ItemDetails: DropdownMenuItemDetails,
};
