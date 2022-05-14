function showInputError(inputElement, inputError, errorMessage, config) {
  inputElement.classList.remove(config.inputValidClass);
  inputElement.classList.add(config.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(config.errorActiveClass);
}

function hideInputError(inputElement, inputError, config) {
  inputElement.classList.remove(config.inputErrorClass);
  inputElement.classList.add(config.inputValidClass);
  inputError.classList.remove(config.errorActiveClass);
  inputError.textContent = ".";
}

const isValid = (inputElement, config) => {
  const inputError = inputElement.parentElement.querySelector(`.form__error_type_${inputElement.name}`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputError, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, inputError, config);
  }
};

const hasInvalidInput = (inputElements) => {
  // iterate over the array using the some() method
  return inputElements.some((inputElement) => {
    // If the field is invalid, the callback will return true.
    // The method will then stop, and hasInvalidInput() function will return true
    // hasInvalidInput returns true

    return !inputElement.validity.valid;
  });
};

const haveSameState = (inputElements, inputValues) => {
  if (inputElements && inputValues) {
    return inputValues.every((value) => {
      return inputElements.includes(value);
    });
  }
};

const disableButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};

const enableButton = (button, config) => {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
};

const toggleButtonState = (inputElements, buttonElement, currentStates, inputStates, config) => {
  // If there is at least one invalid input
  if (
    hasInvalidInput(inputElements) ||
    haveSameState(currentStates, inputStates)
  ) {
    // make the button inactive
    disableButton(buttonElement, config);
  } else {
    // otherwise, make it active
    enableButton(buttonElement, config);
  }
};

function setEventListeners(inputElements, buttonElement, config) {
  inputElements.forEach((inputElement) => {
    const currentStates = [];
    inputElements.forEach((inputElement) =>
      currentStates.push(inputElement.value)
    );
    inputElement.addEventListener("input", () => {
      isValid(inputElement, config);
      const inputStates = [];
      inputElements.forEach((inputElement) =>
        inputStates.push(inputElement.value)
      );
      toggleButtonState(inputElements, buttonElement, currentStates, inputStates, config);
    });
  });
}

function enableValidation(config) {
  forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    const inputElements = Array.from(
      form.querySelectorAll(config.inputSelector)
    );
    const buttonElement = form.querySelector(config.submitButtonSelector);
    disableButton(buttonElement, config);
    setEventListeners(inputElements, buttonElement, config);
  });
}

function resetValidation(modal) {
  const modalForm = modal.querySelector(".form");
  modalForm.reset();
  const buttonElement = modalForm.querySelector(".form__button");
  disableButton(buttonElement, config);
  const inputElements = Array.from(
    modalForm.querySelectorAll(".form__input")
  );
  inputElements.forEach((inputElement) => {
    const inputError = inputElement.parentElement.querySelector(
      ".form__error"
    );
    hideInputError(inputElement, inputError, config);
  });
}
