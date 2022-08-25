/**
 * Toggles modal window visibility
 * @param {Element} modal - modal window node to make visible
 */
function openModal(modal) {
  modal.classList.add("modal_visible");
  document.addEventListener("keydown", closeWithEsc);
  modal.addEventListener("mousedown", closeOnClickOut);
  modal
    .querySelector(".modal__close-button")
    .addEventListener("click", handleCloseButton);
}

/**
 * Toggles modal window visibility
 * @param {Element} modal - modal window node to hide
 */
function closeModal(modal) {
  modal.classList.remove("modal_visible");
  document.removeEventListener("keydown", closeWithEsc);
  modal.removeEventListener("mousedown", closeOnClickOut);
  modal
    .querySelector(".modal__close-button")
    .removeEventListener("click", handleCloseButton);
}

function handleCloseButton() {
  const openedModal = document.querySelector(".modal_visible");
  closeModal(openedModal);
}

function closeOnClickOut(evt) {
  if (
    !(evt.target.closest(".modal__window") || evt.target.classList.contains("modal__window"))
  ) {
    const openedModal = document.querySelector(".modal_visible");
    closeModal(openedModal);
  }
}

function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_visible");
    closeModal(openedModal);
  }
}

function resetValidation(formValidator) {
  formValidator.resetValidation();
}

export {
  openModal,
  closeModal,
  handleCloseButton,
  closeOnClickOut,
  closeWithEsc,
  resetValidation,
};
