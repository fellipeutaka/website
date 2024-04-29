"use client";

import { forwardRef } from "react";

import { Indicator, Root } from "@radix-ui/react-checkbox";
import { cn, tv } from "@utaka/tailwind";
import { Icons } from "./icons";

export const CheckboxStyles = {
  Root: tv({
    base: [
      "flex aspect-square w-5 appearance-none items-center justify-center rounded-sm border border-input text-primary-foreground shadow outline-none transition",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
      "focus-visible:ring-2 focus-visible:ring-input focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    ],
  }),
};

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof Root> {
  iconClassName?: string;
}

export const Checkbox = forwardRef<
  React.ElementRef<typeof Root>,
  CheckboxProps
>(({ className, iconClassName, ...props }, ref) => (
  <Root ref={ref} className={CheckboxStyles.Root({ className })} {...props}>
    <Indicator className="flex items-center justify-center text-current">
      <Icons.Check className={cn("size-4", iconClassName)} />
    </Indicator>
  </Root>
));
Checkbox.displayName = "Checkbox";
