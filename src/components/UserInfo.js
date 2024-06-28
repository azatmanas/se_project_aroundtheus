export default class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescrption = document.querySelector(descriptionSelector);
  }
  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      description: this._profileDescrption.textContent,
    };
  }
  setUserInfo(data) {
    this._profileTitle.textContent = data.profileTitle;
    this._profileDescrption.textContent = data.description;
  }
}
