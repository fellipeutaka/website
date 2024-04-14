"use client";

import * as React from "react";
import { cn } from "~/lib/utils";
import { LanguageIcon } from "./mdx/pre";
import { Collapsible } from "./ui/collapsible";
import { Icons } from "./ui/icons";

type FilesProps = React.ComponentPropsWithoutRef<"div">;
type FileProps = {
  name: string;
  icon?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;
type FolderProps = {
  name: string;
  defaultOpen?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

const itemStyles =
  "flex flex-row items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground";

export const Files = (props: FilesProps) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cn("rounded-md border bg-card p-2", className)} {...rest}>
      {children}
    </div>
  );
};

export const File = (props: FileProps) => {
  const { name, className, ...rest } = props;

  return (
    <div className={cn(itemStyles, className)} {...rest}>
      <LanguageIcon className="size-4" lang={name.split(".").pop() || ""} />
      {name}
    </div>
  );
};

export const Folder = (props: FolderProps) => {
  const { children, name, defaultOpen = false, ...rest } = props;
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen} {...rest}>
      <Collapsible.Trigger className={cn(itemStyles, "w-full")}>
        {open ? (
          <Icons.FolderOpen className="size-4" />
        ) : (
          <Icons.Folder className="size-4" />
        )}
        {name}
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="ml-2 flex flex-col border-l pl-2">{children}</div>
      </Collapsible.Content>
    </Collapsible>
  );
};
