export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _createCardElement() {
    // Queries template and clones node into variable
    const cardElement = document
      .querySelector(`${this._templateSelector}`)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // !!! EVENT HANDLERS AREN'T HERE BECAUSE I USED THE DELEGATION EVENT HANDLING PATTERN
  _generateCard() {
    // Stores card element in local property
    this._cardElement = this._createCardElement();

    // Sets the src and alt attribute values for this card's img
    this._cardPhoto = this._cardElement.querySelector(".card__photo");

    this._cardPhoto.setAttribute("src", this._link);
    this._cardPhoto.setAttribute("alt", `Picture of ${this._name}`);

    // Sets the markup for the cards name according to data fed to the constructor
    this._cardElement.querySelector(".card__name").textContent = this._name;

    return this._cardElement;
  }

  /**
   * Creates a card element and prepends it to
   * the placesCards container adding it to the DOM
   */
  render(parent) {
    parent.prepend(this._generateCard());
  }
}
