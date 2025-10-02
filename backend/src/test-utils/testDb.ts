import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { setDb, getDb } from '../db';
import * as fs from 'fs';
import * as path from 'path';

let testDbPath: string | null = null;
let sqliteInstance: Database.Database | null = null;

/**
 * Get the test database instance
 * Throws error if not initialized
 */
export function getTestDb() {
  const db = getDb();
  if (!db) {
    throw new Error('Test database not initialized. Ensure setupTestDb() is called in beforeAll.');
  }
  return db;
}

/**
 * Setup test database with a unique file
 */
export function setupTestDb() {
  // Create a unique test database file
  const timestamp = Date.now();
  testDbPath = path.join(process.cwd(), `test-${timestamp}.db`);
  
  sqliteInstance = new Database(testDbPath);
  const testDb = drizzle(sqliteInstance);
  
  // Override the global db instance with test db
  setDb(testDb);
  
  return testDb;
}

/**
 * Cleanup test database
 */
export function teardownTestDb() {
  if (sqliteInstance) {
    try {
      sqliteInstance.close();
    } catch (error) {
      console.error('Failed to close test database connection:', error);
    }
    sqliteInstance = null;
  }
  
  // Delete the test database file
  if (testDbPath && fs.existsSync(testDbPath)) {
    try {
      fs.unlinkSync(testDbPath);
    } catch (error) {
      console.error(`Failed to delete test database: ${testDbPath}`, error);
    }
    testDbPath = null;
  }
}

/**
 * Reset test database (cleanup and create new)
 */
export function resetTestDb() {
  teardownTestDb();
  return setupTestDb();
}

