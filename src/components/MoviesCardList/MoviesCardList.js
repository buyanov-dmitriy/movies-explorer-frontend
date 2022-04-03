import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";

function MoviesCardList(props) {
  let moviesOnWindow = 12;
  if (window.screen.width <= 768) {
    moviesOnWindow = 8;
  }
  if (window.screen.width <= 480) {
    moviesOnWindow = 5;
  }
  const [addMovies, setAddMovies] = useState(window.screen.width <= 768 ? 2 : 3);
  //const movies = props.movies;
  //const moviesLength = (props.movies).length;
  const [isButtonHidden, setIsButtonHidden] = useState((props.movies).length <= moviesOnWindow);
  const [lastMovie, setLastMovie] = useState(moviesOnWindow - 1);
  const [renderedMovies, setRenderedMovies] = useState((props.movies).length <= moviesOnWindow ? props.movies : (props.movies).slice(0, lastMovie + 1));

  function loadNextMovies() {
    const nextMovies = (props.movies).length - lastMovie - 1;
    setLastMovie(nextMovies > addMovies ? lastMovie + addMovies : lastMovie + nextMovies);
    setRenderedMovies((props.movies).slice(0, lastMovie + 1));
  }

  useEffect(() => {
    if ((props.movies).length <= moviesOnWindow) {
      setIsButtonHidden(true);
    }
    else {
      setIsButtonHidden((props.movies).length - renderedMovies.length + addMovies <= addMovies);
    }
  }, [(props.movies).length, renderedMovies, lastMovie, addMovies]);

  useEffect(() => {
    setRenderedMovies((props.movies).slice(0, lastMovie + 1));
  }, [lastMovie, addMovies]);

  useEffect(() => {
    setRenderedMovies((props.movies).length <= moviesOnWindow ? (props.movies) : (props.movies).slice(0, lastMovie + 1))
  }, [(props.movies).length, addMovies])

  useEffect(() => {
    function handleResize() {
      setAddMovies(window.screen.width <= 768 ? 2 : 3);
    }

    window.addEventListener('resize', handleResize);
  })
  //console.log(renderedMovies);
  useEffect(() => {
    setRenderedMovies(props.movies);
  }, [props.movies]);

  return (
    <section className="movies-list">
      <div className="movies-list__table">
        {(props.isLoading)
          ? (<Preloader />)
          : (props.length === 0 && props.wasSearching)
            ? (<p className="movies-list__not-found">Ничего не найдено</p>)
            : (renderedMovies).map((currentMovie) => {
              return (
                <MoviesCard isSavedPage={props.isSavedPage} savedMovies={props.savedMovies} onMovieSave={props.onMovieSave} movie={currentMovie} key={currentMovie.id ? currentMovie.id : currentMovie.movieId} />
              )
            })
        }
      </div>
      <button onClick={loadNextMovies} className={`movies-list__button ${(props.isSavedPage || isButtonHidden) && 'movies-list__button_disabled'}`}>Ещё</button>
    </section>
  )
}

export default MoviesCardList;
