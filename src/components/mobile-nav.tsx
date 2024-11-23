"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Drawer } from "vaul";
import { navLinks } from "~/config/site";
import { cx } from "~/lib/cva";
import { Button } from "./ui/button";
import { DialogStyles } from "./ui/dialog";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
        size="icon"
        className="ml-auto size-8 rounded-full md:hidden"
        aria-label="Toggle Menu"
        onPress={() => setOpen((prev) => !prev)}
      >
        <div
          className={cx(
            "absolute h-0.5 w-3.5 transform-gpu bg-muted-fg transition-transform",
            open ? "translate-y-0 rotate-45" : "-translate-y-1",
          )}
          aria-hidden
        />
        <div
          className={cx(
            "absolute h-0.5 w-3.5 transform-gpu bg-muted-fg transition-transform",
            open ? "-rotate-45 translate-y-0" : "translate-y-1",
          )}
          aria-hidden
        />
      </Button>
      <Drawer.Portal>
        <Drawer.Overlay className={DialogStyles.Overlay()} />
        <Drawer.Content
          aria-describedby={undefined}
          className="data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed inset-y-0 top-16 right-0 z-50 h-full w-3/4 gap-4 border-border border-l bg-bg p-6 shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500 sm:max-w-sm"
        >
          <Drawer.Title className="sr-only">Menu</Drawer.Title>
          <div className="my-6 flex flex-col gap-3">
            {navLinks.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href}
                onOpenChange={setOpen}
              >
                {item.label}
              </MobileLink>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

interface MobileLinkProps extends React.ComponentProps<typeof Link> {
  onOpenChange?: (open: boolean) => void;
}

function MobileLink({ href, onOpenChange, ...props }: MobileLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      className="border-b py-3"
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      {...props}
    />
  );
}
