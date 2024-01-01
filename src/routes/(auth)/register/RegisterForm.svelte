<script lang="ts">
	import * as Form from '$lib/components/ui/form';

	import type { SuperValidated } from 'sveltekit-superforms';
	import { registerFormSchema, type RegisterFormSchema } from './register.form';
	import { Button } from '$lib/components/ui/button';

	export let form: SuperValidated<RegisterFormSchema>;
	export let global_error: string | undefined;
</script>

<div class="flex justify-between">
	<h1 class="text-3xl">Register</h1>
	<Button href="/login" variant="link" size="lg">Login</Button>
</div>
<Form.Root class="space-y-4" method="post" {form} schema={registerFormSchema} let:config>
	<Form.Item>
		<Form.Field {config} name="full_name">
			<Form.Label>Full Name</Form.Label>
			<Form.Input />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="email">
			<Form.Label>Email</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="password">
			<Form.Label>Password</Form.Label>
			<Form.Input type="password" />
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="repeat_password">
			<Form.Label>Repeat password</Form.Label>
			<Form.Input type="password" />
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<span class="text-destructive">{global_error || ''}</span>
	<Form.Button class="w-full">Register</Form.Button>
</Form.Root>
