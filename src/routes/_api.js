import { get } from 'svelte/store';
import { accessToken, logout } from './_auth.js';
import { API_URL } from './_constants.js';

const handleRes = res => {
  if (!res.ok && res.status === 401) {
    logout();
  }

  return res;
}

export const fetchShortURLs = async () => {
  const res = await fetch(`${API_URL}urls/`, {
    headers: { 'Authorization': get(accessToken) }
  });

  return handleRes(res);
};

export const newShortURL = async (data) => {
  const res = await fetch(`${API_URL}urls/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': get(accessToken),
    },
  });

  return handleRes(res);
};

export const updateShortURL = async (slug, newURL, allowedVisits, password) => {
  const res = await fetch(`${API_URL}urls/${slug}`, {
    method: 'PUT',
    body: JSON.stringify({
      url: newURL,
      allowed_visits: allowedVisits,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': get(accessToken),
    },
  });

  return handleRes(res);
};

export const deleteShortURL = async (slug) => {
  const res = await fetch(`${API_URL}urls/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': get(accessToken),
    },
  });

  return handleRes(res);
};
