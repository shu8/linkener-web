<script>
  import { Input } from "svelte-chota";

  import { login, apiUrlStore } from "../routes/_auth.js";

  const handleSubmit = async (event) => {
    const { apiUrl, username, password } = event.target;
    apiUrlStore.set(apiUrl.value);

    const token = await login(username.value, password.value);
    if (token === null) {
      return alert("Failed to login, please try again");
    }
  };

  let apiUrlError = false;
  let usernameError = false;
  let passwordError = false;
  const handleValidation = async (event) => {
    const el = event.target;

    if (el.id === "apiUrl") apiUrlError = !el.value;
    else if (el.id === "password") passwordError = !el.value;
    else if (el.id === "username") usernameError = !el.value;
  };
</script>

Please login with the form below, or register <a href="register">here</a>.
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
    password
    placeholder="Password"
    id="password"
    name="password"
    autocomplete="current-password"
    required />
  <Input type="submit" value="Login" />
</form>
