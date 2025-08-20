import { z } from 'zod';

const envSchema = z.object({
  VITE_API_HOST: z.url(),
  VITE_REOWN_PROJECT_ID: z.string(),
});

const env = envSchema.safeParse(import.meta.env);

export default env;
