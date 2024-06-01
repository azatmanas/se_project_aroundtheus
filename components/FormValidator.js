export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._element = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.remove(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    hideInputError(inputElement);
  }

  _hasInvalidInput() {
    return !this._inputSelector.every((inputEl) => inputEl.validity.valid);
  }

  toggleButtonState() {
    if (hasInvalidInput()) {
      this._disabledButton(
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
    const inputEls = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._element.querySelector(
      this._submitButtonSelector
    );

    inputEls.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(this._element, inputElement, options);
        toggleButtonState(inputEls, submitButton, inactiveButtonClass);
      });
    });
  }

  enableValidation() {
    this._element.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListiners();
  }
}
