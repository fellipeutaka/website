export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export function isNpmCommand(command: string) {
  const validSyntax = ["npm install", "npm run", "npx create-", "npx"];

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
  if (command.startsWith("npm run")) {
    return {
      npm: command,
      yarn: command.replace("npm run", "yarn run"),
      pnpm: command.replace("npm run", "pnpm run"),
      bun: command.replace("npm run", "bun run"),
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
