const CARD_TEMPLATE = document.querySelector("#card").content;
const CARD_MODAL = document.querySelector(".modal_type_photo");


// 1. Sets the values for the card modal depending on which picture is clicked
// 2. Toggles modal window visibility
const OPEN_CARD_MODAL = evt => {
  // 1.
  // Gets relevant values from the card's elements to assign them to the modal window's elements
  const SRC_VALUE = evt.target.closest(".card__photo").getAttribute("src");
  const CAPTION_TEXT = evt.target.parentElement.nextElementSibling.firstElementChild.textContent;

  // Assigns the values to their corresponding elements in the modal window
  CARD_MODAL.querySelector(".card-modal__photo").setAttribute("src", SRC_VALUE);
  CARD_MODAL.querySelector(".card-modal__photo-caption").textContent = CAPTION_TEXT;

  // 2.
  // Toggles modal window visibility
  CARD_MODAL.classList.add("modal_visible");
}


const CLOSE_CARD_MODAL = () => CARD_MODAL.classList.remove("modal_visible");
