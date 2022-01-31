import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import photo1 from '../../utils/card-images/1.png';
import photo2 from '../../utils/card-images/2.png';
import photo3 from '../../utils/card-images/3.png';

function SavedMovies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList
      movies={[{img: photo1, isSavedPage: true, isSaved: false},
      {img: photo2, isSavedPage: true, isSaved: false},
      {img: photo3, isSavedPage: true, isSaved: false}]} />
    </section>
  )
}

export default SavedMovies;
