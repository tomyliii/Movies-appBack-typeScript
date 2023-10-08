import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const schema = z.object({
  PORT: z.string(),
  NODE_ENV: z
    .string()
    .refine((value) => value === "developement" || value === "production", {
      message: 'node_env must be "developement" or "prodution"',
    }),
});

export const envVariable = schema.parse(process.env);
