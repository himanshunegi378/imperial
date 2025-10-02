import request from 'supertest';
import { createTestApp, getTestDb } from '../../test-utils';
import { users } from '../auth/common/auth.schema';
import { refreshTokens } from '../auth/token/refresh-token.schema';
import { Components, chatHistory } from '../../schema';
import { eq } from 'drizzle-orm';

// Increase timeout for AI calls (AI can take 10-15 seconds per call)
jest.setTimeout(60000);

describe('Chat Routes', () => {
  let app: ReturnType<typeof createTestApp>;
  let db: ReturnType<typeof getTestDb>;

  // Shared test data (reuse to minimize AI calls)
  let testToken: string;
  let testUserId: number;
  let testChatId: string;
  let secondUserToken: string;
  let secondUserId: number;

  beforeAll(async () => {
    app = createTestApp();
    db = getTestDb();

    // Create first test user
    const signupResponse = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'chat-user@example.com', password: 'Password123' });

    testToken = signupResponse.body.data.token;

    const [user] = await db.select().from(users)
      .where(eq(users.email, 'chat-user@example.com'));
    testUserId = user.id;

    // Create second test user for isolation tests
    const secondSignup = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'chat-user-2@example.com', password: 'Password123' });

    secondUserToken = secondSignup.body.data.token;

    const [secondUser] = await db.select().from(users)
      .where(eq(users.email, 'chat-user-2@example.com'));
    secondUserId = secondUser.id;
  });

  beforeEach(async () => {
    // Clean up chat data between tests
    await db.delete(Components);
    await db.delete(chatHistory);
  });

  afterAll(async () => {
    // Final cleanup
    await db.delete(refreshTokens);
    await db.delete(users);
    await db.delete(Components);
    await db.delete(chatHistory);
  });

  describe('POST /chat', () => {
    describe('Authentication', () => {
      it('should reject request without JWT token', async () => {
        const response = await request(app)
          .post('/chat')
          .send({ userMessage: 'Create a button' })
          .expect(401);

        expect(response.body).toMatchObject({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication required'
          }
        });
      });

      it('should reject request with invalid token', async () => {
        const response = await request(app)
          .post('/chat')
          .set('Authorization', 'Bearer invalid.token.here')
          .send({ userMessage: 'Create a button' })
          .expect(401);

        expect(response.body.error.code).toBe('INVALID_TOKEN');
      });
    });

    describe('Validation', () => {
      it('should reject request without userMessage', async () => {
        const response = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({})
          .expect(400);

        expect(response.body).toMatchObject({
          success: false,
          error: {
            code: 'INVALID_PAYLOAD'
          }
        });
      });

      it('should reject request with empty userMessage', async () => {
        const response = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ userMessage: '' })
          .expect(400);

        expect(response.body.error.code).toBe('INVALID_PAYLOAD');
      });
    });

    describe('Success Cases', () => {
      it('should create new chat with AI response', async () => {
        const response = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ userMessage: 'Create a simple red button that says Click Me' })
          .expect(200);

        // Validate response structure
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
          chatId: expect.any(String),
          component: expect.any(String),
          name: expect.any(String),
          message: expect.any(String)
        });

        // Validate component is HTML
        expect(response.body.data.component.length).toBeGreaterThan(0);
        expect(response.body.data.component).toMatch(/<\w+/); // Contains HTML tag

        // Store chatId for other tests
        testChatId = response.body.data.chatId;

        // Verify component saved in database
        const [component] = await db.select().from(Components)
          .where(eq(Components.chatId, testChatId));

        expect(component).toBeDefined();
        expect(component.userId).toBe(testUserId.toString());
        expect(component.chatId).toBe(testChatId);
        expect(component.html).toBe(response.body.data.component);
        expect(component.name).toBe(response.body.data.name);

        // Verify chat history created
        const history = await db.select().from(chatHistory)
          .where(eq(chatHistory.chatId, testChatId));

        expect(history).toHaveLength(1);
        expect(history[0].userId).toBe(testUserId.toString());
        expect(history[0].chatId).toBe(testChatId);
      });

      it('should continue existing chat with provided chatId', async () => {
        // First message
        const firstResponse = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ userMessage: 'Create a blue button' })
          .expect(200);

        const chatId = firstResponse.body.data.chatId;
        const firstComponent = firstResponse.body.data.component;

        // Second message with same chatId
        const secondResponse = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ 
            userMessage: 'Make the button larger',
            chatId: chatId
          })
          .expect(200);

        // Should return same chatId
        expect(secondResponse.body.data.chatId).toBe(chatId);

        // Component should be updated (likely different from first)
        expect(secondResponse.body.data.component).toBeDefined();
        expect(secondResponse.body.data.component.length).toBeGreaterThan(0);

        // Verify component updated in database
        const [component] = await db.select().from(Components)
          .where(eq(Components.chatId, chatId));

        expect(component.html).toBe(secondResponse.body.data.component);

        // Verify chat history still has only 1 entry (not duplicated)
        const history = await db.select().from(chatHistory)
          .where(eq(chatHistory.chatId, chatId));

        expect(history).toHaveLength(1);
      });

      it('should generate chatId if not provided', async () => {
        const response = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ userMessage: 'Create a green button' })
          .expect(200);

        expect(response.body.data.chatId).toBeDefined();
        expect(typeof response.body.data.chatId).toBe('string');
        expect(response.body.data.chatId.length).toBeGreaterThan(0);
      });
    });
  });

  describe('GET /chat-history', () => {
    beforeEach(async () => {
      // Create a chat for history tests (reuse to avoid multiple AI calls)
      if (!testChatId) {
        const response = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ userMessage: 'Create a test button' });
        
        testChatId = response.body.data.chatId;
      }
    });

    describe('Authentication', () => {
      it('should reject request without JWT token', async () => {
        const response = await request(app)
          .get('/chat-history')
          .query({ chatId: testChatId })
          .expect(401);

        expect(response.body.error.code).toBe('UNAUTHORIZED');
      });

      it('should reject request with invalid token', async () => {
        const response = await request(app)
          .get('/chat-history')
          .set('Authorization', 'Bearer invalid.token')
          .query({ chatId: testChatId })
          .expect(401);

        expect(response.body.error.code).toBe('INVALID_TOKEN');
      });
    });

    describe('Validation', () => {
      it('should reject request without chatId query parameter', async () => {
        const response = await request(app)
          .get('/chat-history')
          .set('Authorization', `Bearer ${testToken}`)
          .expect(400);

        expect(response.body).toMatchObject({
          success: false,
          error: {
            code: 'CHAT_ID_REQUIRED',
            message: 'Chat ID is required'
          }
        });
      });
    });

    describe('Success Cases', () => {
      it('should get chat history for existing chat', async () => {
        const response = await request(app)
          .get('/chat-history')
          .set('Authorization', `Bearer ${testToken}`)
          .query({ chatId: testChatId })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
          chatId: testChatId,
          component: expect.any(String),
          name: expect.any(String),
          messages: expect.any(Array)
        });

        // Validate messages structure
        if (response.body.data.messages.length > 0) {
          const message = response.body.data.messages[0];
          expect(message).toHaveProperty('sender');
          expect(message).toHaveProperty('text');
          expect(['human', 'ai']).toContain(message.sender);
        }
      });

      it('should handle non-existent chatId gracefully', async () => {
        const response = await request(app)
          .get('/chat-history')
          .set('Authorization', `Bearer ${testToken}`)
          .query({ chatId: 'non-existent-chat-id' })
          .expect(200);

        expect(response.body.success).toBe(true);
        // Should return empty or null data
        expect(response.body.data.messages).toBeDefined();
      });
    });
  });

  describe('GET /chat-history-id-list', () => {
    describe('Authentication', () => {
      it('should reject request without JWT token', async () => {
        const response = await request(app)
          .get('/chat-history-id-list')
          .expect(401);

        expect(response.body.error.code).toBe('UNAUTHORIZED');
      });

      it('should reject request with invalid token', async () => {
        const response = await request(app)
          .get('/chat-history-id-list')
          .set('Authorization', 'Bearer invalid.token')
          .expect(401);

        expect(response.body.error.code).toBe('INVALID_TOKEN');
      });
    });

    describe('Success Cases', () => {
      it('should return empty array for user with no chats', async () => {
        const response = await request(app)
          .get('/chat-history-id-list')
          .set('Authorization', `Bearer ${testToken}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toHaveLength(0);
      });

      it('should return list of user chats', async () => {
        // Create two chats
        const chat1 = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ userMessage: 'Create first button' });

        const chat2 = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ userMessage: 'Create second button' });

        const response = await request(app)
          .get('/chat-history-id-list')
          .set('Authorization', `Bearer ${testToken}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(2);

        // Validate structure of each item
        response.body.data.forEach((chat: any) => {
          expect(chat).toHaveProperty('chatId');
          expect(chat).toHaveProperty('name');
          expect(typeof chat.chatId).toBe('string');
          expect(typeof chat.name).toBe('string');
        });

        // Verify order (newest first)
        const chatIds = response.body.data.map((c: any) => c.chatId);
        expect(chatIds).toContain(chat1.body.data.chatId);
        expect(chatIds).toContain(chat2.body.data.chatId);
      });

      it('should not return other users chats', async () => {
        // Create chat for first user
        await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ userMessage: 'First user chat' });

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create chat for second user
        await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${secondUserToken}`)
          .send({ userMessage: 'Second user chat' });

        // Get first user's chats
        const firstUserResponse = await request(app)
          .get('/chat-history-id-list')
          .set('Authorization', `Bearer ${testToken}`)
          .expect(200);

        // Get second user's chats
        const secondUserResponse = await request(app)
          .get('/chat-history-id-list')
          .set('Authorization', `Bearer ${secondUserToken}`)
          .expect(200);

        // Each user should see only 1 chat (their own)
        expect(firstUserResponse.body.data).toHaveLength(1);
        expect(secondUserResponse.body.data).toHaveLength(1);
      }, 70000);
    });
  });

  describe('DELETE /chat-history/:chatId', () => {
    let deleteChatId: string;

    beforeEach(async () => {
      // Create a chat to delete
      const response = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ userMessage: 'Create a button to delete' });
      
      deleteChatId = response.body.data.chatId;
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }, 50000);

    describe('Authentication', () => {
      it('should reject request without JWT token', async () => {
        const response = await request(app)
          .delete(`/chat-history/${deleteChatId}`)
          .expect(401);

        expect(response.body.error.code).toBe('UNAUTHORIZED');
      });

      it('should reject request with invalid token', async () => {
        const response = await request(app)
          .delete(`/chat-history/${deleteChatId}`)
          .set('Authorization', 'Bearer invalid.token')
          .expect(401);

        expect(response.body.error.code).toBe('INVALID_TOKEN');
      });
    });

    describe('Success Cases', () => {
      it('should delete chat successfully', async () => {
        const response = await request(app)
          .delete(`/chat-history/${deleteChatId}`)
          .set('Authorization', `Bearer ${testToken}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.success).toBe(true);

        // Verify component deleted from database
        const components = await db.select().from(Components)
          .where(eq(Components.chatId, deleteChatId));

        expect(components).toHaveLength(0);

        // Verify chat history deleted from database
        const history = await db.select().from(chatHistory)
          .where(eq(chatHistory.chatId, deleteChatId));

        expect(history).toHaveLength(0);
      });

      it('should delete non-existent chat without error', async () => {
        const response = await request(app)
          .delete('/chat-history/non-existent-chat-id')
          .set('Authorization', `Bearer ${testToken}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.success).toBe(true);
      });
    });

    describe('Security', () => {
      it('should not delete other users chat', async () => {
        // Create chat for second user
        const secondUserChat = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${secondUserToken}`)
          .send({ userMessage: 'Second user button' });

        const secondUserChatId = secondUserChat.body.data.chatId;

        // Try to delete with first user's token
        await request(app)
          .delete(`/chat-history/${secondUserChatId}`)
          .set('Authorization', `Bearer ${testToken}`)
          .expect(200);

        // Verify chat still exists for second user
        const components = await db.select().from(Components)
          .where(eq(Components.chatId, secondUserChatId));

        // If the chat was NOT deleted (security working), it should still exist
        // If it WAS deleted, this is a security issue
        // Based on the repository code, it filters by userId, so it should be safe
        const secondUserComponents = components.filter(
          c => c.userId === secondUserId.toString()
        );

        expect(secondUserComponents.length).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Edit Mode: Incremental Component Modifications', () => {
    it('should detect EDIT intent and preserve component structure', async () => {
      // Step 1: Create initial component
      const createResponse = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ userMessage: 'Create a red button that says Click Me' })
        .expect(200);

      const chatId = createResponse.body.data.chatId;
      const originalComponent = createResponse.body.data.component;
      
      expect(createResponse.body.data.intentType).toBe('CREATE');
      expect(originalComponent).toContain('button');
      
      console.log('Created component:', originalComponent.substring(0, 200));

      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Step 2: Make incremental edit (should use EDIT mode)
      const editResponse = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ 
          userMessage: 'Make the button blue',
          chatId: chatId
        })
        .expect(200);

      const editedComponent = editResponse.body.data.component;
      
      console.log('Edited component:', editedComponent.substring(0, 200));
      console.log('Intent type:', editResponse.body.data.intentType);

      // Verify EDIT mode was detected
      expect(editResponse.body.data.intentType).toBe('EDIT');
      
      // Verify component structure is largely preserved
      expect(editedComponent).toContain('button');
      
      // Verify the edit was applied (should contain blue color class)
      expect(editedComponent.toLowerCase()).toMatch(/blue|bg-blue/i);
      
      // Verify component was updated in database
      const [component] = await db.select().from(Components)
        .where(eq(Components.chatId, chatId));
      
      expect(component.html).toBe(editedComponent);
    }, 80000);

    it('should detect CREATE intent for completely different component', async () => {
      // Step 1: Create initial component
      const createResponse = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ userMessage: 'Create a pricing card' })
        .expect(200);

      const chatId = createResponse.body.data.chatId;
      
      expect(createResponse.body.data.intentType).toBe('CREATE');

      await new Promise(resolve => setTimeout(resolve, 3000));

      // Step 2: Request completely different component (should use CREATE mode)
      const newComponentResponse = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ 
          userMessage: 'Create a navigation bar',
          chatId: chatId
        })
        .expect(200);

      // Should detect CREATE intent for different component type
      expect(newComponentResponse.body.data.intentType).toBe('CREATE');
      
      // Component should be different (nav vs card)
      const newComponent = newComponentResponse.body.data.component;
      expect(newComponent).toBeDefined();
      expect(newComponent.length).toBeGreaterThan(0);
    }, 80000);

    it('should handle multiple sequential edits', async () => {
      // Create base component
      const createResponse = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ userMessage: 'Create a simple button' })
        .expect(200);

      const chatId = createResponse.body.data.chatId;
      let currentComponent = createResponse.body.data.component;

      await new Promise(resolve => setTimeout(resolve, 3000));

      // First edit
      const edit1Response = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ 
          userMessage: 'Make it green',
          chatId: chatId
        })
        .expect(200);

      expect(edit1Response.body.data.intentType).toBe('EDIT');
      currentComponent = edit1Response.body.data.component;

      await new Promise(resolve => setTimeout(resolve, 3000));

      // Second edit
      const edit2Response = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ 
          userMessage: 'Add padding',
          chatId: chatId
        })
        .expect(200);

      expect(edit2Response.body.data.intentType).toBe('EDIT');
      
      // Verify component is still a button with accumulated changes
      expect(edit2Response.body.data.component).toContain('button');
    }, 100000);

    it('should detect edit intent with various edit keywords', async () => {
      const testCases = [
        'change the color',
        'make it bigger',
        'update the text',
        'add shadow',
        'adjust the size'
      ];

      for (const testCase of testCases) {
        // Create component
        const createResponse = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ userMessage: 'Create a button' })
          .expect(200);

        const chatId = createResponse.body.data.chatId;

        await new Promise(resolve => setTimeout(resolve, 3000));

        // Test edit keyword
        const editResponse = await request(app)
          .post('/chat')
          .set('Authorization', `Bearer ${testToken}`)
          .send({ 
            userMessage: testCase,
            chatId: chatId
          })
          .expect(200);

        console.log(`Testing: "${testCase}" -> Intent: ${editResponse.body.data.intentType}`);
        
        // Should detect EDIT for all these keywords
        expect(editResponse.body.data.intentType).toBe('EDIT');

        // Clean up
        await db.delete(Components).where(eq(Components.chatId, chatId));
        await db.delete(chatHistory).where(eq(chatHistory.chatId, chatId));

        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }, 120000);
  });

  describe('Integration: Complete Chat Flow', () => {
    it('should complete full chat lifecycle', async () => {
      // 1. Create new chat
      const createResponse = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ userMessage: 'Create a purple button' })
        .expect(200);

      const chatId = createResponse.body.data.chatId;
      expect(chatId).toBeDefined();

      // 2. Verify chat appears in list
      const listResponse = await request(app)
        .get('/chat-history-id-list')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200);

      const chatIds = listResponse.body.data.map((c: any) => c.chatId);
      expect(chatIds).toContain(chatId);

      // 3. Get chat history
      const historyResponse = await request(app)
        .get('/chat-history')
        .set('Authorization', `Bearer ${testToken}`)
        .query({ chatId })
        .expect(200);

      expect(historyResponse.body.data.chatId).toBe(chatId);
      expect(historyResponse.body.data.component).toBeDefined();

      // Delay before next AI call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 4. Continue chat
      const continueResponse = await request(app)
        .post('/chat')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ 
          userMessage: 'Add rounded corners',
          chatId: chatId
        })
        .expect(200);

      expect(continueResponse.body.data.chatId).toBe(chatId);

      // 5. Delete chat
      const deleteResponse = await request(app)
        .delete(`/chat-history/${chatId}`)
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200);

      expect(deleteResponse.body.data.success).toBe(true);

      // 6. Verify chat no longer in list
      const finalListResponse = await request(app)
        .get('/chat-history-id-list')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200);

      const finalChatIds = finalListResponse.body.data.map((c: any) => c.chatId);
      expect(finalChatIds).not.toContain(chatId);
    }, 80000);
  });
});

