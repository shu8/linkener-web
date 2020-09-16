<script>
  import { Nav } from "svelte-chota";

  import { accessTokenStore, logout } from "../routes/_auth.js";

  export let segment;
  $: console.log(segment)
</script>

{#if $accessTokenStore}
  <Nav>
    <a slot="left" href="/" class="brand">
      <img src="/logo.png" alt="Linkener" />
    </a>
    <a
      slot="left"
      href="/"
      class={`${!segment || segment === '/' ? 'active' : ''}`}>Current Links</a>
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
  <Nav>
    <a slot="left" href="/" class="brand">
      <img src="/logo.png" alt="Linkener" />
    </a>
    <a
      slot="left"
      href="/"
      class={`${!segment || segment === '/' ? 'active' : ''}`}>Login</a>
    <a
      slot="left"
      href="/new-link"
      class={`${segment === 'register' ? 'active' : ''}`}>Register</a>
  </Nav>
{/if}
