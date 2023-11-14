export default class Api {
  constructor(apiSettings) {
    this._link = apiSettings.link
    this._headers = apiSettings.headers
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getMoviesList() {
    return fetch(`${this._link}`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkResult(res));
  }
}