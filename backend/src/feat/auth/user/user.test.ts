import request from 'supertest';
import { createTestApp, getTestDb } from '../../../test-utils';
import { users } from '../common/auth.schema';
import { refreshTokens } from '../token/refresh-token.schema';
import { eq } from 'drizzle-orm';

describe('User Routes', () => {
  let app: ReturnType<typeof createTestApp>;
  let db: ReturnType<typeof getTestDb>;

  beforeAll(() => {
    app = createTestApp();
    db = getTestDb();
  });

  beforeEach(async () => {
    await db.delete(refreshTokens);
    await db.delete(users);
  });

  // Helper function to create a user and get token
  async function createUserAndGetToken(email = 'test@example.com', password = 'Password123') {
    const signupResponse = await request(app)
      .post('/api/auth/signup')
      .send({ email, password });

    return signupResponse.body.data.token;
  }

  // Helper function to get user ID from email
  async function getUserIdByEmail(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user?.id;
  }

  describe('GET /api/user/profile', () => {
    it('should get user profile with valid token', async () => {
      const token = await createUserAndGetToken('user@example.com', 'Password123');

      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: 'User profile retrieved successfully',
        data: {
          email: 'user@example.com',
          id: expect.any(Number),
          createdAt: expect.any(String)
        }
      });

      // Should not return password
      expect(response.body.data.password).toBeUndefined();
    });

    it('should reject request without authorization header', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        }
      });
    });

    it('should reject request with invalid token format', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', 'InvalidFormat token123')
        .expect(401);

      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('should reject request without Bearer prefix', async () => {
      const token = await createUserAndGetToken();
      
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', token)
        .expect(401);

      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', 'Bearer invalid.token.here')
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token'
        }
      });
    });

    it('should reject request with malformed JWT', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', 'Bearer not-a-jwt-token')
        .expect(401);

      expect(response.body.error.code).toBe('INVALID_TOKEN');
    });

    it('should return user profile with correct data types', async () => {
      const token = await createUserAndGetToken();

      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const { data } = response.body;
      expect(typeof data.id).toBe('number');
      expect(typeof data.email).toBe('string');
      expect(typeof data.createdAt).toBe('string');
      expect(new Date(data.createdAt).toString()).not.toBe('Invalid Date');
    });
  });

  describe('POST /api/user/change-password', () => {
    const originalPassword = 'OldPassword123';
    const newPassword = 'NewPassword456';

    it('should change password with valid current password', async () => {
      const token = await createUserAndGetToken('user@example.com', originalPassword);

      const response = await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: originalPassword,
          newPassword: newPassword
        })
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: "Password changed successfully. You've been logged out of all devices."
      });

      // Verify old password no longer works
      const oldPasswordLogin = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@example.com', password: originalPassword })
        .expect(401);

      expect(oldPasswordLogin.body.error.code).toBe('INVALID_CREDENTIALS');

      // Verify new password works
      const newPasswordLogin = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@example.com', password: newPassword })
        .expect(200);

      expect(newPasswordLogin.body.data.token).toBeDefined();
    });

    it('should reject change password without authentication', async () => {
      const response = await request(app)
        .post('/api/user/change-password')
        .send({
          currentPassword: 'OldPassword123',
          newPassword: 'NewPassword456'
        })
        .expect(401);

      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });

    it('should reject with wrong current password', async () => {
      const token = await createUserAndGetToken('user@example.com', originalPassword);

      const response = await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'WrongPassword123',
          newPassword: newPassword
        })
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });

      // Verify original password still works
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@example.com', password: originalPassword })
        .expect(200);

      expect(loginResponse.body.data.token).toBeDefined();
    });

    it('should reject weak new password (less than 8 characters)', async () => {
      const token = await createUserAndGetToken('user@example.com', originalPassword);

      const response = await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: originalPassword,
          newPassword: 'Short1'
        })
        .expect(400);

      expect(response.body.error.code).toBe('INVALID_PAYLOAD');
    });

    it('should reject new password without letter', async () => {
      const token = await createUserAndGetToken('user@example.com', originalPassword);

      const response = await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: originalPassword,
          newPassword: '12345678'
        })
        .expect(400);

      expect(response.body.error.code).toBe('INVALID_PAYLOAD');
    });

    it('should reject new password without number', async () => {
      const token = await createUserAndGetToken('user@example.com', originalPassword);

      const response = await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: originalPassword,
          newPassword: 'OnlyLetters'
        })
        .expect(400);

      expect(response.body.error.code).toBe('INVALID_PAYLOAD');
    });

    it('should reject missing current password', async () => {
      const token = await createUserAndGetToken();

      const response = await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          newPassword: newPassword
        })
        .expect(400);

      expect(response.body.error.code).toBe('INVALID_PAYLOAD');
    });

    it('should reject missing new password', async () => {
      const token = await createUserAndGetToken();

      const response = await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: originalPassword
        })
        .expect(400);

      expect(response.body.error.code).toBe('INVALID_PAYLOAD');
    });

    it('should revoke all refresh tokens after password change', async () => {
      const email = 'user@example.com';
      const token = await createUserAndGetToken(email, originalPassword);

      // Get refresh token cookie
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ email, password: originalPassword });

      const cookies = loginResponse.headers['set-cookie'] as unknown as string[];
      const refreshTokenCookie = cookies.find((cookie: string) => 
        cookie.startsWith('refreshToken=')
      ) || '';

      // Change password
      await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: originalPassword,
          newPassword: newPassword
        })
        .expect(200);

      // Try to use old refresh token (should fail)
      const refreshResponse = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', [refreshTokenCookie])
        .expect(401);

      expect(refreshResponse.body.error.code).toBe('INVALID_REFRESH_TOKEN');

      // Verify all tokens are revoked in database
      const userId = await getUserIdByEmail(email);
      const userTokens = await db.select().from(refreshTokens)
        .where(eq(refreshTokens.userId, userId!));

      // All tokens should be marked as revoked
      const allRevoked = userTokens.every(token => token.revoked === true);
      expect(allRevoked).toBe(true);
    });

    it('should allow multiple password changes', async () => {
      const email = 'user@example.com';
      let currentPassword = 'Password123';
      const token = await createUserAndGetToken(email, currentPassword);

      // First password change
      await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: currentPassword,
          newPassword: 'NewPassword456'
        })
        .expect(200);

      currentPassword = 'NewPassword456';

      // Login with new password to get new token
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email, password: currentPassword })
        .expect(200);

      const newToken = loginRes.body.data.token;

      // Second password change
      await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${newToken}`)
        .send({
          currentPassword: currentPassword,
          newPassword: 'FinalPassword789'
        })
        .expect(200);

      // Verify final password works
      const finalLogin = await request(app)
        .post('/api/auth/login')
        .send({ email, password: 'FinalPassword789' })
        .expect(200);

      expect(finalLogin.body.data.token).toBeDefined();
    });
  });

  describe('Integration: User Profile and Password Management', () => {
    it('should complete full user management flow', async () => {
      const email = 'integration@example.com';
      const originalPassword = 'OriginalPass123';
      const newPassword = 'NewPassword456';

      // 1. Signup
      const signupRes = await request(app)
        .post('/api/auth/signup')
        .send({ email, password: originalPassword })
        .expect(201);

      const token = signupRes.body.data.token;

      // 2. Get profile
      const profileRes = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(profileRes.body.data.email).toBe(email);
      const userId = profileRes.body.data.id;

      // 3. Verify user in database
      const [dbUser] = await db.select().from(users).where(eq(users.id, userId));
      expect(dbUser.email).toBe(email);

      // 4. Change password
      await request(app)
        .post('/api/user/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: originalPassword,
          newPassword: newPassword
        })
        .expect(200);

      // 5. Old token should still work (JWT doesn't expire on password change)
      // But refresh tokens are revoked
      const profileWithOldToken = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(profileWithOldToken.body.data.email).toBe(email);

      // 6. Login with new password
      const newLoginRes = await request(app)
        .post('/api/auth/login')
        .send({ email, password: newPassword })
        .expect(200);

      const newToken = newLoginRes.body.data.token;

      // 7. Access profile with new token
      const finalProfileRes = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${newToken}`)
        .expect(200);

      expect(finalProfileRes.body.data.email).toBe(email);
    });
  });
});

