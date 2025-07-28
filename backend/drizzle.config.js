const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
  dialect: 'sqlite', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/schema.ts',
})
