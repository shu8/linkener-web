<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
    margin-bottom:50px;
  }

  footer {
    position: fixed;
    height: 50px;
    background-color: white;
    bottom: 0px;
    width: 100%;
    text-align: center;
  }
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

<footer>
  <a href="https://github.com/shu8/linkener-web">linkener-web</a> by <a href="https://sjain.dev" target="_blank">Shubham Jain</a>.
</footer>
