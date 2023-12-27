import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/server/db/drizzle';


export const handle : Handle = async ({resolve, event}) => {
	event.locals.db = db


	return resolve(event);
}
