import postgres from 'postgres';
import { POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';


// Query
const queryClient = postgres(POSTGRES_URL)
export const db = drizzle(queryClient)

export type DB = typeof db
