"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { cva } from "~/lib/cva";

const { Root, Scrollbar, Thumb, Viewport, Content } = ScrollAreaPrimitive;

export const ScrollAreaStyles = {
  Root: cva({
    base: ["relative overflow-hidden"],
  }),
  Viewport: cva({
    base: ["size-full rounded-[inherit]"],
  }),
  Scrollbar: cva({
    base: [
      "flex touch-none opacity-0 transition-[opacity,color] select-none data-hovering:opacity-100",
    ],
    variants: {
      orientation: {
        vertical: ["h-full w-2.5 border-l border-l-transparent p-px"],
        horizontal: ["h-2.5 flex-col border-t border-t-transparent p-px"],
      },
    },
  }),
  Thumb: cva({
    base: ["relative flex-1 rounded-full bg-border"],
  }),
};

export type ScrollAreaRootProps = React.ComponentProps<typeof Root>;

export function ScrollAreaRoot({ className, ...props }: ScrollAreaRootProps) {
  return (
    <Root
      {...props}
      className={(state) =>
        ScrollAreaStyles.Root({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
    />
  );
}

export type ScrollAreaViewportProps = React.ComponentProps<typeof Viewport>;

export function ScrollAreaViewport({
  className,
  children,
  ...props
}: ScrollAreaViewportProps) {
  return (
    <Viewport
      {...props}
      className={(state) =>
        ScrollAreaStyles.Viewport({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
    >
      <Content>{children}</Content>
    </Viewport>
  );
}

export interface ScrollAreaScrollbarProps extends React.ComponentProps<
  typeof Scrollbar
> {
  orientation: "vertical" | "horizontal";
}

export function ScrollAreaScrollbar({
  className,
  orientation,
  ...props
}: ScrollAreaScrollbarProps) {
  return (
    <Scrollbar
      {...props}
      className={(state) =>
        ScrollAreaStyles.Scrollbar({
          className:
            typeof className === "function" ? className(state) : className,
          orientation,
        })
      }
      orientation={orientation}
    />
  );
}

export type ScrollAreaThumbProps = React.ComponentProps<typeof Thumb>;

export function ScrollAreaThumb({ className, ...props }: ScrollAreaThumbProps) {
  return (
    <Thumb
      {...props}
      className={(state) =>
        ScrollAreaStyles.Thumb({
          className:
            typeof className === "function" ? className(state) : className,
        })
      }
    />
  );
}

export const ScrollArea = {
  Root: ScrollAreaRoot,
  Viewport: ScrollAreaViewport,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
};
