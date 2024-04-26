"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@utaka/tailwind";
import {
  Button,
  type ButtonProps,
  DropdownMenu,
  type IconProps,
  Icons,
  ScrollArea,
  ScrollBar,
} from "@utaka/ui";
import {
  type PackageManager,
  convertNpmCommand,
  isNpmCommand,
} from "@utaka/utils";
import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard";

interface LanguageIconProps extends IconProps {
  lang: string;
}

export function LanguageIcon({ lang, className, ...props }: LanguageIconProps) {
  switch (lang) {
    case "js": {
      return (
        <Icons.JavaScript className={cn("size-3.5", className)} {...props} />
      );
    }

    case "ts": {
      return (
        <Icons.TypeScript className={cn("size-3.5", className)} {...props} />
      );
    }

    case "jsx":
    case "tsx": {
      return <Icons.React className={cn("size-3.5", className)} {...props} />;
    }

    case "mdx": {
      return <Icons.Mdx className={cn("size-3.5", className)} {...props} />;
    }

    case "bash":
    case "sh":
    case "shell":
    case "zsh": {
      return <Icons.Terminal className={cn("size-3.5", className)} />;
    }

    default: {
      return <Icons.File className={cn("size-3.5", className)} {...props} />;
    }
  }
}

interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {
  "data-lang"?: string;
}

export function Pre(props: PreProps) {
  const { children, className, title, "data-lang": lang, ...rest } = props;

  const textInput = useRef<HTMLPreElement>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (textInput.current) {
      setText(textInput.current.textContent ?? "");
    }
  }, []);

  return (
    <figure className="group relative my-6 max-w-[calc(100vw-4rem)] overflow-hidden rounded-lg border bg-secondary/50 text-sm">
      {title ? (
        <div className="flex flex-row items-center gap-2 border-b bg-muted px-4 py-1.5">
          {lang && (
            <div className="text-muted-foreground">
              <LanguageIcon lang={lang} />
            </div>
          )}
          <figcaption className="flex-1 truncate text-muted-foreground">
            {title}
          </figcaption>
          {isNpmCommand(text) ? (
            <CopyNpmCommand text={text} />
          ) : (
            <CopyButton text={text} />
          )}
        </div>
      ) : isNpmCommand(text) ? (
        <CopyNpmCommand className="absolute top-3 right-4 z-10" text={text} />
      ) : (
        <CopyButton className="absolute top-3 right-4 z-10" text={text} />
      )}

      <ScrollArea>
        <pre ref={textInput} className={cn("py-4", className)} {...rest}>
          {children}
        </pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </figure>
  );
}

interface CopyButtonProps extends ButtonProps {
  text: string;
}

function CopyButton(props: CopyButtonProps) {
  const { text, className, ...rest } = props;
  const [copy, isCopied] = useCopyToClipboard();

  return (
    <Button
      className={cn(
        "size-8 bg-secondary opacity-0 hover:bg-background group-hover:opacity-100",
        className,
      )}
      size="icon"
      variant="outline"
      onClick={() => copy({ text })}
      aria-label="Copy code to clipboard"
      {...rest}
    >
      {isCopied ? (
        <Icons.Check className="size-4" />
      ) : (
        <Icons.Copy className="size-4" />
      )}
    </Button>
  );
}
function CopyNpmCommand(props: CopyButtonProps) {
  const { text, className, ...rest } = props;
  const [copy, isCopied] = useCopyToClipboard();
  const [isOpen, setIsOpen] = useState(false);

  function copyCommand(packageManager: PackageManager) {
    copy({
      text: convertNpmCommand(text)[packageManager],
    });
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <Button
          className={cn(
            "size-8 bg-secondary opacity-0 hover:bg-background group-hover:opacity-100",
            isOpen && "bg-background opacity-100",
            className,
          )}
          size="icon"
          variant="outline"
          aria-label="Copy code to clipboard"
          {...rest}
        >
          {isCopied ? (
            <Icons.Check className="size-4" />
          ) : (
            <Icons.Copy className="size-4" />
          )}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onClick={() => copyCommand("npm")}>
          <Icons.Npm className="mr-2 size-4" />
          npm
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => copyCommand("yarn")}>
          <Icons.Yarn className="mr-2 size-4" />
          yarn
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => copyCommand("pnpm")}>
          <Icons.Pnpm className="mr-2 size-4" />
          pnpm
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => copyCommand("bun")}>
          <Icons.Bun className="mr-2 size-4" />
          bun
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
