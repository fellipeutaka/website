import { env } from "@utaka/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

export async function runMigrate() {
  const _start = Date.now();

  const connection = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(connection);
  await migrate(db, { migrationsFolder: "drizzle" });

  const _end = Date.now();

  process.exit(0);
}

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
