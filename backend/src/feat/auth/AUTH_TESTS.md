# Auth Routes Tests

> **See `backend/TESTING.md` for general testing guide**

## Coverage: ✅ 27/27 tests passing

## Test Suites

### 1. POST /api/auth/signup (9 tests)

#### Success Cases
- ✓ Successfully register a new user
- ✓ Set refresh token as HttpOnly cookie

#### Validation Tests
- ✓ Reject duplicate email (409)
- ✓ Reject invalid email format (400)
- ✓ Reject weak password - less than 8 characters (400)
- ✓ Reject password without number (400)
- ✓ Reject password without letter (400)
- ✓ Reject missing email (400)
- ✓ Reject missing password (400)

**Password Requirements:**
- Minimum 8 characters
- At least one letter
- At least one number

### 2. POST /api/auth/login (8 tests)

#### Success Cases
- ✓ Successfully login with valid credentials
- ✓ Set refresh token cookie on login

#### Error Cases
- ✓ Reject wrong password (401)
- ✓ Reject non-existent user (401)
- ✓ Reject invalid email format (400)
- ✓ Reject missing email (400)
- ✓ Reject missing password (400)
- ✓ Reject empty credentials (400)

### 3. POST /api/auth/refresh (5 tests)

#### Success Cases
- ✓ Successfully refresh access token
- ✓ Rotate refresh token on refresh (security feature)

#### Error Cases
- ✓ Reject request without refresh token (401)
- ✓ Reject invalid refresh token (401)
- ✓ Reject expired refresh token (401)

**Security Feature:** Refresh token rotation prevents token reuse attacks.

### 4. POST /api/auth/logout (4 tests)

#### Success Cases
- ✓ Successfully logout
- ✓ Clear refresh token cookie on logout
- ✓ Revoke refresh token in database
- ✓ Allow logout without refresh token (idempotent)

### 5. Integration Tests (1 test)

#### Full Authentication Flow
- ✓ Complete flow: signup → login → refresh → logout
  - Creates user
  - Logs in
  - Refreshes token
  - Verifies token rotation
  - Logs out
  - Confirms token revocation

## Key Features Tested

### 🔒 Security
- Password hashing (bcrypt)
- HttpOnly cookies for refresh tokens
- Token rotation on refresh
- Token revocation on logout
- Unique email enforcement

### ✅ Validation
- Email format validation
- Password strength requirements
- Required field validation
- Proper error responses with codes

### 🍪 Cookie Management
- HttpOnly flag set
- Secure flag in production
- SameSite=strict (CSRF protection)
- Proper cookie clearing on logout

### 🎫 Token Management
- Access token generation
- Refresh token generation
- Token refresh with rotation
- Token revocation
- Database persistence of refresh tokens

## Running

```bash
yarn test --testPathPatterns=auth.test.ts
```

## Assertions

### Response Structure
```typescript
{
  success: true,
  message: "Operation message",
  data: {
    token: "jwt-access-token",
    expiresIn: 900 // seconds
  }
}
```

### Error Structure
```typescript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Error message",
    details: {} // Optional field errors
  }
}
```

## Key Features Verified

- User creation & password hashing (bcrypt)
- Refresh token persistence & revocation
- HttpOnly cookies with proper flags
- Token rotation on refresh (security)
- Idempotent logout
- JWT expiration (15 min access, 7 day refresh)

## Error Codes Tested

| Code | Status | Description |
|------|--------|-------------|
| `INVALID_CREDENTIALS` | 401 | Wrong email or password |
| `USER_ALREADY_EXISTS` | 409 | Email already registered |
| `INVALID_PAYLOAD` | 400 | Validation error |
| `REFRESH_TOKEN_REQUIRED` | 401 | No refresh token provided |
| `INVALID_REFRESH_TOKEN` | 401 | Invalid or expired refresh token |

