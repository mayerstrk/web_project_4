export default class Popup {
  constructor({
    popupSelector,
    popupClass,
    visibleClass,
    closeButtonSelector,
  }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupClass = popupClass;
    this._visibleClass = visibleClass;
    this._closeButtonSelector = closeButtonSelector;
    this.close = this.close.bind(this);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _handleClickOutClose = (e) => {
    if (e.target === e.currentTarget) {
      this.close();
    }
  };

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleClickOutClose
    );
    this._popupElement
      .querySelector(this._closeButtonSelector)
      .removeEventListener("click", this.close);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("mousedown", this._handleClickOutClose);
    this._popupElement
      .querySelector(this._closeButtonSelector)
      .addEventListener("click", this.close);
  }

  open() {
    this._popupElement.classList.add(this._visibleClass);
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove(this._visibleClass);
    this.removeEventListeners();
  }
}
