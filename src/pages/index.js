import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  cardSettings,
  validationSettings,
  editProfilePopupSettings,
  addCardPopupSettings,
  cardPopupSettings,
  userInfoSettings,
  placesCardsSelector,
} from "../utils/constants.js";
import "./index.css";

const handleImageClick = (cardObj) => {
  cardPopup.open(cardObj);
};

const createCard = (cardObj) => {
  const cardInstance = new Card(cardSettings, cardObj, handleImageClick)
  return cardInstance.generateCard();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsSection.addItem(cardElement);
    },
  },
  placesCardsSelector
);

cardsSection.renderItems();

const editProfileForm = document.querySelector(".form_type_edit");
const addCardForm = document.querySelector(".form_type_add");

const editProfileFormValidator = new FormValidator(editProfileForm, validationSettings);
const addCardFormValidator = new FormValidator(addCardForm, validationSettings);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const userInfo = new UserInfo(userInfoSettings);

const editProfilePopup = new PopupWithForm({
  settings: editProfilePopupSettings,
  handleSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues);
    editProfilePopup.close();
    editProfileFormValidator.updateCurrentStates();
    // how should i reset validation everytime I close the popup? I can't seem to figure it out
    // other than adding a handleClose parameter to the constructor or duplicating the resetValidation
    // code inside the popup class
  },
});

const addCardPopup = new PopupWithForm({
  settings: addCardPopupSettings,
  handleSubmit: (inputValues) => {
    const cardElement = createCard(inputValues)
    cardsSection.addItem(cardElement);
    addCardPopup.close();
  },
});

const cardPopup = new PopupWithImage(cardPopupSettings);

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
  editProfileFormValidator.resetValidation();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
});

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});
