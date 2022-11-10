export default class Api {
  constructor({ baseUrl, baseHeaders }) {
    this._baseUrl = baseUrl;
    this._baseHeaders = baseHeaders;
  }

  patchAvatar(urlSuffix, avatarUrl) {
    const headers = new Headers(this._baseHeaders)
    headers.append("Content-Type", "application/json")
    return fetch(this._baseUrl + urlSuffix, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({avatar: avatarUrl})
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log("Error. Request Failed");
        console.log(err);
      });
  }

  addLike(urlSuffix) {
    return fetch(this._baseUrl + urlSuffix, {
      method: "PUT",
      headers: this._baseHeaders,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log("Error. Request Failed");
        console.log(err);
      });
  }

  deleteLike(urlSuffix) {
    return fetch(this._baseUrl + urlSuffix, {
      method: "DELETE",
      headers: this._baseHeaders,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log("Error. Request Failed");
        console.log(err);
      });
  }

  deleteCard(urlSuffix) {
    console.log(urlSuffix)
    return fetch(this._baseUrl + urlSuffix, {
      method: "DELETE",
      headers: this._baseHeaders,
    })
  }

  postNewCard(urlSuffix, {name, link}) {
    const headers = new Headers(this._baseHeaders);
    headers.append("Content-Type", "application/json");

    return fetch(this._baseUrl + urlSuffix, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log("Error. Request Failed");
        console.log(err);
      });
  }

  getCards(urlSuffix) {
    const headers = new Headers(this._baseHeaders);
    headers.append("Content-Type", "application/json");
   
    return fetch(this._baseUrl + urlSuffix, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetchUserInfo(urlSuffix) {
    return fetch(this._baseUrl + urlSuffix, {
      method: "GET",
      headers: this._baseHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("Error. Request Failed");
        console.log(err);
      });
  }

  fetchData({userInfoSuffix, cardsSuffix}) {
    return (
      Promise.all([
        this.fetchUserInfo(userInfoSuffix), 
        this.getCards(cardsSuffix)
      ])
        .then((res) => res)
    )
  }

  patchProfile(urlSuffix, { name, about }) {
    const headers = new Headers(this._baseHeaders);
    headers.append("Content-Type", "application/json");

    return fetch(this._baseUrl + urlSuffix, {
      method: "PATCH", 
      headers: headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
  }
};

// fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
//   method: "GET",
//   headers: {
//     authorization: " 0025f74a-7d55-4e26-bbb6-faf6f78aefcc",
//   },
// }).then((res) => res.json());
