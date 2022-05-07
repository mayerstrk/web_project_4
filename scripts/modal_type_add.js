const addCardModal = document.querySelector(".modal_type_add");
const formWindowTypeAdd = document.querySelector(".modal__form-window_type_add")
const formTypeAdd = document.querySelector(".form_type_add")
const addButton = document.querySelector(".profile__add-button")
const closeButtonForAdd = addCardModal.querySelector(".modal__close-button_for_add-form");
const inputTitle = formWindowTypeAdd.querySelector(".form__input_type_title");
const inputURL = formWindowTypeAdd.querySelector(".form__input_type_url")


/** 
 * 1. creates a card object
 * 2. creates a card element
 * 3. closes modal window on form submit
 * 4. resets form
 * @param {Event} evt - Submit event
 */ 
function handleAddSubmit(evt) {
  //prevents default submit handling  
  evt.preventDefault();

  /* 1.
  Creates card abjects with name and link properties according 
  to user input */
  const cardObject = {
    name: inputTitle.value,
    link: inputURL.value
  }

   /* 2.
  calls the renderCard function from cards.js to render the 
  newly created card on form submit */
  renderCard(cardObject)
  
  /* 3.
  closes modal after card is added */
  closeModal(addCardModal);

  /* 4.
  resets form */
  formTypeAdd.reset() 
}

// Adds event listeners for the add button and the close button in the modal
addButton.addEventListener("click", () => openModal(addCardModal));
closeButtonForAdd.addEventListener("click", () => closeModal(addCardModal));

// Specifies submit handler for the modal form
formWindowTypeAdd.addEventListener("submit", handleAddSubmit);
