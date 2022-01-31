import logo from '../../images/landing-logo.png';

function Promo(props) {
  return (
    <section className='promo'>
      {props.children}
      <img src={logo} alt='Логотип промо' className='promo__logo' />
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  )
}

export default Promo;
