import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__description">
        <div>
          <h3 className="about-project__head">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div>
          <h3 className="about-project__head">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <span className="about-project__part">1 неделя</span>
        <span className="about-project__part">4 недели</span>
        <span className="about-project__part">Back-end</span>
        <span className="about-project__part">Front-end</span>
      </div>
    </section>
  );
};

export default AboutProject;
