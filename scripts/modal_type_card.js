const CARD_TEMPLATE = document.querySelector("#card").content;
const CARD_MODAL = document.querySelector(".modal_type_photo");


// 1. Sets the values for the card modal depending on which picture is clicked
// 2. Toggles modal visibility
const OPEN_CARD_MODAL = evt => {
  // 1.
  // Gets relevant card values for the modal
  const SRC_VALUE = evt.target.closest(".card__photo").getAttribute("src");
  const CAPTION_TEXT = evt.target.parentElement.nextElementSibling.firstElementChild.textContent;

  // Assigns values to corresponding elements
  CARD_MODAL.querySelector(".card-modal__photo").setAttribute("src", SRC_VALUE);
  CARD_MODAL.querySelector(".card-modal__photo-caption").textContent = CAPTION_TEXT;

  // 2.
  // Toggles modal visibility
  CARD_MODAL.classList.add("modal_visible");
}


const CLOSE_CARD_MODAL = () => CARD_MODAL.classList.remove("modal_visible");
