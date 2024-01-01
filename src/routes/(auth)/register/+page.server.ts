import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { registerFormSchema } from './register.form';
import { fail, redirect } from '@sveltejs/kit';
import { undefined } from 'zod';
import { LuciaError } from 'lucia';

export const load: PageServerLoad = async (event) => {
	return {
		form: await superValidate(registerFormSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		// Validate form
		const form = await superValidate(event, registerFormSchema);
		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			});
		}

		// Check if passwords are the same
		if (form.data.password != form.data.repeat_password) {
			return fail(400, {
				form,
				message: 'Passwords do not match'
			});
		}

		// Begin authentication
		const auth = event.locals.auth;
		try {
			const email = form.data.email.toLowerCase();
			const full_name = form.data.full_name;
			const password = form.data.password;

			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email,
					password: password
				},
				attributes: {
					email: email,
					full_name: full_name,
					email_verified: false
				}
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			// 	@TODO create email validation

			event.locals.authReq.setSession(session);
		} catch (e) {
			if (e instanceof LuciaError && e.message == 'AUTH_DUPLICATE_KEY_ID') {
				return fail(409, {
					form,
					message: 'Email is already taken'
				});
			}
			return fail(500, {
				form,
				message: 'Unknown error has occured'
			});
		}

		throw redirect(302, '/');
	}
};
