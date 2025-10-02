# Backend Testing Guide

## Quick Start

```bash
# Run all tests
yarn test

# Watch mode (auto-rerun on changes)
yarn test:watch

# With coverage report
yarn test:coverage
```

## Writing Your First Test

```typescript
// src/feat/auth/auth.test.ts
import request from 'supertest';
import { createTestApp, getTestDb } from '../../test-utils';

describe('Auth API', () => {
  let app: ReturnType<typeof createTestApp>;
  let db: ReturnType<typeof getTestDb>;

  beforeAll(() => {
    app = createTestApp();
    db = getTestDb();
  });

  beforeEach(async () => {
    // Clean data between tests
    await db.delete(users);
  });

  it('should signup a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'Password123' })
      .expect(201);

    expect(response.body.data.token).toBeDefined();
  });
});
```

## Database Factory Pattern

### Why No Mocking?

The backend uses a **Database Factory Pattern** instead of Jest mocks. This approach:

- ✅ **Clean**: Explicit `setDb()` call instead of mock magic
- ✅ **Type-Safe**: No `any` types or type gymnastics
- ✅ **Framework-Agnostic**: Works with Jest, Vitest, Node test runner
- ✅ **Maintainable**: Easy to understand and debug

### How It Works

**Production Code:**
```typescript
import { db } from './db';

export class UserService {
  async findUser(email: string) {
    return await db.select().from(users).where(eq(users.email, email));
  }
}
```

**Test Setup (automatic via `src/test-utils/setup.ts`):**
```typescript
beforeAll(() => {
  const testDb = setupTestDb();  // Creates unique test DB
  setDb(testDb);                 // Overrides global db instance
  migrate(testDb, { ... });      // Runs migrations
});

afterAll(() => {
  teardownTestDb();              // Cleanup
});
```

**Your Test:**
```typescript
beforeAll(() => {
  db = getTestDb();  // Gets the injected test database
});
```

### Database Factory API

```typescript
// src/db.ts exports:
export function getDb(): DrizzleDb           // Get current instance
export function setDb(db: DrizzleDb): void   // Override (testing only)
export function closeDb(): void              // Close connection

// src/test-utils/testDb.ts exports:
export function setupTestDb()    // Create test DB (auto-called)
export function getTestDb()      // Get test DB instance
export function teardownTestDb() // Cleanup (auto-called)
export function resetTestDb()    // Reset between tests if needed
```

## Test Utilities

### `createTestApp()`

Creates Express app without starting server (for Supertest):

```typescript
const app = createTestApp();

const response = await request(app)
  .post('/api/endpoint')
  .send({ data: 'test' })
  .expect(200);
```

### `getTestDb()`

Access test database instance:

```typescript
const db = getTestDb();

await db.insert(users).values({ email: 'test@example.com', password: 'hash' });
const result = await db.select().from(users);
```

## Common Patterns

### API Endpoint Testing

```typescript
describe('POST /api/auth/login', () => {
  const app = createTestApp();

  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'Password123' })
      .expect(200);

    expect(response.body.data.token).toBeDefined();
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrong' })
      .expect(401);

    expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
  });
});
```

### Database Testing

```typescript
describe('User Repository', () => {
  let db: ReturnType<typeof getTestDb>;

  beforeAll(() => {
    db = getTestDb();
  });

  beforeEach(async () => {
    await db.delete(users);  // Clean between tests
  });

  it('should create user', async () => {
    const [user] = await db.insert(users).values({
      email: 'test@example.com',
      password: 'hashed',
      createdAt: new Date()
    }).returning();

    expect(user.email).toBe('test@example.com');
  });
});
```

### Authentication Testing

```typescript
it('should access protected route with token', async () => {
  // Setup: Create user and get token
  const signupRes = await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@example.com', password: 'Password123' });

  const cookies = signupRes.headers['set-cookie'] as string[];

  // Test: Access protected route
  const response = await request(app)
    .get('/api/protected')
    .set('Cookie', cookies)
    .expect(200);
});
```

### Integration Testing

```typescript
it('should complete full user flow', async () => {
  const app = createTestApp();
  const db = getTestDb();

  // 1. Signup
  const signupRes = await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@example.com', password: 'Password123' })
    .expect(201);

  // 2. Verify in database
  const [user] = await db.select().from(users)
    .where(eq(users.email, 'test@example.com'));
  expect(user).toBeDefined();

  // 3. Login
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'Password123' })
    .expect(200);

  expect(loginRes.body.data.token).toBeDefined();
});
```

## Best Practices

### 1. Structure Tests Properly

```typescript
describe('Feature Name', () => {
  let app: ReturnType<typeof createTestApp>;
  let db: ReturnType<typeof getTestDb>;

  beforeAll(() => {
    app = createTestApp();
    db = getTestDb();
  });

  beforeEach(async () => {
    // Clean data between tests
    await db.delete(table);
  });

  describe('Specific Endpoint/Function', () => {
    it('should handle success case', async () => {
      // Arrange - setup test data
      // Act - perform action
      // Assert - verify results
    });

    it('should handle error case', async () => {
      // Test error scenarios
    });
  });
});
```

