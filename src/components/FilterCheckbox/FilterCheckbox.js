import { useState } from "react";

function FilterCheckbox(props) {
  const [check, setCheck] = useState(props.check);

  function handleCheck() {
    setCheck(!check);
    props.handleCheck(!check);
  }

  return (
    <section className="filter">
      <label className="filter__checkbox">
        <input defaultChecked={check} onChange={handleCheck} type='checkbox' className="filter__invisible-checkbox" />
        <span className="filter__visible-checkbox"></span>
      </label>
      <p className="filter__title">Короткометражки</p>
    </section>
  )
}

export default FilterCheckbox;
