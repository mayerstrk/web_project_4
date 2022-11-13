const profileSettings = {
  templateSelector: "#profile",
  sectionSelector: ".profile",
}

const initialCards = [
  {
    title: "Lago di Braies",
    url: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    title: "Vanoise National Park",
    url: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    title: "Latemar",
    url: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    title: "Bald Mountains",
    url: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    title: "Lake Louise",
    url: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    title: "Yosemite Valley",
    url: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];

const placesCardsSelector = ".places__cards";

const cardSettings = {
  templateSelector: "#card",
  cardSelector: ".card",
  likeButtonActiveClass: "card__like-button_active",
  likeButtonSelector: ".card__like-button",
  deleteButtonSelector: ".card__delete-button",
  deleteButtonActiveClass: "card__delete-button_active",
  imageContainerSelector: ".card__photo-container",
  likesSelector: ".card__likes"
};

const validationSettings = {
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

const popupSettings = {
  visibleClass: "modal_visible",
  closeButtonSelector: ".modal__close-button",
  formSelector: ".form",
  inputFieldsSelector: ".form__input",
  submitButtonSelector: ".form__button",
};

const editProfilePopupSettings = {
  __proto__: popupSettings,
  popupSelector: ".modal_type_edit",
};

const addCardPopupSettings = {
  __proto__: popupSettings,
  popupSelector: ".modal_type_add",
};

const cardPopupSettings = {
  __proto__: popupSettings,
  popupSelector: ".modal_type_card",
};

const deleteCardPopupSettings = {
  __proto__: popupSettings,
  popupSelector: ".modal_type_delete-card"
}

const avatarPopupSettings = {
  __proto__: popupSettings,
  popupSelector: ".modal_type_avatar",
};

const appErrorPopupSettings = {
  popupSelector: ".app-error",
  visibleClass: "app-error_visible",
  closeButtonSelector: ".app-error__close-button",
  textElementSelector: ".app-error__text"
}

const userInfoSettings = {
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar"
};

export {
  profileSettings,
  initialCards,
  cardSettings,
  validationSettings,
  popupSettings,
  editProfilePopupSettings,
  addCardPopupSettings,
  deleteCardPopupSettings,
  avatarPopupSettings,
  cardPopupSettings,
  appErrorPopupSettings,
  userInfoSettings,
  placesCardsSelector,
};
