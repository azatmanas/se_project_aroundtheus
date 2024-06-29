import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputValues = this._popupForm.querySelectorAll("modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputValues = {};
    inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
      this._handleFormSubmit(this._getInputValues());
    });
    return this._inputValues;
  }
  setEventListeners() {
    super.setEventListiners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      evt.target.reset();
    });
  }
}
