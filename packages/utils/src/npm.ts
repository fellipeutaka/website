export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export function convertNpmCommand(
  command: string,
): Record<PackageManager, string> {
  switch (true) {
    case command === "npm install":
      return {
        npm: command,
        yarn: "yarn",
        pnpm: "pnpm install",
        bun: "bun install",
      };
    case command.startsWith("npm install "):
      return {
        npm: command,
        yarn: command.replace("npm install", "yarn add"),
        pnpm: command.replace("npm install", "pnpm add"),
        bun: command.replace("npm install", "bun add"),
      };
    case command.startsWith("npm run"):
      return {
        npm: command,
        yarn: command.replace("npm run", "yarn run"),
        pnpm: command.replace("npm run", "pnpm run"),
        bun: command.replace("npm run", "bun run"),
      };
    case command.startsWith("npx create-"):
      return {
        npm: command,
        yarn: command.replace("npx create-", "yarn create "),
        pnpm: command.replace("npx create-", "pnpm create "),
        bun: command.replace("npx", "bunx --bun"),
      };
    case command.startsWith("npx"):
      return {
        npm: command,
        yarn: command.replace("npx", "yarn dlx"),
        pnpm: command.replace("npx", "pnpm dlx"),
        bun: command.replace("npx", "bunx --bun"),
      };
    default:
      throw new Error("Invalid npm command");
  }
}

export function isNpmCommand(command: string) {
  try {
    convertNpmCommand(command);
    return true;
  } catch {
    return false;
  }
}
