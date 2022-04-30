const MODAL = document.querySelector(".modal-page-overlay");
const FORM = document.querySelector(".form");
const EDIT_BTN = document.querySelector(".profile__edit-button")
const CLOSE_BTN = MODAL.querySelector(".modal__close-button");
const SAVE_BTN = FORM.querySelector(".form__button");
const PROFILE_NAME = document.querySelector(".profile__name")
const PROFILE_CAPTION = document.querySelector(".profile__caption")


//Toggles modal window visibility
function toggleEditModal() {
  MODAL.classList.toggle("modal-page-overlay_visible");
}


function handleProfileFormSubmit(evt) {

  //Stops browser from submitting form in the default way
  evt.preventDefault(); 

  let inputName = FORM.querySelector(".form__input_type_name");
  let inputCaption = FORM.querySelector(".form__input_type_caption");

  // Applies changes 
  PROFILE_NAME.textContent = `${inputName.value}`;
  PROFILE_CAPTION.textContent = `${inputCaption.value}`;

  // 1. Sets value of input field's placeholder attribute to
  //    current state
  inputName.placeholder = `${inputName.value}`;
  inputCaption.placeholder = `${inputCaption.value}`;

  // 2. Resets value of form input fields 
  inputName.value = "";
  inputCaption.value = "";

  //Closes modal window
  toggleEditModal();
}


// Toggles modal windo visibility when buttons are clicked
EDIT_BTN.addEventListener("click", toggleEditModal);
CLOSE_BTN.addEventListener("click", toggleEditModal);

// Saves changes after form is filled and submitted
SAVE_BTN.addEventListener("click", handleProfileFormSubmit);