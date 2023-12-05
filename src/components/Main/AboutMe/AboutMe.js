import "./AboutMe.css";
import photo from "../../../images/photo.jpg";

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
          <h3 className="about-me__head">Нина</h3>
          <p className="about-me__text">Фронтенд-разработчик</p>
          <p className="about-me__text">
            Я живу в солнечном Крыму. Воспитываю сына, люблю рисовать с ним и ездить на прогулки в горы. Более 7 лет работала в сети розничных супермаркетов и дошла до должности управляющешо магазином.
          </p>
          <p className="about-me__text">
            В какой-то момент предложили поучаствовать в небольшом марафоне по обучению на Frontend. Направление очень понравилось и марафон был успешно пройден. После чего решила освоить специальность и сменить сферу деятельности.
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
