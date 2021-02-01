class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._userUrl = `${this._baseUrl}/users/me`;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(new Error(`Ошибка ${response.status}`));
    }
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
    }).then((response) => this._handleResponse(response));
  }

  getUserInfo() {
    return fetch(this._userUrl, {
      headers: this._headers,
    }).then((response) => this._handleResponse(response));
  }

  patchUserInfo(info) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: info.name, about: info.about }),
    }).then((response) => this._handleResponse(response));
  }

  patchUserAvatar(link) {
    const avaUrl = `${this._userUrl}/avatar`;
    return fetch(avaUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: link }),
    }).then((response) => this._handleResponse(response));
  }

  handleLike(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._cardsUrl}/likes/${cardId}`, {
      method: method,
      headers: this._headers,
    }).then((response) => this._handleResponse(response));
  }

  addCard(cardData) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then((response) => this._handleResponse(response));
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._handleResponse(response));
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
  headers: {
    authorization: "315ad660-d92f-49d2-a7f7-3bcfa435f3a6",
    "Content-type": "application/json",
  },
});

export default api;