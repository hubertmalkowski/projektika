import { z } from 'zod';

export const registerFormSchema = z.object({
	full_name: z.string(),
	email: z.string().email('Invalid email'),
	password: z
		.string()
		.min(8, 'Password should be at least 8 characters long')
		.regex(/^[^\s]+$/, 'Password should contain no spaces'),
	repeat_password: z.string()
});

export type RegisterFormSchema = typeof registerFormSchema;
