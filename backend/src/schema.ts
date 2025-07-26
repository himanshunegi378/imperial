import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
export const Components = sqliteTable('components', {
  id: integer({mode: 'number'}).primaryKey({autoIncrement: true}),
  chatId: text(),
  userId: text().notNull(),
  name: text().notNull(),
  html: text().notNull(),
  // @ts-expect-error it was working as it is while as js file after ts it is showing error. I ain't fixing that is not broke
  hideFromLibrary: integer('hideFromLibrary', {mode:"boolean"}).notNull().default(0),
});

export const chatHistory = sqliteTable('chatHistory', {
  id: integer({mode: 'number'}).primaryKey({autoIncrement: true}),
  userId: text().notNull(), // It is gonna be session Id of user
  chatId: text().notNull(),
  message: text().notNull(),
});