import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputValues = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    this._handleFormSubmit = handleFormSubmit;
    this._modalSubmitButton =
      this._popupElement.querySelector(".modal__button");
    this._buttonText = this._modalSubmitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputValues.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._modalSubmitButton.textContent = loadingText;
    } else {
      this._modalSubmitButton.textContent = this._buttonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
