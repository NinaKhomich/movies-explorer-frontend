import { useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import More from "../More/More";
import "./MoviesCardList.css";

const MoviesCardList = ({ moviesArray }) => {
  let shownMovies = 5;
  let moviesToAdd = 2;

  const resizeWindow = () => {
    if (window.innerWidth >= 1024) {
      shownMovies = 12;
      moviesToAdd = 3;
    } else if (window.innerWidth >= 768) {
      shownMovies = 8;
      moviesToAdd = 2;
    } else {
      shownMovies = 5;
      moviesToAdd = 2;
    }
  };
  window.resizeWindow = () => {
    setTimeout(resizeWindow, 1000);
  };

  resizeWindow();

  const [loadIndex, setLoadIndex] = useState(shownMovies);

  const location = useLocation();

  function showMore() {
    if (loadIndex < moviesArray.length) {
      setLoadIndex(loadIndex + moviesToAdd);
    }
  }

  return (
    <div>
      {location.pathname === "/saved-movies" && (
        <ul className="movies-card-list">
          {moviesArray.map((movie) => {
            return (
              <li className="movies-card-list__item" key={movie.id}>
                <MoviesCard
                  title={movie.nameRU}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  thumbnail={
                    "https://api.nomoreparties.co" +
                    movie.image.formats.thumbnail.url
                  }
                />
              </li>
            );
          })}
        </ul>
      )}

      {location.pathname === "/movies" && (
        <ul className="movies-card-list">
          {moviesArray.slice(0, loadIndex).map((movie) => {
            return (
              <li className="movies-card-list__item" key={movie.id}>
                <MoviesCard
                  title={movie.nameRU}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  thumbnail={
                    "https://api.nomoreparties.co" +
                    movie.image.formats.thumbnail.url
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
      {loadIndex < moviesArray.length && <More showMore={showMore} />}
    </div>
  );
};

export default MoviesCardList;
