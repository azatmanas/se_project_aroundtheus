export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  _handleRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      authToken: this._authToken,
    }).then(this._handleRes);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      authToken: this._authToken,
    }).then(this._handleRes);
  }

  updateProfileInfo({ title, description }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      authToken: this._authToken,
      body: JSON.stringify({
        name: title,
        about: description,
      }),
    }).then(this._handleRes);
  }

  updateAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      authToken: this._authToken,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleRes);
  }

  addCard({ title, url }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      authToken: this._authToken,
      body: JSON.stringify({
        name: title,
        link: url,
      }),
    }).then(this._handleRes);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards ${id}`, {
      method: "DELETE",
      authToken: this._authToken,
    }).then(this._handleRes);
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards ${id}likes`, {
      method: "PUT",
      authToken: this._authToken,
      body: JSON.stringify({
        isLiked: true,
      }),
    }).then(this._handleRes);
  }

  disLikeCard(id) {
    return fetch(`${this._baseUrl}/cards ${id}likes`, {
      method: "DELETE",
      authToken: this._authToken,
      body: JSON.stringify({
        isLiked: false,
      }),
    }).then(this._handleRes);
  }
}
