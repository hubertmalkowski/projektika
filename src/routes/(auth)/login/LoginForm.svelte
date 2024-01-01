<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { loginFormSchema, type LoginFormSchema } from './login.form';
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import { Loader2 } from 'lucide-svelte';

	export let form: SuperValidated<LoginFormSchema>;
	export let global_error: string | undefined;
	let sent = false;
</script>

<div class="flex justify-between">
	<h1 class="text-3xl">Login</h1>
	<Button href="/register" variant="link" size="lg">Register</Button>
</div>
<Form.Root {form} class="space-y-4" method="post" schema={loginFormSchema} let:config>
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
		</Form.Field>
	</Form.Item>
	<span class="text-destructive">{global_error || ''}</span>
	<Form.Button class="w-full" disabled={sent}>
		{#if sent}
			<Loader2 />
		{/if}
		Log in
	</Form.Button>
</Form.Root>
