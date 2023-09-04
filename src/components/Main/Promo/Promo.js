import promoImg from "../../../images/promo-img.svg";
import "./Promo.css";

const Promo = () => {
  return (
    <section className="promo">
      <img
        className="promo__img"
        alt="Глобус. Веб-разработка на земном шаре"
        src={promoImg}
      />
      <div className="promo__text-container">
        <h1 className="promo__head">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__text">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a className="promo__link" href="#about-project">
          Узнать больше
        </a>
      </div>
    </section>
  );
};

export default Promo;
