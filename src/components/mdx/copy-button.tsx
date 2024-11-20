"use client";

import { useState } from "react";
import type { NpmCommands } from "~/@types/unist";
import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard";
import { cx } from "~/lib/cva";
import { Button, type ButtonProps } from "../ui/button";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Icons } from "../ui/icons";
import { Popover } from "../ui/popover";

export interface CopyButtonProps extends ButtonProps {
  text: string;
}

export function CopyButton({ text, className, ...props }: CopyButtonProps) {
  const [copy, isCopied] = useCopyToClipboard();

  return (
    <Button
      className={cx(
        "size-8 bg-secondary hover:bg-bg focus-visible:opacity-100 group-hover:opacity-100 [@media(pointer:fine)]:opacity-0",
        className,
      )}
      size="icon"
      variant="outline"
      onPress={() => copy({ text })}
      aria-label="Copy code to clipboard"
      {...props}
    >
      <Icons.Copy
        data-visible={isCopied}
        className="absolute size-4 scale-100 transition-transform data-[visible='true']:scale-0"
      />
      <Icons.Check
        data-visible={isCopied}
        className="size-4 transition-transform data-[visible='false']:scale-0"
      />
    </Button>
  );
}

export interface CopyNpmButtonProps extends ButtonProps {
  commands: Required<NpmCommands>;
}

export function CopyNpmButton({
  commands,
  className,
  ...props
}: CopyNpmButtonProps) {
  const [copy, isCopied] = useCopyToClipboard();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        className={cx(
          "size-8 bg-secondary hover:bg-bg focus-visible:opacity-100 group-hover:opacity-100 [@media(pointer:fine)]:opacity-0",
          isOpen && "!opacity-100 bg-bg",
          className,
        )}
        size="icon"
        variant="outline"
        aria-label="Copy code to clipboard"
        {...props}
      >
        <Icons.Copy
          data-visible={isCopied}
          className="absolute size-4 scale-100 transition-transform data-[visible='true']:scale-0"
        />
        <Icons.Check
          data-visible={isCopied}
          className="size-4 transition-transform data-[visible='false']:scale-0"
        />
      </Button>

      <Popover.Content className="min-w-32" placement="bottom end">
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onAction={() => copy({ text: commands.__npmCommand__ })}
          >
            <Icons.Npm className="mr-2 size-4" />
            npm
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onAction={() => copy({ text: commands.__yarnCommand__ })}
          >
            <Icons.Yarn className="mr-2 size-4" />
            yarn
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onAction={() => copy({ text: commands.__pnpmCommand__ })}
          >
            <Icons.Pnpm className="mr-2 size-4" />
            pnpm
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onAction={() => copy({ text: commands.__bunCommand__ })}
          >
            <Icons.Bun className="mr-2 size-4" />
            bun
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </Popover.Content>
    </DropdownMenu.Root>
  );
}
