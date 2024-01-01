import { lucia } from 'lucia';
import { queryClient } from '$lib/server/db/drizzle';
import { dev } from '$app/environment';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	adapter: postgresAdapter(queryClient, {
		user: 'auth_user',
		key: 'user_key',
		session: 'user_session'
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			email: data.email,
			emailVerified: data.email_verified, // `Boolean(data.email_verified)` if stored as an integer
			first_name: data.full_name
		};
	}
});

export type Auth = typeof auth;
