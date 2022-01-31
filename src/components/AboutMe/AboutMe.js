import photo from '../../images/me.png';

function AboutMe() {
  return (
    <section className="about-me" id='about-me'>
      <h2 className="page__subtitle">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__information">
          <p className="about-me__name">Дмитрий</p>
          <p className="about-me__who-is">Фронтенд-разработчик, 32 года</p>
          <p className="about-me__text">Я родился в Волжском, но сейчас живу в Италии. Закончил факультет прикладной математики МАИ и аспирантуру МГУ. У меня есть собака. Я люблю слушать музыку, а ещё увлекаюсь кулинарией. Недавно начал кодить. С 2012 года владею собственным образовательным бизнесом. После того, как прошёл курс по веб-разработке, создаю своих телеграм-ботов и сайты для своих нужд.</p>
          <div className="about-me__links">
            <a className="about-me__link" href="https://instagram.com/ne.turist" target="_blank" rel="noreferrer">Instagram</a>
            <a className="about-me__link" href="https://github.com/buyanov-dmitriy" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <img className="about-me__photo" src={photo} alt='Фотография разработчика' />
      </div>
    </section>
  )
}

export default AboutMe;
