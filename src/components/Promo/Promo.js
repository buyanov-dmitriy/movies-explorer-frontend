import logo from '../../images/landing-logo.png';

function Promo() {
  return (
    <section className='promo'>
      <img src={logo} alt='Логотип промо' className='promo__logo' />
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  )
}

export default Promo;
