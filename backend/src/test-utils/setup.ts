import './testEnv'; // Load test environment first
import { setupTestDb, teardownTestDb } from './testDb';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as path from 'path';

// Global setup before all tests
beforeAll(async () => {
  // Setup test database
  const db = setupTestDb();
  
  // Run migrations on test database
  const migrationsFolder = path.join(process.cwd(), 'drizzle');
  migrate(db, { migrationsFolder });
});

// Global teardown after all tests
afterAll(async () => {
  teardownTestDb();
});

// Reset database between tests if needed
// Uncomment if you want a fresh database for each test
// beforeEach(async () => {
//   const db = resetTestDb();
//   const migrationsFolder = path.join(process.cwd(), 'drizzle');
//   migrate(db, { migrationsFolder });
// });

