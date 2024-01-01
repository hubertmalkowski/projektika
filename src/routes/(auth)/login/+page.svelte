<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import LoginForm from './LoginForm.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<LoginForm form={data.form} global_error={form?.message} />
