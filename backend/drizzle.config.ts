import type { Config } from 'drizzle-kit';

export default {
  schema: ['./src/schema.ts', './src/feat/auth/common/auth.schema.ts', './src/feat/auth/token/refresh-token.schema.ts'],
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './imperial.db'
  }
} satisfies Config;
