import { cn } from "~/lib/cva";
import { Icons } from '../ui/icons';
import type { IconProps } from '../ui/icons';

const titleMap = new Map([
  ["tailwind.config.{js,cjs,mjs,ts}", Icons.TailwindCSS],
  ["next.config.{js,cjs,mjs,ts}", Icons.NextJS],
  ["package.json", Icons.Node],
]);

const extensionMap = new Map([
  ["cjs", Icons.JavaScript],
  ["js", Icons.JavaScript],
  ["ts", Icons.TypeScript],
  ["jsx", Icons.React],
  ["tsx", Icons.React],
  ["mdx", Icons.Mdx],
  ["bash", Icons.Terminal],
  ["sh", Icons.Terminal],
  ["shell", Icons.Terminal],
  ["zsh", Icons.Terminal],
]);

function convertPatternToRegex(pattern: string): string {
  return pattern.replaceAll(
    /\{(?<extensions>[^}]+)\}/gu,
    (_: string, group: string) => `(${group.replaceAll(',', "|")})`
  );
}

function getIconByTitle(title: string) {
  for (const [pattern, icon] of titleMap) {
    const regexPattern = convertPatternToRegex(pattern);
    const regex = new RegExp(`^${regexPattern}$`, "u");
    if (regex.test(title)) {
      return icon;
    }
  }
  return null;
}

interface LanguageIconProps extends IconProps {
  language: string;
  title: string;
}

export function LanguageIcon({
  title,
  language,
  className,
  ...props
}: LanguageIconProps) {
  const IconComponent =
    getIconByTitle(title) ?? extensionMap.get(language) ?? Icons.File;

  // oxlint-disable-next-line react/static-components -- Lookup returns existing module-level icon components.
  return <IconComponent className={cn("size-3.5", className)} {...props} />;
}
