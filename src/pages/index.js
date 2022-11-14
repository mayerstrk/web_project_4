import Card from "../components/Card.js";
import Section from "../components/Section.js";
import AroundClient from "../components/AroundClient.js";
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

const handleApiCatch = (err) => {
  popupAppError.setMessage(err);
  popupAppError.open();
};

const handleApiFinally = (popup) =>
  popup.setButtonText(popup.buttonText);

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
        userInfo.setUserInfo(res);
        avatarPopup.close();
      })
      .catch(handleApiCatch)
      .finally(() => handleApiFinally(avatarPopup));
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
      .catch(handleApiCatch);
  },
});

const aroundClient = new AroundClient({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  baseHeaders: {
    authorization: "0025f74a-7d55-4e26-bbb6-faf6f78aefcc",
    'Content-Type': "application/json",
  },
});

function initAddCard(cardsSection, createCard, userId) {
  const addCardPopup = new PopupWithForm({
    settings: addCardPopupSettings,
    handleSubmit: (inputValues) => {
      aroundClient
        .postNewCard(inputValues)
        .then((cardObj) => {
          const cardElement = createCard(cardObj, userId);
          cardsSection.addItem(cardElement, "prepend");
          addCardPopup.close();
        })
        .catch(handleApiCatch)
        .finally(() => handleApiFinally(addCardPopup));
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
  const updateProfile = (inputValues) =>
    aroundClient
      .patchProfile(inputValues)
      .then((data) => userInfo.setUserInfo(data))
      .catch(handleApiCatch)
      .finally(() => handleApiFinally(editProfilePopup));

  const editProfileButton = document.querySelector(".profile__edit-button");
  editProfileButton.addEventListener("click", () => {
    formValidators["edit-profile"].resetValidation();
    editProfilePopup.setInputValues(userInfo.getUserInfo());
    editProfilePopup.open();
  });

  const editProfilePopup = new PopupWithForm({
    settings: editProfilePopupSettings,
    handleSubmit: (inputValues) => {
      updateProfile(inputValues)
        .then(() => {
          editProfilePopup.close();
        })
        .catch(handleApiCatch)
        .finally(() => handleApiFinally(editProfilePopup));
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
    const likeState = card.likeButton.classList.contains(
      card.likeButtonActiveClass
    );
    if (likeState) {
      aroundClient
        .deleteLike(card.getId())
        .then((cardObj) => {
          card.updateLikes(cardObj.likes.length);
        })
        .catch(handleApiCatch);
    } else {
      aroundClient
        .addLike(card.getId())
        .then((cardObj) => {
          card.updateLikes(cardObj.likes.length);
        })
        .catch(handleApiCatch);
    }
  };

  aroundClient
    .fetchData()
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
    .catch(handleApiCatch);
}

renderApp();
