export default class UserInfo {
  constructor({ titleSelector, descriptionSelector, avatar }) {
    this._profileName = document.querySelector(titleSelector);
    this._profileDescrption = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatar);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescrption.textContent,
      avatar: this._avatar.src,
    };
  }
  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileDescrption.textContent = about;
  }

  updateAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
