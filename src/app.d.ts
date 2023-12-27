// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { DB } from '$lib/server/db/drizzle';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DB
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
