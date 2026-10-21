"use client";

import { Button } from "~/components/ui/button";
import type { ButtonProps } from "~/components/ui/button";
import { Icons } from "~/components/ui/icons";
import { toast } from "~/components/ui/toast";
import { cx } from "~/lib/cva";

function handleClick() {
  toast.warning("You're already here! This is a bit recursive, isn't it?");
}

export function PreviewRecursiveButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className={cx("rounded-full", props.className)}
      onClick={handleClick}
      size="sm"
      variant="outline"
    >
      <Icons.Eye className="mr-2 size-4" />
      Preview
    </Button>
  );
}
