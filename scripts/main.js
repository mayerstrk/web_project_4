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
  } else {}
});

addEditEventListeners();

addAddEventListeners();

enableValidation(config)