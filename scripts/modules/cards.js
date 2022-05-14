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


const placesCards = document.querySelector(".places__cards");
const cardTemplate = document.querySelector("#card").content;

class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }

  /**
   * Creates a card element
   */
  create() {
    // Clones the card template content into new card element
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const cardPhoto = cardElement.querySelector(".card__photo");
    const cardName = cardElement.querySelector(".card__name");

    // Assigns the object's values to corresponding card components:
    cardPhoto.setAttribute("src", this.link);
    cardPhoto.setAttribute("alt", `photo of ${this.name}`);
    cardName.textContent = this.name;

    return cardElement;
  }

  /**
   * Creates a card element and prepends it to
   * the placesCards container adding it to the DOM
   */
  render() {
    placesCards.prepend(this.create());
  }
}

// Toggles the state of the like button
const toggleLikeState = (evt) => {
  evt.target.classList.toggle("card__like-button_active");
};

// Deletes a card using the remove method
const deleteCard = (evt) => evt.target.closest(".card").remove();

const cards = [];
