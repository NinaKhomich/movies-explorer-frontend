import { useLocation } from "react-router-dom";
import { useState } from "react";

import "./MoviesCard.css";

const MoviesCard = ({ title, duration, trailerLink, thumbnail }) => {
  const { pathname } = useLocation();

  const [isSaved, setIsSaved] = useState(false);
  let btnText;

  function toggleSavingMovie() {
    setIsSaved(!isSaved);
  }

  if (pathname === "/saved-movies") {
    btnText = "×";
  } else if (pathname === "/movies") {
    isSaved ? (btnText = "✓") : (btnText = "Сохранить");
  }

  function movieTime() {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours + "ч " + minutes + "м";
  }

  return (
    <article className="movie-card">
      <div className="movie-card__head">
        <h3 className="movie-card__title">{title}</h3>
        <span className="movie-card__duration">{movieTime()}</span>
      </div>
      <a
        className="movie-card__link"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="movie-card__img" src={thumbnail} alt={title} />
      </a>
      <button
        onClick={toggleSavingMovie}
        className={`movie-card__save-btn ${
          isSaved && pathname === "/movies" ? "movie-card__save-btn_saved" : ""
        }`}
      >
        {btnText}
      </button>
    </article>
  );
};

export default MoviesCard;
