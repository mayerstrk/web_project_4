import { Card } from "./modules/Card.js";
import {
  toggleLikeState,
  deleteCard,
  openModal,
  closeModal,
  handleCloseButton,
  closeOnClickOut,
  closeWithEsc
} from "./modules/utils.js";
import { renderCardModal } from "./modules/modal_type_card.js";
import { FormValidator } from "./modules/FormValidator.js";
import { renderProfileInfo, addEditEventListeners } from "./modules/modal_type_edit.js";
import { addAddEventListeners } from "./modules/modal_type_add.js";

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];

const placesCards = document.querySelector(".places__cards");

initialCards.forEach((card) => {
  const newcard = new Card(card.name, card.link, "#card");
  newcard.render(placesCards);
});

placesCards.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    toggleLikeState(evt);
  } else if (evt.target.classList.contains("card__delete-button")) {
    deleteCard(evt);
  } else if (evt.target.classList.contains("card__photo")) {
    renderCardModal(evt);
  } else {
  }
});

renderProfileInfo();

const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  inputValidClass: "form__input_valid",
  inputErrorClass: "form__input_error",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  errorClass: "form__error",
  errorSelector: ".form__error",
  errorActiveClass: "form__error_visible",
};

const editForm = document.querySelector(".form_type_edit");
const addForm = document.querySelector(".form_type_add");

const editFormValidator = new FormValidator(editForm, config);
const addFormValidator = new FormValidator(addForm, config)

addEditEventListeners(editFormValidator);
addAddEventListeners(addFormValidator);

editFormValidator.enableValidation(config)
addFormValidator.enableValidation(config)