### 2. Clean Data Between Tests

```typescript
beforeEach(async () => {
  // Delete in correct order (foreign keys)
  await db.delete(refreshTokens);
  await db.delete(users);
});
```

### 3. Test Real Scenarios

❌ **Bad**: Testing isolated functions
```typescript
it('should validate email', () => {
  expect(isValidEmail('test@test.com')).toBe(true);
});
```

✅ **Good**: Testing actual user workflows
```typescript
it('should reject signup with invalid email', async () => {
  const response = await request(app)
    .post('/api/auth/signup')
    .send({ email: 'not-an-email', password: 'Password123' })
    .expect(400);

  expect(response.body.error.code).toBe('INVALID_PAYLOAD');
});
```

### 4. Use Descriptive Test Names

❌ **Bad**: `it('should work', ...)`  
✅ **Good**: `it('should reject duplicate email with 409 status', ...)`

### 5. Mock External Services

```typescript
// Mock OpenAI API calls
jest.mock('@langchain/openai', () => ({
  ChatOpenAI: jest.fn().mockImplementation(() => ({
    invoke: jest.fn().mockResolvedValue({ content: 'mocked response' })
  }))
}));
```

## Test Organization

Place tests next to the code they test:

```
src/
├── feat/
│   └── auth/
│       ├── auth.route.ts
│       ├── auth.controller.ts
│       ├── auth.service.ts
│       └── auth.test.ts          ← Tests here
└── test-utils/
    ├── setup.ts                   ← Global setup
    ├── testDb.ts                  ← Database utilities
    ├── testApp.ts                 ← App factory
    └── index.ts                   ← Exports
```

## Configuration

### `jest.config.js`
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/test-utils/']
};
```

### `package.json` Scripts
```json
{
  "scripts": {
    "test": "cross-env NODE_ENV=test jest",
    "test:watch": "cross-env NODE_ENV=test jest --watch",
    "test:coverage": "cross-env NODE_ENV=test jest --coverage"
  }
}
```

## Troubleshooting

### Database Not Initialized Error

**Error**: `Test database not initialized. Call setupTestDb() in beforeAll hook.`

**Solution**: Move `getTestDb()` call to `beforeAll()` hook:

```typescript
// ❌ Wrong
const db = getTestDb();  // Module-level - runs before setup

// ✅ Correct
let db: ReturnType<typeof getTestDb>;
beforeAll(() => {
  db = getTestDb();  // Runs after setup
});
```

### Tests Failing After DB Changes

**Solution**: Ensure migrations are up to date:
```bash
yarn migrate          # Run migrations on dev DB
yarn test            # Test DB auto-runs migrations
```

### Port Already in Use

This shouldn't happen (Supertest doesn't bind ports), but if it does:
- Check no `app.listen()` in test code
- Ensure using `createTestApp()` not importing production server

### Database Locked

**Solution**: Clean up old test databases:
```bash
cd backend
rm -f test-*.db
```

## Example: Complete Auth Test Suite

See `src/feat/auth/auth.test.ts` for a comprehensive example with:
- 27 passing tests
- Signup, login, token refresh, logout flows
- Validation testing
- Error handling
- Integration tests
- 90%+ code coverage

## Architecture Summary

```
┌─────────────────────────────────────────────┐
│  Test Suite (auth.test.ts)                  │
├─────────────────────────────────────────────┤
│  beforeAll: app = createTestApp()           │
│             db = getTestDb()                 │
│                                              │
│  test 1: request(app).post(...)             │
│  test 2: db.insert(...)                     │
│  test 3: integration test                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Global Setup (test-utils/setup.ts)         │
├─────────────────────────────────────────────┤
│  beforeAll: setupTestDb() → creates DB      │
│             setDb(testDb)  → overrides db   │
│             migrate()      → runs migrations │
│                                              │
│  afterAll:  teardownTestDb() → cleanup      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Database Factory (db.ts)                   │
├─────────────────────────────────────────────┤
│  setDb(testDb) → overrides dbInstance       │
│  db (Proxy)    → routes to test DB          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Application Code (unchanged)               │
├─────────────────────────────────────────────┤
│  import { db } from './db'                  │
│  db.select().from(users)...                 │
│  → Uses test DB automatically               │
└─────────────────────────────────────────────┘
```

## Stack

- **Test Runner**: Jest with ts-jest
- **HTTP Testing**: Supertest
- **Database**: SQLite with Drizzle ORM
- **Pattern**: Database Factory (no mocking)

## Resources

- Auth tests example: `src/feat/auth/auth.test.ts`
- Test utilities: `src/test-utils/`
- Jest config: `jest.config.js`
- Coverage reports: `coverage/index.html`

