import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_GASLESS_SIGNER: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GASLESS_SIGNER: process.env.NEXT_PUBLIC_GASLESS_SIGNER,
  },
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION &&
    process.env.SKIP_ENV_VALIDATION !== "false" &&
    process.env.SKIP_ENV_VALIDATION !== "0",
})
