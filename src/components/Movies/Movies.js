import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import moviesApi from '../../utils/MoviesApi';
import mainApi from "../../utils/MainApi";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import PageContent from "../PageContent/PageContent";
import * as validation from '../../utils/validation';

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lengthFoundMovies, setLengthFoundMovies] = useState(-1);
  const [wasSearching, setWasSearching] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [isValidated, setIsValidated] = useState(true);
  const [isShortMovie, setIsShortMovie] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!validation.validateEmptyInput(searchMovie)) {
      setIsValidated(false);
    }
    else {
      setIsValidated(true);

      setIsLoading(true);
      moviesApi.getMovies()
        .then(response => {
          setWasSearching(true);
          setMovies(response);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setIsErrorPopupOpen(true);
        })
    }
  }

  function handleChangeMovie(event) {
    setSearchMovie(event.target.value);
  }

  function findMovies(searchMovie) {
    const searchMovieToLC = searchMovie.toLowerCase();
    let newMovies = movies.filter(movie => {
      return (String(movie.nameRU).toLowerCase().includes(searchMovieToLC) || String(movie.nameEN).toLowerCase().includes(searchMovieToLC));
    })
    if (isShortMovie) {
      newMovies = newMovies.filter(movie => {
        return (Number(movie.duration) < 40);
      })
    }
    localStorage.setItem('movies', JSON.stringify(newMovies));
    setLengthFoundMovies(newMovies.length);
    return newMovies;
  }

  function closePopup() {
    setIsErrorPopupOpen(!isErrorPopupOpen);
  }

  function handleMovieSave(movie) {
    const isSaved = (props.savedMovies).some(item => item.movieId === movie.id);

    if (isSaved) {
      const deletedMovie = (props.savedMovies).find((element, id, array) => {
        return element.movieId === movie.id;
      })
      const deletedMovieId = deletedMovie._id;
      mainApi.deleteMovie(deletedMovieId)
        .then(movie => {
          props.handleDeleteMovie(movie);
        })
        .catch(() => {
          setIsLoading(false);
          setIsErrorPopupOpen(true);
        });
    }
    else {
      mainApi.saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: movie.id,
      })
        .then(movie => {
          props.handleSaveMovie(movie);
        })
        .catch(() => {
          setIsLoading(false);
          setIsErrorPopupOpen(true);
        })
    }
  }

  function handleCheck(checked) {
    setIsShortMovie(checked);
    localStorage.setItem('checkMovies', checked);
    if (foundMovies.length !== 0 && checked) {
      const newMovies = foundMovies.filter(movie => {
        return (Number(movie.duration) < 40);
      });
      localStorage.setItem('movies', JSON.stringify(newMovies));
      setLengthFoundMovies(newMovies.length);
      setFoundMovies(newMovies);
    }
  }

  useEffect(() => {
    setFoundMovies(props.movies);
  }, []);

  useEffect(() => {
    if (wasSearching) {
      setFoundMovies(findMovies(searchMovie));
    }
    props.setMovies(foundMovies);
  }, [isLoading, wasSearching, lengthFoundMovies]);

  return (
    <PageContent>
      <section className="movies">
        <SearchForm
          check={localStorage.getItem('checkMovies') !== undefined ? localStorage.getItem('checkMovies') : false}
          handleCheck={handleCheck}
          isValidated={isValidated}
          onChange={handleChangeMovie}
          onSubmit={handleSubmit} />
        <MoviesCardList
          isSavedPage={false}
          savedMovies={props.savedMovies}
          onMovieSave={handleMovieSave}
          wasSearching={wasSearching}
          length={lengthFoundMovies}
          isLoading={isLoading}
          movies={foundMovies} />
        <ErrorPopup onClose={closePopup} text='Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' isOpen={isErrorPopupOpen} />
      </section>
    </PageContent>
  )
}

export default Movies;
