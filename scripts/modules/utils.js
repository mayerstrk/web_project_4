import {Card} from "./Card.js";
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
    !(evt.target.closest(".modal__window") || evt.target === ".modal__window")
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

function getCardModalFields(cardModal) {
  const cardModalFields = {
    cardModalPhoto: cardModal.querySelector(".card-modal__photo"),
    cardModalPhotoCaption: cardModal.querySelector(".card-modal__photo-caption"),
  }

  return cardModalFields
}


function getCardModalValues(cardPhoto) {
  const modalValues = {
    sourceValue: cardPhoto.getAttribute("src"),
    captionText: cardPhoto.parentElement.nextElementSibling.firstElementChild.textContent,
  };

  return modalValues
}

function setCardModalValues(cardPhoto, cardModal) {
  const { sourceValue, captionText } = getCardModalValues(cardPhoto);
  const { cardModalPhoto, cardModalPhotoCaption } = getCardModalFields(cardModal);
  
  cardModalPhoto.setAttribute("src", sourceValue);
  cardModalPhoto.setAttribute("alt", `Photo of ${captionText}`);
  cardModalPhotoCaption.textContent = captionText;
}

function renderCardModal(cardPhoto, cardModal) {
  // 1 Gets appropiate values
  setCardModalValues(cardPhoto, cardModal)
  // 2 Calls the openModal function from modal_functions.js to toggle modal window visibility
  openModal(cardModal)
};

function resetValidation(formValidator) {
  formValidator.resetValidation();
}

/** 
 * 1. creates a card object
 * 2. creates a card element
 * 3. closes modal window on form submit
 * 4. resets form
 * @param {Event} evt - Submit event
 */ 
function handleAddSubmit(evt, cardsContainer) {
  //prevents default submit handling  
  evt.preventDefault();

  /* 1.
  Creates card abjects with name and link properties according 
  to user input */
  const newCard = new Card(inputTitle.value, inputURL.value);
  newCard.render(cardsContainer);
  
  /* 3.
  closes modal after card is added */
  closeModal(addCardModal);

  /* 4.
  resets form */
  formTypeAdd.reset() 
}

function addAddEventListeners(formValidator, cardsContainer, form) {
  const addButton = document.querySelector(".profile__add-button")
  const addCardModal = document.querySelector(".modal_type_add")
  // Adds event listeners for the add button and the close button in the modal
  addButton.addEventListener("click", () => {
    openModal(addCardModal);
    resetValidation(formValidator);
  });

  // Specifies submit handler for the modal form
  form.addEventListener("submit", (e) => handleAddSubmit(e, cardsContainer))
}


export {
  openModal,
  closeModal,
  handleCloseButton,
  closeOnClickOut,
  closeWithEsc,
  resetValidation,
  renderCardModal,
  handleAddSubmit
};
