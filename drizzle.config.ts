import type { Config } from "drizzle-kit";

try {
  process.loadEnvFile(".env.local");
} catch {
  console.warn("Warning: .env.local file was not found");
}

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

export default {
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL },
  casing: "snake_case",
} satisfies Config;
