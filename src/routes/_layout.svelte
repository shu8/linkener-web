<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
