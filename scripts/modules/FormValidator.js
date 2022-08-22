class FormValidator {
  constructor(form, settings) {
    this._form = form;
    this._inputSelector = settings.inputSelector;
    this._inputValidClass = settings.inputValidClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._errorClass = settings.errorClass;
    this._errorSelector = settings.errorSelector;
    this._errorActiveClass = settings.errorActiveClass;
  }

  _hideError(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    input.classList.add(this._inputValidClass);

    errorElement.classList.remove(this._errorActiveClass);
    errorElement.textContent = ".";
  }

  _showError(input, errorElement) {
    input.classList.remove(this._inputValidClass);
    input.classList.add(this._inputErrorClass);

    errorElement.classList.add(this._errorActiveClass);
    errorElement.textContent = input.validationMessage;
  }

  _disableButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _enableButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _inputsAreValid() {
    return this._inputs.every((input) => this._isValid(input));
  }

  _handleNotValid(input, errorElement) {
    this._showError(input, errorElement);
    this._disableButton();
  }

  _handleIsValid(input, errorElement) {
    this._hideError(input, errorElement);
    if (this._inputsAreValid()) {
      this._enableButton();
    }
  }

  _haveSameState(inputsArray) {
    return this._inputs.every((input) => this._hasSameState(input))
  } 

  _hasSameState(input) {
    return input.value === input.placeholder;
  }

  _isValid(input) {
    return input.validity.valid
  }

  _handleInput(input, errorElement) {
    if (this._isValid(input)) {
      this._handleIsValid(input, errorElement);
      if (this._haveSameState(this._inputs)) {
        this._disableButton()
      }
    } else {
      this._handleNotValid(input, errorElement);
    }
  }

  _setEventListeners() {
    this._inputs = [...this._form.querySelectorAll(this._inputSelector)];

    this._inputs.forEach((input) => {
      const errorElement = input.nextElementSibling;
      input.addEventListener("input", () =>
        this._handleInput(input, errorElement)
      );
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => e.preventDefault());
    // we will pass the button element to each input so that we can disable it in the key press event handler
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._setEventListeners();
    this._disableButton();
  }

  _hideAllFormErrors() {
    this._inputs.forEach((input) => {
      const errorElement = input.nextElementSibling;
      this._hideError(input, errorElement);
    });
  }

  resetValidation() {
    this._disableButton();
    this._form.reset();
    this._hideAllFormErrors();
  }
}

export { FormValidator };
