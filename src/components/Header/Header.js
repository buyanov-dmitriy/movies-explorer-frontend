import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className={`header ${props.isMainPage && 'header_is-main-page'}`}>
      <Link to='/'><img src={logo} alt='Логотип' className='header__logo' /></Link>
      <Navigation isMainPage={props.isMainPage} onClickRegister={props.onClickRegister}
      onClickLogin={props.onClickLogin} onOpenMenu={props.onOpenMenu} />
    </header>
  )
}

export default Header;
