export default class Card {
  constructor(settings, cardObj, handleImageClick) {
    this._handleImageClick = handleImageClick;
    this._name = cardObj.title;
    this._link = cardObj.url;
    this._templateSelector = settings.templateSelector;
    this._likeButtonSelector = settings.likeButtonSelector;
    this._likeButtonActiveClass = settings.likeButtonActiveClass;
    this._likeState = 0;
    this._deleteButtonSelector = settings.deleteButtonSelector;
  }

  _createCardElement = () => {
    // Queries template and clones node into variable
    const cardElement = document
      .querySelector(`${this._templateSelector}`)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  };

  _initializeButtons = () => {
    this._likeButton = this._cardElement.querySelector(
      this._likeButtonSelector
    );
    this._deleteButton = this._cardElement.querySelector(
      this._deleteButtonSelector
    );
  };

  _toggleLikeState = () => {
    switch (this._likeState) {
      case 0:
        this._likeButton.classList.add(this._likeButtonActiveClass);
        this._likeState = 1;
        return;
      case 1:
        this._likeButton.classList.remove(this._likeButtonActiveClass);
        this._likeState = 0;
    }
  };

  _deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _addEventListeners = () => {
    this._likeButton.addEventListener("click", this._toggleLikeState);
    this._deleteButton.addEventListener("click", this._deleteCard);
    this._cardPhoto.addEventListener("click", () =>
      this._handleImageClick({title: this._name, url: this._link})
    );
  };

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

    this._initializeButtons();

    this._addEventListeners();

    return this._cardElement;
  };
}
