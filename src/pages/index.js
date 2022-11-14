import Card from "../components/Card.js";
import Section from "../components/Section.js";
import aroundTheUsClient from "../components/aroundTheUsClient.js";
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
  appErrorPopupSettings,
  userInfoSettings,
  placesCardsSelector,
} from "../utils/constants.js";
import "./index.css";
import PopupAppError from "../components/PopupAppError.js";

const popupAppError = new PopupAppError(appErrorPopupSettings);

const apiCatchHandler = (err) => {
  console.log(err);
  popupAppError.setMessage(err);
  popupAppError.open();
};

const apiFinallyHandler = () =>
  addCardPopup.setButtonText(addCardPopup.buttonText);

const userInfo = new UserInfo(userInfoSettings);

const cardPopup = new PopupWithImage(cardPopupSettings);

const formValidators = {};

const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((formElement) => {
    const formName = formElement.getAttribute("name");
    if (formName !== "delete-card") {
      const validator = new FormValidator(formElement, config);
      formValidators[formName] = validator;
      validator.enableValidation();
    }
  });
};

enableValidation(validationSettings);

const avatarImage = document.querySelector(".profile__avatar-container");
avatarImage.addEventListener("click", () => {
  formValidators["avatar"].resetValidation();
  avatarPopup.open();
});

const avatarPopup = new PopupWithForm({
  settings: avatarPopupSettings,
  handleSubmit: ({ link }) => {
    aroundClient
      .patchAvatar(link)
      .then((res) => {
        console.log(res);
        userInfo.setUserInfo(res);
        avatarPopup.close();
      })
      .catch(apiCatchHandler)
      .finally(apiFinallyHandler);
  },
});

const deleteCardPopup = new PopupDeleteCard({
  settings: deleteCardPopupSettings,
  handleSubmit: (cardId, cardElement) => {
    aroundClient
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        cardElement = null;
        deleteCardPopup.close();
      })
      .catch(apiCatchHandler);
  },
});

const aroundClient = new aroundTheUsClient({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  baseHeaders: {
    authorization: "0025f74a-7d55-4e26-bbb6-faf6f78aefcc",
  },
});

function initAddCard(cardsSection, createCard, userId) {
  const addCardPopup = new PopupWithForm({
    settings: addCardPopupSettings,
    handleSubmit: (inputValues) => {
      formValidators["add-card"].disableButton(true);
      aroundClient
        .postNewCard(inputValues)
        .then((cardObj) => {
          const cardElement = createCard(cardObj, userId);
          cardsSection.addItem(cardElement, "prepend");
          addCardPopup.close();
        })
        .catch(apiCatchHandler)
        .finally(apiFinallyHandler);
    },
  });

  const addCardButton = document.querySelector(".profile__add-button");
  addCardButton.addEventListener("click", () => {
    formValidators["add-card"].resetValidation();
    addCardPopup.open();
  });
}

function initEditProfile() {
  /**
   *
   * @param {object} inputValues
   * @returns {Promise}
   */
  const updateProfile = (inputValues) => {
    return aroundClient
      .patchProfile(inputValues)
      .then((data) => userInfo.setUserInfo(data))
      .catch(apiCatchHandler)
      .finally(apiFinallyHandler);
  };

  const editProfileButton = document.querySelector(".profile__edit-button");
  editProfileButton.addEventListener("click", () => {
    formValidators["edit-profile"].resetValidation();
    editProfilePopup.setInputValues(userInfo.getUserInfo());
    formValidators["edit-profile"].updateCurrentStates();
    editProfilePopup.open();
  });

  const editProfilePopup = new PopupWithForm({
    settings: editProfilePopupSettings,
    handleSubmit: (inputValues) => {
      updateProfile(inputValues)
        .then(() => {
          formValidators["edit-profile"].updateCurrentStates();
          editProfilePopup.close();
        })
        .catch(apiCatchHandler)
        .finally(apiFinallyHandler);
    },
  });
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
    deleteCardPopup.open(cardId, cardElement);
  };

  const handleLikeButtonClick = (card) => {
    const likeState = card._likeButton.classList.contains(
      card._likeButtonActiveClass
    );
    if (likeState) {
      aroundClient
        .deleteLike(card.getId())
        .then((cardObj) => {
          card.updateLikes(cardObj.likes.length);
        })
        .catch(apiCatchHandler);
    } else {
      aroundClient
        .addLike(card.getId())
        .then((cardObj) => {
          card.updateLikes(cardObj.likes.length);
        })
        .catch(apiCatchHandler);
    }
  };

  aroundClient
    .fetchData({
      userInfoSuffix: "users/me",
    })
    .then(([userData, cardsData]) => {
      userInfo.setUserInfo(userData);
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
    })
    .catch(apiCatchHandler);
}

renderApp();
