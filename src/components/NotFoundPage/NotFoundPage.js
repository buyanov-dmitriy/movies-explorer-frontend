import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <p className="not-found-page__code">404</p>
      <p className="not-found-page__text">Страница не найдена</p>
      <Link to='/' className="not-found-page__link">Назад</Link>
    </section>
  )
}

export default NotFoundPage;
