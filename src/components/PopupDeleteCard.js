import Popup from "./Popup";

export default class PopupDeleteCard extends Popup {
  constructor({ settings, handleSubmit }) {
    super(settings);
    this._settings = settings;
    this._onSubmit = handleSubmit;
    this._form = this._popupElement.querySelector(settings.formSelector);
    this._submitButton = this._form.querySelector(
      settings.submitButtonSelector
    );
  }


  _handleSubmit = (e) => {
    e.preventDefault();
    this._onSubmit(this._cardId, this._cardElement);
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  };

  removeEventListeners = () => {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  };

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement
  }
}