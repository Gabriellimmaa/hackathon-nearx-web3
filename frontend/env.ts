import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_DISCORD_CLIENT_ID: z.string(),
  NEXT_PUBLIC_DISCORD_CLIENT_SECRET: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXTAUTH_SECRET: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error.flatten().fieldErrors);

  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
