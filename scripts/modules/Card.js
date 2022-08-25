export class Card {
  constructor(settings, card) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = settings.templateSelector;
    this._likeButtonSelector = settings.likeButtonSelector
    this._likeButtonActiveClass = settings.likeButtonActiveClass
    this._likeState = 0;
    this._deleteButtonSelector = settings.deleteButtonSelector

  }

  _createCardElement = () => {
    // Queries template and clones node into variable
    const cardElement = document
      .querySelector(`${this._templateSelector}`)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _getButtons = () => {
    this._likeButton = this._cardElement.querySelector(this._likeButtonSelector);
    this._deleteButton = this._cardElement.querySelector(this._deleteButtonSelector);
  }

  _toggleLikeState = () => {
    switch(this._likeState) {
      case 0:
        this._likeButton.classList.add(this._likeButtonActiveClass);
        this._likeState = 1;
        return
      case 1:
        this._likeButton.classList.remove(this._likeButtonActiveClass);
        this._likeState = 0
    }
  }

  _deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _addEventListeners = () => {
    this._getButtons();

    this._likeButton.addEventListener("click", () => this._toggleLikeState())
    this._deleteButton.addEventListener("click", () => this._deleteCard())
  }

  generateCard = () => {
    // Stores card element in local property
    this._cardElement = this._createCardElement();

    // Sets the src and alt attribute values for this card's img
    this._cardPhoto = this._cardElement.querySelector(".card__photo");

    this._cardPhoto.setAttribute("src", this._link);
    this._cardPhoto.setAttribute("alt", `Picture of ${this._name}`);

    // Sets the markup for the cards name according to data fed to the constructor
    const cardNameElement = this._cardElement.querySelector(".card__name");
    cardNameElement.textContent = this._name;

    this._addEventListeners();

    return this._cardElement;
  }
}
