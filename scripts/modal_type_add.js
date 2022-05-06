const MODAL_TYPE_ADD = document.querySelector(".modal_type_add");
const FORM_TYPE_ADD = document.querySelector(".modal__form_type_add")
const ADD_BTN = document.querySelector(".profile__add-button")
const CLOSE_BTN_FOR_ADD = MODAL_TYPE_ADD.querySelector(".modal__close-button_for_add-form");
const INPUT_TITLE = FORM_TYPE_ADD.querySelector(".form__input_type_title");
const INPUT_URL = FORM_TYPE_ADD.querySelector(".form__input_type_url")

// Toggles add modal visibility
function openAddModal() {
  MODAL_TYPE_ADD.classList.add("modal_visible")
}

// Toggles add modal visibility
function closeAddModal() {
  MODAL_TYPE_ADD.classList.remove("modal_visible")
}

// 1. creates a card object
// 2. creates a card element
// 3. closes modal window on form submit
// 4. resets input values
function handleAddSubmit(evt) {
  //prevents default submit handling
  evt.preventDefault();

  // 1.
  // Creates card abjects with name and link properties according to user input
  const CARD_OBJECT = {
    name: INPUT_TITLE.value,
    link: INPUT_URL.value
  }

  // 2.
  // calls the createCard function from cards.js to create a card element on for submit
  craeateCard(CARD_OBJECT)

  // 3.
  // closes modal after card is added
  closeAddModal();

  // 4.
  // resets input values
  INPUT_TITLE.value = "";
  INPUT_URL.value = "";
}

// Adds event listeners for the add button and the close button in the modal
ADD_BTN.addEventListener("click", openAddModal);
CLOSE_BTN_FOR_ADD.addEventListener("click", closeAddModal);

// Specifies submit handler for the modal form
FORM_TYPE_ADD.addEventListener("submit", handleAddSubmit);
