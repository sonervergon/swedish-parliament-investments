import { z } from "zod";

const envSchema = z.object({
  LIST_SOURCE: z.string().optional(),
  DATA_SOURCE: z.string(),
});

export const env = envSchema.parse({
  LIST_SOURCE: process.env.LIST_SOURCE,
  DATA_SOURCE: process.env.DATA_SOURCE,
});
