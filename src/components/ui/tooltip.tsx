"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cva } from "~/lib/cva";
import type { VariantProps } from "~/lib/cva";

export const TooltipStyles = cva({
  base: [
    "group rounded-lg border px-3 py-1.5 text-sm will-change-transform dark:shadow-none [&_strong]:font-medium",
    "entering:placement-top:slide-in-from-bottom-2 entering:placement-bottom:slide-in-from-top-2 entering:placement-left:slide-in-from-right-2 entering:placement-right:slide-in-from-left-2",

    "entering:animate-in entering:fade-in",
    "exiting:animate-out exiting:fade-out",
  ],
  variants: {
    intent: {
      default: [
        "bg-popover text-popover-fg [&_.arx]:fill-popover [&_.arx]:stroke-border",
      ],
      inverse: [
        "bg-dark text-light dark:bg-light dark:text-dark [&_.arx]:fill-dark dark:[&_.arx]:fill-light border-transparent [&_.arx]:stroke-transparent",
      ],
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps
  extends
    TooltipPrimitive.Popup.Props,
    Pick<TooltipPrimitive.Positioner.Props, "side" | "align" | "sideOffset">,
    VariantProps<typeof TooltipStyles> {}

export function TooltipContent({
  className,
  intent = "default",
  sideOffset = 10,
  side = "top",
  align = "center",
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        className="z-50"
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          {...props}
          className={(values) =>
            TooltipStyles({
              intent,
              className:
                typeof className === "function" ? className(values) : className,
            })
          }
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export function TooltipArrow({ ...props }: TooltipPrimitive.Arrow.Props) {
  return (
    <TooltipPrimitive.Arrow {...props}>
      <svg
        aria-hidden="true"
        className="arx forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder] group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90"
        height={12}
        viewBox="0 0 12 12"
        width={12}
      >
        <path d="M0 0 L6 6 L12 0" />
      </svg>
    </TooltipPrimitive.Arrow>
  );
}

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
};
