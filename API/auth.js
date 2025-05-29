import { URL } from './connection'

export const checkToken = async (token) => {
  const res = await fetch(`${URL}/token`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

export const logout = async (token) => {
  const res = await fetch(`${URL}/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

export const login = async (body) => {
  console.log('hey3')
  const res = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body),
  });
  console.log(res)
  return await res.json();
};

export const changePassword = async (id, body, token) => {
  const res = await fetch(`${URL}/changepassword/${id}?_method=PATCH`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(body),
  });
  return await res.json();
};

export const register = async (body, token) => {
  const res = await fetch(`${URL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-type':'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};