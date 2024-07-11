export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._authToken,
          "Content-Type": "application/json",
        },
      });
      return await (res.ok
        ? res.json()
        : Promise.reject(`Error: ${res.status}`));
    } catch (err) {
      console.error(err);
    }
  }

  async getUserInfo() {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._authToken,
          "Content-Type": "application/json",
        },
      });
      return await (res.ok
        ? res.json()
        : Promise.reject(`Error: ${res.status}`));
    } catch (err) {
      console.error(err);
    }
  }

  addCard({ name, link }) {
    fetch(`${this._baseUrl} users/me`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    });
  }
}
