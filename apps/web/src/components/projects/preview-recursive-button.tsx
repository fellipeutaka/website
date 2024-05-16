"use client";

import { cn } from "@utaka/tailwind";
import { Button, type ButtonProps } from "@utaka/ui/button";
import { Icons } from "@utaka/ui/icons";
import { toast } from "@utaka/ui/toast";

export function PreviewRecursiveButton(props: ButtonProps) {
  function handleClick() {
    toast.warning("You're already here! This is a bit recursive, isn't it?");
  }

  return (
    <Button
      {...props}
      onClick={handleClick}
      variant="outline"
      size="sm"
      className={cn("rounded-full", props.className)}
    >
      <Icons.Eye className="mr-2 size-4" />
      Preview
    </Button>
  );
}
