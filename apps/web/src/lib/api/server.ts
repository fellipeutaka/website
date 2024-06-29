import { createCallerFactory } from "@utaka/api";
import { appRouter } from "@utaka/api/routes";
import { auth } from "@utaka/auth";
import { headers } from "next/headers";

export const serverClient = createCallerFactory(appRouter)(async () => {
  const session = await auth();

  return {
    user: session?.user,
    headers: headers(),
  };
});
