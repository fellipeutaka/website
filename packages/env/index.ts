import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    WAKATIME_API_KEY: z.string(),
  },
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
});
