import { openModal, resetValidation } from "./utils.js"

const addCardModal = document.querySelector(".modal_type_add");
const formWindowTypeAdd = document.querySelector(".modal__window_type_add")
const formTypeAdd = document.querySelector(".form_type_add")
const addButton = document.querySelector(".profile__add-button")
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
  newcard = new Card(inputTitle.value, inputURL.value);
  newcard.render();
  
  /* 3.
  closes modal after card is added */
  closeModal(addCardModal);

  /* 4.
  resets form */
  formTypeAdd.reset() 
}

function addAddEventListeners(formValidator) {
  // Adds event listeners for the add button and the close button in the modal
  addButton.addEventListener("click", () => {
    openModal(addCardModal);
    resetValidation(formValidator)
  });


  // Specifies submit handler for the modal form
  formWindowTypeAdd.addEventListener("submit", handleAddSubmit);
}


export { addAddEventListeners };
