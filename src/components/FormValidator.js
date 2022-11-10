import { userInfoSettings } from "../utils/constants";

export default class FormValidator {
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

  replaceButtonText() {
    this._buttonElement.textContent = "Saving..."
  }

  disableButton(dontApplyClass) {
    this._buttonElement.disabled = true;
    if (!dontApplyClass){this._buttonElement.classList.add(this._inactiveButtonClass)}
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
    this.disableButton();
  }

  _handleIsValid(input, errorElement) {
    this._hideError(input, errorElement);
    if (this._inputsAreValid()) {
      this._enableButton();
    }
  }

  _haveSameState() {
    return this._inputs.every((input) => this._hasSameState(input));
  }

  _hasSameState() {
    return this._currentStates.every(
      (val, i) => val === this._updatedStates[i]
    );
  }

  _isValid(input) {
    return input.validity.valid;
  }

  _handleInput(input, errorElement) {
    this._updatedStates = this._inputs.map((input) => input.value);
    if (this._isValid(input)) {
      this._handleIsValid(input, errorElement);
      if (this._haveSameState(this._inputs)) {
        this.disableButton();
      }
    } else {
      this._handleNotValid(input, errorElement);
    }
  }

  updateCurrentStates() {
    this._currentStates = this._inputs.map((input) => input.value);
  }

  _initializeInputs() {
    this._inputs = [...this._form.querySelectorAll(this._inputSelector)];
  }

  _initializeCurrentStates() {
    this._currentStates = this._inputs.map((input) => input.value);
  }

  _setEventListeners() {
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
    this._initializeInputs();
    this._initializeCurrentStates();
    this._setEventListeners();
    this.disableButton();
  }

  _hideAllFormErrors() {
    this._inputs.forEach((input) => {
      const errorElement = input.nextElementSibling;
      this._hideError(input, errorElement);
    });
  }

  resetValidation() {
    this.disableButton();
    this._form.reset();
    this._hideAllFormErrors();
  }
}
