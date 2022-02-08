function MoviesCard(props) {
  let isSavedMovie = false;
  if (!props.isSavedPage) {
    isSavedMovie = (props.savedMovies).some(item => item.movieId === props.movie.id);
  }

  function handleSaveClick() {
    props.onMovieSave(props.movie);
  }

  let movieCardButtonClass = 'movie-card__button';
  if (isSavedMovie) {
    movieCardButtonClass = 'movie-card__button movie-card__button_saved'
  }
  else if (props.isSavedPage) {
    movieCardButtonClass= 'movie-card__button movie-card__button_is-saved-page'
  }

  return (
    <section className="movie-card">
      <div className="movie-card__caption">
        <p className="movie-card__name">{props.movie.nameRU}</p>
        <p className="movie-card__duration">{props.movie.duration} минут</p>
      </div>
      <a className="movie-card__link" href={props.isSavedPage ? props.movie.trailer : props.movie.trailerLink} target="_blank" rel="noreferrer"><img className="movie-card__image" src={props.isSavedPage ? props.movie.image : `https://api.nomoreparties.co/${props.movie.image.url}`} alt={props.movie.nameRU} /></a>
      <button onClick={handleSaveClick} className={movieCardButtonClass}>{(isSavedMovie || props.isSavedPage) ? '' : 'Сохранить'}</button>
    </section>
  )
}

export default MoviesCard;
