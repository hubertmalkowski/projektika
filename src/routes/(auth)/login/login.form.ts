import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email('Invalid email'),
	password: z.string()
});

export type LoginFormSchema = typeof loginFormSchema;
