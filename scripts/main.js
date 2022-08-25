import { FormValidator } from "./modules/FormValidator.js";
import { renderProfileInfo, addEditEventListeners } from "./modules/modal_type_edit.js";
import { addAddEventListeners, renderCard } from "./modules/modal_type_add.js";
import { renderCardModal } from "./modules/modal_type_card.js"
import { initialCards, cardSettings, validationSettings } from "./modules/configuration.js";

export const placesCards = document.querySelector(".places__cards");

initialCards.forEach((cardObj) => {
  renderCard(cardObj, placesCards)
});

const cardModal = document.querySelector(".modal_type_card");

placesCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("card__photo")) {
    const cardPhoto = e.target;
    renderCardModal(cardPhoto, cardModal);
  }
});

renderProfileInfo();

const editForm = document.querySelector(".form_type_edit");
const addForm = document.querySelector(".form_type_add");

const editFormValidator = new FormValidator(editForm, validationSettings);
const addFormValidator = new FormValidator(addForm, validationSettings);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

addEditEventListeners(editFormValidator);
addAddEventListeners(addFormValidator, placesCards);
