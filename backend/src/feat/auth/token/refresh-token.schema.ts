import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const refreshTokens = sqliteTable('refreshTokens', {
  id: integer({mode: 'number'}).primaryKey({autoIncrement: true}),
  userId: integer({mode: 'number'}).notNull(),
  token: text().notNull().unique(),
  expiresAt: integer({ mode: 'timestamp' }).notNull(),
  createdAt: integer({ mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  revoked: integer({ mode: 'boolean' }).notNull().default(false),
});
