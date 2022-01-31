import linkIcon from '../../images/link-icon.svg'

function Portfoloio() {
  return (
    <section className="portfolio">
      <p className="portfolio__name">Портфолио</p>
      <ul className="portfolio__links">
        <li>
          <div className="portflio__link">
            <a className="portfolio__link-text" href='https://buyanov-dmitriy.github.io/how-to-learn/index.html' target="_blank" rel="noreferrer">Статичный сайт</a>
            <img className="portfolio__link-icon" src={linkIcon} alt='Иконка ссылки' />
          </div>
        </li>
        <li>
          <div className="portflio__link">
            <a className="portfolio__link-text" href='https://buyanov-dmitriy.github.io/russian-travel/index.html' target="_blank" rel="noreferrer">Адаптивный сайт</a>
            <img className="portfolio__link-icon" src={linkIcon} alt='Иконка ссылки' />
          </div>
        </li>
        <li>
          <div className="portflio__link portfolio__link_last">
            <a className="portfolio__link-text" href='https://buyanov-dmitriy.students.nomoredomains.work' target="_blank" rel="noreferrer">Одностраничное приложение</a>
            <img className="portfolio__link-icon" src={linkIcon} alt='Иконка ссылки' />
          </div>
        </li>
      </ul>
    </section>
  )
}

export default Portfoloio;
