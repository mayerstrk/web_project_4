const modalTypeEdit = document.querySelector(".modal_type_edit");
const formTypeEdit = document.querySelector(".form");
const editBtn = document.querySelector(".profile__edit-button")
const closeBtnforEdit = modalTypeEdit.querySelector(".modal__close-button_for_edit-form");
const profileName = document.querySelector(".profile__name")
const profileCaption = document.querySelector(".profile__caption")
const inputName = formTypeEdit.querySelector(".form__input_type_name");
const inputCaption = formTypeEdit.querySelector(".form__input_type_caption");


// loads user's profile information into corresponding input values
function renderProfileInfo() {
  inputName.value = profileName.textContent
  inputCaption.value = profileCaption.textContent
}


function handleProfileFormSubmit(evt) {
  //Stops browser from submitting form in the default way
  evt.preventDefault(); 

  // Applies changes 
  profileName.textContent = `${inputName.value}`;
  profileCaption.textContent = `${inputCaption.value}`;

  // Sets value of input field's placeholder attribute to
  // current state
  inputName.placeholder = `${inputName.value}`;
  inputCaption.placeholder = `${inputCaption.value}`;

  //Closes modal window
  closeModal(modalTypeEdit);
}


// Toggles modal windo visibility when buttons are clicked
// and loads profile info on modal open
editBtn.addEventListener("click", () => openModal(modalTypeEdit));
closeBtnforEdit .addEventListener("click", () => closeModal(modalTypeEdit));

// Saves changes after form is filled and submitted
formTypeEdit.addEventListener("submit", handleProfileFormSubmit);