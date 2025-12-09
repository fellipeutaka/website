"use client";

import { Button, type ButtonProps } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { toast } from "sonner";
import { cx } from "~/lib/cva";

export function PreviewRecursiveButton(props: ButtonProps) {
  function handleClick() {
    toast.warning("You're already here! This is a bit recursive, isn't it?");
  }

  return (
    <Button
      {...props}
      className={cx("rounded-full", props.className)}
      onPress={handleClick}
      size="sm"
      variant="outline"
    >
      <Icons.Eye className="size-4" />
      Preview
    </Button>
  );
}
