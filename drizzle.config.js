import { defineConfig } from 'drizzle-kit'



export default defineConfig({
	schema: './src/lib/server/db/schema',
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL
	},
	verbose: true,
	strict: true
})
