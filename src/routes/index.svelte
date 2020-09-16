<script>
	import CurrentLinks from '../components/CurrentLinks.svelte';
	import Login from '../components/Login.svelte';

	import { accessTokenStore } from "./_auth.js";
</script>

<svelte:head>
	<title>Linkener Admin</title>
</svelte:head>

{#if $accessTokenStore}
	<CurrentLinks />
{:else}
	<Login />
{/if}
