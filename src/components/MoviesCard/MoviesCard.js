function MoviesCard(props) {
  let movieCardButtonClass = 'movie-card__button';
  if (props.isSaved) {
    movieCardButtonClass = 'movie-card__button movie-card__button_saved'
  }
  else if (props.isSavedPage) {
    movieCardButtonClass= 'movie-card__button movie-card__button_is-saved-page'
  }

  return (
    <section className="movie-card">
      <div className="movie-card__caption">
        <p className="movie-card__name">В погоне за Бенкси</p>
        <p className="movie-card__duration">27 минут</p>
      </div>
      <img className="movie-card__image" src={props.img} alt={props.alt} />
      <button className={movieCardButtonClass}>{(props.isSaved || props.isSavedPage) ? '' : 'Сохранить'}</button>
    </section>
  )
}

export default MoviesCard;
