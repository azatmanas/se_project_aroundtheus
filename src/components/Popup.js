export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = document.querySelector(".modal_close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleOverLayClick);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleOverLayClick);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      // const modalOpen = document.querySelector(".modal_opened");
      this.close();
    }

    _handleOverLayClick = (event) => {
      if (event.target.classList.includes("modal_opened")) {
        this.close(event.target);
      }
    };
  }

  setEventListiners() {
    this._closeButton.addEventListener("click", () => this.close());
  }
}
