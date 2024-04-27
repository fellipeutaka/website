import { env } from "@utaka/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

export async function runMigrate() {
  // biome-ignore lint/suspicious/noConsoleLog: This is a CLI script
  console.log("⏳ Running migrations...");

  const start = Date.now();

  const connection = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(connection);
  await migrate(db, { migrationsFolder: "drizzle" });

  const end = Date.now();

  // biome-ignore lint/suspicious/noConsoleLog: This is a CLI script
  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
}

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
