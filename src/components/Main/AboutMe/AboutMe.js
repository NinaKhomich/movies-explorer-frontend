import "./AboutMe.css";
import photo from "../../../images/photo.png";

const AboutMe = () => {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <img
          className="about-me__photo"
          alt="Фото профиля. Студент"
          src={photo}
        />
        <div className="about-me__description">
          <h3 className="about-me__head">Виталий</h3>
          <p className="about-me__text">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/NinaKhomich"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
