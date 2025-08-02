import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: integer({mode: 'number'}).primaryKey({autoIncrement: true}),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: integer({ mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
