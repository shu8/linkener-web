<script>
  import { Nav } from "svelte-chota";

  import { accessToken, logout } from "../routes/_auth.js";

  export let segment;
</script>

{#if $accessToken}
  <Nav>
    <a slot="left" href="/" class="brand">URL Shortener</a>
    <a
      slot="left"
      href="/"
      class={`${segment === '/' ? 'active' : ''}`}>Current Links</a>
    <a
      slot="left"
      href="/new-link"
      class={`${segment === 'new-link' ? 'active' : ''}`}>New Link</a>
    <a
      slot="left"
      href="/settings"
      class={`${segment === 'settings' ? 'active' : ''}`}>Settings</a>
    <a slot="left" href="/" on:click={() => logout()}>Logout</a>
  </Nav>
{:else}
  <Nav><a slot="left" href="/" class="brand">URL Shortener</a></Nav>
{/if}
