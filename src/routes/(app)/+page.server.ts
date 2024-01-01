import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";



export const actions: Actions = {
	logout: async (event) => {
		const session = await event.locals.authReq.validate()
		if (!session) return fail(401)

		await event.locals.auth.invalidateSession(session.sessionId)

		event.locals.authReq.setSession(null)

		throw redirect(302, "/login")
	}

}
