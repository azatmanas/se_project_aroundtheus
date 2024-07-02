import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImageModal = this._popupElement.querySelector(".modal__image");
    this._previewImageEl = this._popupElement.querySelector(
      ".modal__text-preview"
    );
  }

  open(data) {
    this._previewImageEl.textContent = data.name;
    this._previewImageModal.src = data.link;
    this._previewImageModal.alt = data.name;
    super.open();
  }
}
