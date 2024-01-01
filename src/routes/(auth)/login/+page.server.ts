import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { loginFormSchema } from './login.form';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';

export const load: PageServerLoad = async (event) => {
	return {
		form: await superValidate(loginFormSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, loginFormSchema)
		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			})
		}

		const auth = event.locals.auth
		try {
			const email = form.data.email
			const password = form.data.password
			const key = await event.locals.auth.useKey("email", email.toLowerCase(), password)
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			})

			event.locals.authReq.setSession(session)

		}
		catch (e) {
			if (e instanceof LuciaError && (e.message == "AUTH_INVALID_PASSWORD" || e.message == "AUTH_INVALID_KEY_ID")) {
				return fail(401, {
					form,
					message: "Wrong password or email"
				})
			}
			return fail(500, {
				form,
				message: "Unknown error occured"
			})
		}

		throw redirect(301, "/")
	}
};
