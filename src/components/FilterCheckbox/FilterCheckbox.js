function FilterCheckbox() {
  return (
    <section className="filter">
      <label className="filter__checkbox">
        <input type='checkbox' className="filter__invisible-checkbox" />
        <span className="filter__visible-checkbox"></span>
      </label>
      <p className="filter__title">Короткометражки</p>
    </section>
  )
}

export default FilterCheckbox;
