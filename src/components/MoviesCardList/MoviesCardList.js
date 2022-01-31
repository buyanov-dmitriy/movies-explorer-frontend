import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="movies-list">
      <div className="movies-list__table">
        {(props.movies).map(currentMovie => {
          return (
            <MoviesCard img={currentMovie.img} isSaved={currentMovie.isSaved} isSavedPage={currentMovie.isSavedPage} />
          )
        })}
      </div>
      <button className="movies-list__button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;
