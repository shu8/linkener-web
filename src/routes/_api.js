import { get } from 'svelte/store';
import { accessTokenStore, logout, apiUrlStore } from './_auth.js';

const handleRes = res => {
  if (!res.ok && res.status === 401) {
    logout();
  }

  return res;
}

export const fetchShortURLs = async () => {
  const res = await fetch(`${get(apiUrlStore)}urls/`, {
    headers: { 'Authorization': get(accessTokenStore) }
  });

  return handleRes(res);
};

export const newShortURL = async (data) => {
  const res = await fetch(`${get(apiUrlStore)}urls/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': get(accessTokenStore),
    },
  });

  return handleRes(res);
};

export const updateShortURL = async (slug, newURL, allowedVisits, password) => {
  const body = {};
  if (newURL) body.url = newURL;
  if (allowedVisits) body.allowed_visits = allowedVisits;
  if (typeof password !== 'undefined') body.password = password;
  if (!Object.keys(body).length) return null;

  const res = await fetch(`${get(apiUrlStore)}urls/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': get(accessTokenStore),
    },
  });

  return handleRes(res);
};

export const deleteShortURL = async (slug) => {
  const res = await fetch(`${get(apiUrlStore)}urls/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': get(accessTokenStore),
    },
  });

  return handleRes(res);
};
