import { z } from "astro/zod";

const parsedEnv = z
  .object({
    HYGRAPH_ENDPOINT: z.string().url(),
  })
  .parse(import.meta.env);

export const env = {
  ...parsedEnv,
  ...import.meta.env,
};
