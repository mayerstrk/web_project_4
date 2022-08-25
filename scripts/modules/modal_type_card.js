import { openModal } from "./utils.js";

function getCardModalFields(cardModal) {
  const cardModalFields = {
    cardModalPhoto: cardModal.querySelector(".card-modal__photo"),
    cardModalPhotoCaption: cardModal.querySelector(".card-modal__photo-caption"),
  }

  return cardModalFields
}

/** 
 * Gets the values for the card modal depending on which picture is clicked 
 * @param {Element} cardPhoto - cardElement that was clicked
 */
function getCardModalValues(cardPhoto) {
  const modalValues = {
    sourceValue: cardPhoto.getAttribute("src"),
    captionText: cardPhoto.parentElement.nextElementSibling.firstElementChild.textContent,
  };

  return modalValues
}

function setCardModalValues(cardPhoto, cardModal) {
  const { sourceValue, captionText } = getCardModalValues(cardPhoto);
  const { cardModalPhoto, cardModalPhotoCaption } = getCardModalFields(cardModal);
  
  cardModalPhoto.setAttribute("src", sourceValue);
  cardModalPhoto.setAttribute("alt", `Photo of ${captionText}`);
  cardModalPhotoCaption.textContent = captionText;
}

function renderCardModal(cardPhoto, cardModal) {
  // 1 Gets appropiate values
  setCardModalValues(cardPhoto, cardModal)
  // 2 Calls the openModal function from modal_functions.js to toggle modal window visibility
  openModal(cardModal)
};


export { renderCardModal };
