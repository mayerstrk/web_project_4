import { data } from "autoprefixer";

export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  fetchUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
      method: "GET",
      headers: {
        authorization: " 0025f74a-7d55-4e26-bbb6-faf6f78aefcc",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("Error. Request Failed");
        console.log(err);
      });
  };

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}
