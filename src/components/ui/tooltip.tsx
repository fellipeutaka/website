"use client";

import {
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  type TooltipProps as TooltipPrimitiveProps,
  TooltipTrigger,
} from "react-aria-components";
import { cva, type VariantProps } from "~/lib/cva";

export const TooltipStyles = cva({
  base: [
    "group rounded-lg border px-3 py-1.5 text-sm will-change-transform dark:shadow-none [&_strong]:font-medium",
    "entering:placement-left:slide-in-from-right-2 entering:placement-right:slide-in-from-left-2 entering:placement-top:slide-in-from-bottom-2 entering:placement-bottom:slide-in-from-top-2",

    "entering:fade-in entering:animate-in",
    "exiting:fade-out exiting:animate-out",
  ],
  variants: {
    intent: {
      default: [
        "bg-popover text-popover-fg [&_.arx]:fill-popover [&_.arx]:stroke-border",
      ],
      inverse: [
        "border-transparent bg-dark text-light dark:bg-light dark:text-dark [&_.arx]:fill-dark [&_.arx]:stroke-transparent dark:[&_.arx]:fill-light",
      ],
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

export const TooltipRoot = TooltipTrigger;

export interface TooltipContentProps
  extends TooltipPrimitiveProps,
    VariantProps<typeof TooltipStyles> {}

export function TooltipContent({
  className,
  intent = "default",
  offset = 10,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive
      {...props}
      className={(values) =>
        TooltipStyles({
          intent,
          className:
            typeof className === "function" ? className(values) : className,
        })
      }
      offset={offset}
    />
  );
}

export function TooltipArrow({
  className,
  ...props
}: React.ComponentProps<typeof OverlayArrow>) {
  return (
    <OverlayArrow {...props}>
      <svg
        aria-hidden="true"
        className="arx group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
        height={12}
        viewBox="0 0 12 12"
        width={12}
      >
        <path d="M0 0 L6 6 L12 0" />
      </svg>
    </OverlayArrow>
  );
}

export const Tooltip = {
  Root: TooltipRoot,
  Content: TooltipContent,
  Arrow: TooltipArrow,
};
