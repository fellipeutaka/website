export type GitCommand = "git" | "gh";

export function convertGitCloneCommand(
  command: string,
): Record<GitCommand, string> {
  if (command.startsWith("git clone")) {
    return {
      git: command,
      gh: command
        .replace("git clone", "gh repo clone")
        .replace("https://github.com/", ""),
    };
  }

  throw new Error("Invalid git clone command");
}

export function isGitCloneCommand(command: string) {
  try {
    convertGitCloneCommand(command);
    return true;
  } catch {
    return false;
  }
}
