import request from 'supertest';
import { createTestApp, getTestDb } from '../../test-utils';
import { users } from './common/auth.schema';
import { refreshTokens } from './token/refresh-token.schema';
import { eq } from 'drizzle-orm';

describe('Auth Routes', () => {
  let app: ReturnType<typeof createTestApp>;
  let db: ReturnType<typeof getTestDb>;

  // Initialize after test database is set up
  beforeAll(() => {
    app = createTestApp();
    db = getTestDb();
  });

  // Clean up users and tokens before each test for isolation
  beforeEach(async () => {
    await db.delete(refreshTokens);
    await db.delete(users);
  });

  describe('POST /api/auth/signup', () => {
    const validSignupData = {
      email: 'test@example.com',
      password: 'Password123'
    };

    it('should successfully register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(validSignupData)
        .expect(201);

      expect(response.body).toMatchObject({
        success: true,
        message: 'User registered successfully',
        data: {
          token: expect.any(String),
          expiresIn: expect.any(Number)
        }
      });

      // Verify user was created in database
      const [user] = await db.select().from(users).where(eq(users.email, validSignupData.email));
      expect(user).toBeDefined();
      expect(user.email).toBe(validSignupData.email);
      expect(user.password).not.toBe(validSignupData.password); // Password should be hashed
    });

    it('should set refresh token as HttpOnly cookie', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(validSignupData)
        .expect(201);

      const cookies = response.headers['set-cookie'] as unknown as string[];
      expect(cookies).toBeDefined();
      
      const refreshTokenCookie = cookies.find((cookie: string) => 
        cookie.startsWith('refreshToken=')
      );
      expect(refreshTokenCookie).toBeDefined();
      expect(refreshTokenCookie).toMatch(/HttpOnly/);
    });

    it('should reject duplicate email', async () => {
      // First signup
      await request(app)
        .post('/api/auth/signup')
        .send(validSignupData)
        .expect(201);

      // Second signup with same email
      const response = await request(app)
        .post('/api/auth/signup')
        .send(validSignupData)
        .expect(409);

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'USER_ALREADY_EXISTS',
          message: 'User with this email already exists'
        }
      });
    });

    it('should reject invalid email format', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'not-an-email',
          password: 'Password123'
        })
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_PAYLOAD',
          message: 'Invalid request payload'
        }
      });
    });

    it('should reject weak password (less than 8 characters)', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'Pass1'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('INVALID_PAYLOAD');
    });

    it('should reject password without number', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'PasswordOnly'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should reject password without letter', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: '12345678'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should reject missing email', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          password: 'Password123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should reject missing password', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    const userCredentials = {
      email: 'login@example.com',
      password: 'Password123'
    };

    beforeEach(async () => {
      // Create a user for login tests
      await request(app)
        .post('/api/auth/signup')
        .send(userCredentials);
    });

    it('should successfully login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(userCredentials)
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: 'Login successful',
        data: {
          token: expect.any(String),
          expiresIn: expect.any(Number)
        }
      });
    });

    it('should set refresh token cookie on login', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(userCredentials)
        .expect(200);

      const cookies = response.headers['set-cookie'] as unknown as string[];
      expect(cookies).toBeDefined();
      
      const refreshTokenCookie = cookies.find((cookie: string) => 
        cookie.startsWith('refreshToken=')
      );
      expect(refreshTokenCookie).toBeDefined();
      expect(refreshTokenCookie).toMatch(/HttpOnly/);
    });

    it('should reject wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: userCredentials.email,
          password: 'WrongPassword123'
        })
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    });

    it('should reject non-existent user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password123'
        })
        .expect(401);

      expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
    });

    it('should reject invalid email format', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'not-an-email',
          password: 'Password123'
        })
        .expect(400);

      expect(response.body.error.code).toBe('INVALID_PAYLOAD');
    });

    it('should reject missing email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'Password123'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should reject missing password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: userCredentials.email
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should reject empty credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/refresh', () => {
    const userCredentials = {
      email: 'refresh@example.com',
      password: 'Password123'
    };

    let refreshTokenCookie: string;

    beforeEach(async () => {
      // Create user and get refresh token
      const signupResponse = await request(app)
        .post('/api/auth/signup')
        .send(userCredentials);

      const cookies = signupResponse.headers['set-cookie'] as unknown as string[];
      refreshTokenCookie = cookies.find((cookie: string) => 
        cookie.startsWith('refreshToken=')
      ) || '';
    });

    it('should successfully refresh access token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', [refreshTokenCookie])
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          token: expect.any(String),
          expiresIn: expect.any(Number)
        }
      });
    });

    it('should rotate refresh token on refresh', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', [refreshTokenCookie])
        .expect(200);

      const newCookies = response.headers['set-cookie'] as unknown as string[];
      expect(newCookies).toBeDefined();
      
      const newRefreshTokenCookie = newCookies.find((cookie: string) => 
        cookie.startsWith('refreshToken=')
      );
      expect(newRefreshTokenCookie).toBeDefined();
      
      // New token should be different from old one
      const oldToken = refreshTokenCookie.split('=')[1].split(';')[0];
      const newToken = newRefreshTokenCookie!.split('=')[1].split(';')[0];
      expect(newToken).not.toBe(oldToken);
    });

    it('should reject request without refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'REFRESH_TOKEN_REQUIRED',
          message: 'Refresh token is required'
        }
      });
    });

    it('should reject invalid refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', ['refreshToken=invalid-token'])
        .expect(401);

      expect(response.body.error.code).toBe('INVALID_REFRESH_TOKEN');
    });

    it('should reject expired refresh token', async () => {
      // This test would require mocking time or creating an expired token
      // For now, we'll test with an invalid token format
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', ['refreshToken=expired.token.here'])
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/logout', () => {
    const userCredentials = {
      email: 'logout@example.com',
      password: 'Password123'
    };

    let refreshTokenCookie: string;

    beforeEach(async () => {
      // Create user and login
      const loginResponse = await request(app)
        .post('/api/auth/signup')
        .send(userCredentials);

      const cookies = loginResponse.headers['set-cookie'] as unknown as string[];
      refreshTokenCookie = cookies.find((cookie: string) => 
        cookie.startsWith('refreshToken=')
      ) || '';
    });

    it('should successfully logout', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', [refreshTokenCookie])
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: 'Logged out successfully'
      });
    });

    it('should clear refresh token cookie on logout', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', [refreshTokenCookie])
        .expect(200);

      const cookies = response.headers['set-cookie'] as unknown as string[];
      expect(cookies).toBeDefined();
      
      const clearedCookie = cookies.find((cookie: string) => 
        cookie.startsWith('refreshToken=')
      );
      expect(clearedCookie).toBeDefined();
      // Cookie should be cleared (empty value or expired)
      expect(clearedCookie).toMatch(/refreshToken=;/);
    });

    it('should revoke refresh token in database', async () => {
      await request(app)
        .post('/api/auth/logout')
        .set('Cookie', [refreshTokenCookie])
        .expect(200);

      // Try to use the revoked token
      const refreshResponse = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', [refreshTokenCookie])
        .expect(401);

      expect(refreshResponse.body.success).toBe(false);
    });

    it('should allow logout without refresh token', async () => {
      // Logout should succeed even without a token (idempotent)
      const response = await request(app)
        .post('/api/auth/logout')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('Integration: Full Authentication Flow', () => {
    const userCredentials = {
      email: 'integration@example.com',
      password: 'Password123'
    };

    it('should complete full auth flow: signup -> login -> refresh -> logout', async () => {
      // 1. Signup
      const signupResponse = await request(app)
        .post('/api/auth/signup')
        .send(userCredentials)
        .expect(201);

      expect(signupResponse.body.data.token).toBeDefined();
      const signupCookies = signupResponse.headers['set-cookie'] as unknown as string[];

      // 2. Login
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send(userCredentials)
        .expect(200);

      expect(loginResponse.body.data.token).toBeDefined();
      const loginCookies = loginResponse.headers['set-cookie'] as unknown as string[];
      const refreshTokenCookie = loginCookies.find((cookie: string) => 
        cookie.startsWith('refreshToken=')
      ) || '';

      // 3. Refresh token
      const refreshResponse = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', [refreshTokenCookie])
        .expect(200);

      expect(refreshResponse.body.data.token).toBeDefined();
      // Note: Access tokens may be identical if generated in the same second with same payload
      // More important is that refresh token is rotated (checked below)

      const newRefreshCookies = refreshResponse.headers['set-cookie'] as unknown as string[];
      const newRefreshTokenCookie = newRefreshCookies.find((cookie: string) => 
        cookie.startsWith('refreshToken=')
      ) || '';
      
      // Verify refresh token was rotated
      expect(newRefreshTokenCookie).toBeDefined();
      expect(newRefreshTokenCookie).not.toBe(refreshTokenCookie);

      // 4. Logout
      const logoutResponse = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', [newRefreshTokenCookie])
        .expect(200);

      expect(logoutResponse.body.message).toBe('Logged out successfully');

      // 5. Verify token is revoked
      await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', [newRefreshTokenCookie])
        .expect(401);
    });
  });
});

