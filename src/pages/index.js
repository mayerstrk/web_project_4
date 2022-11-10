import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  cardSettings,
  validationSettings,
  editProfilePopupSettings,
  addCardPopupSettings,
  deleteCardPopupSettings,
  avatarPopupSettings,
  cardPopupSettings,
  userInfoSettings,
  placesCardsSelector,
} from "../utils/constants.js";
import "./index.css";

const userInfo = new UserInfo(userInfoSettings);

const cardPopup = new PopupWithImage(cardPopupSettings);

const avatarForm = document.querySelector(".form_type_avatar");
const avatarFormValidator = new FormValidator(avatarForm, validationSettings);
avatarFormValidator.enableValidation();

const avatarImage = document.querySelector(".profile__avatar");
avatarImage.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

const avatarPopup = new PopupWithForm({
  settings: avatarPopupSettings,
  handleSubmit: ({ link }) => {
    const urlSuffix = "users/me/avatar";
    console.log(link);
    api.patchAvatar(urlSuffix, link).then((res) => {
      userInfo.setUserInfo(res);
    });
    avatarPopup.close();
  },
});

const deleteCardPopup = new PopupDeleteCard({
  settings: deleteCardPopupSettings,
  handleSubmit: (urlSuffix, cardElement) => {
    api.deleteCard(urlSuffix);
    cardElement.remove();
    cardElement = null;
    deleteCardPopup.close();
  },
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en/",
  baseHeaders: {
    authorization: "0025f74a-7d55-4e26-bbb6-faf6f78aefcc",
  },
});

function initAddCard(cardsSection, createCard, userId) {
  const addCardPopup = new PopupWithForm({
    settings: addCardPopupSettings,
    handleSubmit: (inputValues, buttonText) => {
      addCardFormValidator.disableButton(true);
      api.postNewCard("cards", inputValues).then((cardObj) => {
        const cardElement = createCard(cardObj, userId);
        cardsSection.addItem(cardElement, "prepend");
        addCardPopup.close();
        addCardPopup.setButtonText(buttonText);

      });
    },
  });

  const addCardForm = document.querySelector(".form_type_add");
  const addCardFormValidator = new FormValidator(
    addCardForm,
    validationSettings
  );
  addCardFormValidator.enableValidation();

  const addCardButton = document.querySelector(".profile__add-button");

  addCardButton.addEventListener("click", () => {
    addCardFormValidator.resetValidation();
    addCardPopup.open();
  });
}

function initEditProfile() {
  const updateProfile = (inputValues) => {
    api
      .patchProfile("users/me", inputValues)
      .then(() => api.fetchUserInfo("users/me"))
      .then((data) => userInfo.setUserInfo(data));
  };

  const editProfileForm = document.querySelector(".form_type_edit");

  const editProfileFormValidator = new FormValidator(
    editProfileForm,
    validationSettings
  );

  const editProfileButton = document.querySelector(".profile__edit-button");
  editProfileButton.addEventListener("click", () => {
    editProfileFormValidator.resetValidation();
    editProfilePopup.setInputValues(userInfo.getUserInfo());
    editProfileFormValidator.updateCurrentStates();
    editProfilePopup.open();
  });

  const editProfilePopup = new PopupWithForm({
    settings: editProfilePopupSettings,
    handleSubmit: (inputValues) => {
      updateProfile(inputValues);
      editProfileFormValidator.updateCurrentStates();
      editProfilePopup.close();
    },
  });

  editProfileFormValidator.enableValidation();
}

function renderApp() {
  const createCard = (cardObj, userId) => {
    const cardInstance = new Card(
      cardSettings,
      cardObj,
      userId,
      handleImageClick,
      handleDeleteCardClick,
      handleLikeButtonClick
    );
    return cardInstance.generateCard();
  };

  const handleImageClick = (cardObj) => {
    cardPopup.open(cardObj);
  };

  const handleDeleteCardClick = (cardId, cardElement) => {
    const urlSuffix = "cards/" + cardId;
    deleteCardPopup.open(urlSuffix, cardElement);
  };

  const handleLikeButtonClick = ({
    cardId,
    likesElement,
    likeButton,
    likeButtonActiveClass,
  }) => {
    const urlSuffix = "cards/likes/" + cardId;
    const likeState = likeButton.classList.contains(likeButtonActiveClass);
    if (likeState) {
      api.deleteLike(urlSuffix).then((cardObj) => {
        likesElement.textContent = cardObj.likes.length;
        likeButton.classList.remove(likeButtonActiveClass);
      });
    } else {
      api.addLike(urlSuffix).then((cardObj) => {
        likesElement.textContent = cardObj.likes.length;
        likeButton.classList.add(likeButtonActiveClass);
      });
    }
  };

  api
    .fetchData({
      userInfoSuffix: "users/me",
      cardsSuffix: "cards",
    })
    .then(([userData, cardsData]) => {
      userInfo.setUserInfo(userData);
      console.log(cardsData);
      const cardsSection = new Section(
        {
          items: cardsData,
          renderer: (item) => {
            const cardElement = createCard(item, userData._id);
            cardsSection.addItem(cardElement, "append");
          },
        },
        placesCardsSelector
      );

      cardsSection.renderItems();
      initAddCard(cardsSection, createCard, userData._id);
      initEditProfile();
    });
}

renderApp();
initEditProfile();
