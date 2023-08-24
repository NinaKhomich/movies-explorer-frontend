import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__content">
        <ul className="footer__list">
          <li className="footer__list-item">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__list-item">
            <a
              className="footer__link"
              href="https://github.com/NinaKhomich"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
        <span className="footer__year">© 2020</span>
      </div>
    </footer>
  );
};

export default Footer;
