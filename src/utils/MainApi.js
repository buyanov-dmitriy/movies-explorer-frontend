class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _contactTheServer(currentPromise) {
    return currentPromise
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка ${response.status}`);
        }
        return response.json();
      })
  }

  getSavedMovies() {
    return this._contactTheServer(fetch(`${this._url}/movies`, {
      headers: this._headers,
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    }));
  }

  saveMovie(movie) {
    return this._contactTheServer(fetch(`${this._url}/movies`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(movie),
      credentials: 'include',
    }));
  }

  deleteMovie(movieId) {
    return this._contactTheServer(fetch(`${this._url}/movies/${movieId}`, {
      headers: this._headers,
      method: 'DELETE',
      credentials: 'include',
    }));
  }

  getUser() {
    return this._contactTheServer(fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    }));
  }

  updateUser(user) {
    return this._contactTheServer(fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(user),
      credentials: 'include',
    }));
  }

  register(user) {
    return this._contactTheServer(fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(user),
      credentials: 'include',
    }));
  }

  login(user) {
    return this._contactTheServer(fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(user),
      credentials: 'include',
    }));
  }

  logout() {
    return this._contactTheServer(fetch(`${this._url}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    }));
  }
}

const mainApi = new MainApi({
  url: 'https://api.buyanov-diploma.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
