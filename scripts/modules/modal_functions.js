/**
 * Toggles modal window visibility
 * @param {Element} modal - modal window node to make visible
 */
function openModal(modal) {
  modal.classList.add("modal_visible");
}

function initModal(modal) {
  if (modal !== cardModal){
    enableValidation(); 
  };
  openModal(modal);
  addCloseModalListeners(modal)
}

/**
 * Toggles modal window visibility
 * @param {Element} modal - modal window node to hide
 */
function closeModal(modal) {
  modal.classList.remove("modal_visible")
}

function resetModal(modal) {
  closeModal(modal);
  if (modal !== cardModal) {
    resetValidation(modal);
  } else {}
}

function addCloseButtonListener(modal) {
  closeButton = modal.querySelector(".modal__close-button")
  closeButton.addEventListener("click", () =>
    resetModal(modal)
  );
}

function addClickOutEventListeners(modal, modalWindow) {
  modal.addEventListener("click", (evt) => {
    if(!modalWindow.contains(evt.target)) {
      resetModal(modal);
    }
})}

function addEscEventListener(modal) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      resetModal(modal);
    }
  });
}

function addCloseModalListeners(modal) {
  const modalWindow = modal.querySelector(".modal__window")
  addClickOutEventListeners(modal, modalWindow);
  addCloseButtonListener(modal);
  addEscEventListener(modal)
}

