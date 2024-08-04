export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleCardLike,
    handleCardDisLike
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._isLiked = cardData.isLiked;
    this._id = cardData._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDisLike = handleCardDisLike;
  }

  _setEventListener() {
    this.getView(".card__like-button").addEventListener("click", () => {
      this._handleLikeButton();
    });

    this.getView(".card__delete-button").addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeButton() {
    this.getView(".card__like-button").classList.toggle(
      "card__like-button_active"
    );
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListener();
    return this._cardElement;
  }

  getView(className) {
    return this._cardElement.querySelector(className);
  }
}
