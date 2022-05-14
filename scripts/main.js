initialCards.forEach((card) => {
  newcard = new Card(card.name, card.link);
  newcard.render();
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

addEditEventListeners();

addAddEventListeners();

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

enableValidation(config);