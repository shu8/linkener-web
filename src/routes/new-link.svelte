<script>
  import { goto } from '@sapper/app'

  import { Input } from "svelte-chota";

  import { newShortURL } from "./_api";

  let formError = true;
  const handleSubmit = async (event) => {
    if (formError) return alert("Please ensure your inputs are valid");

    const { url, allowedVisits, slug, slugLength, password } = event.target;
    const data = {
      url: url.value,
      allowed_visits: +allowedVisits.value || 0,
      slug: slug.value,
      slug_length: +slugLength.value || 5,
      password: password.value,
    };

    const res = await newShortURL(data);
    if (res.ok) {
      const newURL = await res.json();
      goto(`/?newURL=${newURL.slug}`);
    } else {
      const text = await res.text();
      alert("There was an error saving the new URL: " + text);
    }
  };

  let urlError = false;
  const handleValidation = async (event) => {
    const el = event.target;
    // URL regex from https://stackoverflow.com/a/8218223
    if (el.id === "url") {
      urlError =
        !el.value ||
        !/(https?):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/.test(
          el.value
        );
    }

    formError = urlError;
  };
</script>

<div class="new-link">
  <form on:submit|preventDefault={handleSubmit} on:input={handleValidation}>
    <Input id="url" type="url" name="url" placeholder="URL" error={urlError} required />
    <Input
      id="slugLength"
      name="slugLength"
      placeholder="Slug length (default 5)"
      number
      default="5"
      min="5"
    />
    <Input
      id="allowedVisits"
      name="allowedVisits"
      placeholder="Maximum visits (optional)"
      number
      min="0" />
    <Input id="slug" name="slug" placeholder="Custom slug (optional)" />
    <Input id="password" name="password" placeholder="Password (optional)" />
    <Input type="submit" value="Save URL" onsubmit={handleSubmit} />
  </form>
</div>
