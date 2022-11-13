import Popup from "./Popup";

export default class PopupAppError extends Popup {
  constructor(settings) {
    super(settings)
    this._textElement = this._popupElement.querySelector(settings.textElementSelector)
  }
   
  /**
   * Takes a string and sets it as the error message
   * @param {string} text 
   */
  setMessage(text) {
    this._textElement.textContent = text;
  }

  setEventListeners() {
    this._popupElement
      .querySelector(this._closeButtonSelector)
      .addEventListener("click", this.close);
  }
}