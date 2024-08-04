export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
    this._headers = {
      authorization: this._authToken,
      "Content-Type": "application/json",
    };
  }

  _handleRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    }).then(this._handleRes);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleRes);
  }

  getAll() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateProfileInfo(cardId) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
      },
      body: JSON.stringify({
        name: userData.title,
        about: userData.description,
      }),
    }).then(this._handleRes);
  }

  updateAvatar({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      authToken: this._authToken,
      body: JSON.stringify(link),
    }).then(this._handleRes);
  }

  addCard({ name, link, _id }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      authToken: this._authToken,
      body: JSON.stringify({ name, link, _id }),
    }).then(this._handleRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards ${cardId}`, {
      method: "DELETE",
      authToken: this._authToken,
    }).then(this._handleRes);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards ${cardId}likes`, {
      method: "PUT",
      authToken: this._authToken,
      body: JSON.stringify({
        isLiked: true,
      }),
    }).then(this._handleRes);
  }

  disLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards ${cardId}likes`, {
      method: "DELETE",
      authToken: this._authToken,
      body: JSON.stringify({
        isLiked: false,
      }),
    }).then(this._handleRes);
  }
}
