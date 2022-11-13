export default class Card {
  constructor(settings, { name, link, likes , _id, owner }, userId, handleImageClick, handleDeleteCardClick, handleLikeButtonClick) {
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLike = handleLikeButtonClick;
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._userId = userId;
    this._isOwner = owner._id === userId ? true : false;
    this._likesCount = this._likes.length;
    this._templateSelector = settings.templateSelector;
    this._likeButtonSelector = settings.likeButtonSelector;
    this._likeButtonActiveClass = settings.likeButtonActiveClass;
    this._likesSelector = settings.likesSelector
    this._deleteButtonSelector = settings.deleteButtonSelector;
    this._deleteButtonActiveClass = settings.deleteButtonActiveClass
  }

  getId() {
    return this._id
  }

  updateLikes(likesCount) {
    this._likesCount = likesCount
    this._likesElement.textContent = this._likesCount;
    this._likeButton.classList.toggle(this._likeButtonActiveClass);
  }

  _createCardElement = () => {
    // Queries template and clones node into variable
    const cardElement = document
      .querySelector(this._templateSelector)
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

  _showDeleteButton = () => {
    this._deleteButton.classList.add(this._deleteButtonActiveClass)
  }

  _hasUserLiked = () => {
    for (let i = 0; i < this._likes.length; i++) {
      const likeUser = this._likes[i];
      if (likeUser._id === this._userId) { return true }
    }
    return false
  }

  _renderLikes = () => {
    if (this._likesCount && this._hasUserLiked()) { this._likeButton.classList.add(this._likeButtonActiveClass) }
    this._likesElement.textContent = this._likesCount
  }

  _deleteCard = () => {
    this._handleDeleteCardClick(this._id, this._cardElement)
  };

  _addEventListeners = () => {
    this._likeButton.addEventListener("click", () => this._handleLike(this));
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

    this._likesElement = this._cardElement.querySelector(this._likesSelector);

    // Sets the markup for the cards name according to data fed to the constructor
    const cardNameElement = this._cardElement.querySelector(".card__name");
    cardNameElement.textContent = this._name;

    this._initializeButtons();
    this._addEventListeners();
    this._renderLikes();

    if (this._isOwner) {
      this._showDeleteButton()
    }

    return this._cardElement;
  };
}
