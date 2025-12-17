import { cloneElement, useContext } from "react";
import {
  Dialog as DialogPrimitive,
  type DialogProps,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
  OverlayTriggerStateContext,
} from "react-aria-components";
import { cva, type VariantProps } from "~/lib/cva";
import { ButtonPrimitive } from "./button";

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

export type DialogRootProps = React.ComponentProps<typeof DialogTrigger>;
export const DialogRoot = DialogTrigger;

interface DialogContentProps
  extends Omit<React.ComponentProps<typeof Modal>, "children">,
    Omit<React.ComponentProps<typeof ModalOverlay>, "className">,
    Pick<DialogProps, "role">,
    VariantProps<(typeof DialogStyles)["Overlay"]>,
    VariantProps<(typeof DialogStyles)["Content"]> {}

export function DialogContent({
  className,
  children,
  role = "dialog",
  isDismissable = true,
  isBlurred,
  side = "center",
  ...props
}: DialogContentProps) {
  const _isDismissable = role === "alertdialog" ? false : isDismissable;
  const isSheet = side !== "center";

  return (
    <ModalOverlay
      className={(values) =>
        DialogStyles.Overlay({
          isBlurred,
          isSheet,
          className:
            typeof className === "function" ? className(values) : className,
        })
      }
      isDismissable={_isDismissable}
    >
      <Modal
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
        isDismissable={_isDismissable}
      >
        {(values) => (
          <DialogPrimitive className="outline-hidden" role={role}>
            {typeof children === "function" ? children(values) : children}
          </DialogPrimitive>
        )}
      </Modal>
    </ModalOverlay>
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
}: React.ComponentProps<typeof Heading>) {
  return (
    <Heading
      level={2}
      {...props}
      className={DialogStyles.Title({ className })}
      data-slot="dialog-title"
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof Heading>) {
  return (
    <Heading
      level={3}
      {...props}
      className={DialogStyles.Description({ className })}
    />
  );
}

export interface DialogCloseProps {
  children: React.ReactElement;
  asChild?: boolean;
}

export function DialogClose({ children, asChild, ...props }: DialogCloseProps) {
  const ctx = useContext(OverlayTriggerStateContext);

  if (!ctx) {
    throw new Error("DialogClose must be a descendant of DialogRoot");
  }

  if (asChild) {
    return cloneElement(children, {
      ...props,
      onPress: ctx.close,
    } as React.Attributes);
  }

  return (
    <ButtonPrimitive
      {...props}
      className={DialogStyles.Close()}
      onPress={ctx.close}
    >
      {children}
    </ButtonPrimitive>
  );
}

export const Dialog = {
  Root: DialogRoot,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
};
