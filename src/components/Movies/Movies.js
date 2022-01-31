import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import photo1 from '../../utils/card-images/1.png';
import photo2 from '../../utils/card-images/2.png';
import photo3 from '../../utils/card-images/3.png';
import photo4 from '../../utils/card-images/4.png';
import photo5 from '../../utils/card-images/5.png';
import photo6 from '../../utils/card-images/6.png';
import photo7 from '../../utils/card-images/7.png';
import photo8 from '../../utils/card-images/8.png';
import photo9 from '../../utils/card-images/9.png';
import photo10 from '../../utils/card-images/10.png';
import photo11 from '../../utils/card-images/11.png';
import photo12 from '../../utils/card-images/12.png';

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList
        movies={[{ img: photo1, isSaved: Math.random() < 0.5 },
        { img: photo2, isSaved: Math.random() < 0.5 },
        { img: photo3, isSaved: Math.random() < 0.5 },
        { img: photo4, isSaved: Math.random() < 0.5 },
        { img: photo5, isSaved: Math.random() < 0.5 },
        { img: photo6, isSaved: Math.random() < 0.5 },
        { img: photo7, isSaved: Math.random() < 0.5 },
        { img: photo8, isSaved: Math.random() < 0.5 },
        { img: photo9, isSaved: Math.random() < 0.5 },
        { img: photo10, isSaved: Math.random() < 0.5 },
        { img: photo11, isSaved: Math.random() < 0.5 },
        { img: photo12, isSaved: Math.random() < 0.5 }]} />
    </section>
  )
}

export default Movies;
