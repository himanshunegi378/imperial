const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
  dialect: 'sqlite', // 'mysql' | 'sqlite' | 'turso'
  schema: './schema.js',
})
