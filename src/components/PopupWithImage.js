import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({
    popupSelector,
    popupClass,
    visibleClass,
    closeButtonSelector,
  }) {
    super({
      popupSelector,
      popupClass,
      visibleClass,
      closeButtonSelector,
    });
    this._imageElement = this._popupElement.querySelector(".card-modal__photo");
    this._titleElement = this._popupElement.querySelector(
      ".card-modal__photo-title"
    );
  }

  open({ title, url }) {
    super.open();
    this._titleElement.textContent = title;
    this._imageElement.src = url;
    this._imageElement.alt = `Photo of ${title}`;
  }
}
