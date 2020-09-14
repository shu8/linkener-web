<script>
  import { Input, Button } from "svelte-chota";
  import { fade } from "svelte/transition";

  import { updateShortURL, deleteShortURL } from "../routes/_api.js";

  export let details, highlight;

  const { visits, slug, date_created: dateCreated } = details;
  let { url, allowed_visits: allowedVisits } = details;

  let expanded = false;
  let deleted = false;

  let edit = false;
  let editURL = url;
  let editPassword = "";
  let editAllowedVisits = allowedVisits > 0 ? allowedVisits : 0;

  const togglePanel = () => {
    if (!edit) expanded = !expanded;
  };

  const handleDelete = async () => {
    const res = await deleteShortURL(slug);
    if (res.ok) {
      deleted = true;
    } else {
      alert("There was an error deleting this short URL");
    }
  };

  const saveEdit = async () => {
    if (!edit) return toggleEdit();

    const res = await updateShortURL(
      slug,
      editURL,
      editAllowedVisits,
      editPassword
    );

    if (res.ok) {
      if (editURL !== url) {
        url = editURL;
      }

      if (editAllowedVisits !== allowedVisits) {
        allowedVisits = editAllowedVisits;
      }

      toggleEdit();
    } else {
      alert("There was an error updating this short URL");
    }
  };

  const toggleEdit = () => (edit = !edit);
</script>

<style>
  .url-panel {
    margin: 1rem;
    padding: 1rem 2rem;
    border-radius: 4px;
    background: var(--bg-color);
    border: 1px solid lightgray;
  }

  .url-panel.highlighted {
    animation-name: temp-highlight;
    animation-duration: 6s;
  }

  .long-url {
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .expanded .actions {
    text-align: right;
  }

  @keyframes temp-highlight {
    from {
      background: pink;
    }
    to {
      background: unset;
    }
  }
</style>

{#if !deleted}
  <div
    out:fade|local={{ duration: 1000 }}
    class={`url-panel ${highlight ? 'highlighted' : ''} ${deleted ? 'deleted' : ''}`}>
    <div class="long-url" on:click={togglePanel}>
      <span class="url">
        {#if edit}
          <Input bind:value={editURL} />
        {:else}{url}{/if}
      </span>
      <span class="visits">
        Visits: {visits.length}/{#if edit}
          <Input
            bind:value={editAllowedVisits}
            number
            style="width:4em;display:inline;margin-left:5px;" />
        {:else}
          {#if allowedVisits > 0}{allowedVisits}{:else}&infin;{/if}
        {/if}
      </span>
    </div>
    {#if expanded}
      <div class="expanded">
        {#if edit}
          <Input
            password
            bind:value={editPassword}
            placeholder="New password"
            style="width:fit-content;margin-top:5px;" />
        {/if}
        <span><i>Created on: {new Date(dateCreated).toLocaleString()}</i></span>
        <br />
        <span><i>Slug: {slug}</i></span>
        <div class="actions">
          <Button secondary on:click={saveEdit}>
            {edit ? 'Save' : 'Edit'}
          </Button>
          {#if edit}
            <Button error on:click={toggleEdit}>Cancel</Button>
          {:else}
            <Button error on:click={handleDelete}>Delete</Button>
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/if}
