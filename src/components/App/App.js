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
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState({ isOpen: false, isError: false });
  const [user, setUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('login') !== undefined ? localStorage.getItem('login') : false);
  const [movies, setMovies] = useState([]);
  const [userName, setUserName] = useState('');
  const [textPopup, setTextPopup] = useState('');
  const [oldUserInfo, setOldUserInfo] = useState({ name: '', email: '' })
  const [isButtonBlocked, setIsButtonBlocked] = useState(true);

  async function getLoginStatus() {
    await mainApi.getUser()
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  }

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
        setTextPopup('Ошибка регистрации');
        setIsErrorPopupOpen({ isOpen: true, isError: true });
      })
  }

  function handleLogin({ email, password }) {
    mainApi.login({ 'email': email, 'password': password })
      .then(() => {
        localStorage.setItem('login', true);
        setLoggedIn(true);
        getUser();
        history.push('/movies');
      })
      .catch(() => {
        setTextPopup('Ошибка логина');
        setIsErrorPopupOpen({ isOpen: true, isError: true })
      });
  }

  function getUser() {
    mainApi.getUser()
      .then(user => {
        setUserName(user.user.name);
        setUser(user.user);
      })
      .catch(error => console.log(error));
  }

  function closePopup() {
    setIsErrorPopupOpen({ isOpen: !isErrorPopupOpen.isOpen, isError: false });;
    setTextPopup('');
  }

  function updateUser(user) {
    mainApi.updateUser({ name: user.name, email: user.email })
      .then(user => {
        setOldUserInfo(user.user);
        setIsButtonBlocked(true);
        setUserName(user.user.name);
        setTextPopup('Информация обновлена успешно');
        setIsErrorPopupOpen({ isOpen: true, isError: false });
      })
      .catch(() => {
        setTextPopup('Ошибка обновления данных');
        setIsErrorPopupOpen({ isOpen: true, isError: true })
      });
  }

  function handleChangeUser(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
    if (event.target.name === 'name') {
      if (oldUserInfo.name !== event.target.value) {
        setIsButtonBlocked(false)
      }
      else {
        setIsButtonBlocked(true)
      }
    }
    else {
      if (oldUserInfo.email !== event.target.value) {
        setIsButtonBlocked(false)
      }
      else {
        setIsButtonBlocked(true)
      }
    }
  }

  function handleLogout() {
    mainApi.logout()
      .then(() => {
        localStorage.removeItem('movies');
        localStorage.removeItem('checkMovies');
        localStorage.removeItem('checkSavedMovies');
        localStorage.removeItem('formValue');
        localStorage.removeItem('login');
        setMovies([]);
        setLoggedIn(false);
        setUser({ name: '', email: '' });
        history.push('/');
      })
      .catch(() => {
        setTextPopup('Ошибка сервера');
        setIsErrorPopupOpen({ isOpen: true, isError: true })
      });
  }

  function setFoundMovies(movies) {
    setMovies(movies);
  }

  useEffect(() => {
    Promise.all([mainApi.getSavedMovies(), mainApi.getUser()])
      .then(([movies, user]) => {
        setSavedMovies(movies.movies);
        setUser(user.user);
        setOldUserInfo(user.user);
        setUserName(user.user.name);
        if (localStorage.getItem('movies') !== null) {
          setMovies(JSON.parse(localStorage.getItem('movies')));
        }
        setLoggedIn(true);
      })
      .catch(error => console.log(error));
  }, [loggedIn]);
  /*useEffect(() => {
    /*if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn]);*/

  return (
    <CurrentUserContext.Provider value={user}>
      <div className='page'>
        {loggedIn && <Header onOpenMenu={handleMenuClick} isMainPage={false} />}
        <Switch>
        <Route exact path='/'>
            {!loggedIn && <Header isMainPage={true} onClickRegister={handleRegistrationButton} onClickLogin={handleLoginButton} />}
            <PageContent>
              <Main />
            </PageContent>
          </Route>
          <ProtectedRoute path='/profile'
            isButtonBlocked={isButtonBlocked}
            userName={userName}
            loggedIn={loggedIn}
            component={Profile}
            onClick={handleLogout}
            onChange={handleChangeUser}
            onSubmit={updateUser} />
          <ProtectedRoute
            path='/movies'
            setMovies={setFoundMovies}
            loggedIn={loggedIn}
            component={Movies}
            movies={movies}
            savedMovies={savedMovies}
            handleSaveMovie={saveMovie}
            handleDeleteMovie={deleteMovie} />
          <ProtectedRoute path='/saved-movies'
            loggedIn={loggedIn}
            component={SavedMovies}
            savedMovies={savedMovies}
            handleDeleteMovie={deleteMovie} />
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
          <Route path='*'>
            <PageContent>
              <NotFoundPage />
            </PageContent>
          </Route>
        </Switch>
        <Footer />
        <HiddenMenu isOpen={isMenuOpen} onClose={handleMenuClick} onClickMain={handleMainClick}
          onClickMovies={handleMoviesClick} onClickSavedMovies={handleSavedMoviesClick} onClickProfile={handleProfileClick} />
        <ErrorPopup onClose={closePopup} text={textPopup} isOpen={isErrorPopupOpen.isOpen} isError={isErrorPopupOpen.isError} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
