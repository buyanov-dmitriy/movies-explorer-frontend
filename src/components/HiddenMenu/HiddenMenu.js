import icon from '../../images/account.svg';

function HiddenMenu(props) {
  return (
    <section className={`hidden-menu ${props.isOpen && `hidden-menu_opened`}`}>
      <button className='hidden-menu__close-button' onClick={props.onClose}></button>
      <ul className='hidden-menu__links'>
        <li>
          <button to='/' className='hidden-menu__link' onClick={props.onClickMain}>Главная</button>
        </li>
        <li>
          <button to='/movies' className='hidden-menu__link' onClick={props.onClickMovies}>Фильмы</button>
        </li>
        <li>
          <button to='/saved-movies' className='hidden-menu__link' onClick={props.onClickSavedMovies}>Сохраненные фильмы</button>
        </li>
      </ul>
      <button onClick={props.onClickProfile} className='hidden-menu__link-to-account'>
        <p className="hidden-menu__link-to-account-text">Аккаунт</p>
        <img src={icon} alt='Иконка аккаунта' className='hidden-menu__link-to-account-icon' />
      </button>
    </section>
  )
}

export default HiddenMenu;
