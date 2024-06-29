export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButtons = document.querySelector(".modal_close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      const modalOpen = document.querySelector(".modal_opened");
      this.close(modalOpen);
    }

    _handleOverLayClick = (event) => {
      if (event.target.classList.includes("modal_opened")) {
        this.close(event.target);
      }
    };
  }

  setEventListiners() {
    this._closeButtons.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("click", () => {
      this._handleOverLayClick();
    });
  }
}
