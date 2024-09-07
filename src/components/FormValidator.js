export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._element = formElement;
  }

  _showInputError(inputElement) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton(
        this._element.submitButton,
        this._element.inactiveButtonClass
      );

      return;
    }

    this._enableButton(
      this._element.submitButton,
      this._element.inactiveButtonClass
    );
  }

  _setEventListiners() {
    this._inputEls = [...this._element.querySelectorAll(this._inputSelector)];
    this._submitButton = this._element.querySelector(
      this._submitButtonSelector
    );

    this._inputEls.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  enableValidation() {
    this._element.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListiners();
  }

  resetValidation() {
    const inputList = this._element.querySelectorAll(".modal__input");
    inputList.forEach((input) => {
      this._hideInputError(input);
      this._toggleButtonState();
    });
  }
}
