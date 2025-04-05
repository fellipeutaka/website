import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";

export const env = createEnv({
  extends: [vercel()],
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    WAKATIME_API_KEY: z.string(),

    GITHUB_TOKEN: z.string().min(1),

    // Feature flags
    AVAILABLE_FOR_WORK: z
      .enum(["true", "false"])
      .transform((s) => s === "true"),
  },
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
});
