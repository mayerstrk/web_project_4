const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  inputValidClass: "form__input_valid",
  inputErrorClass: "form__input_error",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  errorClass: "form__error",
  errorSelector: ".form__error",
  errorActiveClass: "form__error_visible",
};


function closeOrReset() {
  const openedModal = document.querySelector(".modal_visible");
  if (openedModal !== cardModal) {
    resetModal(openedModal);
  } else {
    closeModal(openedModal);
  }
}


/**
 * Toggles modal window visibility
 * @param {Element} modal - modal window node to make visible
 */
function openModal(modal) {
  modal.classList.add("modal_visible");
  document.addEventListener("keydown", closeWithEsc);
  modal.addEventListener("mousedown", closeOnClickOut);
  modal.querySelector(".modal__close-button").addEventListener("click", handleCloseButton)
}


/**
 * Toggles modal window visibility
 * @param {Element} modal - modal window node to hide
 */
function closeModal(modal) {
  modal.classList.remove("modal_visible");
  document.removeEventListener("keydown", closeWithEsc);
  modal.removeEventListener("mousedown", closeOnClickOut);
}

function resetModal(modal) {
  closeModal(modal);
  resetValidation(modal);
}

function handleCloseButton(modal) {
  closeOrReset();
}

function closeOnClickOut(evt) {
  if (!(evt.target.closest(".modal__window") || evt.target === ".modal__window")) {
    closeOrReset();
  }
}

function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    closeOrReset();
  }
}
