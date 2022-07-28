class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._headers = {
      'Content-type': 'application/json',
      authorization: this._token
    }
  }

  _сheckServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
      method: 'GET'
    })
    .then(this._сheckServerResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name, about })
    })
    .then(this._сheckServerResponse);
  }

  setUserAvatar(url) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(url)
    })
    .then(this._сheckServerResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
      method: 'GET'
    })
    .then(this._сheckServerResponse);
  }

  setCard({ link, name }) {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ link: link, name: name })
    })
    .then(this._сheckServerResponse);
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}cards/${_id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then(this._сheckServerResponse);
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      headers: this._headers,
      method: isLiked ? 'PUT' : 'DELETE'
    })
    .then(this._сheckServerResponse);
  }
}

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-43/',
  'db177002-d58e-42cc-a0cb-65827554d6b2'
);

export default api;