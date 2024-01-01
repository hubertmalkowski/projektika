import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/server/db/drizzle';
import { auth } from '$lib/server/auth/lucia';

export const handle: Handle = async ({ resolve, event }) => {
	event.locals.db = db;
	event.locals.auth = auth;
	event.locals.authReq = auth.handleRequest(event);

	return resolve(event);
};
