export const BASE_URL = 'https://auth.nomoreparties.co';

const headers = {
  'Content-Type': 'application/json'
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  .then(res => checkResponse(res));
}
export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  .then(res => checkResponse(res));
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`,
    },
    method: 'GET'
  })
  .then(res => checkResponse(res));
}
