"use client";

import { Button, type ButtonProps } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { toast } from "~/components/ui/toast";
import { cx } from "~/lib/cva";

export function PreviewRecursiveButton(props: ButtonProps) {
  function handleClick() {
    toast.warning("You're already here! This is a bit recursive, isn't it?");
  }

  return (
    <Button
      {...props}
      onPress={handleClick}
      variant="outline"
      size="sm"
      className={cx("rounded-full", props.className)}
    >
      <Icons.Eye className="mr-2 size-4" />
      Preview
    </Button>
  );
}
