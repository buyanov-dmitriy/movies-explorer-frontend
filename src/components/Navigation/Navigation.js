import { Link } from "react-router-dom";
import accountLogo from '../../images/account.svg';

function Navigation(props) {
  return (
    <section>
      <div className={`main-menu ${!props.isMainPage && `main-menu__headden`}`}>
        <button className='main-menu__button' onClick={props.onClickRegister}>Регистрация</button>
        <button className='main-menu__button main-menu__enter-button' onClick={props.onClickLogin}>Войти</button>
      </div>
      <div className={`main-menu_not-main-page ${props.isMainPage && `main-menu__headden`}`}>
        <button className="main-menu__mobile" onClick={props.onOpenMenu}></button>
        <div className="main-menu__film-links">
          <Link to='/movies' className="main-menu__link">Фильмы</Link>
          <Link to='/saved-movies' className="main-menu__link">Сохраненные фильмы</Link>
        </div>
        <Link to='/profile' className="main-menu__link-to-profile">
          <p>Аккаунт</p>
          <img src={accountLogo} alt='Логотип аккаунта' className='main-menu__account-logo' />
        </Link>
      </div>
    </section>
  )
}

export default Navigation;
