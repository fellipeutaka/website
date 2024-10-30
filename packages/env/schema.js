import { z } from "zod";

export const createEnvOptions = {
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    DATABASE_URL: z.string().url(),

    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

    AUTH_SECRET: z.string().min(1),

    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),

    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),

    WAKATIME_API_KEY: z.string(),

    GITHUB_TOKEN: z.string().min(1),

    // Feature flags
    AVAILABLE_FOR_WORK: z
      .string()
      .default("true")
      // only allow "true" or "false"
      .refine((s) => s === "true" || s === "false")
      // transform to boolean
      .transform((s) => s === "true"),
  },
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
};
