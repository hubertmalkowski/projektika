import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";


export const load: LayoutServerLoad = async (event) => {

	const session = await event.locals.authReq.validate()
	if (!session) {
		throw redirect(301, "/login")
	}

	return {
		session
	}
}
