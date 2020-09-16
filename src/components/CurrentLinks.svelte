<script>
  import { fetchShortURLs } from "../routes/_api";

  import UrlPanel from "../components/URLPanel.svelte";

  const queryParams = new URL(document.location).searchParams;

  const res = fetchShortURLs()
    .then((res) => res.json())
    .then((urls) =>
      urls.sort(
        (a, b) =>
          new Date(b.date_created).getTime() -
          new Date(a.date_created).getTime()
      )
    );
</script>

{#await res}
  <p>Loading...</p>
{:then urls}
  {#if !urls.length}
    <p>
      This Linkener instance has no Short URLs yet! Do you want to <a href="/new-link">make one now?</a>
    </p>
  {:else}
    {#each urls as url}
      <UrlPanel
        details={url}
        highlight={queryParams.get('newURL') === url.slug} />
    {/each}
  {/if}
{:catch err}
  <p>Error: Failed to fetch URLs, check the console for more information!</p>
{/await}
