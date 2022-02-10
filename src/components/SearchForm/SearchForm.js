import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const formValue = props.formValue ? props.formValue : 'Фильмы';
  return (
    <section className="search-form">
      <form onSubmit={props.onSubmit} className="search-form__field" name="search-form" id='search-form'>
        <input onChange={props.onChange} className="search-form__input" name="search-movie" id="search-movie" placeholder={formValue} />
        <input value='' type='submit' className="search-form__button" name='search-submit'></input>
      </form>
      <span className={`search-form__error ${props.isValidated && 'search-form__error_hidden'}`}>Нужно ввести ключевое слово</span>
      <FilterCheckbox check={props.check} handleCheck={props.handleCheck} />
    </section>
  )
}

export default SearchForm;
