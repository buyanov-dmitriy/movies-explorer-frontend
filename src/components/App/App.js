import { Route, Switch, useHistory } from 'react-router';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import HiddenMenu from '../HiddenMenu/HiddenMenu';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import PageContent from '../PageContent/PageContent';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useEffect, useState } from 'react';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);

  function handleRegistrationButton() {
    history.push('/signup');
  }

  function handleLoginButton() {
    history.push('/signin');
  }

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleMainClick() {
    handleMenuClick();
    history.push('/');
  }

  function handleMoviesClick() {
    handleMenuClick();
    history.push('/movies');
  }

  function handleSavedMoviesClick() {
    handleMenuClick();
    history.push('/saved-movies');
  }

  function handleProfileClick() {
    handleMenuClick();
    history.push('/profile');
  }

  function saveMovie(movie) {
    setSavedMovies([movie.movie, ...savedMovies]);
  }

  function deleteMovie(movie) {
    setSavedMovies((state) => state.filter((c) => c._id !== movie.deletedMovie._id));
  }

  function handleRegister({ name, email, password }) {
    mainApi.register({ 'name': name, 'password': password, 'email': email })
      .then((user) => {
        handleLogin({ email: email, password: password })
      })
      .catch(() => {
        setIsErrorPopupOpen(true);
      })
  }

  function handleLogin({ email, password }) {
    mainApi.login({ 'email': email, 'password': password })
      .then(() => {
        setLoggedIn(true);
        getUser();
        history.push('/movies')
      })
      .catch(() => setIsErrorPopupOpen(true));
  }

  function getUser() {
    mainApi.getUser()
      .then(user => {
        setUser(user.user);
      })
      .catch(error => console.log(error));
  }

  function closePopup() {
    setIsErrorPopupOpen(!isErrorPopupOpen);
  }

  function updateUser(user) {
    mainApi.updateUser({ name: user.name, email: user.email})
     .then(user => {
       console.log(user);
     })
     .catch(() => setIsErrorPopupOpen(true));
  }

  function handleChangeUser(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  function handleLogout() {
    mainApi.logout()
      .then(() => {
        localStorage.removeItem('movies');
        localStorage.removeItem('checkMovies');
        localStorage.removeItem('checkSavedMovies');
        setMovies([]);
        setLoggedIn(false);
        setUser({ name: '', email: '' });
        history.push('/signin');
      })
      .catch(() => setIsErrorPopupOpen(true));
  }

  function setFoundMovies(movies) {
    setMovies(movies);
  }

  useEffect(() => {
    Promise.all([mainApi.getSavedMovies(), mainApi.getUser()])
      .then(([movies, user]) => {
        setSavedMovies(movies.movies);
        setUser(user.user);
        if (localStorage.getItem('movies') !== null) {
          setMovies(JSON.parse(localStorage.getItem('movies')));
        }
        setLoggedIn(true);
      })
      .catch(error => console.log(error));
  }, [loggedIn]);
  useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={user}>
      <div className='page'>
      {loggedIn && <Header onOpenMenu={handleMenuClick} isMainPage={false} />}
        <Switch>
          <ProtectedRoute path='/profile' loggedIn={loggedIn} component={Profile} onClick={handleLogout} onChange={handleChangeUser} onSubmit={updateUser} />
          <ProtectedRoute path='/movies' setMovies={setFoundMovies} loggedIn={loggedIn} component={Movies} movies={movies} savedMovies={savedMovies} handleSaveMovie={saveMovie} handleDeleteMovie={deleteMovie} />
          <ProtectedRoute path='/saved-movies' loggedIn={loggedIn} component={SavedMovies} savedMovies={savedMovies} handleDeleteMovie={deleteMovie} />
          <Route path='/signup'>
            <PageContent>
              <Register onRegister={handleRegister} />
            </PageContent>
          </Route>
          <Route path='/signin'>
            <PageContent>
              <Login onLogin={handleLogin} />
            </PageContent>
          </Route>
          <Route exact path='/'>
            {!loggedIn && <Header isMainPage={true} onClickRegister={handleRegistrationButton} onClickLogin={handleLoginButton} />}
            <PageContent>
              <Main />
            </PageContent>
          </Route>
          <Route path='*'>
            <PageContent>
              <NotFoundPage />
            </PageContent>
          </Route>
        </Switch>
        <Footer />
        <HiddenMenu isOpen={isMenuOpen} onClose={handleMenuClick} onClickMain={handleMainClick}
          onClickMovies={handleMoviesClick} onClickSavedMovies={handleSavedMoviesClick} onClickProfile={handleProfileClick} />
        <ErrorPopup onClose={closePopup} text='Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' isOpen={isErrorPopupOpen} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
