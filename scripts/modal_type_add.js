const modalTypeAdd = document.querySelector(".modal_type_add");
const formTypeAdd = document.querySelector(".modal__form_type_add")
const addBtn = document.querySelector(".profile__add-button")
const closeBtnForAdd = modalTypeAdd.querySelector(".modal__close-button_for_add-form");
const inputTitle = formTypeAdd.querySelector(".form__input_type_title");
const inputURL = formTypeAdd.querySelector(".form__input_type_url")


// 1. creates a card object
// 2. creates a card element
// 3. closes modal window on form submit
// 4. resets input values
function handleAddSubmit(evt) {
  //prevents default submit handling
  evt.preventDefault();

  // 1.
  // Creates card abjects with name and link properties according to user input
  const cardObject = {
    name: inputTitle.value,
    link: inputURL.value
  }

  // 2.
  // calls the renderCard function from cards.js to create a card element on form submit
  renderCard(cardObject)
  

  // 3.
  // closes modal after card is added
  closeModal(modalTypeAdd);

  // 4.
  // resets input values
  inputTitle.value = ""; 
  inputURL.value = ""; 
}

// Adds event listeners for the add button and the close button in the modal
addBtn.addEventListener("click", () => openModal(modalTypeAdd));
closeBtnForAdd.addEventListener("click", () => closeModal(modalTypeAdd));

// Specifies submit handler for the modal form
formTypeAdd.addEventListener("submit", handleAddSubmit);
