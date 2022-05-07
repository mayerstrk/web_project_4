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


const placesCards = document.querySelector(".places__cards");
const cardTemplate = document.querySelector("#card").content;


// Deletes a card using the remove method
const deleteCard = evt => evt.target.closest(".card").remove();


// Toggles the state of the like button
const toggleLikeState = evt => evt.target.classList.toggle("card__like-button_active")

/**
 * Creates a card element
 * @param {Object} card - Object containing the cards properties.
 * @param {string} card.name - Name of the place in the card.
 * @param {string} card.link - Link to the place photo
 */
function createCard(card) {
  // Clones the card template content into new card element
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardPhoto = cardElement.querySelector(".card__photo");
  const cardName = cardElement.querySelector(".card__name");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  // Assigns the object's values to corresponding card components:
  cardPhoto.setAttribute("src", card.link);
  cardPhoto.setAttribute("alt", `photo of ${card.name}`);
  cardName.textContent = card.name;

  // Adds event listeners to the cards buttons
  cardLikeButton.addEventListener("click", toggleLikeState);
  cardDeleteButton.addEventListener("click", deleteCard);

  // Adds event listener for the card photo
  cardPhoto.addEventListener("click", renderCardModal);

  return cardElement
}

/**
 * Creates a card element and prepends it to 
 * the placesCards container adding it to the DOM
 * @param {Object} card - Object containing the cards properties.
 * @param {string} card.name - Name of the place in the card.
 * @param {string} card.link - Link to the place photo
 */
function renderCard(card) {
  // Adds the card elment to the DOM
  placesCards.prepend(createCard(card));
}


// Iterates through objects in initialCads array and renders a card fot each one
initialCards.forEach(card => renderCard(card));
