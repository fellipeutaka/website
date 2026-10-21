"use client";

import { useState } from "react";
import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard";
import { cx } from "~/lib/cva";
import { Button } from '../ui/button';
import type { ButtonProps } from '../ui/button';
import { DropdownMenu } from "../ui/dropdown-menu";
import { Icons } from "../ui/icons";
import type { NpmCommands } from "./pre";

export interface CopyButtonProps extends ButtonProps {
  text: string;
}

export function CopyButton({ text, className, ...props }: CopyButtonProps) {
  const [copy, isCopied] = useCopyToClipboard();

  return (
    <Button
      aria-label="Copy code to clipboard"
      className={cx(
        "size-8 bg-secondary opacity-0 hover:bg-bg focus-visible:opacity-100 group-hover:opacity-100",
        className
      )}
      onClick={() => { void copy({ text }); }}
      size="icon"
      variant="outline"
      {...props}
    >
      <Icons.Copy
        className="absolute size-4 scale-100 transition-transform data-[visible='true']:scale-0"
        data-visible={isCopied}
      />
      <Icons.Check
        className="size-4 transition-transform data-[visible='false']:scale-0"
        data-visible={isCopied}
      />
    </Button>
  );
}

export interface CopyNpmButtonProps extends ButtonProps {
  commands: NonNullable<NpmCommands>;
}

export function CopyNpmButton({
  commands,
  className,
  ...props
}: CopyNpmButtonProps) {
  const [copy, isCopied] = useCopyToClipboard();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenu.Trigger
        render={
          <Button
            aria-label="Copy code to clipboard"
            className={cx(
              "size-8 bg-secondary hover:bg-bg focus-visible:opacity-100 group-hover:opacity-100 [@media(pointer:fine)]:opacity-0",
              isOpen && "bg-bg opacity-100!",
              className
            )}
            size="icon"
            variant="outline"
            {...props}
          />
        }
      >
        <Icons.Copy
          className="absolute size-4 scale-100 transition-transform data-[visible='true']:scale-0"
          data-visible={isCopied}
        />
        <Icons.Check
          className="size-4 transition-transform data-[visible='false']:scale-0"
          data-visible={isCopied}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end" className="min-w-32">
        <DropdownMenu.Item onClick={() => { void copy({ text: commands.npm }); }}>
          <Icons.Npm aria-hidden="true" className="mr-2 size-4" />
          npm
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => { void copy({ text: commands.yarn }); }}>
          <Icons.Yarn aria-hidden="true" className="mr-2 size-4" />
          yarn
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => { void copy({ text: commands.pnpm }); }}>
          <Icons.Pnpm aria-hidden="true" className="mr-2 size-4" />
          pnpm
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => { void copy({ text: commands.bun }); }}>
          <Icons.Bun aria-hidden="true" className="mr-2 size-4" />
          bun
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
