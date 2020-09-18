<script>
  import { Input } from "svelte-chota";
  import { goto } from "@sapper/app";

  import { register, apiUrlStore, accessTokenStore } from "./_auth.js";

  let apiUrlError = false;
  let usernameError = false;
  let passwordError = false;

  const handleSubmit = async (event) => {
    if (usernameError || passwordError)
      return alert("Please enter a valid username and password");

    apiUrlStore.set(apiUrl.value);
    const { username, password } = event.target;
    const res = await register(username.value, password.value);
    if (res.ok) {
      alert("Succesfully registered!");
      goto("#");
    } else {
      alert("There was an error registering, please try again");
    }
  };

  let password = "";
  let confirmPassword = "";

  const handleValidation = async (event) => {
    const el = event.target;
    if (el.id === "apiUrl") apiUrlError = !el.value;
    else if (el.id === "username") usernameError = !el.value;
    else passwordError = password !== confirmPassword;
  };
</script>

<svelte:head>
	<title>Register | Linkener Admin</title>
</svelte:head>

{#if !$accessTokenStore}
  <form on:submit|preventDefault={handleSubmit} on:input={handleValidation}>
    <Input
      error={apiUrlError}
      value={$apiUrlStore}
      placeholder="API URL (e.g. http://localhost:3000/api/)"
      id="apiUrl"
      name="apiUrl"
      type="url"
      required />
    <Input
      error={usernameError}
      placeholder="Username"
      id="username"
      name="username"
      autocomplete="username"
      required />
    <Input
      error={passwordError}
      bind:value={password}
      password
      placeholder="Password"
      id="password"
      name="password"
      required />
    <Input
      error={passwordError}
      bind:value={confirmPassword}
      password
      placeholder="Confirm password"
      id="confirmPassword"
      name="confirmPassword"
      required />
    <Input type="submit" value="Register" />
  </form>
{:else}
  <p>You are already logged in! Please log out to register a new account</p>
{/if}
