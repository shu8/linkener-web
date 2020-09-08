import { writable, get } from 'svelte/store';
import { goto } from '@sapper/app'
import { API_URL } from './_constants.js';

let logout, login, register, updatePassword, accessToken;

if (typeof window === 'object') {
  const username = sessionStorage.getItem('username');
  const usernameStore = writable(username || null);

  usernameStore.subscribe(value => value
    ? sessionStorage.setItem('username', value)
    : sessionStorage.removeItem('username')
  );

  const token = sessionStorage.getItem('accessToken');
  const tokenStore = writable(token || null);

  tokenStore.subscribe(value => value
    ? sessionStorage.setItem('accessToken', value)
    : sessionStorage.removeItem('accessToken')
  );

  logout = () => {
    usernameStore.set(null);
    tokenStore.set(null);
    goto('/');
  }

  login = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}auth/new_token`, {
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
        tokenStore.set(text);
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
    return await fetch(`${API_URL}auth/users`, {
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
    return await fetch(`${API_URL}auth/users/${username}`, {
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

  accessToken = tokenStore;
}

export {
  logout, login, register, updatePassword, accessToken,
};
