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
  }

  _getInputValues() {
    const formValues = {};
    this._inputValues.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  reset() {
    const formValues = {};
    this._inputValues.forEach((input) => {
      input.value = "";
      formValues[input.name] = "";
    });
    return formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._modalSubmitButton.textContent = "Saving...";
    } else {
      this._modalSubmitButton.textContent = "Save";
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
