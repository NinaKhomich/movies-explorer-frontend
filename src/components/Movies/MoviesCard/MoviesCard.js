import { useLocation } from "react-router-dom";

import "./MoviesCard.css";

const MoviesCard = ({ movie, onChangeMovieStatus, isSaved }) => {
  const { pathname } = useLocation();

  let btnText;

  function handleToggleMovieStatus() {
    onChangeMovieStatus(pathname === "/saved-movies" ? movie._id : movie);
    console.log(isSaved(movie));
  }

  if (pathname === "/saved-movies") {
    btnText = "×";
    movie.thumbnail = `https://api.nomoreparties.co/uploads/thumbnail_${
      movie.image.split(
        "https://api.nomoreparties.co/beatfilm-movies/uploads/"
      )[1]
    }`;
  } else if (pathname === "/movies") {
    isSaved(movie) ? (btnText = "✓") : (btnText = "Сохранить");
    movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
  }

  function movieTime() {
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    return hours + "ч " + minutes + "м";
  }

  return (
    <article className="movie-card">
      <div className="movie-card__head">
        <h3 className="movie-card__title">{movie.nameRU}</h3>
        <span className="movie-card__duration">{movieTime()}</span>
      </div>
      <a
        className="movie-card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__img"
          src={movie.thumbnail}
          alt={movie.nameRU}
        />
      </a>
      <button
        onClick={handleToggleMovieStatus}
        className={`movie-card__save-btn ${
          pathname === "/movies" && isSaved(movie)
            ? "movie-card__save-btn_saved"
            : ""
        }`}
      >
        {btnText}
      </button>
    </article>
  );
};

export default MoviesCard;
