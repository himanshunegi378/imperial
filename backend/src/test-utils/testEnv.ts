/**
 * Test environment configuration
 * Sets up environment variables for testing
 */

// Set test environment variables if not already set
process.env.NODE_ENV = 'test';
process.env.PORT = process.env.PORT || '3001';
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'test-openai-key';
process.env.GROQ_API_KEY = process.env.GROQ_API_KEY || 'test-groq-key';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-for-testing';

