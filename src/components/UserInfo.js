export default class UserInfo {
  constructor({ titleSelector, descriptionSelector, avatar }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescrption = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatar);
  }
  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      description: this._profileDescrption.textContent,
      avatar: this._avatar.src,
    };
  }
  setUserInfo(data) {
    this._profileTitle.textContent = data.title;
    this._profileDescrption.textContent = data.description;
  }

  updateProfileImage(avatar) {
    this._avatar.src = avatar;
  }
}
