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
  const movies = props.movies;
  const moviesLength = (props.movies).length;
  const [isButtonHidden, setIsButtonHidden] = useState(moviesLength <= moviesOnWindow);
  const [lastMovie, setLastMovie] = useState(moviesOnWindow - 1);
  const [renderedMovies, setRenderedMovies] = useState(moviesLength <= moviesOnWindow ? movies : movies.slice(0, lastMovie + 1));

  function loadNextMovies() {
    const nextMovies = moviesLength - lastMovie - 1;
    setLastMovie(nextMovies > addMovies ? lastMovie + addMovies : lastMovie + nextMovies);
    setRenderedMovies(movies.slice(0, lastMovie + 1));
  }

  useEffect(() => {
    if (moviesLength <= moviesOnWindow) {
      setIsButtonHidden(true);
    }
    else {
      setIsButtonHidden(moviesLength - renderedMovies.length + addMovies <= addMovies);
    }
  }, [moviesLength, renderedMovies, lastMovie, addMovies]);

  useEffect(() => {
    setRenderedMovies(movies.slice(0, lastMovie + 1));
  }, [lastMovie, addMovies]);

  useEffect(() => {
    setRenderedMovies(moviesLength <= moviesOnWindow ? movies : movies.slice(0, lastMovie + 1))
  }, [moviesLength, addMovies])

  useEffect(() => {
    function handleResize() {
      setAddMovies(window.screen.width <= 768 ? 2 : 3);
    }

    window.addEventListener('resize', handleResize);
  })

  //console.log(props.length === 0);
  //console.log(props.wasSearching);

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
