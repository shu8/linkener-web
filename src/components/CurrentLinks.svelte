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
  {#each urls as url}
    <UrlPanel
      details={url}
      highlight={queryParams.get('newURL') === url.slug} />
  {/each}
{:catch err}
  <p>Error: ${err}</p>
{/await}
