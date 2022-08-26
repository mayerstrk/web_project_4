import { Card } from "./modules/Card.js"
import { FormValidator } from "./modules/FormValidator.js";
import { renderProfileInfo, addEditEventListeners } from "./modules/modal_type_edit.js";
import { addAddEventListeners } from "./modules/modal_type_add.js";
import { renderCardModal } from "./modules/modal_type_card.js"
import { initialCards, cardSettings, validationSettings } from "./modules/configuration.js";

const placesCards = document.querySelector(".places__cards");

const handleImageClick = (cardObj) => {
  renderCardModal(cardObj)
}

function renderCard(cardObj, cardContainer) {
  const cardInstance = new Card(cardSettings, cardObj, handleImageClick);
  const cardElement = cardInstance.generateCard();
  cardContainer.prepend(cardElement);
}

initialCards.forEach((cardObj) => {
  renderCard(cardObj, placesCards);
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

export { renderCard, placesCards }
