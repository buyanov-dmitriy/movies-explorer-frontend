function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="page__subtitle">О проекте</h2>
      <div className="about-project__table">
        <p className="about-project__table-title">Дипломный проект включал 5 этапов</p>
        <p className="about-project__table-title about-project__table-title_mobile">На выполнение диплома ушло 5 недель</p>
        <p className="page__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="page__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__infographic">
        <p className="about-project__infographic-text">1 неделя</p>
        <p className="about-project__infographic-text about-project__infographic-text_white-background">4 недели</p>
        <span className="about-project__infographic-span">Back-end</span>
        <span className="about-project__infographic-span">Front-end</span>
      </div>
    </section>
  )
}

export default AboutProject;
