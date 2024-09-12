export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleLikeClicks,
    handleCardDelete
  ) {
    this._name = data.name;
    this._link = data.link;
    this.isLiked = data.isLiked;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClicks = handleLikeClicks;
  }

  _setEventListener() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClicks(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  deleteCardFromDom() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this.getCardElement();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListener();
    this._renderLikes();
    return this._cardElement;
  }
}
