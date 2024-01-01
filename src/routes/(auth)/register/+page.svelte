<script lang="ts">
	import RegisterForm from './RegisterForm.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<RegisterForm form={data.form} global_error={form?.message} />
