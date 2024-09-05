import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form-delete");
    this._modalDeleteButton = this._popupElement.querySelector(
      ".modal__button_delete"
    );
    this._handleFormSubmit = handleFormSubmit;
  }

  setSubmit(handleSubmit) {
    this._handleFormSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._modalDeleteButton.textContent = "Delete...";
    } else {
      this._modalDeleteButton.textContent = "Yes";
    }
  }
}
