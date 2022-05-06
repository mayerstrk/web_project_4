const editProfileModal = document.querySelector(".modal_type_edit");
const formWindowTypeEdit = document.querySelector(".form_type_edit");
const editButton = document.querySelector(".profile__edit-button")
const closeButtionforEdit = editProfileModal.querySelector(".modal__close-button_for_edit-form");
const profileName = document.querySelector(".profile__name")
const profileCaption = document.querySelector(".profile__caption")
const inputName = formWindowTypeEdit.querySelector(".form__input_type_name");
const inputCaption = formWindowTypeEdit.querySelector(".form__input_type_caption");


// loads user's profile information into corresponding input values
function renderProfileInfo() {
  inputName.value = profileName.textContent
  inputCaption.value = profileCaption.textContent
};


// Loads relevant information into input values and toggle the modal window visibility
function renderEditForm() {
  renderProfileInfo()
  openModal(editProfileModal);
};


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
  closeModal(editProfileModal);
}


// Toggles modal windo visibility when buttons are clicked
// and loads profile info on modal open
editButton.addEventListener("click", renderEditForm);
closeButtionforEdit .addEventListener("click", () => closeModal(editProfileModal));

// Saves changes after form is filled and submitted
formWindowTypeEdit.addEventListener("submit", handleProfileFormSubmit);