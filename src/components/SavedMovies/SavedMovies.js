import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState } from "react";
import mainApi from "../../utils/MainApi";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import PageContent from "../PageContent/PageContent";
import * as validation from '../../utils/validation';

function SavedMovies(props) {
  const [searchMovie, setSearchMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lengthFoundMovies, setLengthFoundMovies] = useState(-1);
  const [foundMovies, setFoundMovies] = useState([]);
  const [wasSearching, setWasSearching] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [isValidated, setIsValidated] = useState(true);
  const [isShortMovie, setIsShortMovie] = useState(false);

  function handleChangeMovie(event) {
    setSearchMovie(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validation.validateEmptyInput(searchMovie)) {
      setIsValidated(false);
    }
    else {
      setIsValidated(true);
      setIsLoading(true);
      setFoundMovies(findMovies(searchMovie));
      setWasSearching(true);
      setIsLoading(false);
    }
  }

  function findMovies(searchMovie) {
    const searchMovieToLC = searchMovie.toLowerCase();
    let newMovies = (props.savedMovies).filter(movie => {
      return (String(movie.nameRU).toLowerCase().includes(searchMovieToLC) || String(movie.nameEN).toLowerCase().includes(searchMovieToLC));
    });
    if (isShortMovie) {
      newMovies = newMovies.filter(movie => {
        return (Number(movie.duration) < 40);
      })
    }
    setLengthFoundMovies(newMovies.length);
    return newMovies;
  }

  function handleMovieSave(movie) {
    mainApi.deleteMovie(movie._id)
      .then(movie => {
        props.handleDeleteMovie(movie);
      })
      .catch(() => {
        setIsLoading(false);
        setIsErrorPopupOpen(true);
      });
  }

  function closePopup() {
    setIsErrorPopupOpen(!isErrorPopupOpen);
  }

  function handleCheck(checked) {
    setIsShortMovie(checked);
    localStorage.setItem('checkSavedMovies', checked);
  }

  return (
    <PageContent>
      <section className="movies">
        <SearchForm
          check={localStorage.getItem('checkSavedMovies') !== undefined ? localStorage.getItem('checkMovies') : false}
          handleCheck={handleCheck}
          isValidated={isValidated}
          onChange={handleChangeMovie}
          onSubmit={handleSubmit} />
        <MoviesCardList
          onMovieSave={handleMovieSave}
          isSavedPage={true}
          movies={foundMovies.length !== 0 ? foundMovies : props.savedMovies}
          isLoading={isLoading}
          wasSearching={wasSearching}
          length={lengthFoundMovies} />
        <ErrorPopup onClose={closePopup} text='Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' isOpen={isErrorPopupOpen} />
      </section>
    </PageContent>
  )
}

export default SavedMovies;
