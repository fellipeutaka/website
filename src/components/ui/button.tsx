import { forwardRef } from "react";

import { tv, type VariantProps } from "tailwind-variants";

export const ButtonStyles = tv({
  base: [
    "inline-flex select-none items-center justify-center rounded-md text-sm font-medium outline-none ring-offset-background transition",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {
    variant: {
      default: ["bg-primary text-primary-foreground", "hover:bg-primary/90"],
      destructive: [
        "bg-destructive text-destructive-foreground",
        "hover:bg-destructive/90",
      ],
      outline: [
        "border border-input bg-background hover:bg-accent",
        "hover:text-accent-foreground",
      ],
      secondary: [
        "bg-secondary text-secondary-foreground",
        "hover:bg-secondary/80",
      ],
      ghost: ["hover:bg-accent hover:text-accent-foreground"],
      link: ["text-primary underline-offset-4", "hover:underline"],
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof ButtonStyles>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", variant, size, ...props }, ref) => {
    return (
      <button
        type={type}
        className={ButtonStyles({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";