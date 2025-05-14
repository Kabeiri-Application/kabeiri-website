import type { Config } from "drizzle-kit";

import { env } from "./src/env";

export default {
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL },
  casing: "snake_case",
} satisfies Config;
