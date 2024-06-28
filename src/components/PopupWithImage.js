import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImageModal = this._popupElement.querySelector("#modal__image");

    this._previewImageEl = this._popupElement.querySelector(
      ".modal__text-preview"
    );
  }

  open(name, link) {
    previewTextEl.textContent = name;
    previewImageEl.src = link;
    previewImageEl.alt = name;
    super.open();
  }
}
