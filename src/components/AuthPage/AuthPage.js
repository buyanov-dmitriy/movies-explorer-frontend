import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../utils/validation';

function AuthPage(props) {
  const emailPattern = '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$';
  const namePattern = '^[a-zA-Zа-яА-ЯёЁ\\s-]+$'
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  function onSubmitForm(event) {
    event.preventDefault();
    props.onSubmit(values);
  }

  return (
    <section className="auth-page">
      <Link to='/'><img src={logo} alt='Логотип' className='auth-page__logo' /></Link>
      <p className="auth-page__title">{props.title}</p>
      <form onSubmit={onSubmitForm} className="auth-page__form" name={props.formName}>
        <section className={`auth-page__form-section ${props.isLogin && `auth-page__form-section_hidden`}`}>
          <label className="auth-page__form-label" htmlFor='name'>Имя</label>
          <input
            required={props.isLogin ? false : true}
            pattern={props.isLogin ? undefined : namePattern}
            onChange={handleChange}
            type='text'
            className="auth-page__form-field"
            name="name"
            id="name"
            placeholder="Ваше имя" />
          <span className="auth-page__error">{errors.name}</span>
        </section>
        <section className="auth-page__form-section">
          <label className="auth-page__form-label" htmlFor='email'>E-mail</label>
          <input
            required={true}
            pattern={emailPattern}
            onChange={handleChange}
            type='email'
            className="auth-page__form-field"
            name="email"
            id="email"
            placeholder="Ваш email" />
          <span className="auth-page__error">{errors.email}</span>
        </section>
        <section className="auth-page__form-section">
          <label className="auth-page__form-label" htmlFor='password'>Пароль</label>
          <input
            required={true}
            onChange={handleChange}
            type='password'
            className="auth-page__form-field"
            name="password"
            id="password"
            placeholder="Ваш пароль" />
          <span className="auth-page__error">{errors.password}</span>
        </section>
        <input
          disabled={isValid ? false : true}
          type='submit'
          className={isValid ? 'auth-page__form-submit' : 'auth-page__form-submit_disabled'}
          value={props.submitValue}
          name={props.submitName} />
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
