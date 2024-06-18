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
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _hasInvalidInput() {
    console.log();
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton(
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

  _disableButton() {
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
}
