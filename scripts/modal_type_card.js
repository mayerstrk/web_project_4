const cardModal = document.querySelector(".modal_type_card");
const cardModalCloseButton = cardModal.querySelector(".modal__close-button_for_card-modal");

// Adds event listener to cardModalCloseButton
cardModalCloseButton.addEventListener("click", () => closeModal(cardModal));

/** 
 * Gets the values for the card modal depending on which picture is clicked 
 * @param {Event} evt - event that triggers opening modal window
 */
function getCardModalValues(evt) {

  const cardModalPhoto = cardModal.querySelector(".card-modal__photo");
  const cardModalPhotoCaption = cardModal.querySelector(".card-modal__photo-caption");

  // Gets relevant values from the card's elements to assign them to the modal window's elements
  const srcValue = evt.target.closest(".card__photo").getAttribute("src");
  const captionText = evt.target.parentElement.nextElementSibling.firstElementChild.textContent;

  // Assigns the values to their corresponding elements in the modal window
  cardModalPhoto.setAttribute("src", srcValue);
  cardModalPhoto.setAttribute("alt", `Photo of ${captionText}`);
  cardModalPhotoCaption.textContent = captionText;
};


/** 
 * 1. Gets the values for the card modal depending on 
 *    which picture is clicked
 * 2. Toggles modal window visibility
 * @param {event} evt - event that triggers opening modal window
 */
const renderCardModal = evt => {
  // Gets appropiate values
  getCardModalValues(evt)
  // Calls the openModal function from modal_functions.js to toggle modal window visibility
  openModal(cardModal)
};
