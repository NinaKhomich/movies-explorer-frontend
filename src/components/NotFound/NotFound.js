import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <h1 className="not-found__head">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link onClick={() => navigate(-2)} className="not-found__link">
        Назад
      </Link>
    </section>
  );
};

export default NotFound;
