const MODAL = document.querySelector(".modal");
const FORM = document.querySelector(".form");
const EDIT_BTN = document.querySelector(".profile__edit-button")
const CLOSE_BTN = MODAL.querySelector(".modal__close-button");
const PROFILE_NAME = document.querySelector(".profile__name")
const PROFILE_CAPTION = document.querySelector(".profile__caption")
const INPUT_NAME = FORM.querySelector(".form__input_type_name");
const INPUT_CAPTION = FORM.querySelector(".form__input_type_caption");

// loads user's profile information into corresponding input values
function renderProfileInfo() {
  INPUT_NAME.value = PROFILE_NAME.textContent
  INPUT_CAPTION.value = PROFILE_CAPTION.textContent
}

// Toggles modal window visibility and
// execues renderProfileInfo
function openEditModal() {
  MODAL.classList.toggle("modal_visible");
  renderProfileInfo();
}

// Toggles modal window visibility
function closeEditModal() {
  MODAL.classList.toggle("modal_visible");
}



function handleProfileFormSubmit(evt) {
  //Stops browser from submitting form in the default way
  evt.preventDefault(); 

  // Applies changes 
  PROFILE_NAME.textContent = `${INPUT_NAME.value}`;
  PROFILE_CAPTION.textContent = `${INPUT_CAPTION.value}`;

  // Sets value of input field's placeholder attribute to
  // current state
  INPUT_NAME.placeholder = `${INPUT_NAME.value}`;
  INPUT_CAPTION.placeholder = `${INPUT_CAPTION.value}`;

  //Closes modal window
  closeEditModal();
}


// Toggles modal windo visibility when buttons are clicked
// and loads profile info on modal open
EDIT_BTN.addEventListener("click", openEditModal);
CLOSE_BTN.addEventListener("click", closeEditModal);

// Saves changes after form is filled and submitted
FORM.addEventListener("submit", handleProfileFormSubmit);