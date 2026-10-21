"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cva } from '~/lib/cva';
import type { VariantProps } from '~/lib/cva';

export const DialogStyles = {
  Overlay: cva({
    base: [
      "fixed inset-0 z-50",
      "entering:fade-in-0 entering:animate-in",
      "exiting:fade-out-0 exiting:animate-out",
    ],
    variants: {
      isBlurred: {
        true: ["backdrop-blur-sm"],
        false: ["bg-black/15 dark:bg-black/60"],
      },
      isSheet: {
        true: ["entering:duration-500", "exiting:duration-300"],
      },
    },
    defaultVariants: {
      isBlurred: false,
    },
  }),
  Content: cva({
    base: [
      "fixed z-50 w-full bg-bg p-6 shadow-lg outline-hidden",
      "entering:fade-in-0 entering:animate-in",
      "exiting:fade-out-0 exiting:animate-out",
      "sm:rounded-lg",
    ],
    variants: {
      side: {
        top: [
          "inset-x-0 top-0 left-0 border-b entering:duration-500",
          "entering:slide-in-from-top",
          "exiting:slide-out-to-top exiting:duration-300",
        ],
        bottom: [
          "inset-x-0 bottom-0 border-t ease-in-out",
          "entering:slide-in-from-bottom",
          "exiting:slide-out-to-bottom",
        ],
        left: [
          "inset-y-0 left-0 h-full w-3/4 border-r ease-in-out sm:max-w-sm",
          "entering:slide-in-from-left",
          "exiting:slide-out-to-left",
        ],
        right: [
          "inset-y-0 right-0 h-full w-3/4 border-l ease-in-out sm:max-w-sm",
          "entering:slide-in-from-right",
          "exiting:slide-out-to-right",
        ],
        center: [
          "top-1/2 left-1/2 grid max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border",
          "entering:slide-in-from-left-1/2 entering:slide-in-from-top-1/2 entering:zoom-in-95",
          "exiting:slide-out-to-left-1/2 exiting:slide-out-to-top-1/2 exiting:zoom-out-95",
        ],
      },
      isSheet: {
        true: ["entering:duration-500", "exiting:duration-300"],
      },
    },
    defaultVariants: {
      side: "center",
    },
  }),
  Close: cva({
    base: [
      "absolute top-4 right-4 size-4 rounded-sm opacity-70 outline-hidden ring-offset-bg transition",
      "hover:opacity-100",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none",
    ],
  }),
  Header: cva({
    base: ["flex flex-col space-y-1.5 text-center", "sm:text-left"],
  }),
  Footer: cva({
    base: ["flex flex-col-reverse", "sm:flex-row sm:justify-end sm:space-x-2"],
  }),
  Title: cva({
    base: ["font-semibold text-lg leading-none tracking-tight"],
  }),
  Description: cva({
    base: ["text-muted-fg text-sm"],
  }),
};

export type DialogRootProps = DialogPrimitive.Root.Props;
export const DialogRoot = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

interface DialogContentProps
  extends DialogPrimitive.Popup.Props,
    VariantProps<(typeof DialogStyles)["Overlay"]>,
    VariantProps<(typeof DialogStyles)["Content"]> {}

export function DialogContent({
  className,
  children,
  isBlurred,
  side = "center",
  ...props
}: DialogContentProps) {
  const isSheet = side !== "center";

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        className={DialogStyles.Overlay({ isBlurred, isSheet })}
      />
      <DialogPrimitive.Popup
        {...props}
        className={(values) =>
          DialogStyles.Content({
            side,
            isSheet,
            className:
              typeof className === "function" ? className(values) : className,
          })
        }
        data-side={side}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      {...props}
      className={DialogStyles.Header({ className })}
      data-slot="dialog-header"
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return <footer {...props} className={DialogStyles.Footer({ className })} />;
}

export function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      {...props}
      className={(state) =>
        DialogStyles.Title({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
      data-slot="dialog-title"
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      {...props}
      className={(state) =>
        DialogStyles.Description({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
    />
  );
}

export type DialogCloseProps = DialogPrimitive.Close.Props;

export function DialogClose({ className, ...props }: DialogCloseProps) {
  return (
    <DialogPrimitive.Close
      {...props}
      className={(state) =>
        DialogStyles.Close({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
    />
  );
}

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
};
