import icon from '../../images/ok-icon.svg';

function ErrorPopup(props) {
  return (
    <section className={`error-popup ${props.isOpen && `error-popup_opened`}`}>
      <div className="error-popup__container">
        <img className='error-popup__icon' alt='Иконка ошибки' src={icon} />
        <p className="error-popup__title">Что-то пошло не так</p>
        <button onClick={props.onClose} className="error-popup__close" type="button"></button>
      </div>
    </section>
  )
}

export default ErrorPopup;
