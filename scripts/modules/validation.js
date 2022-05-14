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

const sameState = (inputElements, inputValues) => {
  return inputValues.every((value) => {
    return inputElements.includes(value);
  });
};

const toggleButtonState = (
  inputElements,
  currentStates,
  inputStates,
  buttonElement
) => {
  // If there is at least one invalid input
  if (hasInvalidInput(inputElements) || sameState(currentStates, inputStates)) {
    // make the button inactive
    buttonElement.classList.add("form__button_inactive");
    buttonElement.disabled = true;
  } else {
    // otherwise, make it active
    buttonElement.classList.remove("form__button_inactive");
    buttonElement.disabled = false;
  }
};

function setEventListeners(inputElements, buttonElement) {
  inputElements.forEach((inputElement) => {
    const currentStates = [];
    let inputStates = [];
    inputElements.forEach((inputElement) =>
      currentStates.push(inputElement.value)
    );
    inputElement.addEventListener("input", () => {
      isValid(inputElement);
      inputStates = [];
      inputElements.forEach((inputElement) =>
        inputStates.push(inputElement.value)
      );
      toggleButtonState(
        inputElements,
        currentStates,
        inputStates,
        buttonElement
      );
    });
  });
}

function enableValidation(config) {
  forms.forEach((form) => {
    const inputElements = Array.from(form.querySelectorAll(".form__input"));
    const buttonElement = form.querySelector(".form__button");
    buttonElement.classList.add("form__button_inactive");
    buttonElement.disabled = true;
    setEventListeners(inputElements, buttonElement);
  });
}

function resetValidation(modal) {
  const modalForm = modal.querySelector(config.formSelector);
  const buttonElement = modalForm.querySelector(".form__button");
  buttonElement.classList.add("form__button_inactive");
  const inputElements = Array.from(modalForm.querySelectorAll(".form__input"));
  inputElements.forEach((inputElement) => {
    const inputError = inputElement.parentElement.querySelector(".form__error");
    hideInputError(inputElement, inputError);
  });
  modalForm.reset();
}
