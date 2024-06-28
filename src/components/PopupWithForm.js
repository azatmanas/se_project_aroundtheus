import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  close() {
    this._popupForm.reset();
    super.close();
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
    this._popupForm.addEventListiner("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
