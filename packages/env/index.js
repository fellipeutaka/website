import { createEnv } from "@t3-oss/env-nextjs";
import { createEnvOptions } from "./schema.js";

export const env = createEnv(createEnvOptions);
