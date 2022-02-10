import iconError from '../../images/nonregistred-icon.svg';
import iconOK from '../../images/ok-icon.svg';

function ErrorPopup(props) {
  return (
    <section className={`error-popup ${props.isOpen && `error-popup_opened`}`}>
      <div className="error-popup__container">
        <img className='error-popup__icon' alt='Иконка ошибки' src={props.isError ? iconError : iconOK} />
        <p className="error-popup__title">{props.text}</p>
        <button onClick={props.onClose} className="error-popup__close" type="button"></button>
      </div>
    </section>
  )
}

export default ErrorPopup;
