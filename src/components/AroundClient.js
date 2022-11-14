import Api from './Api';

export default class AroundClient extends Api {
  constructor({ baseUrl, baseHeaders }) {
    super({ baseUrl, baseHeaders });
  }

  deleteLike(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._baseHeaders,
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._baseHeaders,
    });
  }
  
  /**
   * 
   * @param {string} avatarUrl 
   * @returns {object} {name, about, avatar, _id , cohort}
   */
  patchAvatar(avatarUrl) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._baseHeaders,
      body: JSON.stringify({ avatar: avatarUrl }),
    });
  }

  patchProfile({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._baseHeaders,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addLike(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._baseHeaders,
    });
  }

  postNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._baseHeaders,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  getCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._baseHeaders,
    });
  }

  fetchUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._baseHeaders,
    });
  }

  fetchData() {
    return Promise.all([this.fetchUserInfo(), this.getCards()]);
  }
}