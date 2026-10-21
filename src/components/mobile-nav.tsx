"use client";

import { Drawer } from "@base-ui/react/drawer";
import Link from "next/link";
import { useState } from "react";

import { navLinks } from "~/config/site";
import { cx } from "~/lib/cva";

import { Button } from "./ui/button";
import { DialogStyles } from "./ui/dialog";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root onOpenChange={setOpen} open={open} swipeDirection="right">
      <Drawer.Trigger
        render={
          <Button
            aria-label="Toggle Menu"
            className="relative ml-auto size-8 rounded-full md:hidden"
            size="icon"
            variant="outline"
          />
        }
      >
        <div
          aria-hidden
          className={cx(
            "absolute h-0.5 w-3.5 transform-gpu bg-muted-fg transition-transform",
            open ? "translate-y-0 rotate-45" : "-translate-y-1"
          )}
        />
        <div
          aria-hidden
          className={cx(
            "absolute h-0.5 w-3.5 transform-gpu bg-muted-fg transition-transform",
            open ? "translate-y-0 -rotate-45" : "translate-y-1"
          )}
        />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className={DialogStyles.Overlay()} />
        <Drawer.Viewport className="pointer-events-none fixed inset-0 z-50">
          <Drawer.Popup
            aria-describedby={undefined}
            className="pointer-events-auto fixed inset-y-0 top-16 right-0 z-50 h-full w-3/4 gap-4 border-l border-border bg-bg p-6 shadow-lg outline-hidden transition-[transform,opacity] duration-500 ease-in-out data-ending-style:translate-x-full data-ending-style:duration-300 data-starting-style:translate-x-full data-swiping:transition-none sm:max-w-sm"
            style={{
              transform: "translateX(var(--drawer-swipe-movement-x, 0px))",
            }}
          >
            <Drawer.Title className="sr-only">Menu</Drawer.Title>
            <div className="my-6 flex flex-col gap-3">
              {navLinks.map((item) => (
                <MobileLink
                  href={item.href}
                  key={item.href}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

interface MobileLinkProps extends React.ComponentProps<typeof Link> {
  onOpenChange?: (open: boolean) => void;
}

function MobileLink({ href, onOpenChange, ...props }: MobileLinkProps) {
  return (
    <Link
      className="border-b py-3"
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      {...props}
    />
  );
}
