forms = Array.from(document.querySelectorAll(config.formSelector));

function showInputError(inputElement, inputError, errorMessage) {
  inputElement.classList.remove(config.inputValidClass);
  inputElement.classList.add(config.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(config.errorActiveClass);
}

function hideInputError(inputElement, inputError) {
  inputElement.classList.remove(config.inputErrorClass);
  inputElement.classList.add(config.inputValidClass);
  inputError.classList.remove(config.errorActiveClass);
  inputError.textContent = ".";
}

const isValid = (inputElement) => {
  const inputError = inputElement.parentElement.querySelector(
    `.form__error_type_${inputElement.name}`
  );

  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputError, inputElement.validationMessage);
  } else {
    hideInputError(inputElement, inputError);
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

const disableButton = (button) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};

const enableButton = (button) => {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
};

const toggleButtonState = (
  inputElements,
  buttonElement,
  currentStates,
  inputStates
) => {
  // If there is at least one invalid input
  if (
    hasInvalidInput(inputElements) ||
    haveSameState(currentStates, inputStates)
  ) {
    // make the button inactive
    disableButton(buttonElement);
  } else {
    // otherwise, make it active
    enableButton(buttonElement);
  }
};

function setEventListeners(inputElements, buttonElement) {
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement);
      getProfileCurrentStates();
      const inputStates = [];
      inputElements.forEach((inputElement) =>
        inputStates.push(inputElement.value)
      );
      toggleButtonState(
        inputElements,
        buttonElement,
        profileCurrentStates,
        inputStates
      );
    });
  });
}

function enableValidation() {
  forms.forEach((form) => {
    const inputElements = Array.from(
      form.querySelectorAll(config.inputSelector)
    );
    const buttonElement = form.querySelector(config.submitButtonSelector);
    disableButton(buttonElement);
    setEventListeners(inputElements, buttonElement);
  });
}

function resetValidation(modal) {
  const modalForm = modal.querySelector(config.formSelector);
  const buttonElement = modalForm.querySelector(config.submitButtonSelector);
  disableButton(buttonElement);
  const inputElements = Array.from(
    modalForm.querySelectorAll(config.inputSelector)
  );
  inputElements.forEach((inputElement) => {
    const inputError = inputElement.parentElement.querySelector(
      config.errorSelector
    );
    hideInputError(inputElement, inputError);
  });
  modalForm.reset();
}

let profileCurrentStates = [];

function getProfileCurrentStates() {
  profileCurrentStates = [];
  profileCurrentStates.push(profileName.textContent, profileAbout.textContent);
}
