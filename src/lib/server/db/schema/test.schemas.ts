import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const TestingTable = pgTable("testing", {
	id: serial('id').primaryKey(),
	name: varchar('name', {length: 256})
})
