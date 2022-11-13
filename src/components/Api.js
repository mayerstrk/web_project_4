
export default class Api {
  constructor({baseUrl, baseHeaders}) {
    this._baseUrl = baseUrl;
    this._baseHeaders = baseHeaders;
  }
  
  _checkResponse(res) {
    if (res.ok) { return res.json() }
    return Promise.reject(`Error ${res.status} - ${res.statusText}`)
  }
  
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }
};