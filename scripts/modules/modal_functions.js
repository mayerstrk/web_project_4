const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  inputValidClass: "form__input_valid",
  inputErrorClass: "form__input_error",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  errorClass: "form__error",
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
  modal.addEventListener("mousedown", (evt) => closeOnClickOut(evt, modal))
}

function initModal(modal) {
  openModal(modal);
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

function addCloseButtonListener(modal) {
  closeButton = modal.querySelector(".modal__close-button");
  closeButton.addEventListener("click", () => resetModal(modal));
}

function closeOnClickOut(evt, modal) {
  const modalWindow = modal.querySelector(".modal__window");
  if (!modalWindow.contains(evt.target)) {
    closeOrReset();
  }
}

function closeWithEsc(evt) {
  if (evt.key === "Escape") {
  closeOrReset();
  }
}
