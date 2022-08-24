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

const cardSettings = {
  templateSelector: "#card",
  cardSelector: ".card",
  likeButtonActiveClass: "card__like-button_active",
  likeButtonSelector: ".card__like-button",
  deleteButtonSelector: ".card__delete-button",
  imageContainerSelector: ".card__photo-container",
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


export { initialCards, cardSettings, validationSettings}
