# User Routes Tests

> **See `backend/TESTING.md` for general testing guide**

## Coverage: ✅ 18/18 tests passing

## Test Suites

### 1. GET /api/user/profile (7 tests)

**Protected endpoint** - Requires JWT authentication

#### Success Cases
- ✓ Get user profile with valid token
- ✓ Return profile with correct data types (id, email, createdAt)

#### Security Tests
- ✓ Reject without authorization header (401)
- ✓ Reject with invalid token format (401)
- ✓ Reject without Bearer prefix (401)
- ✓ Reject with invalid JWT token (401)
- ✓ Reject with malformed JWT (401)

**Security Feature:** Password field is never returned in profile response.

### 2. POST /api/user/change-password (10 tests)

**Protected endpoint** - Requires JWT authentication

#### Success Cases
- ✓ Change password with valid current password
- ✓ Allow multiple password changes

#### Verification
- ✓ Old password no longer works after change
- ✓ New password works for login
- ✓ All refresh tokens revoked after password change

#### Security Tests
- ✓ Reject without authentication (401)
- ✓ Reject with wrong current password (401)

#### Validation Tests
- ✓ Reject weak password < 8 characters (400)
- ✓ Reject password without letter (400)
- ✓ Reject password without number (400)
- ✓ Reject missing current password (400)
- ✓ Reject missing new password (400)

**Security Feature:** Password change revokes ALL refresh tokens, logging user out of all devices.

### 3. Integration Tests (1 test)

#### Full User Management Flow
- ✓ Complete flow: signup → get profile → change password → login with new password
  - Verifies user creation
  - Profile retrieval
  - Database consistency
  - Password update
  - Token revocation
  - New login with changed password

## Key Features Tested

### 🔒 Authentication & Authorization
- JWT token validation (Bearer scheme)
- Token format validation
- Invalid token handling
- Missing token handling

### 👤 Profile Management
- Profile retrieval with sensitive data excluded
- Correct data type validation
- User identification via JWT

### 🔑 Password Management
- Current password verification
- Password strength validation
- Secure password hashing (bcrypt)
- Password change confirmation

### 🔐 Security Features
- Token revocation on password change
- Multi-device logout on password change
- Password never returned in responses
- Current password required for change

## Response Structures

### Get Profile Success
```typescript
{
  success: true,
  message: "User profile retrieved successfully",
  data: {
    id: number,
    email: string,
    createdAt: string  // ISO 8601 format
    // password is excluded
  }
}
```

### Change Password Success
```typescript
{
  success: true,
  message: "Password changed successfully. You've been logged out of all devices.",
  data: {}
}
```

## Authentication

All user routes require JWT authentication via Authorization header:

```typescript
headers: {
  'Authorization': 'Bearer <jwt-token>'
}
```

## Password Requirements

Same as signup:
- Minimum 8 characters
- At least one letter
- At least one number

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | No token or invalid format |
| `INVALID_TOKEN` | 401 | Invalid or expired JWT |
| `INVALID_CREDENTIALS` | 401 | Wrong current password |
| `INVALID_PAYLOAD` | 400 | Validation error |

## Running

```bash
yarn test --testPathPatterns=user.test.ts
```

## Test Helpers

The test suite includes helper functions:

```typescript
// Create user and get JWT token
async function createUserAndGetToken(email, password)

// Get user ID from email (for database verification)
async function getUserIdByEmail(email)
```

## Important Security Notes

1. **Token Revocation**: Changing password revokes ALL refresh tokens for the user
2. **Active JWTs**: Existing access tokens remain valid until expiration (15 min)
3. **Password Hashing**: All passwords are bcrypt hashed (10 salt rounds)
4. **Sensitive Data**: Password field never returned in any response

## Test Coverage Highlights

- ✅ Authentication flow validation
- ✅ Token format and validity checks
- ✅ Password change security (verification, hashing, token revocation)
- ✅ Input validation for all fields
- ✅ Database state verification
- ✅ Integration testing with auth flow
- ✅ Multi-step workflows

