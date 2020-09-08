<script>
  import { Input } from "svelte-chota";

  import { login } from "../routes/_auth.js";

  const handleSubmit = async (event) => {
    const { username, password } = event.target;
    const token = await login(username.value, password.value);
    if (token === null) {
      return alert("Failed to login, please try again");
    }
  };

  let usernameError = false;
  let passwordError = false;
  const handleValidation = async (event) => {
    const el = event.target;
    if (el.id === "password") passwordError = !el.value;
    else if (el.id === "username") usernameError = !el.value;
  };
</script>

<form on:submit|preventDefault={handleSubmit} on:input={handleValidation}>
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
