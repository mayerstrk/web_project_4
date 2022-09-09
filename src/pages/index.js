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
  editPopupSettings,
  addPopupSettings,
  cardPopupSettings,
  userInfoSettings,
  placesCardsSelector,
} from "../utils/constants.js";
import "./index.css";

const handleImageClick = (cardObj) => {
  cardPopup.open(cardObj);
};

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardInstance = new Card(cardSettings, item, handleImageClick);
      const cardElement = cardInstance.generateCard();
      cardsSection.addItem(cardElement);
    },
  },
  placesCardsSelector
);

cardsSection.renderItems();

const editForm = document.querySelector(".form_type_edit");
const addForm = document.querySelector(".form_type_add");

const editFormValidator = new FormValidator(editForm, validationSettings);
const addFormValidator = new FormValidator(addForm, validationSettings);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
console.log(editFormValidator._currentStates);

const userInfo = new UserInfo(userInfoSettings);

const editPopup = new PopupWithForm({
  settings: editPopupSettings,
  handleSubmit: () => {
    const inputValues = editPopup.getInputValues();
    userInfo.setUserInfo(inputValues);
    editPopup.close();
    editPopup.setInputValues(inputValues);
    editFormValidator.updateCurrentStates();
    // how should i reset validation everytime I close the popup? I can't seem to figure it out
    // other than adding a handleClose parameter to the constructor or duplicating the resetValidation
    // code inside the popup class
  },
});

const addPopup = new PopupWithForm({
  settings: addPopupSettings,
  handleSubmit: () => {
    const cardObj = addPopup.getInputValues();
    const cardInstance = new Card(cardSettings, cardObj, handleImageClick);
    const cardElement = cardInstance.generateCard();
    cardsSection.addItem(cardElement);
    addPopup.close();
    // how should i reset validation everytime I close the popup? I can't seem to figure it out
    // other than adding a handleClose parameter to the constructor or duplicating the resetValidation
    // code inside the popup class
  },
});

const cardPopup = new PopupWithImage(cardPopupSettings);

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  editPopup.setInputValues(userInfo.getUserInfo());
  editPopup.open();
});

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addPopup.open();
});
