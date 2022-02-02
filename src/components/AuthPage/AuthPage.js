import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function AuthPage(props) {
  return (
    <section className="auth-page">
      <Link to='/'><img src={logo} alt='Логотип' className='auth-page__logo' /></Link>
      <p className="auth-page__title">{props.title}</p>
      <form className="auth-page__form">
        <section className={`auth-page__form-section ${props.isLogin && `auth-page__form-section_hidden`}`}>
          <label className="auth-page__form-label" htmlFor='name'>Имя</label>
          <input type='text' className="auth-page__form-field" name="name" id="name" placeholder="Ваше имя" />
        </section>
        <section className="auth-page__form-section">
          <label className="auth-page__form-label" htmlFor='email'>E-mail</label>
          <input type='email' className="auth-page__form-field" name="email" id="email" placeholder="Ваш email" />
        </section>
        <section className="auth-page__form-section">
          <label className="auth-page__form-label" htmlFor='password'>Пароль</label>
          <input type='password' className="auth-page__form-field" name="password" id="password" placeholder="Ваш пароль" />
        </section>
        <input type='submit' className="auth-page__form-submit" value={props.submitValue} name={props.submitName} />
      </form>
      <section className='auth-page__propose'>
        <p className='auth-page__propose-caption'>
          {props.proposeCaption} <Link className='auth-page__propose-link' to={props.proposeLink}>{props.proposeLinkName}</Link>
        </p>
      </section>
    </section>
  )
}

export default AuthPage;
