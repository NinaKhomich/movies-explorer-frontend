import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "./MoviesCard/MoviesCard";
import More from "../Movies/More/More";
import "./MoviesCardList.css";

import {
  SCREEN_WIDTH_2_COLUMNS,
  SCREEN_WIDTH_3_COLUMNS,
  MOVIES_TO_SHOW_1_COL,
  MOVIES_TO_SHOW_2_COL,
  MOVIES_TO_SHOW_3_COL,
  MOVIES_TO_ADD_2_COL,
  MOVIES_TO_ADD_3_COL
} from "../../utils/constants/constants";

const MoviesCardList = ({
  isSaved,
  moviesArray,
  savedMoviesArray,
  nothingFound,
  onSaveMovie,
  deleteMovie,
}) => {
  const [shownMovies, setShownMovies] = useState(0);
  const [moviesToAdd, setMoviesToAdd] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const resizeWindow = () => {
      setWidth(window.innerWidth);
    };

    if (location.pathname === "/movies") {
      if (width >= SCREEN_WIDTH_3_COLUMNS) {
        setShownMovies(MOVIES_TO_SHOW_3_COL);
        setMoviesToAdd(MOVIES_TO_ADD_3_COL);
      } else if (width >= SCREEN_WIDTH_2_COLUMNS) {
        setShownMovies(MOVIES_TO_SHOW_2_COL);
        setMoviesToAdd(MOVIES_TO_ADD_2_COL);
      } else {
        setShownMovies(MOVIES_TO_SHOW_1_COL);
        setMoviesToAdd(MOVIES_TO_ADD_2_COL);
      }
    }

    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth, location, moviesArray]);

  function showMore() {
    setShownMovies((shownMovies) => shownMovies + moviesToAdd);
  }

  return (
    <Fragment>
      {location.pathname === "/saved-movies" &&
        (savedMoviesArray.length ? (
          <ul className="movies-card-list">
            {savedMoviesArray.map((savedMovie) => {
              return (
                <li className="movies-card-list__item" key={savedMovie._id}>
                  <MoviesCard
                    movie={savedMovie}
                    onChangeMovieStatus={deleteMovie}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          nothingFound && (
            <p className="movies-card-list__message-not-found">
              Ничего не найдено
            </p>
          )
        ))}

      {location.pathname === "/movies" && (
        <Fragment>
          {moviesArray.length ? (
            <ul className="movies-card-list">
              {moviesArray.slice(0, shownMovies).map((searchedMovie) => {
                return (
                  <li className="movies-card-list__item" key={searchedMovie.id}>
                    <MoviesCard
                      movie={searchedMovie}
                      onChangeMovieStatus={onSaveMovie}
                      isSaved={isSaved}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            nothingFound && (
              <p className="movies-card-list__message-not-found">
                Ничего не найдено
              </p>
            )
          )}
          {shownMovies < moviesArray.length && <More showMore={showMore} />}
        </Fragment>
      )}
    </Fragment>
  );
};

export default MoviesCardList;
