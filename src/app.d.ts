// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { DB } from '$lib/server/db/drizzle';
import type { Auth as CustomAuth } from '$lib/server/auth/lucia';
import { AuthRequest } from 'lucia';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DB;
			auth: CustomAuth;
			authReq: AuthRequest<CustomAuth>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace Lucia {
		type Auth = CustomAuth;
		type DatabaseUserAttributes = {
			email: string;
			email_verified: boolean;
			full_name: string;
		};
		type DatabaseSessionAttributes = {};
	}
}

export {};
