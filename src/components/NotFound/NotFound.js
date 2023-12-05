import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <section className="not-found">
      <h1 className="not-found__head">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link onClick={handleGoBack} className="not-found__link">
        Назад
      </Link>
    </section>
  );
};

export default NotFound;
