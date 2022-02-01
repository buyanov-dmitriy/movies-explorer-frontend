import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__field">
        <input className="search-form__input" name="search-movie" id="search-movie" required={true} placeholder='Фильмы' />
        <button className="search-form__button"></button>
      </div>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm;
