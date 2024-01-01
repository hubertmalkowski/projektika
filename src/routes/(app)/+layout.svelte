<script>
	import '../../app.pcss';
	import { Button } from '$lib/components/ui/button';
</script>

<form method="post" action="/?/logout">
	<Button type="submit">Log out</Button>
</form>
<slot />
