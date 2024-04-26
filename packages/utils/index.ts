export function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export function isNpmCommand(command: string) {
  const validSyntax = ["npm install", "npx create-", "npx"];

  return validSyntax.some((syntax) => command.startsWith(syntax));
}

export function convertNpmCommand(
  command: string,
): Record<PackageManager, string> {
  if (command.startsWith("npm install")) {
    return {
      npm: command,
      yarn: command.replace("npm install", "yarn add"),
      pnpm: command.replace("npm install", "pnpm add"),
      bun: command.replace("npm install", "bun add"),
    };
  }
  if (command.startsWith("npx create-")) {
    return {
      npm: command,
      yarn: command.replace("npx create-", "yarn create "),
      pnpm: command.replace("npx create-", "pnpm create "),
      bun: command.replace("npx", "bunx --bun"),
    };
  }
  if (command.startsWith("npx")) {
    return {
      npm: command,
      yarn: command.replace("npx", "yarn dlx"),
      pnpm: command.replace("npx", "pnpm dlx"),
      bun: command.replace("npx", "bunx --bun"),
    };
  }

  throw new Error("Invalid command");
}

export function getUserInitials(name?: string | null) {
  if (!name) return "";

  const initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return initials;
}

const formatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export function formatUpvotes(value: number) {
  return formatter.format(value);
}

export * from "./ulid";
