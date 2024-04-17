import { auth } from "@utaka/auth";
import type { User } from "@utaka/auth";

export const privateAction = async (
  fn: (user: User) => Promise<{ message: string; error?: boolean }>,
): Promise<{ message: string; error?: boolean }> => {
  const session = await auth();

  if (!session?.user) {
    return {
      message: "Unauthorized! Please, sign in first",
      error: true,
    };
  }

  return fn(session.user);
};
