<script>
  import { Input } from "svelte-chota";
  import { goto } from '@sapper/app'

  import { updatePassword, accessTokenStore } from "./_auth.js";

  let passwordError = true;

  const handleSubmit = async (event) => {
    if (passwordError) return alert("Please make sure your passwords match");

    const { password } = event.target;
    const res = await updatePassword(password.value);
    if (res.ok) {
      alert("Successfully changed password!");
      goto("#");
    } else {
      alert("Failed to update password, please try again");
    }
  };

  let password = "";
  let confirmPassword = "";

  const handleValidation = async () =>
    (passwordError = password !== confirmPassword);
</script>

<svelte:head>
	<title>Settings | Linkener Admin</title>
</svelte:head>

{#if $accessTokenStore}
  <div>
    If you want to update your password, please use the form below. <br />
    <br />
    <form on:submit|preventDefault={handleSubmit} on:input={handleValidation}>
      <Input
        bind:value={password}
        id="password"
        name="password"
        required
        password
        autocomplete="new-password"
        error={passwordError}
        placeholder="New password" />
      <Input
        bind:value={confirmPassword}
        id="confirmPassword"
        name="confirmPassword"
        required
        password
        autocomplete="new-password"
        error={passwordError}
        placeholder="Confirm password" />
      <Input type="submit" value="Update password" />
    </form>
  </div>
{:else}
  <p>You need to be logged in to change your settings.</p>
{/if}
