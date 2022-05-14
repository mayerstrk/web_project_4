const editProfileModal = document.querySelector(".modal_type_edit");
const formWindowTypeEdit = document.querySelector(".form_type_edit");
const editButton = document.querySelector(".profile__edit-button")
const profileName = document.querySelector(".profile__name")
const profileAbout = document.querySelector(".profile__about")
const inputName = formWindowTypeEdit.querySelector(".form__input_type_name");
const inputAbout = formWindowTypeEdit.querySelector(".form__input_type_about");


/**
 * Loads user's profile information into corresponding input values
 */
function renderProfileInfo() {
  inputName.value = profileName.textContent
  inputAbout.value = profileAbout.textContent
};


/**
 * Loads relevant information into input values and toggle the modal window visibility
 */
function renderEditForm() {
  renderProfileInfo()
  initModal(editProfileModal);
};

/**
 * 1. Applies changes submitted by user
 * 2. Sets valie of input field's placeholder attribute to current state
 * 3. Closes modal window
 * @param {Event} evt 
 */
function handleProfileFormSubmit(evt) {
  //Stops browser from submitting form in the default way
  evt.preventDefault(); 

  // 1. Applies changes made by user
  profileName.textContent = `${inputName.value}`;
  profileAbout.textContent = `${inputAbout.value}`;

  /* 2. Sets value of input field's placeholder attribute to
        current state */
  inputName.placeholder = `${inputName.value}`;
  inputAbout.placeholder = `${inputAbout.value}`;

  // 3. Closes modal window
  resetModal(editProfileModal);
}

function addEditEventListeners() {
  /*Toggles modal window visibility when buttons are clicked
  and loads profile info on modal open */
  editButton.addEventListener("click", () => {
    renderEditForm();
    enableValidation();
  });
  
  // Saves changes after form is filled and submitted
  formWindowTypeEdit.addEventListener("submit", handleProfileFormSubmit);
}