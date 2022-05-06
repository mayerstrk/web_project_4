const cardTemplate = document.querySelector("#card").content;
const cardModal = document.querySelector(".modal_type_card");


//Gets the values for the card modal depending on which picture is clicked
function getCardModalValues(evt) {
  // Gets relevant values from the card's elements to assign them to the modal window's elements
  const srcValue = evt.target.closest(".card__photo").getAttribute("src");
  const captionText = evt.target.parentElement.nextElementSibling.firstElementChild.textContent;

  // Assigns the values to their corresponding elements in the modal window
  cardModalPhoto = cardModal.querySelector(".card-modal__photo");
  cardModalPhoto.setAttribute("src", srcValue);
  cardModalPhoto.setAttribute("alt", "Place goes here")

  cardModalPhotoCaption = cardModal.querySelector(".card-modal__photo-caption");
  cardModalPhotoCaption.textContent = captionText;
};

// Renders the card modal window with the appropiate values
const renderCardModal = evt => {
  // Gets appropiate values
  getCardModalValues(evt)
  //calls the openModal function from modal_functions.js to toggle modal window visibility
  openModal(cardModal)
};