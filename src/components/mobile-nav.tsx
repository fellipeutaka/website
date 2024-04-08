"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { navLinks } from "~/config/site";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import { Sheet } from "./ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Sheet.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto size-8 rounded-full md:hidden"
        >
          <Icons.Menu className="size-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content className="px-10 pt-4" side="right">
        <div className="flex items-center justify-between">
          <MobileLink href="/" className="block w-max" onOpenChange={setOpen}>
            <Icons.Logo className="size-6" />
          </MobileLink>

          <Sheet.Close asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-full"
            >
              <Icons.X className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </Sheet.Close>
        </div>

        <div className="my-6 flex flex-col gap-3">
          {navLinks.map((item) => (
            <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
              {item.label}
            </MobileLink>
          ))}
        </div>
      </Sheet.Content>
    </Sheet>
  );
}

interface MobileLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  onOpenChange?: (open: boolean) => void;
}

function MobileLink({ href, onOpenChange, ...props }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      {...props}
    />
  );
}
