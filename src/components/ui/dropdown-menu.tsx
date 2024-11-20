"use client";

import {
  Header,
  Keyboard,
  Menu,
  MenuItem,
  MenuTrigger,
  Section,
  Separator,
  SubmenuTrigger,
  Text,
} from "react-aria-components";
import { cva } from "~/lib/cva";
import { SeparatorStyles } from "./separator";

const Icons = {
  ChevronRight: (props) => (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  Check: (props) => (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 01-.944.12l-2.75-2.5a.625.625 0 01.841-.925l2.208 2.007 3.849-5.886a.625.625 0 01.865-.181"
        clipRule="evenodd"
      />
    </svg>
  ),
  DotFilled: (props) => (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0"
      />
    </svg>
  ),
} as const satisfies Record<
  string,
  (props: React.ComponentProps<"svg">) => React.JSX.Element
>;

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
      "group relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors [&>svg]:size-4 [&>svg]:shrink-0",
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

export const DropdownMenuRoot = MenuTrigger;

export function DropdownMenuContent<T extends object>({
  className,
  ...props
}: React.ComponentProps<typeof Menu<T>>) {
  return (
    <Menu
      {...props}
      className={DropdownMenuStyles.Content({
        className,
      })}
    />
  );
}

interface DropdownMenuItemProps<T extends object>
  extends React.ComponentProps<typeof MenuItem<T>> {
  isDanger?: boolean;
  type?: "default" | "checkbox" | "radio";
}

export function DropdownMenuItem<T extends object>({
  className,
  children,
  textValue,
  isDanger,
  type = "default",
  ...props
}: DropdownMenuItemProps<T>) {
  const _textValue =
    textValue ?? (typeof children === "string" ? children : undefined);

  return (
    <MenuItem
      {...props}
      data-danger={isDanger}
      textValue={_textValue}
      className={(values) =>
        DropdownMenuStyles.Item({
          isFocused: values.isFocused,
          isDisabled: values.isDisabled,
          type,
          className:
            typeof className === "function" ? className(values) : className,
        })
      }
    >
      {(values) => (
        <>
          {type === "checkbox" && (
            <Icons.Check className={DropdownMenuStyles.CheckboxIcon()} />
          )}
          {type === "radio" && (
            <Icons.DotFilled className={DropdownMenuStyles.CheckboxIcon()} />
          )}
          {typeof children === "function" ? children(values) : children}
          {values.hasSubmenu && (
            <Icons.ChevronRight className="ml-auto size-3.5" />
          )}
        </>
      )}
    </MenuItem>
  );
}

export function DropdownMenuHeader({
  className,
  ...props
}: React.ComponentProps<typeof Header>) {
  return (
    <Header {...props} className={DropdownMenuStyles.Header({ className })} />
  );
}

export const DropdownMenuGroup = Section;

export function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<typeof Keyboard>) {
  return (
    <Keyboard
      {...props}
      className={DropdownMenuStyles.Shortcut({ className })}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      {...props}
      orientation={orientation}
      className={SeparatorStyles({
        className: ["my-1", className],
        orientation,
      })}
    />
  );
}

interface DropdownMenuLabelProps
  extends Omit<React.ComponentProps<typeof Text>, "slot"> {}

export function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  return <Text {...props} slot="label" />;
}

export function DropdownMenuDescription(props: DropdownMenuLabelProps) {
  return <Text {...props} slot="description" />;
}

export function DropdownMenuItemDetails({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div {...props} className={DropdownMenuStyles.ItemDetails({ className })} />
  );
}

export const DropdownMenuSub = SubmenuTrigger;

export const DropdownMenu = Object.assign(
  {},
  {
    Root: DropdownMenuRoot,
    Content: DropdownMenuContent,
    Item: DropdownMenuItem,
    Header: DropdownMenuHeader,
    Group: DropdownMenuGroup,
    Shortcut: DropdownMenuShortcut,
    Separator: DropdownMenuSeparator,
    Sub: DropdownMenuSub,
    Label: DropdownMenuLabel,
    Description: DropdownMenuDescription,
    ItemDetails: DropdownMenuItemDetails,
  },
);