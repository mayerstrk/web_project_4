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


let deleteCard = evt => evt.target.closest(".card").remove()


function craeateCard(card) {
  // Clones the card template content into new card element
  const CARD_ELEMENT = CARD_TEMPLATE.querySelector(".card").cloneNode(true);


  // Assigns the object's values to corresponding card components:
  //  + Card img source
  CARD_ELEMENT.querySelector(".card__photo").setAttribute("src", card.link);
  //  + Card name
  CARD_ELEMENT.querySelector(".card__name").textContent = card.name;

  // Adds event listeners to the cards buttons
  // + like button
  CARD_ELEMENT.querySelector(".card__like-button").addEventListener("click", 
    evt => evt.target.classList.toggle("card__like-button_active"));
  // + delete button
  CARD_ELEMENT.querySelector(".card__delete-button").addEventListener("click", deleteCard);

  // Adds event listener for the card photo and close button on the modal
  CARD_ELEMENT.querySelector(".card__photo").addEventListener("click", OPEN_CARD_MODAL);
  CARD_MODAL.querySelector(".modal__close-button_for_card-modal").addEventListener("click", CLOSE_CARD_MODAL)
  
  // Adds the card elment to the DOM
  document.querySelector(".places__cards").prepend(CARD_ELEMENT)
}


initialCards.forEach( card => craeateCard(card) );
