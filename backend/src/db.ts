import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

type DrizzleDb = ReturnType<typeof drizzle>;

let dbInstance: DrizzleDb | null = null;
let sqliteInstance: Database.Database | null = null;

/**
 * Initialize database connection
 * @param dbPath Optional database path (defaults based on NODE_ENV)
 */
export function initializeDb(dbPath?: string): DrizzleDb {
  // In test mode, wait for test setup to call setDb() instead of auto-initializing
  if (process.env.NODE_ENV === 'test' && !dbPath) {
    throw new Error('Test database must be initialized via setDb() in test setup');
  }
  
  const path = dbPath || './imperial.db';
  sqliteInstance = new Database(path);
  dbInstance = drizzle(sqliteInstance);
  return dbInstance;
}

/**
 * Get database instance (creates if not exists in non-test environments)
 */
export function getDb(): DrizzleDb {
  if (!dbInstance) {
    if (process.env.NODE_ENV === 'test') {
      throw new Error('Test database not initialized. Call setupTestDb() in beforeAll hook.');
    }
    return initializeDb();
  }
  return dbInstance;
}

/**
 * Override database instance (primarily for testing)
 * @param db Database instance to use
 */
export function setDb(db: DrizzleDb): void {
  dbInstance = db;
}

/**
 * Get the underlying SQLite connection
 */
export function getSqliteConnection(): Database.Database | null {
  return sqliteInstance;
}

/**
 * Close database connection
 */
export function closeDb(): void {
  if (sqliteInstance) {
    sqliteInstance.close();
    sqliteInstance = null;
    dbInstance = null;
  }
}

/**
 * Main database export with lazy initialization
 * Uses Proxy to ensure db is initialized on first access
 */
export const db = new Proxy({} as DrizzleDb, {
  get: (target, prop) => {
    const instance = getDb();
    const value = instance[prop as keyof DrizzleDb];
    
    // Bind methods to the instance
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    
    return value;
  }
});
