<script>
	import CurrentLinks from '../components/CurrentLinks.svelte';
	import Login from '../components/Login.svelte';

	import { accessToken } from "./_auth.js";
</script>

{#if $accessToken}
	<CurrentLinks />
{:else}
	<Login />
{/if}
