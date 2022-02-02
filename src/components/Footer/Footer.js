function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__year">&copy;2022</p>
        <ul className="footer__links">
          <li>
            <a className="footer__link" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__link" href="https://instagram.com/ne.turist" target="_blank" rel="noreferrer">Instagram</a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/buyanov-dmitriy" target="_blank" rel="noreferrer">GitHub</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
