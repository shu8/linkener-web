import { writable, get } from 'svelte/store';
import { goto } from '@sapper/app'

let logout, login, register, updatePassword, accessTokenStore, apiUrlStore;

if (typeof window === 'object') {
  const username = sessionStorage.getItem('username');
  const usernameStore = writable(username || null);

  usernameStore.subscribe(value => value
    ? sessionStorage.setItem('username', value)
    : sessionStorage.removeItem('username')
  );

  const accessToken = sessionStorage.getItem('accessToken');
  accessTokenStore = writable(accessToken || null);

  accessTokenStore.subscribe(value => value
    ? sessionStorage.setItem('accessToken', value)
    : sessionStorage.removeItem('accessToken')
  );

  const apiUrl = sessionStorage.getItem('apiUrl');
  apiUrlStore = writable(apiUrl || null);

  apiUrlStore.subscribe(value => value
    ? sessionStorage.setItem('apiUrl', value)
    : sessionStorage.removeItem('apiUrl')
  );

  logout = () => {
    usernameStore.set(null);
    accessTokenStore.set(null);
    apiUrlStore.set(null);
    goto('/');
  }

  login = async (username, password) => {
    try {
      const res = await fetch(`${get(apiUrlStore)}auth/new_token`, {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const text = await res.text();
      if (res.ok) {
        accessTokenStore.set(text);
        usernameStore.set(username);
        return text;
      } else {
        throw text;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  register = async (username, password) => {
    return await fetch(`${get(apiUrlStore)}auth/users`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  updatePassword = async (password) => {
    const username = get(usernameStore);
    return await fetch(`${get(apiUrlStore)}auth/users/${username}`, {
      method: 'PUT',
      body: JSON.stringify({
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': get(accessToken),
      },
    });
  }
}

export {
  logout, login, register, updatePassword, accessTokenStore, apiUrlStore,
};
