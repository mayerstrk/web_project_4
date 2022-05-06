const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];


const deleteCard = evt => evt.target.closest(".card").remove();

const toggleLikeState = evt => evt.target.classList.toggle("card__like-button_active")


function createCard(card) {
  // Clones the card template content into new card element
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);


  // Assigns the object's values to corresponding card components:
  //  + Card img source
  const cardPhoto = cardElement.querySelector(".card__photo");
  cardPhoto.setAttribute("src", card.link);
  cardPhoto.setAttribute("alt", `photo of ${card.name}`);
  //  + Card name
  const cardName = cardElement.querySelector(".card__name");
  cardName.textContent = card.name;

  // Adds event listeners to the cards buttons
  // + like button
  cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", toggleLikeState);
  // + delete button
  cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", deleteCard);

  // Adds event listener for the card photo and close button on the modal
  cardPhoto.addEventListener("click", renderCardModal);
  cardModalCloseButton = cardModal.querySelector(".modal__close-button_for_card-modal");
  cardModalCloseButton.addEventListener("click", () => closeModal(cardModal));
  
  return cardElement
}

function renderCard(card) {
  // Adds the card elment to the DOM
  placesCards = document.querySelector(".places__cards");
  placesCards.prepend(createCard(card));
}


initialCards.forEach(card => renderCard(card));
