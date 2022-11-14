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

  // I overide the method because I dont want the popup to close on esc key press or on click out, 
  // is there a better way to do this?
  setEventListeners() {
    this._popupElement
      .querySelector(this._closeButtonSelector)
      .addEventListener("click", this.close);
  }
}