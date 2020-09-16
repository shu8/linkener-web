<script>
  import { goto } from '@sapper/app'

  import { Input, Field } from "svelte-chota";

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

<svelte:head>
	<title>New Link | Linkener Admin</title>
</svelte:head>

<div class="new-link">
  <form on:submit|preventDefault={handleSubmit} on:input={handleValidation}>
    <Field label="URL">
      <Input id="url" type="url" name="url" placeholder="e.g. https://doma.in/long-scary-url-X45m-2ng8a-nw4" error={urlError} required />
    </Field>
    <Field label="Slug length (default 5)">
      <Input
        id="slugLength"
        name="slugLength"
        placeholder="e.g. 5"
        number
        default="5"
        min="5"
      />
    </Field>
    <Field label="Maximum visits (optional)">
      <Input
        id="allowedVisits"
        name="allowedVisits"
        placeholder="e.g. 100"
        number
        min="0" />
    </Field>
    <Field label="Custom slug (optional)">
      <Input id="slug" name="slug" placeholder="e.g. blog" />
    </Field>
    <Field label="Password (optional)">
      <Input password id="password" name="password" placeholder="e.g. supersecretpassword" />
    </Field>
    <Input type="submit" value="Save URL" onsubmit={handleSubmit} />
  </form>
</div>
