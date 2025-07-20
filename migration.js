// src/migrate.ts
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('./imperial.db'); // Same path as in drizzle.config.ts
const db = drizzle(sqlite);

async function runMigrations() {
  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' }); // Path to your migrations folder
    console.log('Migrations complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    sqlite.close(); // Close the database connection
  }
}

runMigrations();