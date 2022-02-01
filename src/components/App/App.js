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
import { useState } from 'react';

function App() {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <div className='page'>
      <Switch>
        <Route exact path='/'>
          <Header isMainPage={true} onClickRegister={handleRegistrationButton} onClickLogin={handleLoginButton} />
          <PageContent>
            <Main />
          </PageContent>
        </Route>
        <Route path='/signup'>
          <PageContent>
            <Register />
          </PageContent>
        </Route>
        <Route path='/signin'>
          <PageContent>
            <Login />
          </PageContent>
        </Route>
        <Route path='/profile'>
          <Header onOpenMenu={handleMenuClick} isMainPage={false} />
          <PageContent>
            <Profile />
          </PageContent>
        </Route>
        <Route path='/movies'>
          <Header onOpenMenu={handleMenuClick} isMainPage={false} />
          <PageContent>
            <Movies />
          </PageContent>
        </Route>
        <Route path='/saved-movies'>
          <Header onOpenMenu={handleMenuClick} isMainPage={false} />
          <PageContent>
            <SavedMovies />
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
      <ErrorPopup isOpen={false} />
    </div>
  )
}

export default App;
